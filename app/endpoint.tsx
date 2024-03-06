import React,{useState, useEffect} from "react";

function FetchDataPage(){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData(){
            try{
                let response = await fetch('')
            }catch(error){
                console.log('Error en la data', error)
                setLoading(false)
            }
        }
    })
}