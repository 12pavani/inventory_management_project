import React, { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { UpdateContext } from "../updateProductContext";

const UpdateProduct = () => {
  const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext);

  const updateForm = (e) => {
    setUpdateProductInfo({
      ...updateProductInfo,
      [e.target.name]: e.target.value,
    });
  };

  const postData = async (e) => {
    e.preventDefault();

    const url = `https://inventory-management-backend-ppyt.onrender.com/product/${updateProductInfo["ProductID"]}`;

    // Log the data to inspect
    const bodyData = {
      name: updateProductInfo["ProductName"],
      quantity_in_stock: updateProductInfo["QuantityInStock"],
      quantity_sold: updateProductInfo["QuantitySold"],
      unit_price: updateProductInfo["UnitPrice"],
      revenue: updateProductInfo["Revenue"],
      supplier: updateProductInfo["Supplier"], // Include Supplier field in request
    };

    console.log('Request Body:', bodyData);  // Log request body for debugging

    try {
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const resp = await response.json();
      console.log('Response:', resp);  // Log the response for debugging
    
      if (resp.status === "ok") {
        alert("Product Updated Successfully");
        window.location.href = "/";
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error('Error updating product:', error);  // Log the detailed error
      alert('An error occurred while updating the product.');
    }
    

    setUpdateProductInfo({
      ProductName: "",
      QuantityInStock: "",
      QuantitySold: "",
      UnitPrice: "",
      Revenue: "",
      ProductID: ""
    });
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
              value={updateProductInfo.ProductName}
              onChange={updateForm}
              placeholder="Product Name"
            />
          </Form.Group>

          <Form.Group controlId="QuantityInStock">
            <Form.Label>Quantity In Stock</Form.Label>
            <Form.Control
              type="number"
              name="QuantityInStock"
              value={updateProductInfo.QuantityInStock}
              onChange={updateForm}
              placeholder="Quantity In Stock"
            />
          </Form.Group>

          <Form.Group controlId="QuantitySold">
            <Form.Label>Quantity Sold</Form.Label>
            <Form.Control
              type="number"
              name="QuantitySold"
              value={updateProductInfo.QuantitySold}
              onChange={updateForm}
              placeholder="Quantity Sold"
            />
          </Form.Group>

          <Form.Group controlId="UnitPrice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              name="UnitPrice"
              value={updateProductInfo.UnitPrice}
              onChange={updateForm}
              placeholder="Unit Price"
            />
          </Form.Group>

          <Form.Group controlId="Revenue">
            <Form.Label>Revenue</Form.Label>
            <Form.Control
              type="number"
              name="Revenue"
              value={updateProductInfo.Revenue}
              onChange={updateForm}
              placeholder="Revenue"
            />
          </Form.Group>

           <Form.Group controlId="Supplier">
             <Form.Label>Supplier</Form.Label>
             <Form.Control
               type="number"
               name="Supplier"
               value={updateProductInfo.ProductID}
               onChange={updateForm}
               placeholder="Supplier"
             />
           </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateProduct;















// import React, { useContext, useState } from "react";
// import { Form, Button, Card } from "react-bootstrap";
// import { UpdateContext } from "../updateProductContext";

// const UpdateProduct = () => {
//   const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext);

//   const updateForm = (e) => {
//     setUpdateProductInfo({
//       ...updateProductInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const postData = async (e) => {
//     e.preventDefault();
  
//     const url =
//       "http://localhost:8001/product/" + updateProductInfo["ProductID"];
  
//     // Log the data to inspect
//     const bodyData = {
//       name: updateProductInfo["ProductName"],
//       quantity_in_stock: updateProductInfo["QuantityInStock"],
//       quantity_sold: updateProductInfo["QuantitySold"],
//       unit_price: updateProductInfo["UnitPrice"],
//       revenue: updateProductInfo["Revenue"],
//     };
  
//     console.log('Request Body:', bodyData);  // Log request body for debugging
  
//     const response = await fetch(url, {
//       method: "PUT",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(bodyData),
//     });
  
//     const resp = await response.json();
//     console.log('Response:', resp); // Log the response for debugging
  
//     if (resp.status === "ok") {
//       alert("Product Updated");
//       window.location.href = "/";
//     } else {
//       alert("Failed to update product");
//     }
  
//     setUpdateProductInfo({
//       ProductName: "",
//       QuantityInStock: "",
//       QuantitySold: "",
//       UnitPrice: "",
//       Revenue: "",
//       ProductID: "",
//     });
//   };
  

//   return (
//     <Card>
//       <Card.Body>
//         <Form onSubmit={postData}>
//           <Form.Group controlId="ProductName">
//             <Form.Label>Product Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="ProductName"
//               value={updateProductInfo.ProductName}
//               onChange={updateForm}
//               placeholder="Product Name"
//             />
//           </Form.Group>

//           <Form.Group controlId="QuantityInStock">
//             <Form.Label>Quantity In Stock</Form.Label>
//             <Form.Control
//               type="number"
//               name="QuantityInStock"
//               value={updateProductInfo.QuantityInStock}
//               onChange={updateForm}
//               placeholder="Quantity In Stock"
//             />
//           </Form.Group>

//           <Form.Group controlId="QuantitySold">
//             <Form.Label>Quantity Sold</Form.Label>
//             <Form.Control
//               type="number"
//               name="QuantitySold"
//               value={updateProductInfo.QuantitySold}
//               onChange={updateForm}
//               placeholder="Quantity Sold"
//             />
//           </Form.Group>

//           <Form.Group controlId="UnitPrice">
//             <Form.Label>Unit Price</Form.Label>
//             <Form.Control
//               type="number"
//               name="UnitPrice"
//               value={updateProductInfo.UnitPrice}
//               onChange={updateForm}
//               placeholder="Unit Price"
//             />
//           </Form.Group>

//           <Form.Group controlId="Revenue">
//             <Form.Label>Revenue</Form.Label>
//             <Form.Control
//               type="number"
//               name="Revenue"
//               value={updateProductInfo.Revenue}
//               onChange={updateForm}
//               placeholder="Revenue"
//             />
//           </Form.Group>

//           <Form.Group controlId="Supplier">
//             <Form.Label>Supplier</Form.Label>
//             <Form.Control
//               type="number"
//               name="Supplier"
//               value={updateProductInfo.Supplier}
//               onChange={updateForm}
//               placeholder="Supplier"
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default UpdateProduct;
