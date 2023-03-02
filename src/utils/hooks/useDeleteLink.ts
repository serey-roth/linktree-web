import { useLinkContext } from "@/contexts/LinkContext"
import { useMutation } from "react-query"
import { linksApi } from "../openApi"

export const useDeleteLink = () => {
    const { refetchLinks } = useLinkContext();

    const { mutateAsync, ...rest } = useMutation(
        (id: number) => linksApi.withPreMiddleware().secureLinkIdDelete({
            id
        }), {
            onSuccess: () => {
                refetchLinks();
            }
        }
    )

    const deleteLink = async (id: number) => {
        return mutateAsync(id);
    }

    return {
        deleteLink,
        ...rest
    }
}