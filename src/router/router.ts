import router from './index'
// 检查用户是否已登录
const isAuthenticated = localStorage.getItem('userId') || ''
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
