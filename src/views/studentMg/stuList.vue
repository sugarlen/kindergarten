<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { searchUser, deleteUser, searchClass } from '../../api/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const formInline = reactive({
  username: '',
  class_no: null
})

interface User {
  user: string
  pass: string
  role: number
}
enum roleType {
  '系统管理员' = 1,
  '教师' = 2,
  '家长' = 3
}

const tableData = ref()
const classList = ref({})
const allClass = ref([])

const getClass = async () => {
  await searchClass({}).then((res) => {
    const { data: Data } = res
    tableData.value = Data
    Data.forEach((el) => {
      classList.value[el.class_no] = el.class_name
      allClass.value.push({ label: el.class_name, value: el.class_no })
    })
    console.log(Data, classList.value, allClass.value)
  })
}
getClass()
const getUser = () => {
  try {
    let params = { ...formInline, role: 3 }
    searchUser(params).then((res) => {
      console.log(res)
      // if (res.code == 200) {
      const { data: Data } = res
      tableData.value = Data
      // }
    })
  } catch (err) {}
}
getUser()

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
  router.push({ path: '/addStu', query: { username: row.username, student_id: row.user_id } })
}
const handleDelete = (index: number, row: User) => {
  deleteUser({ user_id: (<any>row).user_id }).then((res) => {
    ElMessage({
      message: '删除成功！',
      type: 'success'
    })
    getUser()
  })
}

const onSubmit = () => {
  console.log('submit!')
}
</script>
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.username" placeholder="请输入用户名" size="large" />
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="formInline.class_no" placeholder="请选择班级" size="large">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in allClass"
            :key="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUser()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%" size="large">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="class_no" label="班级号">
        <template #default="scope">{{ classList[scope.row.class_no] }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >查看每日状态</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped></style>
