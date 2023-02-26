import React from 'react'
import Link from 'next/link';
import { useMe } from '@/utils/hooks/useMe';

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const { data } = useMe();

    return (
        <div className='w-full flex items-center justify-between
        py-2'>
            <h1 className='text-lg font-bold'>
                Linktree Clone
            </h1>
            <div className='flex items-center gap-2'>
                {data?.user ? (
                    <>  
                        <div className='rounded-full py-1 px-3
                        flex items-center justify-center 
                        bg-teal-400'>
                            <p>
                            {data.user.username.charAt(0)}
                            </p>
                        </div>
                        <Link href='/auth/login'>
                            log out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link 
                        className='hover:underline 
                        transition duration:100 ease-in-out'
                        href='/auth/login'>
                            log in
                        </Link>
                        <Link 
                        className='hover:underline
                        transition duration:100 ease-in-out'
                        href='/auth/register'>
                            register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}