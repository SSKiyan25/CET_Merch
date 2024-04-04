<template>
  <div class="h-auto">
    <div class="max-w-screen pb-4 mx-auto border-b-2">
      <div>
        <FeaturedCarousel />
      </div>
    </div>
    <div class="mx-auto w-11/12">
      <div
        class="flex flex-col md:flex-row pt-12 pb-2 justify-between border-b-2 border-primary mx-auto"
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
            <Popover
              ><PopoverTrigger as-child>
                <button
                  class="p-2 bg-background border rounded-sm hover:bg-background/40 flex flex-row"
                  title="Filter"
                >
                  <span class="pr-2">Filter:</span>
                  <Filter />
                </button>
              </PopoverTrigger>
              <PopoverContent class="w-48"> Test</PopoverContent>
            </Popover>
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
            <div
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 space-x-4"
            >
              <div
                v-if="!isLoading"
                v-for="product in filteredProducts"
                :key="product.id"
                class="max-w-[75rem] justify-center items-center"
              >
                <div class="group flex flex-col bg-white shadow-lg">
                  <div class="overflow-hidden border-b-2 border-primary/60">
                    <div
                      class="h-full flex flex-col justify-center items-center max-h-[22rem]"
                    >
                      <router-link :to="`/product/${product.id}`">
                        <img
                          :src="product.coverPhoto"
                          class="transform transition-all duration-500 hover:scale-110 h-[12rem] md:h-[16rem] object-cover rounded-t-sm"
                        />
                      </router-link>
                    </div>
                  </div>
                  <div class="p-2 md:p-4">
                    <div class="flex flex-row justify-between">
                      <span
                        class="block pb-2 pt-1 md:text-xs font-semibold uppercase text-secondary-foreground/80"
                      >
                        {{ product.category }}
                      </span>
                      <span
                        class="block pb-2 pl-2 pt-1 text-xs md:text-sm font-semibold uppercase text-primary"
                      >
                        (P{{
                          product.price[product.price.length - 1].originalPrice
                        }}
                        )
                      </span>
                    </div>
                    <router-link to="/"
                      ><h3
                        class="text-lg md:text-xl font-bold text-secondary-foreground truncate"
                      >
                        {{ product.name }}
                      </h3>
                    </router-link>
                    <p
                      class="mt-3 text-secondary-foreground text-xs whitespace-wrap text-justify truncate"
                    >
                      {{ product.description }}
                    </p>
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
import FeaturedCarousel from "../../dashboard/components/Carousel.vue";
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
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Filter } from "lucide-vue-next";
import { setup as setupProductsController } from "../controllers/productsController";

const { products, isLoading } = setupProductsController();

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

const filteredProducts = computed(() => {
  const result =
    value.value === "All" || !value.value
      ? products.value
      : products.value.filter((product) => product.faction === value.value);
  console.log(result); // Log the result
  return result;
});
</script>
