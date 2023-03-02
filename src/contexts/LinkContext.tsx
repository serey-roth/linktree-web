import { ModelError, PaginatedResponse } from "@/generated/openapi";
import { useSortedPaginatedLinks } from "@/utils/hooks/useSortedPaginatedLinks";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Order = "ASC" | "DESC";

type Error = ModelError;

type LinkContextValues = {
    data: PaginatedResponse | undefined;
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
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(5);
    const [sortKey, setSortKey] = useState<string>("createdAt");
    const [order, setOrder] = useState<Order>("DESC");
    
    const { data: linkData, isFetching, refetch} = useSortedPaginatedLinks({
        pageCount,
        pageNumber,
        sortKey,
        order
    });

    const updatePageNumber = (pageNumber: number) => {
        setPageNumber(pageNumber);
    }

    const updatePageCount = (pageCount: number) => {
        setPageCount(pageCount);
    }

    const updateSortKey = (sortKey: string) => {
        setSortKey(sortKey);
    }

    const updateSortOrder = (order: Order) => {
        setOrder(order);
    }

    const refetchLinks = () => {
        refetch();
    }

    useEffect(() => {
        refetch();
    }, [pageNumber, pageCount, sortKey, order])

    return (
        <LinkContext.Provider
        value={{
            data: (linkData?.data as PaginatedResponse | undefined),
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
