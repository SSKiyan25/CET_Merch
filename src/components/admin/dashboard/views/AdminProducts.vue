<template>
  <NavBar />
  <AdminSidebar />

  <div class="p-4 ml-2 sm:ml-64 pb-8">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          inventory_2
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Welcome to the Products Page</h1>
        <p class="text-sm py-1 text-secondary-foreground/50">
          This is the admin products page. You can manage your products from
          here. You can add, edit, and delete products from here.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row justify-between border-b-2">
        <div class="flex flex-row">
          <h1 class="font-bold text-xl tracking-wide mt-1">Products</h1>
        </div>
        <div class="flex flex-row">
          <router-link to="/admin/products/addproduct"
            ><button
              class="bg-green-500 px-3 py-2 rounded-lg mr-2 mb-2 hover:bg-green-400"
              type="button"
              title="Add Product"
            >
              <Plus class="text-secondary" /></button
          ></router-link>

          <form>
            <div class="flex relative w-full max-w-sm items-center">
              <Input
                id="search"
                type="text"
                placeholder="Search..."
                class="pl-10"
              />
              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
              </span>
              <Popover v-model:open="open" class="max-w-sm">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    role="combobox"
                    :aria-expanded="open"
                    class="w-[200px] justify-between"
                  >
                    {{
                      value
                        ? frameworks.find(
                            (framework) => framework.value === value
                          )?.label
                        : "Select Category"
                    }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[200px] p-0">
                  <Command>
                    <CommandInput class="h-9" placeholder="Search Category" />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          v-for="framework in frameworks"
                          :key="framework.value"
                          :value="framework.value"
                          @select="
                            (ev) => {
                              if (typeof ev.detail.value === 'string') {
                                value = ev.detail.value;
                              }
                              open = false;
                            }
                          "
                          class="cursor-pointer"
                        >
                          {{ framework.label }}
                          <Check
                            :class="
                              cn(
                                'ml-auto h-4 w-4',
                                value === framework.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )
                            "
                          />
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </div>
      </div>

      <!-- Table Section -->
      <div class="py-2 min-w-full">
        <!-- Card -->
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
              <div class="bg-secondary border-t-2 shadow-sm overflow-hidden">
                <!-- Table -->
                <table class="min-w-full divide-y divide-primary/50">
                  <thead class="bg-secondary-50">
                    <tr>
                      <th scope="col" class="pl-4 py-2 text-start w-3/12">
                        <div class="flex gap-x-1 whitespace-nowrap">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Name
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="pr-6 py-3 text-start w-2/12">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Status
                          </span>
                          <span class="text-xs text-gray-400">
                            (If posted)</span
                          >
                        </div>
                      </th>

                      <th scope="col" class="pr-2 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Category
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Price
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Sizes
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-end justify-end">
                        <div class="flex text-end justify-end pr-10 gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Actions
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-primary/50">
                    <tr
                      v-for="(product, index) in products"
                      :key="product.id"
                      class="hover:bg-primary/10"
                    >
                      <td>
                        <div class="pl-4 py-3">
                          <p class="w-full whitespace-normal">
                            <span class="text-sm text-secondary-foreground/80">
                              {{ product.name }}</span
                            >
                          </p>
                        </div>
                      </td>
                      <td>
                        <div
                          class="py-3 px-5 flex items-center justify-center gap-x-2"
                        >
                          <div class="grow">
                            <button
                              v-if="product.isPublished && !product.editStatus"
                              :class="[
                                'cursor-default rounded-lg p-1.5',
                                product.isPublished
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-primary/40 text-secondary-foreground/80',
                              ]"
                              @click.prevent="product.editStatus = true"
                            >
                              <span class="text-xs font-medium">{{
                                product.status
                              }}</span>
                            </button>
                            <button
                              v-else-if="
                                !product.isPublished && !product.editStatus
                              "
                              :class="[
                                'cursor-default rounded-lg p-1.5',
                                product.isPublished
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-primary/40 text-secondary-foreground/80',
                              ]"
                              @click.prevent="product.editStatus = true"
                            >
                              <span class="text-xs"> {{ product.status }}</span>
                            </button>
                            <div v-if="product.editStatus">
                              <div class="flex flex-row">
                                <div class="w-3/4">
                                  <Select v-model="product.selectedStatus">
                                    <SelectTrigger>
                                      <span
                                        v-if="product.editStatus"
                                        class="material-symbols-outlined"
                                      >
                                        edit
                                      </span>
                                      <SelectValue
                                        :placeholder="product.status"
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Edit Status</SelectLabel>
                                        <SelectItem value="Publish"
                                          >Publish</SelectItem
                                        >
                                        <SelectItem value="Hidden"
                                          >Hidden</SelectItem
                                        >
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <button
                                  @click.prevent="updateProductStatus(product)"
                                >
                                  <span
                                    v-if="!product.isLoading"
                                    class="material-symbols-outlined text-xs px-1"
                                    >check</span
                                  >
                                  <span v-else>
                                    <img src="/loading.gif" />
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="pl-2 pr-8 py-3">
                          <div class="flex items-center gap-x-2">
                            <div class="grow">
                              <p class="">
                                <span
                                  class="text-sm text-gray-600 dark:text-gray-400"
                                  >{{ product.category }}</span
                                >
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <div class="flex items-center gap-x-2">
                            <div class="grow">
                              <span
                                class="text-sm text-gray-600 dark:text-gray-400"
                                >P {{ product.price }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="size-2/12 whitespace-nowrap">
                        <div class="px-6 py-3">
                          <p class="w-full whitespace-normal">
                            <span
                              v-for="(size, index) in product.sizes"
                              :key="index"
                              class="text-sm text-gray-600 dark:text-gray-400"
                            >
                              {{ size
                              }}<span v-if="index < product.sizes.length - 1">
                                |
                              </span>
                            </span>
                          </p>
                        </div>
                      </td>
                      <td class="size-1/12 text-end whitespace-nowrap px-5">
                        <div class="py-1">
                          <div
                            class="hs-dropdown relative inline-block [--placement:bottom-right]"
                          >
                            <div
                              class="flex flex-row space-y-2 space-x-2 text-sm"
                            >
                              <div class="rounded-sm cursor-pointer mt-2">
                                <button
                                  class="bg-emerald-600 text-white p-3 rounded-sm"
                                  title="Edit Product"
                                  @click.prevent="
                                    console.log(product.id);
                                    editProduct(product.id, product);
                                  "
                                >
                                  <span
                                    class="material-symbols-outlined text-sm"
                                  >
                                    edit
                                  </span>
                                </button>
                              </div>

                              <div class="">
                                <div
                                  class="hs-dropdown relative inline-block [--placement:bottom-right]"
                                >
                                  <div class="flex flex-row text-sm">
                                    <div class="rounded-sm cursor-pointer">
                                      <button
                                        @click.prevent="
                                          showProductModal[index] = true
                                        "
                                        class="bg-blue-600 text-white p-3 rounded-sm"
                                        title="View Full Details"
                                      >
                                        <span
                                          class="material-symbols-outlined text-sm"
                                        >
                                          visibility
                                        </span>
                                      </button>
                                    </div>
                                    <div
                                      v-if="showProductModal[index]"
                                      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                                    >
                                      <div
                                        class="relative p-4 w-full max-w-2xl max-h-full bg-secondary rounded-lg shadow"
                                      >
                                        <div
                                          class="modal-header flex items-center justify-between p-4 md:p-5 border-b rounded-t border-secondary-foreground/90"
                                        >
                                          <div class="flex justify-start">
                                            <span
                                              class="material-symbols-outlined p-1"
                                            >
                                              grid_on
                                            </span>
                                            <h3
                                              class="font-bold text-xl text-primary/90"
                                            >
                                              {{ product.name }}
                                            </h3>
                                          </div>

                                          <button
                                            @click.prevent="
                                              showProductModal[index] = false
                                            "
                                            class="modal-close"
                                          >
                                            <span
                                              class="material-symbols-outlined text-sm"
                                              >close</span
                                            >
                                          </button>
                                        </div>
                                        <div
                                          class="modal-body pt-4 flex flex-row justify-between"
                                        >
                                          <div
                                            class="flex flex-col items-start w-1/2"
                                          >
                                            <span
                                              class="text-secondary-foreground font-semibold text-base round-sm"
                                              >Cover Photo</span
                                            >

                                            <img
                                              :src="product.coverPhoto"
                                              class="p-10"
                                            />
                                          </div>
                                          <div
                                            class="flex flex-col w-1/2 items-start"
                                          >
                                            <p>
                                              <span
                                                class="font-bold text-base text-primary/90"
                                                >Description:</span
                                              >
                                            </p>
                                            <p
                                              class="whitespace-normal text-xs pt-2 pl-4 text-secondary-foreground text-justify"
                                            >
                                              {{ product.description }}
                                            </p>
                                            <p class="pt-4">
                                              <span
                                                class="font-bold text-base text-primary/90"
                                                >Price:
                                              </span>
                                              P
                                              <span
                                                class="text-sm text-secondary-foreground underline"
                                              >
                                                {{ product.price }}</span
                                              >
                                            </p>
                                            <p class="pt-4">
                                              <span
                                                class="font-normal text-base text-primary/90"
                                                >Sizes Available:
                                              </span>
                                              <span
                                                v-for="(
                                                  size, index
                                                ) in product.sizes"
                                                :key="index"
                                                class="text-xs text-secondary-foreground"
                                              >
                                                {{ size
                                                }}<span
                                                  v-if="
                                                    index <
                                                    product.sizes.length - 1
                                                  "
                                                  >,
                                                </span>
                                              </span>
                                            </p>
                                            <p
                                              class="py-4 text-xs text-secondary-foreground/80"
                                            >
                                              <span v-if="product.isPublished"
                                                >This product is currently
                                                published in the market.</span
                                              >
                                              <span v-else
                                                >This product is currently
                                                hidden in the market.</span
                                              >
                                            </p>
                                          </div>
                                        </div>
                                        <div
                                          class="flex flex-col w-full justify-start items-start"
                                        >
                                          <h2
                                            class="font-medium text-base text-primary"
                                          >
                                            Photos
                                          </h2>
                                          <div class="flex flex-row flex-wrap">
                                            <img
                                              v-for="photo in product.photos"
                                              :src="photo"
                                              class="p-2 w-auto h-48"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="rounded-sm cursor-pointer mr-2">
                                <AlertDialog>
                                  <AlertDialogTrigger class="w-full"
                                    ><button
                                      class="bg-red-600 text-white p-3 rounded-sm"
                                      title="Delete Product"
                                    >
                                      <span
                                        class="material-symbols-outlined text-sm"
                                      >
                                        delete_forever
                                      </span>
                                    </button></AlertDialogTrigger
                                  >
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle
                                        >Delete Product</AlertDialogTitle
                                      >
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this
                                        product?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogAction
                                        @click.prevent="
                                          deleteProduct(
                                            product.id,
                                            product.name
                                          )
                                        "
                                        class="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                      <AlertDialogAction
                                        class="bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- End Table -->

                <!-- Footer -->
                <div
                  class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-primary/20"
                >
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Showing
                      <span
                        class="font-semibold text-gray-800 dark:text-gray-200"
                        >1-N</span
                      >
                      results
                    </p>
                  </div>

                  <div>
                    <div class="inline-flex gap-x-2">
                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-muted text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
                      >
                        <svg
                          class="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-muted text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
                      >
                        Next
                        <svg
                          class="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <!-- End Footer -->
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>
      <!-- End Table Section -->
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../views/AdminNavBar.vue";
import AdminSidebar from "../views/AdminSidebar.vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import { ref, defineExpose, watch } from "vue";
import { Check, ChevronsUpDown, Plus } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setup as setupProductController } from "../controllers/adminProducts.ts";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/firebase/init.ts";
import { doc, updateDoc } from "firebase/firestore";

