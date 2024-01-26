import React, { useState } from "react";

const Card = (props) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleImageClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className={`bg-white p-2 shadow m-2 mt-4 rounded dark:bg-black dark:border-gray-700 ${props.darkMode ? 'dark' : 'light'}`}>
      <div className="card-container">
        <div className={`group  ${isRotated ? 'rotate' : 'rotate-back'}`} onClick={handleImageClick}>
          <div className="card-face">
            {isRotated ? (
              <div className="back">
                <div className="bg-white md:h-64 md:w-64 w-48 h-48 object-cover object-center group-hover:opacity-75">
                <h1 className="text-black font-semibold p-4">{props.discription}</h1>
                </div>
                
              </div>
              
            ) : (
              <div className="front">
                <img
                  className={`md:h-64 md:w-64 w-48 h-48 object-cover object-center group-hover:opacity-75 card-image`}
                  src={props.img}
                  alt="product image"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>

        <div className="card-details">
          <h5 className="text-xl font-semibold tracking-tight">
            {props.name}
          </h5>

          <div className="flex">
            <span className="mt-1 text-lg font-medium">
              ₹{props.cost}
            </span>
          </div>

          <button
            onClick={props.addToCart}
            className="button transition ease-in duration-200 hover:bg-gray-800 hover:text-white border-2 border-gray-900 dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            <span className="p-4">ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
