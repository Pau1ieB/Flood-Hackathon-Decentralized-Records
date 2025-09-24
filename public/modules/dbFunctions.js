import { post } from './utils/rest.js';

export const fetchQRCode = async data=>{
    const response = await post('/api/qrcode/create',data);
    return response;
}

export const changeFamilyQRCode = async data=>{
    const response = await post('/api/qrcode/updateFamily',data);
    return response;
}