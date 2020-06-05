import db from '../config/databases.ts'
import validation from '../validation.ts';
import hash from '../util/hash.ts';
import token from '../util/token.ts';

const user = db.collection("users");

export default {
    async login(ctx: any) {
        const value = await validation.validateLogin(ctx);
        if (value) {
            const users = await user.findOne({ email: value.email })
            let passwordMatched = false;
            if (!users) {
                ctx.response.status = 400;
                ctx.response.body = {
                    error: "Credentials doesn't match"
                }
                return;
            }
            if (user) {
                passwordMatched = await hash.verify(users.password, value.password);
                if (!passwordMatched) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        error: "Password is incorrect"
                    }
                    return;
                }

                if (passwordMatched) {
                    ctx.response.body = token.generate(users._id.$oid);
                } else {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        error: "Password is incorrect"
                    }
                }

            } else {
                ctx.response.status = 404;
                ctx.response.body = {
                    error: "Credentials doesn't match"
                }
            }
        }
    },
};
