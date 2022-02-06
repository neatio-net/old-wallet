import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Create from "../views/Create.vue";
import CreatePK from "../views/CreatePK.vue";
import CreateKS from "../views/CreateKS.vue";
import EDTool from "../views/EDTool.vue";
import Encrypt from "../views/Encrypt.vue";
import Decrypt from "../views/Decrypt.vue";
import Send from "../views/Send.vue";
import SendPK from "../views/SendPK.vue";
import SendKS from "../views/SendKS.vue";
import Staking from "../views/Staking.vue";
import StakingPK from "../views/StakingPK.vue";
import StakingKS from "../views/StakingKS.vue";
import Terms from "../views/Terms.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/create",
    name: "Create",
    component: Create
  },
  {
    path: "/create-pk",
    name: "CreatePK",
    component: CreatePK
  },
  {
    path: "/create-ks",
    name: "CreateKS",
    component: CreateKS
  },
  {
    path: "/edtool",
    name: "EDTool",
    component: EDTool
  },
  {
    path: "/encrypt",
    name: "Encrypt",
    component: Encrypt
  },
  {
    path: "/decrypt",
    name: "Decrypt",
    component: Decrypt
  },
  {
    path: "/send",
    name: "Send",
    component: Send
  },
  {
    path: "/send-pk",
    name: "SendPK",
    component: SendPK
  },
  {
    path: "/send-ks",
    name: "SendKS",
    component: SendKS
  },
  {
    path: "/staking",
    name: "Staking",
    component: Staking
  },
  {
  path: "/staking-pk",
  name: "StakingPK",
  component: StakingPK
  },
  {
    path: "/staking-ks",
    name: "StakingKS",
    component: StakingKS
    },
  {
    path: "/terms",
    name: "Terms",
    component: Terms
  },
  
];

const router = new VueRouter({
  mode : 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  
});

export default router;
