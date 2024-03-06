<template>
  <NavBar />
  <AdminSidebar />

  <div class="p-4 ml-2 sm:ml-64">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          dashboard
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Welcome to the Admin Dashboard</h1>
        <p class="text-sm py-1 text-secondary-foreground/60">
          This is the admin dashboard. You can manage your products, users, and
          other settings from here.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row border-b-2">
        <h1 class="font-bold text-xl tracking-wide">Featured Images</h1>
        <div class="p-1">
          <!-- Upload Featured Image -->
          <Popover v-model="isUploadPopoverOpen">
            <PopoverTrigger>
              <button title="Add an Image to be Featured">
                <span class="material-symbols-outlined text-emerald-300">
                  add_box
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="border-b-2 border-accent px-1 py-1">
                <h2>Upload Image</h2>
              </div>
              <form @submit.prevent="uploadFeaturedImage">
                <div class="flex flex-col items-center py-2 space-y-4">
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    class="border-none items-center h-15"
                    @change="onFileChange"
                  />
                  <!--Popup for success-->
                  <AlertDialog v-model="isSuccessPopoverOpen">
                    <AlertDialogTrigger>
                      <button
                        type="submit"
                        class="border-2 bg-secondary border-horder rounded-lg p-2 text-sm text-secondary-foreground"
                      >
                        Add Featured Image
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Image Uploaded Successfully
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Your image has been uploaded successfully. You can now
                          view it in the featured images section.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction @click="handleContinueClick"
                          >Continue</AlertDialogAction
                        >
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
        <div
          v-for="url in imageUrls"
          :key="url"
          class="relative flex items-end"
        >
          <img class="h-auto max-w-full rounded-lg" :src="url" alt="" />
          <AlertDialog>
            <AlertDialogTrigger class="absolute w-full text-end"
              ><button
                class="p-3 hover:text-destructive text-destructive-foreground bg-destructive rounded-br-lg hover:bg-gray-200"
                title="Delete Image"
              >
                <span class="material-symbols-outlined"> delete </span>
              </button></AlertDialogTrigger
            >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Image</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this image?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  @click="() => deleteFeaturedImage(url)"
                  class="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
                <AlertDialogAction
                  class="bg-secondary text-secondary-foreground"
                >
                  Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 ml-2 sm:ml-64">
    <div class="flex flex-col p-4 border-2 rounded-lg py-14">
      <div class="flex flex-row">
        <h1 class="font-bold text-xl tracking-wide">Products Statistics</h1>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
        <div class="">
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBar from "../views/AdminNavBar.vue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { setup as setupControllerFeatured } from "../controllers/adminUploadFeatured.ts";
import { useRouter } from "vue-router";
import AdminSidebar from "../views/AdminSidebar.vue";

const { onFileChange, uploadFeaturedImage, imageUrls, deleteFeaturedImage } =
  setupControllerFeatured();

const router = useRouter();

let isUploadPopoverOpen = ref(false);
let isSuccessPopoverOpen = ref(false);

const handleContinueClick = () => {
  isSuccessPopoverOpen.value = false;
  router.go(0);
};
</script>
