<template>
    <van-nav-bar placeholder title="评论" />
    <div class="comment">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in commentList" :key="item">
                <template #default>
                    <div class="wrap">
                        <div class="wrapLeft">
                            <img :src="item.user.avatarUrl" alt="">
                        </div>
                        <div class="wrapRight">
                            <div class="rightTop">
                                <div class="desc">
                                    <p class="name">{{ item.user.nickname }}</p>
                                    <p class="time">{{ dateFormat(item.time) }}</p>
                                </div>
                                <div class="liked">
                                    <span>{{ item.likedCount }}</span>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-dianzan"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="rightBottom">{{ item.content }}</div>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-list>
    </div>
</template>
<script setup>
import { ref, toRefs } from 'vue'
import { commentListAPI } from '/src/api/index.js'
import { Store } from '/src/store/index.js'

const store = Store()
let { commentList } = toRefs(store)
const loading = ref(false);
const finished = ref(false);

// 评论数偏移量
let offset = 0

const props = defineProps({
    id: Number
})



const { id } = toRefs(props)

const initCommentList = async offset => {
    const res = await commentListAPI(id.value, offset)

    res.data.comments.forEach(val => {
        commentList.value.push(val)
    })

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (res.data.comments.length == 0) finished.value = true
}

const onLoad = () => {
    offset += 1
    initCommentList(offset)
}

// 格式时间样式
const dateFormat = time => {
    const date = new Date(time)
    let y = date.getFullYear()
    let m = date.getMonth()+1
    let d = date.getDate()
    return `${y}-${m}-${d}`
}

</script>
<style lang="less" scoped>
.head {
    width: 100%;
    height: 10vh;
    position: fixed;
    top: 0;
    background-color: #1989fa;
    z-index: 1;
}

.wrap {
    display: flex;
    .wrapLeft {
        padding-right: .3125rem;
        img {
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
        }
    }
    .wrapRight {
        width: 100%;
        .rightTop {
            display: flex;
            justify-content: space-between;
            padding-bottom: .125rem;
            .desc {
                .name {
                    font-size: .3125rem;
                }
                .time {
                    font-size: .1875rem;
                    color: #ccc;
                }
            }
            .liked {
                color: #ccc;
                span {
                    font-size: .1875rem;
                }
            }
        }
    }
}
</style>