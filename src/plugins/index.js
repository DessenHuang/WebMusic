import { Icon, NavBar, Swipe, SwipeItem, Popup, Search, List, Form, Field, CellGroup } from 'vant'

const plugins = [
    Icon,
    NavBar,
    Swipe, 
    SwipeItem,
    Popup,
    Search,
    List,
    Form, 
    Field, 
    CellGroup
]

export const getVant = (app) => {
    plugins.forEach(item => {
        return app.use(item)
    })
}