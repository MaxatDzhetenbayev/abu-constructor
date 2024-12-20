import { useMutation } from "@tanstack/react-query";
import { fetchRemoveContent } from "../api/fetch-remove";

export const useRemoveContent = (id: number | undefined) => {
    return useMutation({
        mutationKey: ["content", id],
        mutationFn: fetchRemoveContent
    })
}
