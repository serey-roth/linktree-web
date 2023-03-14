import { useEffect } from "react";
import { useQuery } from "react-query";
import { usersApiWithMiddleware } from "../openApi";
import { useCookie } from "./useCookie";

export const useMe = () => {
    const { cookie } = useCookie("linktree");
    
    const query = useQuery(
        'me',
        () => usersApiWithMiddleware
            .withPreMiddleware()
            .authMeGet(),
        {
            keepPreviousData: true,
            enabled: false
        }
    );

    useEffect(() => {
        if (cookie) {
            query.refetch();
        }
    }, [cookie]);


    return query;
}