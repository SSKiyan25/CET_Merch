import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { useRoute } from "vue-router";
import {
  fetchBestSellingProducts,
  fetchProductById,
} from "../models/productsModel";

export const setup = () => {
  const route = useRoute();
  const products = ref<any[]>([]);
  const product = ref<any>(null);
  const isLoading = ref(true);

  onMounted(async () => {
    initFlowbite();
    try {
      products.value = await fetchBestSellingProducts();
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
