import { Avatar } from '@/components/Avatar';
import { Layout } from '@/components/Layout';
import { usersApi } from '@/utils/openApi';
import React, { useEffect } from 'react'
import Link from 'next/link';
import { PaginationWithSelect } from '@/components/PaginationWithSelect';
import { usePaginatedParams } from '@/utils/hooks/usePaginatedParams';

type DiscoverProps = (Awaited<ReturnType<typeof getServerSideProps>>)["props"];

const Discover: React.FC<DiscoverProps> = ({
    pageCount,
    pageNumber,
    order,
    sortKey,
    userData
}) => {
    const {
        updatePageCount,
        updateSortKey,
        updateSortOrder,
        updatePageNumber
    } = usePaginatedParams();

    useEffect(() => {
        updatePageCount(pageCount);
        updateSortKey(sortKey);
        updateSortOrder(order as "ASC" | "DESC");
        updatePageNumber(pageNumber);
    }, []);

    return (
        <Layout>
            <div className='flex items-center
            justify-center mt-10'>
                <div className='flex flex-col w-screen sm:w-[580px] gap-4'>
                    <h1 className='text-xl font-semibold border-b-2
                    border-b-black'>Discover...</h1>
                    <div className='flex flex-wrap items-center w-full
                    gap-2'>
                        {userData?.data.map(user => (
                            <Link href={`/user/${user.username}`}>
                                <div className='opacity-70 hover:opacity-100
                                transition duration-100 ease-in-out'>
                                    <Avatar
                                    variant='medium'
                                    name={user.username} />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <PaginationWithSelect 
                        totalPages={userData.totalPages}
                        updatePage={updatePageNumber}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default Discover;

export const getServerSideProps = async () => {
    const pageCount = 5;
    const pageNumber = 0;
    const sortKey = "createdAt";
    const order = "DESC";

    const { data, error } = await usersApi.usersPaginatedSortedGet({
        pageCount,
        pageNumber,
        sortKey,
        order
    });

    return {
        props: {
            pageCount,
            pageNumber,
            sortKey,
            order,
            error,
            userData: data
        }
    }
}
