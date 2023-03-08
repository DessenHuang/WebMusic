<template>
    <div class="itemBottom">
        <div class="itemHead">
            <div class="total">
                <van-icon name="play-circle-o" size="0.625rem" />
                <p>播放全部 <span>(共{{ songs.length }}首)</span></p>
            </div>
            <div class="collect">
                <van-icon name="plus" size="0.3125rem" />
                <span>收藏({{ playlist.subscribedCount }})</span>
            </div>
        </div>
        <div class="musicList">
            <transition-group enter-active-class="animate__animated animate__slideInUp">
                <div class="musicItem" v-for="(item, index) in songs" :key="item">
                    <div class="musicItemLeft " @click="playMusic(index)">
                        <div class="index">{{ index + 1 }}</div>
                        <div class="musicInfo">
                            <div class="name">
                                {{ item.name }}
                            </div>
                            <div class="art">
                                <span v-for="arts in item.ar" :key="arts.id">
                                    {{ arts.name }}&nbsp;
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="musicItemRight">
                        <van-icon name="tv-o" v-if="item.mv" size="0.625rem" color="#ccc" />
                        <van-icon name="wap-nav" size="0.625rem" color="#ccc" />
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<script setup>
import { Store } from '/src/store/index.js'
import { toRefs } from 'vue'
const props = defineProps({
    playlist: {
        type: Object,
        default: () => {
            return {}
        }
    },
    songs: {
        type: Array,
        default: () => {
            return []
        }
    }
})

const { playlist, songs } = toRefs(props)

const playMusic = (index) => {
    const store = Store()
    store.updateSongs(songs.value, index)
}
</script>
<style lang="less" scoped>
.itemBottom {
    padding: .3125rem .3125rem 1.6rem .3125rem;
    border-top-left-radius: .625rem;
    border-top-right-radius: .625rem;
    background-color: white;

    .itemHead {
        // top: 18.9375rem;
        display: flex;
        justify-content: space-between;

        .total {
            display: flex;
            align-items: center;

            p {
                font-size: .5rem;
                font-weight: 700;
                margin-left: .1875rem;

                span {
                    font-size: .125rem;
                    font-weight: 400;
                    // line-height: 1.5rem;
                    color: #a5a5a5;
                }
            }
        }

        .collect {
            display: flex;
            align-items: center;
            background-color: #1989fa;
            color: white;
            padding: .3125rem .1875rem;
            border-radius: 1.25rem;

            span {
                font-size: .1875rem;
                margin-left: .125rem;
            }
        }
    }

    .musicList {
        width: 100%;

        .musicItem {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .3125rem .1875rem;
            border-bottom: solid 1px #ccc;
        }

        .musicItemLeft {
            width: 80%;
            display: flex;
            align-items: center;

            .index {
                font-size: .375rem;
                width: .625rem;
                text-align: center;
                color: #ccc;
            }

            .musicInfo {
                padding: 0 .125rem;

                .name {
                    font-size: .4rem;
                    font-weight: 500;
                }

                .art {
                    padding-top: .0625rem;
                    font-size: .3125rem;
                    color: #ccc;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }

        .musicItemRight {
            display: flex;
            justify-content: right;
        }
    }
}
</style>