import React from "react";
import axios from "axios";
import Cors from 'cors'
import initMiddleware from '@/hooks/initmidle'


const serviceHttp = (url,token) => {
    const [dataNews, setData] = React.useState(null);
    const [errorNews, setError] = React.useState(null);
    const [loadingNews, setLoading] = React.useState(true);


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
        console.log(dataNews)
    }, [url]);
    return { dataNews, loadingNews, errorNews };
}

export default serviceHttp;