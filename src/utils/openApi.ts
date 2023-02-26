import { Configuration, UsersApi, Middleware, RequestContext } from "@/generated/openapi";
import Cookies from "js-cookie";

const middleware: Middleware = {
    pre: async (context: RequestContext) => {
        const token = Cookies.get("linktree");

        let newInit: RequestInit = context.init;

        if (token) {
            newInit = {
                ...newInit,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        }

        return {
            init: newInit,
            url: context.url
        }
    }
}

export const configuration = new Configuration({
    basePath: 'http://localhost:8080/api',
    middleware: [middleware]
});

export const usersApi = new UsersApi(configuration);