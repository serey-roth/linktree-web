import { LoginInput } from "@/generated/openapi";
import { useMutation } from "react-query";
import { usersApi } from "../openApi";

export const useLogin = () => {
    const { mutateAsync, ...rest } = useMutation(
        (values: LoginInput) => usersApi.authLoginPost({
            loginInput: values
        })
    );

    const login = (values: LoginInput) => {
        return mutateAsync(values);
    }

    return {
        login,
        ...rest
    }
}