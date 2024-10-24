from fastapi import FastAPI, HTTPException
from tortoise.contrib.fastapi import register_tortoise
from models import (  
    supplier_pydantic, supplier_pydanticIn, Supplier,
    product_pydantic, product_pydanticIn, Product
)
import os

# Email
from typing import List
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import BaseModel, EmailStr

# dotenv for credentials
# from dotenv import dotenv_values

# Load credentials from .env
# credentials = dotenv_values(".env")

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://inventory-management-frontend-5bio.onrender.com",
    "https://inventory-management-backend-ppyt.onrender.com",
    # Include local development URLs if needed
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# origins = [
#     "https://inventory-management-frontend-5bio.onrender.com"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# CORS configuration
# app.add_middleware(
#     CORSMiddleware,
#     # allow_origins=["http://localhost:3000"],
#     allow_origins=["http://192.168.146.238:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

@app.get('/')
def index():
    return {"Msg": "Go to /docs for the API documentation"}

# Supplier routes
@app.post('/supplier')
async def add_supplier(supplier_info: supplier_pydanticIn):
    supplier_obj = await Supplier.create(**supplier_info.dict(exclude_unset=True))
    response = await supplier_pydantic.from_tortoise_orm(supplier_obj)
    return {"status": "ok", "data": response}

@app.get('/supplier')
async def get_all_suppliers():
    response = await supplier_pydantic.from_queryset(Supplier.all())
    return {"status": "ok", "data": response}

@app.get('/supplier/{supplier_id}')
async def get_specific_supplier(supplier_id: int):
    supplier = await Supplier.get_or_none(id=supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    response = await supplier_pydantic.from_tortoise_orm(supplier)
    return {"status": "ok", "data": response}

@app.put('/supplier/{supplier_id}')
async def update_supplier(supplier_id: int, update_info: supplier_pydanticIn):
    supplier = await Supplier.get_or_none(id=supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    update_data = update_info.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(supplier, field, value)
    
    await supplier.save()
    response = await supplier_pydantic.from_tortoise_orm(supplier)
    return {"status": "ok", "data": response}

@app.delete('/supplier/{supplier_id}')
async def delete_supplier(supplier_id: int):
    supplier = await Supplier.get_or_none(id=supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    await supplier.delete()
    return {"status": "ok"}

# Product routes
@app.post('/product/{supplier_id}')
async def add_product(supplier_id: int, product_details: product_pydanticIn):
    supplier = await Supplier.get_or_none(id=supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    product_details = product_details.dict(exclude_unset=True)
    product_details['revenue'] = product_details['quantity_sold'] * product_details['unit_price']
    product_obj = await Product.create(**product_details, supplied_by=supplier)
    
    response = await product_pydantic.from_tortoise_orm(product_obj)
    return {"status": "ok", "data": response}

@app.get('/product')
async def all_products():
    response = await product_pydantic.from_queryset(Product.all())
    return {"status": "ok", "data": response}

@app.get('/product/{id}')
async def specific_product(id: int):
    product = await Product.get_or_none(id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    response = await product_pydantic.from_tortoise_orm(product)
    return {"status": "ok", "data": response}

@app.put('/product/{id}')
async def update_product(id: int, update_info: product_pydanticIn):
    product = await Product.get_or_none(id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = update_info.dict(exclude_unset=True)

    # Update fields
    product.name = update_data.get('name', product.name)
    product.quantity_in_stock = update_data.get('quantity_in_stock', product.quantity_in_stock)
    if 'quantity_sold' in update_data and 'unit_price' in update_data:
        product.quantity_sold += update_data['quantity_sold']
        product.unit_price = update_data['unit_price']
        product.revenue += (update_data['quantity_sold'] * update_data['unit_price'])

    await product.save()
    response = await product_pydantic.from_tortoise_orm(product)
    return {"status": "ok", "data": response}


@app.delete('/product/{id}')
async def delete_product(id: int):
    product = await Product.get_or_none(id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    await product.delete()
    return {"status": "ok"}

# Email handling classes
class EmailContent(BaseModel):
    message: str
    subject: str 

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get('EMAIL'),
    MAIL_PASSWORD=os.environ.get('PASS'),
    MAIL_FROM=os.environ.get('EMAIL'),
    MAIL_PORT=465,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

@app.post('/email/{product_id}')
async def send_email(product_id: int, content: EmailContent):
    product = await Product.get_or_none(id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    supplier = await product.supplied_by
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    supplier_email = [supplier.email]
    
    html = f"""
    <h5>PavLTD</h5> 
    <br>
    <p>{content.message}</p>
    <br>
    <h6>Best Regards,</h6>
    <h6>PavLTD</h6>
    """

    message = MessageSchema(
        subject=content.subject,
        recipients=supplier_email,
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"status": "ok"}

# Register Tortoise ORM
register_tortoise(
    app,
    # db_url = "postgres://postgres:pavani@localhost:5434/database",
    db_url = "postgres://inventory_management_backend_user:hf0dSEiR2Py6czF47xnuY6QWy08BMhZE@dpg-csbomi5ds78s73bc38h0-a:5432/inventory_management_backend",
    modules={"models": ["models"]},  
    generate_schemas=True,
    add_exception_handlers=True
)
