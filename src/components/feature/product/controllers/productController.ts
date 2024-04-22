import { ref, watch, computed } from "vue";
import { fetchProduct } from "../models/productModel";
import { Product } from "../models/productsModel";

export function setupProductController(route: any) {
  const product = ref<Product | null>(null);
  const cache = new Map();
  const loading = ref(true);

  const displayPrice = computed(() => {
    // Check if product.value is defined
    if (!product.value) return 0;

    // Iterate over each size in the product
    for (const sizeName in product.value.sizes) {
      const sizeArray = product.value.sizes[sizeName];

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
  });

  watch(
    () => route.params.id,
    async (newId) => {
      loading.value = true;

      try {
        if (cache.has(newId)) {
          product.value = cache.get(newId) as Product | null;
        } else {
          const fetchedProduct = await fetchProduct(newId);
          product.value = fetchedProduct as Product | null;
          cache.set(newId, fetchedProduct);
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        loading.value = false;
      }
    },
    { immediate: true }
  );

  return { product, loading, displayPrice };
}
