import {row, rows, empty} from '../config/db';

export function all(){
    return rows('GetPosts');
}

export function read(id: number){
    return row('GetPost', [id]);
}

export function update(id: number, content: string){
    return empty('UpdatePost', [id, content]);
}

export function del(id: number){
    return empty('DeletePost', [id]);
}

export function insert(title: string, userid: number, categoryid: number, content: string){
    return row('InsertPost', [title, userid, categoryid, content]);
}