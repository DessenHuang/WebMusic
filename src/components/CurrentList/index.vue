<template>
    <div class="currentList">
        <p class="title">当前播放<span>({{ songs.length }})</span></p>
        <div class="list">
            <div class="item" v-for="(item, index) in songs" :key="item" :class="{ active: index === songIndex }"
                @click="playMusic(index)">
                <svg class="icon" aria-hidden="true" v-if="index === songIndex">
                    <use xlink:href="#icon-chart"></use>
                </svg>
                <p class="name">
                    {{ item.name }}
                    <span>
                        - {{ item.ar[0].name }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Store } from '/src/store/index.js'
import { toRefs } from 'vue'

const store = Store()
const { songs, songIndex } = toRefs(store)

const playMusic = index => {
    songIndex.value = index
}

</script>
<style lang="less" scoped>
.currentList {
    .title {
        font-size: .5rem;
        font-weight: 700;
        padding: .3125rem;

        span {
            font-size: .3125rem;
            font-weight: 500;
            color: #ccc;
        }
    }

    .list {

        .item {
            display: flex;
            align-items: center;
            font-size: .375rem;
            color: #444;
            padding: .3125rem;

            .name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: .1875rem;

                span {
                    font-size: .3125rem;
                    color: #666;
                }
            }

        }

        .active {
            color: #1989fa;

            .name {
                span {
                    color: #1989fa;
                }
            }
        }
    }
}
</style>