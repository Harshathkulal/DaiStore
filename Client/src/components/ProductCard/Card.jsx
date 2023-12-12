import React from "react";

const Card = (props) => {
  return (
    <div className="bg-white p-4">
      <div className="flex flex-col">
        {/* dark:bg-gray-800 dark:border-gray-700*/}

        <a href="#" className="group">
          <img
            className="md:h-64 md:w-64 h-32 w-32 object-cover object-center group-hover:opacity-75"
            src={props.img}
            alt="product image"
          />
        </a>

        <div className="">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
              {props.name}
            </h5>{" "}
            {/* dark:text-white*/}

          <div className="flex">
            <span className="mt-1 text-lg font-medium text-gray-900">
              ₹{props.cost}
            </span>{" "}
            {/*dark:text-white*/}
            </div>
            
            <button class="button transition ease-in duration-200 hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
              <span className="p-4">ADD TO CART</span>
            </button>
           
        </div>
      </div>
    </div>
  );
};

export default Card;
