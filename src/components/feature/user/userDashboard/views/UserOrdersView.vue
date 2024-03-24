<template>
  <UserSidebar />
  <div class="p-4 ml-2 pt-16 sm:ml-64 pb-16">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined p-2 text-5xl">
          shopping_bag
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">Your Orders</h1>
        <p class="text-sm py-1 text-secondary-foreground/50">
          View and manage your orders. You can filter by status, date range or
          search for a specific order.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row justify-between border-b-2">
        <div class="flex flex-row">
          <h1 class="font-bold text-xl tracking-wide mt-1">Orders</h1>
          <div class="flex flex-row pl-2">
            <div :class="cn('grid gap-2', $attrs.class ?? '')">
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    id="date"
                    :variant="'outline'"
                    :class="
                      cn(
                        'w-[300px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )
                    "
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />

                    <span>
                      {{
                        date.start
                          ? date.end
                            ? `${format(date.start, "LLL dd, y")} - ${format(
                                date.end,
                                "LLL dd, y"
                              )}`
                            : format(date.start, "LLL dd, y")
                          : "Pick a date"
                      }}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0" align="start">
                  <Calendar v-model.range="date" :columns="2" />
                </PopoverContent>
              </Popover>
            </div>
            <Button variant="outline"><ChevronDown /></Button>
          </div>
        </div>
        <div class="flex flex-row pb-2 space-x-2">
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
              <div class="text-xs">
                <Popover v-model:open="open">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :aria-expanded="open"
                      class="w-[130px] justify-between text-xs"
                    >
                      {{
                        value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Select Category"
                      }}
                      <ChevronsUpDown
                        class="pl-1 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-[120px] p-0">
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
                              (ev:any) => {
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

              <div class="px-1">
                <button
                  class="p-2 bg-background border-1 rounded-lg hover:bg-background/40"
                  title="Export"
                >
                  <Download />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!--Table Section-->
      <div class="py-2 min-w-full">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
              <div class="bg-secondary border-t-w shadow-sm overflow-hiden">
                <table class="min-w-full divide-y divide-primary/50">
                  <thead class="bg-secondary">
                    <tr>
                      <th scope="col" class="pl-4 w-2/12 py-2 text-start">
                        <span
                          class="text-sm font-semibold uppecase tracking-wide text-secondary-foregroun"
                        >
                          Order Ref #
                        </span>
                      </th>
                      <th scope="col" class="px-4 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Date
                        </span>
                      </th>
                      <th scope="col" class="px-3 py-2 w-3/12 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foregroun"
                          >Product/s
                        </span>
                      </th>
                      <th scope="col" class="pl-4 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >Total
                        </span>
                      </th>
                      <th scope="col" class="px-4 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >Status
                        </span>
                      </th>
                      <th scope="col" class="px-4 py-2 text-start">
                        <span
                          class="text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                          >Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import UserSidebar from "../views/UserSidebarView.vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Download, ChevronDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
const open = ref(false);
const value = ref<string>("");
const date = ref({
  start: new Date(2024, 0, 20),
  end: addDays(new Date(2024, 0, 20), 20),
});
onMounted(() => {
  initFlowbite();
});

const frameworks = [
  { value: "Paid", label: "Paid" },
  { value: "Pending", label: "Pending" },
  { value: "Declined", label: "Declined" },
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Polo-Shirt", label: "Polo-Shirt" },
  { value: "Lace", label: "Lace" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Stickers", label: "Stickers" },
];
</script>
