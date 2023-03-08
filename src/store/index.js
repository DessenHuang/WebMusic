import { defineStore } from 'pinia'
import { getMusicLyricAPI, commentListAPI, LoginKeyAPI, LoginImgAPI, LoginCheckAPI, LogoutAPI, loginStatusAPI } from '/src/api/index.js'

export const Store = defineStore('piniaStore', {
    state: () => {
        return {
            songs: [{
                al: {
                    pic: 109951163077613700,
                    picUrl: "https://p1.music.126.net/UsSAd3Bdf77DjhCuTSEvUw==/109951163077613693.jpg",
                    pic_str: "109951163077613693"
                },
                ar: [
                    {
                        name: '华晨宇'
                    },
                    {
                        name: '杨宗纬'
                    }
                ],
                // id: 1896287667,
                // id: 1318234987,
                id: 32835565,
                name: '国王与乞丐'
            }
            ],
            // 当前索引
            songIndex: 0,
            // 歌曲播放判断值
            isBtnShow: true,
            // 歌曲列表展开判断值
            isListShow: false,
            // 歌曲详情页判断值
            isDetailShow: false,
            // 当前歌词列表
            musiclyric: {},
            // 歌词展示判断值
            isLyricShow: true,
            // 当前歌曲过度时间
            currentTime: 0,
            // 当前歌曲总时长
            duration: 0,
            // 当前评论列表
            commentList: [],
            // 登陆状态
            isLogin: false,
            // 底部栏判断值
            isFooterShow: true,
            // 登陆二维码
            qrimg: '',
            // 当前头像
            avatarUrl: sessionStorage.getItem('avatarUrl'),
            // 当前用户名
            nickname: sessionStorage.getItem('nickname')
        }
    },
    getters: {},
    actions: {
        // 修改播放键样式的判断值
        updateBtnShown() {
            this.isBtnShow = !this.isBtnShow
        },
        // 控制歌曲列表是否弹出
        updateListShow() {
            this.isListShow = !this.isListShow
        },
        // 更新歌单列表数据和索引
        updateSongs(songs, index) {
            this.songs = songs
            this.songIndex = index
        },
        // 修改歌曲详情页弹出判断值
        updateDetailShow() {
            this.isDetailShow = !this.isDetailShow
        },
        // 获取歌词
        async getMusicLyric(id) {
            const res = await getMusicLyricAPI(id)
            this.musiclyric = res.data.lrc
            // console.log(this.musiclyric)
        },
        // 实时获取歌曲播放时间
        updateTime(time) {
            this.currentTime = time
        },
        // 更新当前歌曲总时长
        updateDuration(duration) {
            this.duration = duration
        },
        // 重置歌曲评论列表
        async resetComment(id) {
            if (this.commentList.length !== 0) {
                this.commentList = []
            } else {
                const res = await commentListAPI(id, 1)
                res.data.comments.forEach(val => {
                    this.commentList.push(val)
                })
            }

        },
        // 登陆
        async getLogin() {
            // 获取key
            const key = await LoginKeyAPI()
            // 获取二维码图片
            const qrimg = await LoginImgAPI(key)
            this.qrimg = qrimg

            // 轮询验证二维码状态
            // 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
            // 每三秒check一次
            let check = setInterval(async () => {
                let nowtime = new Date().getTime();
                let res = await LoginCheckAPI(key, nowtime).then()
                console.log(res.data.message, '---')
                if (res.data.code == 800) {
                    alert(res.data.message)
                    clearInterval(check)
                }
                if (res.data.code == 803) {
                    clearInterval(check)
                    // 存储cookie
                    sessionStorage.setItem('cookie', res.data.cookie)
                    // 传入cookie获取账户状态与信息
                    const stateRes = await loginStatusAPI()
                    sessionStorage.setItem('isLogin', true)
                    sessionStorage.setItem('userId', stateRes.data.data.account.id)
                    sessionStorage.setItem('avatarUrl', stateRes.data.data.profile.avatarUrl)
                    sessionStorage.setItem('nickname', stateRes.data.data.profile.nickname)
                    // 更新登陆状态
                    this.isLogin = sessionStorage.getItem('isLogin')
                }
            }, 3000)
        },
        // 退出登陆
        async getLogout() {
            await LogoutAPI()
            this.isLogin = false
            sessionStorage.clear()
        }
    }
})