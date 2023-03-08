<template>
    <div class="iconList">
        <div class="iconItem">
            <van-icon name="calendar-o" size="1.25rem" color="#1989fa"/>
            <span>每日推荐</span>
        </div>
         <div class="iconItem" >
            <van-icon name="live" size="1.25rem" color="#1989fa" />
            <span>私人FM</span>
        </div>
         <div class="iconItem">
            <van-icon name="bar-chart-o" size="1.25rem" color="#1989fa"/>
            <span>排行榜</span>
        </div>
        <div class="iconItem">
            <van-icon name="column" size="1.25rem" color="#1989fa"/>
            <span>歌单</span>
        </div>
    </div>
</template>
<script>

</script>
<style lang="less" scoped>
.iconList {
    width: 100%;
    height: 1.5625rem;
    margin: .5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconItem {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
            font-size: .3125rem;
        }
    }
}
</style>