<template>
  <div
    ref="win10plus"
    class="win10plus"
    :style="'--bg:' + background.src + ';--mode:' + background.mode"
    @click="none"
  >
    <div class="desktop">
      <desktop></desktop>
    </div>
    <div class="statusBar">
      <statusBar></statusBar>
    </div>
  </div>
</template>

<script>
import desktop from "@/views/components/desktop.vue";
import statusBar from "@/views/components/statusBar.vue";
export default {
  name: "TestIndex",

  components: {
    desktop,
    statusBar,
  },

  data() {
    return {
      background: {
        src: "url(" + require("@/assets/backgrounds/h.jpg") + ")",
        mode: "cover",
      },
    };
  },

  created() {},

  mounted() {
    let win = this.$refs.win10plus;
    win.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  },

  methods: {
    none() {
      this.$panel({
        hide: true,
      });
    },
  },

  beforeDestroy() {
    let win = this.$refs.win10plus;
    win.removeEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  },
};
</script>

<style lang="less" scoped>
// 背景图片
@bg: var(--bg);
@mode: var(--mode);

.win10plus {
  width: 100vw;
  height: 100vh;
  background-image: @bg;
  background-size: @mode;
  background-repeat: no-repeat;

  .desktop {
    width: 100%;
    height: calc(100% - 40px);
    flex: 1;
  }

  .statusBar {
    position: fixed;
    z-index: 9999;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
  }
}
</style>