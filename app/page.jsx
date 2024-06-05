"use client"
import React, {useEffect,useState} from "react";
import { BotonLleva,BotonLlevaTwo } from '@/app/RedirectButton'
import rakingHttp from '@/hooks/rankingHttp'
import useHTTP from "@/hooks/useHttp";



export default function Home() {
  let [rakingData, setRakingData] = useState([])

  const {rankingData, rakingLoading, rankingError } = rakingHttp(`https://www.cpocketbot.com/api/rankingInteraction`)
  const { data, loading, error } = useHTTP(`https://www.cpocketbot.com/api/usersPocki`)


  useEffect(() => {
    if(rankingData && !rakingLoading && !rankingError){
      let otherObject = rankingData.sort((a,b) => b.Total - a.Total)

      setRakingData(otherObject)
    }
  })




  return (
    <main className="flex min-h-[7rem] flex-col items-center justify-center align-middle p-24">
        {loading && <p>Cargando...</p>}
        {error && <p>Ocurrió un error al cargar la data.</p>}
        {data && (
          <h2 className="text-black mb-6 p-3 bg-green-500 rounded-lg">Cantidad de personas que le han copiado al bot desde que se creo: {data.Total}</h2>
        )}
        <div className="bg-zander flex flex-wrap justify-center items-center text-center gap-14 p-5 rounded-lg mb-32 h-full">
          <BotonLleva destination={`./services`} buttonText="Mercado"/>
          <BotonLleva destination={`./services`} buttonText="Multas"/>
          <BotonLleva destination={`./services`} buttonText="Inmobiliaria"/>
          <BotonLleva destination={`./services`} buttonText="Recordatorios"/>
          <BotonLleva destination={`./services`} buttonText="Imagen"/>
          <BotonLleva destination={`./services`} buttonText="Responde"/>
          <BotonLleva destination={`./services`} buttonText="Resumen"/>
          <BotonLleva destination={`./services`} buttonText="Noticias"/>
          <BotonLleva destination={`./services`} buttonText="Total"/>
          <BotonLleva destination={`./services`} buttonText="Editar Imagen"/>
          <BotonLlevaTwo destination={`./recurrence`} buttonText="Recurrencia"/>
        </div>

        

        <div className="flex justify-between">
          <div className="text-center border-green-500 border-2 p-5 rounded-lg">
            <h1 className="mb-5 text-white">Ranking de servicios más usados</h1>
            {loading && <p>Cargando...</p>}
            {rakingData.map((inter,index)=> (
              <h3 key={index} className="text-white m-1">{inter.Categoria}: {inter.Total}</h3>
            ))}
          </div>
        </div>
    </main>

    
  );
}
