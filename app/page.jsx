"use client"
import React, {useEffect,useState} from "react";
import { BotonLleva,BotonLlevaThree,BotonLlevaTwo } from '@/app/RedirectButton'
import rakingHttp from '@/hooks/rankingHttp'
import useHTTP from "@/hooks/useHttp";



export default function Home() {
  let [rakingData, setRakingData] = useState([])

  const {rankingData, rakingLoading, rankingError } = rakingHttp(`http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/rankingInteraction`)
  const { data, loading, error } = useHTTP(`http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/usersPocki`)


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
          <buttton className="align-middle select-none font-sans mb-5 font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-green-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full">Cantidad de personas que le han copiado al bot desde que se creo: {data.Total}</buttton>
        )}
        <div className="bg-white flex flex-wrap justify-center items-center text-center gap-14 p-5 rounded-lg mb-32 h-full">
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
          <BotonLleva destination={`./services`} buttonText="Vuelos"/>
          <BotonLleva destination={`./services`} buttonText="Electrodomesticos"/>
          <BotonLleva destination={`./services`} buttonText="Empleos"/>
          <BotonLlevaTwo destination={`./recurrence`} buttonText="Recurrencia"/>
          <BotonLlevaThree destination={`./rank`} buttonText={"Servicios"}/>
          <a href="https://appservices.vercel.app/">
            <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-green-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full'>Revision</button>
          </a>
          <a href="https://appservices.vercel.app/cualification">
            <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-green-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full'>Calificacion</button>
          </a>
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
