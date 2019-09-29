import request from 'axios'
//请求用户创建的群组
export function getCreatedGroup(userId) {
  return request({
    url: '/manage/group/get_join_group',
    method: 'get',
    params: {
      userId
    }
  })
}
//请求用户的某个群组
export function getGroup(id) {
  return request({
    url: '/manage/group/' + id,
    method: 'get'
  })
}
//创建群组
export function createGroup(createUserId, name,userIds) {
  return request({
    url: "/manage/group/create",
    method: 'post',
    params: {
      createUserId,
      name,
      userIds
    }
  })
}
