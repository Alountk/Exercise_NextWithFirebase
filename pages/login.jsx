import React, { useState } from "react";
import { css } from "@emotion/core";
import { Layout } from "../components/layout/Layout";
import { Form, Field, InputSubmit } from "../components/ui/Form";
import Router from "next/router";

import firebase from "../firebase";

import { useValidation } from "../hooks/useValidation";
import validateLogin from "../validation/validateLogin";

import { Error } from "../components/layout/Error";

const INITIAL_STATE = {
  email: "",
  password: "",
};

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(false);

  const {
    value,
    error,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateLogin, signIn);

  const { email, password } = value;

  async function signIn(){
    try {
      await firebase.login(email,password);
      Router.push('/');
    } catch (e) {
      console.error('Ha habido un error al crear usuario',e.message);  
      setErrorLogin(e.message)
      
    }
  }

  return (
    <>
      <Layout>
        <div className="container">
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              Iniciar Sesión
            </h1>
            <Form onSubmit={handleSubmit} noValidate>
              <Field>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Tu Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {error.email && <Error error={error.email} />}
              <Field>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Tu Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {error.password && <Error error={error.password} />}
              {errorLogin && <Error error={errorLogin} />}
              <InputSubmit type="submit" value="Iniciar Sesión" />
            </Form>
          </>
        </div>
      </Layout>
    </>
  );
}
