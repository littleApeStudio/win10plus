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
    };
  },

  created() {
    // 获取系统时间
    this.getDateTime();
    this.datetimeTimer = setInterval(() => {
      this.getDateTime();
    }, 1000);
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
    .systemBar:hover {
      background: #ffffff;
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
      background: #ffffff;
    }
  }
}
</style>