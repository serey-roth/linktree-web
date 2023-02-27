import React, { useEffect } from 'react'
import Link from 'next/link';
import { useMe } from '@/utils/hooks/useMe';
import { ApiResponseData, User } from '@/generated/openapi';
import { useLogout } from '@/utils/hooks/useLogout';
import { useRouter } from 'next/router';
import { hasCookie } from '@/utils/hasCookie';

interface NavbarProps {

}

const isUser = (data: ApiResponseData): data is User => {
    return (data as User).username !== undefined;
}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const router = useRouter();

    const { data: meData, refetch } = useMe();

    const { logout } = useLogout();

    const handleLogout = async () => {
        const result = await logout();
        if (result.data) {
            router.push('/auth/login');
        }
    }

    useEffect(() => {
        if (hasCookie("linktree")) {
            refetch();
        }
    })

    return (
        <div className='w-full flex items-center justify-between
        py-2'>
            <h1 className='text-lg font-bold'>
                Linktree Clone
            </h1>
            <div className='flex items-center gap-2'>
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