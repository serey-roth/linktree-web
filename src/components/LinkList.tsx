import React, { ReactNode } from "react";

interface LinkListProps {
    children: ReactNode;
    isFetching: boolean;
    length: number;
}

export const LinkList: React.FC<LinkListProps> = ({ 
    children,
    isFetching,
    length
}) => {
    return (
        <div className="flex flex-col mt-2 w-full gap-2 max-h-[500px]
        overflow-y-auto">
            {isFetching && <p className='text-slate-300 text-center'>
                Loading...
            </p>}
            {children}
            {!isFetching && length === 0 && (
                <p className='text-slate-300 text-center'>
                    No links
                </p>
            )}
        </div>
    );
};
