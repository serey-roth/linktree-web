import { UsernameAndPassword } from "@/generated/openapi";
import { useMutation } from "react-query";
import { usersApi } from "../openApi";

export const useLogin = () => {
    const { mutateAsync, ...rest } = useMutation(
        (values: UsernameAndPassword) => usersApi.authLoginPost({
            usernameAndPassword: values
        })
    );

    const login = (values: UsernameAndPassword) => {
        return mutateAsync(values);
    }

    return {
        login,
        ...rest
    }
}