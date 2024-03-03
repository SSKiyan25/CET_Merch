import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../components/feature/dashboard/views/DashboardView.vue";
import Login from "../components/feature/authentication/views/LoginView.vue";
import Signup from "../components/feature/authentication/views/SignupView.vue";
import AdminDashboard from "../components/admin/dashboard/views/AdminDashboard.vue";
import AdminProducts from "../components/admin/dashboard/views/AdminProducts.vue";
import AdminAddProduct from "../components/admin/dashboard/views/products/AddProduct.vue";
import AdminEditProduct from "../components/admin/dashboard/views/products/EditProduct.vue";
import { auth } from "../firebase/init.ts";

function requireAdminAuth(next: any) {
  auth.onAuthStateChanged((user) => {
    if (user && user.email === "admin@gmail.com") {
      next();
    } else {
      next({ name: "dashboard" });
    }
  });
}

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
    name: "adminDashboard",
    component: AdminDashboard,
    beforeEnter: requireAdminAuth,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/products",
    name: "adminProducts",
    component: AdminProducts,
    beforeEnter: requireAdminAuth,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/products/addproduct",
    name: "adminAddProduct",
    component: AdminAddProduct,
    beforeEnter: requireAdminAuth,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/products/editproduct/:id",
    name: "adminEditProduct",
    component: AdminEditProduct,
    beforeEnter: requireAdminAuth,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