const frameworks = [
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lace", label: "Lace" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
];

const open = ref(false);
const value = ref<string>("");

const { products, editProduct, deleteProduct } = setupProductController();
const showProductModal = ref(products.value.map(() => false));

products.value.forEach((product) => {
  product.editStatus = false;
  product.selectedStatus = product.status;
  product.isLoading = false;
});

const editStatus = (product: any) => {
  product.editStatus = true;
  product.selectedStatus = product.status;
};

const updateProductStatus = async (product: any) => {
  product.isLoading = true; // Set isLoading to true when the update starts

  if (product.selectedStatus) {
    product.status = product.selectedStatus;
    product.isPublished = product.status === "Published";
  }

  product.editStatus = false;

  // Update the product status in Firestore
  const productRef = doc(db, "products", product.id);
  await updateDoc(productRef, {
    status: product.status,
    isPublished: product.isPublished,
  });

  product.isLoading = false; // Set isLoading to false when the update finishes
};

// Watch for changes in the products array and update the Firestore database
watch(
  products,
  async (newProducts) => {
    for (const product of newProducts) {
      if (product.status !== product.selectedStatus) {
        await updateProductStatus(product);
      }
    }
  },
  { deep: true }
);

defineExpose({ showProductModal, updateProductStatus, editStatus });
</script>
