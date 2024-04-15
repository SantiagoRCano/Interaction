import Link from 'next/link';
import React,{useState} from 'react';



const BotonLleva = ({ destination, buttonText }) => {
  const [id, setId] = React.useState("")

  const updateInfo = (param) => setId(param)

  return (
    <Link href={`${destination}/${buttonText}`}>
        <button className='bg-bluesky md:h-[11-vh] md:w-[9vw] p-5 rounded-lg text-white text-center hover:bg-blue-700' onClick={() => updateInfo(buttonText)} >{buttonText}</button>
    </Link>
  );
};

export default BotonLleva;