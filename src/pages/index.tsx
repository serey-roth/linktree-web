import { AddLink } from '@/components/AddLink'
import { Avatar } from '@/components/Avatar'
import { Layout } from '@/components/Layout'
import { LinkCard } from '@/components/LinkCard'
import { LinkList } from '@/components/LinkList'
import { PaginationWithSelect } from '@/components/PaginationWithSelect'
import { LinkContextProvider, useLinkContext } from '@/contexts/LinkContext'
import { AuthResponseData, User } from '@/generated/openapi'
import { useDeleteLink } from '@/utils/hooks/useDeleteLink'
import { useMe } from '@/utils/hooks/useMe'
import { withContextProvider } from '@/utils/withContextProvider'
import Link from 'next/link'

const isUser = (data: AuthResponseData): data is User => {
    const userData = data as User;
    return userData.email !== undefined && 
        userData.username !== undefined && 
        userData.roles !== undefined;
} 

function Home() {
    const {
        data: linkData,
        isFetching,
        updatePageNumber
    } = useLinkContext();

    const { data: meData } = useMe();

    const { deleteLink } = useDeleteLink();

    const handleDeleteLink = (index: number) => {
        deleteLink(index);
    }
    
    return (
        <Layout>
            <div className='flex items-center
            justify-center px-2 mt-10'>
                <div className='flex flex-col sm:flex-row w-screen
                justify-center'>
                    <div className='flex flex-col items-center
                    w-full max-w-[600px] gap-2 sm:border-r sm:pr-2'>
                        {meData?.data && isUser(meData.data)  ? (
                            <>
                                <Avatar 
                                    variant='medium'
                                    // imageSrc='https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'
                                    name={meData.data.username} />
                                <Link href={`/user/${meData.data.username}`}>
                                    <h1 className='font-bold text-xl hover:underline
                                    hover:text-slate-400 transition duration-100
                                    ease-in-out'>
                                        {meData.data.username}
                                    </h1>
                                </Link>
                            </>
                        ) : null}
                        <LinkList 
                            isFetching={isFetching}
                            length={linkData?.data.length || 0}>
                            {linkData?.data.map(link => (
                                <LinkCard 
                                key={link.id}
                                link={link}
                                isEditable={true}
                                onDelete={() => handleDeleteLink(link.id)}/>
                            ))}
                        </LinkList>
                        <PaginationWithSelect
                            totalPages={linkData?.totalPages || 0}
                            updatePage={updatePageNumber} />
                    </div>
                    <div className='w-full sm:max-w-[400px] sm:pl-2'>
                        <AddLink />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withContextProvider(Home, LinkContextProvider);