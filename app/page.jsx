"use client"
import Image from "next/image";
import React from "react";
import useHttp from "@/hooks/useHttp"
import { Tranquiluxe } from "uvcanvas"
import BotonLleva from '@/app/RedirectButton'



export default function Home() {

  return (
    <main className="flex min-h-[7rem] flex-col items-center justify-center align-middle p-24">
        <div className="bg-zander flex flex-wrap justify-center items-center text-center gap-14 p-5 rounded-lg mb-32 h-full">
          <BotonLleva destination={`./services`} buttonText="Mercado"/>
          <BotonLleva destination={`./services`} buttonText="Multas"/>
          <BotonLleva destination={`./services`} buttonText="Inmobiliaria"/>
          <BotonLleva destination={`./services`} buttonText="Recordatorios"/>
          <BotonLleva destination={`./services`} buttonText="Imagen"/>
          <BotonLleva destination={`./services`} buttonText="Responde"/>
          <BotonLleva destination={`./services`} buttonText="Resumen"/>
          <BotonLleva destination={`./services`} buttonText="Total"/>
          <BotonLleva destination={`./services`} buttonText="Noticias"/>
        </div>
    </main>

    
  );
}
