import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/board'
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'Home',
          // component: () => import('../views/home/index.vue'),
          meta: {
            name: '首页',
            icon: 'HomeFilled',
            permission: [1, 2, 3]
          },
          children: [
            {
              path: '/board',
              name: 'board',
              component: () => import('../views/home/index.vue'),
              meta: {
                name: '公告栏',
                permission: [1, 2, 3]
              }
            },
            {
              path: '/message',
              name: 'message',
              component: () => import('../views/home/message.vue'),
              meta: {
                name: '公告栏',
                permission: [1, 2, 3]
              }
            }
          ]
        },
        {
          path: '/classMg',
          name: 'classMg',
          meta: {
            name: '班级管理',
            icon: 'Comment',
            permission: [1, 2]
          },
          children: [
            {
              path: '/addClass',
              name: 'AddClass',
              component: () => import('../views/classMg/addClass.vue'),
              meta: {
                name: '新增班级',
                permission: [1, 2]
              }
            },
            {
              path: '/classList',
              name: 'ClassList',
              component: () => import('../views/classMg/classList.vue'),
              meta: {
                name: '班级列表',
                permission: [1, 2]
              }
            }
          ]
        },
        {
          path: '/stuMg',
          name: 'stuMg',
          meta: {
            name: '学生管理',
            icon: 'Management',
            permission: [1, 2]
          },
          children: [
            {
              path: '/addStu',
              name: 'AddStu',
              component: () => import('../views/studentMg/addStu.vue'),
              meta: {
                name: '新增学生',
                permission: [1, 2]
              }
            },
            {
              path: '/stuList',
              name: 'StuList',
              component: () => import('../views/studentMg/stuList.vue'),
              meta: {
                name: '学生列表',
                permission: [1, 2]
              }
            }
          ]
        },
        {
          path: '/userManage',
          name: 'userManage',
          meta: {
            name: '用户管理',
            icon: 'UserFilled',
            permission: [1]
          },
          children: [
            {
              path: '/addUser',
              name: 'AddUser',
              component: () => import('../views/userManage/addUser.vue'),
              meta: {
                name: '新增用户',
                permission: [1]
              }
            },
            {
              path: '/userList',
              name: 'UserList',
              component: () => import('../views/userManage/userList.vue'),
              meta: {
                name: '用户列表',
                permission: [1]
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
