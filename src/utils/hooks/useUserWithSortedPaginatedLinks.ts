import { UserUsernamePaginatedSortedGetRequest } from "@/generated/openapi";
import { useQuery } from "react-query";
import { usersApi } from "../openApi";

type UserWithSortedPaginatedPayload = UserUsernamePaginatedSortedGetRequest;

const getUserWithSortedPaginatedLinks = async (payload: UserWithSortedPaginatedPayload) => {
    return usersApi.withPreMiddleware().userUsernamePaginatedSortedGet(payload);
}

export const useUserWithSortedPaginatedLinks = (payload: UserWithSortedPaginatedPayload) => {
    const query = useQuery(
        ['user-with-sorted-paginated-links', payload], 
        () => getUserWithSortedPaginatedLinks(payload),
        {
            keepPreviousData: true,
        }
    )

    return query;
}