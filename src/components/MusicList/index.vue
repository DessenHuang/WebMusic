<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" :show-indicators="false">

                <van-swipe-item v-for="item in state.musicList" :key="item.id">
                    <router-link :to="{ path: '/itemmusic', query: { id: item.id } }">
                        <img :src="item.picUrl" alt="">
                        <span class="playCount">
                            <van-icon name="play" size="0.1875rem" color="#ffffffcc" />
                            {{ countFormat(item.playCount) }}
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>

            </van-swipe>
        </div>
    </div>
</template>
<script setup>
import { getMusicListAPI } from '/src/api/MusicList.js'
import { onMounted, reactive } from 'vue'

const state = reactive({
    musicList: []
})

// 获取推荐歌单数据
const initMusicList = async () => {
    const res = await getMusicListAPI()
    state.musicList = res.data.result
}

// 格式化歌单播放量的数值
const countFormat = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + '亿'
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
    }
}
onMounted(() => {
    initMusicList()
})
</script>
<style lang="less" scoped>
.musicList {
    width: 100%;
    // height: 6.25rem;

    .musicTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;

        .title {
            font-size: .5rem;
            font-weight: 900;
            margin-left: .3125rem;
        }

        .more {
            border: solid 1px #ccc;
            font-size: .3125rem;
            text-align: center;
            height: .625rem;
            line-height: .625rem;
            padding: .125rem .3125rem;
            border-radius: 1.25rem;
            margin-right: .3125rem;
        }
    }

    .musicContent {
        width: 100%;
        // height: 3.75rem;

        .van-swipe {
            height: inherit;
            width: 100%;

            .van-swipe__track {
                .van-swipe-item {
                    position: relative;

                    img {
                        display: block;
                        margin: auto;
                        width: 90%;
                        height: 3.6rem;
                        border-radius: .3125rem;
                    }

                    .playCount {
                        position: absolute;
                        top: .125rem;
                        right: .375rem;
                        font-size: .1875rem;
                        color: #ffffffcc;
                    }

                    .name {
                        width: 90%;
                        font-size: .3125rem;
                        display: inline-block;
                        margin-left: .1875rem;
                        margin-top: .0625rem;
                    }
                }
            }

        }
    }
}
</style>