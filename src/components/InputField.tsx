import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type InputFieldProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    name: string
};

export const InputField: React.FC<InputFieldProps> = ({
    id, type, name, ...rest
}) => {
    const { 
        register,
        formState: { errors }
    } = useFormContext<Record<string, string>>();

    return (
        <div className="flex flex-col gap-1">
        <input
            className="p-1 rounded-sm bg-gray-400/20"
            {...rest}
            id={id}
            type={type}
            {...register(name)}
        />
        {errors[name] && (
            <p className="text-red-500 text-sm">
                {errors[name]?.message}
            </p>
        )}
        </div>
    );
};