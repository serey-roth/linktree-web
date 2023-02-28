import { SecureLinksPaginatedSortedGetRequest } from "@/generated/openapi";
import { useQuery } from "react-query";
import { linksApi } from "../openApi";

type SortedPaginatedPayload = SecureLinksPaginatedSortedGetRequest;

const getSortedPaginatedLinks = async (payload: SortedPaginatedPayload) => {
    return linksApi.withPreMiddleware().secureLinksPaginatedSortedGet(payload);
}

export const useSortedPaginatedLinks = (payload: SortedPaginatedPayload) => {
    const query = useQuery(
        ['sorted-paginated-links', payload], 
        () => getSortedPaginatedLinks(payload),
        {
            keepPreviousData: true,
        }
    )

    return query;
}