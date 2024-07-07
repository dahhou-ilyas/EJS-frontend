"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/logoJeune.png";


const LogoJeune = ({height, width}) => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push('/')}
      className="
        flex 
        items-center 
        justify-center 
        cursor-pointer
        w-fit
        -ml-2
    ">
      <Image 
        src={Logo} 
        alt="Logo" 
        height={height} 
        width={width} 
      />
    </div>
  );
};

export default LogoJeune;