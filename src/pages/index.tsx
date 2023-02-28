import { AddLink } from '@/components/AddLink'
import { Layout } from '@/components/Layout'
import { LinkList } from '@/components/LinkList'
import { useCookie } from '@/utils/hooks/useCookie'
import { useLinks } from '@/utils/hooks/useLinks'
import { useMe } from '@/utils/hooks/useMe'
import { Link } from '@/utils/types/Link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
    const [currentLinks, setCurrentLinks] = useState<Link[]>([]);
    
    const { data, refetch: refetchLinks } = useLinks();
    const { data: meData, refetch: refetchMe } = useMe();
    const { cookie } = useCookie("linktree");

    useEffect(() => {
        if (cookie) {
            refetchMe();
        }
    }, [cookie])

    useEffect(() => {
        if (meData) {
            refetchLinks();
        }
    }, [meData])

    const addNewLink = (link: Link) => {
        setCurrentLinks(prevLinks => ([
            ...prevLinks,
            link
        ]))
    }

    const deleteNewLink = (index: number) => {
        setCurrentLinks(prevLinks => {
            const copiedLinks = prevLinks.slice();
            copiedLinks.splice(index, 1);
            return copiedLinks;
        });
    }

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
                            links={data || []} 
                            onDeleteLink={deleteNewLink}/>
                    </div>
                    <div className='w-full sm:max-w-[400px] sm:pl-2'>
                        <AddLink onNewLink={addNewLink} />
                    </div>
                    </div>
            </div>
        </Layout>
    )
}