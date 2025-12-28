<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

const channelList = ref([])
const model = defineModel()
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data
  console.log(res)
}
getChannelList()
</script>

<template>
  <el-select v-model="model" style="min-width: 100px">
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
