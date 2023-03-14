import { AddLink } from '@/components/AddLink'
import { Layout } from '@/components/Layout'
import { LinkList } from '@/components/LinkList'
import { PaginationWithSelect } from '@/components/PaginationWithSelect'
import { LinkContextProvider, useLinkContext } from '@/contexts/LinkContext'
import { withContextProvider } from '@/utils/withContextProvider'
import Image from 'next/image'

function Home() {
    const {
        data: linkData,
        isFetching,
        updatePageNumber
    } = useLinkContext();

    return (
        <Layout>
            <div className='flex items-center
            justify-center px-2 mt-10'>
                <div className='flex flex-col sm:flex-row w-screen
                justify-center'>
                    <div className='flex flex-col items-center
                    w-full max-w-[600px] gap-2 sm:border-r sm:pr-2'>
                        <Image
                        priority
                        className='rounded-full aspect-square object-cover'
                        alt='user profile image'
                        src={'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'}
                        width={150}
                        height={150} />
                        <h1 className='font-bold text-xl'>
                            @alexveraros12
                        </h1>
                        <LinkList 
                            isFetching={isFetching}
                            links={linkData?.data || []}/>
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