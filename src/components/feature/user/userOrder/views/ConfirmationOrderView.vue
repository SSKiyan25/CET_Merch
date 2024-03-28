<template>
  <div class="flex pt-24 pb-36 justify-center">
    <div
      class="p-7 sm:w-full md:w-3/4 lg:w-5/6 items-center justify-center bg-accent border border-primary/20 rounded-xl shadow-sm"
    >
      <div class="p-2 border-b-2 border-secondary-foreground/40">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row text-start">
            <span
              class="material-symbols-outlined text-2xl pr-2 text-primary/90"
            >
              shopping_basket
            </span>
            <h1 class="block text-2xl font-bold text-primary/90">Your Cart</h1>
          </div>
          <div class="flex flex-row items-center justify-center">
            <router-link :to="`/submitorder/${route.params.id}`">
              <button
                class="p-2 bg-emerald-800 rounded-sm hover:bg-emerald-700 text-base text-secondary-foreground font-semibold flex items-center"
              >
                Process Order
                <span class="material-symbols-outlined ml-2"> start </span>
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="pt-2" v-if="!loading">
        <div class="p-2 min-w-full bg-backgound overflow-hidden">
          <table class="text-secondary-foreground w-full">
            <thead>
              <tr class="uppercase tracking-wide text-primary/90">
                <th class="p-2 text-left w-2/12"></th>
                <th class="p-2 text-left w-3/12">Product Name</th>
                <th class="p-2 text-left">Size</th>
                <th class="p-2 text-left">Quantity</th>
                <th class="p-2 text-left">Price</th>
                <th class="p-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in cart"
                :key="index"
                class="border-b border-primary/40 hover:bg-primary/10"
              >
                <td class="p-2">
                  <img
                    class="w-40 h-40 rounded-sm"
                    :src="product.details.coverPhoto"
                    :alt="product.name"
                  />
                </td>
                <td class="p-2 text-wrap whitespace-normal">
                  {{ product.details?.name }}
                </td>
                <td class="p-2 pl-4">{{ product.size }}</td>
                <td class="p-2 pl-10">{{ product.quantity }}</td>
                <td class="p-2 pl-4">{{ product.details.price }}</td>
                <td class="p-2 pl-8">
                  {{ product.details?.price * product.quantity }}
                </td>
                <td class="p-2">
                  <AlertDialog>
                    <AlertDialogTrigger
                      ><button
                        class="material-symbols-outlined text-secondary-foreground bg-destructive p-2 rounded-sm"
                      >
                        delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Product to Cart
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this product from your
                          cart? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          class="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
                          @click.prevent="deleteProductFromCart(index)"
                        >
                          Delete
                        </AlertDialogAction>
                        <AlertDialogAction
                          class="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                        >
                          Cancel
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="pt-8">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center justify-center space-x-2 pl-2">
            <router-link to="/"
              ><button class="bg-destructive rounded-sm p-2">Back</button>
            </router-link>
            <router-link :to="`/submitorder/${route.params.id}`">
              <button
                class="p-2 bg-emerald-800 rounded-sm hover:bg-emerald-700 text-base text-secondary-foreground font-semibold flex items-center"
              >
                Process Order
                <span class="material-symbols-outlined ml-2"> start </span>
              </button>
            </router-link>
          </div>

          <div class="flex flex-row justify-end p-2">
            <span class="text-lg font-bold pr-2">Total:</span>
            <span class="text-lg font-bold underline text-primary/90"
              >P{{ totalPrice }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
  >
    <div>
      <LoadingComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, computed } from "vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import { useRoute } from "vue-router";
import { getDoc, doc, DocumentData, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/init.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const route = useRoute();
const order = ref<DocumentData | null | undefined>(null);
const cache = new Map();

async function fetchOrder() {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  const userDoc = doc(db, "users", auth.currentUser.uid);
  const userData = (await getDoc(userDoc)).data();

  if (!userData) {
    console.error("User data not found");
    return;
  }

  if (
    userData.orders &&
    userData.orders.length > 0 &&
    userData.orders[userData.orders.length - 1].status === "OnQueue"
  ) {
    const orderDoc = doc(
      db,
      "userOrder",
      userData.orders[userData.orders.length - 1].userOrderID
    );
    const currentOrderData = (await getDoc(orderDoc)).data();
    return { id: orderDoc.id, ...currentOrderData };
  } else {
    console.error("No order in queue");
    return;
  }
}

async function fetchProductDetails(productId: string) {
  if (!productId) {
    console.error("Invalid product ID");
    return;
  }

  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Fetched order:", docSnap.data());
      console.log("Product details:", docSnap.data());
      return docSnap.data();
    } else {
      throw new Error("No such document");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

const loading = ref(true);

watch(
  () => auth.currentUser?.uid,
  async (newId) => {
    loading.value = true;
    if (typeof newId === "string") {
      if (cache.has(newId)) {
        order.value = cache.get(newId);
      } else {
        const fetchedOrder = await fetchOrder();
        if (fetchedOrder) {
          const cart = (fetchedOrder as any).cart;
          if (cart) {
            const cartWithDetails = [];
            for (let item of cart) {
              const productDetails = await fetchProductDetails(item.productId);
              cartWithDetails.push({ ...item, details: productDetails });
            }
            (fetchedOrder as any).cart = cartWithDetails;
          }
          order.value = fetchedOrder;
          cache.set(newId, order.value);
        }
      }
    }
    loading.value = false;
  },
  { immediate: true }
);

const getOrderById = (id: string) => {
  return order.value?.id === id ? order.value : undefined;
};

//Temporary Compute Total price
const totalPrice = computed(() => {
  if (order.value && order.value.cart) {
    return parseFloat(
      order.value.cart
        .reduce(
          (
            total: number,
            item: { details: { price: number }; quantity: number }
          ) => total + item.details.price * item.quantity,
          0
        )
        .toFixed(2)
    );
  } else {
    return 0;
  }
});

const cart = computed(() => {
  return order.value ? order.value.cart : [];
});

provide("getOrderById", getOrderById);

async function deleteProductFromCart(index: number) {
  loading.value = true;
  try {
    if (!order.value) {
      console.error("Order is null or undefined");
      return;
    }
    if (index < 0 || index >= order.value.cart.length) {
      console.error("Invalid index");
      return;
    }

    const orderDocRef = doc(db, "userOrder", order.value.id);

    const newCartArray = order.value.cart.filter(
      (_: any, itemIndex: number) => itemIndex !== index
    );

    await updateDoc(orderDocRef, {
      cart: newCartArray,
    });

    // Update order.value by creating a new object instead of directly manipulating it
    order.value = { ...order.value, cart: newCartArray };
  } catch (error) {
    console.error("Error deleting document:", error);
  }
  loading.value = false;
}
</script>
