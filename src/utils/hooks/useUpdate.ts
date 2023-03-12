import { LinkPayload, SecureLinkIdPutRequest } from "@/generated/openapi";
import { useMutation, useQueryClient } from "react-query";
import { linksApi } from "../openApi";

type UpdatePayload = SecureLinkIdPutRequest;

export const useUpdate = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, ...rest } = useMutation(
        ({ id, linkPayload: newLink }: UpdatePayload) => 
            linksApi.withPreMiddleware().secureLinkIdPut({
                id, 
                linkPayload: newLink
            }),
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