import React, { useEffect, useState } from "react";
import Card from "../ProductCard/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { db } from "../../Firebase/firbase";
import { collection, getDocs } from "firebase/firestore";
import Loader from "./Loading";
import { RiWifiOffLine } from "react-icons/ri";
import { BiRefresh } from "react-icons/bi";

const Main = ({ darkMode, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const load = 8;

  useEffect(() => {
    const fetchData = async () => {
      if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your connection and try again."
        );
        setLoading(false);
        return;
      }

      const timeoutId = setTimeout(() => {
        setError(
          "Loading timeout exceeded. Please check your internet connection and try again."
        );
        setLoading(false);
      }, 10000);

      try {
        const response = await getDocs(collection(db, "Product"));
        const fetchedProducts = [];
        response.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
        

        setProducts(fetchedProducts);
        setLoading(false);
        clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Error fetching data. Please check your internet connection and try again."
        );
        setLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchData();
  }, []);


  const handleAddToCart = (product) => {
    toast.success("Item Added successful", {
      autoClose: 200,
      closeOnClick: true,
    });
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === existingCartItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      dispatch(updateCart(updatedCartItems));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div
        className={`flex flex-col items-center p-10 dark:bg-slate-400 ${
          darkMode ? "dark" : "light"
        }`}
      >
        <RiWifiOffLine size={56} />
        <p className="text p-10">{error}</p>
        <p>Refresh</p>
        <a href="/">
          <button className="pb-64">
            <BiRefresh size={24} />
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className={`pb-6 ${darkMode ? "dark" : "light"}`}>
    <div
      className="flex flex-wrap justify-evenly" 
    >
      {loading &&
        Array.from({ length: load }, (_, index) => <Loader key={index} />)}

      {filteredProducts.length === 0 ? (
        <p>No Product Found</p>
      ) : (
        filteredProducts.map((product, index) => (
        <Card
          key={index}
          id={product.id}
          name={product.name}
          cost={product.cost}
          img={product.image}
          discription={product.discription}
          quantity={product.quantity}
          addToCart={() =>
            handleAddToCart({
              id: product.id,
              name: product.name,
              cost: product.cost,
              img: product.image,
              quantity: product.quantity,
            })
          }
          darkMode={darkMode}
        />
      )))}
    </div>
    </div>
  );
};

export default Main;
