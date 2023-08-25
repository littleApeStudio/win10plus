const panels = {
    desktop: [
        {
            icon: "",
            type: "list",
            name: "查看(V)",
            children: [
                {
                    icon: "",
                    type: "radio",
                    name: "大图标(R)",
                    event: "icon",
                    value: "big"
                },
                {
                    icon: "",
                    type: "radio",
                    name: "中等图标(M)",
                    event: "icon",
                    value: "medium"
                },
                {
                    icon: "",
                    type: "radio",
                    name: "小图标(N)",
                    event: "icon",
                    value: "small"
                },
                { type: "line" },
                {
                    icon: "",
                    type: "multi",
                    name: "自动排列图标(A)",
                    event: "auto",
                    value: true
                },
                {
                    icon: "",
                    type: "multi",
                    name: "将图标与网格对齐(I)",
                    event: "align",
                    value: false
                },
                { type: "line" },
                {
                    icon: "",
                    type: "multi",
                    name: "显示桌面图标(D)",
                    event: "show",
                    value: true
                },
            ],
            event: "look",
        },
        {
            icon: "",
            type: "list",
            name: "排列方式(O)",
            children: [
                {
                    icon: "",
                    type: "way",
                    name: "名称(R)",
                    event: "way",
                    value: "name"
                },
                {
                    icon: "",
                    type: "way",
                    name: "大小(M)",
                    event: "way",
                    value: "size"
                },
                {
                    icon: "",
                    type: "way",
                    name: "项目类型(N)",
                    event: "way",
                    value: "type"
                },
                {
                    icon: "",
                    type: "way",
                    name: "修改日期(N)",
                    event: "way",
                    value: "date"
                },
            ],
            event: "align"
        },
        {
            icon: "",
            type: "list",
            name: "刷新(E)",
            children: null,
            event: "event",
            value: "brush"
        },
        { type: "line" },
        {
            icon: "",
            type: "list",
            name: "粘贴(P)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: "",
            type: "list",
            name: "粘贴快捷方式(S)",
            children: null,
            event: "",
            value: ""
        },
        { type: "line" },
        {
            icon: "",
            type: "list",
            name: "新建(W)",
            children: [
                {
                    icon: require("@/assets/icon/desktopRightPanel/folder.png"),
                    type: "event",
                    name: "文件夹(F)",
                    event: "folder",
                },
                {
                    icon: require("@/assets/icon/desktopRightPanel/Shortcuts.png"),
                    type: "event",
                    name: "快捷方式(S)",
                    event: "Shortcuts",
                },
            ],
            event: "newBuilt",
        },
        { type: "line" },
        {
            icon: require("@/assets/icon/desktopRightPanel/xssz.png"),
            type: "list",
            name: "显示设置(D)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: require("@/assets/icon/desktopRightPanel/gxh.png"),
            type: "list",
            name: "个性化(R)",
            children: null,
            event: "",
            value: ""
        },
    ],
    status: [
        {
            icon: "",
            type: "list",
            name: "显示任务视图按钮(V)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: "",
            type: "list",
            name: "在任务栏上显示人脉(P)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: "",
            type: "list",
            name: "显示“Windows Lnk 工作区”按钮(W)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: "",
            type: "list",
            name: "显示触摸键盘按钮(Y)",
            children: null,
            event: "",
            value: ""
        },
        { type: "line" },
        {
            icon: "",
            type: "list",
            name: "层叠窗口(D)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: "",
            type: "list",
            name: "堆叠显示窗口(E)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: "",
            type: "list",
            name: "并排显示窗口(I)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: "",
            type: "list",
            name: "显示桌面(S)",
            children: null,
            event: "",
            value: ""
        },
        { type: "line" },
        {
            icon: "",
            type: "list",
            name: "任务管理器(K)",
            children: null,
            event: "",
            value: ""
        },
        { type: "line" },
        {
            icon: "",
            type: "list",
            name: "锁定所有任务栏(L)",
            children: null,
            event: "",
            value: ""
        },
        {
            icon: require("@/assets/icon/desktopRightPanel/setting.png"),
            type: "list",
            name: "任务栏设置(T)",
            children: null,
            event: "",
            value: ""
        },
    ]
}

export default panels