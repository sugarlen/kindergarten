<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { addClass, updateClass, searchUser } from '../../api/api'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()

const allTeacher = ref([])
const getTeachers = async () => {
  await searchUser({ role: 2 }).then((res) => {
    const { data: Data } = res
    Data.forEach((el) => {
      allTeacher.value.push({ label: el.username, value: el.user_id })
    })
  })
}
getTeachers()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  class_no: route.query.class_no ?? '',
  class_name: route.query.class_name ?? '',
  teacher_id: Number(route.query.teacher_id) || null
})

const rules = reactive<FormRules>({
  class_no: [
    {
      required: true,
      message: '请输入板机编码',
      trigger: 'change'
    }
  ],
  class_name: [
    {
      required: true,
      message: '请输入班级名称',
      trigger: 'change'
    }
  ],
  teacher_id: [
    {
      required: true,
      message: '请选择班级老师',
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      try {
        let params = { ...ruleForm }
        if (route.query.class_no) {
          updateClass(params).then((res) => {
            if (res.code == 200) {
              ElMessage({
                message: '新增成功！',
                type: 'success'
              })
              ruleFormRef.value.resetFields()
            } else {
              ElMessage.error(res.msg)
            }
          })
        } else {
          addClass(params).then((res) => {
            if (res.code == 200) {
              ElMessage({
                message: '新增成功！',
                type: 'success'
              })
              ruleFormRef.value.resetFields()
            } else {
              ElMessage.error(res.msg)
            }
          })
        }
      } catch (err) {}
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
    label-position="top"
  >
    <el-form-item label="班级编号" prop="class_no">
      <el-input v-model="ruleForm.class_no" placeholder="请输入班级编号" />
    </el-form-item>
    <el-form-item label="班级名称" prop="class_name">
      <el-input v-model="ruleForm.class_name" placeholder="请输入班级名称" />
    </el-form-item>
    <el-form-item label="班级老师" prop="teacher_id">
      <el-select v-model="ruleForm.teacher_id" placeholder="请选择班级老师" size="large">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in allTeacher"
          :key="index"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> 创建 </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.demo-ruleForm {
  width: 50%;
}
</style>
