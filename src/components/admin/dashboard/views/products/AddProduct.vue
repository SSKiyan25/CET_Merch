<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 sm:ml-64">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          add_ad
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Add a Product</h1>
        <p class="text-sm py-1">
          Add a new product to the inventory. You can add a product by providing
          the product name, description, price, and any others.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl tracking-wide mb-2">
          Input All Required Fields
        </h1>
      </div>
      <div class="p-1">
        <form @submit.prevent="handleFormSubmit">
          <div class="flex flex-col">
            <label for="product-name" class="text-sm font-medium py-2">
              Product Name*
            </label>
            <input
              type="text"
              id="product-name"
              v-model="newProduct.name"
              class="p-2 border-2 text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
              placeholder="Enter product name"
              required
            />
          </div>
          <div class="flex mt-4">
            <div class="flex flex-col w-1/2 pr-2">
              <label for="product-category" class="text-sm font-medium py-2">
                Product Category*
                <span class="text-xs text-secondary-foreground/70"
                  >(T-Shirt, Polo-Shirt, Hoodie, Stickers, etc..)</span
                >
              </label>
              <input
                type="text"
                id="product-category"
                v-model="newProduct.category"
                class="p-2 border-2 text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
                placeholder="Enter product category"
                required
              />
            </div>
            <div class="flex flex-col w-1/2 pl-2">
              <label for="product-price" class="text-sm font-medium py-2">
                Product Price*
              </label>
              <input
                type="number"
                id="product-price"
                v-model="newProduct.price"
                step="0.01"
                class="p-2 border-2 text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
                placeholder="Enter product price"
                required
              />
            </div>
          </div>
          <div class="flex flex-col mt-4">
            <label for="product-quantity" class="text-sm font-medium py-2">
              Sizes
            </label>
            <div class="flex flex-row">
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox-xs"
                  type="checkbox"
                  value="none"
                  v-model="newProduct.sizes"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-xs"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >N/A</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox-xs"
                  type="checkbox"
                  value="XS"
                  v-model="newProduct.sizes"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-xs"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >XS</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox-s"
                  type="checkbox"
                  value="S"
                  v-model="newProduct.sizes"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-s"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >S</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox-m"
                  type="checkbox"
                  value="M"
                  v-model="newProduct.sizes"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-m"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >M</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox-l"
                  type="checkbox"
                  value="L"
                  v-model="newProduct.sizes"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-l"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >L</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox-xl"
                  type="checkbox"
                  value="XL"
                  v-model="newProduct.sizes"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-xl"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >XL</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox-2xl"
                  type="checkbox"
                  value="2XL"
                  v-model="newProduct.sizes"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-2xl"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >2XL</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  id="inline-checkbox-3xl"
                  type="checkbox"
                  value="3XL"
                  v-model="newProduct.sizes"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-3xl"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >3XL</label
                >
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-4">
            <label for="product-description" class="text-sm font-medium py-2">
              Product Description
            </label>
            <textarea
              id="product-description"
              rows="5"
              v-model="newProduct.description"
              class="p-2 border-2 rounded-lg text-xs bg-secondary border-primary/40 text-secondary-foreground"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div class="flex flex-col mt-4">
            <label for="product-image" class="text-sm font-medium py-2">
              Product Cover Photo*
            </label>
            <input
              type="file"
              id="product-image"
              required
              accept="image/*"
              ref="coverPhotoInput"
              class="border-2 rounded-lg h-10 text-sm"
            />
          </div>
          <div class="flex flex-col mt-4">
            <label class="block py-2 text-sm font-medium" for="multiple_files"
              >Upload Product Photos</label
            >
            <input
              class="block w-full text-xs border-2 rounded-lg h-10"
              id="multiple_files"
              accept="image/*"
              type="file"
              ref="productPhotosInput"
              multiple
            />
          </div>
          <div class="flex items-center justify-between pt-6">
            <div class="flex items-center">
              <input
                id="is-hidden"
                type="checkbox"
                v-model="newProduct.isPublished"
                class="w-8 h-8 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
              />
              <label
                for="is-hidden"
                class="ms-2 text-sm font-medium text-secondary-foreground"
              >
                Publish Product
              </label>
            </div>
            <div class="flex items-center justify-end space-x-2">
              <button
                type="submit"
                class="p-2 bg-primary text-sm text-primary-foreground hover:bg-primary/80 font-semibold rounded-lg"
              >
                Add Product
              </button>
              <button
                class="p-2 pr-2 rounded-lg text-sm border-none border-secondary-foreground/40"
              >
                <router-link
                  to="/admin/products"
                  class="p-2 text-sm text-secondary-foreground hover:bg-secondary/80 font-semibold rounded-lg"
                  >Cancel</router-link
                >
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../AdminNavBar.vue";
import AdminSidebar from "../AdminSidebar.vue";
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { storage, db } from "@/firebase/init.ts";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  initFlowbite();
});

