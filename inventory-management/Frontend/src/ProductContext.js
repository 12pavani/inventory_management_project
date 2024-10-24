import react, { useState, createContext } from 'react'

export const ProductContext = createContext();

export const ProductProvider = (props) => {
    const [Products, setProducts] = useState({ "data": []});

    return (
        <ProductContext.Provider value={[Products, setProducts]}>
            {props.children}
        </ProductContext.Provider>
    );
}