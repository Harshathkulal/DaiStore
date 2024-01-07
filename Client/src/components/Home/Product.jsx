import React, { useEffect, useState } from 'react';
import Card from '../ProductCard/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice'
import {db} from "../../Firebase/firbase";
import { collection, getDocs } from "firebase/firestore"; 

const Main = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(collection(db, "Product")); // Assuming data.json is in the public folder
        const fetchedProducts = [];
        response.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
  
        setProducts(fetchedProducts); 
        console.log(fetchedProducts)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className='flex flex-wrap shrink justify-evenly'>
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