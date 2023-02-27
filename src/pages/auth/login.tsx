import { InputField } from '@/components/InputField';
import { Layout } from '@/components/Layout';
import { UsernameAndPassword } from '@/generated/openapi';
import { useLogin } from '@/utils/hooks/useLogin';
import { isMultipleErrors } from '@/utils/isMultipleErrors';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface LoginProps {

}

const Login: React.FC<LoginProps> = ({}) => {
    const router = useRouter();
    const { username: name } = router.query;

    const methods = useForm<UsernameAndPassword>({
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
                methods.setError(field as keyof UsernameAndPassword, {
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
                <FormProvider {...methods}>
                    <form 
                    className=' max-w-[400px] w-full flex flex-col
                    gap-3'
                    onSubmit={methods.handleSubmit(onSubmit)}>
                        <InputField 
                        id='username'
                        name='username'
                        type='text'
                        placeholder='Username'/>

                        <InputField 
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Password'/>
                        
                        <button 
                        className='bg-blue-500/20 
                        p-1 rounded-sm'
                        type='submit'>
                            Log in
                        </button>
                    </form>
                </FormProvider>
            </div>
        </Layout>
    );
}

export default Login;