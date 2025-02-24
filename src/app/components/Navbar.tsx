"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavButtons from "./buttons/NavButtons";

const Navlinks = () =>{
  return (
    <>
    <Link
      href="/canasta"
      className="relative text-white hover:text-gray-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
      Canasta
    </Link>
    <Link
      href="/perfil"
      className="relative text-white hover:text-gray-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
      Cuenta
    </Link>
  </>

  

  )
}

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () =>{
    setIsOpen(!isOpen);
  }

  return (

    <>

    <div className="flex w-1/4 justify-end p-4">
      <div className="hidden w-full justify-between md:flex">
        <NavButtons></NavButtons>
      </div>
      <div className="md:hidden">
        <button className=" text-white" onClick={toggleNavbar}>
          {isOpen? <X></X> : <Menu></Menu>}
        </button>
      </div>
    </div>
    {isOpen && (
      <div className="flex flex-col items-center basis-full ">
        <NavButtons></NavButtons>
      </div>
    )}
    
    
    </>
    
  );
}
