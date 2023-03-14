import { AdminLinksPaginatedGetRequest } from "@/generated/openapi";
import { useQuery } from "react-query";
import { linksApi } from "../openApi";

type PaginatedPayload = AdminLinksPaginatedGetRequest;

const getPaginatedLinks = async (payload: PaginatedPayload) => {
    return linksApi.withPreMiddleware().adminLinksPaginatedGet(payload);
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