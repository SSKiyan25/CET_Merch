import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../components/feature/dashboard/views/DashboardView.vue";
import Login from "../components/feature/authentication/views/LoginView.vue";
import Signup from "../components/feature/authentication/views/SignupView.vue";
import AdminDashboard from "../components/admin/dashboard/views/AdminDashboard.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/admin",
    name: "adminDasboard",
    component: AdminDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
