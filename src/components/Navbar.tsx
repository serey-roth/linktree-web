import { AuthResponseData, User } from '@/generated/openapi';
import { useLogout } from '@/utils/hooks/useLogout';
import { useMe } from '@/utils/hooks/useMe';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavbarProps {

}

const isUser = (data: AuthResponseData): data is User => {
    return (data as User).username !== undefined;
}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const router = useRouter();

    const { data: meData } = useMe();

    const { logout } = useLogout();

    const handleLogout = async () => {
        const result = await logout();
        if (result.data) {
            router.replace('/auth/login');
        }
    }

    return (
        <div className='w-full flex items-center
        py-2'>
            <h1 className='text-lg font-bold'>
                Linktree Clone
            </h1>
            <Link 
            className='hover:underline ml-2
            transition duration:100 ease-in-out'
            href='/discover'>
                discover
            </Link>
            {meData?.data && (
                <Link 
                className='hover:underline ml-2
                transition duration:100 ease-in-out'
                href='/'>
                    home
                </Link>
            )}
            <div className='flex items-center gap-2 ml-auto'>
                {meData?.data ? (
                    <>  
                        <div className='rounded-full py-1 px-3
                        flex items-center justify-center 
                        bg-teal-400'>
                            <p>
                            {isUser(meData.data) && meData.data.username.charAt(0)}
                            </p>
                        </div>
                        <button
                        onClick={handleLogout}>
                            log out
                        </button>
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