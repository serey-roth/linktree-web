import { ModelError, PaginatedLinks } from "@/generated/openapi";
import { usePaginatedParams } from "@/utils/hooks/usePaginatedParams";
import { useSortedPaginatedLinks } from "@/utils/hooks/useSortedPaginatedLinks";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Order = "ASC" | "DESC";

type Error = ModelError;

type LinkContextValues = {
    data: PaginatedLinks | undefined;
    error: Error | undefined;
    isFetching: boolean;
    pageNumber: number;
    pageCount: number;
    sortKey: string;
    sortOrder: Order;
    updatePageNumber: (pageNumber: number) => void;
    updatePageCount: (pageNumber: number) => void;
    updateSortKey: (sorKey: string) => void;
    updateSortOrder: (order: Order) => void;
    refetchLinks: () => void;
};

const LinkContext = createContext<LinkContextValues>({} as LinkContextValues);

export const LinkContextProvider = ({
    children 
}: { children : ReactNode }) => {
    const {
        pageCount,
        pageNumber,
        sortKey,
        order,
        updatePageCount,
        updatePageNumber,
        updateSortKey,
        updateSortOrder
    } = usePaginatedParams();
    
    const { data: linkData, isFetching, refetch} = useSortedPaginatedLinks({
        pageCount,
        pageNumber,
        sortKey,
        order
    });

    const refetchLinks = () => {
        refetch();
    }

    useEffect(() => {
        refetch();
    }, [pageNumber, pageCount, sortKey, order])

    return (
        <LinkContext.Provider
        value={{
            data: (linkData?.data as PaginatedLinks | undefined),
            error: (linkData?.error as Error | undefined),
            isFetching,
            pageCount,
            pageNumber,
            sortOrder: order,
            sortKey,
            updatePageCount,
            updatePageNumber,
            updateSortKey,
            updateSortOrder,
            refetchLinks,
        }}>
            {children}
        </LinkContext.Provider>
    )
}

export const useLinkContext = () => useContext(LinkContext);
