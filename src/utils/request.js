import axios from 'axios'

const request = axios.create({
    // 本地服务器url
    // baseURL: 'http://localhost:3000'
    // vercel服务器url
    // baseURL: 'https://netease-cloud-music-o84647c89-dessenhuang.vercel.app'
    // 腾讯云部署url
    baseURL: 'https://service-balzmj50-1313228190.gz.apigw.tencentcs.com/release/'
})

export default request