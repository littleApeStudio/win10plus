<template>
  <transition name="WinPanel">
    <div v-if="show" class="WinPanel" ref="panel" :style="style">
      <div v-for="(item, index) in panels" :key="index">
        <div
          v-if="item.type != 'line'"
          class="panelMenu"
          @click.stop="panelClick(item)"
          @mouseenter="panelHover(0, item, index)"
          @mouseleave="panelHover(1, item, index)"
        >
          <div class="icon">
            <div
              v-if="item.icon"
              class="icon-img"
              :style="'--icon: url(' + item.icon + ')'"
            ></div>
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="icon">
            <div
              v-if="item.children"
              class="icon-img"
              :style="
                '--icon: url(' +
                require('@/assets/icon/desktopRightPanel/more.png') +
                ')'
              "
            ></div>
          </div>
          <transition name="panelMenuMore">
            <div
              ref="panelMenuMore"
              v-if="moreIndex == index"
              class="panelMenuMore"
              :style="morestyle"
            >
              <div
                v-for="(item1, index1) in item.children"
                :key="index1"
                @click.stop="panelClick(item, item1)"
              >
                <div v-if="item1.type != 'line'" class="panelMenu">
                  <div class="icon">
                    <div
                      v-if="item1.icon"
                      class="icon-img"
                      :style="'--icon: url(' + item1.icon + ')'"
                    ></div>
                    <div
                      class="radio"
                      v-else-if="
                        item1.type === 'radio' &&
                        desktopConfig[item.event][item1.event] === item1.value
                      "
                    ></div>
                    <div
                      class="multi"
                      v-else-if="
                        item1.type === 'multi' &&
                        desktopConfig[item.event][item1.event] === true
                      "
                    ></div>
                  </div>
                  <div class="name">{{ item1.name }}</div>
                </div>
                <div v-else class="panelMenuLine"></div>
              </div>
            </div>
          </transition>
        </div>
        <div v-else class="panelMenuLine"></div>
      </div>
    </div>
  </transition>
</template>

<script>
// 桌面配置
import { desktopConfig } from "@/utils/store";
export default {
  name: "WinPanel",

  data() {
    return {
      // 桌面配置
      desktopConfig: {},
      // 是否显示面板
      show: false,
      // 显示面板的 x 个二级菜单
      moreIndex: null,
      // 延迟显示二级菜单倒计时
      moreIndexTimer: null,
      // 鼠标右击 x，y 坐标
      coordinate: null,
      // 面板菜单
      panels: [],
      // 面板位置
      style: null,
      // 面板二级菜单位置
      morestyle: null,
    };
  },

  watch: {
    show(e) {
      if (e === true) {
        setTimeout(() => {
          // 监听面板右击事件
          let panel = this.$refs.panel;
          if (panel) {
            panel.addEventListener("contextmenu", this.rightClick);
            // 设置面板位置
            this.selfSize(panel, 0);
          }
        }, 0);
      } else {
        // 移除面板右击事件监听
        let panel = this.$refs.panel;
        if (panel) {
          panel.removeEventListener("contextmenu", this.rightClick);
        }
      }
    },
  },

  created() {
    // 获取桌面配置
    this.desktopConfig = desktopConfig;
  },

  mounted() {},

  methods: {
    // 面板右击
    rightClick(e) {
      e.stopPropagation();
      e.preventDefault();
      let name = e.srcElement.innerHTML;
      function findObj(item) {
        return item.name === name;
      }
      this.panelClick(this.panels.find(findObj));
    },
    // 设置面板位置
    selfSize(e, type, i) {
      // 初始化样式属性
      let style = {};
      let h = "left";
      let v = "top";
      // 定义窗口尺寸
      let win = {
        w: window.innerWidth,
        h: window.innerHeight,
      };
      // 定义面板尺寸
      let ele = {
        w: e.offsetWidth,
        h: e.offsetHeight + 40,
      };
      // 定义鼠标下 x，y 坐标
      let coord = this.coordinate;
      // 面板位置计算
      if (type === 0) {
        // 计算 X 轴位置
        if (win.w - coord.x > ele.w) {
          h = "left";
          style[h] = coord.x + "px";
        } else {
          h = "right";
          style[h] = win.w - coord.x + "px";
        }
        // 计算 Y 轴位置
        if (win.h - coord.y > ele.h) {
          v = "top";
          style[v] = coord.y + "px";
        } else {
          v = "bottom";
          style[v] = win.h - coord.y + "px";
        }
        this.style = style;
      } else if (type === 1) {
        // 二级面板尺寸
        let panelMore = this.$refs.panelMenuMore;
        let eleMore = {
          w: panelMore[0].offsetWidth,
          h: panelMore[0].offsetWidth,
        };
        // 计算 X 轴位置
        if (win.w - coord.x - eleMore.w - ele.w > 0) {
          h = "left";
          style[h] = ele.w - 10 + "px";
        } else {
          h = "right";
          style[h] = ele.w - 10 + "px";
        }
        // 计算 Y 轴位置
        if (win.h - coord.y > ele.h) {
          if (win.h - coord.y - eleMore.h - (i - 1) * 30 > 0) {
            v = "top";
            style[v] = "0px";
          } else {
            v = "bottom";
            style[v] = "0px";
          }
        } else {
          if (win.h - coord.y + (ele.h - (i - 1) * 30) - eleMore.h > 0) {
            v = "top";
            style[v] = "0px";
          } else {
            v = "bottom";
            style[v] = "0px";
          }
        }
        this.morestyle = style;
      }
    },
    // 面板菜单点击
    panelClick(one, two) {
      if (one) {
        // 二级面板的点击事件
        if (one.children && one.children.length > 0) {
          if (two) {
            let oe = one.event;
            let te = two.event;
            let v = two.value;
            // 各个事件的相关逻辑处理
            if (two.type === "radio") {
              desktopConfig[oe][te] = v;
            } else if (two.type === "multi") {
              desktopConfig[oe][te] = !desktopConfig[oe][te];
            } else if (two.type === "way") {
              desktopConfig[oe][te] = desktopConfig[oe][te] == v ? null : v;
            } else if (two.type === "event") {
              console.log(te);
            }
          }
        }
        // 一级面板的点击事件
        else {
          let v = one.value;
          let e = one.event;
          if (v === "brush") {
            desktopConfig.brush = new Date().getTime();
          }
        }
        this.close();
      }
    },
    // 面板菜单鼠标移动事件（控制二级面板的显隐）
    panelHover(type, e, i) {
      if (e.children) {
        // 清除延迟显示二级菜单倒计时
        clearTimeout(this.moreIndexTimer);
        if (type == 0) {
          // 显示二级面板位置
          this.moreIndexTimer = setTimeout(() => {
            this.moreIndex = i;
            setTimeout(() => {
              // 计算二级面板位置
              let panel = this.$refs.panel;
              this.selfSize(panel, 1, i);
            }, 0);
          }, 300);
        } else {
          // 关闭二级面板
          this.moreIndexTimer = setTimeout(() => {
            this.moreIndex = null;
          }, 300);
        }
      }
    },
    // 关闭面板
    close() {
      clearTimeout(this.moreIndexTimer);
      // 移除面板右击事件监听
      let panel = this.$refs.panel;
      if (panel) {
        panel.removeEventListener("contextmenu", this.rightClick);
      }
      //   初始化面板
      this.show = false;
      this.moreIndex = null;
    },
  },
};
</script>

