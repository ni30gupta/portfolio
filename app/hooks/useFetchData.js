import React,{useEffect, useState} from 'react'

const useFetchData = (url='') => {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true); // Explicitly set loading at start
            const response = await fetch(url);
            if (response.status !== 200) {
                console.log(response)
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
                        
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (url) {
        setData(null);
        setError(null);
        fetchData();
    }

}, [url]);

return [data, loading, error];
}

export default useFetchData