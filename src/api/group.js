import request from 'axios'
//请求用户创建的群组
export function getCreatedGroup(userId) {
    return request({
        url: '/manage/group/creator',
        method: 'get',
        params: { userId }
    })
}
//请求用户创建的群组
export function getJoinedGroup(userId) {
    return request({
        url: '/manage/group/get_join_group',
        method: 'get',
        params: { userId }
    })
}
//请求用户的某个群组
export function getGroup(id) {
    return request({
        url: '/manage/group/' + id,
        method: 'get'
    })
}
//去除人员
export function removeMember(userIds, groupId) {
    return request({
        url: '/manage/group/remove_member',
        method: 'get',
        params: { userIds, groupId }
    })
}

//添加成员
export function addMember(groupId, userIds) {
    return request({
        url: '/manage/group/add_member',
        method: 'post',
        params: { groupId, userIds }
    })
}

//创建一个群组
export function createGroup(createUserId, name, userIds) {
    return request({
        url: '/manage/group/create',
        method: 'post',
        params: { createUserId, name, userIds }
    })
}
//退出群组
export function quietGroup(userId, groupId) {
    return request({
        url: '/manage/group/quit',
        method: 'get',
        params: { userId, groupId }
    })
}