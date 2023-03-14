import { AdminLinksPaginatedSortedGetRequest } from "@/generated/openapi";
import { useQuery } from "react-query";
import { linksApi } from "../openApi";

type SortedPaginatedPayload = AdminLinksPaginatedSortedGetRequest;

const getSortedPaginatedLinks = async (payload: SortedPaginatedPayload) => {
    return linksApi.withPreMiddleware().adminLinksPaginatedSortedGet(payload);
}

export const useSortedPaginatedLinks = (payload: SortedPaginatedPayload) => {
    const query = useQuery(
        ['sorted-paginated-links', payload], 
        () => getSortedPaginatedLinks(payload),
        {
            keepPreviousData: true,
            enabled: false
        }
    )

    return query;
}