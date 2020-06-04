import db from '../config/databases.ts'
import validation from '../validation.ts';

const user = db.collection("users");

export default {
    async user(ctx: any) {
        const users = await user.find();
        ctx.response.body = users;
    },
    async show(ctx: any) {
        const users = await user.findOne({ _id: { $oid: ctx.params.id } });
        ctx.response.body = users;
    },
    async store(ctx: any) {
        const value = await validation.validate(ctx);
        if (value) {
            const insertId = await user.insertOne(value);
            ctx.response.status = 201;
            ctx.response.body = insertId;
        }

    },
    async update(ctx: any) {
        const value = await validation.validateUpdate(ctx);
        if (value) {
            await user.updateOne({ _id: { $oid: ctx.params.id } }, { $set: value });
            ctx.response.status = 200; //success
            ctx.response.body = { message: 'Succesfully Updated' };

        }

    },
    async destroy(ctx: any) {
        await user.deleteOne({ _id: { $oid: ctx.params.id } });
        ctx.response.status = 204; //no content
    },
};
