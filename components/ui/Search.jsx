import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Router from 'next/router';

const InputText = styled.input`
  border: 1px solid var(${(props) => props.bColor || "--white"});
  height: 2.5rem;
`;

const InputSubmit = styled.input`
  height: 2rem;
  width: 2rem;
  display: block;
  background-size: 1.7rem;
  background-image: url("/static/img/search.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  background-color: transparent;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`;

export const Search = () => {
  const [search, setSearch] = useState("");
  const searchProduct= e => {
    e.preventDefault();
    if(search.trim() === '') return;

    Router.push({
      pathname:'/search',
      query: { q : search }
    })
  }

  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={searchProduct}
    >
      <InputText type="text" placeholder="Buscar productos..." onChange={(e) => setSearch(e.target.value)}/>

      <InputSubmit
        type="submit"
      ></InputSubmit>
    </form>
  );
};
