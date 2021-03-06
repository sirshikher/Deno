import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import router from "./routes/normalRoutes.ts";
import notFound from "./404.ts";
import authMiddleware from './middleware/auth.ts'
import protectedRouter from "./routes/protectedRoutes.ts";

const app = new Application();



const env = config();

const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

app.use(router.routes());
app.use(protectedRouter.routes());
app.use((ctx, next) => authMiddleware.authorization(ctx, next));
app.use(notFound);
console.log(`Server started at ${HOST} ${PORT}`);

await app.listen({ port: PORT });
