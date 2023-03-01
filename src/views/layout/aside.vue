<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const Router = useRouter()
const Route = useRoute()
const routerList = Router.options.routes[1]?.children
console.log('router', Route.matched, routerList)

const role = Number(localStorage.getItem('role'))

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, Route.matched)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="home"
    text-color="#fff"
    :unique-opened="true"
    router
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="system-title">幼儿园管理系统</div>
    <template v-for="(route, index) in routerList" :key="index">
      <el-menu-item
        :index="route.path"
        v-if="!route.children && route.meta.permission.includes(role)"
      >
        <el-icon><component :is="route.meta.icon" /></el-icon>
        <span>{{ route.meta.name }}</span>
      </el-menu-item>
      <el-sub-menu :index="route.path" v-else-if="route.meta.permission.includes(role)">
        <template #title>
          <el-icon><component :is="route.meta.icon" /> </el-icon>
          <span>{{ route.meta.name }}</span>
        </template>
        <template v-for="(subRoute, index) in route.children" :key="index">
          <el-menu-item :index="subRoute.path">{{ subRoute.meta.name }}</el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<style lang="less" scoped>
::v-deep .el-menu li {
  margin-left: 10px;
}
.el-menu-vertical-demo {
  height: 100%;
  width: 210px;
  border: none;
}
.system-title {
  padding: 15px;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
</style>
