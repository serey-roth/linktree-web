import { RequestContext } from "@/generated/openapi";
import { useQuery } from "react-query"
import { usersApi } from "../openApi"

export const useMe = () => {
    const query = useQuery(
        'me',
        () => usersApi.withPreMiddleware().authMeGet(),
        {
            keepPreviousData: true,
        }
    );

    return query;
}