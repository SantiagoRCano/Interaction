import Link from 'next/link';
import React,{useState} from 'react';



const BotonLleva = ({ destination, buttonText }) => {
  const [id, setId] = React.useState("")

  const updateInfo = (param) => setId(param)

  return (
    <Link href={`${destination}/${buttonText}`}>
        <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full' onClick={() => updateInfo(buttonText)} >{buttonText}</button>
    </Link>
  );
};


const BotonLlevaTwo = ({ destination,buttonText }) => {
  return(
    <Link href={destination}>
      <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full'>{buttonText}</button>
    </Link>
  )
}

const BotonLlevaThree = ({ destination,buttonText }) => {
   return(
    <Link href={destination}>
      <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-red-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full'>{buttonText}</button>
    </Link>
   )
}



export {
  BotonLleva,
  BotonLlevaTwo,
  BotonLlevaThree
};