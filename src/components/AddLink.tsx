import { LinkPayload } from '@/generated/openapi';
import { useAddLink } from '@/utils/hooks/useAddLink';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddLinkProps {
}

export const AddLink: React.FC<AddLinkProps> = ({}) => {
    const { addLink } = useAddLink();

    const { register, handleSubmit } = useForm<LinkPayload>();
    
    const onSubmit: SubmitHandler<LinkPayload> = async (values) => {
        addLink(values);
    }

    return (
        <form
        method='post'
        action='http://localhost:8080/api/secure/links'
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
            <input 
                className='p-2 border rounded-lg
                shadow-inner shadow-slate-300'
                type='text'
                placeholder='Description'
                {...register('description')}
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