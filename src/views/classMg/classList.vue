<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { searchClass, deleteClass, searchUser } from '../../api/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const teacherList = ref({})

const formInline = reactive({
  class_no: '',
  class_name: '',
  teacher_id: null
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

const getTeacher = async () => {
  await searchUser({ role: 2 }).then((res) => {
    const { data: Data } = res
    Data.forEach((el) => {
      teacherList.value[el.user_id + ''] = el.username
    })
    console.log(teacherList.value)
  })
}
getTeacher()

const getUser = () => {
  try {
    let params = { ...formInline }
    searchClass(params).then((res) => {
      const { data: Data } = res
      tableData.value = Data
    })
  } catch (err) {}
}
getUser()

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
  router.push({
    path: '/addClass',
    query: { class_no: row.class_no, class_name: row.class_name, teacher_id: row.teacher_id }
  })
}
const handleDelete = (index: number, row: User) => {
  deleteClass({ class_no: (<any>row).class_no }).then((res) => {
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
      <el-form-item label="班级编号">
        <el-input v-model="formInline.class_no" placeholder="请输入班级编号" size="large" />
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="formInline.class_name" placeholder="请输入班级" size="large" />
      </el-form-item>
      <el-form-item label="带班老师">
        <el-input v-model="formInline.teacher_id" placeholder="请输入带班老师" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUser()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" size="large">
      <el-table-column prop="class_no" label="班级编号" />
      <el-table-column prop="class_name" label="班级" />
      <el-table-column prop="teacher_id" label="带班老师">
        <template #default="scope">{{ teacherList[scope.row.teacher_id] }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped></style>
