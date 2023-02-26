import React from 'react'
import Link from 'next/link';

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <div className='w-full flex items-center justify-between
        py-2'>
            <h1 className='text-lg font-bold'>
                Linktree Clone
            </h1>
            <div className='flex items-center gap-2'>
                <Link 
                className='hover:underline 
                transition duration:100 ease-in-out'
                href='/auth/login'>
                    login
                </Link>
                <Link 
                className='hover:underline
                transition duration:100 ease-in-out'
                href='/auth/register'>
                    register
                </Link>
            </div>
        </div>
    );
}