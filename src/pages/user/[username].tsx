import { Layout } from '@/components/Layout';
import { LinkCard } from '@/components/LinkCard';
import { LinkList } from '@/components/LinkList';
import { PaginationWithSelect } from '@/components/PaginationWithSelect';
import { useDeleteLink } from '@/utils/hooks/useDeleteLink';
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

    const { deleteLink } = useDeleteLink();

    const handleDeleteLink = (index: number) => {
        deleteLink(index);
    }

    return (
        <Layout>
            <div className='flex items-center
            justify-center px-2 mt-10'>
                <div className='flex flex-col items-center w-screen sm:w-[580px]
                gap-2'>
                    <div className='w-[100px] flex items-center justify-center
                    aspect-square rounded-full text-3xl font-bold bg-teal-400'>
                        {userData?.data.username.charAt(0)}
                    </div>
                    <h1 className='font-bold text-xl'>
                        {userData?.data.username}
                    </h1>
                    <LinkList 
                        isFetching={isFetching}
                        length={userData?.data.resources.data.length || 0}>
                        {userData?.data.resources.data.map(link => (
                            <LinkCard 
                                key={link.id}
                                link={link}
                                isEditable={false}
                                onDelete={() => handleDeleteLink(link.id)}/>
                            ))}
                        </LinkList>
                    <PaginationWithSelect
                        totalPages={userData?.data.resources.totalPages || 0}
                        updatePage={updatePageNumber} />
                </div>
            </div>
        </Layout>
    )
}

export default User;