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
        <div class="flex flex-row">
          <button
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            class="bg-green-500 px-3 py-2 rounded-lg mr-2 mb-2"
            type="button"
          >
            + Add a Product
          </button>
          <!-- Main modal -->
          <div
            id="crud-modal"
            tabindex="-1"
            aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-muted/80"
          >
            <div class="relative p-4 w-full max-w-lg max-h-full">
              <!-- Modal content -->
              <div
                class="relative bg-secondary rounded-lg shadow border border-primary/40"
              >
                <!-- Modal header -->
                <div
                  class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-primary/40"
                >
                  <h3 class="text-lg font-semibold text-secondary-foreground">
                    Add New Product
                  </h3>
                  <button
                    type="button"
                    class="text-primary/80 bg-transparent hover:bg-primary/50 hover:text-secondary rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-secondary-foreground"
                        >Name</label
                      >
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-secondary border border-primary/40 text-secondary-foreground text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                        placeholder="Type product name"
                        required
                      />
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label
                        for="price"
                        class="block mb-2 text-sm font-medium text-secondary-foreground"
                        >Price</label
                      >
                      <input
                        type="number"
                        name="price"
                        id="price"
                        class="bg-secondary border border-primary/40 text-secondary-foreground text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                        placeholder="P000.00"
                        required
                      />
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label
                        for="category"
                        class="block mb-2 text-sm font-medium text-secondary-foreground"
                        >Category</label
                      >
                      <select
                        id="category"
                        class="bg-secondary border border-primary/40 text-secondary-foreground text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                      >
                        <option value="" disabled>Select category</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="Polo-Shirt">Polo-Shirt</option>
                        <option value="Lace">Lace</option>
                        <option value="Hoodie">Hoodie</option>
                        <option value="Stickers">Stickers</option>
                      </select>
                    </div>
                    <div class="w-full">
                      <label
                        for="sizes"
                        class="block mb-2 text-sm font-medium text-secondary-foreground"
                      >
                        Sizes</label
                      >

                      <div class="flex flex-row size-max w-full">
                        <div class="flex flex-auto items-center me-2">
                          <input
                            id="inline-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-primary bg-secondary border-primary/50 rounded focus:ring-primary/80 focus:ring-2"
                          />
                          <label
                            for="inline-checkbox"
                            class="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >XS</label
                          >
                        </div>
                        <div class="flex flex-auto items-center me-2">
                          <input
                            id="inline-2-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-primary bg-secondary border-primary/50 rounded focus:ring-primary/80 focus:ring-2"
                          />
                          <label
                            for="inline-2-checkbox"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >S</label
                          >
                        </div>
                        <div class="flex flex-auto items-center me-2">
                          <input
                            checked
                            id="inline-checked-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-primary bg-secondary border-primary/50 rounded focus:ring-primary/80 focus:ring-2"
                          />
                          <label
                            for="inline-checked-checkbox"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >L</label
                          >
                        </div>
                        <div class="flex flex-auto items-center me-2">
                          <input
                            checked
                            id="inline-checked-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-primary bg-secondary border-primary/50 rounded focus:ring-primary/80 focus:ring-2"
                          />
                          <label
                            for="inline-checked-checkbox"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >XL</label
                          >
                        </div>
                        <div class="flex flex-auto items-center me-2">
                          <input
                            checked
                            id="inline-checked-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-primary bg-secondary border-primary/50 rounded focus:ring-primary/80 focus:ring-2"
                          />
                          <label
                            for="inline-checked-checkbox"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            2XL
                          </label>
                        </div>

                        <div class="flex flex-auto items-center me-2">
                          <input
                            checked
                            id="inline-checked-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-primary bg-secondary border-primary/50 rounded focus:ring-primary/80 focus:ring-2"
                          />
                          <label
                            for="inline-checked-checkbox"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            3XL
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-span-2">
                      <label
                        for="description"
                        class="block mb-2 text-sm font-medium text-secondary-foreground"
                        >Product Description</label
                      >
                      <textarea
                        id="description"
                        rows="4"
                        class="block p-2.5 w-full text-sm text-secondary-foreground bg-secondary rounded-lg border border-primary/40 focus:ring-primary/80 focus:border-primary"
                        placeholder="Write product description here"
                      ></textarea>
                    </div>
                  </div>
                  <div class="pb-2">
                    <label
                      for="cover_photo"
                      class="block mb-2 text-sm font-medium text-secondary-foreground"
                      >Upload Cover Photo</label
                    >
                    <input
                      class="block w-3/4 h-9 text-xs text-secondary-foreground border border-primary rounded-lg cursor-pointer bg-secondary focus:outline-none placeholder-secondary-foreground"
                      accept="image/*"
                      id="cover_photo"
                      type="file"
                    />
                  </div>
                  <div class="pb-3">
                    <label
                      class="block mb-2 text-sm font-medium text-secondary-foreground"
                      for="multiple_files"
                      >Upload Product Photos</label
                    >
                    <input
                      class="block w-3/4 h-9 text-xs text-secondary-foreground border border-primary rounded-lg cursor-pointer bg-secondary focus:outline-none placeholder-secondary-foreground"
                      accept="image/*"
                      id="multiple_files"
                      type="file"
                      multiple
                    />
                  </div>
                  <button
                    type="submit"
                    class="text-primary-foreground inline-flex items-center bg-primary/80 hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      class="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Add new product
                  </button>
                </form>
              </div>
            </div>
          </div>
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
                        <div class="px-3 py-3">
                          <button
                            data-popover-target="popover-bottom"
                            data-popover-placement="bottom"
                            type="button"
                            class="font-sm text-primary/70 hover:underline pl-2 text-xs text-center"
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
                      <td class="size-2/12 whitespace-nowrap">
                        <div class="px-4 py-3">
                          <div class="flex items-center gap-x-2">
                            <div class="grow">
                              <p class="w-full whitespace-normal">
                                <span
                                  class="text-sm text-gray-600 dark:text-gray-400"
                                >
                                  CS New Merch</span
                                >
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-8 py-3">
                          <div class="flex items-center gap-x-2">
                            <div class="grow">
                              <p class="">
                                <span
                                  class="text-sm text-gray-600 dark:text-gray-400"
                                  >T-Shirt</span
                                >
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap text-start">
                        <div class="px-1 py-3">
                          <button
                            data-popover-target="popover-top"
                            data-popover-placement="top"
                            type="button"
                            class="font-sm text-primary/70 hover:underline pl-2 text-sm text-center"
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
                          <p class="w-full whitespace-normal">
                            <span
                              class="text-sm text-gray-600 dark:text-gray-400"
                              >XS,S,M,L,XL...</span
                            >
                          </p>
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
                                  title="View Full Details"
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
