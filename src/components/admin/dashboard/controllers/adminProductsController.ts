import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { useRouter, useRoute } from "vue-router";
import {
  fetchProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
  deletePhoto,
} from "../models/adminProductsModel.ts";
import { DocumentSnapshot } from "firebase/firestore";

export const setup = () => {
  const router = useRouter();
  const route = useRoute();
  const products = ref<any[]>([]);
  const product = ref<any>(null);

  let coverPhotoFile = ref<File | null>(null);
  let currentPage = ref(0);
  let lastDocs = ref<DocumentSnapshot[]>([]);
  let totalProducts = ref(0);
  const loadingPage = ref(false);

  onMounted(async () => {
    initFlowbite();
    loadingPage.value = true;
    const {
      products: initialProducts,
      lastDoc,
      totalProducts: initialTotalProducts,
    } = await fetchProducts();
    products.value = initialProducts;
    lastDocs.value[currentPage.value] = lastDoc;
    totalProducts.value = initialTotalProducts;

    // Check if route has id parameter
    if (route.params.id) {
      const id = route.params.id as string;
      product.value = await fetchProduct(id);
    }
    loadingPage.value = false;
  });

  const nextPage = async () => {
    if ((currentPage.value + 1) * 1 < totalProducts.value) {
      loadingPage.value = true;
      currentPage.value++;
      const startAfterDoc = lastDocs.value[currentPage.value - 1];
      const { products: newProducts, lastDoc } = await fetchProducts(
        startAfterDoc
      );
      products.value = newProducts;
      lastDocs.value[currentPage.value] = lastDoc;
      loadingPage.value = false;
    }
  };

  const prevPage = async () => {
    if (currentPage.value > 0) {
      loadingPage.value = true;
      currentPage.value--;
      const startAfterDoc =
        currentPage.value > 0 ? lastDocs.value[currentPage.value - 1] : null;
      const { products: newProducts } = await fetchProducts(startAfterDoc);
      products.value = newProducts;
      loadingPage.value = false;
    }
  };

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

  const isDeletingPhoto = ref(false);
  const deletePhotoController = async (photoURL: string, productId: string) => {
    isDeletingPhoto.value = true;
    await deletePhoto(photoURL, productId);
    isDeletingPhoto.value = false;
  };

  return {
    products,
    product,
    editProductController,
    handleFileUpload,
    deleteProductController,
    deletePhotoController,
    isDeleting,
    isDeletingPhoto,
    nextPage,
    prevPage,
    currentPage,
    totalProducts,
    loadingPage,
  };
};
