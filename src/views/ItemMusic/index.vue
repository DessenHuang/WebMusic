<template>
    <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
    <ItemMusicBottom :playlist="state.playlist" :songs="state.songs"></ItemMusicBottom>
</template>
<script setup>
import ItemMusicTop from '/src/components/ItemMusicTop/index.vue'
import ItemMusicBottom from '/src/components/itemMusicBottom/index.vue'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getItemMusicAPI, getItemMusicListAPI } from '/src/api/index.js'
const route = useRoute()

const state = reactive({
    playlist: {},
    songs: []
})

// 获取歌单id
const itemId = route.query.id

// 获取歌单详情数据
const initItemMusic = async () => {
    const res = await getItemMusicAPI(itemId)
    state.playlist = res.data.playlist
}
// 获取歌单歌曲列表
const initMusicList = async () => {
    const res = await getItemMusicListAPI(itemId)
    state.songs = res.data.songs
}
onMounted(() => {
    initItemMusic()
    initMusicList()
})
</script>
<style lang="less" scoped>
</style>