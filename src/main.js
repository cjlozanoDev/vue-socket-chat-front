import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./resources/css/main.css";

import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://192.168.1.50:3000/",
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
