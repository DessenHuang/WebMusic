<template>
    <router-view></router-view>
    <FooterMusic v-if="store.isFooterShow"></FooterMusic>

</template>
<script setup>
import FooterMusic from '/src/views/FooterMusic/index.vue'
import { Store } from './store'
const store = Store()

</script>
<style lang="less">
* {
    padding: 0;
    margin: 0;
}

a {
    color: #333;
}
</style>