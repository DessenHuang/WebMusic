import { createApp } from 'vue'
import './style.css'
import 'animate.css'
import './mobile/flexible.js'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import {getVant} from '/src/plugins/index.js'

const app = createApp(App)

const store = createPinia()

app.use(store)
app.use(router)

getVant(app)

app.mount('#app')
