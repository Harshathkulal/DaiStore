import React, { useState } from "react";

const Card = (props) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleImageClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className={`border rounded m-4`}>
      <div className="card-container ">
        <div className="">
          <div
            className={` group  ${isRotated ? "rotate" : "rotate-back"}`}
            onClick={handleImageClick}
          >
            <div className=" card-face ">
              {isRotated ? (
                <div className="back flex items-center justify-center">
                  <div className="md:w-72 md:h-72 w-32 h-32 bg-white group-hover:opacity-75 flex justify-center items-center">
                    <p className="text-xxs md:text-sm lg:text-base xl:text-lg text-black font-semibold text-center">
                      {props.discription}
                    </p>
                  </div>
                </div>
              ) : (
                <div className=" front flex items-center justify-center">
                  <img
                    className={`md:w-72 md:h-72 w-32 h-32 group-hover:opacity-75`}
                    src={props.img}
                    alt="product image"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card-details">
          <h5 className="md:text-xl font-semibold ">{props.name}</h5>

          <div className="flex justify-between m-1">
            <span className="md:text-lg">₹{props.cost}</span>
            <span className="line-through md:text-lg">₹899</span>
          </div>

          <button
            onClick={props.addToCart}
            className="button transition ease-in duration-200  border-2 border-gray-900 dark:border-white "
          >
            <span className="m-">ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
