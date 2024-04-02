<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 pb-16 sm:ml-64">
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
          <div class="flex flex-row">
            <div class="flex flex-col w-1/2 pr-2">
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
            <div
              v-if="userData && userData.faction === 'all'"
              class="flex flex-col w-1/2 pl-2"
            >
              <label for="product-faction" class="text-sm font-medium py-2">
                Product Faction
              </label>
              <select
                id="product-faction"
                v-model="product.faction"
                class="p-2 border text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
                required
              >
                <option
                  v-for="faction in factions"
                  :key="faction.value"
                  :value="faction.value"
                >
                  {{ faction.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex mt-4">
            <div class="flex flex-col w-1/2 pr-2">
              <label for="product-category" class="text-sm font-medium py-2">
                Product Category*
                <span class="text-xs text-secondary-foreground/70"
                  >(T-Shirt, Polo-Shirt, Hoodie, Stickers, etc..)</span
                >
              </label>
              <select
                id="product-faction"
                v-model="product.category"
                class="p-2 border text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
                required
              >
                <option
                  v-for="category in categories"
                  :key="category.value"
                  :value="category.value"
                >
                  {{ category.label }}
                </option>
              </select>
            </div>
            <div class="flex flex-row w-1/2">
              <div class="flex flex-col w-1/2 pl-2">
                <label
                  for="product-original-price"
                  class="text-sm font-medium py-2"
                >
                  Product Price*
                </label>
                <input
                  type="number"
                  id="product-original-price"
                  v-model="latestPrice.originalPrice"
                  step="0.01"
                  class="p-2 border-2 text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
                  placeholder="{{ latestPrice.originalPrice }}"
                  required
                />
              </div>
              <div class="flex flex-col w-1/2 pr-2">
                <label
                  for="product-discounted-price"
                  class="text-sm font-medium py-2"
                >
                  Discounted Price
                  <span class="text-xs opacity-50">(Optional)</span>
                </label>
                <input
                  type="number"
                  id="product-discounted-price"
                  v-model="latestPrice.discountedPrice"
                  step="0.01"
                  class="p-2 border-2 text-sm rounded-lg bg-secondary border-primary/40 text-secondary-foreground"
                  placeholder="{{ latestPrice.discountedPrice }}"
                  required
                />
              </div>
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
              <div class="flex flex-wrap">
                <div
                  v-for="(size, index) in allSizes"
                  :key="index"
                  class="flex flex-row flex-wrap items-center me-4"
                >
                  <div class="flex flex-row flex-wrap items-center space-x-1">
                    <div
                      :class="`flex flex-row space-x-1 border p-2 rounded-sm borrder-primary items-center me-4 mb-2 ${
                        naChecked ? 'opacity-50' : ''
                      }`"
                    >
                      <label class="text-sm">{{ index + 1 }}-</label>
                      <label class="text-xs">Size: </label>
                      <input
                        type="text"
                        v-model="size.value"
                        v-bind:disabled="naChecked"
                        class="w-16 h-8 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2 text-xs"
                        pattern="\S+"
                        title="This field should not contain spaces."
                      />
                      <label class="text-xs">Stocks:</label>

                      <input
                        type="number"
                        v-model="size.stocks"
                        v-bind:disabled="naChecked"
                        min="0"
                        class="w-16 h-8 text-primary/80 bg-secondary border-primary/40 rounded focus:ring-primary focus:ring-2 text-xs"
                      />
                      <button
                        title="Click to add more options"
                        class="py-2 px-4 bg-red-600 rounded-sm"
                        @click.prevent="removeSize(index)"
                        v-bind:disabled="naChecked"
                      >
                        <span class="text-xs font-semibold">Remove</span>
                      </button>
                      <button
                        title="Click to add more options"
                        class="py-2 px-4 bg-emerald-600 rounded-sm"
                        @click.prevent="addSize"
                        v-bind:disabled="naChecked"
                      >
                        <span class="text-xs font-semibold">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
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
              ref="additionalPhotosInput"
              multiple
            />
            <div class="flex flex-row flex-wrap">
              <div
                class="relative"
                v-for="(photo, index) in product.photos"
                :key="photo"
              >
                <div v-if="isDeletingPhoto" class="p-2 pt-8 w-64 h-72">
                  <div class="flex flex-col items-center justify-center h-full">
                    <div class="flex flex-col items-center justify-center">
                      <span
                        class="material-symbols-outlined text-6xl text-primary animate-spin"
                      >
                        autorenew
                      </span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <img :src="photo" class="p-2 pt-8 w-64 h-72 rounded-lg" />
                  <button
                    class="absolute bottom-2 right-2 p-1 hover:text-destructive text-destructive-foreground bg-destructive hover:bg-gray-200"
                    title="Delete Image"
                    @click.prevent="deletePhotoFromProduct(index)"
                  >
                    <span class="material-symbols-outlined"> delete </span>
                  </button>
                </div>
              </div>
            </div>
            <span class="text-base text-primary/80 italic pt-2"
              >Not the Actual Photo Size so the Image might be stretched.
            </span>
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
import { ref, computed, watch } from "vue";

const naChecked = ref(false);
const router = useRouter();
const {
  product,
  editProductController,
  handleFileUpload,
  deletePhotoController,
  isDeletingPhoto,
  userData,
} = setupProductController();

const additionalPhotosInput = ref<HTMLInputElement | null>(null);

let isLoading = ref(false);
const allSizes = ref([{ value: "", stocks: 0 }]);

const addSize = () => {
  allSizes.value = [...allSizes.value, { value: "", stocks: 0 }];
};

let originalSizes = ref<any[]>([]);

watch(product, (newValue) => {
  if (newValue && newValue.sizes) {
    allSizes.value = newValue.sizes;
    originalSizes.value = [...newValue.sizes];
  }
});

watch(naChecked, (newValue) => {
  if (newValue) {
    allSizes.value = [{ value: "", stocks: 0 }];
  } else {
    allSizes.value = [...originalSizes.value];
  }
});
const removeSize = (index: number) => {
  if (allSizes.value.length > 1) {
    allSizes.value.splice(index, 1);
  }
};

const factions = [
  { value: "CET", label: "CET" },
  { value: "BSCS", label: "BSCS" },
  { value: "BSCE", label: "BSCE" },
  { value: "BSGE", label: "BSGE" },
  { value: "BSME", label: "BSME" },
  { value: "BSMet", label: "BSMet" },
  { value: "BSABE", label: "BSABE" },
];

const categories = [
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Lanyard", label: "Lanyard" },
  { value: "Stickers", label: "Stickers" },
  { value: "Other", label: "Other" },
];

const deletePhotoFromProduct = async (index: number) => {
  try {
    const photoURL = product.value.photos[index];
    await deletePhotoController(photoURL, product.value.id);
    product.value.photos.splice(index, 1);
  } catch (error) {
    console.error("Failed to delete photo:", error);
  }
};

const latestPrice = computed(() => {
  if (product.value.price && product.value.price.length > 0) {
    return product.value.price[product.value.price.length - 1];
  }
  return { originalPrice: "", discountedPrice: "" };
});

const editProduct = async (id: string) => {
  try {
    isLoading.value = true;
    let sizes = allSizes.value
      .filter((size) => size.value.trim() !== "")
      .map((size) => ({ value: size.value, stocks: size.stocks }));

    // Remove duplicates
    sizes = Array.from(new Set(sizes.map((size) => JSON.stringify(size)))).map(
      (size) => JSON.parse(size)
    );

    const productData = {
      ...product.value,
      sizes: sizes,
      originalPrice: latestPrice.value.originalPrice,
      discountedPrice: latestPrice.value.discountedPrice,
    };
    const additionalPhotosFiles = additionalPhotosInput.value?.files || null;
    await editProductController(id, productData, additionalPhotosFiles);
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
