import { fetchRemoveContent } from "../api/fetch-remove";
import { useMutation } from "@tanstack/react-query";

export const useRemoveContent = (id: number | undefined) => {
    return useMutation({
        mutationKey: ["content", id],
        mutationFn: fetchRemoveContent
    })
}
