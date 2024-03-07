import Link from 'next/link';
import React,{useState} from 'react';



const BotonLleva = ({ destination, buttonText }) => {
  const [id, setId] = React.useState("")

  const updateInfo = (param) => setId(param)

  return (
    <Link href={`${destination}/${buttonText}`}>
        <button className='bg-white md:h-[11-vh] md:w-[9vw] p-5 rounded-lg text-black' onClick={() => updateInfo(buttonText)}>{buttonText}</button>
    </Link>
  );
};

export default BotonLleva;