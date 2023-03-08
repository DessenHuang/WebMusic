<template>
    <van-cell center :title="name" :label="arts" @click="sendSearch(index)"></van-cell>
</template>
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    index: Number,
    name: String,
    arts: String
})

const { index, name, arts } = toRefs(props)

// 子传父emit事件
const emit = defineEmits(['update-music'])
//传递索引值到父组件
const sendSearch = (index) => {
    emit('update-music', index)
}


</script>
<style lang="less" scoped>
</style>