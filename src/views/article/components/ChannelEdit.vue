<script setup>
import { ref } from 'vue'
import { artAddChannelsService, artEditChannelsService } from '@/api/article'
const dialogVisible = ref(false)
const form = ref()
const emit = defineEmits(['success'])

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
// 向外暴露一个方法，根据是否传递row参数判断当前是编辑还是添加
const open = (row) => {
  dialogVisible.value = true
  console.log(row)
  //   这里为什么要用展开运算符号
  // 浅拷贝可以创建一个副本
  // 即使点击"取消"，原始数据也不会受影响
  formModel.value = { ...row }
}

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}


const submitForm = async () => {
  const id = formModel.value.id

  form.value.validate() 
  
  id
    ? await artEditChannelsService(formModel.value)
    : await artAddChannelsService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false

  
  emit('success')
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑表单' : '添加表单'"
    width="30%"
  >
    <el-form ref="form" :model="formModel" :rules="rules">
      <el-form-item prop="cate_name" label="分类名称" placeholder="请输入名称">
        <el-input v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item prop="cate_alias" label="分类别名" placeholder="请输入别名">
        <el-input v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
