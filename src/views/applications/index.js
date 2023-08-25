import thisComputer from '@/views/applications/apps/thisComputer.vue'
import games from '@/views/applications/apps/games.vue'

const components = [
    thisComputer,
    games,
]


const apps = (Vue) => {
    if (!Vue) {
        window.Vue = Vue = _Vue
    }
    components.forEach((component, i) => {
        Vue.component(component.name, component);
    })
}
export default apps