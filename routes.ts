import { Router } from "https://deno.land/x/oak/mod.ts";
import userController from "./controller/userController.ts";
const router = new Router();

router.get("/user", userController.user)
  .get("/user/:id", userController.show)
  .post("/user", userController.store)
  .patch("/user/:id", userController.update)
  .delete("/user/:id", userController.destroy);
export default router;
