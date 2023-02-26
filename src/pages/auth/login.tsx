import { Layout } from '@/components/Layout';
import { ApiResponseUser, JwtUser, LoginInput } from '@/generated/openapi';
import { useLogin } from '@/utils/hooks/useLogin';
import { useRouter } from 'next/router';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import Cookie from 'js-cookie';

interface LoginProps {

}

const isWithJWt = (user: ApiResponseUser): user is JwtUser => {
    return (user as JwtUser).accessToken !== undefined;
}

const Login: React.FC<LoginProps> = ({}) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<LoginInput>();

    const { login } = useLogin();

    const onSubmit: SubmitHandler<LoginInput> = async (values) => {
        if (values.username && values.password) {
            const result = await login(values);
            if (result.user) {
                if (isWithJWt(result.user)) {
                    Cookie.set("linktree", result.user.accessToken, { expires: 60 * 60 * 24 * 365 });
                }
                router.push('/');
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
                    className='p-1 rounded-sm bg-gray-400/20
                    ' 
                    id='username'
                    type='text'
                    placeholder='Username'
                    {...register('username')}
                    />
                    <input
                    className='p-1 rounded-sm bg-gray-400/20
                    ' 
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

export default Login;