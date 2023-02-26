import { Configuration, UsersApi, LoginInput } from "@/generated/openapi";
import { useMutation } from "react-query";

const configuration = new Configuration({
    basePath: 'http://localhost:8080/api'
});

const usersApi = new UsersApi(configuration);

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