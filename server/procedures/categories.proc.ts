import {rows} from '../config/db';

export function all(){
    return rows('GetCategories');
}