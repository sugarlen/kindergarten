<script setup lang="ts">
import {ref } from 'vue'
import {getBoardHtml} from '../../api/api'

// get the result data from the api
const boardHtml = ref('')
const getBoardHtmlData = () => {
//   if code is 200, then get the data
  getBoardHtml().then((res) => {
    const { data: Data } = res
    console.log("boardHtml")
    console.log(Data)
    boardHtml.value = Data
  }).catch((err) => {
    console.log(err)
  })
}
//页面加载时请求接口
getBoardHtmlData()
</script>

<template>
    <div class="home">
        <div class="home__board" v-html="boardHtml"></div>
    </div>
</template>

<style lang="less" scoped></style>
