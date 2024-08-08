"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import useHTTP from '@/hooks/useHttp'
import serviceHttp from '@/hooks/servicesHttps'
import { CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,Legend,LineChart,Line } from "recharts"

export const Page = () => {
    const params = useParams()
    let [otherData, setOtherData] = React.useState([]);
    let [newValor, setValorNews] = React.useState([])
    



    const { data, loading, error} = useHTTP(`https://www.cpocketbot.com/api/interaccion/${params.service}`)
    const { dataNews, loadingNews, errorNews} = serviceHttp(`https://www.cpocketbot.com/api/interaccionWeek/${params.service}`)
    


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
        '2023-May':'Mayo 2023',
        '2023-June':'Junio 2023',
        '2023-July':'Julio 2023',
        '2023-August':'Agosto 2023',
        '2023-September':'Septiembre 2023',
        '2023-October':'Octubre 2023',
        '2023-November':'Noviembre 2023',
        '2023-December':'Diciembre 2023',
        '2024-January':'Enero',
        '2024-February':'Febrero',
        '2024-March':'Marzo',
        '2024-April':'Abril',
        '2024-May':'Mayo',
        '2024-June':'Junio',
        '2024-July':'Julio',
        '2024-August':'Agosto',
        '2024-September':'Septiembre'
    };

    let newsDate = {
        '2023-5':'Mayo 2023',
        '2023-6':'Junio 2023',
        '2023-7':'Julio 2023',
        '2023-8':'Agosto 2023',
        '2023-9':'Septiembre 2023',
        '2023-10':'Octubre 2023',
        '2023-11':'Noviembre 2023',
        '2023-12':'Diciembre 2023',
        '2024-1':'Enero 2024',
        '2024-2':'Febrero 2024',
        '2024-3':'Marzo 2024',
        '2024-4':'Abril 2024',
        '2024-5':'Mayo 2024',
        '2024-6':'Junio 2024',
        '2024-7':'Julio 2024',
        '2024-8':'Agosto 2024',
        '2024-9':'Septiembre 2024'
    }
            


    let nuevo = []
    let tempNoticias = []
    
    
    
    
    React.useEffect(() => {
        if(data && !loading && !error){
            for(let i = 0; i < data.length; i++){
                let mes = formatData[data[i].Mes]
                let valor = parseFloat(data[i].Total);
                nuevo.push({Month:mes, Total: valor})
            }
        }
        
        setOtherData(nuevo)
    },[data,loading,error])
    
    React.useEffect(() => {
        if(dataNews && !loadingNews && !errorNews){
            

            for(let i = 0; i < dataNews.length; i++){
                let mes = newsDate[dataNews[i].Mes]
                let semana = dataNews[i].Semana
                let valor = dataNews[i].Total


                tempNoticias.push({Month: mes, Week: semana, Count: valor})
            }
    
            setValorNews(tempNoticias)
        }

    },[dataNews, loadingNews, errorNews])

    

    let totalService = otherData.reduce((a, b) => a + (b.Total || 0), 0);
    let tamañoGrafp;
    let tamañoLetra;
    let tamañoBarra;
    let angulo;

    if(screenWidth >= 768){
        tamañoGrafp = "70%"
        tamañoLetra = 16
        tamañoBarra = 60
        angulo = 360
    }

    if(params.service === 'Editar%20Imagen'){
        params.service = 'Editar Imagen'
    }


  return (
        <div className="bg-#3FA7D6 min-w-[8rem] min-h-[4rem] p-5 rounded-lg mx-auto">
            {data && !loading && !error && <h2 className="text-white text-center sm:mb-10 sm:text-2xl"> {params.service} : {totalService} </h2> }
            {error && !data && !loading && <h2 className="text-white"> Error al </h2>}
            {loading && !error && !data && <h2 className="text-white"> Cargando... </h2>}
            
            
            <div className='flex flex-col items-center text-center justify-center md:flex-row md:text-start'>
                <ResponsiveContainer className="mt-6" width={tamañoGrafp || '120%'} aspect={3}>
                <LineChart width={730} height={250} data={otherData} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Month" className='text-white'  tick={{fontSize: 10}} angle={-45} tickMargin={10}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Total" stroke="#8884d8" />

                </LineChart>

                </ResponsiveContainer>
                
                <div className='mt-6 md:mt-0'>
                    <ul>
                        {otherData.map((inter,index) => (
                            <li key={index}>
                                <p className='text-white text-1xl'>{inter.Month || 'Total'}: {inter.Total}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 rounded-s-lg">
                                    Mes
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    # de Semana
                                </th>
                                <th scope="col" class="px-6 py-3 rounded-e-lg">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {newValor.map((element,index) => (
                                <tr class="bg-white dark:bg-gray-800" key={index}>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {element.Month}
                                    </th>
                                    <td class="px-6 py-4">
                                        {element.Week}
                                    </td>
                                    <td class="px-6 py-4">
                                        {element.Count}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
  )

  
}

export default Page;