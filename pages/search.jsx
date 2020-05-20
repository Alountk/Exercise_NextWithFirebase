import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/layout';
import { useRouter } from 'next/router';
import {ProductDetails} from '../components/layout/ProductDetails';
import useProduct from '../hooks/useProduct';
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



export default function Search() {
  const router = useRouter();
  const {query:{ q }} = router;
  const { products } = useProduct('created');
  const [result,setResult] = useState([]);

  useEffect(() => {
    const searching = q.toLowerCase();
    const filterSearch = products.filter(product =>{
      return(
        product.name.toLowerCase().includes(searching) ||
        product.description.toLowerCase().includes(searching)
      )
    });
    setResult(filterSearch);
  }, [q,products])

  return (
    <>
      <Layout>
        <div className="product-list">
          <div className="contenedor">
            <ProductUl className="bg-white">
              {result.map(product =>(
                <ProductDetails key={product.id} product={product}/>
              ))}
            </ProductUl>
          </div>
        </div>
      </Layout>
    </>
  )
}
