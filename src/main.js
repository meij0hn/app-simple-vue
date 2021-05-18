import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.css";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Logout from "./components/Logout.vue";
import Err from "./components/404.vue";
// import InsertTRSoldUnitPerBookcode from "./components/InsertTRSoldUnitPerBookcode.vue";
import CekPaymentOrder from "./components/CekPaymentOrder.vue";
import UnitReserved from "./components/UnitReserved.vue";
import Expire from "./components/Expire.vue";
import Notif from "./components/NotifMidtransToE3.vue";
import Report from "./components/Report.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    {
      path: "*",
      component: Err
    },
    {
      path: "/",
      component: Home
    },
    {
      path: "/logout",
      component: Logout
    },
    // {
    //   path: "/InsertTRSoldUnitPerBookcode",
    //   component: InsertTRSoldUnitPerBookcode
    // },
    {
      path: "/CekPaymentOrder",
      component: CekPaymentOrder
    },
    {
      path: "/UnitReserved",
      component: UnitReserved
    },
    {
      path: "/Expire",
      component: Expire
    },
    {
      path: "/Notif",
      component: Notif
    },
    {
      path: "/Report",
      component: Report
    },
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
