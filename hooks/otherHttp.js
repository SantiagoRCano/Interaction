import React from "react";
import axios from "axios";

const otherHttp = (url, token) => {
    const [oData, setData] = React.useState(null);
    const [oDataError, setError] = React.useState(null);
    const [oDataLoading, setLoading] = React.useState(true);

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

    return { oData, oDataLoading, oDataError };
};

export default otherHttp;
