import { Link } from "@/utils/types/Link";
import Image from "next/image";
import React from "react";
import { HiExternalLink } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { EditableText } from "./EditableText";

type LinkCardProps = Link & {
    onDelete: () => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ 
    href, 
    title, 
    imageSrc,
    onDelete
}) => {
    return (
        <div
        className="p-1 border shadow-md
                rounded-lg flex items-center justify-between gap-1
                group"
        >
        {imageSrc ? (
            <Image
            className="rounded-lg aspect-square object-cover"
            alt="user profile image"
            src={imageSrc}
            width={50}
            height={50}
            />
        ) : (
            <div className="bg-gray-400 w-[50px] h-[50px] rounded-lg" />
        )}
        <div className="flex flex-col">
            <EditableText text={title} textType='text'/>
            {href && <EditableText text={href} textType='url' />}
        </div>
        <div className="flex flex-row items-center mr-2 gap-2">
            <a href={href}>
                <HiExternalLink size={15} />
            </a>
            <button onClick={onDelete}>
                <AiFillDelete size={15} />
            </button>
        </div>
        </div>
    );
};
