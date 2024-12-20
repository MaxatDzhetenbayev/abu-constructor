import { type QueryClient, useMutation } from "@tanstack/react-query";
import { fetchCreateAdminNavigation } from "../api/fetch-create";



export const useAdminCreateNavigation = (closeRef: React.RefObject<HTMLButtonElement>, reset: () => void, queryClient: QueryClient) => {
    return useMutation({
        mutationKey: ["navigations"],
        mutationFn: fetchCreateAdminNavigation,
        onSuccess: () => {
            reset();
            if (closeRef.current) closeRef.current.click();
            queryClient.invalidateQueries({
                queryKey: ["navigations"],
            });
        },
    });
}