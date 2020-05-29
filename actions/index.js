export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_HEAD = 'UPDATE_HEAD';
export const SOCKET_ON = 'SOCKET_ON';
export const SET_TEXT = 'SET_TEXT';
export const ADD_ORDER = 'ADD_ORDER';
export const UPDATE_SIDE = 'UPDATE_SIDE';
import Axios from "axios";

export function logout(){
    return {
        type: LOGOUT,
    };
}

export function login(mem_userid,mem_id){
    return {
        type: LOGIN,
        mem_userid:mem_userid,
        mem_id :mem_id
    };
}


export function update_side(){
    return {
        type: UPDATE_SIDE,
    };
}

export function add_order(mem_userid){
    const count = 0;
    const urls = "http://softer005.cafe24.com/app/app_order/add_order/"+mem_userid;
    Axios.post(urls).then(res=>{
        count = res.data;
    });
    return {
        type: ADD_ORDER,
        count:count
    };
}

