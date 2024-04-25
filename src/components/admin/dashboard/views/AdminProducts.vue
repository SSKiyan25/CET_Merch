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
    <div class="flex flex-col p-4 border-2 rounded-lg py-5 bg-slate-200">
      <div class="flex flex-col md:flex-row justify-between border-b-2">
        <div class="flex flex-row">
          <h1 class="font-bold text-xl tracking-wide mt-1">Products</h1>
          <router-link to="/admin/products/addproduct"
            ><button
              class="bg-green-500 px-3 py-2 rounded-lg mr-2 mb-2 hover:bg-green-400 ml-1"
              type="button"
              title="Add Product"
            >
              <Plus class="text-white" /></button
          ></router-link>
        </div>

        <form>
          <div class="flex relative w-full items-center space-x-1 pb-2">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-10 text-[10px] md:text-xs"
              v-model="searchInput"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <MagnifyingGlassIcon class="size-6 text-foreground pb-1" />
            </span>
            <Popover v-model:open="open">
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  role="combobox"
                  :aria-expanded="open"
                  class="w-[200px] justify-between text-xs md:text-sm"
                >
                  {{
                    selectedCategory !== "All"
                      ? frameworks.find(
                          (framework) => framework.value === selectedCategory
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
                              selectedCategory = ev.detail.value;
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
                              selectedCategory === framework.value
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

      <!-- Table Section -->
      <div class="py-2 min-w-full">
        <!-- Card -->
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
              <div class="bg-slate-100 shadow-sm overflow-hidden">
                <!-- Table -->
                <table class="min-w-full divide-y divide-primary/50">
                  <thead class="bg-secondary-50">
                    <tr class="bg-slate-300">
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
                          <span class="text-xs text-secondary-foreground/50">
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
                            Sizes | Stocks | Price
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
                    <tr v-if="loadingPage">
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-end pr-16 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(product, index) in filteredProducts"
                      :key="product.id"
                      class="hover:bg-primary/10"
                    >
                      <td>
                        <div class="pl-4 w-48 py-3">
                          <p class="w-full whitespace-normal">
                            <span
                              class="text-xs md:text-sm text-secondary-foreground"
                            >
                              {{ product.name }}</span
                            >
                          </p>
                        </div>
                      </td>
                      <td>
                        <div
                          class="py-3 px-4 w-36 md:px-5 flex items-center justify-start gap-x-2 text-white"
                        >
                          <div
                            v-if="product.isPublished"
                            class="bg-green-500 p-2 rounded-md text-center shadow-md"
                          >
                            <span class="text-xs font-medium">Published </span>
                          </div>
                          <div
                            v-else
                            class="bg-amber-700 shadow-md p-2 rounded-md ml-1.5"
                          >
                            <span class="text-xs font-medium">Hidden </span>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="pl-2 pr-8 py-3">
                          <div class="flex items-center gap-x-2">
                            <div class="grow">
                              <p class="">
                                <span
                                  class="text-sm text-secondary-foreground/80"
                                  >{{ product.category }}</span
                                >
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td class="size-4/12 whitespace-nowrap">
                        <div class="px-6 w-48 py-3">
                          <div class="w-full whitespace-normal">
                            <button @click.prevent="productStocks(product.id)">
                              <span
                                class="text-xs pl-4 text-primary font-medium hover:underline"
                              >
                                View Full Details</span
                              >
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="size-1/12 text-start whitespace-nowrap px-2.5">
                        <div class="py-1">
                          <div
                            class="hs-dropdown relative inline-block [--placement:bottom-right]"
                          >
                            <div
                              class="flex flex-row space-y-2 space-x-1 text-sm"
                            >
                              <div class="rounded-sm cursor-pointer mt-2">
                                <button
                                  class="bg-emerald-600 text-white p-2 rounded-sm"
                                  title="Edit Product"
                                  @click.prevent="
                                    editProductController(
                                      product.id,
                                      product,
                                      null
                                    )
                                  "
                                >
                                  <span
                                    class="material-symbols-outlined text-xs"
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
                                        class="bg-blue-600 text-white p-2 rounded-sm"
                                        title="View Full Details"
                                      >
                                        <span
                                          class="material-symbols-outlined text-xs"
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
                                        class="relative p-4 w-full max-w-4xl max-h-screen bg-background rounded-lg shadow overflow-y-auto"
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
                                              class="whitespace-normal text-[10px] md:text-xs pt-2 md:pl-4 text-secondary-foreground text-justify"
                                            >
                                              {{ product.description }}
                                            </p>

                                            <div class="pt-4">
                                              <span
                                                class="font-normal text-sm md:text-base text-primary/90"
                                                >Sizes with its Stocks
                                                Available:</span
                                              >
                                            </div>
                                            <p
                                              class="py-4 text-[10px] md:text-xs text-secondary-foreground/80 text-wrap"
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
                                        <div class="h-16"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="rounded-sm cursor-pointer mr-2">
                                <AlertDialog>
                                  <AlertDialogTrigger>
                                    <button
                                      class="bg-red-600 text-white p-2 rounded-sm"
                                      title="Delete Product"
                                    >
                                      <span
                                        class="material-symbols-outlined text-xs"
                                      >
                                        delete
                                      </span>
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle
                                        >Delete Product
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this
                                        product? This will be added to your
                                        archive.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogAction
                                        @click.prevent="
                                          deleteProductController(product.id)
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
                      >
                        {{ currentPage * 5 + 1 }}
                      </span>
                      -
                      <span
                        class="font-semibold text-gray-800 dark:text-gray-200"
                      >
                        {{
                          (currentPage + 1) * 5 > totalProducts
                            ? totalProducts
                            : (currentPage + 1) * 5
                        }}
                      </span>
                      results
                      <span
                        class="font-semibold text-gray-800 dark:text-gray-200"
                      >
                        out of {{ totalProducts }} total Products
                      </span>
                    </p>
                  </div>

                  <div>
                    <div class="inline-flex gap-x-2">
                      <button
                        type="button"
                        @click.prevent="prevPage"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent/20 bg-accent text-secondary-foreground shadow-sm hover:bg-accent/50 hover:border-accent disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
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
                        @click.prevent="nextPage"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent/20 bg-accent text-secondary-foreground shadow-sm hover:bg-accent/50 hover:border-accent/50 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
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
  <div v-if="isDeleting">
    <LoadingComponent />
  </div>
  <div class="h-32"></div>
</template>

<script setup lang="ts">
import NavBar from "../views/AdminNavBar.vue";
import AdminSidebar from "../views/AdminSidebar.vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import { ref, watchEffect } from "vue";
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
import { setup as setupProductController } from "../controllers/adminProductsController";
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
import LoadingComponent from "@/components/feature/misc/LoadingComponent.vue";

const frameworks = [
  { value: "All", label: "All" },
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lanyard", label: "Lanyard" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
  { value: "Other", label: "Other" },
];

let open = ref(false);
let searchInput = ref("");
let selectedCategory = ref("All");

const {
  products,
  productStocks,
  totalProducts,
  editProductController,
  deleteProductController,
  isDeleting,
  nextPage,
  prevPage,
  currentPage,
  loadingPage,
} = setupProductController();
const showProductModal = ref(products.value.map(() => false));

let filteredProducts = ref<any[]>([]);

watchEffect(() => {
  filteredProducts.value = products.value.filter((product) => {
    const isNameMatch = product.name
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
    const isCategoryMatch =
      selectedCategory.value === "All" ||
      product.category === selectedCategory.value;
    return isNameMatch && isCategoryMatch;
  });
});

const formatDate = (dateString: string) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const date = new Date(dateString);
  const formattedDate = (date.toLocaleDateString as any)([], dateOptions);
  const formattedTime = (date.toLocaleTimeString as any)([], timeOptions);
  return `${formattedDate} (${formattedTime})`;
};

defineExpose({ showProductModal, formatDate });
</script>
