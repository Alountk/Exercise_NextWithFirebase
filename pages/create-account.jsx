import React, { useState } from "react";
import { css } from "@emotion/core";
import { Layout } from "../components/layout/Layout";
import { Form, Field, InputSubmit } from "../components/ui/Form";
import Router from 'next/router';

import firebase from '../firebase'

import { useValidation } from "../hooks/useValidation";
import validateCreateAccount from "../validation/validateCreateAccount";

import { Error } from "../components/layout/Error";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

export default function CreateAccount() {

  const [errorCreateAccount, setErrorCreateAccount] = useState(false)

  const {
    value,
    error,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

  const { name, email, password } = value;

  async function createAccount() {
    try {
      await firebase.register(name,email,password);
      Router.push('/');
    } catch (e) {
      console.error('Ha habido un error al crear usuario',e.message);  
      setErrorCreateAccount(e.message)
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
              Crear cuenta
            </h1>
            <Form onSubmit={handleSubmit} noValidate>
              <Field>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Tu nombre"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {error.name && <Error error={error.name} />}
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
              {errorCreateAccount && <Error error={errorCreateAccount} />}
              <InputSubmit type="submit" value="Crear Cuenta" />
            </Form>
          </>
        </div>
      </Layout>
    </>
  );
}
