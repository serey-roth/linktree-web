import { Layout } from '@/components/Layout';
import { UsernameEmailAndPassword, ModelApiResponse } from '@/generated/openapi';
import { useRegister } from '@/utils/hooks/useRegister';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<UsernameEmailAndPassword>();

    const { register: signUp } = useRegister();

    const onSubmit: SubmitHandler<UsernameEmailAndPassword> = async (values) => {
        if (values.username && values.password && values.email) {
            const result = await signUp({...values});
            if (result.data) {
                router.push(`/auth/login/?username=${values.username}`);
            }
        }
    }

    return (
        <Layout>
            <div className='flex flex-col w-full h-full
            justify-center items-center mt-4'>
                <form 
                className=' max-w-[400px] w-full flex flex-col
                gap-2'
                onSubmit={handleSubmit(onSubmit)}>
                    <input
                    className='p-1 rounded-sm bg-gray-400/20' 
                    id='username'
                    type='text'
                    placeholder='Username'
                    {...register('username')}
                    />
                    <input
                    className='p-1 rounded-sm bg-gray-400/20' 
                    id='email'
                    type='text'
                    placeholder='Email'
                    {...register('email')}
                    />
                    <input
                    className='p-1 rounded-sm bg-gray-400/20' 
                    id='password'
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                    />
                    <button 
                    className='bg-blue-500/20 
                    p-1 rounded-sm'
                    type='submit'>
                        Log in
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Register;