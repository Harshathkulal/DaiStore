import React from "react";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`bg-slate-100 text-black w-full shadow bottom-0 fixed ${
        darkMode ? "dark" : "light"
      }`}
    >
      <div className="p-2 md:flex md:items-center md:justify-between dark:bg-black dark:text-white">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2023 DaiStore.All Rights Reserved.
        </span>
        <ul className=" flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0 hidden lg:flex">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
