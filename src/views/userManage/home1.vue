<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getBoardHtml, getBoardConfig, updateBoardHtml } from '../../api/api'

// get the result data from the api
const boardHtml = ref('')
const boardConfig = ref('')
const boardHref = ref('')
const getBoardHtmlData = () => {
  //   if code is 200, then get the data
  getBoardHtml().then((res) => {
    boardHtml.value = res.data.html
    console.log("我是公告板的html")
    console.log(res.data.href)
    boardHref.value = res.data.href

  }).catch((err) => {
    console.log(err)
  })
}
getBoardHtmlData()
// 获取公告板配置信息
 const _getBoardConfig = () => {
  getBoardConfig().then((res: { data: string; }) => {
    boardConfig.value = res.data
  }).catch((err: any) => {
    console.log(err)
  })
}
_getBoardConfig()

// 更新公告板配置信息
const _updateBoardHtml = () => {
  updateBoardHtml({board_config:boardConfig.value}).then((res: any) => {
  // 展示成功提示
  ElMessage({
    message: '配置保存成功！',
    type: 'success'
  })
}).catch((err: any) => {
  console.log(err)
})
}
</script>

<template>
  <!-- textarea中展示配置信息通过v-text渲染 -->
  <h3>编辑公告板内容</h3>
  <el-input type="textarea" :rows="20" v-model="boardConfig" style="margin-top: 1%; margin-bottom: 1%;" />

  <!-- 按钮点击触发函数getBoardHtmlData后跳转到外部连接localhost:8000/board -->
  <a :href="boardHref" target="_blank">
    <el-button type="primary" @click="getBoardHtmlData">预览</el-button>
  </a>
  <!-- 保存配置按钮 -->
  <el-button type="warning" @click="_updateBoardHtml">保存配置</el-button>
</template>

<style lang="less" scoped></style>
