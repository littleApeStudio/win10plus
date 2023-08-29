import { openedApp } from "@/utils/store";

let apps = openedApp.apps

// 获取当前打开的应用程序的下标
const getOpenedIndex = function (e) {
    return new Promise((resolve, reject) => {
        let index = null;
        for (let i = 0; i < apps.length; i++) {
            if (apps[i].value === e) {
                index = i;
                break;
            }
        }
        resolve(index);
    });
}

// 判断是否已经打开app
const getOpened = function (e) {
    return new Promise((resolve, reject) => {
        function find(item) {
            return item.value === e;
        }
        let res = apps.find(find);
        resolve(res);
    });
}

// 关闭应用程序
const close = function (e) {
    apps.splice(e, 1);
}

// 当前置顶程序的 tabbar 图标样式
const topTabIcon = async function (e, is) {
    if (is) {
        for (let i = 0; i < apps.length; i++) {
            apps[i].now = false
        }
    } else {
        for (let i = 0; i < apps.length; i++) {
            if (apps[i].value !== e) {
                apps[i].now = false
            } else {
                apps[i].now = true
            }
        }
    }
}

const appConfig = {
    getOpenedIndex,
    getOpened,
    close,
    topTabIcon
}

export default appConfig