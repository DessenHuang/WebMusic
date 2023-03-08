<template>
    <Header></Header>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>
<script setup>
import Header from '/src/components/Header/index.vue'


</script>
<style lang="less" scoped>
</style>