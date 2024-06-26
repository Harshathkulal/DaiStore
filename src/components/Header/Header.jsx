import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/PlantLogo.jpg";
import { signOut, getAuth } from "firebase/auth";
import { removeUser } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";

const Header = ({ darkMode, toggleDarkMode, searchQuery,setSearchQuery }) => {
  const [nav, setNav] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const cartCount = useSelector((state) => state.cart.cartCount);
  const userInfo = useSelector((state) => state.cart.userInfo);
  const dispatch = useDispatch();
  const auth = getAuth();
  

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logout successful");
        dispatch(removeUser());
        toast.success("Logout Successfull", {
          autoClose: 200,
          closeOnClick: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`bg-slate-100 text-black dark:text-white sticky top-0 z-10 ${
        darkMode ? "dark" : "light"
      }`}
    >
      <nav className="p-3 flex items-center justify-between gap-4  dark:bg-black dark:text-white">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setNav(!nav)}>
            {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
        {/* Your Company Logo */}
        <div className="flex">
          <a href="/">
            <img
              src={logo}
              alt="Company Logo"
              className="h-7 w-7 rounded-full"
            />
          </a>
          <p className="hidden lg:block p-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-extrabold">
            DaiStore
          </p>
        </div>

        <div className={`ml-auto flex items-center bg-white rounded-lg ${isFocused ? 'border border-blue-500' : ''}`}>
        <CiSearch size={24} className="text-black"/>
        <input
          type="text"
          placeholder="Search..."
          className="text-black rounded-lg p-1 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

      </div>
        {/* Desktop Menu - Hidden on Mobile */}
         
        <ul className="hidden  lg:flex lg:gap-x-6 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
          <li>
            <a href="/" className="hover:underline me-4 md:me-6">
              Product
            </a>
          </li>
          {userInfo ? (
            <li>
              <button
                onClick={handleLogout}
                className="hover:underline me-4 md:me-6"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <a href="/login" className="hover:underline me-4 md:me-6">
                Login
              </a>
            </li>
          )}
        </ul>

        <div onClick={toggleDarkMode} className="ml-10 md:ml-0 cursor-pointer hidden lg:block">
          {darkMode ? (
            <MdOutlineLightMode size={24} />
          ) : (
            <MdDarkMode size={24} />
          )}
        </div>

        <div>
          <a href="/cart" role="button" className="relative flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black w-5 h-5 rounded-full flex items-center justify-center text-white">
              {cartCount}
            </span>
          </a>
        </div>
      </nav>

      {/* Mobile sidebar Menu */}
      {nav && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-20 lg:hidden">
          <div className="fixed top-0 left-0 w-[70%] h-full bg-white z-30 shadow-lg dark:bg-slate-900 dark:text-white">
            <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-black">
              <div className="flex">
                <a href="/">
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="h-10 w-10 rounded-full"
                  />
                </a>
                <p className="p-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-extrabold">
                  DaiStore
                </p>
              </div>
              <button onClick={() => setNav(!nav)}>
                <AiOutlineClose size={24} />
              </button>
            </div>
            <nav>
              <ul className=" flex flex-col p-4 text-gray-800 dark:text-white font-semibold">
                <li className=" py-2">
                  <a href="/" className="hover:underline">
                    Product
                  </a>
                </li>

                {userInfo ? (
                  <li className="py-2">
                    <button onClick={handleLogout} className="hover:underline">
                      Logout
                    </button>
                  </li>
                ) : (
                  <li className="py-2">
                    <a
                      href="/login"
                      className="hover:underline dark:text-white"
                    >
                      Login
                    </a>
                  </li>
                )}
                <li className="py-2">
                <div onClick={toggleDarkMode} className=" cursor-pointer">
          {darkMode ? (
            <MdOutlineLightMode size={24} />
          ) : (
            <MdDarkMode size={24} />
          )}
        </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
