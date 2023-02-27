import { InputField } from '@/components/InputField';
import { Layout } from '@/components/Layout';
import { UsernameEmailAndPassword, ModelApiResponse } from '@/generated/openapi';
import { useRegister } from '@/utils/hooks/useRegister';
import { isMultipleErrors } from '@/utils/isMultipleErrors';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const methods = useForm<UsernameEmailAndPassword>();

    const { register: signUp } = useRegister();

    const onSubmit: SubmitHandler<UsernameEmailAndPassword> = async (values) => {
        const result = await signUp({ ...values });
        if (result.data) {
            router.push(`/auth/login/?username=${values.username}`);
        }
        if (result.error && isMultipleErrors(result.error)) {
            result.error.errors.forEach(({ field, message }) => {
                methods.setError(field as keyof UsernameEmailAndPassword, {
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
                        id='email'
                        name='email'
                        type='text'
                        placeholder='Email'/>

                        <InputField 
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Password'/>

                        <button 
                        className='bg-blue-500/20 
                        p-1 rounded-sm'
                        type='submit'>
                            Register
                        </button>
                    </form>
                </FormProvider>
            </div>
        </Layout>
    );
}

export default Register;