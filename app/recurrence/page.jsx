"use client"
import React, { Fragment, useEffect, useState } from 'react'
import useHTTP from '@/hooks/useHttp'


export const Page = () => {

    let [recurrenceData, setRecurrenceData] = useState([])

    const { data, loading, error } = useHTTP(`https://www.cpocketbot.com/api/recurrence`)


    useEffect(() => {
        if(data && !loading && !error){
            setRecurrenceData(data)
        }
    })

    return(
        <React.Fragment>
             <div>
                <div class="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Telefono
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Diciembre 2023 - Julio
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recurrenceData.map((element,index) => (
                                <tr class="bg-white dark:bg-gray-800" key={index}>
                                    <td className='px-6 py-4 text-center'>
                                        {element.phone}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        {element.Total}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Page;