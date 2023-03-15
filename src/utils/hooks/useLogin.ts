import { UsernameAndPassword } from "@/generated/openapi";
import { useMutation, useQueryClient } from "react-query";
import { usersApi } from "../openApi";

export const useLogin = () => {
    const queryClient = useQueryClient();
    
    const { mutateAsync, ...rest } = useMutation(
        (values: UsernameAndPassword) => usersApi.authLoginPost({
            usernameAndPassword: values
        }), {
            onSuccess: (data) => {
                queryClient.setQueryData(['me'], data);
            }
        }
    );

    const login = (values: UsernameAndPassword) => {
        return mutateAsync(values);
    }

    return {
        login,
        ...rest
    }
}