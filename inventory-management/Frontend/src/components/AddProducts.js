import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const AddProducts = () => {
    const [productInfo, setProductInfo] = useState({
        ProductName: "",
        QuantityInStock: "",
        QuantitySold: "",
        UnitPrice: "",
        Revenue: "",
        Supplier: ""
    });

    const [isLoading, setIsLoading] = useState(false); // Loading state

    const updateForm = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
    };

    const postData = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        console.log(productInfo);
        
        // Update the backend URL
        const url = "https://inventory-management-backend-ppyt.onrender.com/product/" + productInfo['Supplier'];

        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "name": productInfo['ProductName'],
                    "quantity_in_stock": productInfo['QuantityInStock'],
                    "quantity_sold": productInfo['QuantitySold'],
                    "unit_price": productInfo['UnitPrice'],
                    "revenue": productInfo['Revenue']
                })
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Error response:", result);
                alert("Failed to add product: " + (result.message || "Unknown error"));
                return;
            }

            if (result.status === 'ok') {
                alert("Product added successfully");
                window.location.href = "/"; // Refresh the page after successful submission
            }

            // Reset form fields
            setProductInfo({
                ProductName: "",
                QuantityInStock: "",
                QuantitySold: "",
                UnitPrice: "",
                Revenue: "",
                Supplier: ""
            });
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to add product: " + error.message);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={postData}>
                    <Form.Group controlId="ProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="ProductName"
                            value={productInfo.ProductName}
                            onChange={updateForm}
                            placeholder="Product Name"
                            required // Make it a required field
                        />
                    </Form.Group>

                    <Form.Group controlId="QuantityInStock">
                        <Form.Label>Quantity In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="QuantityInStock"
                            value={productInfo.QuantityInStock}
                            onChange={updateForm}
                            placeholder="Quantity In Stock"
                            required // Make it a required field
                        />
                    </Form.Group>

                    <Form.Group controlId="QuantitySold">
                        <Form.Label>Quantity Sold</Form.Label>
                        <Form.Control
                            type="number"
                            name="QuantitySold"
                            value={productInfo.QuantitySold}
                            onChange={updateForm}
                            placeholder="Quantity Sold"
                        />
                    </Form.Group>

                    <Form.Group controlId="UnitPrice">
                        <Form.Label>Unit Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="UnitPrice"
                            value={productInfo.UnitPrice}
                            onChange={updateForm}
                            placeholder="Unit Price"
                            required // Make it a required field
                        />
                    </Form.Group>

                    <Form.Group controlId="Revenue">
                        <Form.Label>Revenue</Form.Label>
                        <Form.Control
                            type="number"
                            name="Revenue"
                            value={productInfo.Revenue}
                            onChange={updateForm}
                            placeholder="Revenue"
                        />
                    </Form.Group>

                     <Form.Group controlId="Supplier">
                         <Form.Label>Supplier</Form.Label>
                         <Form.Control
                             type="number"
                             name="Supplier"
                             value={productInfo.Supplier}
                             onChange={updateForm}
                             placeholder="Supplier"
                         />
                     </Form.Group>

                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddProducts;














// import React, { useState } from 'react';
// import { Form, Button, Card } from 'react-bootstrap';

// const AddProducts = () => {
//     const [productInfo, setProductInfo] = useState({
//         ProductName: "",
//         QuantityInStock: "",
//         QuantitySold: "",
//         UnitPrice: "",
//         Revenue: "",
//         Supplier: ""
//     });

//     const updateForm = (e) => {
//         setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
//     };

//     const postData = async (e) => {
//         e.preventDefault();
//         console.log(productInfo);
        
//         const url = "http://localhost:8001/product/" + productInfo['Supplier'];

//         const response = await fetch(url, {
//             method: 'POST',
//             mode: 'cors',
//             cache: 'no-cache',
//             credentials: 'same-origin',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             redirect: 'follow',
//             referrerPolicy: 'no-referrer',
//             body: JSON.stringify({
//                 "name": productInfo['ProductName'],
//                 "quantity_in_stock": productInfo['QuantityInStock'],
//                 "quantity_sold": productInfo['QuantitySold'],
//                 "unit_price": productInfo['UnitPrice'],
//                 "revenue": productInfo['Revenue']
//             })
//         });

//         const result = await response.json();

//         if (result.status === 'ok') {
//             alert("Product added successfully");
//             // Refresh the page after successful submission
//             window.location.href = "/"; // This will refresh the page
//         } else {
//             alert("Failed to add product");
//         }

//         // Reset form fields
//         setProductInfo({
//             ProductName: "",
//             QuantityInStock: "",
//             QuantitySold: "",
//             UnitPrice: "",
//             Revenue: "",
//             Supplier: ""
//         });
//     };

//     return (
//         <Card>
//             <Card.Body>
//                 <Form onSubmit={postData}>
//                     <Form.Group controlId="ProductName">
//                         <Form.Label>Product Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="ProductName"
//                             value={productInfo.ProductName}
//                             onChange={updateForm}
//                             placeholder="Product Name"
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="QuantityInStock">
//                         <Form.Label>Quantity In Stock</Form.Label>
//                         <Form.Control
//                             type="number"
//                             name="QuantityInStock"
//                             value={productInfo.QuantityInStock}
//                             onChange={updateForm}
//                             placeholder="Quantity In Stock"
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="QuantitySold">
//                         <Form.Label>Quantity Sold</Form.Label>
//                         <Form.Control
//                             type="number"
//                             name="QuantitySold"
//                             value={productInfo.QuantitySold}
//                             onChange={updateForm}
//                             placeholder="Quantity Sold"
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="UnitPrice">
//                         <Form.Label>Unit Price</Form.Label>
//                         <Form.Control
//                             type="number"
//                             name="UnitPrice"
//                             value={productInfo.UnitPrice}
//                             onChange={updateForm}
//                             placeholder="Unit Price"
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="Revenue">
//                         <Form.Label>Revenue</Form.Label>
//                         <Form.Control
//                             type="number"
//                             name="Revenue"
//                             value={productInfo.Revenue}
//                             onChange={updateForm}
//                             placeholder="Revenue"
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="Supplier">
//                         <Form.Label>Supplier</Form.Label>
//                         <Form.Control
//                             type="number"
//                             name="Supplier"
//                             value={productInfo.Supplier}
//                             onChange={updateForm}
//                             placeholder="Supplier"
//                         />
//                     </Form.Group>

//                     <Button variant="primary" type="submit">
//                         Submit
//                     </Button>
//                 </Form>
//             </Card.Body>
//         </Card>
//     );
// };

// export default AddProducts;
