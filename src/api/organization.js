import request from 'axios'
import { get } from 'https';

//请求顶级部门
export function getOrg(){
  return request({
    url: '/manage/dept/tree/root',
    methods: 'get',

  })
}

//请求子部门
export function getChildOrg(id){
  return request({
    url: '/manage/dept/child/'+id,
    methods:'get',
    
  })
}

//请求用户列表，通过部门信息
export function getOrgUsers(deptId){
  return request({
    url:"/manage/user/dept",
    params:{
      deptId
    },
    methods: 'get'
  })
}