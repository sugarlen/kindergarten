<script setup lang="ts">
import { ref } from 'vue'
import { getBoardHtml} from '../../api/api'

// get the result data from the api
const boardHtml = ref('')
const boardConfig = ref('')
const boardHref = ref('')
const getBoardHtmlData = () => {
  //   if code is 200, then get the data
  getBoardHtml().then((res) => {
    boardHtml.value = res.data.html
    boardHref.value = res.data.href
  }).catch((err) => {
    console.log(err)
  })
}
getBoardHtmlData()

</script>

<template>
  <!-- 按钮点击触发函数getBoardHtmlData后跳转到外部连接localhost:8000/board -->
  <a :href="boardHref" target="_blank">
    <el-button type="primary" @click="getBoardHtmlData">查看公告栏</el-button>
  </a>
</template>

<style lang="less" scoped></style>
