<template>
    <div class="login">
        <div class="logo">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiqimao"></use>
            </svg>
            <p class="title">欢迎登陆</p>
        </div>
        <img v-if="store.qrimg" :src="store.qrimg" alt="">
    </div>
</template>
<script setup>
import { onMounted, watch, toRefs } from 'vue'
import { Store } from '/src/store/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = Store()
const { isLogin } = toRefs(store)

onMounted(() => {
    store.getLogin()
})

watch(isLogin, () => {
    router.push('/')
})

</script>
<style lang="less" scoped>
.login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 5rem;
        height: 5rem;
    }

    .logo {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            font-size: 2.5rem;
            text-align: center;
        }

        .title {
            color: #ccc;
            font-size: .9375rem;
            font-family: '华文彩云';
        }
    }
}
</style>