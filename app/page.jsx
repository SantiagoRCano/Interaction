"use client"
import Image from "next/image";
import Hola from "@/app/hola";
import React from "react";
import useHttp from "@/hooks/useHttp"
import { Tranquiluxe } from "uvcanvas"


export default function Home() {

  const [id, setId] = React.useState("Mercado")

  const reverseData = (arg) => setId(arg)
  const { data, loading, error} = useHttp(`https://www.cpocketbot.com/api/interaccion/${id}`)

  

  return (
    <main className="flex min-h-[7rem] flex-col items-center justify-between p-24">
        <div className="bg-rose-800 flex flex-wrap justify-center items-center gap-14 p-5 rounded-lg mb-32 h-full">
          <button onClick={() => reverseData("Mercado")} className="bg-white h-auto w-auto p-5 rounded-lg text-black" id="Mercado" value="Mercado">Mercados</button>
          <button onClick={() => reverseData("Multas")} className="bg-white h-auto w-auto p-5 rounded-lg text-black" id="Multa" value="Multas">Multas</button>
          <button onClick={() => reverseData("Inmobiliaria")} className="bg-white h-auto w-auto p-5 rounded-lg text-black" id="inmobiliaria" value="Inmobiliaria">Inmobiliaria</button>
          <button onClick={() => reverseData("Recordatorios")} className="bg-white h-auto w-auto p-5 rounded-lg text-black" id="recordatorio" value="Recordatorios">Recordatorios</button>
          <button onClick={() => reverseData("Imagen")} className="bg-white h-auto w-auto p-5 rounded-lg text-black" id="generador" value="Imagen">Generador de Imagen</button>
          <button onClick={() => reverseData("Total")} className="bg-white h-auto w-auto p-5 rounded-lg text-black" id="total" value="Total">Total</button>
        </div>
        <div className="bg-rose-900 min-w-[8rem] min-h-[4rem] p-5 rounded-lg mt-10">
          {data && !loading && !error && <h2 className="text-white"> {id} : {data.Total} </h2> }
          {error && !data && !loading && <h2 className="text-white"> Error al </h2>}
          {loading && !error && !data && <h2 className="text-white"> Cargando... </h2>}
        </div>
    </main>

    
  );
}
