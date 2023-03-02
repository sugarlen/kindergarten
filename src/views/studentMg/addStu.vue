<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getHistory, makeScore } from '../../api/api'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { register, updateUser } from '../../api/api'

const route = useRoute()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  teacher_id: Number(localStorage.getItem('userId')) || '',
  student_id: route.query.student_id || '',
  date: '',
  eat_score: 0,
  etiquette_score: 0,
  sleep_score: 0,
  social_score: 0,
  sport_score: 0,
  study_score: 0,
  temperature: 0,
  teacher_comment: ''
})
let editData = reactive({})

const rules = reactive<FormRules>({
  date: [
    {
      required: true,
      message: '请选择日期',
      trigger: 'change'
    }
  ],
  eat_score: [
    {
      required: true,
      message: '请输入吃饭分数',
      trigger: 'change'
    }
  ],
  etiquette_score: [
    {
      required: true,
      message: '请输入礼仪分数',
      trigger: 'change'
    }
  ],
  sleep_score: [
    {
      required: true,
      message: '请选择睡觉分数',
      trigger: 'change'
    }
  ],
  social_score: [
    {
      required: true,
      message: '请选择社交分数',
      trigger: 'change'
    }
  ],
  sport_score: [
    {
      required: true,
      message: '请选择运动分数',
      trigger: 'change'
    }
  ],
  study_score: [
    {
      required: true,
      message: '请选择学习分数',
      trigger: 'change'
    }
  ],
  temperature: [
    {
      required: true,
      message: '请选择体温值',
      trigger: 'change'
    }
  ],
  teacher_comment: [
    {
      required: true,
      message: '请选输入老师评语',
      trigger: 'change'
    }
  ]
})

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const dialogVisible = ref(false)
const addDialogVisible = ref(false)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      try {
        let params = { ...ruleForm }
        makeScore(params).then((res) => {
          if (res.code == 200) {
            ElMessage({
              message: '新增成功！',
              type: 'success'
            })
            ruleFormRef.value.resetFields()
            addDialogVisible.value = false
            getHistoryData()
          } else {
            ElMessage.error(res.msg)
          }
        })
      } catch (err) {}
    } else {
      console.log('error submit!', fields)
    }
  })
}

const submitUpload = () => {
  upload.value!.submit()
  upload.value!.clearFiles()
  dialogVisible.value = false
}

const formInline = reactive({
  username: '',
  class_no: null
})
const upData = ref({ table: 'table', teacher_id: localStorage.getItem('userId') })

const date = ref('')

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

const getHistoryData = () => {
  try {
    let params = {
      student_id: route.query.student_id,
      start_date: date.value[0],
      end_date: date.value[1]
    }
    console.log(date, params)
    getHistory(params).then((res) => {
      const { data: Data } = res
      tableData.value = Data
    })
  } catch (err) {}
}
getHistoryData()

const handleEdit = (index: number, row: User) => {
  addDialogVisible.value = true
  editData = row
  console.log(index, row, editData)
  ruleForm.date = editData.date ?? ''
  ruleForm.eat_score = editData.eat_score ?? 0
  ruleForm.etiquette_score = editData.etiquette_score ?? 0
  ruleForm.sleep_score = editData.sleep_score ?? 0
  ruleForm.social_score = editData.social_score ?? 0
  ruleForm.sport_score = editData.sport_score ?? 0
  ruleForm.study_score = editData.study_score ?? 0
  ruleForm.temperature = editData.temperature ?? 0
  ruleForm.teacher_comment = editData.teacher_comment ?? ''
}

const addDaily = () => {
  addDialogVisible.value = true
  ruleFormRef.value.resetFields()
}

const onSubmit = () => {
  console.log('submit!')
}
</script>
<template>
  <div>
    <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
      size="default"
    />
    <el-button type="primary" @click="getHistoryData()">查询</el-button>
    <el-button type="primary" @click="addDaily()">新增</el-button>
    <el-button @click="dialogVisible = true"> 上传学生评分信息 </el-button>

    <el-table :data="tableData" stripe style="width: 100%" size="large">
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="eat_score" label="吃饭" />
      <el-table-column prop="etiquette_score" label="礼仪" />
      <el-table-column prop="sleep_score" label="睡觉" />
      <el-table-column prop="social_score" label="社交" />
      <el-table-column prop="sport_score" label="运动" />
      <el-table-column prop="study_score" label="学习" />
      <el-table-column prop="temperature" label="体温" />
      <el-table-column prop="teacher_comment" label="老师评语" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="addDialogVisible" title="新增" width="50%">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
        label-position="left"
      >
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请选择日期"
            size="default"
          />
        </el-form-item>
        <el-form-item label="吃饭" prop="eat_score">
          <el-input v-model.number="ruleForm.eat_score" placeholder="请输入吃饭" />
        </el-form-item>
        <el-form-item label="礼仪" prop="etiquette_score">
          <el-input v-model.number="ruleForm.etiquette_score" placeholder="请输入礼仪" />
        </el-form-item>
        <el-form-item label="睡觉" prop="sleep_score">
          <el-input v-model.number="ruleForm.sleep_score" placeholder="请输入睡觉" />
        </el-form-item>
        <el-form-item label="社交" prop="social_score">
          <el-input v-model.number="ruleForm.social_score" placeholder="请输入社交" />
        </el-form-item>
        <el-form-item label="运动" prop="sport_score">
          <el-input v-model.number="ruleForm.sport_score" placeholder="请输入运动" />
        </el-form-item>
        <el-form-item label="学习" prop="study_score">
          <el-input v-model.number="ruleForm.study_score" placeholder="请输入学习" />
        </el-form-item>
        <el-form-item label="体温" prop="temperature">
          <el-input v-model.number="ruleForm.temperature" placeholder="请输入体温" />
        </el-form-item>
        <el-form-item label="老师评语" prop="teacher_comment">
          <el-input
            :rows="3"
            type="textarea"
            v-model="ruleForm.teacher_comment"
            placeholder="请输入老师评语"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确定 </el-button>
        </span>
      </template>
    </el-dialog>
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
          <el-button type="primary" @click="submitUpload">确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
