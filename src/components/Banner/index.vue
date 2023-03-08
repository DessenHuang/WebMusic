<template>
    <div class="banner">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script setup>
import { getBannerAPI } from '/src/api/index.js';
import { onMounted, reactive } from 'vue'

const state = reactive({
    images: []
})

 // 获取banner数据
const initImages = async () => {
    const res = await getBannerAPI()
    state.images = res.data.banners
}

onMounted(() => {
   initImages()
})
</script>
<style lang="less" scoped>
.banner {
    padding: .1875rem 0;

    .van-swipe {
        width: 100%;
        height: 4.25rem;

        .van-swipe-item {
            img {
                display: block;
                margin: auto;
                width: 95%;
                height: 100%;
                border-radius: .3125rem;
            }
        }
    }
}
</style>