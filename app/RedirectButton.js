import Link from 'next/link';

const BotonLleva = ({ destination, buttonText }) => {
  return (
    <Link href={destination}>
      <button className='text-white p-5 m-10 bg-red-950 rounded-lg'>{buttonText}</button>
    </Link>
  );
};

export default BotonLleva;