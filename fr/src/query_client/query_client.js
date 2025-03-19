import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function getQueryClient() {
    return queryClient
}