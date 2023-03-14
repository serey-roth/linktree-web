import { LinkPayload, AdminLinkIdPutRequest } from "@/generated/openapi";
import { useMutation, useQueryClient } from "react-query";
import { generateRequestHeaders } from "../generateRequestHeaders";
import { useCookie } from "./useCookie";

type UpdatePayload = AdminLinkIdPutRequest;

export const useUpdate = () => {
    const { cookie } = useCookie("linktree");
    
    const queryClient = useQueryClient();

    const { mutateAsync, ...rest } = useMutation(
        ({ id, linkPayload: newLink }: UpdatePayload) => {
            const requestOptions = {
                method: 'PUT',
                headers: generateRequestHeaders(cookie),
                body: JSON.stringify(newLink),
            };
            
            return fetch(`http://localhost:8080/api/admin/link/${id}`, requestOptions);
        },
        {
            onSuccess: (data, variables) => {
                queryClient.setQueryData(
                    ['sorted-paginated-links', 
                    { id: variables.id }],
                    data
                );
            }
        }
    );

    const updateLink = (id: number, newLink: LinkPayload) => {
        return mutateAsync({
            id,
            linkPayload: newLink
        })
    }

    return { 
        updateLink,
        ...rest
    }
}