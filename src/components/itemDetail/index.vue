<template>
    <img class="bg" :src="song.al.picUrl" alt="">
    <div class="detailTop">
        <Vue3Marquee style="width: 50%">{{ song.name }}</Vue3Marquee>
        <p class="arts">
            <span v-for="item in song.ar" key="item">
                {{ item.name }}&nbsp;
            </span>
            <van-icon name="arrow" />
        </p>
    </div>
    <div class="detailContent" @click="tabLyric" v-if="store.isLyricShow">
        <img src="/src/assets/needle.png" alt="" class="img_neddle" :class="{ img_neddle_acticve: !isBtnShow }">
        <img src="/src/assets/cd.png" alt="" class="img_cd">
        <img :src="song.al.picUrl" alt="" class="img_cover"
            :class="{ img_cover_active: !isBtnShow, img_cover_paused: isBtnShow }">
    </div>
    <div class="musicLyric" ref="musicLyric" @click="tabLyric" v-else>
        <p v-for="item in lyric" :key="item"
            :class="{ lyric_active: (store.currentTime >= item.times && store.currentTime <= item.next) }">{{
                    item.lrc
            }}</p>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="updateCommentShow">
                <use xlink:href="#icon-liaotian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-changge"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
            <!-- 评论窗口 -->
            <van-popup v-model:show="isCommentShow" closeable close-icon="arrow-left" close-icon-position="top-left"
                position="left" :style="{ width: '100%', height: '100%' }">
                <Comment :id=song.id></Comment>
            </van-popup>
        </div>
        <div class="footerContent">
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
        </div>
        <div class="footerBottom">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shuaxin"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="tab(false)">
                <use xlink:href="#icon-shangyishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true" style="font-size: 1.25rem" @click="playMusic" v-if="isBtnShow">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" style="font-size: 1.25rem" @click="playMusic" v-else>
                <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="tab(true)">
                <use xlink:href="#icon-xiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="store.updateListShow()">
                <use xlink:href="#icon-bofangliebiao"></use>
            </svg>

        </div>
    </div>
</template>
<script setup>
import { toRefs, ref, onMounted, onUpdated, computed, watch } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'
import { Store } from '/src/store/index.js'
import 'vue3-marquee/dist/style.css'
import Comment from '/src/components/Comment/index.vue'

const store = Store()

const { currentTime, duration } = toRefs(store)

// 接收父组件传值
const props = defineProps({
    song: {
        type: Object,
        default: () => {
            return {}
        }
    },
    isBtnShow: {
        type: Boolean,
        default: () => {
            return true
        }
    },
    play: {
        type: Function,
        default: () => {
            return function () {
            }
        }
    },
    setDuration: {
        type: Function,
        default: () => {
            return function () {
            }
        }
    }
})

const { song, isBtnShow, play, setDuration } = toRefs(props)

onMounted(() => {
    // console.log(store.musiclyric.lyric);
    setDuration.value()
})

onUpdated(() => {
    setDuration.value()
})

// 评论窗口弹出判断值
let isCommentShow = ref(false)
// 控制评论窗口是否弹出
const updateCommentShow = () => {
    isCommentShow.value = !isCommentShow.value
}

let lyric = computed(() => {
    return lyricSplit()
})

// 歌词数据处理
const lyricSplit = () => {
    let arr
    if (store.musiclyric.lyric) {
        arr = store.musiclyric.lyric.split(/[(\r\n)\r\n]+/).map((item, index) => {
            // 分
            let min = item.slice(1, 3)
            // 秒
            let sec = item.slice(4, 6)
            // 毫秒
            let mill = item.slice(7, 10)
            // 歌词段
            let lrc = item.slice(11, item.length)
            // 总毫秒
            let times = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)

            if (isNaN(Number(mill))) {
                mill = item.slice(7, 9)
                lrc = item.slice(10, item.length)
                let times = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
            }
            return { min, sec, mill, lrc, times }
        })
        arr.forEach((item, index) => {
            if (index === arr.length - 1 || isNaN(arr[index + 1].times)) return item.next = Number.POSITIVE_INFINITY
            item.next = arr[index + 1].times
        })
    }
    return arr
}

// 歌词与封面切换
const tabLyric = () => {
    store.isLyricShow = !store.isLyricShow
}

// 播放与暂停音乐
const playMusic = () => {
    play.value()
}

// 子传父emit事件
const emit = defineEmits(['update-music'])

// 上下首切换
const tab = (val) => {
    emit('update-music', val)
}

// 获取歌词盒子元素
const musicLyric = ref(null)

watch(currentTime, (newVal) => {
    // 实现歌词自行滚动
    let p = document.querySelector('.lyric_active')
    if (p?.offsetTop > 300) {
        musicLyric.value.scrollTop = p.offsetTop - 280
    }
})

// 监听评论窗口弹出判断值来重置评论列表
watch(isCommentShow, () => {
    store.resetComment(song.value.id)
})

</script>
<style lang="less" scoped>
.bg {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    filter: blur(80px);
}

.detailTop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: .4375rem;
    color: #f5f5f5;
    height: 1.125rem;
    padding: .3125rem 0;

    .arts {
        padding: .0625rem 0;
        font-size: .3125rem;
        color: #ffffff80;
    }
}

.detailContent {
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    // margin-top: .3125rem;
    .img_neddle {
        width: 2.5rem;
        height: 4.0625rem;
        position: absolute;
        left: 48%;
        transform-origin: 0 0;
        transform: rotate(-13deg);
        transition: all 2s;
    }

    .img_neddle_acticve {
        width: 2.5rem;
        height: 4.0625rem;
        position: absolute;
        left: 48%;
        transform-origin: 0 0;
        transform: rotate(2deg);
        transition: all 2s;
    }

    .img_cd {
        width: 6.25rem;
        height: 6.25rem;
        position: absolute;
        bottom: 13%;
        z-index: -1;
    }

    .img_cover {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        position: absolute;
        bottom: 24%;
        animation: rotateCover 20s linear infinite;
    }

    .img_cover_active {
        animation-play-state: running;
    }

    .img_cover_paused {
        animation-play-state: paused;
    }

    @keyframes rotateCover {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }
}

.musicLyric {
    width: 100%;
    height: 60vh;
    font-size: .375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;

    p {
        width: 60%;
        text-align: center;
        padding: .3125rem 0;
        color: #ffffff80;
    }

    .lyric_active {
        color: #fff;
        transition: all .5s;
    }
}

.detailFooter {
    position: absolute;
    bottom: 0;
    height: 3.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .footerTop {
        display: flex;

        .icon {
            width: 20%;
            font-size: .9375rem;
            color: #ffffff80;
        }
    }

    .footerContent {
        height: .625rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .range {
            width: 95%;
            height: .0625rem;
            border-radius: 10px;
            opacity: .8;
        }

    }

    .footerBottom {
        display: flex;
        align-items: center;
        padding-bottom: .3125rem;

        .icon {
            width: 20%;
            font-size: .9375rem;
            color: #ffffff80;
        }
    }
}
</style>