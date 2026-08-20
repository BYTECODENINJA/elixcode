import { db } from "@/server/db";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

export const createTrpcContext = async (opts: {headers: Headers}) => {
  return {
    db,
    headers: opts.headers,
  }
}

type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
  errorFormatter({ shape , error}) {
    return {
      shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      }
    }
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
