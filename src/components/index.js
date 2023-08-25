import panel from '@/components/panel/index'

const componentsJs = [
    panel,
]

import application from '@/components/application/index'

const componentsDom = [
    application,
]


const install = (Vue) => {
    if (!Vue) {
        window.Vue = Vue = _Vue
    }
    componentsJs.forEach((item, i) => {
        Vue.use(item);
    })
    componentsDom.forEach((component, i) => {
        Vue.component(component.name, component);
    })
}
export default install