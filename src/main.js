import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
// 字体图标
import "@/iconfont/index.css"
// 组件
import install from "@/components/index"
Vue.use(install)
// 应用程序
import apps from "@/views/applications/index"
Vue.use(apps)

// Lottie动画
import lottie from "lottie-web";
Vue.prototype.$lottie = lottie;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
