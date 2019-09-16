import request from 'axios'
//登录
export function loginObj(username,password){
    var Info = new FormData();
    Info.append('username',username);
    Info.append('password',password);
    return request({
        url:'/login',
        method:'post',
        data:Info
    })
}
//请求用户信息
export function getUserInformation(userId){
    return request({
        url:'/manage/user/get_user_information',
        method:'get',
        params:{userId}
    })
}