const sym='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';

export const random=max=>Math.floor(Math.random() * max);

export const generateRandom=(len,code='')=>{
    while(code.length<len) code+=sym[Math.floor(Math.random() * sym.length)];
    return code;
}