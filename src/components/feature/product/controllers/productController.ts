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

    // Initialize lowestPrice to Infinity. This is a special value in JavaScript that's greater than any other number.
    // We use it here so that any price we compare it to at first will be lower.
    let lowestPrice = Infinity;

    // Iterate over each size in the product
    for (const sizeName in product.value.sizes) {
      const sizeArray = product.value.sizes[sizeName];

      // Iterate over each item in the size array
      for (const sizeItem of sizeArray) {
        // Check if price is not zero and is less than the current lowestPrice
        if (
          Number(sizeItem.price) > 0 &&
          Number(sizeItem.price) < lowestPrice
        ) {
          // If it is, update lowestPrice to this new lower price
          lowestPrice = Number(sizeItem.price);
        }
      }
    }

    // After checking all prices, if lowestPrice is still Infinity, it means we didn't find any price > 0.
    // In this case, we return 0. Otherwise, we return the lowest price we found.
    return isFinite(lowestPrice) ? lowestPrice : 0;
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
