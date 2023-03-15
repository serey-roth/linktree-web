import { AuthResponse } from "@/generated/openapi";
import { useMutation, useQueryClient } from "react-query";
import { Updater } from "react-query/types/core/utils";
import { usersApi } from "../openApi";

export const useLogout = () => {
    const queryClient = useQueryClient();

    const updater: Updater<AuthResponse | undefined, AuthResponse | undefined> = (meData: AuthResponse | undefined) => {
        if (meData) {
            return {
                ...meData,
                data: null,
            }
        }
        return meData;
    };

    const { mutateAsync, ...rest } = useMutation(
        () => usersApi.authLogoutPost(), {
            onSuccess: () => {
                //don't use queryClient.invalidateQueries
                //since we disable automatic fetching for useMe hook
                queryClient.setQueryData<AuthResponse | undefined>(
                    ['me'],
                    updater
                )
            }
        }
    );

    const logout = () => {
        return mutateAsync();
    }

    return {
        logout,
        ...rest
    }
}