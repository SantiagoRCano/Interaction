"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import useHTTP from '@/hooks/useHttp'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const page = () => {
    const params = useParams()



    const { data, loading, error} = useHTTP(`https://www.cpocketbot.com/api/interaccion/${params.service}`)
    

    const [otherData, setOtherData] = React.useState([
        { name: "Enero", Total: 0 },
        { name: "Febrero", Total: 0 },
        { name: "Marzo", Total: 0 },
        { name: "Abril", Total: 0 }
    ]);

    React.useEffect(() => {
        if(data && !loading && !error){
            const updateData = otherData.map(item => ({
                ...item,
                Total: data.Total
            }))

            setOtherData(updateData)
        }
    },[data,loading,error])


  return (
        <div className="bg-#3FA7D6 min-w-[8rem] min-h-[4rem] p-5 rounded-lg mx-auto">
            {data && !loading && !error && <h2 className="text-white"> {params.service} : {data.Total} </h2> }
            {error && !data && !loading && <h2 className="text-white"> Error al </h2>}
            {loading && !error && !data && <h2 className="text-white"> Cargando... </h2>}
            
            

            <ResponsiveContainer width="50%" aspect={2}>
                <BarChart data={otherData} width={500} height={300} margin={{top:5,right:30,left:20,bottom:5}}>
                <CartesianGrid strokeDasharray="1 1 1"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="Total" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
        </div>

        
        
        
  )

  
}

export default page;