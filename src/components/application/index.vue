<template>
  <div
    ref="application"
    :class="
      maximize
        ? minimize.is
          ? 'application application-full application-min'
          : 'application application-full'
        : minimize.is
        ? 'application application-min'
        : 'application'
    "
    style="top: 25%; left: 25%"
    :style="
      winAnimation
        ? 'transition: all 0.35s;z-index: ' +
          zIndex +
          ';--minleft:' +
          minimize.left
        : 'z-index: ' + zIndex + ';--minleft: ' + minimize.left
    "
  >
    <div class="resize">
      <div ref="T" class="resize-top"></div>
      <div ref="L" class="resize-left"></div>
      <div ref="B" class="resize-bottom"></div>
      <div ref="R" class="resize-right"></div>
      <div ref="TL" class="resize-topLeft"></div>
      <div ref="TR" class="resize-topRight"></div>
      <div ref="BL" class="resize-bottomLeft"></div>
      <div ref="BR" class="resize-bottomRight"></div>
      <div ref="LT" class="resize-leftTop"></div>
      <div ref="LB" class="resize-leftBottom"></div>
      <div ref="RT" class="resize-rightTop"></div>
      <div ref="RB" class="resize-rightBottom"></div>
    </div>
    <div class="contrainer">
      <div class="header" ref="header">
        <!-- 默认头部 -->
        <div v-if="defaultHeader" class="default-header">
          <div class="header-title" @mousedown="level">
            <div
              class="icon"
              :style="'--appIcon: url(' + defaultHeader.icon + ')'"
            ></div>
            <div class="name">{{ defaultHeader.name }}</div>
          </div>
          <div
            class="header-control"
            @mousedown.stop="moving = false"
            @click="level"
          >
            <div class="mini" @click.stop="mins">
              <span class="iconfont">&#xea6a;</span>
            </div>
            <div class="big" @click.stop="maximize = !maximize">
              <span v-if="maximize" class="iconfont">&#xea6b;</span>
              <span v-else class="iconfont">&#xe60d;</span>
            </div>
            <div class="close" @click.stop="close">
              <span class="iconfont">&#xe86d;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div v-if="resizing || moving" class="mark"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "application",

  props: {
    // 层级
    zIndex: {
      default: 5,
    },
    // 默认头部
    defaultHeader: {
      default: null,
    },
    // 最小化
    minimize: {
      default: () => {
        return {
          is: false,
          left: null,
        };
      },
    },
  },

  data() {
    return {
      // 是否调整窗口大小
      resizing: false,
      // 哪个元素
      resizer: null,
      sizeInit: {
        x: null,
        y: null,
      },
      // 最大化
      maximize: false,
      // 是否移动窗口
      moving: false,
      initPosition: {
        x: null,
        y: null,
      },
      // 是否添加动画
      winAnimation: false,
    };
  },

  watch: {
    maximize(e) {
      this.winAnimation = true;
      this.$emit("level");
      setTimeout(() => {
        this.winAnimation = false;
      }, 350);
    },
    "minimize.is"(e) {
      this.winAnimation = true;
      this.$emit("level");
      setTimeout(() => {
        this.winAnimation = false;
      }, 350);
    },
  },

  mounted() {
    // 监听鼠标右键事件
    let application = this.$refs.application;
    application.addEventListener("contextmenu", this.applicationMenu);
    // 监听尺寸变化元素
    // 监听鼠标滑动
    window.addEventListener("mousemove", this.startMove);
    // 监听鼠标抬起
    window.addEventListener("mouseup", this.endMove);
    // 左
    this.getRef("L", (e) => {
      this.resizing = true;
      this.resizer = "L";
      this.setInit(e);
    });
    // 上
    this.getRef("T", (e) => {
      this.resizing = true;
      this.resizer = "T";
      this.setInit(e);
    });
    // 右
    this.getRef("R", (e) => {
      this.resizing = true;
      this.resizer = "R";
      this.setInit(e);
    });
    // 下
    this.getRef("B", (e) => {
      this.resizing = true;
      this.resizer = "B";
      this.setInit(e);
    });
    // 左上
    this.getRef("TL", (e) => {
      this.resizing = true;
      this.resizer = "TL";
      this.setInit(e);
    });
    this.getRef("LT", (e) => {
      this.resizing = true;
      this.resizer = "LT";
      this.setInit(e);
    });
    // 右上
    this.getRef("TR", (e) => {
      this.resizing = true;
      this.resizer = "TR";
      this.setInit(e);
    });
    this.getRef("LB", (e) => {
      this.resizing = true;
      this.resizer = "LB";
      this.setInit(e);
    });
    // 左下
    this.getRef("RT", (e) => {
      this.resizing = true;
      this.resizer = "RT";
      this.setInit(e);
    });
    this.getRef("BL", (e) => {
      this.resizing = true;
      this.resizer = "BL";
      this.setInit(e);
    });
    // 右下
    this.getRef("RB", (e) => {
      this.resizing = true;
      this.resizer = "RB";
      this.setInit(e);
    });
    this.getRef("BR", (e) => {
      this.resizing = true;
      this.resizer = "BR";
      this.setInit(e);
    });
    // 监听窗口头部
    this.getRef("header", (e) => {
      if (!this.maximize) {
        this.moving = true;
        let dom = this.$refs.application;
        let initPosition = {
          x: "calc(" + e.clientX + "px - " + dom.style.left + ")",
          y: "calc(" + e.clientY + "px - " + dom.style.top + ")",
        };
        this.initPosition = initPosition;
      }
    });
  },

  methods: {
    // 前置程序
    level() {
      this.$emit("level");
    },
    // 关闭程序
    close() {
      this.$emit("close");
    },
    // 小化程序
    mins() {
      this.$emit("mins");
    },
    // 监听鼠标右键事件
    applicationMenu(e, f) {
      // 阻止冒泡
      e.stopPropagation();
      // 阻止默认事件
      e.preventDefault();
    },
    // 封装获取dom元素的函数
    getRef(e, f) {
      let dom = this.$refs[e];
      dom.addEventListener("mousedown", f);
      dom.addEventListener("mouseup", this.resetResize);
    },
    // 设置初始大小
    setInit(e) {
      let dom = this.$refs.application;
      this.sizeInit = {
        x: e.clientX,
        y: e.clientY,
        w: dom.clientWidth,
        h: dom.clientHeight,
        l: dom.style.left,
        t: dom.style.top,
      };
    },
    // 取消调整
    resetResize() {
      this.resizing = false;
      this.resizer = null;
      this.sizeInit = {
        x: null,
        y: null,
      };
      this.moving = false;
      this.initPosition = {
        x: null,
        y: null,
      };
    },
    // 监听鼠标滑动
    startMove(e) {
      e.stopPropagation();
      let x = e.clientX;
      let y = e.clientY;
      let resizing = this.resizing;
      let resizer = this.resizer;
      let sizeInit = this.sizeInit;
      let moving = this.moving;
      if (resizing) {
        switch (resizer) {
          // 左
          case "L":
            this.setSize(-(x - sizeInit.x), null, resizer);
            break;
          // 上
          case "T":
            this.setSize(null, -(y - sizeInit.y), resizer);
            break;
          // 右
          case "R":
            this.setSize(x - sizeInit.x, null, resizer);
            break;
          // 下
          case "B":
            this.setSize(null, y - sizeInit.y, resizer);
            break;
          // 左上
          case "TL":
          case "LT":
            this.setSize(-(x - sizeInit.x), -(y - sizeInit.y), resizer);
            break;
          // 右上
          case "TR":
          case "LB":
            this.setSize(x - sizeInit.x, -(y - sizeInit.y), resizer);
            break;
          // 左下
          case "RT":
          case "BL":
            this.setSize(-(x - sizeInit.x), y - sizeInit.y, resizer);
            break;
          // 右下
          case "RB":
          case "BR":
            this.setSize(x - sizeInit.x, y - sizeInit.y, resizer);
            break;
        }
      }
      if (moving) {
        let dom = this.$refs.application;
        let initPosition = this.initPosition;
        let X = "calc(" + x + "px - " + initPosition.x + ")";
        let Y = "calc(" + y + "px - " + initPosition.y + ")";
        this.setPosition(dom, "WIN", Y, X);
      }
    },
    // 设置宽高
    setSize(w, h, own) {
      let sizeInit = this.sizeInit;
      let dom = this.$refs.application;
      // 设置宽度
      if (w) {
        if (w < 0) {
          if (-w + 500 < sizeInit.w) {
            dom.style.width = sizeInit.w + w + "px";
            this.setPosition(
              dom,
              own,
              null,
              "calc(" + sizeInit.l + " - " + w + "px)"
            );
          }
        } else {
          dom.style.width = sizeInit.w + w + "px";
          this.setPosition(
            dom,
            own,
            null,
            "calc(" + sizeInit.l + " - " + w + "px)"
          );
        }
      }
      // 设置高度
      if (h) {
        if (h < 0) {
          if (-h + 300 < sizeInit.h) {
            dom.style.height = sizeInit.h + h + "px";
            // 设置位置
            this.setPosition(
              dom,
              own,
              "calc(" + sizeInit.t + " - " + h + "px)",
              null
            );
          }
        } else {
          dom.style.height = sizeInit.h + h + "px";
          // 设置位置
          this.setPosition(
            dom,
            own,
            "calc(" + sizeInit.t + " - " + h + "px)",
            null
          );
        }
      }
    },
    // 设置位置
    setPosition(dom, own, top, left) {
      switch (own) {
        case "L":
        case "T":
        case "TL":
        case "LT":
          if (top) {
            dom.style.top = top;
          }
          if (left) {
            dom.style.left = left;
          }
          break;
        case "TR":
        case "LB":
          if (top) {
            dom.style.top = top;
          }
          break;
        case "RT":
        case "BL":
          if (left) {
            dom.style.left = left;
          }
          break;
        case "WIN":
          if (left) {
            dom.style.left = left;
          }
          if (top) {
            dom.style.top = top;
          }
          break;
      }
    },
    // 监听鼠标抬起
    endMove(e) {
      e.stopPropagation();
      this.resizing = false;
      this.resizer = null;
      this.sizeInit = {
        x: null,
        y: null,
      };
      this.moving = false;
      this.initPosition = {
        x: null,
        y: null,
      };
    },
  },
  beforeDestroy() {
    // 清除相关监听事件
    window.removeEventListener("mousemove", this.startMove);
    window.removeEventListener("mouseup", this.endMove);
  },
};
</script>

