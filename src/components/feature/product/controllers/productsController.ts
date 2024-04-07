import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import {
  fetchProducts,
  fetchProductById,
  Product,
  fetchUser,
  updateProduct,
  updateUser,
} from "../models/productsModel";

interface User {
  lastViewed: Record<string, number>;
}

export const setup = () => {
  const route = useRoute();
  const products = ref<Product[]>([]);
  const product = ref<Product | null>(null);
  const isLoading = ref(false);
  const user = ref<User | null>(null);

  onMounted(async () => {
    isLoading.value = true;
    try {
      products.value = await fetchProducts();
      user.value = (await fetchUser()) as User;
      if (route.params.id) {
        const id = route.params.id as string;
        product.value = await fetchProductById(id);
      }
    } finally {
      isLoading.value = false;
    }
  });

  const incrementViewCount = async (product: Product) => {
    if (!user.value) {
      console.error("User is not defined");
      return;
    }

    const lastViewed = user.value.lastViewed[product.id];
    const now = Date.now();

    if (!lastViewed || now - lastViewed >= 12 * 60 * 60 * 1000) {
      product.views += 1;
      user.value.lastViewed[product.id] = now;

      await updateProduct(product);
      await updateUser(user.value);
    }
  };

  onBeforeRouteLeave((to) => {
    if (to.name === "Product") {
      const product = products.value.find((p) => p.id === to.params.id);
      if (product) {
        incrementViewCount(product);
      }
    }
  });

  return { products, product, isLoading, incrementViewCount };
};
