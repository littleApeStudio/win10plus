import gamesApp from '@/views/applications/apps/game/index'
import computerApp from '@/views/applications/apps/thisComputer/index'

const components = [
    gamesApp,
    computerApp
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