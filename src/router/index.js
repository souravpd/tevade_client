import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import("../views/SignUpView.vue"),
  },
  {
    path: "/login",
    name: "Log In",
    component: () => import("../views/LogInView.vue"),
  },
  {
    path: "/logout",
    name: "Log Out",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/LogOutView.vue"),
  },
  {
    path: "/myBank",
    name: "My Bank",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/myBankView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.access_token) {
      next({ name: "Log In" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
