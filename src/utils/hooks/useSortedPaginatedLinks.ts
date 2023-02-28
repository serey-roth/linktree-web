import { SecureLinksPaginatedSortedGetRequest } from "@/generated/openapi";
import { QueryFunctionContext, QueryKey, useQuery } from "react-query";
import { linksApi } from "../openApi";

const PAGE_COUNT = 5;
const PAGE_NUMBER = 1;

type SortedPaginatedPayload = SecureLinksPaginatedSortedGetRequest;

const getSortedPaginatedLinks = async (key: QueryFunctionContext<QueryKey, 
    SortedPaginatedPayload>) => {
    return linksApi.withPreMiddleware().secureLinksPaginatedSortedGet({
        pageCount: key.pageParam?.pageCount || PAGE_COUNT ,
        pageNumber: key.pageParam?.pageNumber || PAGE_NUMBER,
        sortKey: key.pageParam ? key.pageParam.sortKey : "createdAt",
        order: key.pageParam?.order || "DESC"
        
    });
}

export const useSortedPaginatedLinks = (payload: SortedPaginatedPayload) => {
    const query = useQuery(
        ['sorted-paginated-links', payload], 
        getSortedPaginatedLinks,
        {
            keepPreviousData: true,
            enabled: false,
        }
    )

    return query;
}