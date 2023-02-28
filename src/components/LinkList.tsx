import { Link } from "@/utils/types/Link";
import React from "react";
import { LinkCard } from "./LinkCard";

interface LinkListProps {
    links: Link[];
    onDeleteLink: (linkIndex: number) => void;
}

export const LinkList: React.FC<LinkListProps> = ({ 
    links,
    onDeleteLink
}) => {
    const handleDeleteLink = (index: number) => {
        onDeleteLink(index);
    }

    return (
        <div className="flex flex-col mt-2 w-full gap-1 max-h-[500px]
        overflow-y-auto">
            {links.map(({ url, title, imageSrc }, index) => (
                <LinkCard 
                key={index}
                title={title}
                url={url}
                imageSrc={imageSrc}
                onDelete={() => handleDeleteLink(index)}
                />
            ))}
            {links.length === 0 && (
                <p className='text-slate-300 text-center'>
                    No links
                </p>
            )}
        </div>
    );
};
