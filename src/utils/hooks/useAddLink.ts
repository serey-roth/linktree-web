import { useLinkContext } from "@/contexts/LinkContext";
import { LinkPayload } from "@/generated/openapi";
import { useMutation } from "react-query";
import { useCookie } from "./useCookie";

export const useAddLink = () => {
    const { cookie } = useCookie("linktree");
    const { refetchLinks } = useLinkContext();

    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Authorization": `Bearer ${cookie ? cookie : ""}`
    }

    const { mutateAsync, ...rest } = useMutation(
        (payload: LinkPayload) => {
            const requestOptions = {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
            };
            
            return fetch("http://localhost:8080/api/secure/links", requestOptions);
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