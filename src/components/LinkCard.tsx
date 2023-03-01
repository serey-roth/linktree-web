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
    url, 
    title, 
    description,
    imageSrc,
    onDelete
}) => {
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
            <div className="flex flex-col max-w-[400px] flex-1">
                <span className="font-semibold">
                    <EditableText text={title} textType='text'/>
                </span>
                {description && (
                    <span className="text-gray-400 text-sm">
                        <EditableText text={description} />
                    </span>
                )}
            </div>
            <div className="flex flex-row items-center mr-2 ml-auto gap-2">
                <a href={url}>
                    <HiExternalLink size={15} />
                </a>
                <button onClick={onDelete}>
                    <AiFillDelete size={15} />
                </button>
            </div>
        </div>
    );
};
