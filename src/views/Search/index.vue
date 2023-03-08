<template>
    <div class="search">
        <van-search shape="round" v-model="searchValue" placeholder="请输入搜索关键词">
            <template #left>
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-fanhui"></use>
                </svg>
            </template>
        </van-search>
        <!-- 热词搜索区域 -->
        <div class="search_wrap" v-if="searchRes.values.length === 0">
            <!-- 标题 -->
            <p class="hot_title">热门搜索</p>
            <!-- 热搜关键词容器 -->
            <div class="hot_name_wrap">
                <!-- 每个搜索关键词 -->
                <transition-group enter-active-class="animate__animated animate__fadeIn">
                    <span class="hot_item" v-for="item in searchList.values" :key="item"
                        @click="pullStr(item.first)">{{ item.first }}</span>
                </transition-group>
            </div>
        </div>
        <!-- 搜索结果区域 -->
        <div class="search_wrap" v-else>
            <p class="hot_title">最佳匹配</p>
            <itemSearch v-for="(item, index) in searchRes.values" :key="item" :index="index" :name="item.name"
                :arts="item.ar[0].name" @update-music="updateMusic"></itemSearch>
        </div>
    </div>
</template>
<script setup>
import { hotSearchAPI, searchSuggestAPI } from '/src/api/index.js'
import { ref, onMounted, reactive, watch } from 'vue'
import { Store } from '/src/store/index.js'
import itemSearch from '/src/components/itemSearch/index.vue'

onMounted(() => {
    initHotSearch()
})

// 点击歌曲更新store音乐列表
const updateMusic = index => {
    const store = Store()
    store.updateSongs(searchRes.values, index)
    // 弹出音乐详情页
    store.updateDetailShow()
}

// 输入框值
const searchValue = ref('')
// 热词列表
const searchList = reactive([])
// 搜索结果列表
const searchRes = reactive([])
// 定时器
let timer = 0

// 获取热词
const initHotSearch = async () => {
    const res = await hotSearchAPI()
    searchList.values = res.data.result.hots
}

// 获取搜索结果
const initSearchSuggest = async val => {
    const res = await searchSuggestAPI(val)
    searchRes.values = res.data.result.songs
    // console.log(searchRes.values);
}

// 把热搜关键字填充到搜索框
const pullStr = str => {
    clearTimeout(timer)
    searchValue.value = str
    initSearchSuggest(str)
}

// 定义防抖函数 
const debounceSearch = val => {
    timer = setTimeout(() => {
        initSearchSuggest(val)
    }, 500)
}

watch(searchValue, newVal => {
    // 清除上次的定时器任务
    clearTimeout(timer)

    // 当搜索关键词为空时，阻止调用ajax，并重置列表
    if (newVal === '') return searchRes.values = []

    // 调用防抖函数并进行数据请求
    debounceSearch(newVal)
})

</script>
<style lang="less" scoped>
.search {
    padding: 1.56rem 0;

    .van-search {
        border-radius: .3125rem;
        width: 100%;
        height: 1.875rem;
        position: fixed;
        top: 0;

        .icon {
            color: #ccc;
        }
    }
}

/* 搜索容器的样式 */
.search_wrap {
    padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
    font-size: .375rem;
    color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
    margin: .25rem 0;
}

/* 热搜词_样式 */
.hot_item {
    display: inline-block;
    height: .8125rem;
    margin-right: .1875rem;
    margin-bottom: .1875rem;
    padding: .125rem .375rem;
    font-size: .375rem;
    line-height: .8125rem;
    color: #555;
    border-radius: .625rem;
    border: 1px solid #1989fa;
}

:deep(.van-field__control) {
    font-size: .375rem;
}
</style>