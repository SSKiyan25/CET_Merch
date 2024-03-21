import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { db } from "@/firebase/init.ts";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useRouter, useRoute } from "vue-router";

export const setup = () => {
  const router = useRouter();
  const route = useRoute();
  const order = ref<any>(null);
  const orders = ref<any[]>([]);

  const getProductDetails = async (productId: string) => {
    const productDoc = doc(db, "products", productId);
    const productSnapshot = await getDoc(productDoc);
    return productSnapshot.data();
  };

  onMounted(async () => {
    initFlowbite();

    const ordersCollection = collection(db, "userOrder");
    const ordersSnapshot = await getDocs(ordersCollection);
    orders.value = await Promise.all(
      ordersSnapshot.docs.map(async (doc) => {
        const orderData = doc.data();
        orderData.products = await Promise.all(
          orderData.products.map(async (product: any) => {
            product.details = await getProductDetails(product.productId);
            return product;
          })
        );
        return {
          id: doc.id,
          ...orderData,
        };
      })
    );
  });

  return {
    orders,
    order,
  };
};
