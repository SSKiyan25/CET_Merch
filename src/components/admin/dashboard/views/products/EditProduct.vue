<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 sm:ml-64">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          edit_note
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Edit Product</h1>
        <p class="text-sm py-1">Update product details and images.</p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl tracking-wide mb-2">
          Edit Desired Fields
        </h1>
      </div>
      <div class="p-1" v-if="product">
        <form @submit.prevent="editProduct(product.id, product)">
          <div class="flex flex-col">
            <label for="product-name" class="text-sm font-medium py-2">
              Product Name*
            </label>
            <input
              type="text"
              id="product-name"
              v-model="product.name"
              class="p-2 border-2 text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
              placeholder="{{ product.name }}"
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
                v-model="product.category"
                class="p-2 border-2 text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
                placeholder="{{ product.category }}"
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
                v-model="product.price"
                step="0.01"
                class="p-2 border-2 text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
                placeholder="{{ product.price }}"
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
                  value="XS"
                  v-model="product.sizes"
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
                  v-model="product.sizes"
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
                  v-model="product.sizes"
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
                  v-model="product.sizes"
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
                  v-model="product.sizes"
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
                  v-model="product.sizes"
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
                  v-model="product.sizes"
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
              v-model="product.description"
              class="p-2 border-2 rounded-lg text-xs bg-secondary border-primary/40 text-secondary-foreground"
              placeholder="{{ product.description }}"
            ></textarea>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex flex-col w-1/2 mt-4">
              <label for="product-image" class="text-sm font-medium py-2">
                Change Cover Photo
              </label>
              <input
                type="file"
                id="product-image"
                accept="image/*"
                ref="coverPhotoInput"
                class="border-2 rounded-lg h-10 text-sm"
                @change.prevent="handleFileUpload"
              />
            </div>
            <div class="flex flex-col w-1/2 items-center pt-6">
              <label class="text-sm font-medium py-2"
                >Current Cover Photo</label
              >
              <img
                :src="product.coverPhoto"
                class="w-40 h-auto rounded-lg pt-3"
              />
            </div>
          </div>

          <div class="flex flex-col mt-4">
            <label class="block py-2 text-sm font-medium" for="multiple_files"
              >Add/Delete Product Photos</label
            >
            <input
              class="block w-full text-xs border-2 rounded-lg h-10"
              id="multiple_files"
              accept="image/*"
              type="file"
              ref="productPhotosInput"
              multiple
            />
            <div class="flex flex-row flex-wrap">
              <div
                class="relative"
                v-for="photo in product.photos"
                :key="photo"
              >
                <img :src="photo" class="p-2 pt-8 w-64 h-auto" />
                <button
                  class="absolute bottom-2 right-2 p-1 hover:text-destructive text-destructive-foreground bg-destructive hover:bg-gray-200"
                  title="Delete Image"
                >
                  <span class="material-symbols-outlined"> delete </span>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between pt-6">
            <div class="flex flex-row items-start py-8">
              <input
                id="is-hidden"
                type="checkbox"
                v-model="product.isPublished"
                class="w-8 h-8 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
              />
              <label
                for="is-hidden"
                class="ms-2 text-sm font-medium text-secondary-foreground pt-2"
              >
                Publish Product
              </label>
            </div>
            <div class="flex items-center justify-end space-x-2 py-8">
              <button
                @click.prevent="cancel"
                class="p-2 text-sm rounded-lg text-secondary-foreground bg-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="p-2 bg-primary text-sm text-primary-foreground hover:bg-primary/80 font-semibold rounded-lg"
              >
                + Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    v-if="isLoading"
    class="fixed inset-0 flex items-center justify center z-50"
  >
    <div class="p-8 bg-secondary rounded-xl shadow space-y-4">
      <div class="flex flex-row">
        <span class="text-xl font-bold text-secondary-foreground pt-4 pl-8"
          >Uploading</span
        >
        <span><img src="/upload_fire.gif" class="h-16 w-auto" /></span>
      </div>

      <Progress
        v-model="progress"
        class="w-full border-2 border-background/20"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../AdminNavBar.vue";
import AdminSidebar from "../AdminSidebar.vue";
import { setup as setupProductController } from "@/components/admin/dashboard/controllers/adminProductsController.ts";
import { useRouter } from "vue-router";
import { Progress } from "@/components/ui/progress";
import { ref, watchEffect } from "vue";

const router = useRouter();
const {
  product,
  editProduct: editProductController,
  handleFileUpload,
} = setupProductController();

let isLoading = ref(false);
const progress = ref(13);
watchEffect((cleanupFn) => {
  const timer = setTimeout(() => (progress.value = 66), 500);
  cleanupFn(() => clearTimeout(timer));
});

const editProduct = async (id: string, product: any) => {
  try {
    // Create a copy of the product object
    const productData = { ...product };
    await editProductController(id, productData);
    console.log("Product update was successful");
    router.push({ name: "adminProducts" });
  } catch (error) {
    console.error("Failed to update product:", error);
  }
};

const cancel = () => {
  router.push({ name: "adminProducts" });
};
console.log(product);
</script>
