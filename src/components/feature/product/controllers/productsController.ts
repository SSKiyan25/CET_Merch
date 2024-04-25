import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  fetchProducts,
  fetchProductById,
  Product,
  fetchUser,
  updateProduct,
  updateUser,
  fetchSellerProducts,
} from "../models/productsModel";

interface User {
  lastViewed: Record<string, number>;
}
interface ProductWithDisplayPrice extends Product {
  displayPrice: ReturnType<typeof computed>;
}

export const setup = () => {
  const route = useRoute();
  const products = ref<ProductWithDisplayPrice[]>([]);
  const product = ref<Product | null>(null);
  const isLoading = ref(false);
  const user = ref<User | null>(null);
  const sellerProducts = ref<ProductWithDisplayPrice[]>([]);

  onMounted(async () => {
    isLoading.value = true;
    try {
      const fetchedProducts = await fetchProducts();
      products.value = fetchedProducts.map((product) => ({
        ...product,
        displayPrice: computed(() => {
          // Initialize lowestPrice to Infinity. This is a special value in JavaScript that's greater than any other number.
          // We use it here so that any price we compare it to at first will be lower.
          let lowestPrice = Infinity;

          // Iterate over each size in the product
          for (const sizeName in product.sizes) {
            const sizeArray = product.sizes[sizeName];

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
        }),
      }));
      user.value = (await fetchUser()) as User;
      if (route.params.id) {
        const id = route.params.id as string;
        product.value = await fetchProductById(id);
        const fetchedSellerProducts = await fetchSellerProducts(id);
        if (fetchedSellerProducts) {
          sellerProducts.value = fetchedSellerProducts.map((product) => ({
            ...product,
            displayPrice: computed(() => {
              // Initialize lowestPrice to Infinity. This is a special value in JavaScript that's greater than any other number.
              // We use it here so that any price we compare it to at first will be lower.
              let lowestPrice = Infinity;

              // Iterate over each size in the product
              for (const sizeName in product.sizes) {
                const sizeArray = product.sizes[sizeName];

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
            }),
          }));
        }
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

  // onBeforeRouteLeave((__, ___, next) => {
  //   if (route.name === "product") {
  //     const product = products.value.find((p) => p.id === route.params.id);
  //     if (product) {
  //       incrementViewCount(product).then(() => next());
  //     } else {
  //       next();
  //     }
  //   } else {
  //     next();
  //   }
  // });

  return {
    products,
    product,
    isLoading,
    incrementViewCount,
    sellerProducts,
  };
};
