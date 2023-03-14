import { Link } from "@/generated/openapi";
import { useUpdate } from "@/utils/hooks/useUpdate";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";
import { EditableField } from "./EditableField";

type IndexedLink = Link & {
    [key: string]: any;
}

type LinkCardProps = {
    link: IndexedLink;
    isEditable: boolean;
    onDelete: () => void;
    imageSrc?: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({ 
    link,
    isEditable,
    onDelete
}) => {
    const { updateLink } = useUpdate();

    const handleEdit = async (field: string, value: string) => {
        const newLink = link;
        newLink[field] = value;
        const results = await updateLink(link.id, newLink);
        console.log(results);
    }

    return (
        <div className="border shadow-md rounded-lg group 
        relative h-auto drop-shadow-sm">
            <div className="flex items-center gap-2 flex-wrap
            py-1 bg-white"
            >
                <span className="font-semibold flex-1 px-1">
                    {isEditable ? (
                        <EditableField 
                            field="title"
                            initialValue={link.title} 
                            type="text"
                            placeholder="Title"
                            onEdit={handleEdit}/>
                    ) : (
                        <p>{link.title}</p>
                    )}
                </span>
                <div className="flex flex-row items-center mr-2 gap-2">
                    <a href={link.url}>
                        <HiExternalLink size={15} />
                    </a>
                    <button onClick={onDelete}>
                        <AiFillDelete size={15} />
                    </button>
                </div>
            </div>
            <div className="rounded-b-lg duration-500 inset-x-0
            ease-in-out bg-teal-600 h-0 overflow-hidden
            group-hover:h-[80px] opacity-0 group-hover:opacity-100
            transition-[height] text-md">
                <div className="flex flex-col gap-2 p-2 h-full">
                    {link.description ? 
                        isEditable ? (
                            <EditableField 
                                field="description"
                                initialValue={link.description} 
                                type="text"
                                placeholder="Description"
                                onEdit={handleEdit}/>
                        ) : (
                            <p>{link.description}</p>
                        )
                    : null}
                    <span className="flex items-center overflow-auto h-full">
                        <p className='mr-2'>URL:</p>
                        {isEditable ? (
                            <EditableField 
                                field="url"
                                initialValue={link.url} 
                                type="url"
                                placeholder="URL"
                                onEdit={handleEdit}/>
                        ): (
                            <p>{link.url}</p>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};
