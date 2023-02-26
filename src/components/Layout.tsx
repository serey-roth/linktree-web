import Head from 'next/head';
import React, { ReactNode } from 'react'
import { Navbar } from './Navbar';

interface LayoutProps {
    children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
        <Head>
            <title>Linktree Clone</title>
            <meta name="description" content="Linktree Clone with NextJS" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className='w-screen flex flex-col px-3'>
            <Navbar />
            {children}
        </main>
        </>
    );
}