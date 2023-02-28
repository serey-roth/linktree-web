import { SecureLinksPaginatedGetRequest } from "@/generated/openapi";
import { QueryFunctionContext, QueryKey, useQuery } from "react-query";
import { linksApi } from "../openApi";

const PAGE_COUNT = 5;
const PAGE_NUMBER = 1;

type PaginatedPayload = SecureLinksPaginatedGetRequest;

const getPaginatedLinks = async (key: QueryFunctionContext<QueryKey, 
    PaginatedPayload>) => {
    return linksApi.withPreMiddleware().secureLinksPaginatedGet({
        pageCount: key.pageParam?.pageCount || PAGE_COUNT ,
        pageNumber: key.pageParam?.pageNumber || PAGE_NUMBER,
    });
}

export const usePaginatedLinks = (payload: PaginatedPayload) => {
    const query = useQuery(
        ['paginated-links', payload], 
        getPaginatedLinks,
        {
            keepPreviousData: true,
            enabled: false,
        }
    )

    return query;
}