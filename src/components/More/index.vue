<template>
    <div class="more">
        <div class="user">
            <img :src="store.avatarUrl" alt="" v-if="store.isLogin">
            <svg class="icon" aria-hidden="true" v-else>
                <use xlink:href="#icon-jiqimao"></use>
            </svg>
            <p class="name" v-if="store.isLogin">{{ store.nickname }}</p>
            <p class="name" v-else>未登陆</p>
        </div>
        <div class="menu">
            <div class="about">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shezhi"></use>
                </svg>
                <span>设置</span>
            </div>
            <div class="about">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-guanyu"></use>
                </svg>
                <span>关于</span>
            </div>
            <div class="login" v-if="!store.isLogin" @click="$router.push('/login')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-denglu"></use>
                </svg>
                <span>登陆</span>
            </div>
            <div class="logout" v-else @click="logout()">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tuichudenglu"></use>
                </svg>
                <span>退出</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Store } from '/src/store/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = Store()

// 退出登陆并重新跳转到首页
const logout = () => {
    store.getLogout()
    router.push('/')
}

</script>
<style lang="less" scoped>
.more {
    padding: .3125rem;
    display: flex;
    flex-direction: column;

    .user {
        padding: .9375rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: .3125rem;
        background-color: #ccc;

        .icon {
            width: 1.5rem;
            height: 1.5rem;
        }

        img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
        }

        .name {
            padding: .1875rem 0;
            font-size: .375rem;
        }
    }

    .menu {
        font-size: .3125rem;
        margin: .625rem 0;
        border-top: solid 1px #ccc;

        .icon {
            padding-right: .125rem;
        }

        div {
            margin: .125rem 0;
            height: .9375rem;
            line-height: .9375rem;
            border-bottom: solid 1px #ccc;
        }
    }
}
</style>