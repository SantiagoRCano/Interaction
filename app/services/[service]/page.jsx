"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import useHTTP from '@/hooks/useHttp'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"



export const page = () => {
    const params = useParams()



    const { data, loading, error} = useHTTP(`https://www.cpocketbot.com/api/interaccion/${params.service}`)
    

    const [otherData, setOtherData] = React.useState([]);
    let [screenWidth, setWindowWidth] = useState(window.innerWidth);

    const handleScreenWidth = () => {
        setWindowWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleScreenWidth)

        return () => {
            window.removeEventListener('resize', handleScreenWidth)
        }
    }, [])
    


    let formatData = {
        November:"Noviembre",
        December:"Diciembre",
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
    let tamañoGrafp;
    let tamañoLetra;
    let tamañoBarra;
    let angulo;

    if(screenWidth >= 768){
        tamañoGrafp = "80%"
        tamañoLetra = 16
        tamañoBarra = 60
        angulo = 360
    }


  return (
        <div className="bg-#3FA7D6 min-w-[8rem] min-h-[4rem] p-5 rounded-lg mx-auto">
            {data && !loading && !error && <h2 className="text-white text-center sm:mb-10 sm:text-2xl"> {params.service} : {totalService} </h2> }
            {error && !data && !loading && <h2 className="text-white"> Error al </h2>}
            {loading && !error && !data && <h2 className="text-white"> Cargando... </h2>}
            
            
            <div className='flex flex-col items-center text-center justify-center md:flex-row md:text-start'>
                <ResponsiveContainer className="mt-6" width={tamañoGrafp || '120%'} aspect={3}>
                    <BarChart data={otherData} width={100} height={100} margin={{top:5,right:30,left:20,bottom:5}}>
                        <CartesianGrid strokeDasharray="3 3" fill='#ffffff'/>
                        <XAxis dataKey="Month" tick={{ fill: 'white', fontSize: tamañoLetra || 10}} angle={angulo || 45}/>
                        <YAxis tick={{ fill: 'white'}}/>
                        <Tooltip/>
                        <Bar dataKey="Total" fill="#1f6fea" barSize={tamañoBarra || 15}/>
                    </BarChart>
                </ResponsiveContainer>
                
                <div className='mt-6 md:mt-0'>
                    <ul>
                        {otherData.map((inter) => (
                            <li>
                                <p className='text-white text-1xl'>{inter.Month || 'Total'}: {inter.Total}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        
        
        
  )

  
}

export default page;