import React from "react";
import axios from "axios";

const rakingHttp = (url, token) => {
    const [rankingData, setData] = React.useState(null);
    const [rankingError, setError] = React.useState(null);
    const [rankingLoading, setLoading] = React.useState(true);

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

    return { rankingData, rankingLoading, rankingError };
};

export default rakingHttp;
