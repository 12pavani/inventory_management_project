import React, { useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { ProductContext } from "../ProductContext";
import { UpdateContext } from "../updateProductContext";  
import ProductsRow from "./ProductsRow";
import { useNavigate } from "react-router-dom";

const ProductsTable = () => {
  const [products, setProducts] = useContext(ProductContext);
  const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext);  
  const navigate = useNavigate(); 

  const handleDelete = async (id) => {
    try {
      const resp = await fetch("https://inventory-management-backend-ppyt.onrender.com/product/" + id, {
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
      });
      const result = await resp.json();
      if (result.status === "ok") {
        const filteredProducts = products.data.filter(product => product.id !== id);
        setProducts({ data: [...filteredProducts] });
        alert("Product deleted");
      } else {
        alert("Product deletion failed");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };
  

  const handleUpdate = (id) => {
    const product = products.data.filter((product) => product.id === id)[0];
    setUpdateProductInfo({
      ProductName: product.name,
      QuantityInStock: product.quantity_in_stock,
      QuantitySold: product.quantity_sold,
      UnitPrice: product.unit_price,
      Revenue: product.revenue,
      ProductID: id,
    });
    navigate("/updateproduct"); 
  };

  // Function to handle supplier button click
  const handleSupplier = (id) => {
    navigate("/suppliers"); // Navigate to SupplierPage
  };

  useEffect(() => {
    fetch("https://inventory-management-backend-ppyt.onrender.com/product")
      .then((resp) => resp.json())
      .then((results) => {
        console.log(results);
        setProducts({ data: [...results.data] });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); 

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Product Name</th>
          <th>Quantity In Stock</th>
          <th>Quantity Sold</th>
          <th>Unit Price</th>
          <th>Revenue</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.data &&
          products.data.map((product) => (
            <ProductsRow
              id={product.id}
              name={product.name}
              quantity_in_stock={product.quantity_in_stock}
              quantity_sold={product.quantity_sold}
              unit_price={product.unit_price}
              revenue={product.revenue}
              key={product.id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleSupplier={handleSupplier} 
            />
          ))}
      </tbody>
    </Table>
  );
};

export default ProductsTable;











// import React, { useEffect, useContext } from "react";
// import { Table } from "react-bootstrap";
// import { ProductContext } from "../ProductContext";
// import { UpdateContext } from "../updateProductContext";  
// import ProductsRow from "./ProductsRow";
// import { useNavigate } from "react-router-dom";

// const ProductsTable = () => {
//   const [products, setProducts] = useContext(ProductContext);
//   const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext);  
//   const navigate = useNavigate(); 

//   const handleDelete = async (id) => {
//     try {
//       const resp = await fetch("http://127.0.0.1:8001/product/" + id, {
//         method: "DELETE",
//         headers: {
//           accept: "application/json",
//         },
//       });
//       const result = await resp.json();
//       if (result.status === "ok") {
//         const filteredProducts = products.data.filter(product => product.id !== id);
//         setProducts({ data: [...filteredProducts] });
//         alert("Product deleted");
//       } else {
//         alert("Product deletion failed");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("An error occurred while deleting the product.");
//     }
//   };
  

//   const handleUpdate = (id) => {
//     const product = products.data.filter((product) => product.id === id)[0];
//     setUpdateProductInfo({
//       ProductName: product.name,
//       QuantityInStock: product.quantity_in_stock,
//       QuantitySold: product.quantity_sold,
//       UnitPrice: product.unit_price,
//       Revenue: product.revenue,
//       ProductID: id,
//     });
//     navigate("/updateproduct"); 
//   };

//   // New function to handle supplier button click
//   const handleSupplier = (id) => {
//     // You can use the id for anything if needed
//     navigate("/suppliers"); // Navigate to SupplierPage
//   };

//   useEffect(() => {
//     fetch("http://127.0.0.1:8001/product")
//       .then((resp) => resp.json())
//       .then((results) => {
//         console.log(results);
//         setProducts({ data: [...results.data] });
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []); 

//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Id</th>
//           <th>Product Name</th>
//           <th>Quantity In Stock</th>
//           <th>Quantity Sold</th>
//           <th>Unit Price</th>
//           <th>Revenue</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.data &&
//           products.data.map((product) => (
//             <ProductsRow
//               id={product.id}
//               name={product.name}
//               quantity_in_stock={product.quantity_in_stock}
//               quantity_sold={product.quantity_sold}
//               unit_price={product.unit_price}
//               revenue={product.revenue}
//               key={product.id}
//               handleDelete={handleDelete}
//               handleUpdate={handleUpdate}
//               handleSupplier={handleSupplier} 
//             />
//           ))}
//       </tbody>
//     </Table>
//   );
// };

// export default ProductsTable;
