import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import LaunchPage from "../components/feature/dashboard/views/LaunchPageView.vue";
import Login from "../components/feature/authentication/views/LoginView.vue";
import Signup from "../components/feature/authentication/views/SignupView.vue";
import AdminDashboard from "../components/admin/dashboard/views/AdminDashboard.vue";
import AdminProducts from "../components/admin/dashboard/views/AdminProducts.vue";
import AdminAddProduct from "../components/admin/dashboard/views/products/AddProduct.vue";
import AdminEditProduct from "../components/admin/dashboard/views/products/EditProduct.vue";
import AdminOrders from "../components/admin/orders/views/AdminOrders.vue";
import AdminInbox from "../components/admin/inbox/views/InboxPage.vue";
import Product from "../components/feature/product/views/ProductView.vue";
import ConfirmOrder from "../components/feature/user/userOrder/views/ConfirmationOrderView.vue";
import SubmitOrder from "../components/feature/user/userOrder/views/SubmitOrderView.vue";
import ContactUs from "../components/feature/contactUs/views/ContactUsView.vue";
import UserDashboard from "../components/feature/user/userDashboard/views/UserDashboardView.vue";
import UserOrders from "../components/feature/user/userDashboard/views/UserOrdersView.vue";
import { ref } from "vue";
import { auth, db } from "../firebase/init.ts";
import { DocumentData, getDoc, doc } from "firebase/firestore";

function requireAdminAuth(
  _: RouteLocationNormalized,
  __: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      next();
    } else {
      next({ name: "launchPage" });
    }
  });
}

function requireAuth(
  _: RouteLocationNormalized,
  __: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userData = ref<DocumentData | null>(null);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        userData.value = docSnap.data();
      } else {
        console.log("No such document!");
      }
      next();
    } else {
      next({ name: "login" });
    }
  });
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "launchPage",
    component: LaunchPage,
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
  {
    path: "/admin/orders",
    name: "adminOrders",
    component: AdminOrders,
    beforeEnter: requireAdminAuth,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/inbox",
    name: "adminInbox",
    component: AdminInbox,
    beforeEnter: requireAdminAuth,
    meta: { requiresAdmin: true },
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product,
  },
  {
    path: "/confirmOrder/:id",
    name: "confirmOrder",
    component: ConfirmOrder,
    beforeEnter: requireAuth,
  },
  {
    path: "/submitorder/:id",
    name: "submitOrder",
    component: SubmitOrder,
    beforeEnter: requireAuth,
  },
  {
    path: "/contactUs",
    name: "contactUs",
    component: ContactUs,
  },
  {
    path: "/dashboard",
    name: "userDashboard",
    component: UserDashboard,
    beforeEnter: requireAuth,
  },
  {
    path: "/dashboard/orders",
    name: "userOrders",
    component: UserOrders,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
