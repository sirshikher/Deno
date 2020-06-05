import token from '../util/token.ts'; 
 
 export default {
     async authorization (ctx:any, next:any) {
        const authorization = ctx.request.headers.get("authorization");
        if (!authorization) {
          
            ctx.response.status = 401 //unauthorized
            ctx.response.body = { error: "Unauthorized" };
            return;
        }
    
        const headerToken = authorization.replace("Bearer ", "");
    
        const isTokenValidate = await token.validate(headerToken);
        if (!isTokenValidate) {
            ctx.response.status = 401 //unauthorized
            ctx.response.body = { error: "Unauthorized" }
            return;
        }
        await next();
     }
 }