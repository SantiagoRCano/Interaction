"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import useHTTP from '@/hooks/useHttp'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const page = () => {
    const params = useParams()



    const { data, loading, error} = useHTTP(`https://www.cpocketbot.com/api/interaccion/${params.service}`)
    

    const [otherData, setOtherData] = React.useState([]);

    let formatData = {
        November:"Noviembre 2023",
        December:"Diciembre 2023",
        January:"Enero",
        February:"Febrero",
        March:"Marzo",
        April:"Abril",
        May:"Mayo",
        June:"Junio",
        July:"Julio",
        August:"Agosto"
    }

    let nuevo = []

    React.useEffect(() => {
        if(data && !loading && !error){
            for(let i = 0; i < data.length; i++){
                let mes = formatData[data[i].Mes]
                let valor = data[i].Total
                nuevo.push({Month:mes, Total: valor})
            }
        }

        setOtherData(nuevo)
    },[data,loading,error])


    let totalService = otherData.reduce((a,b) => a + b.Total, 0)
    

  return (
        <div className="bg-#3FA7D6 min-w-[8rem] min-h-[4rem] p-5 rounded-lg mx-auto">
            {data && !loading && !error && <h2 className="text-white text-center sm:mb-10 sm:text-2xl"> {params.service} : {totalService} </h2> }
            {error && !data && !loading && <h2 className="text-white"> Error al </h2>}
            {loading && !error && !data && <h2 className="text-white"> Cargando... </h2>}
            
            <div className='flex justify-center'>
                <ResponsiveContainer width="50%" aspect={2}>
                    <BarChart data={otherData} width={500} height={300} margin={{top:5,right:30,left:20,bottom:5}}>
                        <CartesianGrid strokeDasharray="1 1 1"/>
                        <XAxis dataKey="Month"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="Total" fill="#8884d8"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        
        
        
  )

  
}

export default page;