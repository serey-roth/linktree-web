import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface EditableTextProps {
  text: string;
  textType?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
    text, textType='text'
}) => {
    const [currentText, setCurrentText] = useState(text);

    const { register, handleSubmit } = useForm<{ 
        text: string 
    }>({ values: { text: currentText } });

    const [isEditable, setIsEditable] = useState(false);

    const onSubmit: SubmitHandler<{ text: string }> = (values) => {
        setCurrentText(values.text);
        setIsEditable(false);
    }

    return (
        <>
        {isEditable ? (
            <form 
            className='flex items-center gap-2'
            onSubmit={handleSubmit(onSubmit)}>
                <input
                autoFocus
                className='py-1 px-2 ring-0 appearance-none
                outline-none border-0 focus:ring
                focus:ring-slate-200 rounded-sm'
                placeholder='Title'
                required
                type={textType} 
                {...register('text')} />
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
                {currentText}
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
