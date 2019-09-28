import request from 'axios'
import {
  get
} from 'https';

//请求顶级部门
export function getOrg(roleId, deptId) {
  return request({
    // url: '/manage/dept/tree/root',
    url: " /manage/dept/get_user_top_organization",
    methods: 'get',
    params: {
      roleId,
      deptId
    }
  })
}

//请求子部门
export function getChildOrg(id) {
  return request({
    url: '/manage/dept/child/'+id,
     
    methods: 'get',

  })
}

//请求用户列表，通过部门信息
export function getOrgUsers(deptIds) {
  return request({
    // url: "/manage/user/dept",
    // url:'/manage/user/dept_under',
    url: '/manage/user/dept_under/',
    params: {
      deptIds
    },
    methods: 'get'
  })
}

//获取群组，通过创建者id
export function getGroup(userId) {
  return request({
    url: '/manage/group/creator?userId=2',
    methods: 'get',
    params: {
      userId
    }
  })
}

//查看某个群组
export function getGroupUsers(groupId) {
  return request({
      url: " /manage/group/" + groupId,
      methods: 'get'
    }
  )
}
