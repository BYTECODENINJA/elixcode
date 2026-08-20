import { trpc } from "@/lib/trpc";

export function healthcheck() {
  const {data, isLoading, error } = trpc.health.useQuery()
}