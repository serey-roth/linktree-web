import { useLinkContext } from "@/contexts/LinkContext";
import { LinkPayload } from "@/generated/openapi";
import { useMutation } from "react-query";
import { generateRequestHeaders } from "../generateRequestHeaders";
import { useCookie } from "./useCookie";

export const useAddLink = () => {
    const { cookie } = useCookie("linktree");
    const { refetchLinks } = useLinkContext();

    const { mutateAsync, ...rest } = useMutation(
        (payload: LinkPayload) => {
            const requestOptions = {
                method: 'POST',
                headers: generateRequestHeaders(cookie),
                body: JSON.stringify(payload),
            };
            
            return fetch("http://localhost:8080/api/admin/links", requestOptions);
        }, {
            onSuccess: () => {
                refetchLinks();
            }
        }
    );

    const addLink = (payload: LinkPayload) => {
        return mutateAsync(payload);
    }

    return {
        addLink,
        ...rest
    }
}