import { Link } from "@/generated/openapi";
import { useDeleteLink } from "@/utils/hooks/useDeleteLink";
import React from "react";
import { LinkCard } from "./LinkCard";

type IndexedLink = Link & {
    [key: string]: any;
}

interface LinkListProps {
    links?: Link[];
    isFetching: boolean;
}

export const LinkList: React.FC<LinkListProps> = ({ 
    links,
    isFetching,
}) => {
    const { deleteLink } = useDeleteLink();

    const handleDeleteLink = (index: number) => {
        deleteLink(index);
    }

    return (
        <div className="flex flex-col mt-2 w-full gap-2 max-h-[500px]
        overflow-y-auto">
            {isFetching && <p className='text-slate-300 text-center'>
                Loading...
            </p>}
            {links?.map((link) => (
                <LinkCard 
                key={link.id}
                link={link as IndexedLink}
                onDelete={() => handleDeleteLink(link.id)}
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
