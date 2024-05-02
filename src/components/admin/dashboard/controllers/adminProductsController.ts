import { onMounted, ref, computed } from "vue";
import { initFlowbite } from "flowbite";
import { useRouter, useRoute } from "vue-router";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
  deletePhoto,
  Size,
  Product,
  fetchSellerProducts,
  fetchAllArchivedProducts,
} from "../models/adminProductsModel";
import {
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
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
    3;
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
      const productRef = doc(db, "products", id);
      onSnapshot(
        productRef,
        (doc) => {
          if (doc.exists()) {
            product.value = doc.data() as Product;
          } else {
            product.value = null;
          }
        },
        (error) => {
          console.error("Failed to fetch product:", error);
        }
      );
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

  const fetchProductsBySearchController = async (search: string) => {
    try {
      const user = await fetchUser();
      if (!user) {
        console.error("User not found");
        return;
      }
      // Fetch all products
      let products = await fetchSellerProducts(user.faction, user.role);

      // Apply search filter in application code
      if (search) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductsByCategoryController = async (category: string) => {
    try {
      const user = await fetchUser();
      if (!user) {
        console.error("User not found");
        return;
      }
      // Fetch all products
      let products = await fetchSellerProducts(user.faction, user.role);

      // Apply category filter in application code
      if (category && category !== "All") {
        products = products.filter((product) => product.category === category);
      }

      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchAllArchivedProductsForAdmin = async () => {
    const user = await fetchUser();
    if (!user || user.role !== "admin") {
      console.error("User not authorized");
      return;
    }
    const products = await fetchAllArchivedProducts();
    return products;
  };

  const nextPage = async () => {
    const user = await fetchUser();
    if (!user) {
      console.error("No current user");
      return;
    }
    const faction = user.role === "admin" ? "all" : user.faction;
    if ((currentPage.value + 1) * 10 < totalProducts.value) {
      loadingPage.value = true;
      currentPage.value = currentPage.value + 1;
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
      currentPage.value = currentPage.value - 1;
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

  const productStocks = async (id: string) => {
    router.push({ name: "adminProductStocks", params: { id } });
  };

  const fetchProductData = (id: string) => {
    loadingPage.value = true;
    const productRef = doc(db, "products", id);

    // Listen to real-time updates
    const unsubscribe = onSnapshot(productRef, (doc) => {
      if (doc.exists()) {
        product.value = doc.data() as Product;
        loadingPage.value = false;
      } else {
        console.log("No such document!");
        loadingPage.value = false;
      }
    });

    // Return the unsubscribe function so you can stop listening to updates when necessary
    return unsubscribe;
  };

  const sortedSizes = computed(() => {
    const sizes = { ...product.value.sizes };
    for (const size in sizes) {
      sizes[size].sort(
        (a: Size, b: Size) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
    }
    return sizes;
  });

  const addStocks = async (
    productId: string,
    sizeName: any,
    newStock: number | string,
    newPrice: number
  ) => {
    loadingPage.value = true;
    const newStockNumber =
      typeof newStock === "string" ? parseInt(newStock, 10) : newStock;
    const newStockInfo = {
      dateAdded: new Date().toISOString(),
      price: newPrice,
      reserved_stocks: 0,
      stocks: newStockNumber,
      remaining_stocks: newStockNumber,
    };

    try {
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data() as Product;
        const updatedSizes = { ...productData.sizes };
        if (updatedSizes[sizeName]) {
          updatedSizes[sizeName] = [...updatedSizes[sizeName], newStockInfo];
        } else {
          updatedSizes[sizeName] = [newStockInfo];
        }
        await updateDoc(productRef, { sizes: updatedSizes });
        console.log("Product updated successfully");
        await fetchProductData(productId);
      } else {
        console.error("Product does not exist");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      loadingPage.value = false;
    }
  };

  const editStock = async (
    productId: string,
    sizeName: any,
    index: number,
    newStock: number,
    newPrice: number
  ) => {
    loadingPage.value = true;

    try {
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data() as Product;
        const updatedSizes = { ...productData.sizes };
        if (updatedSizes[sizeName] && updatedSizes[sizeName][index]) {
          updatedSizes[sizeName][index].stocks = newStock;
          updatedSizes[sizeName][index].price = newPrice;
          updatedSizes[sizeName][index].dateModified = new Date().toISOString();
          await updateDoc(productRef, { sizes: updatedSizes });
          console.log("Product updated successfully");
          await fetchProductData(productId);
        } else {
          console.error("Size or index does not exist");
        }
      } else {
        console.error("Product does not exist");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      loadingPage.value = false;
    }
  };

  const removeStocks = async (
    productId: string,
    sizeName: any,
    index: number
  ) => {
    loadingPage.value = true;
    try {
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data() as Product;

        // Make sure the size exists and the index is valid
        if (
          productData.sizes[sizeName] &&
          index >= 0 &&
          index < productData.sizes[sizeName].length
        ) {
          // Remove the stock at the specified index
          productData.sizes[sizeName].splice(index, 1);

          // Update the document with the modified sizes
          await updateDoc(productRef, { sizes: productData.sizes });
        }
      }
    } catch (err) {
      console.error("Failed to update product:", err);
    } finally {
      loadingPage.value = false;
    }
  };

  type SizeData = {
    sizeName?: string;
    dateAdded?: string;
    reserved_stocks?: number;
    stocks?: number;
    price?: number;
  };

  const addSize = async (
    productId: string,
    sizes: Array<{ size: string; data: SizeData }>
  ) => {
    loadingPage.value = true;
    try {
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data() as Product;

        // Iterate over each size in the sizes array
        for (let item of sizes) {
          // Ensure item.data.price and item.data.stocks are numbers
          let price = typeof item.data.price === "number" ? item.data.price : 0;
          let stocks =
            typeof item.data.stocks === "number" ? item.data.stocks : 0;

          // Create a new size object
          let newSize = {
            dateAdded: new Date().toISOString(),
            price: price,
            reserved_stocks: 0,
            stocks: stocks,
            remaining_stocks: stocks,
          };

          // If the size already exists in the product, push the new size data to the array
          // Otherwise, initialize the size with an array containing the new size data
          if (productData.sizes[item.size]) {
            productData.sizes[item.size].push(newSize);
          } else {
            productData.sizes[item.size] = [newSize];
          }
        }

        // Update the document with the modified sizes
        await updateDoc(productRef, { sizes: productData.sizes });

        // Manually update product.value
        product.value = productData;
      }
    } catch (err) {
      console.error("Failed to update product:", err);
    } finally {
      loadingPage.value = false;
    }
  };

  return {
    fetchProductData,
    removeStocks,
    products,
    product,
    productStocks,
    addStocks,
    editStock,
    addSize,
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
    sortedSizes,
    fetchProductsByCategoryController,
    fetchProductsBySearchController,
    fetchAllArchivedProductsForAdmin,
  };
};
