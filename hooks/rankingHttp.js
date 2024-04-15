import React from "react";
import axios from "axios";



const rakingHttp = (url, token) => {
    const [rankingData, setData] = React.useState(null);
    const [rankingError, setError] = React.useState(null);
    const [rakingLoading, setLoading] = React.useState(true);


    React.useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, [url]);
    return { rankingData, rakingLoading, rankingError };
}

export default rakingHttp;