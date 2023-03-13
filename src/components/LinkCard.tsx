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
    onDelete: () => void;
    imageSrc?: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({ 
    link,
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
        <div className="p-1 border shadow-md
        rounded-lg flex items-center gap-2 flex-wrap"
        >
            <span className="font-semibold flex-1 px-1">
                <EditableField 
                field="title"
                initialValue={link.title} 
                type="text"
                placeholder="Title"
                onEdit={handleEdit}/>
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
    );
};
