import db from '../config/databases.ts'
import validation from '../validation.ts';
import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import hash from '../util/hash.ts';

const user = db.collection("users");

export default {
    async user(ctx: any) {
        const users = await user.find();
        ctx.response.body = users;
    },
    async show(ctx: any) {
        try {
            const users = await user.findOne({ _id: ObjectId(ctx.params.id) });
            ctx.response.body = users;
        } catch (e) {
            ctx.response.status = 400;
            ctx.response.body = { error: "User does not exist" }
        }

    },
    async store(ctx: any) {
        const value = await validation.validate(ctx);
        if (value) {
             value.createdAt = parseInt((new Date().getTime() / 1000).toString());
             value.password = await hash.bcrpyt(value.password);
            const insertId = await user.insertOne(value);
            ctx.response.status = 201;
            ctx.response.body = insertId;
        }

    },
    async update(ctx: any) {
        const value = await validation.validateUpdate(ctx);
        if (value) {
            try {
                await user.updateOne({ _id: ObjectId(ctx.params.id)}, { $set: value });
            ctx.response.status = 200; //success
            ctx.response.body = { message: 'Succesfully Updated' };
            } catch (e) {
                ctx.response.status =400; //success
                ctx.response.body = { error: 'User not exist' };
            }
        

        }

    },
    async destroy(ctx: any) {
        try {
            await user.deleteOne({ _id: ObjectId(ctx.params.id) });
            ctx.response.status = 204; //no content
        } catch (e) {
            ctx.response.status = 400 //bad request
            ctx.response.body = {
                error: "User not exist"
            }
        }

    },
};
