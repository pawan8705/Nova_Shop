import axios from "axios";
import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const validateImage = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            const timeout = setTimeout(() => resolve(false), 3000);

            img.onload = () => {
                clearTimeout(timeout);
                resolve(true);
            };
            img.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };
        });
    };

    // FETCHING ALL PRODUCTS FROM DUMMYJSON
    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // DummyJSON API call
            const res = await axios.get("https://dummyjson.com/products?limit=0");

            let productsData = res.data.products || [];
            setData(productsData);
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const getUniqueCategory = (data, property) => {
        if (!data || data.length === 0) return ["All"];
        
        let newVal = data.map((curElem) => {
            return curElem[property];
        });
        
        // Remove undefined/null values
        newVal = newVal.filter(item => item);
        
        newVal = ["All", ...new Set(newVal)];
        return newVal;
    };

    const categoryOnlyData = getUniqueCategory(data, "category");
    const brandOnlyData = getUniqueCategory(data, "brand");

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                fetchAllProducts,
                categoryOnlyData,
                brandOnlyData,
                loading,
                error,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components, react-hooks/rules-of-hooks
export const getData = () => useContext(DataContext);