<template>
  <application
    :level="level"
    @level="levelFunction"
    @close="close"
    :z-index="zIndex"
    :default-header="config"
    >789</application
  >
</template>

<script>
export default {
  name: "AppThisComputer",

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
        icon: require("@/assets/application/cdn.png"),
        name: "",
        app: "AppGames",
      },
    };
  },

  mounted() {},

  methods: {
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
</style>