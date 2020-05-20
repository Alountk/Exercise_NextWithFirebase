import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import { Layout } from "../../components/layout/Layout";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Field, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/Button";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;
const ProductCreator = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;
const CommentsUl = styled.ul`
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  list-style: none;
`;

const Product = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});
  const [checkDB, setCheckDB] = useState(true);
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    setComment({ msg: "" });
    if (id && checkDB) {
      const obtainProduct = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        if (product.exists) {
          setProduct(product.data());
          setCheckDB(false);
        } else {
          setError(true);
          setCheckDB(false);
        }
      };
      obtainProduct();
    }
  }, [id]);

  const voteProduct = () => {
    if (!user) {
      return router.push("/login");
    }
    const newTotalVotes = vote + 1;

    if (hasVoted.includes(user.uid)) return;

    const newHasVoted = [...hasVoted, user.uid];

    firebase.db.collection("products").doc(id).update({
      vote: newTotalVotes,
      hasVoted: newHasVoted,
    });

    setProduct({
      ...product,
      vote: newTotalVotes,
    });
    setCheckDB(true);
  };

  const isCreator = (id) => {
    if (creator.id == id) return true;
  };

  const addComment = (e) => {
    e.preventDefault();

    if (!user) return router.push("/login");

    comment.userId = user.uid;
    comment.userName = user.displayName;

    const newComments = [...comments, comment];

    firebase.db.collection("products").doc(id).update({
      comments: newComments,
    });

    setProduct({
      ...product,
      comments: newComments,
    });
    setCheckDB(true);
    setComment({ msg: "" });
  };

  const commentChange = (e) =>
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });

  if (Object.keys(product).length === 0 && !error) return "Cargando...";

  const {
    name,
    company,
    description,
    url,
    urlImage,
    vote,
    created,
    comments,
    creator,
    hasVoted,
  } = product;

  const creatorDeleteProduct = () =>{
      if(!user) return false;
      if(creator.id === user.uid)return true
  }

  const deleteProduct = async () => {
      if(!user) return router.push('/login');
      if(creator.id !== user.uid)router.push('/')         
      try {
          await  firebase.db.collection('products').doc(id).delete();
          router.push('/')
      } catch (e) {
          console.error(e);          
      }
  }

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {name}
            </h1>
            <ProductContainer>
              <div>
                <p>
                  Publicado hace:{" "}
                  {formatDistanceToNow(new Date(created), { locale: es })}
                </p>
                <p>
                  Por: {creator.name} de {company}{" "}
                </p>
                <img src={urlImage} alt="" />
                <p>{description}</p>

                {user && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={addComment}>
                      <Field>
                        <input
                          type="text"
                          name="msg"
                          value={comment.msg}
                          onChange={commentChange}
                        />
                      </Field>
                      <InputSubmit type="submit" value="Agregar Comentario" />
                    </form>
                  </>
                )}
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {comments.length === 0 ? (
                  "Aún no hay comentarios"
                ) : (
                  <CommentsUl>
                    {comments.map((com, i) => (
                      <li
                        key={`${comment.id}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{com.msg}</p>
                        <p>
                          Escrito por:
                          <span
                            css={css`
                              font-weight: bold;
                              margin-left: 0.5rem;
                            `}
                          >
                            {com.userName}
                          </span>
                        </p>
                        {isCreator(com.userId) && (
                          <ProductCreator>Creador</ProductCreator>
                        )}
                      </li>
                    ))}
                  </CommentsUl>
                )}
              </div>
              <aside>
                <Button
                  target="_blank"
                  bgColor={"--orange"}
                  color={"--white"}
                  href={url}
                >
                  Visitar URL
                </Button>
                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {vote} Votos
                  </p>
                </div>
                {user && <Button onClick={voteProduct}>Votar</Button>}
                {creatorDeleteProduct() && 
                <Button
                    onClick={deleteProduct}
                >Borrar Producto</Button>}
              </aside>
            </ProductContainer>

            
          </div>
        )}
      </>
    </Layout>
  );
};

export default Product;
