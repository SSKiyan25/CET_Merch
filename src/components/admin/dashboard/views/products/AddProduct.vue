<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 sm:ml-64 pb-16 bg-slate-100">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          add_ad
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl text-primary">Add a Product</h1>
        <p class="text-sm py-1">
          Add a new product to the inventory. You can add a product by providing
          the product name, description, price, and any others.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-primary text-xl tracking-wide mb-2">
          Input All Required Fields
        </h1>
      </div>
      <div class="p-1">
        <form @submit.prevent="handleFormSubmit">
          <div class="flex flex-row">
            <div class="flex flex-col w-1/2 pr-2">
              <label for="product-name" class="text-sm font-medium py-2">
                Product Name
                <span class="text-red-400 font-bold text-sm">*</span>
              </label>
              <input
                type="text"
                id="product-name"
                v-model="newProduct.name"
                class="p-2 border text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                placeholder="Enter product name"
                required
              />
            </div>
            <div
              v-if="userData && userData.isAdmin"
              class="flex flex-col w-1/2 pl-2"
            >
              <label for="product-faction" class="text-sm font-medium py-2">
                Product Faction
                <span class="text-red-400 font-bold text-sm">*</span>
              </label>
              <select
                id="product-faction"
                v-model="newProduct.faction"
                class="p-2 border text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                required
              >
                <option disabled value="">Please select a faction</option>
                <option value="CET">CET</option>
                <option value="BSCS">BSCS</option>
                <option value="BSCE">BSCE</option>
                <option value="BSGE">BSGE</option>
                <option value="BSME">BSME</option>
                <option value="BSMet">BSMet</option>
                <option value="BSABE">BSABE</option>
              </select>
            </div>
          </div>
          <div class="flex mt-4">
            <div class="flex flex-col w-1/2 pr-2">
              <label for="product-category" class="text-sm font-medium py-2">
                Product Category
                <span class="text-red-400 font-bold text-sm">*</span>
                <span class="text-xs text-secondary-foreground/70"
                  >(T-Shirt, Polo-Shirt, Hoodie, Stickers, Other)</span
                >
              </label>
              <select
                id="product-category"
                v-model="newProduct.category"
                class="p-2 border text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                required
              >
                <option disabled value="">Please select a category</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Polo-Shirt">Polo-Shirt</option>
                <option value="Hoodie">Hoodie</option>
                <option value="Lanyard">Lanyard</option>
                <option value="Stickers">Stickers</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="flex flex-row w-1/2">
              <div class="flex flex-col w-1/2 pl-2">
                <label for="product-price" class="text-sm font-medium py-2">
                  Product Price
                  <span class="text-red-400 font-bold text-sm">*</span>
                </label>
                <input
                  type="number"
                  id="product-original-price"
                  v-model="newProduct.price[0].originalPrice"
                  step="0.01"
                  class="p-2 border text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div class="flex flex-col w-1/2 pl-2">
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
                  v-model="newProduct.price[0].discountedPrice"
                  step="0.01"
                  class="p-2 border text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                  placeholder="Enter discounted price (optional)"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-4">
            <label for="product-quantity" class="text-sm font-medium py-2">
              Sizes
              <span class="opacity-50 text-xs"
                >(One at a Time if adding other sizes)</span
              >
            </label>
            <div class="flex flex-row items-center">
              <div class="flex flex-col me-4">
                <div class="flex items-center">
                  <input
                    id="inline-checkbox-na"
                    type="checkbox"
                    value="none"
                    v-model="naChecked"
                    class="w-4 h-4 text-primary/80 bg-background border-primary/40 rounded focus:ring-primary focus:ring-2"
                  />
                  <label
                    for="inline-checkbox-xs"
                    class="ms-2 text-sm font-medium text-secondary-foreground"
                    >N/A</label
                  >
                </div>
              </div>
              <div class="flex flex-row flex-wrap">
                <div
                  v-for="(size, index) in otherSizes"
                  :key="index"
                  class="flex flex-row space-x-1 items-center"
                >
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
                      class="w-48 h-8 text-primary/80 bg-background border-primary/40 rounded focus:ring-primary focus:ring-2 text-[10px]"
                      pattern="\S+"
                      title="This field should not contain spaces."
                    />
                    <label class="text-xs">Stocks: </label>
                    <input
                      type="number"
                      min="0"
                      v-model="size.stocks"
                      class="w-16 h-8 text-primary/80 bg-background border-primary/40 rounded focus:ring-primary focus:ring-2 text-xs"
                    />
                    <button
                      title="Click to add more options"
                      variant="default"
                      class="py-2 px-4 bg-emerald-600 rounded-sm"
                      @click.prevent="addSize"
                      v-bind:disabled="naChecked"
                    >
                      <span class="text-xs text-white font-semibold">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-4 flex-flex-col items-center">
              <label class="text-xs opacity-70 italic"
                >*Accessible if N/A checkbox is clicked</label
              >
              <div
                class="flex flex-row border w-1/5 items-center rounded-sm p-2 space-x-2"
                :class="`flex flex-row border w-1/5 items-center rounded-sm p-2 space-x-2 ${
                  !naChecked ? 'opacity-50' : ''
                }`"
              >
                <label class="text-sm">General Stocks:</label>
                <input
                  type="number"
                  min="1"
                  max="2000"
                  v-model="newProduct.generalStocks"
                  v-bind:disabled="!naChecked"
                  class="rounded-sm p-2 text-xs"
                />
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
              class="p-2 border rounded-lg text-xs bg-background border-primary/40 text-secondary-foreground"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div class="flex flex-col mt-4">
            <label for="product-image" class="text-sm font-medium py-2">
              Product Cover Photo
              <span class="text-red-400 font-bold text-sm">*</span>
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
              >Upload Product Photos
              <span class="opacity-50 text-xs"
                >(Add Additional Photos like its Sizes or other Colors)</span
              ></label
            >
            <input
              class="block w-full text-xs border-2 rounded-lg h-9"
              id="multiple_files"
              accept="image/*"
              type="file"
              ref="productPhotosInput"
              required
              multiple
            />
          </div>
          <div class="flex items-center justify-between pt-6">
            <div class="flex items-center">
              <input
                id="is-hidden"
                type="checkbox"
                v-model="newProduct.isPublished"
                class="w-8 h-8 text-primary/80 bg-background border-primary/40 rounded focus:ring-primary focus:ring-2"
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
                  class="p-2 text-sm text-secondary-foreground font-semibold rounded-lg"
                  >Cancel</router-link
                >
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--File Uploading-->
  <div
    v-if="isLoading && !isUploadSuccessful"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="p-8 bg-background rounded-xl shadow space-y-4">
      <div class="flex flex-row">
        <span class="text-xl font-bold text-secondary-foreground pt-4 pl-8"
          >Uploading</span
        >
        <span><img src="/upload_fire.gif" class="h-16 w-auto" /></span>
      </div>

      <Progress v-model="progress" class="w-full border-2 border-primary" />
    </div>
  </div>
  <!--File Uploading Sucessfully-->
  <div
    v-if="isUploadSuccessful"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="p-8 bg-background rounded-xl shadow space-y-4">
      <div class="flex flex-col justify-center items-center">
        <span class="text-xl font-bold text-secondary-foreground pt-4"
          >Product Added Successfully</span
        >
        <span><img src="/upload_successful.gif" class="h-32 w-auto" /></span>
      </div>
    </div>
  </div>
  <div v-if="isOpening">
    <LoadingComponent />
  </div>
</template>

<script setup lang="ts">
import NavBar from "../AdminNavBar.vue";
import AdminSidebar from "../AdminSidebar.vue";
import { onMounted, ref, watchEffect, watch } from "vue";
import { initFlowbite } from "flowbite";
import { storage, db, auth } from "@/firebase/init.ts";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
} from "firebase/firestore";
import { useRouter } from "vue-router";
import { Progress } from "@/components/ui/progress";
import { Button } from "../../../../ui/button";
import LoadingComponent from "@/components/feature/misc/LoadingComponent.vue";

const router = useRouter();
const isOpening = ref(false);
let userData = ref<{
  faction?: string;
  products?: string[];
  isAdmin?: boolean;
} | null>(null);

onMounted(async () => {
  isOpening.value = true;
  initFlowbite();
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    if (userRef) {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        userData.value = userDoc.data() as {
          faction?: string;
          products?: string[];
          isAdmin?: boolean;
        };
      }
    }
  } else {
    throw new Error("User not found");
  }
  isOpening.value = false;
});

type priceData = {
  originalPrice: number;
  discountedPrice: number;
  dateCreated: string;
};

type sizeData = {
  value: string;
  stocks: number;
};

interface ProductData {
  id?: string;
  name: string;
  category: string;
  faction: string;
  price: priceData[];
  sizes: sizeData[];
  description: string;
  coverPhoto: File;
  photos: File[];
  isPublished: boolean;
  isArchived: boolean;
  views: number;
  totalOrders: number;
  dateCreated: string;
  lastModified: string;
  totalSales: number;
  generalStocks: number;
}

const newProduct = ref<ProductData>({
  name: "",
  category: "",
  faction: "",
  price: [
    {
      originalPrice: 0,
      discountedPrice: 0,
      dateCreated: "",
    },
  ],
  sizes: [
    {
      value: "",
      stocks: 0,
    },
  ],
  description: "",
  coverPhoto: new File([], ""),
  photos: [],
  isPublished: false,
  isArchived: false,
  views: 0,
  totalOrders: 0,
  dateCreated: "",
  lastModified: "",
  totalSales: 0,
  generalStocks: 0,
});

const coverPhotoInput = ref<HTMLInputElement | null>(null);
const productPhotosInput = ref<HTMLInputElement | null>(null);

let isLoading = ref(false);
let isUploadSuccessful = ref(false);

const progress = ref(13);

watchEffect((cleanupFn) => {
  const timer = setTimeout(() => (progress.value = 66), 500);
  cleanupFn(() => clearTimeout(timer));
});

const naChecked = ref(false);
const otherSizes = ref<sizeData[]>([{ value: "", stocks: 0 }]);

let newSizeValue = ref("");

const addSize = () => {
  newSizeValue.value = newSizeValue.value.trim();

  const sizeExists = otherSizes.value.some(
    (size) => size.value === newSizeValue.value
  );

  if (sizeExists) {
    alert("Size already existed");
  } else {
    console.log("Adding new size");
    const newSize = { value: newSizeValue.value, stocks: 0 };
    otherSizes.value = [...otherSizes.value, newSize];
  }
  newSizeValue.value = "";
};

watch(
  () => naChecked.value,
  (newNaChecked) => {
    if (newNaChecked) {
      otherSizes.value = [{ value: "", stocks: 0 }];
    }
  }
);

console.log(userData);
const handleFormSubmit = async (): Promise<boolean> => {
  console.log("Form submitted");
  let userRef: DocumentReference | null = null;
  let userDoc: DocumentSnapshot | null = null;
  let userData: {
    faction?: string;
    role?: string;
    isAdmin?: boolean;
  } | null = null;

  const user = auth.currentUser;
  if (user) {
    userRef = doc(db, "users", user.uid);
    if (userRef) {
      userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        userData = userDoc.data() as { faction?: string; products?: string[] };
      }
    }
  } else {
    throw new Error("User not found");
  }

  try {
    if (user && userData && userData.faction) {
      if (user && userData.faction !== "all") {
        newProduct.value.faction = userData.faction;
      }
    }
    isLoading.value = true;

    //Checking if there was a file uploaded
    console.log("Cover photo files:", coverPhotoInput.value?.files);
    console.log("Product photos files:", productPhotosInput.value?.files);

    if (coverPhotoInput.value?.files) {
      const originalCoverPhoto = coverPhotoInput.value.files[0];
      const uniqueFileName = `${
        newProduct.value.name
      }_coverPhoto_${new Date().toISOString()}_${user.uid}_${Math.floor(
        Math.random() * 1000
      )}`;
      newProduct.value.coverPhoto = new File(
        [originalCoverPhoto],
        uniqueFileName,
        { type: originalCoverPhoto.type }
      );
    } else {
      newProduct.value.coverPhoto = new File([], "");
    }

    if (productPhotosInput.value?.files) {
      newProduct.value.photos = Array.from(productPhotosInput.value.files).map(
        (originalPhoto, index) => {
          const uniqueFileName = `${
            newProduct.value.name
          }_Photo[${index}]${new Date().toISOString()}_${user.uid}_${Math.floor(
            Math.random() * 1000
          )}${originalPhoto.name.slice(originalPhoto.name.lastIndexOf("."))}`;
          return new File([originalPhoto], uniqueFileName, {
            type: originalPhoto.type,
          });
        }
      );
    } else {
      newProduct.value.photos = [];
    }

    // Upload cover photo
    const coverPhotoRef = storageRef(
      storage,
      `gs://csshoppee-76342.appspot.com/products/${newProduct.value.faction}/${newProduct.value.name}/${newProduct.value.coverPhoto.name}`
    );

    const coverPhotoUploadTask = uploadBytesResumable(
      coverPhotoRef,
      newProduct.value.coverPhoto
    );

    let coverPhotoURL = "";
    coverPhotoUploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progressValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress.value = progressValue;
        console.log("Upload is " + progressValue + "% done");
      },
      (error) => {
        console.error("Error uploading files: ", error);
      },
      async () => {
        coverPhotoURL = await getDownloadURL(coverPhotoRef);
        console.log("Cover photo URL:", coverPhotoURL);
      }
    );

    await coverPhotoUploadTask;

    console.log("Cover photo URL after upload:", coverPhotoURL);

    const photosUploadPromises = newProduct.value.photos.map((photo: File) => {
      return new Promise(async (resolve, reject) => {
        const photoRef = storageRef(
          storage,
          `gs://csshoppee-76342.appspot.com/products/${newProduct.value.faction}/${newProduct.value.name}/${photo.name}`
        );
        const photoUploadTask = uploadBytesResumable(photoRef, photo);

        photoUploadTask.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => {
            const progressValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress.value = progressValue;
            console.log("Upload is " + progressValue + "% done");
          },
          (error) => {
            console.error("Error uploading files: ", error);
            reject(error);
          },
          async () => {
            const photoURL = await getDownloadURL(photoRef);
            console.log("Photo URL:", photoURL);
            resolve(photoURL);
          }
        );
      });
    });

    const photosURLs = await Promise.all(photosUploadPromises);
    console.log("Photo URLs:", photosURLs);

    //Upload Product Data to the Firestore Database
    newProduct.value.price = newProduct.value.price.map((price) => ({
      ...price,
      dateCreated: new Date().toISOString(),
    }));
    const productData = {
      name: newProduct.value.name,
      category: newProduct.value.category,
      faction: newProduct.value.faction,
      price: newProduct.value.price,
      sizes: otherSizes.value.filter((size) => size.value.trim() !== ""),
      description: newProduct.value.description,
      coverPhoto: coverPhotoURL,
      photos: photosURLs,
      isPublished: newProduct.value.isPublished,
      isArchived: false,
      views: 0,
      totalOrders: 0,
      dateCreated: new Date().toISOString(),
      lastModified: "",
      totalSales: 0,
      generalStocks: newProduct.value.generalStocks,
    };

    const docRef = await addDoc(collection(db, "products"), productData);
    await setDoc(docRef, { id: docRef.id }, { merge: true });
    console.log("Document reference:", docRef);

    // Reset form
    newProduct.value = {
      name: "",
      category: "",
      faction: "",
      price: [
        {
          originalPrice: 0,
          discountedPrice: 0,
          dateCreated: "",
        },
      ],
      sizes: [
        {
          value: "",
          stocks: 0,
        },
      ],
      description: "",
      coverPhoto: new File([], ""),
      photos: [],
      isPublished: false,
      isArchived: false,
      views: 0,
      totalOrders: 0,
      dateCreated: "",
      lastModified: "",
      totalSales: 0,
      generalStocks: 0,
    };
    isLoading.value = false;
    isUploadSuccessful.value = true;
    setTimeout(() => {
      router.push("/admin/products");
    }, 3000);
    return true;
  } catch (error) {
    isLoading.value = false;
    isUploadSuccessful.value = false;
    console.error("Error uploading files: ", error);
    alert("Product addition failed");
    return false;
  }
};
</script>
