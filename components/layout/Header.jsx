import React, { useContext } from 'react'
import { Search } from '../ui/Search'
import { Navbar } from './Navbar';
import Link from 'next/link';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import Button from '../ui/Button';
import { FirebaseContext } from '../../firebase'

const ContainerHeader = styled.div`
    max-width: 1200px;
    width:95%;
    margin:0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content:space-between;
    }
`;

const Logo = styled.a`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;


export const Header = () => {
    
    const { user, firebase }= useContext(FirebaseContext);
    
    return (
        <header 
            css={css`
                border-bottom: 2px solid var(--grey3);
                padding:1rem 0;
            `}
        >

            <ContainerHeader>
                <div 
                    css={css`
                        display:flex;
                        align-items:center;
                    `}
                >
                    <Link href="/">
                        <Logo>Logo</Logo>
                    </Link>
                    <Search />
                    <Navbar />
                </div>
                <div 
                css={css`
                    display:flex;
                    align-items:center;
                `}
                >
                {user ? (
                    <>
                        <span 
                            css={css`
                                margin-right:2rem;
                            `}
                        >Hola: {user.displayName}</span>
                        <Button 
                            bgColor={'--orange'} 
                            color={'--white'} 
                            onClick={ () => firebase.logout() }
                            >Cerrar sesion</Button>
                    </>
                ):(
                    <>
                    <Link href="/login">
                        <Button bgColor={'--orange'} color={'--white'}>
                            Login
                        </Button>
                    </Link>
                    <Link href="/create-account">
                        <Button bgColor={'--orange'} color={'--white'}>
                            Crear Cuenta                    
                        </Button>
                    </Link>
                    </>
                )}
                </div>
            </ContainerHeader>
        </header>
    )
}
