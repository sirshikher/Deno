import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import token from "../util/token.ts";
import db from "../config/databases.ts";
const protectedRoutes = new Router();

const user = db.collection("users");

protectedRoutes.get('/me', async (ctx: any) => {
    const authorization = ctx.request.headers.get("authorization");
    const headerToken = authorization.replace("Bearer ", "");
    const userId = token.fetchUserId(headerToken);
    if (userId) {
        try {
            const uid: string = String(userId.uid);
            const users = await user.findOne({ _id: ObjectId(uid) });
            ctx.response.body = users;
        } catch (e) {
            ctx.response.status = 400;
            ctx.response.body = { error: "User does not exist" }
        }
    }
})
export default protectedRoutes;
