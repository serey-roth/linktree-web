import { Layout } from '@/components/Layout';
import { ModelError, MultipleErrors, UsernameAndPassword } from '@/generated/openapi';
import { useLogin } from '@/utils/hooks/useLogin';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginProps {

}

const isMultipleErrors = (error: ModelError): error is MultipleErrors => {
    return (error as MultipleErrors).errors !== undefined;
}

const Login: React.FC<LoginProps> = ({}) => {
    const router = useRouter();
    const { username: name } = router.query;

    const { 
        formState: { errors },
        register, 
        handleSubmit, 
        setError
    } = useForm<UsernameAndPassword>({
        values: {
            username: name && typeof name === 'string' ? name : '',
            password: ''
        }
    });

    const { login } = useLogin();

    const onSubmit: SubmitHandler<UsernameAndPassword> = async (values) => {
        const result = await login(values);
        if (result.data) {
          router.push("/");
        }
        if (result.error && isMultipleErrors(result.error)) {
          result.error.errors.forEach(({ field, message }) => {
            setError(field as keyof UsernameAndPassword, {
              type: "custom",
              message,
            });
          });
        }
    }

    return (
        <Layout>
            <div className='flex flex-col w-full h-full
            justify-center items-center mt-4'>
                <form 
                className=' max-w-[400px] w-full flex flex-col
                gap-3'
                onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-1'>
                        <input
                        className='p-1 rounded-sm bg-gray-400/20' 
                        id='username'
                        type='text'
                        placeholder='Username'
                        {...register('username')}
                        />
                        {errors.username && (
                            <p className='text-red-500 text-sm'>
                                {errors.username.message}
                            </p>
                        )}  
                    </div>
                    <div className='flex flex-col gap-1'>
                        <input
                        className='p-1 rounded-sm bg-gray-400/20' 
                        id='password'
                        type='password'
                        placeholder='Password'
                        {...register('password')}
                        />
                        {errors.password && (
                            <p className='text-red-500 text-sm'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
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