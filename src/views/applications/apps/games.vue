<template>
  <application
    :level="level"
    @level="levelFunction"
    @close="close"
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
</template>

<script>
export default {
  name: "AppGames",

  props: {
    level: {
      default: "max",
    },
    zIndex: {
      default: 5,
    },
  },

  data() {
    return {
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

  mounted() {
    // 判断 iframe 是否加载完成
    this.load();
    // lottie 动画
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

  methods: {
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
    // 前置程序
    levelFunction() {
      this.$emit("level");
    },
    // 关闭程序
    close(e) {
      this.$emit("close", e);
    },
  },
};
</script>

<style lang="less" scoped>
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