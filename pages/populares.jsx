import React from 'react';
import { Layout } from '../components/layout/layout';
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



export default function Populares() {
  
  const {products} = useProduct('vote');
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
