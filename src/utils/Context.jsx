import axios from './axios';
import React, { useEffect, useState } from 'react';

export const ProductContext = React.createContext();

const Context = (props) => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios("/products");
            setProducts(response.data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider value={[products, setProducts]}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default Context;
