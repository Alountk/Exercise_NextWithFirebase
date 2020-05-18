import React from 'react'
import { css } from '@emotion/core';
import { Layout } from '../components/layout/layout';
import { Form, Field, InputSubmit } from '../components/ui/Form';



export default function CreateAccount() {
  return (
    <>
      <Layout>
        <div className="container">
            <>
                <h1 
                    css={css`
                        text-align: center;
                        margin-top:5rem;
                    `}
                >Crear cuenta</h1>
                <Form>
                    <Field>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" placeholder="Tu nombre" name="name"/>
                    </Field>
                    <Field>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Tu Email" name="email"/>
                    </Field>
                    <Field>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Tu Password" name="password"/>
                    </Field>
                    <InputSubmit type="submit" value="Crear Cuenta"/>
                </Form>
            </>
        </div>
      </Layout>
    </>
  )
}
