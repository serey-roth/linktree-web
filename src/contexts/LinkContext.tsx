import { PaginatedReponse } from "@/generated/openapi";
import { useSortedPaginatedLinks } from "@/utils/hooks/useSortedPaginatedLinks";
import { createContext, ReactNode, useContext, useState } from "react";

type Order = "ASC" | "DESC";

type LinkContextValues = {
    linkData: PaginatedReponse | undefined;
    isFetching: boolean;
    pageNumber: number;
    pageCount: number;
    sortKey: string;
    sortOrder: Order;
    updatePageNumber: (pageNumber: number) => void;
    updatePageCount: (pageNumber: number) => void;
    updateSortKey: (sorKey: string) => void;
    updateSortOrder: (order: Order) => void;
};

const LinkContext = createContext<LinkContextValues>({} as LinkContextValues);

export const LinkContextProvider = ({
    children 
}: { children : ReactNode }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(5);
    const [sortKey, setSortKey] = useState<string>("createdAt");
    const [order, setOrder] = useState<Order>("DESC");
    
    const { data: linkData, isFetching} = useSortedPaginatedLinks({
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

    return (
        <LinkContext.Provider
        value={{
            linkData,
            isFetching,
            pageCount,
            pageNumber,
            sortOrder: order,
            sortKey,
            updatePageCount,
            updatePageNumber,
            updateSortKey,
            updateSortOrder
        }}>
            {children}
        </LinkContext.Provider>
    )
}

export const useLinkContext = () => useContext(LinkContext);
