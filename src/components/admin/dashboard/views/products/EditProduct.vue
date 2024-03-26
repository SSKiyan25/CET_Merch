<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 py-16 sm:ml-64">
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
        <form @submit.prevent="editProduct(product.id)">
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
                  id="inline-checkbox-s"
                  type="checkbox"
                  value="S"
                  v-model="naChecked"
                  class="w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2"
                />
                <label
                  for="inline-checkbox-s"
                  class="ms-2 text-sm font-medium text-secondary-foreground"
                  >N/A</label
                >
              </div>
              <div
                v-for="(size, index) in allSizes"
                :key="index"
                class="flex items-center me-4"
              >
                <input
                  type="checkbox"
                  :id="`size-${index}`"
                  v-if="size.value !== ''"
                  v-model="size.checked.value"
                  :disabled="naChecked"
                  checked
                  :class="`w-4 h-4 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2 ${
                    naChecked ? 'opacity-50' : ''
                  }`"
                />
                <label
                  :for="`size-${index}`"
                  :class="`ms-2 text-sm font-medium text-secondary-foreground ${
                    naChecked ? 'opacity-50' : ''
                  }`"
                  >{{ size.value }}
                </label>
              </div>
              <div
                :class="`flex flex-row space-x-1 items-center me-4 ${
                  naChecked ? 'opacity-50' : ''
                }`"
              >
                <label class="text-xs">Other: </label>
                <div v-for="(size, index) in otherSizes" :key="index">
                  <input
                    type="text"
                    v-model="size.value"
                    v-bind:disabled="naChecked"
                    class="w-12 h-8 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2 text-xs"
                    pattern="\S+"
                    title="This field should not contain spaces."
                  />
                </div>
                <Button
                  title="Click to add more options"
                  variant="default"
                  class="w-2/5"
                  @click.prevent="addSize"
                  v-bind:disabled="naChecked"
                >
                  <span class="text-xs font-semibold">Add</span>
                </Button>
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
              <Button
                variant="destructive"
                @click.prevent="cancel"
                class="p-2 text-sm rounded-lg text-secondary-foreground"
              >
                Cancel
              </Button>
              <button
                type="submit"
                class="p-2 bg-primary text-sm text-primary-foreground hover:bg-primary/80 font-semibold rounded-lg"
              >
                Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    v-if="isLoading"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
  >
    <div class="flex flex-col items-center justify-center h-full">
      <div class="flex flex-col items-center justify-center">
        <span
          class="material-symbols-outlined text-6xl text-primary animate-spin"
        >
          autorenew
        </span>
        <span class="text-lg text-secondary-foreground/60">Updating...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../AdminNavBar.vue";
import AdminSidebar from "../AdminSidebar.vue";
import { Button } from "@/components/ui/button";
import { setup as setupProductController } from "@/components/admin/dashboard/controllers/adminProductsController.ts";
import { useRouter } from "vue-router";
import { ref, watch as watchSize, computed } from "vue";

const naChecked = ref(false);
const router = useRouter();
const {
  product,
  editProduct: editProductController,
  handleFileUpload,
} = setupProductController();

let isLoading = ref(false);
const otherSizes = ref([{ value: "" }]);

const addSize = () => {
  otherSizes.value = [...otherSizes.value, { value: "" }];
};

const allSizes = computed(() => {
  if (!product.value) {
    return [];
  }
  const productSizes = product.value.sizes.map((size: string) => ({
    value: size,
    checked: ref(!naChecked.value),
  }));
  const otherSizesWithChecked = otherSizes.value.map((size) => ({
    ...size,
    checked: ref(!naChecked.value),
  }));
  return [...productSizes, ...otherSizesWithChecked];
});

watchSize(
  () => naChecked.value,
  (newNaChecked) => {
    if (!allSizes.value) {
      return;
    }
    if (newNaChecked) {
      allSizes.value.forEach((size) => {
        if (size && size.checked) {
          size.checked.value = false;
        }
      });
      otherSizes.value = [{ value: "" }];
    } else {
      allSizes.value.forEach((size) => {
        if (size && size.checked) {
          size.checked.value = true;
        }
      });
    }
  }
);

const editProduct = async (id: string) => {
  try {
    isLoading.value = true;
    let sizes = allSizes.value
      .filter(
        (size) => size.checked && size.checked.value && size.value.trim() !== ""
      )
      .map((size) => size.value);

    // Remove duplicates
    sizes = [...new Set(sizes)];

    if (naChecked.value && sizes.length === 0) {
      sizes = [""];
    }

    const productData = {
      ...product.value,
      sizes: sizes,
    };
    await editProductController(id, productData);
    console.log("Product update was successful");
    router.push({ name: "adminProducts" });
  } catch (error) {
    console.error("Failed to update product:", error);
  } finally {
    isLoading.value = false;
  }
};

const cancel = () => {
  router.push({ name: "adminProducts" });
};
</script>
