<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { searchUser, deleteUser } from '../../api/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const dialogVisible = ref(false)

const submitUpload = () => {
  upload.value!.submit()
  upload.value!.clearFiles()
  dialogVisible.value = false
}

const router = useRouter()

const formInline = reactive({
  username: '',
  role: null
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
const upData = ref({ table: 'user', teacher_id: localStorage.getItem('userId') })

const getUser = () => {
  try {
    let params = { ...formInline }
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
  router.push({ path: '/addUser', query: { username: row.username, role: row.role } })
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
      <el-form-item label="用户角色">
        <el-select v-model="formInline.role" placeholder="请选择用户角色" size="large">
          <el-option label="系统管理员" :value="1" />
          <el-option label="教师" :value="2" />
          <el-option label="家长" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUser()">查询</el-button
        ><el-button @click="dialogVisible = true"> 上传学生信息 </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" size="large">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="用户角色">
        <template #default="scope">{{ roleType[scope.row.role] }}</template>
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
    <el-dialog v-model="dialogVisible" title="上传" width="30%">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="http://127.0.0.1:4000/api/v1/upload_students_info/"
        method="post"
        :data="upData"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUpload"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
