import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/user", (ctx) => {
  ctx.response.body = "I am a user";
});
router.post("/user", async (ctx) => {
 const {value} = await ctx.request.body() 
 ctx.response.status = 201;
 ctx.response.body = value;
});
app.use(router.routes());
app.use((ctx) => {
  ctx.response.body = "Hello World from Oak!";
});
console.log("Server started at 8000 port!!");

await app.listen({ port: 8000 });
