import { Configuration, UsersApi, Middleware, RequestContext, ConfigurationParameters } from "@/generated/openapi";
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

const apiConfig: ConfigurationParameters = {
    basePath: 'http://localhost:8080/api',
    credentials: "include",
    headers: {
        "Access-Control-Allow-Credentials": "true"
    }
}

export const configurationWithMiddleware = new Configuration({
    ...apiConfig,
    middleware: [middleware],
});

export const configuration = new Configuration(apiConfig);

export const usersApiWithMiddleware = new UsersApi(configurationWithMiddleware);

export const usersApi = new UsersApi(configuration);