import games from "./index.vue"
import appConfig from "@/utils/appConfig";

export default function (Vue) {
    const gamesApp = Vue.extend(games)
    const $gamesApp = new gamesApp()
    $gamesApp.$mount()
    document.body.appendChild($gamesApp.$el)
    Vue.prototype.$gamesApp = (data) => {
        $gamesApp.open = true
        $gamesApp.zIndex = data.zIndex || 5
        if (data.minimize && data.minimize.is) {
            if ($gamesApp.minimize.is) {
                $gamesApp.minimize = {
                    is: false,
                    left: null
                }
                appConfig.topTabIcon("games");
            } else {
                $gamesApp.minimize = {
                    is: true,
                    left: data.minimize.left
                }
                appConfig.topTabIcon("games", true);
            }
        } else {
            appConfig.topTabIcon("games");
        }
        if (data.topping) {
            $gamesApp.minimize = {
                is: false,
                left: null
            }
        }
    }
}