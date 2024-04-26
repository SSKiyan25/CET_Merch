<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 h-screen ml-2 sm:ml-64 pb-16">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined p-2 text-5xl"> mail </span>
      </div>
      <div class="flex flex-col px-2">
        <h1 class="text-2xl">Contact Messages</h1>
        <p class="text-sm py-1 text-secondary-foreground/50">
          Manage your contact messages here. You can view, reply, and delete any
          message you want to remove from the list.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5 bg-slate-200">
      <div
        class="flex flex-col md:flex-row justify-between border-b-2 pb-2 space-y-2 md:space-y-0"
      >
        <div class="flex flex-row items-center">
          <h1 class="font-bold text-xl tracking-wide mb-2 pr-2">Inbox</h1>
          <div :class="cn('grid gap-2', $attrs.class ?? '')">
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  id="date"
                  :variant="'outline'"
                  :class="
                    cn(
                      'w-[210px] md:w-[300px] justify-start text-left font-normal text-xs md:text-sm',
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
              <PopoverContent class="w-auto p-0">
                <Calendar v-model.range="date" :columns="2" />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div class="flex flex-row justify-start space-x-2">
          <div class="relative w-full max-w-xs items-center">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-10 text-xs md:text-sm"
              v-model="searchQuery"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <MagnifyingGlassIcon class="size-5 text-gray-600" />
            </span>
          </div>
          <div class="relative w-1/4 max-w-xs items-center">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline"> <Filter /> </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  v-model:checked="all"
                  @change="checkAll"
                >
                  Show All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  v-model:checked="unread"
                  @change="checkOther"
                >
                  Unread
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  v-model:checked="starred"
                  @change="checkOther"
                >
                  Starred
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  v-model:checked="done"
                  @change="checkOther"
                >
                  Done
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div class="py-2 min-w-full">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
              <div class="border-t-2 shadow-sm overflow-hidden">
                <table class="min-w-full divide-y divide-primary/50">
                  <thead class="bg-slate-300">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 w-2/12 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 w-2/12 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 w-3/12 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold text-secondary-foreground uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-primary/50">
                    <tr
                      v-for="(message, index) in statusFilteredInboxMessages"
                      :key="message.id"
                      class="hover:bg-primary/10 bg-white"
                    >
                      <td>
                        <div class="pl-5 py-3">
                          <span
                            class="text-[10px] md:text-xs text-secondary-foreground/80 whitespace-nowrap"
                          >
                            {{ formatDate(message.dateSent) }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="pl-5 py-3">
                          <span
                            class="text-xs text-secondary-foreground/90 whitespace-nowrap"
                          >
                            {{ message.username }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="pl-5 py-3">
                          <span
                            class="text-xs text-secondary-foreground/60 whitespace-nowrap"
                          >
                            {{ message.email }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="pl-5 py-3 max-w-[200px] overflow-hidden">
                          <span
                            class="text-xs text-secondary-foreground/60 truncate"
                          >
                            {{ message.message }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="pl-4 py-3">
                          <button
                            v-if="message.status === 'unread'"
                            class="rounded-lg bg-red-700 px-3 py-1"
                          >
                            <span
                              class="text-xs font-medium text-white cursor-none capitalize"
                              >{{ message.status }}</span
                            >
                          </button>
                          <button
                            v-if="message.status === 'done'"
                            class="rounded-lg bg-emerald-700 px-4 py-1"
                          >
                            <span
                              class="text-xs font-medium text-white cursor-none capitalize"
                              >{{ message.status }}</span
                            >
                          </button>
                        </div>
                      </td>

                      <td>
                        <div
                          class="hs-dropdown relative inline-block [--placement:bottom-right] py-1 pl-9"
                        >
                          <div class="flex flex-row text-sm justify-center">
                            <div class="rounded-sm cursor-pointer space-x-1">
                              <button
                                class="bg-blue-600 text-white p-2 rounded-sm"
                                title="View Details"
                                @click.prevent="toggleDetails(message)"
                              >
                                <span class="material-symbols-outlined text-sm">
                                  visibility
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <div v-if="inboxFullDetails[index]">
                        <div
                          class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
                        >
                          <div
                            class="relative w-full max-w-xl max-h-full bg-background rounded-lg shadow overflow-y-auto p-4"
                            style="max-height: 90vh"
                          >
                            <div class="flex flex-col bg-background rounded-lg">
                              <div class="border-b py-3">
                                <span>Date: </span>
                                <span>{{ formatDate(message.dateSent) }}</span>
                              </div>
                              <div
                                class="flex flex-row items-center justify-between pt-4 px-2 text-sm font-semibold"
                              >
                                <div>
                                  <span> From: </span>
                                  <span>{{ message.username }}</span>
                                </div>
                                <div>
                                  <span>Email: </span>
                                  <span>{{ message.email }}</span>
                                </div>
                              </div>
                              <div
                                class="flex flex-col text-xs py-4 px-4 space-y-2 text-justify"
                              >
                                <span class="font-semibold">Message: </span>
                                <span class="pl-2">{{ message.message }}</span>
                              </div>
                              <div class="flex flex-row justify-end">
                                <Button @click.prevent="toggleDetails(message)">
                                  Close
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
                <!--Footer-->
                <div
                  class="px-6 py-4 grod gap-3 md:flex md:justify-between md:items-center border-t border-primary/20"
                >
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Showing
                      <span
                        class="font-semibold text-gray-800 dark:text-gray-200"
                      >
                        {{ (currentPage - 1) * 10 + 1 }}
                      </span>
                      -
                      <span
                        class="font-semibold text-gray-800 dark:text-gray-200"
                      >
                        {{
                          currentPage * 10 > totalInboxMessages
                            ? totalInboxMessages
                            : currentPage * 10
                        }}
                      </span>
                      results
                      <span
                        class="font-semibold text-gray-800 dark:text-gray-200"
                      >
                        out of {{ totalInboxMessages }} total messages
                      </span>
                    </p>
                  </div>

                  <div>
                    <div class="inline-flex gap-x-2">
                      <button
                        type="button"
                        @click.prevent="prevPage"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-secondary text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
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
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-secondary text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="h-56 md:h-28"></div>
</template>

<script setup lang="ts">
import NavBar from "@/components/admin/dashboard/views/AdminNavBar.vue";
import AdminSidebar from "@/components/admin/dashboard/views/AdminSidebar.vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import type { DropdownMenuCheckboxItemProps } from "radix-vue";
import { ref, onMounted, computed } from "vue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-vue-next";
import { Inbox } from "../models/inboxModel";
import {
  fetchInboxMessages,
  updateInboxMessage,
  nextPage as nextPageInbox,
  prevPage as prevPageInbox,
} from "../controllers/inboxController";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const date = ref({
  start: new Date(2024, 0, 1),
  end: new Date(),
});

type Checked = DropdownMenuCheckboxItemProps["checked"];

const unread = ref<Checked>(false);
const starred = ref<Checked>(false);
const done = ref<Checked>(false);
const all = ref<Checked>(true);

const inboxMessages = ref<Inbox[]>([]);
const currentPage = ref(1);

onMounted(async () => {
  inboxMessages.value = await fetchInboxMessages(currentPage.value);
});

const nextPage = async () => {
  currentPage.value++;
  inboxMessages.value = await nextPageInbox();
};

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    inboxMessages.value = await prevPageInbox();
  }
};

const inboxFullDetails = ref(inboxMessages.value.map(() => false));

const toggleDetails = async (inbox: Inbox) => {
  const index = inboxMessages.value.indexOf(inbox);
  if (index !== -1) {
    inboxFullDetails.value[index] = !inboxFullDetails.value[index];

    inbox.status = "done";
    await updateInboxMessage(inbox);
  }
};

const searchQuery = ref("");

const checkAll = () => {
  if (all.value) {
    unread.value = false;
    starred.value = false;
    done.value = false;
  }
};

const checkOther = () => {
  if (unread.value || starred.value || done.value) {
    all.value = false;
  }
};

const filteredInboxMessages = computed(() => {
  return inboxMessages.value.filter((message) => {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return (
      message.username.toLowerCase().includes(lowerCaseQuery) ||
      message.email.toLowerCase().includes(lowerCaseQuery) ||
      message.message.toLowerCase().includes(lowerCaseQuery) ||
      formatDate(message.dateSent).toLowerCase().includes(lowerCaseQuery)
    );
  });
});

const statusFilteredInboxMessages = computed(() => {
  let messages = filteredInboxMessages.value;
  if (!all.value) {
    messages = messages.filter((message) => {
      return (
        (unread.value && message.status === "unread") ||
        (starred.value && message.status === "starred") ||
        (done.value && message.status === "done")
      );
    });
  }

  if (date.value.start && date.value.end) {
    const startDate = new Date(date.value.start);
    const endDate = new Date(date.value.end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    messages = messages.filter((message) => {
      const messageDate = new Date(message.dateSent);
      return messageDate >= startDate && messageDate <= endDate;
    });
  }

  return messages;
});

const totalInboxMessages = computed(
  () => statusFilteredInboxMessages.value.length
);

const formatDate = (dateString: string) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const date = new Date(dateString);
  const formattedDate = (date.toLocaleDateString as any)([], dateOptions);
  const formattedTime = (date.toLocaleTimeString as any)([], timeOptions);
  return `${formattedDate} (${formattedTime})`;
};
</script>
