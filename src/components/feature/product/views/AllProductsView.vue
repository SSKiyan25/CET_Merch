<template>
  <div class="max-w-screen h-auto pb-4 mx-auto border-b-2">
    <div>
      <FeaturedCarousel />
    </div>
  </div>
  <div class="mx-auto w-11/12 h-screen">
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
    <div class="flex flex-row px-2 md:px-4 py-8 justify-start rounded-3xl">
      <div class="max-w-full justify-start items-center">
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5">
          <div class="flex flex-col bg-white shadow-md rounded-sm">
            <div class="overflow-hidden">
              <div
                class="h-full flex flex-col border-b-2 border-primary/60 justify-center items-center max-h-[22rem]"
              >
                <router-link to="/">
                  <img
                    src="/1-Lanyard.png"
                    class="transform transition-all duration-500 hover:scale-110 max-h-[20rem] md:max-h-[22rem] object-cover rounded-t-sm"
                  />
                </router-link>
              </div>
            </div>
            <div class="p-2 md:p-3">
              <div class="flex flex-row justify-between">
                <span
                  class="block pb-2 pt-1 md:text-xs font-semibold uppercase text-secondary-foreground/80"
                >
                  Category
                </span>
                <span
                  class="block pb-2 pl-2 pt-1 text-xs md:text-sm font-semibold uppercase text-primary"
                >
                  (P )
                </span>
              </div>
              <router-link to="/"
                ><h3
                  class="text-lg md:text-2xl font-bold text-secondary-foreground truncate"
                >
                  Name
                </h3>
              </router-link>
              <p
                class="mt-3 text-secondary-foreground text-xs whitespace-wrap text-justify truncate"
              >
                Description
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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

const open = ref(false);
const value = ref<string>("");

const frameworks = [
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lanyard", label: "Lanyard" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
  { value: "All", label: "All" },
];
</script>
