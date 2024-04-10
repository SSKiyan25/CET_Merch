import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { useRouter, useRoute } from "vue-router";
import {
  fetchProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
  deletePhoto,
} from "../models/adminProductsModel";
import {
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/init";
import { fetchUser } from "../models/userModel";

type UserData = { faction?: string; products?: any; role?: string } | null;

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

  let userRef: DocumentReference | null = null;
  let userDoc: DocumentSnapshot | null = null;
  let userData = ref<UserData>(null);

  onMounted(async () => {
    initFlowbite();
    loadingPage.value = true;
    const user = await fetchUser();
    if (!user) {
      console.error("No current user");
      return;
    }
    const faction = user.role === "admin" ? "all" : user.faction;

    const {
      products: initialProducts,
      lastDoc,
      totalProducts: initialTotalProducts,
    } = await fetchProducts(faction);
    products.value = initialProducts;
    lastDocs.value[currentPage.value] = lastDoc;
    totalProducts.value = initialTotalProducts;

    // Check if route has id parameter
    if (route.params.id) {
      const id = route.params.id as string;
      product.value = await fetchProduct(id);
    }

    const userForEdit = auth.currentUser;
    if (userForEdit) {
      userRef = doc(db, "users", userForEdit.uid);
      if (userRef) {
        userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          userData.value = userDoc.data();
        }
      }
    } else {
      console.error("User not logged in");
    }

    loadingPage.value = false;
  });

  const nextPage = async () => {
    const user = await fetchUser();
    if (!user) {
      console.error("No current user");
      return;
    }
    const faction = user.role === "admin" ? "all" : user.faction;
    if ((currentPage.value + 1) * 5 < totalProducts.value) {
      loadingPage.value = true;
      currentPage.value = currentPage.value + 5;
      const startAfterDoc = lastDocs.value[currentPage.value - 1];
      const { products: newProducts, lastDoc } = await fetchProducts(
        faction,
        startAfterDoc
      );
      products.value = newProducts;
      lastDocs.value[currentPage.value] = lastDoc;
      loadingPage.value = false;
    }
  };

  const prevPage = async () => {
    const user = await fetchUser();
    if (!user) {
      console.error("No current user");
      return;
    }
    const faction = user.role === "admin" ? "all" : user.faction;
    if (currentPage.value > 0) {
      loadingPage.value = true;
      currentPage.value = currentPage.value - 5;
      const startAfterDoc =
        currentPage.value > 0 ? lastDocs.value[currentPage.value - 1] : null;
      const { products: newProducts } = await fetchProducts(
        faction,
        startAfterDoc
      );
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
    userData,
  };
};
