import { useState } from "react";
import { useQuery } from "react-query";
import { usersApiWithMiddleware } from "../openApi";

export const useMe = () => {
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



    return query;
}