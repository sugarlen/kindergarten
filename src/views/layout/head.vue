<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const Route = useRoute()
const router = useRouter()
const currentRoute = ref([])

const username = localStorage.getItem('username')

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

watch(
  () => Route.matched,
  (newVal) => {
    const routeList: any = newVal
    routeList.shift()
    currentRoute.value = routeList
  },
  {
    immediate: true
  }
)

const activeIndex2 = ref('1')
const logout = () => {
  localStorage.clear()
  router.push({ path: '/login' })
}
</script>
<template>
  <div class="head">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in currentRoute" :key="index">{{
        item.meta.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <span class="avatar"
      ><el-avatar :size="34" :src="circleUrl" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button text @click="logout">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown></span
    >
  </div>
</template>
<style lang="less" scoped>
.el-menu-demo {
  justify-content: center;
}
.head {
  display: flex;
  justify-content: space-between;
  .avatar {
    display: flex;
    align-items: center;
    margin-right: 15px;
    .el-dropdown-link {
      cursor: pointer;
      //   color: var(--el-color-primary);
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }
}
</style>
