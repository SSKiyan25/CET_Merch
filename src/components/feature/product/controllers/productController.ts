import { ref, watch } from "vue";
import { fetchProduct } from "../models/productModel.ts";
import { DocumentData } from "firebase/firestore";

export function setupProductController(route: any) {
  const product = ref<DocumentData | null | undefined>(null);
  const cache = new Map();
  const loading = ref(true);

  watch(
    () => route.params.id,
    async (newId) => {
      loading.value = true;

      try {
        if (cache.has(newId)) {
          product.value = cache.get(newId);
        } else {
          const fetchedProduct = await fetchProduct(newId);
          product.value = fetchedProduct;
          console.log("fetchedProduct: ", fetchedProduct);
          cache.set(newId, fetchedProduct);
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        console.log("loading: ", loading.value);
        loading.value = false;
      }
    },
    { immediate: true }
  );

  return { product, loading };
}
