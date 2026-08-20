import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/root";
import { createTrpcContext } from "@/server/api/trpc";

const handler = (req: Request)=> fetchRequestHandler({
  endpoint: "/api/trpc",
  req,
  router: appRouter,
  createContext: () => createTrpcContext({ headers: req.headers }),
  onError:
  process.env.NODE_ENV === "development" ? console.error: console.error,
})

export { handler as GET, handler as POST };