import React from 'react';
import styled from '@emotion/styled';

export const ErrorBox = styled.p`
    background-color:red;
    padding:1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #FFF;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`

export const Error = (props) => {
    return (
        <>
            {props.error && <ErrorBox>{props.error}</ErrorBox>}
        </>
    )
}
