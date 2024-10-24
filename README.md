📦 Inventory Management System
A full-stack inventory management application built with FastAPI and React, deployed on Render. This system helps businesses manage their inventory, track products, and communicate with suppliers efficiently.
🌐 Live Demo

Frontend: https://inventory-management-frontend-5bio.onrender.com
Backend API: https://inventory-management-backend-ppyt.onrender.com
API Documentation: https://inventory-management-backend-ppyt.onrender.com/docs

✨ Features
Product Management

Add, edit, and delete products
Track quantity in stock and quantity sold
Automatic revenue calculation
Real-time product search
Product count display

Supplier Management

Manage supplier information
Email communication system
Link products to suppliers

User Interface

Responsive Bootstrap design
Navigation bar with product counter
Search functionality
Interactive forms with validation

🛠️ Tech Stack
Backend

FastAPI
Tortoise ORM
PostgreSQL
FastAPI-Mail
Python 3.8+
CORS enabled for cross-origin requests

Frontend

React
React Bootstrap
React Router
Context API for state management
React Hooks

💻 Components Structure
Context Components
javascriptCopy- ProductContext.js     // Manages global product state
- SupplierContext.js   // Manages supplier information
- UpdateContext.js     // Handles product updates
UI Components
javascriptCopy- NavBar.js            // Navigation with search and product counter
- AddProducts.js       // Product addition form
- ProductList.js       // Display and manage products
🚀 Local Development Setup
Backend Setup

Clone the repository

bashCopygit clone <your-repo-url>
cd inventory-management

Create virtual environment

bashCopypython -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

Install dependencies

bashCopypip install fastapi uvicorn tortoise-orm fastapi-mail python-dotenv

Set up environment variables (.env)

envCopyEMAIL=your-email@gmail.com
PASS=your-email-password
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

Run development server

bashCopyuvicorn app:app --reload --port 8000
Frontend Setup

Navigate to frontend directory

bashCopycd frontend

Install dependencies

bashCopynpm install

Set up environment variables (.env)

envCopyREACT_APP_API_URL=http://localhost:8000

Start development server

bashCopynpm start
📡 API Endpoints
Products
CopyGET    /product         - List all products
GET    /product/{id}    - Get product details
POST   /product/{supplier_id} - Create product
PUT    /product/{id}    - Update product
DELETE /product/{id}    - Delete product
Suppliers
CopyGET    /supplier         - List suppliers
POST   /supplier        - Add supplier
PUT    /supplier/{id}    - Update supplier
DELETE /supplier/{id}    - Delete supplier
Email
CopyPOST   /email/{product_id} - Send supplier email
📊 Data Models
Product Model
typescriptCopy{
    id: number;
    name: string;
    quantity_in_stock: number;
    quantity_sold: number;
    unit_price: number;
    revenue: number;
    supplied_by: number;
}
Supplier Model
typescriptCopy{
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
}
🔄 State Management Example
javascriptCopy// Product Context Usage
const [Products, setProducts] = useContext(ProductContext);

// Update Product
const updateForm = (e) => {
    setProductInfo({
        ...productInfo,
        [e.target.name]: e.target.value
    });
};
🚀 Deployment
The application is deployed on Render:
Backend Deployment

Create a new Web Service on Render
Connect your GitHub repository
Configure environment variables:

DATABASE_URL
EMAIL
PASS


Set build command: pip install -r requirements.txt
Set start command: uvicorn app:app --host 0.0.0.0 --port $PORT

Frontend Deployment

Create a new Static Site on Render
Connect your GitHub repository
Set build command: npm install && npm run build
Set publish directory: build

🔐 Security Features

CORS configuration for specified origins
Environment variables for sensitive data
Email authentication
Input validation

🐛 Troubleshooting
Common issues and solutions:

CORS errors: Check if your domain is added to the allowed origins
Database connection: Verify PostgreSQL connection string
Email sending failures: Check email credentials

📱 Responsive Design
The application is fully responsive and tested on:

Desktop (1200px+)
Tablet (768px - 1199px)
Mobile (320px - 767px)

🤝 Contributing

Fork the repository
Create your feature branch
Commit your changes
Push to the branch
Create a Pull Request

📄 License
This project is licensed under the MIT License.

Made with ❤️ using FastAPI and React
