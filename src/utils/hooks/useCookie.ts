import Cookies from "js-cookie";
import { useEffect, useState } from "react"

export const useCookie = (cookieName: string) => {
    const [cookie, setCookie] = useState<string | null>(null);

    useEffect(() => {
        const cookie = Cookies.get(cookieName);
        if (cookie) {
            setCookie(cookie);
        }
    }, []);
    
    const updateCookie = (cookie: string | null) => {
        setCookie(cookie);
    }

    return {
        cookie,
        updateCookie
    }
}