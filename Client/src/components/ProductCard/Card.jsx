import React from "react";

const Card = (props) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl p-6  sm:p-6 lg:max-w-7xl lg:p-4">
        <h2 className="sr-only">Products</h2>

        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          {" "}
          {/* dark:bg-gray-800 dark:border-gray-700*/}
          <a href="#" className="group">
            <img
              className="h-full w-full object-cover object-center group-hover:opacity-75"
              src={props.img}
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                {props.name}
              </h5>{" "}
              {/* dark:text-white*/}
            </a>
            <div className="mt-4 text-sm text-gray-700"></div>
            <div className="flex items-center justify-between">
              <span className="mt-1 text-lg font-medium text-gray-900">
                ₹{props.cost}
              </span>{" "}
              {/*dark:text-white*/}
              <button
                  class="p-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
