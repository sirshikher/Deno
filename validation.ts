export default {
    async validate(ctx: any) {
        let status;
        let error = [];
        const { value } = await ctx.request.body();
        if (!value) {
            ctx.response.status = 400; //Bad Request
            ctx.response.body = { error: "Please Provide the required feild" }
            return;
        }
        const feilds = ['name', 'email'];
        for (let index = 0; index < feilds.length; index++) {
            if (!value[feilds[index]]) {
                status = 422; //Unprocessabel Enitity
                error.push({
                    [feilds[index]]: `Please Provide the ${feilds[index]} feild`
                })
            };
        }
        if (status) {
            ctx.response.body = { error, status }
            return false;
        }
        return value;
    },

    async validateUpdate(ctx: any) {
        const { value } = await ctx.request.body();
        if (!value) {
            ctx.response.status = 400; //Bad Request
            ctx.response.body = { error: "Please Provide the required feild" }
            return;
        }
        return value;
    }
}