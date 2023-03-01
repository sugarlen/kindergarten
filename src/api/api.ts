import type { AxiosPromise } from 'axios'
import request from './request'

// 用户管理
// 用户登录
export const login = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/login/',
    method: 'post',
    data: params
  })
}
// 用户注册
export const register = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/register/',
    method: 'post',
    data: params
  })
}
// 用户更新
export const updateUser = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/update_user/',
    method: 'post',
    data: params
  })
}
// 删除用户
export const deleteUser = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/delete_user/',
    method: 'post',
    data: params
  })
}
// 用户查询
export const searchUser = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/search_user_info/',
    method: 'post',
    data: params
  })
}

// 班级管理
// 新增班级
export const addClass = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/add_class/',
    method: 'post',
    data: params
  })
}
// 修改班级信息
export const updateClass = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/update_class/',
    method: 'post',
    data: params
  })
}
// 查询班级信息
export const searchClass = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/search_class_info/',
    method: 'post',
    data: params
  })
}
// 删除班级
export const deleteClass = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/delete_class/',
    method: 'post',
    data: params
  })
}

// 导入学生信息
export const uploadStudents = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/upload_students_info/',
    method: 'post',
    data: params
  })
}

// 学生管理
