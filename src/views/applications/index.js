import gamesApp from '@/views/applications/apps/game/index'

const components = [
    gamesApp,
]


const apps = (Vue) => {
    if (!Vue) {
        window.Vue = Vue = _Vue
    }
    components.forEach((item, i) => {
        Vue.use(item);
    })
}
export default apps