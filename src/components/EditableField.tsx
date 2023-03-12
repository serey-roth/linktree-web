import React from 'react'
import { EditableText } from './EditableText';

interface EditableFieldProps {
    field: string;
    initialValue: string;
    textType: string;
    onEdit: (field: string, value: string) => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({
    field,
    initialValue,
    textType,
    onEdit
}) => {

    const handleEdit = (value: string) => {
        onEdit(field, value);
    }

    return (
        <EditableText
            text={initialValue}
            textType={textType}
            onEdit={handleEdit}
        />
    )
}