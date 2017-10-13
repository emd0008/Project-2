import {row, rows, empty} from '../config/db';

export function all(): Promise<Array<models.IUser>>{
    return rows('GetUsers');
}

export function readByEmail(email: string): Promise<models.IUser> {
    return row('GetUserByEmail', [email]);
}

export function read(id:number): Promise<models.IUser> {
    return row('GetUser', [id]);
}

export function create(email: string, hash:string, firstname: string, lastname:string){
    return row('InsertUser', [email, hash, firstname, lastname]);
}