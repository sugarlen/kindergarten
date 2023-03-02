<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { leaveMessage,getMessages, deleteMessage} from '../../api/api'

// get the result data from the api
const message = ref('')

const _leaveMessage = () => {
  //   if code is 200, then get the data
    leaveMessage({student_id:localStorage.getItem("userId")}).then((res) => {
        ElMessage({
            message: '留言成功！',
            type: 'success'
        })
    
    }).catch((err) => {
        console.log(err)
    })
}
</script>

<template>
  <!-- textarea中展示配置信息通过v-text渲染 -->
  <h3>欢迎留下您宝贵的意见</h3>
  <!-- 留言区域 -->
    <el-input type="textarea" :rows="20" v-model="message" style="margin-top: 1%; margin-bottom: 1%;" />
    <!-- 留言按钮 -->
    <el-button type="primary" @click="_leaveMessage">留言</el-button>

</template>

<style lang="less" scoped></style>
