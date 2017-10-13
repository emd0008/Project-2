import {row, rows, empty} from '../config/db';

export function all(): Promise<Array<models.IPost>>{
    return rows('GetPosts');
}

export function read(id: number): Promise<models.IPost>{
    return row('GetPost', [id]);
}

export function update(id: number, title: string, content: string, categoryid: number){
    return empty('UpdatePost', [id, title, content, categoryid]);
}

export function del(id: number){
    return empty('DeletePost', [id]);
}

export function insert(title: string, userid: number, categoryid: number, content: string): Promise<models.ICreateResponse>{
    return row('InsertPost', [title, userid, categoryid, content]);
}