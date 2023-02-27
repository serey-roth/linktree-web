import { useMutation } from "react-query";
import { usersApi } from "../openApi";

export const useLogout = () => {
    const { mutateAsync, ...rest } = useMutation(
        () => usersApi.authLogoutPost()
    );

    const logout = () => {
        return mutateAsync();
    }

    return {
        logout,
        ...rest
    }
}