import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

type EditableInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  initialValue: string;
  onEdit: (value: string) => void;
}

export const EditableInput: React.FC<EditableInputProps> = ({
    initialValue, onEdit, ...rest
}) => {
    const [currentValue, setCurrentValue] = useState(initialValue);

    const { register, handleSubmit } = useForm<{ 
        value: string 
    }>({ values: { value: currentValue } });

    const [isEditable, setIsEditable] = useState(false);

    const onSubmit: SubmitHandler<{ value: string }> = ({ value }) => {
        setCurrentValue(value);
        setIsEditable(false);
        onEdit(value);
    }

    return (
        <>
        {isEditable ? (
            <form 
            className='flex items-center gap-2 w-full'
            onSubmit={handleSubmit(onSubmit)}>
                <input
                {...rest}   
                autoFocus
                className='ring-0 appearance-none
                outline-none border-1 focus:ring px-1
                focus:ring-slate-100 rounded-sm
                bg-teal-300 w-full'
                required
                {...register('value')} />
                <button className='font-bold' type='submit'>
                    <AiOutlineCheck size={15} />
                </button>
                <button className='font-bold' onClick={() => setIsEditable(false)}>
                    <AiOutlineClose size={15} />
                </button>
            </form>
        ):
        (<div className="flex items-center gap-2 group">
            <p className="text-center max-w-[130px] sm:max-w-full truncate">
                {currentValue}
            </p>
            <button 
            className='opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out'
            onClick={() => setIsEditable(true)}>
                <AiFillEdit size={15} />
            </button>
        </div>)}
        </>
    );
};
