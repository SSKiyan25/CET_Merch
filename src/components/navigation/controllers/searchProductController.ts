import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  fetchProducts,
  fetchProductById,
  Product,
} from "../models/searchProductModel";

export const setup = () => {
  const route = useRoute();
  const products = ref<Product[]>([]);
  const product = ref<Product | null>(null);
  const isLoading = ref(false);

  onMounted(async () => {
    isLoading.value = true;
    try {
      products.value = await fetchProducts();
      if (route.params.id) {
        const id = route.params.id as string;
        product.value = await fetchProductById(id);
      }
    } finally {
      isLoading.value = false;
    }
  });

  return { products, product, isLoading };
};
