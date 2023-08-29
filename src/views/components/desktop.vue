<template>
  <div
    class="Desktop"
    ref="desktop"
    :style="setDesktopConfig(desktopConfig)"
    @click="reset"
  >
    <div class="container" v-if="desktopConfig.look.show">
      <div class="item" v-for="(item, index) in desktopList" :key="index">
        <div
          ref="desktopApp"
          :class="desktopClick == index ? 'app app-active' : 'app'"
          @click.stop="DTclick(item, index)"
          @dblclick.stop="openApp(item)"
        >
          <div class="icon" :style="'--DTIconBg: url(' + item.icon + ')'"></div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 面板数据
import panelDatas from "@/utils/panels";
// vuex -- store
import { desktopConfig, openedApp } from "@/utils/store";
export default {
  name: "Desktop",

  data() {
    return {
      // 桌面配置
      desktopConfig: {},
      // 面板数据
      panels: panelDatas.desktop,
      // 桌面图标
      desktopList: [
        {
          icon: require("@/assets/application/cdn.png"),
          name: "此电脑",
          event: "application",
          value: "computer",
        },
        {
          icon: require("@/assets/application/wl.png"),
          name: "网络",
          event: "application",
        },
        {
          icon: require("@/assets/application/hsz.png"),
          name: "回收站",
          event: "application",
        },
        {
          icon: require("@/assets/application/edge.png"),
          name: "Microsoft Edge",
          event: "application",
        },
        {
          icon: require("@/assets/application/github.png"),
          name: "github",
          event: "application",
          value: "AppGames",
        },
        {
          icon: require("@/assets/application/xyzjkys.png"),
          name: "小猿组件库（原生）",
          event: "application",
          value: "AppGames",
        },
        {
          icon: require("@/assets/application/game.png"),
          name: "游戏机",
          event: "application",
          value: "games",
        },
      ],
      // 桌面图标单机事件
      desktopClick: null,
      // 应用层级
      zIndex: 5,
    };
  },

  created() {
    // 获取桌面配置
    this.desktopConfig = desktopConfig;
  },

  watch: {
    "desktopConfig.brush"(e) {
      if (e !== "init") {
        this.brush();
      }
    },
  },

  mounted() {
    // 监听鼠标右键事件
    let desktop = this.$refs.desktop;
    desktop.addEventListener("contextmenu", this.panel);
    // 监听app图标鼠标右键事件
    this.appContextmenu();
  },

  methods: {
    // 打开应用程序
    async openApp(e) {
      let event = e.event;
      let value = e.value;
      // 不同类型应用程序的处理
      switch (event) {
        default:
          return;
        case "application":
          // 判断程序是否已经打开
          let res = await this.$appConfig.getOpened(e.value);
          if (!res) {
            // 具体应用程序的处理
            switch (value) {
              default:
                return;
              case "games":
                openedApp.apps.push(e);
                this.$gamesApp({
                  zIndex: this.setZindex(),
                });
                break;
              case "computer":
                openedApp.apps.push(e);
                this.$computerApp({
                  zIndex: this.setZindex(),
                });
                break;
            }
          } else {
            // 获取当前打开的应用程序的下标
            let index = await this.$appConfig.getOpenedIndex(e.value);
            switch (e.value) {
              default:
                return;
              case "games":
                this.$gamesApp({
                  zIndex: this.setZindex(),
                  topping: true,
                });
                break;
              case "computer":
                this.$computerApp({
                  zIndex: this.setZindex(),
                  topping: true,
                });
                break;
            }
          }
      }
    },
    // 设置层级
    setZindex() {
      this.zIndex += 1;
      return this.zIndex;
    },
    // 计算桌面设置
    setDesktopConfig(e) {
      // 计算图标大小
      let icon;
      switch (e.look.icon) {
        case "small":
          icon = "60px";
          break;
        case "medium":
          icon = "80px";
          break;
        case "big":
          icon = "120px";
          break;
        default:
          icon = "80px";
          break;
      }
      let style = `--iconSize: ${icon};`;
      return style;
    },
    // 鼠标右击事件
    panel(e) {
      // 重置
      this.reset();
      // 阻止冒泡
      e.stopPropagation();
      // 阻止默认事件
      e.preventDefault();
      // 打开面板
      this.$panel({
        panels: this.panels,
        coordinate: {
          x: e.x,
          y: e.y,
        },
      });
    },
    // 单机桌面图标
    DTclick(e, i) {
      this.desktopClick = this.desktopClick == i ? null : i;
    },
    // 监听app图标鼠标右键事件
    appContextmenu() {
      let desktopApp = this.$refs.desktopApp;
      for (let i = 0; i < desktopApp.length; i++) {
        desktopApp[i].addEventListener("contextmenu", this.panelApp);
      }
    },
    // 桌面图标右击
    panelApp(e) {
      // 阻止冒泡
      e.stopPropagation();
      // 阻止默认事件
      e.preventDefault();
    },
    // 刷新桌面
    brush() {
      let old = this.desktopList;
      this.desktopList = [];
      setTimeout(() => {
        this.desktopList = [...old];
        setTimeout(() => {
          this.appContextmenu();
        }, 0);
      }, 200);
    },
    // 重置
    reset(e) {
      this.desktopClick = null;
    },
  },

  beforeDestroy() {
    // 移除监听鼠标右键事件
    let desktop = this.$refs.desktop;
    desktop.removeEventListener("contextmenu", this.panel);
  },
};
</script>

<style lang="less" scoped>
@iconSize: var(--iconSize);
.Desktop {
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  cursor: default;

  .container {
    padding: 2px 3px;
    width: max-content;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    box-sizing: border-box;

    .item {
      margin: calc(@iconSize / 10) calc(@iconSize / 10) calc(@iconSize / 10) 0;
      width: @iconSize;
      height: calc(@iconSize + 20px);

      .app {
        width: 100%;
        border: 1px solid transparent;
        transition: all 0.3s;
        box-sizing: border-box;

        .icon {
          margin: auto;
          @icon: calc(@iconSize - 20px);
          width: @icon;
          height: @icon;
          background: var(--DTIconBg);
          background-size: 100% 100%;
        }

        .name {
          max-height: 40px;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          color: #ffffff;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .app:hover {
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.2);
      }

      .app-active {
        border: 1px solid rgba(255, 255, 255, 0.6) !important;
        background: rgba(255, 255, 255, 0.4) !important;
      }
    }
  }

  .application {
    animation: open 0.3s;
  }

  @keyframes open {
    0% {
      opacity: 0;
      transform: scale(0.6);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .application-close {
    animation: close 0.3s forwards;
  }

  @keyframes close {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.6);
    }
  }
}
</style>