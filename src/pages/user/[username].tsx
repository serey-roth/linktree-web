import { Layout } from '@/components/Layout';
import { LinkList } from '@/components/LinkList';
import { PaginationWithSelect } from '@/components/PaginationWithSelect';
import { usePaginatedParams } from '@/utils/hooks/usePaginatedParams';
import { useUserWithSortedPaginatedLinks } from '@/utils/hooks/useUserWithSortedPaginatedLinks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface UserProps {

}

const User: React.FC<UserProps> = ({}) => {
    const router = useRouter();
    const { username: name } = router.query;

    const {
        pageCount,
        pageNumber,
        sortKey,
        order,
        updatePageNumber
    } = usePaginatedParams();

    const { data: userData, isFetching } = useUserWithSortedPaginatedLinks({
        username: name && typeof name === 'string' ? name : '',
        pageCount,
        pageNumber,
        sortKey,
        order
    });

    return (
        <Layout>
            <div className='flex items-center
            justify-center px-2 mt-10'>
                <div className='flex flex-col items-center w-screen sm:w-[580px]
                gap-2'>
                    <Image
                    priority
                    className='rounded-full aspect-square object-cover'
                    alt='user profile image'
                    src={'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'}
                    width={150}
                    height={150} />
                    <h1 className='font-bold text-xl'>
                        {userData?.data.username}
                    </h1>
                    <LinkList 
                        isFetching={isFetching}
                        links={userData?.data.resources.data || []}/>
                    <PaginationWithSelect
                        totalPages={userData?.data.resources.totalPages || 0}
                        updatePage={updatePageNumber} />
                </div>
            </div>
        </Layout>
    )
}

export default User;