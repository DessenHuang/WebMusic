<template>
    <div class="hotMusic">
        <div class="title">最新音乐</div>
        <div class="hotList">
            <div class="item" v-for="(item, index) in hotList" :key="item" @click="playShow(index)">
                <div class="nameInfo">
                    <p class="name">{{ item.name }}</p>
                    <p class="art"><span v-for="art in item.song.artists" :key="art">{{ art.name }}&nbsp;</span></p>
                </div>
                <svg class="icon" aria-hidden="true" v-if="store.isBtnShow || store.songIndex !== index">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="!store.isBtnShow && store.songIndex === index">
                    <use xlink:href="#icon-chart"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script setup>
import { hotMusicAPI } from '/src/api/index.js'
import { onBeforeMount, ref } from 'vue'
import { Store } from '/src/store/index.js'

const store = Store()
const hotList = ref([])

onBeforeMount(() => {
    initHotMusic()
})

// 获取最新歌曲
const initHotMusic = async () => {
    const res = await hotMusicAPI()
    hotList.value = res.data.result
    // 修改歌曲列表格式
    hotList.value.forEach((val, index) => {
        hotList.value[index].al = {
            picUrl: val.picUrl
        }
        hotList.value[index].ar = val.song.artists
    }) 
}

// 播放音乐
const playShow = index => {
    store.updateSongs(hotList.value, index)
}

</script>
<style lang="less" scoped>
.hotMusic {
    padding-bottom: 1.65rem;
    .title {
        font-size: 0.5rem;
        font-weight: 900;
        padding: .1875rem .3125rem;
    }

    .hotList {
        font-size: .5rem;
        padding: 0 .3125rem;

        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .3125rem 0;

            .nameInfo {
                width: 80%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                .art {
                    font-size: .3125rem;
                    color: #ccc;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            .icon {
                margin-right: .1875rem;
            }

        }
    }
}
</style>