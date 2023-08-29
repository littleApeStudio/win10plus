<template>
  <transition name="open">
    <application
      v-if="open"
      @close="close"
      @mins="mins"
      :minimize="minimize"
      :z-index="zIndex"
      :default-header="config"
    >
      <div class="app">
        <iframe
          ref="iframe"
          class="iframe"
          src="https://lab.ur1.fun/FCGames/#/"
        ></iframe>
        <div v-if="loading" class="loading">
          <div class="icon" id="loading"></div>
        </div>
      </div>
    </application>
  </transition>
</template>

<script>
// vuex -- store
import { openedApp } from "@/utils/store";
export default {
  name: "AppGames",

  data() {
    return {
      // 是否打开
      open: false,
      // 是否最小化
      minimize: {},
      // 层级
      zIndex: 5,
      // 应用程序配置
      config: {
        icon: require("@/assets/application/game.png"),
        name: "游戏机",
        app: "AppGames",
      },
      // 是否显示加载
      loading: true,
    };
  },

  watch: {
    open(e) {
      if (e === true) {
        setTimeout(() => {
          // 判断 iframe 是否加载完成
          this.load();
          // lottie 动画
          this.startLottie();
        }, 0);
      }
    },
  },

  methods: {
    // lottie 动画
    startLottie() {
      this.$nextTick(() => {
        this.$lottie.loadAnimation({
          container: document.getElementById("loading"), // 包含动画的dom元素
          renderer: "svg", // 渲染出来的是什么格式
          loop: true, // 循环播放
          autoplay: true, // 自动播放
          animationData: require(`@/assets/lottie/loading1.json`), // 动画json的本地路径
          // path:''//网络json地址, 选择 animationData 后，则不用path了，
        });
      });
    },
    // 判断 iframe 是否加载完成
    load() {
      this.loading = true;
      const iframe = this.$refs.iframe;
      if (iframe.attachEvent) {
        // IE
        iframe.attachEvent("onload", () => {
          this.loading = false;
        });
      } else {
        // 非IE
        iframe.onload = () => {
          this.loading = false;
        };
      }
    },
    // 小化程序
    async mins() {
      // 获取当前打开的应用程序的下标
      let index = await this.$appConfig.getOpenedIndex(this.config.app);
      let left = (index + 2) * 48 + "px";
      this.minimize = {
        is: true,
        left: left,
      };
      this.$appConfig.topTabIcon("games", true);
    },
    // 关闭程序
    async close() {
      // 获取当前打开的应用程序的下标
      let index = await this.$appConfig.getOpenedIndex(this.config.app);
      this.$appConfig.close(index);
      this.open = false;
    },
  },
};
</script>

<style lang="less" scoped>
.open-enter-active,
.open-leave-active {
  transition: all 0.3s ease-in-out;
}

.open-enter,
.open-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.app {
  position: relative;
  width: 100%;
  height: 100%;

  .iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    background: #131313;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 20%;
      background: none;
    }
  }
}
</style>