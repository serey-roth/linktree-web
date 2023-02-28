import { SecureLinksPaginatedGetRequest } from "@/generated/openapi";
import { QueryFunctionContext, QueryKey, useQuery } from "react-query";
import { linksApi } from "../openApi";

const PAGE_COUNT = 5;
const PAGE_NUMBER = 0;

type PaginatedPayload = SecureLinksPaginatedGetRequest;

const getPaginatedLinks = async (payload: PaginatedPayload) => {
    return linksApi.withPreMiddleware().secureLinksPaginatedGet(payload);
}

export const usePaginatedLinks = (payload: PaginatedPayload) => {
    const query = useQuery(
        ['paginated-links', payload], 
        () => getPaginatedLinks(payload),
        {
            keepPreviousData: true,
        }
    )

    return query;
}