import React, { useEffect, useState } from 'react';
import Card from '../ProductCard/Card';

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json'); // Assuming data.json is in the public folder
        const jsonData = await response.json();
        setProducts(jsonData); // Set the fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-wrap justify-between'>
      {products.map((product, index) => (
        <Card key={index} name={product.name} cost={product.cost} img={product.image}/>
      ))}
    </div>
  );
};

export default Main;