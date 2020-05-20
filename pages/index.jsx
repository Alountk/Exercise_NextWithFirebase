import React, { useEffect, useState, useContext } from 'react';
import { Layout } from '../components/layout/layout';
import { FirebaseContext } from '../firebase';
import {ProductDetails} from '../components/layout/ProductDetails';
import styled from '@emotion/styled';


const ProductUl = styled.ul `
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
`



export default function Home() {
  
  const [products, setProducts] = useState([])

  const { firebase } =  useContext(FirebaseContext);

  useEffect(() => {
    const obtainProducts = () => {
      firebase.db.collection('products').orderBy('created','desc').onSnapshot(useSnapshot)
    }
    obtainProducts();
  }, [])

  function useSnapshot(snapshot){
    const products = snapshot.docs.map( doc => {
      return {
        id:doc.id,
        ...doc.data()
      }
    });
    setProducts(products);
  }

  return (
    <>
      <Layout>
        <div className="product-list">
          <div className="contenedor">
            <ProductUl className="bg-white">
              {products.map(product =>(
                <ProductDetails key={product.id} product={product}/>
              ))}
            </ProductUl>
          </div>
        </div>
      </Layout>
    </>
  )
}
