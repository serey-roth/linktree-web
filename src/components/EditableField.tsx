import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { EditableInput } from './EditableInput';

type EditableFieldProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    field: string;
    initialValue: string;
    onEdit: (field: string, value: string) => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({
    field,
    initialValue,
    onEdit,
    ...rest
}) => {

    const handleEdit = (value: string) => {
        onEdit(field, value);
    }

    return (
        <EditableInput
            {...rest}
            initialValue={initialValue}
            onEdit={handleEdit}
        />
    )
}