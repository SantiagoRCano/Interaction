"use client"
import Image from "next/image";
import Hola from "@/app/hola";
import React from "react";
import useHttp from "@/hooks/useHttp"
import { Tranquiluxe } from "uvcanvas"
import BotonLleva from '@/app/RedirectButton'



export default function Home() {

    const other = [
      {name: "Santiago", age:19, weight: 51},
      {name: "Alejo", age:26, weight: 70},
      {name: "Alexander", age:29, weight: 67},
      {name: "Simon", age:21, weight: 110}
    ]


  const [id, setId] = React.useState("")

  const reverseData = (arg) => setId(arg)

  const { data, loading, error} = useHttp(`https://www.cpocketbot.com/api/interaccion/${id}`)



  return (
    <main className="flex min-h-[7rem] flex-col items-center justify-center align-middle p-24">
        <div className="bg-vermilon flex flex-wrap justify-center items-center text-center gap-14 p-5 rounded-lg mb-32 h-full">
          <BotonLleva destination={`./services`} buttonText="Mercado"/>
          <BotonLleva destination={`./services`} buttonText="Multas"/>
          <BotonLleva destination={`./services`} buttonText="Inmobiliaria"/>
          <BotonLleva destination={`./services`} buttonText="Recordatorios"/>
          <BotonLleva destination={`./services`} buttonText="Imagen"/>
          <BotonLleva destination={`./services`} buttonText="Total"/>
        </div>
    </main>

    
  );
}
