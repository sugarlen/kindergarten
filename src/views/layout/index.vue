<script setup lang="ts">
import Head from './head.vue'
import Aside from './aside.vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="210px"><Aside /></el-aside>
      <el-container class="right-container">
        <el-header><Head /></el-header>
        <el-main>
          <!-- <transition name="el-fade-in"> -->
          <RouterView />
          <!-- </transition> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
::v-deep .el-header {
  padding: 15px;
  height: 70px;
  background: #fff;
  box-shadow: var(--el-box-shadow-lighter);
}
::v-deep .el-header ul {
  height: 70px;
}
::v-deep .el-main {
  margin: 15px;
  border-radius: 5px;
  background: #fff;
}
::v-deep .el-breadcrumb {
  line-height: 40px;
}
.right-container {
  background: #f2f3f5;
}
.common-layout,
.el-container {
  height: 100%;
}
</style>
