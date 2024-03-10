<template>
  <div
    class="flex flex-col md:flex-row pt-12 pb-8 px-4 md:px-12 justify-between"
  >
    <div class="flex flex-row space-x-1 md:mb-0">
      <span
        class="material-symbols-outlined text-5xl text-secondary-foreground"
      >
        store
      </span>
      <span class="font-bold text-4xl">Products</span>
    </div>
    <div class="">
      <form class="min-w-xl mx-auto">
        <div class="flex flex-col md:flex-row">
          <div
            class="relative w-full max-w-sm items-center mb-4 md:mb-0 md:mr-1"
          >
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
          </div>
          <!--Popover-->
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
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Select Category"
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
  </div>
  <div class="flex flex-row px-16 pb-72 justify-center">
    <!-- Card Blog -->
    <div class="max-w-[75rem] justify-center items-center">
      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="group flex flex-col bg-background border border-primary/50 shadow-sm rounded-b-xl"
        >
          <div
            class="h-full flex flex-col border-b-2 border-primary/60 justify-center items-center"
          >
            <img :src="product.coverPhoto" />
          </div>
          <div class="p-4 md:p-6">
            <div class="flex flex-row">
              <span
                class="block pb-2 pt-1 text-xs font-semibold uppercase text-secondary-foreground/30"
              >
                {{ product.category }}
              </span>
              <span
                class="block pb-2 pl-2 pt-1 text-xs font-semibold uppercase text-primary"
              >
                (P {{ product.price }})
              </span>
            </div>

            <h3
              class="text-xl font-semibold text-secondary-foreground text-wrap"
            >
              {{ product.name }}
            </h3>
            <p
              class="mt-3 text-secondary-foreground/30 text-xs whitespace-wrap text-justify truncate"
            >
              {{ product.description }}
            </p>
          </div>
          <div
            class="mt-auto flex border-t border-secondary divide-x divide-secondary"
          >
            <router-link
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
              :to="`/product/${product.id}`"
            >
              View Product
            </router-link>
            <Sheet>
              <SheetTrigger as-child>
                <button
                  class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  Order Now
                </button>
              </SheetTrigger>
              <Cart />
            </Sheet>
          </div>
        </div>
        <!-- End Card -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";
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
import Cart from "@/components/feature/user/views/AddToCartView.vue";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { setup as setupProductController } from "../controllers/products_controller.ts";

const frameworks = [
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lace", label: "Lace" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
];

const open = ref(false);
const value = ref<string>("");

const { products } = setupProductController();
</script>
