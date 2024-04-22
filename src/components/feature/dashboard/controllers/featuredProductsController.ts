import { onMounted, ref, computed } from "vue";
import { initFlowbite } from "flowbite";
import { useRoute } from "vue-router";
import {
  fetchFeaturedProducts,
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
      const fetchedProducts = await fetchFeaturedProducts();
      products.value = fetchedProducts.map((product) => ({
        ...product,
        displayPrice: computed(() => {
          // Iterate over each size in the product
          for (const sizeName in product.sizes) {
            const sizeArray = product.sizes[sizeName];

            // Iterate over each item in the size array
            for (const sizeItem of sizeArray) {
              // Check if remaining_stocks is not zero
              if (Number(sizeItem.remaining_stocks) > 0) {
                // Return the price of this item
                return sizeItem.price;
              }
            }
          }
          // If no size has non-zero remaining_stocks, return 0
          return 0;
        }),
      }));
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
