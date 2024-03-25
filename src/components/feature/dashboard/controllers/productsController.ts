import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { useRoute } from "vue-router";
import { fetchProducts, fetchProductById } from "../models/productsModel.ts";

export const setup = () => {
  const route = useRoute();
  const products = ref<any[]>([]);
  const product = ref<any>(null);

  onMounted(async () => {
    initFlowbite();
    products.value = await fetchProducts();
    // Check if route has id parameter
    if (route.params.id) {
      const id = route.params.id as string;
      product.value = await fetchProductById(id);
    }
  });
  return { products, product };
};