<style lang="less" scoped>
.application {
  position: fixed;
  width: 50%;
  height: 50%;
  user-select: none;
  cursor: default;

  // 设置拖动元素
  .resize {
    .resize-top,
    .resize-bottom {
      position: absolute;
      z-index: 2;
      left: 20px;
      width: calc(100% - 40px);
      height: 5px;
      cursor: ns-resize;
    }

    .resize-top {
      top: 0;
    }

    .resize-bottom {
      bottom: 0;
    }

    .resize-left,
    .resize-right {
      position: absolute;
      z-index: 2;
      top: 20px;
      width: 5px;
      height: calc(100% - 40px);
      cursor: ew-resize;
    }

    .resize-left {
      left: 0;
    }

    .resize-right {
      right: 0;
    }

    .resize-topLeft,
    .resize-topRight {
      position: absolute;
      z-index: 2;
      top: 0px;
      width: 20px;
      height: 5px;
    }

    .resize-topLeft {
      left: 0;
      cursor: nwse-resize;
    }

    .resize-topRight {
      right: 0;
      cursor: nesw-resize;
    }

    .resize-bottomLeft,
    .resize-bottomRight {
      position: absolute;
      z-index: 2;
      bottom: 0px;
      width: 20px;
      height: 5px;
    }

    .resize-bottomLeft {
      left: 0;
      cursor: nesw-resize;
    }

    .resize-bottomRight {
      right: 0;
      cursor: nwse-resize;
    }

    .resize-leftTop,
    .resize-leftBottom {
      position: absolute;
      z-index: 2;
      top: 0px;
      width: 5px;
      height: 20px;
    }

    .resize-leftTop {
      left: 0;
      cursor: nwse-resize;
    }

    .resize-leftBottom {
      right: 0;
      cursor: nesw-resize;
    }

    .resize-rightTop,
    .resize-rightBottom {
      position: absolute;
      z-index: 2;
      bottom: 0px;
      width: 5px;
      height: 20px;
    }

    .resize-rightTop {
      left: 0;
      cursor: nesw-resize;
    }

    .resize-rightBottom {
      right: 0;
      cursor: nwse-resize;
    }
  }

  // app

  .contrainer {
    position: absolute;
    z-index: 1;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(100, 100, 100, 0.8);
    display: flex;
    flex-direction: column;

    .header {
      width: 100%;

      .default-header {
        @appIcon: var(--appIcon);
        padding: 0 0 0 8px;
        width: 100%;
        height: 35px;
        background: #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        .header-title {
          width: 0;
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .icon {
            width: 20px;
            height: 20px;
            background-image: @appIcon;
            background-size: 100% 100%;
          }

          .name {
            margin-left: 8px;
            width: max-content;
            height: 100%;
            color: #000000;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
        }

        .header-control {
          width: max-content;
          height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;

          .mini,
          .big,
          .close {
            width: 50px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            transition: background 0.3s;

            span {
              font-size: 14px;
              font-family: "appHeader";
              color: #000000;
              font-weight: bold;
              transition: color 0.3s;
            }
          }
          .mini:hover,
          .big:hover {
            background: #cccccc;
          }
          .close:hover {
            background: #e42f2f;

            span {
              color: #ffffff;
            }
          }
        }
      }
    }

    .content {
      position: relative;
      width: 100%;
      height: 0;
      flex: 1;
      background: #eeeeee;

      // 设置蒙版----放置app框架引用iframe后无法调整大小
      .mark {
        position: absolute;
        z-index: 2;
        top: 5px;
        left: 5px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        cursor: default;
      }
    }
  }
}

.application-full {
  z-index: 10;
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  left: 0 !important;

  .resize-top,
  .resize-bottom,
  .resize-left,
  .resize-right,
  .resize-topLeft,
  .resize-topRight,
  .resize-bottomLeft,
  .resize-bottomRight,
  .resize-leftTop,
  .resize-leftBottom,
  .resize-rightTop,
  .resize-rightBottom {
    display: none !important;
  }

  .contrainer {
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: calc(100% - 40px) !important;
    border-radius: 0px !important;
  }
}

.application-min {
  width: 0 !important;
  height: 0 !important;
  top: calc(100vh - 40px) !important;
  left: var(--minleft) !important;
  border-radius: 50% !important;

  .resize-top,
  .resize-bottom,
  .resize-left,
  .resize-right,
  .resize-topLeft,
  .resize-topRight,
  .resize-bottomLeft,
  .resize-bottomRight,
  .resize-leftTop,
  .resize-leftBottom,
  .resize-rightTop,
  .resize-rightBottom {
    display: none !important;
  }
}
</style>