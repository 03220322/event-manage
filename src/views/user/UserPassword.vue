<template>
  <div class="password-modify-container">
    
    <el-form
      :model="pwdForm"
      :rules="pwdRules"
      ref="pwdFormRef"
      label-width="100px"
      class="pwd-form"
    >
      
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          v-model="pwdForm.old_pwd"
          type="password"
          placeholder="请输入原密码"
        />
      </el-form-item>

      
      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          v-model="pwdForm.new_pwd"
          type="password"
          placeholder="请输入新密码"
        />
      </el-form-item>

      
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input
          v-model="pwdForm.re_pwd"
          type="password"
          placeholder="请确认新密码"
        />
      </el-form-item>

      
      <el-form-item class="btn-group">
        <el-button type="primary" @click="handleModify">修改密码</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { userUpdatePassService } from '@/api/user'
import { useUserstore } from '@/stores'
import { useRouter } from 'vue-router'

const userStore = useUserstore()


const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 表单引用
const pwdFormRef = ref()

// 自定义校验规则：原密码与新密码不能相同
const validateOldPwd = (rule, value, callback) => {
  if (value && pwdForm.value.new_pwd && value === pwdForm.value.new_pwd) {
    callback(new Error('原密码不能与新密码相同'))
  } else {
    callback()
  }
}

// 自定义校验规则：新密码与确认密码必须相同
const validateRePwd = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('确认密码与新密码不一致'))
  } else {
    callback()
  }
}

// 表单校验规则
const pwdRules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须为6-15位', trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' } 
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须为6-15位', trigger: 'blur' },
    { validator: validateOldPwd, trigger: 'blur' } 
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须为6-15位', trigger: 'blur' },
    { validator: validateRePwd, trigger: 'blur' }
  ]
}

const router = useRouter()

const handleModify = async () => {
  if (!pwdFormRef.value) return
  
  pwdFormRef.value.validate(async (valid) => {
    if (valid) {
      
      await userUpdatePassService(pwdForm.value)
      ElMessage({ type: 'success', message: '更换密码成功' })
      userStore.setToken('')
      userStore.setUser({})
      router.push('/login')
    } else {
      ElMessage.error('表单校验失败，请检查输入内容')
      return false
    }
  })
}


const handleReset = () => {
  if (!pwdFormRef.value) return
  
  pwdFormRef.value.resetFields()
}
</script>

<style scoped>
.password-modify-container {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.pwd-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.btn-group {
  margin-top: 10px;
}
</style>
