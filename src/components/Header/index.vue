<template>
  <div class="topNav">
    <div class="topleft">
      <svg class="icon" aria-hidden="true" @click="isMoreShow = !isMoreShow">
        <use xlink:href="#icon-gengduo1"></use>
      </svg>
      <van-popup v-model:show="isMoreShow" close-icon-position="bottom-left"
        position="left" :style="{ width: '70%', height: '100%' }">
        <More></More>
      </van-popup>
    </div>

    <div class="topContent">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>

</template>
<script setup>
import More from '/src/components/More/index.vue'
import { ref } from 'vue'

// 更新窗口弹出判断值
let isMoreShow = ref(false)

</script>
<style lang="less" scoped>
.topNav {
  display: flex;
  height: .9375rem;
  padding: .1875rem .3125rem;
  justify-content: space-between;
  align-items: center;

  .icon {
    font-size: .75rem;
    color: #1989fa;
  }

  .topContent {
    font-size: .4375rem;

    span {
      padding: 0 .125rem;
    }

    .active {
      font-weight: 900;
    }
  }
}
</style>