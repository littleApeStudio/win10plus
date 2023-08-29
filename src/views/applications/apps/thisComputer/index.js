import computer from "./index.vue"
import appConfig from "@/utils/appConfig";

export default function (Vue) {
    const computerApp = Vue.extend(computer)
    const $computerApp = new computerApp()
    $computerApp.$mount()
    document.body.appendChild($computerApp.$el)
    Vue.prototype.$computerApp = (data) => {
        $computerApp.open = true
        $computerApp.zIndex = data.zIndex || 5
        if (data.minimize && data.minimize.is) {
            if ($computerApp.minimize.is) {
                $computerApp.minimize = {
                    is: false,
                    left: null
                }
                appConfig.topTabIcon("computer");
            } else {
                $computerApp.minimize = {
                    is: true,
                    left: data.minimize.left
                }
                appConfig.topTabIcon("computer", true);
            }
        } else {
            appConfig.topTabIcon("computer");
        }
        if (data.topping) {
            $computerApp.minimize = {
                is: false,
                left: null
            }
        }
    }
}