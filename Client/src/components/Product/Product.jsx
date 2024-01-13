import React, { useEffect, useState } from 'react';
import Card from '../ProductCard/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import {db} from "../../Firebase/firbase";
import { collection, getDocs } from "firebase/firestore"; 
import Loader from './Loading';

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
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
    dispatch(addToCart(product));
    toast.success("Login successful", {
      
      autoClose: 500,
      closeOnClick: true,
      
      
    })
  };

  return (
    <div className='flex flex-wrap shrink justify-evenly'>
      {loading && Array.from({ length: load }, (_, index) => <Loader key={index} />)}
      {products.map((product,index) => (
        <Card
        key={index}
          id={product.id}
          name={product.name}
          cost={product.cost}
          img={product.image}
          addToCart={() => handleAddToCart({ id:product.id, name: product.name, cost: product.cost, img:product.image })}
        />
      ))}
    </div>
  );
};

export default Main;