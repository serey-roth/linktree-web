import { Link } from "@/utils/types/Link";
import React from "react";
import { LinkCard } from "./LinkCard";

interface LinkListProps {
    links?: Link[];
    isFetching: boolean;
    onDeleteLink: (linkIndex: number) => void;
}

export const LinkList: React.FC<LinkListProps> = ({ 
    links,
    isFetching,
    onDeleteLink
}) => {
    const handleDeleteLink = (index: number) => {
        onDeleteLink(index);
    }

    return (
        <div className="flex flex-col mt-2 w-full gap-2 max-h-[500px]
        overflow-y-auto">
            {isFetching && <p className='text-slate-300 text-center'>
                Loading...
            </p>}
            {links?.map(({ id, url, title, imageSrc, description }, index) => (
                <LinkCard 
                key={id}
                id={id}
                title={title}
                url={url}
                imageSrc={imageSrc}
                description={description}
                onDelete={() => handleDeleteLink(index)}
                />
            ))}
            {!isFetching && links?.length === 0 && (
                <p className='text-slate-300 text-center'>
                    No links
                </p>
            )}
        </div>
    );
};
