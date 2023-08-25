import panels from "./index.vue"

export default function (Vue) {
    const panel = Vue.extend(panels)
    const $panel = new panel()
    $panel.$mount()
    document.body.appendChild($panel.$el)
    Vue.prototype.$panel = (data) => {
        // 初始化面板
        $panel.show = false
        $panel.moreIndex = null
        $panel.style = null
        $panel.morestyle = null
        $panel.panels = data.panels || []
        $panel.coordinate = data.coordinate || {}
        if (data.hide) {
        } else {
            setTimeout(() => {
                $panel.show = true
            }, 0);
        }
    }
}