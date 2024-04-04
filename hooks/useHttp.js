import React from 'react';
import axios from 'axios';
import Cors from 'cors'
import initMiddleware from '@/hooks/initmidle'

const useHTTP = (url, token) => {
        

        const [data, setData] = React.useState(null);
        const [error, setError] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
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
        return { data, loading, error };
}



export default useHTTP;