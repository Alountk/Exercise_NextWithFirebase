import React, { useEffect,  useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { Layout } from "../../components/layout/Layout";
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404'

import {css} from '@emotion/core';
import styled from '@emotion/styled';
import { Field, InputSubmit } from '../../components/ui/Form'
import  Button from '../../components/ui/Button'

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const ProductContainer = styled.div`
    @media(min-width:768px){
        display:grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
        }
`

const Product = () => {

    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)

    const router = useRouter();
    const { query: { id } } = router;

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if(id){
            const obtainProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if(product.exists){
                    setProduct(product.data());
                }else{
                    setError(true);
                }
            }
            obtainProduct();
        }
    }, [id])

    if(Object.keys(product).length === 0) return 'Cargando...';

    const { name, company, description, url, urlImage, vote, created, comments } = product;


    return (
        <Layout>
        <>
            { error && <Error404 />}
            <div className="contenedor">
                <h1 css={css`
                    text-align:center;
                    margin-top: 5rem;   
                `}>
                { name }
                </h1>
                <ProductContainer>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(created), { locale: es })}</p>
                        <img src={urlImage} alt=""/>
                        <p>{description}</p>

                        <h2>Agrega tu comentario</h2>
                        <form>
                            <Field>
                                <input 
                                    type="text"
                                    name="msg"
                                />
                            </Field>
                            <InputSubmit 
                                type="submit"
                                value="Agregar Comentario"
                            />
                        </form>
                        <h2 css={css`
                            margin:2rem 0;
                        `}>Comentarios</h2>

                        {comments.map(com =>(
                            <li>
                                <p>{comments.name}</p>
                                <p>Escrito por: {comments.userName}</p>
                            </li>
                        ))}

                    </div>
                    <aside>
                        <Button target="_blank" bgColor={'--orange'} color={'--white'} href={url}>Visitar URL</Button>
                        <div css={css`
                            margin-top: 5rem;
                        `}                    
                        ><p css={css`
                            text-align: center;
                        `}>{vote} Votos</p>
                        </div>
                        <Button
                        
                        >Votar</Button>
                    </aside>
                </ProductContainer>
            </div>
        </>
        </Layout>
    )
}

export default Product;