import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ProductProvider } from './ProductContext';
import { SupplierContextProvider } from './SupplierContext';
import ProductsTable from './components/ProductsTable';
import AddProducts from './components/AddProducts';
import UpdateProduct from './components/UpdateProduct';
import SupplierPage from './components/SupplierPage';
import { UpdateProductContextProvider } from './updateProductContext';

function App() {
  return (
    <ProductProvider>
      <SupplierContextProvider>
        <UpdateProductContextProvider>
          <Router>
            <NavBar />
            <div className='row'>
              <div className='col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4'>
                <Routes>
                  <Route path="/" element={<ProductsTable />} />
                  <Route path="/updateproduct" element={<UpdateProduct />} />
                  <Route path="/add-product" element={<AddProducts />} />
                  <Route path="/suppliers" element={<SupplierPage />} />
                </Routes>
              </div>
            </div>
          </Router>
        </UpdateProductContextProvider>
      </SupplierContextProvider>
    </ProductProvider>
  );
}

export default App;
