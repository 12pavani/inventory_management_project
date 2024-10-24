import React, { useContext, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductContext";

const NavBar = () => {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useContext(ProductContext);

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const filterProduct = (e) => {
    e.preventDefault()
    const product = products.data.filter(product => product.name.toLowerCase() === search.toLowerCase())
    setProducts({"data": [...product]})
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Inventory Management App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Badge className="mt-2" variant="primary">
            Products In Stock {products.data.length}
          </Badge>
        </Nav>
        <Form onSubmit={filterProduct} inline className="d-flex align-items-center">
          {/* Replace the Button with a Link to navigate */}
          <Link to="/add-product">
            <Button className="btn btn-primary btn-sm mr-2">
              Add Product
            </Button>
          </Link>
          <div className="d-flex align-items-center">
            <FormControl
              value = {search}
              onChange={updateSearch}
              type="text"
              placeholder="Search"
              className="custom-search mr-2"
            />
            <Button type="submit" className="custom-search-btn" variant="outline-primary">
              Search
            </Button>
          </div>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