<style lang="less" scoped>
// 面板列表图标
@icon: var(--icon);

.WinPanel-enter-active {
  transition: opacity 0.2s, transform 0.25s;
}
.WinPanel-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}

.WinPanel-enter {
  opacity: 0;
  transform: scale(0.9);
}

.WinPanel-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.WinPanel {
  padding: 5px;
  position: fixed;
  z-index: 10000;
  background: #eeeeee;
  border: 0.1px solid #bbbbbb;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(153, 153, 153, 0.5);
  box-sizing: border-box;
  user-select: none;
  cursor: default;

  .panelMenu {
    position: relative;
    padding: 0 5px;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: all 0.3s;
    box-sizing: border-box;

    .icon {
      width: 20px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-img {
        width: 20px;
        height: 20px;
        background-image: @icon;
        background-size: 100% 100%;
      }

      .radio {
        width: 6px;
        height: 6px;
        background: #313131;
        border-radius: 50%;
      }

      .multi {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .multi::after {
        position: absolute;
        left: calc(50% - 7px);
        top: calc(50% - 6px);
        content: "";
        width: 14px;
        height: 8px;
        box-sizing: border-box;
        border-left: 1px solid #313131;
        border-bottom: 1px solid #313131;
        transform: rotate(-45deg);
      }
    }

    .name {
      padding-right: 50px;
      margin-left: 5px;
      width: min-content;
      flex: 1;
      font-size: 12px;
      white-space: nowrap;
      text-align: left;
    }

    .panelMenuMore-enter-active,
    .panelMenuMore-leave-active {
      transition: opacity 0.2s, transform 0.2s;
    }

    .panelMenuMore-enter {
      opacity: 0;
      transform: scale(0.9);
    }

    .panelMenuMore-leave-to {
      opacity: 0;
      transform: scale(0.9);
    }

    .panelMenuMore {
      padding: 5px;
      position: absolute;
      z-index: 1;
      background: #eeeeee;
      border: 0.1px solid #bbbbbb;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(153, 153, 153, 0.5);
      box-sizing: border-box;
    }
  }

  .panelMenuLine {
    margin: 5px 0;
    width: 100%;
    height: 1px;
    background: #999999;
  }
  .panelMenu:hover {
    background: #ffffff;
  }
}
</style>