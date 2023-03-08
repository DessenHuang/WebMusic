<template>
    <div class="footer">
        <div class="footerLeft" @click="store.updateDetailShow">
            <img class="icon" :src="songs[songIndex].al.picUrl" alt="">
            <div class="name">
                <div class="musicName">{{ songs[songIndex].name }}</div>
                <div class="tab">横滑切换上下百首哦</div>
            </div>
        </div>
        <div class="footerRight">
            <van-icon name="play-circle-o" size="0.8rem" style="padding: 0 .1875rem;" @click="play" v-if="isBtnShow" />
            <van-icon name="pause-circle-o" size="0.8rem" style="padding: 0 .1875rem;" @click="play" v-else />
            <van-icon name="descending" size="0.875rem" @click="store.updateListShow()" />
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${songs[songIndex].id}.mp3`"
            @ended="changeBtn" @error="errors"></audio>
        <van-popup v-model:show="isDetailShow" closeable close-icon="close" close-icon-position="top-left"
            position="bottom" :style="{ height: '100%' }">
            <ItemDetail :song="songs[songIndex]" :isBtnShow="isBtnShow" :play="play" :setDuration="setDuration"
                @update-music="updateMusic">
            </ItemDetail>
        </van-popup>
        <!-- 歌曲列表窗口 -->
        <van-popup v-model:show="isListShow" round position="bottom" :style="{ width: '100%', height: '60%' }">
            <CurrentList></CurrentList>
        </van-popup>
    </div>
</template>
<script setup>
import ItemDetail from '/src/components/itemDetail/index.vue'
import CurrentList from '/src/components/CurrentList/index.vue'
import { Store } from '/src/store/index.js'
import { storeToRefs } from 'pinia'
import { ref, watch, onMounted, onUpdated } from 'vue'


// 获取pinia 仓库信息
const store = Store()
const { songs, songIndex, isBtnShow, isListShow, isDetailShow } = storeToRefs(store)

onMounted(() => {
    store.getMusicLyric(songs.value[songIndex.value].id)
    setDuration()
})

onUpdated(() => {
    store.getMusicLyric(songs.value[songIndex.value].id)
})

// 获取audio dom元素
const audio = ref(null)

// 存放定时器变量
let timer = 0
// 实时更新歌曲播放时间段
const getTimer = () => {
    timer = setInterval(() => {
        store.updateTime(audio.value.currentTime * 1000)
    }, 50)
}

const setDuration = () => {
    //更新歌曲总时长
    store.updateDuration(audio.value.duration * 1000)
}

// 播放与暂停音乐
const play = () => {
    // 更改按钮样式
    store.updateBtnShown()
    // 播放与停止音乐
    if (audio.value.paused) {
        audio.value.play()
        // 实时更新歌曲播放时间段
        getTimer()
    } else {
        audio.value.pause()
        clearInterval(timer)
    }
}

// 歌曲播放结束时更改播放键样式
const changeBtn = () => {
    store.updateBtnShown()
    updateMusic(true)
}

// 点击付费音乐重置播放键样式
const errors = () => {
    store.updateBtnShown()
    alert('vip音乐暂不支持播放噢！')
}

// 监听当前索引值，当歌曲发生切换时设置为自动播放
watch([songIndex, songs], () => {
    audio.value.autoplay = true
    // 实时更新歌曲播放时间段
    getTimer()

    // 修改播放键样式
    if (audio.value.paused) store.updateBtnShown()
})


// 实现音乐上下首切换
const updateMusic = (isNext) => {
    if (isNext) {
        // 下一首歌曲不存在时，切换到当前歌单的第一首
        if (songIndex.value == songs.value.length - 1) return songIndex.value = 0

        songIndex.value += 1
    } else {
        // 上一首歌曲不存在时，切换到当前歌单的最后一首
        if (songIndex.value == 0) return songIndex.value = songs.value.length - 1

        songIndex.value -= 1
    }
}

</script>
<style lang="less" scoped>
.footer {
    width: 100%;
    height: 1.625rem;
    position: fixed;
    bottom: 0;
    border-top: solid 1px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    .footerLeft {
        display: flex;
        align-items: center;
        // width: 60%;
        margin: 0 .3125rem;

        .icon {
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 50%;
        }

        .name {
            height: 100%;
            padding: 0 .25rem;
            font-size: .4375rem;
            min-width: 0;
            text-overflow: ellipsis;
            word-break: break-all;
            overflow: hidden;
            white-space: nowrap;

            .tab {
                font-size: .3125rem;
                color: #ccc;
                padding: .0625rem 0;
            }
        }
    }

    .footerRight {
        // width: 40%;
        display: flex;
        justify-content: right;
        align-items: center;
    }
}
</style>