interface ProductData {
  id?: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  description: string;
  coverPhoto: File;
  photos: File[];
  isPublished: boolean;
}

const newProduct = ref<ProductData>({
  name: "",
  category: "",
  price: 0,
  sizes: [],
  description: "",
  coverPhoto: new File([], ""),
  photos: [],
  isPublished: false,
});

const coverPhotoInput = ref<HTMLInputElement | null>(null);
const productPhotosInput = ref<HTMLInputElement | null>(null);

const handleFormSubmit = async (): Promise<boolean> => {
  console.log("Form submitted");
  try {
    console.log("Cover photo files:", coverPhotoInput.value?.files); // Check the cover photo input
    console.log("Product photos files:", productPhotosInput.value?.files); // Check the product photos input
    if (coverPhotoInput.value?.files) {
      newProduct.value.coverPhoto = coverPhotoInput.value.files[0];
    } else {
      newProduct.value.coverPhoto = new File([], "");
    }

    if (productPhotosInput.value?.files) {
      newProduct.value.photos = Array.from(productPhotosInput.value.files);
    } else {
      newProduct.value.photos = [];
    }

    // Upload cover photo
    const coverPhotoRef = storageRef(
      storage,
      `gs://csshoppee-76342.appspot.com/products/${newProduct.value.name}/${newProduct.value.coverPhoto.name}`
    );
    const coverPhotoUploadResult = await uploadBytes(
      coverPhotoRef,
      newProduct.value.coverPhoto
    );
    console.log("Cover photo upload result:", coverPhotoUploadResult);
    const coverPhotoURL = await getDownloadURL(coverPhotoRef);
    console.log("Cover photo URL:", coverPhotoURL);

    // Upload other product photos
    const photosUploadPromises = newProduct.value.photos.map(
      async (photo: File) => {
        const photoRef = storageRef(
          storage,
          `gs://csshoppee-76342.appspot.com/products/${newProduct.value.name}/${photo.name}`
        );
        const uploadResult = await uploadBytes(photoRef, photo);
        console.log("Photo upload result:", uploadResult);
        return await getDownloadURL(photoRef);
      }
    );

    const photosURLs = await Promise.all(photosUploadPromises);
    console.log("Photo URLs:", photosURLs);

    // Add product data to Firestore
    const productData = {
      name: newProduct.value.name,
      category: newProduct.value.category,
      price: newProduct.value.price,
      sizes: newProduct.value.sizes,
      description: newProduct.value.description,
      coverPhoto: coverPhotoURL,
      photos: photosURLs,
      isPublished: newProduct.value.isPublished,
    };
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Document reference:", docRef);

    // Reset form
    newProduct.value = {
      name: "",
      category: "",
      price: 0,
      sizes: [],
      description: "",
      coverPhoto: new File([], ""),
      photos: [],
      isPublished: false,
    };
    router.push("/admin/products");
    alert("Product added successfully");
    return true; // return true if the process was successful
  } catch (error) {
    console.error("Error uploading files: ", error);
    alert("Product addition failed");
    return false; // return false if there was an error
  }
};
</script>
