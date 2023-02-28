import { useQuery } from "react-query"
import { linksApi } from "../openApi"

export const useLinks = () => {
    const query = useQuery(
        'links', 
        () => linksApi.withPreMiddleware().secureLinksAllGet(),
        {
            keepPreviousData: true,
            enabled: false,
        }
    )

    return query;
}