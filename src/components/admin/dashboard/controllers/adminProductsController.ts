import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { useRouter, useRoute } from "vue-router";
import {
  fetchProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
} from "../models/adminProductsModel.ts";

export const setup = () => {
  const router = useRouter();
  const route = useRoute();
  const products = ref<any[]>([]);
  const product = ref<any>(null);

  let coverPhotoFile = ref<File | null>(null);

  onMounted(async () => {
    initFlowbite();

    products.value = await fetchProducts();

    // Check if route has id parameter
    if (route.params.id) {
      const id = route.params.id as string;
      product.value = await fetchProduct(id);
    }
  });

  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    coverPhotoFile.value = file;
  };

  const editProductController = async (
    id: string,
    productData: any,
    additionalPhotosFiles: FileList | null
  ) => {
    product.value = await updateProduct(
      id,
      productData,
      coverPhotoFile.value,
      additionalPhotosFiles
    );
    router.push({ name: "adminEditProduct", params: { id } });
  };

  const isDeleting = ref(false);
  const deleteProductController = async (id: string) => {
    isDeleting.value = true;
    await deleteProduct(id);
    // Remove the product from the products array
    products.value = products.value.filter((product) => product.id !== id);
    isDeleting.value = false;
  };

  return {
    products,
    product,
    editProductController,
    handleFileUpload,
    deleteProductController,
    isDeleting,
  };
};
