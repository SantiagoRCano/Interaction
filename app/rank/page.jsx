"use client"
import React, { useEffect, useState} from 'react'
import useHTTP from '@/hooks/useHttp'

export const Page = () => {
    let [rankData, setRankData ] = useState([])

    const { data, loading, error } = useHTTP('https://www.cpocketbot.com/api/rankingMonth')

    useEffect(() => {
        if(data && !loading && !error){
            setRankData(data)
        }
    })

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

    const processedData = rankData.map(monthData => {
        const { Mes, ...services } = monthData;
        const serviceNames = Object.keys(services);
        const serviceValues = serviceNames.map(service => parseInt(services[service], 10));
    
        const maxServiceValue = Math.max(...serviceValues);
    
        const bestService = maxServiceValue === 0 ? "No Servicio" :
            serviceNames[serviceValues.indexOf(maxServiceValue)].replace("Total", "");
    
        return {
            ...monthData,
            Mes: formatData[Mes] || Mes,
            MejorServicio: bestService
        };
    });


  return (
    <React.Fragment>
         <div className="overflow-x-auto p-4">
            <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                        <th className="px-4 py-3 text-center">Mes</th>
                        <th className="px-4 py-3 text-center">Multas</th>
                        <th className="px-4 py-3 text-center">Inmobiliaria</th>
                        <th className="px-4 py-3 text-center">Mercado</th>
                        <th className="px-4 py-3 text-center">Imagen</th>
                        <th className="px-4 py-3 text-center">Recordatorios</th>
                        <th className="px-4 py-3 text-center">Resumen</th>
                        <th className="px-4 py-3 text-center">Editar Imagen</th>
                        <th className="px-4 py-3 text-center">Mejor Servicio</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {processedData.map((row, index) => (
                        <tr key={index} className='bg-green-500'>
                            <td className="px-4 py-3 border text-center text-white">{row.Mes}</td>
                            <td className="px-4 py-3 border text-center text-white">{row.TotalMultas}</td>
                            <td className="px-4 py-3 border text-center text-white">{row.TotalInmobiliaria}</td>
                            <td className="px-4 py-3 border text-center text-white">{row.TotalMercado}</td>
                            <td className="px-4 py-3 border text-center text-white">{row.TotalImagen}</td>
                            <td className="px-4 py-3 border text-center text-white">{row.TotalRecordatorios}</td>
                            <td className="px-4 py-3 border text-center text-white">{row.TotalResumen}</td>
                            <td className="px-4 py-3 border text-center text-white">{row.TotalEImagen}</td>
                            <td className="px-4 py-3 border text-center text-white font-semibold">{row.MejorServicio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </React.Fragment>
  )
}

export default Page;