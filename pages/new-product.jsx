import React, { useState, useContext } from "react";
import FileUploader from "react-firebase-file-uploader";
import { css } from "@emotion/core";
import { Layout } from "../components/layout/Layout";
import { Form, Field, InputSubmit } from "../components/ui/Form";
import Router, { useRouter } from "next/router";

import { FirebaseContext } from "../firebase";

import { useValidation } from "../hooks/useValidation";
import validateNewProduct from "../validation/validateNewProduct";

import { Error } from "../components/layout/Error";
import Error404 from "../components/layout/404";

const INITIAL_STATE = {
  name: "",
  company: "",
  image: "",
  url: "",
  description: "",
};

export default function NewProduct() {
  const [errorCreateProduct, setErrorCreateProduct] = useState(false);
  const [nameImage, setNameImage] = useState("");
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  const {
    value,
    error,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateNewProduct, createProduct);

  const { name, company, image, url, description } = value;

  const router = useRouter();

  const { user, firebase } = useContext(FirebaseContext);

  async function createProduct() {
    if (!user) {
      return router.push("/login");
    }
    const product = {
      name,
      company,
      url,
      urlImage,
      description,
      vote: 0,
      comments: [],
      created: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
      hasVoted: []
    };
    try {
      await firebase.db.collection("products").add(product);

      return router.push("/");
    } catch (e) {
      console.error("Ha habido un error al crear el producto", e.message);
      setErrorCreateProduct(e.message);
    }
  }
  const handleUploadStart = () => {
    setProgress(0);
    setUpload(true);
  };
  const handleProgress = (progress) => setProgress({ progress });

  const handleUploadError = (error) => {
    setUpload(error);
    console.error(error);
  };

  const handleUploadSuccess = (name) => {
    setProgress(100);
    setUpload(false);
    setNameImage(name);
    firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setUrlImage(url);
      });
  };

  return (
    <>
      <Layout>
        {!user ? (
          <Error404 />
        ) : (
          <div className="container">
            <>
              <h1
                css={css`
                  text-align: center;
                  margin-top: 5rem;
                `}
              >
                Nuevo Producto
              </h1>
              <Form onSubmit={handleSubmit} noValidate>
                <fieldset>
                  <legend>Información general</legend>
                  <Field>
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Nombre del Producto"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                  {error.name && <Error error={error.name} />}

                  <Field>
                    <label htmlFor="company">Empresa</label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Tu Empresa o Compañia"
                      name="company"
                      value={company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                  {error.company && <Error error={error.company} />}

                  <Field>
                    <label htmlFor="image">Imagen</label>
                    <FileUploader
                      accept="image/*"
                      id="image"
                      name="image"
                      randomizeFilename
                      storageRef={firebase.storage.ref("products")}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
                    />
                  </Field>

                  <Field>
                    <label htmlFor="url">Url</label>
                    <input
                      type="url"
                      id="url"
                      placeholder="Url de tu producto"
                      name="url"
                      value={url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                  {error.url && <Error error={error.url} />}
                </fieldset>

                <fieldset>
                  <legend>Sobre tu producto</legend>

                  <Field>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                  {error.description && <Error error={error.description} />}
                </fieldset>

                {errorCreateProduct && <Error error={errorCreateProduct} />}
                <InputSubmit type="submit" value="Crear Producto" />
              </Form>
            </>
          </div>
        )}
      </Layout>
    </>
  );
}
