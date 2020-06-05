import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
export default {
     async bcrpyt (stringToHash: string) {
     const hash =  await bcrypt.hash(stringToHash);     
     console.log(hash);
     return hash;
    },
    async verify(hashToString:string, text:string) {
        const pwd =  await bcrypt.compare(text, hashToString);
        return pwd;
    }
}