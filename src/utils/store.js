import { reactive } from 'vue'

export const desktopConfig = reactive({
    // 查看
    look: {
        // 图标大小
        icon: 'medium', // small / medium / big
        // 自动排列
        auto: true, // true / false
        // 与网格对齐
        align: false, // true / false
        // 显示桌面图标
        show: true, // true / false
    },
    // 刷新
    brush: 'init',
    // 排列方式
    align: {
        way: null, // name / size / type / date / null
    },
    // 新建
    newBuilt: {
        event: ''
    }
})



export const openedApp = reactive({
    // 打开的应用程序合集
    apps: [
    ]
})