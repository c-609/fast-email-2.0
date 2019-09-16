import request from 'axios'
//请求用户创建的群组
export function getCreatedGroup(userId){
    return request({
        url:'/manage/group/get_join_group',
        method:'get',
        params:{userId}
    })
}
//请求用户的某个群组
export function getGroup(id){
    return request({
        url:'/manage/group/'+id,
        method:'get'
    })
}