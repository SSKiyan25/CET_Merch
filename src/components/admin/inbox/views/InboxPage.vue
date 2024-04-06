<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 bg-slate-100 h-screen ml-2 sm:ml-64 pb-16">
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
    <div class="flex flex-col p-4 border-2 rounded-lg py-5">
      <div class="flex flex-row justify-between border-b-2 pb-2">
        <div class="flex flex-row">
          <h1 class="font-bold text-xl tracking-wide mb-2">Inbox</h1>
        </div>
        <!--Other Functionalities Put here-->
        <div class="flex flex-row justify-start space-x-2">
          <div class="relative w-full max-w-xs items-center">
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
          <div class="relative w-1/4 max-w-xs items-center">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline"> <Filter /> </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem v-model:checked="unread">
                  Unread
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem v-model:checked="starred">
                  Starred
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem v-model:checked="done">
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
              <div class="bg-slate-200 border-t-2 shadow-sm overflow-hidden">
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
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-primary/50">
                    <tr
                      v-for="message in inboxMessages"
                      :key="message.id"
                      class="hover:bg-primary/10"
                    >
                      <td>
                        <div class="pl-5 py-3">
                          <span
                            class="text-xs text-secondary-foreground/60 whitespace-nowrap"
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
                            class="rounded-lg bg-emerald-700 px-3 py-1"
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
                          class="hs-dropdown relative inline-block [--placement:bottom-right] py-1 pl-5"
                        >
                          <div class="flex flex-row text-sm justify-end">
                            <div class="rounded-sm cursor-pointer space-x-1">
                              <button
                                class="bg-blue-600 text-white p-2 rounded-sm"
                                title="View Details"
                              >
                                <span class="material-symbols-outlined text-sm">
                                  visibility
                                </span>
                              </button>
                              <button
                                class="bg-red-600 text-white p-2 rounded-sm"
                                title="Archive Order"
                              >
                                <span class="material-symbols-outlined text-sm">
                                  delete
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--Footer-->
                <div
                  class="px-6 py-4 grod gap-3 md:flex md:justify-between md:items-center border-t border-primary/20"
                >
                  <div>
                    <p class="text-sm">
                      <span class="font-semibold"> 1-N </span>
                      results
                    </p>
                  </div>
                  <div>
                    <div class="inline-flex gap-x-2">
                      <button
                        type="button"
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
</template>

<script setup lang="ts">
import NavBar from "@/components/admin/dashboard/views/AdminNavBar.vue";
import AdminSidebar from "@/components/admin/dashboard/views/AdminSidebar.vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import type { DropdownMenuCheckboxItemProps } from "radix-vue";
import { ref, onMounted } from "vue";
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
import { Inbox } from "../models/inboxModel.ts";
import { fetchInboxMessages } from "../controllers/inboxController.ts";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const unread = ref<Checked>(false);
const starred = ref<Checked>(false);
const done = ref<Checked>(false);

const inboxMessages = ref<Inbox[]>([]);
onMounted(async () => {
  inboxMessages.value = await fetchInboxMessages();
});

const formatDate = (dateString: string) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const date = new Date(dateString);
  const formattedDate = (date.toLocaleDateString as any)([], dateOptions);
  const formattedTime = (date.toLocaleTimeString as any)([], timeOptions);
  return `${formattedDate} (${formattedTime})`;
};
</script>
