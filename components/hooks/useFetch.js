'use client'
import React, { useEffect, useState } from 'react'

export const useFetch = ({ url, method, payload }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [url, method, payload]);

    const fetchData = async () => {
        console.log('Fetching data from:', url);
        setLoading(true);
        setError(null);
        try {
            const options = {
                method: method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            if (payload) {
                options.body = JSON.stringify(payload);
            }
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return { data, loading, error };

}
