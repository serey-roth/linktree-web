import { Link } from '@/utils/types/Link';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

type LinkInput = {
    title: string;
    url: string;
}

interface AddLinkProps {
    onNewLink: (link: Link) => void;
}

export const AddLink: React.FC<AddLinkProps> = ({
    onNewLink
}) => {
    const { register, handleSubmit } = useForm<LinkInput>();

    const onSubmit: SubmitHandler<LinkInput> = ({ title, url }) => {
        onNewLink({ title, href: url });
    }

    return (
        <form 
        className='flex flex-col w-full gap-1 mt-2'
        onSubmit={handleSubmit(onSubmit)}>
            <input 
                className='p-2 border rounded-lg
                shadow-inner shadow-slate-300'
                type='text'
                placeholder='Title'
                required
                {...register('title')}
            />
            <input 
                className='p-2 border rounded-lg
                shadow-inner shadow-slate-300'
                type='url'
                placeholder='Url'
                {...register('url')}
            />
            <button 
                className='bg-teal-400 p-2 rounded-lg
                drop-shadow-md font-white text-lg'
                type='submit'>
                Add link
            </button>
        </form>
    );
}