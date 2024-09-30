import React from 'react';
import axios from 'axios';

const useHTTP = (url, token) => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    headers: token ? {
                        "Authorization": `Bearer ${token}`
                    } : {}
                });
                setData(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error?.response?.data || "Error de conexión");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, token]);

    return { data, loading, error };
};

export default useHTTP;