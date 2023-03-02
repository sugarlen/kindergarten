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

//公告版
export const getBoardHtml = (): AxiosPromise => {
  return request({
    url: '/api/v1/get_board_html/',
    method: 'get'
  })
}

export const updateBoardHtml = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/update_board_config/',
    method: 'post',
    data: params
  })
}
// 查看历史评分数据
export const getHistory = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/search_student_history/',
    method: 'post',
    data: params
  })
}

export const getBoardConfig = (): AxiosPromise => {
  return request({
    url: '/api/v1/get_board_config/',
    method: 'get'
  })
}

// 老师给学生评分
export const makeScore = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/report_student/',
    method: 'post',
    data: params
  })
}

export const getBoard = (): AxiosPromise => {
  return request({
    url: '/board/',
    method: 'get'
  })
}

// 留言板
//新增留言
export const leaveMessage = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/leave_message/',
    method: 'post',
    data: params
  })
}

// 统计学生近n天的情况
export const getRecentDays = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/get_recent_days/',
    method: 'post',
    data: params
  })
}

//获取留言
export const getMessages = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/get_leave_messages/',
    method: 'post',
    data: params
  })
}
//删除留言
export const deleteMessage = (params: any): AxiosPromise => {
  return request({
    url: '/api/v1/delete_leave_message/',
    method: 'post',
    data: params
  })
}

