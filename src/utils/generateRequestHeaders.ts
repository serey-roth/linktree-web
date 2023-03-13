export const generateRequestHeaders = (cookie: string | null) => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Authorization": `Bearer ${cookie ? cookie : ""}`
});