"use client"
import React, { useEffect, useState} from 'react'
import useHTTP from '@/hooks/useHttp'
import serviceHttp from '@/hooks/servicesHttps'
import rakingHttp from '@/hooks/rankingHttp'
import otherHttp from '@/hooks/otherHttp'

export const Page = () => {
    let [rankData, setRankData ] = useState([])
    let [noticiasData, setNoticiasData ] = useState([])
    let [respondeData, setRespondeData ] = useState([])
    let [vuelosData, setVuelosData] = useState([])
    
    const { data, loading, error } = useHTTP('http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/rankingMonth')
    const { dataNews, loadingNews, errorNews} = serviceHttp(`http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/interaccion/Noticias`)
    const {rankingData, rakingLoading, rankingError } = rakingHttp(`http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/respondeMonth`)
    const { oData, oDataLoading, oDataError} = otherHttp(`http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/interaccion/Vuelos`)


    useEffect(() => {
        if(data && !loading && !error){
            setRankData(data)
        }

        if(dataNews && !loadingNews && !errorNews){
            setNoticiasData(dataNews)
        }

        if(rankingData && !rakingLoading && !rankingError){
            setRespondeData(rankingData)
        }

        if(oData && !oDataLoading && !oDataError){
            setVuelosData(oData)
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

    // const processedData = rankData.map(monthData => {
    //     const { Mes, ...services } = monthData;
    //     const serviceNames = Object.keys(services);
    //     const serviceValues = serviceNames.map(service => parseInt(services[service], 10));
    
    //     const maxServiceValue = Math.max(...serviceValues);
    
    //     const bestService = maxServiceValue === 0 ? "No Servicio" :
    //         serviceNames[serviceValues.indexOf(maxServiceValue)].replace("Total", "");
    
    //     return {
    //         ...monthData,
    //         Mes: formatData[Mes] || Mes,
    //         MejorServicio: bestService
    //     };
    // });


    const mergeData = () => {
        return rankData.map(item => {
            const newsItem = noticiasData.find(news => news.Mes === item.Mes);
            const respondeItem = respondeData.find(responde => responde.Mes === item.Mes)
            const vuelosItem = vuelosData.find(vuelo => vuelo.Mes === item.Mes)
            return {
                ...item,
                TotalNoticias: newsItem ? (parseInt(item.TotalNoticias || 0) + newsItem.Total).toString() : item.TotalNoticias || '0',
                TotalResponde: respondeItem ? (parseInt(item.TotalResponde || 0) + respondeItem.Total).toString() : item.TotalResponde || '0',
                TotalVuelo: vuelosItem ? (parseInt(item.TotalVuelo || 0) + vuelosItem.Total).toString() : item.TotalVuelo || '0',
                Mes: formatData[item.Mes]
            };
        });
    };

    const mergedTableData = mergeData();


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
                        <th className="px-4 py-3 text-center">Noticias</th>
                        <th className="px-4 py-3 text-center">Responde</th>
                        <th className="px-4 py-3 text-center">Vuelos</th>
                        <th className="px-4 py-3 text-center">Mejor Servicio</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {mergedTableData.map((row, index) => {
                        // Calcular el Mejor Servicio
                        const servicios = [
                            { name: 'Multas', total: parseInt(row.TotalMultas) },
                            { name: 'Inmobiliaria', total: parseInt(row.TotalInmobiliaria) },
                            { name: 'Mercado', total: parseInt(row.TotalMercado) },
                            { name: 'Imagen', total: parseInt(row.TotalImagen) },
                            { name: 'Recordatorios', total: parseInt(row.TotalRecordatorios) },
                            { name: 'Resumen', total: parseInt(row.TotalResumen) },
                            { name: 'EImagen', total: parseInt(row.TotalEImagen) },
                            { name: 'Noticias', total: parseInt(row.TotalNoticias) },
                            { name: 'Responde', total: parseInt(row.TotalResponde) },
                            { name: 'Vuelo', total: parseInt(row.TotalVuelo) },

                        ];

                        const mejorServicio = servicios.reduce((max, servicio) =>
                            servicio.total > max.total ? servicio : max, { name: 'No Servicio', total: 0 }).name;

                        return (
                            <tr key={index}>
                                <td className="border px-4 py-2">{row.Mes}</td>
                                <td className="border px-4 py-2">{row.TotalMultas}</td>
                                <td className="border px-4 py-2">{row.TotalInmobiliaria}</td>
                                <td className="border px-4 py-2">{row.TotalMercado}</td>
                                <td className="border px-4 py-2">{row.TotalImagen}</td>
                                <td className="border px-4 py-2">{row.TotalRecordatorios}</td>
                                <td className="border px-4 py-2">{row.TotalResumen}</td>
                                <td className="border px-4 py-2">{row.TotalEImagen}</td>
                                <td className="border px-4 py-2">{row.TotalNoticias}</td>
                                <td className="border px-4 py-2">{row.TotalResponde}</td>
                                <td className="border px-4 py-2">{row.TotalVuelo}</td>
                                <td className="border px-4 py-2">{mejorServicio}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </React.Fragment>
  )
}

export default Page;