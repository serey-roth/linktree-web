import Cookies from "js-cookie";

export const hasCookie = (cookieName: string) => {
    const cookie = Cookies.get(cookieName);
    return !!cookie;
}