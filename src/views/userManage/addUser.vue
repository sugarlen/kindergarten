<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { register, updateUser } from '../../api/api'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: route.query.username ?? '',
  password: '',
  role: route.query.role ?? null
})

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ],
  role: [
    {
      required: true,
      message: '请选择用户角色',
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
        if (route.query.username) {
          updateUser(params).then((res) => {
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
          register(params).then((res) => {
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
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="ruleForm.role" placeholder="请选择用户角色">
        <el-option label="系统管理员" value="1" />
        <el-option label="教师" value="2" />
        <el-option label="家长" value="3" />
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
