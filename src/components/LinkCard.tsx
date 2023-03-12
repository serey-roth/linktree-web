import { Link } from "@/generated/openapi";
import { useUpdate } from "@/utils/hooks/useUpdate";
import Image from "next/image";
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
    imageSrc,
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
        rounded-lg flex items-center gap-2"
        >
            {imageSrc ? (
                <Image
                className="rounded-lg aspect-square object-cover"
                alt="user profile image"
                src={imageSrc}
                width={50}
                height={50}
                loading='lazy'
                />
            ) : (
                <div className="bg-gray-400 w-[50px] h-[50px] rounded-lg" />
            )}
            <div className="flex flex-col max-w-[400px] flex-1 gap-1">
                <span className="font-semibold">
                    <EditableField 
                    field="title"
                    initialValue={link.title} 
                    textType='text'
                    onEdit={handleEdit}/>
                </span>
                {link.description && (
                    <span className="text-gray-400 text-sm">
                        <EditableField 
                        field="description"
                        textType="text"
                        initialValue={link.description} 
                        onEdit={handleEdit}/>
                    </span>
                )}
            </div>
            <div className="flex flex-row items-center mr-2 ml-auto gap-2">
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
