import {ReturnResp } from '../model/code-response';
import {prisma} from '../../../lib/prisma';

export function responseDataDetail(datas: string[]): ReturnResp {
    const resp = {
        status: 'Success',
        response_code: 'Success',
        data: datas
    };
    return resp;
}

function responseError(datas: string[]): ReturnResp {
    const resp = {
        status: 'Error',
        response_code: 'Error',
        data: datas
    };
    return resp;
}

export const connectDatabase = async () => {
    try{
        await prisma.$connect();
    } catch (error){
        console.log(error)
        throw new Error("Unable to connect")
    }
} 