<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getMessages, deleteMessage } from '../../api/api'

// get the result data from the api
const tableData = ref()
const page = ref(1)
const pageSize = ref(10)

const formInline = reactive({
    student_id: null,
    message: '',
    update_time: null,
    email: null,
    phone: null
})
const _getMessages = () => {
    //   if code is 200, then get the data
    let params = {
        page: page.value,
        pageSize: pageSize.value
    }
    getMessages(params).then((res) => {
        const { data: Data } = res
        tableData.value = Data
        ElMessage({
            message: '查询成功！',
            type: 'success'
        })

    }).catch((err) => {
        console.log(err)
    })
}
_getMessages()
const handleDelete = (index: number, row: any) => {
    deleteMessage({ message_id: row.message_id }).then((res) => {
        ElMessage({
            message: '删除成功！',
            type: 'success'
        })
        _getMessages()
    })
}
</script>

<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%" size="large">
            <el-table-column prop="student_id" label="用户id" width="180"></el-table-column>
            <el-table-column prop="message" label="留言内容" width="180"></el-table-column>
            <el-table-column prop="update_time" label="留言时间" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="phone" label="电话" width="180"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang="less" scoped></style>
