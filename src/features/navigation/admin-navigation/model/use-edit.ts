import { type QueryClient, useMutation } from "@tanstack/react-query";
import { INavigation } from "@/entities";

import { fetchUpdateNavigation } from "../api/fetch-edit";



export const useAdminEditNavigation = (closeRef: React.RefObject<HTMLButtonElement>, reset: any, queryClient: QueryClient) => {

    return useMutation({
        mutationKey: ["navigations"],
        mutationFn: fetchUpdateNavigation,
        onSuccess: (updatedNavigation: INavigation) => {
            if (closeRef.current) closeRef.current.click();
            queryClient.invalidateQueries({
                queryKey: ["navigations"],
            });
            reset({
                slug: updatedNavigation.slug,
                title: { ...updatedNavigation.title },
                variant: updatedNavigation.variant,
            });
        },
    });

}