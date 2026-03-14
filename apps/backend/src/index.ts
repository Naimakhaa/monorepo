import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "./generated/prisma/client";
import { prisma } from '../prisma/db';
import type { ApiResponse, HealthCheck, User } from "shared";

const app = new Elysia()
  .use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] })) // Pastikan port frontend benar
  .use(swagger())
  // ...
  .get("/", (): ApiResponse<HealthCheck> => {
    return {
      data: { status: "ok" },
      message: "server running",
    };
  })
  .get("/users", async () => {
    const users = await prisma.user.findMany()
    const response: ApiResponse<User[]> = {
      data: users,
      message: "User list"
    }
    return response
  })
 // Pindahkan console.log ke dalam callback listen agar lebih akurat
  .listen(3000, ({ hostname, port }) => {
    console.log(`🦊 Elysia is running at http://${hostname}:${port}`);
    console.log(`📖 Swagger is running at http://${hostname}:${port}/swagger`);
  });
export type App = typeof app;
