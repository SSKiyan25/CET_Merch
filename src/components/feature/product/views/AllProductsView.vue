<template>
  <div class="h-auto">
    <div class="max-w-screen pb-4 mx-auto border-b-2">
      <div
        class="flex bg-inherit items-center justify-center shadow-2xl relative"
      >
        <img
          src="/homepage/products-1.jpg"
          class="object-cover md:object-fit brightness-50 backdrop-contrast-50 backdrop-hue-rotate-90"
          style="width: 1920px; height: 620px"
        />
      </div>
    </div>
    <div
      class="absolute bottom-48 md:bottom-0 left-0 flex flex-col items-center justify-end w-full h-full pb-20 p-2 md:pb-28 md:pl-20 lg:pb-36 xl:pb-[28rem] md:items-start opacity-90"
    >
      <div class="p-4 rounded-lg">
        <h1
          class="text-white uppercase font-black text-3xl md:text-5xl"
          style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
        >
          CET Products
        </h1>
      </div>
      <div class="md:pl-5 pb-4 w-1/2 md:w-1/3">
        <p
          class="text-white text-center md:text-start text-xs md:text-sm font-semibold text-wrap"
          style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
        >
          Get your hands on the latest CET Merchandise. From t-shirts to
          lanyards and more!
        </p>
      </div>
      <div class="pt-2 ps-4">
        <div class="overflow-hidden rounded-lg">
          <button
            class="bg-white p-4 transform transition-all duration-500 hover:scale-110 text-black text-base md:text-xl font-bold"
            v-scroll-to="'#products'"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
    <div></div>
    <div class="mx-auto w-11/12">
      <div
        class="flex flex-col md:flex-row pt-12 pb-2 justify-between border-b-2 border-primary mx-auto sticky"
      >
        <div class="flex flex-row items-center text-primary md:mb:0">
          <span
            class="font-black text-secondary-foreground tracking-wide text-2xl uppercase"
          >
            Collections
          </span>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex flex-col">
            <form>
              <div class="min-w-xl mx-auto">
                <Popover v-model:open="open">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :aria-expanded="open"
                      class="w-full md:w-[200px] justify-between"
                    >
                      {{
                        value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Select Department"
                      }}
                      <ChevronsUpDown
                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-full md:w-[200px]">
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
          <div class="flex flex-row px-1 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline"
                  ><span class="pr-2">Filter:</span> <Filter />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-48">
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  v-for="item in dropdownItems"
                  :key="item.value"
                  @click.prevent="selectedItem = item.value"
                >
                  {{ item.label }}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div class="p-1"></div>
      <!-- Product Cards -->
      <div class="flex flex-col justify-start bg-gray-200">
        <div class="flex flex-row px-4 md:px-8">
          <div
            v-if="isLoading"
            class="flex max-w-[75reh] h-full pt-8 justify-center items-center"
          >
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
          <div
            id="products"
            class="flex flex-row px-2 md:px-4 py-8 justify-center"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <div
                v-if="!isLoading"
                v-for="product in filteredProducts"
                :key="product.id"
                class="max-w-[75rem] justify-center items-center hover:drop-shadow-xl"
              >
                <div class="group flex flex-col bg-white drop-shadow-lg">
                  <div class="overflow-hidden border-b-2 border-primary/60">
                    <div
                      class="h-full flex flex-col justify-center items-center max-h-[22rem]"
                    >
                      <router-link
                        :to="`/product/${product.id}`"
                        @click.prevent="incrementViewCount(product)"
                      >
                        <img
                          :src="product.coverPhoto"
                          class="transform transition-all duration-500 hover:scale-110 h-[8rem] md:h-[16rem] object-cover rounded-t-sm"
                        />
                      </router-link>
                    </div>
                  </div>
                  <div class="p-2 md:p-4">
                    <div class="flex flex-col">
                      <span
                        class="text-sm md:text-base font-bold text-secondary-foreground truncate hover:underline"
                      >
                        {{ product.name }}
                      </span>
                      <span
                        class="block pb-2 pt-1 text-base md:text-2xl font-bold uppercase text-primary"
                        >P
                        {{
                          product.price[product.price.length - 1].originalPrice
                        }}
                      </span>
                      <div
                        class="flex flex-row justify-between items-center text-xs"
                      >
                        <div>
                          <span> {{ product.totalOrders }} Sold | </span>
                          <span> {{ product.views }} Views</span>
                        </div>
                        <div>
                          <span>
                            <span> {{ product.category }} | </span>
                            <span> {{ product.faction }} </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!isLoading && filteredProducts.length === 0"
              class="flex flex-row text-primary max-w-full justify-center items-center mx-auto"
            >
              <div class="flex flex-col items-center justify-center">
                <span class="material-symbols-outlined text-6xl text-primary">
                  search_off
                </span>
                No Results
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pb-12"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "../../../ui/button";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "../../../../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../ui/command";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Filter } from "lucide-vue-next";
import { setup as setupProductsController } from "../controllers/productsController";

const { products, isLoading, incrementViewCount } = setupProductsController();

const open = ref(false);
const value = ref<string>("");

const frameworks = [
  { value: "All", label: "Show All" },
  { value: "CET", label: "CET" },
  { value: "BSCS", label: "BSCS" },
  { value: "BSCE", label: "BSCE" },
  { value: "BSGE", label: "BSGE" },
  { value: "BSME", label: "BSME" },
  { value: "BSMet", label: "BSMet" },
  { value: "BSABE", label: "BSABE" },
];

const selectedItem = ref<string>("");

const dropdownItems = [
  { value: "All", label: "Show All" },
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lanyard", label: "Lanyard" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
  { value: "Other", label: "Other" },
];

const filteredProducts = computed(() => {
  let result =
    value.value === "All" || !value.value
      ? products.value
      : products.value.filter((product) => product.faction === value.value);

  if (selectedItem.value !== "All" && selectedItem.value !== "") {
    result = result.filter(
      (product) => product.category === selectedItem.value
    );
  }

  console.log(result);
  return result;
});
</script>
