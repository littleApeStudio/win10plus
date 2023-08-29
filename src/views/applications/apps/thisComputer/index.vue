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
        icon: require("@/assets/application/cdn.png"),
        name: "此电脑",
        app: "computer",
      },
    };
  },

  methods: {
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