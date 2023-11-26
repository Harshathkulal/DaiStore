import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import cart from "../assets/Cart.svg"


const Header = () => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between gap-6 p-4 lg:px-8">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setNav(!nav)}>
            {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Your Company Logo */}
        <div>
          <a href="#" className="-m-1.5 p-1.5 ml-auto">
            <span className="">Your Company</span>
          </a>
        </div>

        {/* Desktop Menu - Hidden on Mobile */}
        <ul className="hidden ml-auto lg:flex lg:gap-x-6 text-sm font-semibold leading-6 text-gray-900">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Product
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Login
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Dark
            </a>
          </li>
        </ul>

     <div>
  <a href="#" role="button" className="relative flex">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>



      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black w-5 h-5 rounded-full flex items-center justify-center text-white">0
    </span>
  </a>
  </div>  

        
      </nav>

      {/* Mobile Menu */}
      {nav && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-20">
          <div className="fixed top-0 left-0 w-[70%] h-full bg-white z-30 shadow-lg">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-2xl">
                Best <span className="font-bold">Eats</span>
              </h2>
              <button onClick={() => setNav(!nav)}>
                <AiOutlineClose size={24} />
              </button>
            </div>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                <li className="py-2">Home</li>
                <li className="py-2">Product</li>
                <li className="py-2">About</li>
                <li className="py-2">
                  <a href="#" className="">
                    Login
                  </a>
                </li>
                <li className="py-2">Dark</li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
