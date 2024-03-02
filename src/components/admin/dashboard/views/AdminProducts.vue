<template>
  <NavBar />
  <AdminSidebar />

  <div class="p-4 ml-2 sm:ml-64">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined py-2 px-2 text-5xl">
          inventory_2
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Welcome to the Products Page</h1>
        <p class="text-sm py-1">
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
        <div class="flex flex-row mb-2 space-x-2">
          <button class="bg-green-500 px-3 py-2 rounded-lg">
            + Add a Product
          </button>
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
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Cover Photo
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Photo/s
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >
                            Name
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
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
                            Description
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
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-primary/50">
                    <tr class="hover:bg-primary/10">
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <div class="flex items-center gap-x-2">
                            <div class="grow">
                              <img
                                class="inline-block size-6 rounded-full"
                                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                alt="Image Description"
                              />
                              <button
                                data-popover-target="popover-right"
                                data-popover-placement="right"
                                type="button"
                                class="font-sm text-primary/90 hover:underline pl-2 text-sm text-center"
                              >
                                View Image
                              </button>
                              <div
                                data-popover
                                id="popover-right"
                                role="tooltip"
                                class="absolute z-10 invicible bg-accent border border-primary/80 invisible inline-block w-64 text-sm transition-opacity duration-300 borde rounded-lg shadow-sm opacity-0"
                              >
                                <div
                                  class="px-3 py-2 border-b-1 text-center font-bold"
                                >
                                  Image Title
                                </div>
                                <div class="px-3 py-2">
                                  <img
                                    class="inline-block"
                                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                    alt="Image Description"
                                  />
                                </div>
                                <div data-popper-arrow></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <button
                            data-popover-target="popover-bottom"
                            data-popover-placement="bottom"
                            type="button"
                            class="font-sm text-secondary-foreground hover:underline pl-2 text-sm text-center"
                          >
                            View Photos
                          </button>
                          <div
                            data-popover
                            id="popover-bottom"
                            role="tooltip"
                            class="absolute z-50 invicible bg-accent border border-primary/80 invisible inline-block w-64 text-sm transition-opacity duration-300 borde rounded-lg shadow-sm opacity-0"
                          >
                            <div class="px-3 py-2 text-center rounded-t-lg">
                              <h3
                                class="font-semibold text-gray-900 dark:text-white"
                              >
                                Photos
                              </h3>
                            </div>
                            <div class="px-3 py-2">
                              <img
                                class="inline-block"
                                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                alt="Image Description"
                              />
                            </div>
                            <div data-popper-arrow></div>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <div class="flex items-center gap-x-2">
                            <div class="grow">
                              <span
                                class="text-sm text-gray-600 dark:text-gray-400"
                                >CS New Merch</span
                              >
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
                                >T-Shirt</span
                              >
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <button
                            data-popover-target="popover-top"
                            data-popover-placement="top"
                            type="button"
                            class="font-sm text-secondary-foreground hover:underline pl-2 text-sm text-center"
                          >
                            Read Description
                          </button>
                          <div
                            data-popover
                            id="popover-top"
                            role="tooltip"
                            class="absolute z-50 invicible bg-accent border border-primary/80 invisible inline-block w-80 text-xs transition-opacity duration-300 borde rounded-lg shadow-sm opacity-0"
                          >
                            <div class="px-3 py-2 text-center rounded-t-lg">
                              <h3
                                class="font-semibold text-gray-900 dark:text-white"
                              >
                                Description
                              </h3>
                            </div>
                            <div class="px-3 py-2">
                              <p
                                class="text-xs w-full max-w-full whitespace-normal"
                              >
                                This is a new product from CS Shoppee. It is a
                                T-Shirt with a unique design and a comfortable
                                fit.
                              </p>
                            </div>
                            <div data-popper-arrow></div>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <div class="flex items-center gap-x-2">
                            <div class="grow">
                              <span
                                class="text-sm text-gray-600 dark:text-gray-400"
                                >P500</span
                              >
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="text-sm text-gray-600 dark:text-gray-400"
                            >XS,S,M,L,XL...</span
                          >
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap text-center px-5">
                        <div class="px-6 py-1">
                          <div
                            class="hs-dropdown relative inline-block [--placement:bottom-right]"
                          >
                            <div
                              class="flex flex-row space-y-2 space-x-2 text-sm"
                            >
                              <div class="rounded-sm cursor-pointer mt-2">
                                <button
                                  class="bg-emerald-600 text-white p-2 rounded-sm"
                                  title="Edit Product"
                                >
                                  <span
                                    class="material-symbols-outlined text-sm"
                                  >
                                    edit
                                  </span>
                                </button>
                              </div>
                              <div class="rounded-sm cursor-pointer">
                                <button
                                  class="bg-blue-600 text-white p-2 rounded-sm"
                                  title="View Product"
                                >
                                  <span
                                    class="material-symbols-outlined text-sm"
                                  >
                                    visibility
                                  </span>
                                </button>
                              </div>
                              <div class="rounded-sm cursor-pointer">
                                <button
                                  class="bg-red-600 text-white p-2 rounded-sm"
                                  title="Delete Product"
                                >
                                  <span
                                    class="material-symbols-outlined text-sm"
                                  >
                                    delete_forever
                                  </span>
                                </button>
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
import { ref } from "vue";
import { Check, ChevronsUpDown } from "lucide-vue-next";
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
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});

const frameworks = [
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lace", label: "Lace" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
];

const open = ref(false);
const value = ref<string>("");
</script>
