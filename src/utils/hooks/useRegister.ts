import { UsernameEmailAndPassword } from "@/generated/openapi";
import { useMutation } from "react-query";
import { usersApi } from "../openApi";

export const useRegister = () => {
    const { mutateAsync, ...rest } = useMutation(
        (values: UsernameEmailAndPassword) => usersApi.authRegisterPost({
            usernameEmailAndPassword: values
        })
    );

    const register = (values: UsernameEmailAndPassword) => {
        return mutateAsync(values);
    }

    return {
        register,
        ...rest
    }
}