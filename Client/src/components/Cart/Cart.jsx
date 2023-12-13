import React from "react";
import { useSelector,useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/cartSlice'

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  console.log(cartItems)

  const handleRemove = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  return (
    <>
      <h1 className="mt-6">Shopping Cart</h1>
      <div className="m-6 flex flex-col md:flex-row gap-12  bg-white">
        <div className="flex flex-col flex-auto">
          <div className="mt-4">
            <ul role="list" className="divide-y divide-gray-200 w-full">
              {cartItems.map((cartItem,index) => (
                <li key={index} className="flex gap-6 p-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={cartItem.img}
                     
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <h3>{cartItem.name}
                      </h3>
                      <p className="ml-4">{cartItem.cost}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <p>Qty 1</p>
                      <button
                        type="button"
                        onClick={() => handleRemove(cartItem)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 w-full md:w-1/3">
          <div className="flex flex-col gap-6 items-center md:items-end divide-y divide-gray-200">
            <h2 className="text-left text-lg font-semibold mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between text-base font-medium text-gray-900 w-full mb-2">
              <p>Subtotal</p>
              <p>₹262.00</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 w-full mb-2">
              <p>Estimated Tax</p>
              <p>₹12.00</p>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-900 w-full">
              <p>Order Total</p>
              <p>₹274.00</p>
            </div>

            <p className="mt-1 text-sm text-gray-500 w-full">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-4 border-t border-gray-200 pt-4"></div>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping <span aria-hidden="true">&rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
