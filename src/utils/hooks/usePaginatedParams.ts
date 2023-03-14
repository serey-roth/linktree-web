import { useState } from "react";

type Order = "ASC" | "DESC"; 

export const usePaginatedParams = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(5);
    const [sortKey, setSortKey] = useState<string>("createdAt");
    const [order, setOrder] = useState<Order>("DESC");

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

    return {
        pageNumber,
        pageCount,
        sortKey,
        order,
        updatePageCount,
        updatePageNumber,
        updateSortKey,
        updateSortOrder
    }
}