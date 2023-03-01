<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { login } from '../api/api'

const router = useRouter()

const role = ref(1)
const ruleFormRef = ref<FormInstance>()

const validateRequired = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入正确的账号或密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  userName: '',
  passWord: ''
})

const rules = reactive({
  passWord: [{ validator: validateRequired, trigger: 'blur' }],
  userName: [{ validator: validateRequired, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      let params = {
        username: ruleForm.userName,
        password: ruleForm.passWord,
        role: role.value
      }
      try {
        login(params).then((res) => {
          const {
            data: { user_id: userId }
          } = res
          console.log('submit!', userId)
          localStorage.setItem('userId', userId)
          localStorage.setItem('username', ruleForm.userName)
          localStorage.setItem('role', role.value.toString())
          router.push({ path: '/home' })
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<template>
  <div class="page-container">
    <div></div>
    <div>
      <span class="login-title">幼儿园儿童管理系统</span>
      <div class="login-box">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="" prop="userName">
            <el-input
              v-model="ruleForm.userName"
              type="text"
              autocomplete="off"
              size="large"
              placeholder="请输入账号"
            >
              <template #prepend>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="passWord">
            <el-input
              v-model="ruleForm.passWord"
              type="password"
              autocomplete="off"
              size="large"
              placeholder="请输入密码"
            >
              <template #prepend>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-radio-group v-model="role" size="large">
          <el-radio :label="1">管理员</el-radio>
          <el-radio :label="2">教师</el-radio>
          <el-radio :label="3">家长</el-radio>
        </el-radio-group>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
          style="width: 100%; font-size: 16px"
          >登&nbsp;&nbsp;录</el-button
        >
      </div>
    </div>
    <div></div>
  </div>
</template>
<style lang="less" scoped>
::v-deep .el-form-item__content .el-input-group {
  height: 44px;
}
::v-deep .el-form-item {
  margin-bottom: 24px;
}
::v-deep .el-radio-group {
  margin-bottom: 20px;
}
::v-deep .el-button--primary {
  height: 42px;
}
.page-container {
  height: 100%;
  background: url('../assets/images/background.jpg') no-repeat left 10%;
  background-size: cover;
  & > div {
    height: 90px;
    &:nth-child(2) {
      height: calc(100% - 180px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .login-box {
        width: 420px;
        height: 320px;
        padding: 40px 30px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 8px;
        box-shadow: var(--el-box-shadow);
      }
      .login-title {
        color: #fff;
        font-size: 34px;
        font-weight: bold;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
