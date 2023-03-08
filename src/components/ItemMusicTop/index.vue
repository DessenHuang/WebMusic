<template>
    <div class="itemTop">
        <img class="bg" :src="playlist.coverImgUrl" alt="">
        <div class="itemNav">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="0.625rem" color="#ffffffcc" />
            <span>歌单</span>
        </div>
        <transition enter-active-class="animate__animated animate__animated ">
            <div class="itemContent">
                <div class="itemContentLeft">
                    <transition enter-active-class="animate__animated animate__fadeIn">
                        <img v-if="playlist.coverImgUrl" :src="playlist.coverImgUrl" class="cover" alt="">
                    </transition>
                </div>

                <div class="itemContentRight">
                    <div class="name">{{ playlist.name }}</div>
                    <div class="user">
                        <img class="icon" :src="playlist.creator.avatarUrl" alt="" v-if="playlist.creator">
                        <span class="userName" v-if="playlist.creator">{{ playlist.creator.nickname }}</span>
                        <van-icon name="arrow" size="0.3125rem" />
                    </div>
                    <div class="desc">{{ playlist.description }}</div>
                </div>
            </div>
        </transition>

        <div class="itemMenu">
            <div class="item">
                <van-icon name="chat-o" size="0.7rem" />
                <span>{{ playlist.commentCount }}</span>
            </div>
            <div class="item">
                <van-icon name="link-o" size="0.7rem" />
                <span>{{ playlist.shareCount }}</span>
            </div>
            <div class="item">
                <van-icon name="down" size="0.7rem" />
                <span>下载</span>
            </div>
            <div class="item">
                <van-icon name="passed" size="0.7rem" />
                <span>多选</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    playlist: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const { playlist } = toRefs(props)

</script>
<style lang="less" scoped>
.itemTop {
    .bg {
        width: 100%;
        height: 7.5rem;
        position: fixed;
        z-index: -1;
        filter: blur(30px);
    }

    .itemNav {
        padding: .3125rem;
        height: 100%;
        display: flex;
        align-items: center;

        span {
            font-size: .625rem;
            margin-left: .1875rem;
            color: #ffffffcc;
        }
    }

    .itemContent {
        display: flex;
        justify-content: space-between;
        padding: 1rem .3125rem .4rem .3125rem;

        .itemContentLeft {
            width: 40%;
            display: flex;
            justify-content: center;

            .cover {
                width: 3.2rem;
                height: 3.2rem;
                border-radius: .3125rem;
            }
        }

        .itemContentRight {
            width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .name {
                font-weight: 700;
                font-size: .4rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                color: white;
            }

            .user {
                display: flex;
                align-items: center;
                padding: .1875rem 0;
                color: #ffffffcc;

                .icon {
                    width: .625rem;
                    height: .625rem;
                    border-radius: 50%;
                    margin-right: .1875rem;

                }

                .userName {
                    font-size: .1875rem;
                    margin-right: .0625rem;
                }
            }

            .desc {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-size: .1875rem;


                color: #ffffffcc;
            }
        }
    }

    .itemMenu {
        display: flex;
        padding: .3125rem;

        .item {
            width: 25%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #ffffffcc;

            span {
                font-size: .1875rem;
                padding: .125rem 0;
            }
        }
    }
}
</style>