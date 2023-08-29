<template>
  <div class="StatusBar" ref="statusBar">
    <div class="left">
      <div class="systemBar">
        <div
          class="icon"
          :style="
            '--bg: url(' + require('@/assets/icon/statusBars/win.svg') + ')'
          "
        ></div>
      </div>
      <div class="systemBar">
        <div
          class="icon"
          :style="
            '--bg: url(' + require('@/assets/icon/statusBars/search.svg') + ')'
          "
        ></div>
      </div>
      <transition-group class="apps" name="tabAppIcon" tag="div">
        <div
          :class="item.now ? 'app app-now' : 'app'"
          v-for="(item, index) in opened"
          :key="item + index"
          @click="appClick(item)"
        >
          <div class="icon" :style="'--bg: url(' + item.icon + ')'"></div>
          <div class="border"></div>
        </div>
      </transition-group>
    </div>
    <div class="right">
      <div class="systemDateTime">
        <div class="time">{{ datetime.h + ":" + datetime.m }}</div>
        <div class="date">
          {{ datetime.Y + "-" + datetime.M + "-" + datetime.D }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 面板数据
import panelDatas from "@/utils/panels";
// vuex -- store
import { openedApp } from "@/utils/store";
export default {
  name: "StatusBar",

  data() {
    return {
      // 面板数据
      panels: panelDatas.status,
      // 系统时间
      datetime: {},
      // 系统时间定时器
      datetimeTimer: null,
      opened: [],
    };
  },

  created() {
    // 获取系统时间
    this.getDateTime();
    this.datetimeTimer = setInterval(() => {
      this.getDateTime();
    }, 1000);
    // 获取已经打开的app
    this.opened = openedApp.apps;
  },

  mounted() {
    // 监听鼠标右键事件
    let statusBar = this.$refs.statusBar;
    statusBar.addEventListener("contextmenu", this.panel);
  },

  methods: {
    // 获取系统时间
    getDateTime() {
      let date = new Date();
      let y = date.getFullYear();
      let m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let datetime = {
        Y: y,
        M: m,
        D: d,
        h: h,
        m: mm,
        s: s,
      };
      this.datetime = datetime;
    },
    // 鼠标右击事件
    panel(e) {
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
    // app 点击
    async appClick(e) {
      // 获取当前打开的应用程序的下标
      let index = await this.$appConfig.getOpenedIndex(e.value);
      let value = e.value;
      switch (value) {
        default:
          return;
        case "games":
          this.$gamesApp({
            minimize: {
              is: true,
              left: (index + 2) * 48 + "px",
            },
          });
          break;
        case "computer":
          this.$computerApp({
            minimize: {
              is: true,
              left: (index + 2) * 48 + "px",
            },
          });
          break;
      }
    },
  },

  beforeDestroy() {
    // 移除监听鼠标右键事件
    let statusBar = this.$refs.statusBar;
    statusBar.removeEventListener("contextmenu", this.panel);
    // 清除系统时间定时器
    clearInterval(this.datetimeTimer);
    this.datetimeTimer = null;
  },
};
</script>

<style lang="less" scoped>
.StatusBar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #e0e0e0;
  display: flex;
  justify-content: space-between;
  user-select: none;
  cursor: default;

  // 左侧应用
  .left {
    flex: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: default;

    .systemBar {
      width: 48px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;

      .icon {
        width: 24px;
        height: 24px;
        background-image: var(--bg);
        background-size: 100% 100%;
      }
    }

    .tabAppIcon-enter-active,
    .tabAppIcon-leave-active {
      transition: all 0.35s;
    }

    .tabAppIcon-enter,
    .tabAppIcon-leave-to {
      opacity: 0;
      transform: scale(0.5);
    }

    .apps {
      display: flex;
    }

    .app {
      width: 48px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;

      .icon {
        margin-top: 6px;
        width: 24px;
        height: 24px;
        background-image: var(--bg);
        background-size: 100% 100%;
      }
      .border {
        margin: 7px auto 0 auto;
        width: calc(100% - 10px);
        height: 3px;
        border-radius: 1.5px;
        background: #0099ff;
      }
    }
    .systemBar:hover,
    .app:hover {
      background: #f0f0f0;
    }

    .app-now {
      background: #ffffff !important;
    }
  }

  // 右侧系统
  .right {
    flex: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: default;

    .systemDateTime {
      width: 80px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s;

      .time,
      .date {
        width: 100%;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
      }
    }
    .systemDateTime:hover {
      background: #f0f0f0;
    }
  }
}
</style>