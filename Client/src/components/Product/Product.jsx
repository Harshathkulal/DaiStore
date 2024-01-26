import React, { useEffect, useState } from 'react';
import Card from '../ProductCard/Card';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart, updateCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import {db} from "../../Firebase/firbase";
import { collection, getDocs } from "firebase/firestore"; 
import Loader from './Loading';

const Main = ({ darkMode}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const load=8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(collection(db, "Product")); // Assuming data.json is in the public folder
        const fetchedProducts = [];
        response.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
  
        setProducts(fetchedProducts); 
        setLoading(false); // Set loading to false when data is fetched
        console.log(fetchedProducts)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart

    toast.success("Item Added successful", {
      autoClose: 200,
      closeOnClick: true,
    });
    const existingCartItem = cartItems.find(item => item.id === product.id);
  
    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      const updatedCartItems = cartItems.map(item =>
        item.id === existingCartItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
  
      dispatch(updateCart(updatedCartItems));
    } else {
      // If the product is not in the cart, add it with quantity 1
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  
 
  };
  

  return (
    <div className={`flex flex-wrap shrink justify-evenly dark:bg-slate-400  ${darkMode ? 'dark' : 'light'}`}>
      {loading && Array.from({ length: load }, (_, index) => <Loader key={index} />)}
      {products.map((product,index) => (
        <Card
        key={index}
          id={product.id}
          name={product.name}
          cost={product.cost}
          img={product.image}
          discription={product.discription}
          quantity={product.quantity}
          addToCart={() => handleAddToCart({ id:product.id, name: product.name, cost: product.cost, img:product.image , quantity:product.quantity})}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default Main;