<template>
  <div class="relative h-auto">
    <div class="max-w-screen pb-4 mx-auto border-b-2">
      <div
        class="flex bg-inherit items-center justify-center shadow-2xl relative"
      >
        <div
          class="before:absolute before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]"
        >
          <img
            src="/homepage/products-1.jpg"
            class="object-cover md:object-fit brightness-50 backdrop-contrast-50 backdrop-hue-rotate-90 md:w-[1920px] md:h-[720px] w-[1920px] h-[240px]"
          />
        </div>

        <!--Overlayed content-->
        <div
          class="absolute bottom-0 left-0 inset-x-0 z-10 flex flex-col items-start justify-end w-full h-full p-5 md:p-20 space-y-1.5 md:space-y-4 backdrop-filter text-white"
          style="backdrop-filter: blur(1px)"
        >
          <h1
            class="uppercase font-black text-lg md:text-5xl"
            style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            CET Products
          </h1>
          <p
            class="text-start text-[8px] md:text-sm font-semibold text-wrap"
            style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            Get your hands on the latest CET Merchandise. From t-shirts to
            lanyards and more!
          </p>
          <button
            class="bg-white p-1.5 md:p-4 transform transition-all duration-500 hover:scale-110 text-black rounded-md text-[10px] md:text-xl font-bold"
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
        <div class="flex flex-row items-center text-primary pb-4 md:pb:0">
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
                  v-model:checked="item.checked"
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
        <div
          v-if="isLoading"
          class="flex max-w-full h-full pt-8 justify-center items-center"
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
        <div class="flex flex-row px-4 md:px-8">
          <div
            id="products"
            class="flex flex-row px-2 md:px-4 py-8 justify-center"
          >
            <div
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2"
            >
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
                          class="transform transition-all duration-500 hover:scale-110 w-[10rem] md:w-[18rem] h-[8rem] md:h-[16rem] object-cover rounded-t-sm"
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
                      <div class="flex flex-row items-center">
                        <HoverCard>
                          <HoverCardTrigger>
                            <span
                              class="block pb-2 pt-1 text-base md:text-2xl font-bold uppercase text-primary hover:underline hover:cursor-pointer"
                            >
                              P
                              {{ product.displayPrice }}
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent
                            v-if="Object.keys(product.sizes)[0] !== 'N/A'"
                          >
                            <span class="text-xs">
                              Prices may vary depending on the size of the
                              product.
                            </span>
                          </HoverCardContent>
                        </HoverCard>
                        <span class="pl-2 opacity-80 text-[10px] md:text-xs">
                          ({{ product.totalOrders }} Sold)
                        </span>
                      </div>

                      <div
                        class="flex flex-row justify-between items-center text-[8px] md:text-xs"
                      >
                        <div>
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
          </div>
        </div>
        <div
          v-if="!isLoading && filteredProducts.length === 0"
          class="flex flex-row text-primary min-w-full min-h-full pb-16 justify-center items-center mx-auto"
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
    <div class="pb-12"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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

const dropdownItems = ref([
  { value: "All", label: "Show All", checked: false },
  { value: "T-Shirt", label: "T-Shirt", checked: false },
  { value: "Polo-Shirt", label: "Polo-Shirt", checked: false },
  { value: "Lanyard", label: "Lanyard", checked: false },
  { value: "Hoodie", label: "Hoodie", checked: false },
  { value: "Stickers", label: "Stickers", checked: false },
  { value: "Other", label: "Other", checked: false },
]);

watch(selectedItem, (newVal) => {
  if (newVal === "All") {
    dropdownItems.value.forEach((item) => {
      item.checked = item.value === "All";
    });
  }
});

const filteredProducts = computed(() => {
  let result =
    value.value === "All" || !value.value
      ? products.value
      : products.value.filter((product) => product.faction === value.value);

  const checkedItems = dropdownItems.value.filter((item) => item.checked);
  if (checkedItems.length > 0 && checkedItems[0].value !== "All") {
    result = result.filter((product) =>
      checkedItems.some((item) => product.category === item.value)
    );
  }

  return result;
});
</script>
