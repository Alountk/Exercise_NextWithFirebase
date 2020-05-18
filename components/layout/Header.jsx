import React from 'react'
import { Search } from '../ui/Search'
import { Navbar } from './Navbar'
import Link from 'next/link'

export const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>
                    <Search />
                    <Navbar />
                </div>
                <div>
                    <p>Hola: Francisco</p>
                    <button type="button">Cerrar sesion.</button>
                    <Link href="/">Login</Link>
                    <Link href="/">Crear Cuenta</Link>
                </div>
            </div>
        </header>
    )
}
