<template>
  <NavBar />
  <AdminSidebar />
  <div class="p-4 ml-2 sm:ml-64 pb-16">
    <div class="flex flex-row justify-start py-10">
      <div class="flex">
        <span class="material-symbols-outlined p-2 text-5xl">
          shopping_bag
        </span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-2xl">User Orders</h1>
        <p class="text-sm py-1 text-secondary-foreground/50">
          View and manage user orders. You can filter by status, date range or
          search for a specific order.
        </p>
      </div>
    </div>
    <div class="flex flex-col p-4 border-2 rounded-lg py-5 bg-slate-200">
      <div
        class="flex flex-col md:flex-row justify-between border-b-2 space-y-2"
      >
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
        </div>
        <div class="flex flex-row pb-2 space-x-2">
          <form>
            <div class="flex relative w-full max-w-sm items-center">
              <Input
                id="search"
                type="text"
                placeholder="Search..."
                class="pl-10 text-xs md:text-sm"
                v-model="searchTerm"
              />
              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
              </span>
              <div class="ps-1 text-xs">
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
              <div class="bg-slate-100 shadow-sm overflow-hidden">
                <table class="min-w-full divide-y divide-primary/50">
                  <thead class="bg-slate-300">
                    <tr>
                      <th scope="col" class="pl-4 w-1/12 py-2 text-start">
                        <span
                          class="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Order ID
                        </span>
                      </th>
                      <th scope="col" class="w-2/12 px-4 py-2 text-start">
                        <span
                          class="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Date
                        </span>
                      </th>

                      <th scope="col" class="py-2 w-3/12 text-start">
                        <span
                          class="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Customer
                        </span>
                      </th>
                      <th scope="col" class="pr-4 py-2 text-start">
                        <span
                          class="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Total
                        </span>
                      </th>
                      <th scope="col" class="pl-4 md:pl-0 py-2 text-start">
                        <span
                          class="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Order Status
                        </span>
                      </th>
                      <th scope="col" class="pl-4 md:pl-0 py-2 text-start">
                        <span
                          class="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Payment Status
                        </span>
                      </th>
                      <th scope="col" class="py-2 text-start">
                        <span
                          class="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                        >
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-primary/50">
                    <tr v-if="loadingPage">
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>

                      <td class="p-4">
                        <div
                          class="flex items-center justify-start pl-4 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-end pr-16 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-end pr-16 h-full w-full"
                        >
                          <span
                            class="material-symbols-outlined text-2xl text-primary animate-spin"
                          >
                            autorenew
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(order, index) in paginatedOrders"
                      :key="order.id"
                      class="hover:bg-primary/10"
                    >
                      <td>
                        <div class="pl-5 py-6">
                          <span
                            class="text-[10px] md:text-xs font-semibold text-primary/80 underline"
                            >{{ order.orderRefNum }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="p-3 w-40 md:pr-0">
                          <span
                            class="text-[10px] md:text-xs font-medium text-secondary-foreground/80"
                            >{{ formatDate(order.dateOrdered) }}</span
                          >
                        </div>
                      </td>

                      <td>
                        <div class="flex flex-col pr-8 md:pr-0 space-y-1">
                          <span
                            class="text-[10px] md:text-xs text-secondary-foreground font-semibold truncate"
                            >{{ order.userName }}
                          </span>
                          <span
                            class="text-[10px] md:text-xs text-secondary-foreground/60 truncate"
                          >
                            {{ order.userEmailAddress }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="">
                          <span
                            class="text-[10px] md:text-xs text-secondary-foreground/60"
                            >P{{ order.totalPrice }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          class="text-[10px] md:text-[12px] text-black font-medium pl-3 md:pl-0 pr-8 md:pr-0"
                        >
                          <button
                            v-if="order.orderStatus === 'processing'"
                            class="w-16 h-8 rounded-lg border cursor-auto md:ml-2 hover:bg-zinc-600 hover:text-white"
                          >
                            Processing
                          </button>
                          <button
                            v-else-if="order.orderStatus === 'ready'"
                            class="w-16 h-8 rounded-lg border cursor-auto ml-2 hover:bg-zinc-600 hover:text-white"
                          >
                            Ready
                          </button>
                          <button
                            v-else-if="order.orderStatus === 'done'"
                            class="w-16 h-8 rounded-lg border cursor-auto ml-2 hover:bg-zinc-600 hover:text-white"
                          >
                            Fulfilled
                          </button>
                          <button
                            v-else-if="order.orderStatus === 'cancelled'"
                            class="w-16 h-8 rounded-lg border cursor-auto ml-2 hover:bg-zinc-600 hover:text-white"
                          >
                            Cancelled
                          </button>
                          <button
                            v-else-if="order.orderStatus === 'declined'"
                            class="w-16 h-8 rounded-lg border cursor-auto ml-2 hover:bg-zinc-600 hover:text-white"
                          >
                            Declined
                          </button>
                        </div>
                      </td>
                      <td>
                        <div class="w-40 pl-4 md:pl-2 py-2">
                          <button
                            v-if="order.paymentStatus === 'pending'"
                            class="w-16 h-8 rounded-lg border cursor-auto ml-2 hover:bg-zinc-600 hover:text-white items-center"
                          >
                            <span class="text-[10px] md:text-xs font-medium">
                              Pending
                            </span>
                          </button>

                          <button
                            v-if="order.paymentStatus === 'declined'"
                            class="w-16 h-8 rounded-lg border cursor-auto ml-2 hover:bg-zinc-600 hover:text-white items-center"
                          >
                            <span class="text-[10px] md:text-xs font-medium">
                              Declined
                            </span>
                          </button>

                          <button
                            v-if="order.paymentStatus === 'cancelled'"
                            class="w-16 h-8 rounded-lg border cursor-auto ml-2 hover:bg-zinc-600 hover:text-white items-center"
                          >
                            <span class="text-[10px] md:text-xs font-medium">
                              Cancelled
                            </span>
                          </button>

                          <button
                            v-if="order.paymentStatus === 'paid'"
                            class="w-16 h-8 rounded-lg border cursor-auto ml-2 hover:bg-zinc-600 hover:text-white items-center"
                          >
                            <span class="text-[10px] md:text-xs font-medium">
                              Paid
                            </span>
                          </button>

                          <button
                            class="text-secondary-foreground/60 hover:text-secondary-foreground"
                            title="Edit Status"
                            @click.prevent="toggleDetails(order)"
                          >
                            <span
                              class="material-symbols-outlined text-xs px-1"
                            >
                              edit
                            </span>
                          </button>
                        </div>
                      </td>

                      <td>
                        <div
                          class="hs-dropdown relative inline-block py-1 w-24 pr-8 md:pr-8"
                        >
                          <div class="flex flex-row text-sm justify-end">
                            <div class="rounded-sm cursor-pointer space-x-1">
                              <button
                                class="bg-blue-600 text-white p-2 rounded-sm"
                                title="View Details"
                                @click.prevent="toggleDetails(order)"
                              >
                                <span class="material-symbols-outlined text-sm">
                                  visibility
                                </span>
                              </button>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <button
                                    class="bg-red-600 text-white p-2 rounded-sm"
                                    title="Decline Order"
                                    v-bind:disabled="
                                      order.orderStatus === 'done' ||
                                      order.orderStatus === 'cancelled' ||
                                      order.orderStatus === 'declined'
                                    "
                                    :class="{
                                      'cursor-not-allowed opacity-50':
                                        order.orderStatus === 'done' ||
                                        order.orderStatus === 'cancelled' ||
                                        order.orderStatus === 'declined',
                                    }"
                                    @click.prevent="openDeclineModal"
                                  >
                                    <span
                                      :class="{
                                        'cursor-not-allowed':
                                          order.orderStatus === 'done',
                                      }"
                                      class="material-symbols-outlined text-sm"
                                    >
                                      block
                                    </span>
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle class="border-b">
                                      Decline Order
                                    </AlertDialogTitle>
                                    <AlertDialogDescription class="text-black">
                                      <div
                                        class="flex flex-col justify-center space-y-2"
                                      >
                                        <p>
                                          Are you sure you want to decline this
                                          order?
                                        </p>
                                        <p
                                          class="text-xs text-primary font-bold"
                                        >
                                          If yes, why?
                                        </p>
                                        <input
                                          type="text"
                                          id="order-remarks"
                                          v-model="tempRemarks"
                                          class="p-3 border rounded-sm text-xs bg-background border-primary/40 text-secondary-foreground"
                                          placeholder="Give your reasons..."
                                          required
                                        />
                                      </div>
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogAction
                                      class="bg-background hover:bg-gray-100 text-secondary-foreground"
                                    >
                                      Cancel
                                    </AlertDialogAction>
                                    <AlertDialogAction
                                      @click.prevent="
                                        declineOrder(order, tempRemarks)
                                      "
                                      class="bg-red-800 hover:bg-red-900 text-white"
                                    >
                                      Decline
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      </td>
                      <div v-if="showFullDetails[index]">
                        <div
                          class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
                        >
                          <div
                            class="relative w-full max-w-xl max-h-full bg-white rounded-lg shadow overflow-y-auto"
                            style="max-height: 90vh"
                          >
                            <div
                              class="flex flex-col relative bg-white rounded-lg"
                            >
                              <div
                                class="flex flex-col border-b border-secondary-foreground/50 py-2 pb-4 bg-slate-300 -space-y-3"
                              >
                                <div class="flex flex-row items-center">
                                  <span
                                    class="font-bold text-primary text-xl p-4"
                                    >Order ID:
                                  </span>
                                  <span
                                    class="font-bold text-secondary-foreground text-xl underline"
                                    >{{ order.orderRefNum }}</span
                                  >
                                </div>
                                <div
                                  class="flex flex-row items-center opacity-70 px-4 space-x-2"
                                >
                                  <span class="font-bold text-sm">Date: </span>
                                  <span class="font-semibold text-xs">
                                    {{ formatDate(order.dateOrdered) }}
                                  </span>
                                </div>
                              </div>
                              <div
                                class="flex flex-col p-4 space-y-2 border-b border-secondary-foreground/20"
                              >
                                <div>
                                  <span class="font-semibold"
                                    >Customer Information</span
                                  >
                                </div>
                                <div
                                  class="flex flex-col pl-2 md:pl-8 space-y-2 text-xs md:text-sm opacity-80"
                                >
                                  <div
                                    class="flex flex-row justify-between text-xs"
                                  >
                                    <div class="flex flex-row">
                                      <span class="font-bold">Name: </span>
                                      <span class="pl-2">
                                        {{ order.userName }}
                                      </span>
                                    </div>
                                    <div
                                      v-if="order.studentId"
                                      class="flex flex-row"
                                    >
                                      <span class="font-bold pl-4"
                                        >Student ID:</span
                                      >
                                      <span class="pl-2">{{
                                        order.studentId
                                      }}</span>
                                    </div>
                                  </div>
                                  <div
                                    class="flex flex-col md:flex-row justify-between space-y-1 text-xs"
                                  >
                                    <div class="flex flex-row">
                                      <span class="font-bold">Email: </span>
                                      <span
                                        class="pl-2 underline text-blue-700 cursor-pointer"
                                        >{{ order.userEmailAddress }}</span
                                      >
                                    </div>
                                    <div
                                      v-if="order.userContactNumber"
                                      class="flex flex-row"
                                    >
                                      <span class="font-bold md:pl-4"
                                        >Contact Number:
                                      </span>
                                      <span class="pl-2"
                                        >{{ order.userContactNumber }}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="flex flex-col p-4 space-y-2 border-b border-secondary-foreground/20"
                              >
                                <div
                                  class="flex flex-row justify-between items-center"
                                >
                                  <span class="font-semibold"
                                    >Order Details</span
                                  >
                                  <span
                                    class="text-xs font-bold capitalize text-primary underline"
                                    >Status: {{ order.orderStatus }}</span
                                  >
                                </div>
                                <div
                                  class="flex flex-col pl-4 space-y-2 text-sm"
                                >
                                  <div class="flex flex-row opacity-80">
                                    <span>Product/s ordered:</span>
                                  </div>
                                  <div
                                    v-for="(product, index) in order.cart"
                                    :key="product"
                                    class="pl-2 text-[10px] md:text-xs"
                                  >
                                    <span class="opacity-80">
                                      {{ index + 1 }} |</span
                                    >
                                    <span class="pl-2 truncate opacity-80">
                                      {{
                                        product.details.name
                                          ? product.details.name
                                          : "Product not found"
                                      }}
                                      --
                                    </span>
                                    <span class="px-2 font-bold text-primary">
                                      Size: {{ product.size }}
                                    </span>
                                    <span class="opacity-80">x </span
                                    ><span class="font-bold text-primary px-1">
                                      {{ product.quantity }}</span
                                    >
                                    <span class="opacity-80">--</span>

                                    <span class="pl-2 opacity-80"
                                      >P {{ product.totalPrice }}</span
                                    >
                                    <span
                                      v-if="product.isPreOrdered"
                                      class="pl-2 font-bold text-primary"
                                    >
                                      || Pre-Ordered! ||
                                    </span>
                                  </div>
                                </div>
                                <div
                                  class="flex flex-row items-center space-x-1 pt-4"
                                  :class="{
                                    'opacity-50 cursor-not-allowed':
                                      order.orderStatus === 'cancelled',
                                  }"
                                  v-if="
                                    order.orderStatus !== 'done' &&
                                    order.orderStatus !== 'declined' &&
                                    order.orderStatus !== 'cancelled'
                                  "
                                >
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    class="w-4 h-4 text-primary/80 bg-background border-primary/40 rounded focus:ring-primary focus:ring-2"
                                    :checked="order.orderStatus === 'ready'"
                                    v-bind:disabled="
                                      order.orderStatus === 'cancelled'
                                    "
                                    :class="{
                                      'cursor-not-allowed':
                                        order.orderStatus === 'cancelled',
                                    }"
                                    @change="readyOrder(order)"
                                  />
                                  <span
                                    :class="{
                                      'cursor-not-allowed':
                                        order.orderStatus === 'cancelled',
                                    }"
                                    class="text-xs font-semibold"
                                    >Mark order as ready to get
                                  </span>
                                </div>
                                <div v-else class="flex flex-col">
                                  <div>
                                    <label class="text-sm font-semibold"
                                      >Order Remarks -
                                    </label>
                                    <span
                                      v-if="order.orderStatus === 'declined'"
                                      class="font-bold text-primary text-xs"
                                    >
                                      Declined</span
                                    >
                                    <span
                                      v-if="order.orderStatus === 'cancelled'"
                                      class="font-bold text-primary text-xs"
                                    >
                                      Declined</span
                                    >
                                  </div>
                                  <div class="indent-4 text-xs py-2">
                                    <p class="pl-4 pt-2">
                                      {{
                                        order.remarks
                                          ? order.remarks
                                          : "No remarks"
                                      }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="flex flex-col p-4 space-y-2 border-b border-secondary-foreground/20"
                              >
                                <div>
                                  <span class="font-semibold"
                                    >Payment Details</span
                                  >
                                </div>
                                <div
                                  class="flex flex-col pl-4 space-y-2 text-xs"
                                >
                                  <div
                                    class="flex row justify-between opacity-80"
                                  >
                                    <div class="flex flex-row">
                                      <span>Payment Status:</span>
                                      <span class="pl-2 font-bold"
                                        >{{ order.paymentStatus }}
                                      </span>
                                    </div>
                                    <div class="flex flex-row">
                                      <span>Payment Method:</span>
                                      <span class="pl-2"
                                        >{{ order.paymentMethod }}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    class="flex flex-row text-primary font-bold"
                                  >
                                    <span>Total Payment:</span>
                                    <span class="pl-2">
                                      {{ order.totalPrice }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="flex flex-row justify-between p-4">
                                <div
                                  class="flex flex-row items-center justify-start"
                                  :class="{
                                    'opacity-50 cursor-not-allowed':
                                      order.orderStatus === 'cancelled' ||
                                      order.orderStatus === 'declined',
                                  }"
                                >
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    class="w-6 h-6 text-primary/80 bg-background border-primary/40 rounded focus:ring-primary focus:ring-2"
                                    :class="{
                                      'cursor-not-allowed':
                                        order.orderStatus === 'cancelled' ||
                                        order.orderStatus === 'declined',
                                    }"
                                    :checked="order.paymentStatus === 'paid'"
                                    v-bind:disabled="
                                      order.orderStatus === 'cancelled' ||
                                      order.orderStatus === 'declined'
                                    "
                                    @change="markAsPaid(order)"
                                  />
                                  <label
                                    :class="{
                                      'cursor-not-allowed':
                                        order.orderStatus === 'cancelled',
                                    }"
                                    for="checkbox"
                                    class="pl-2 text-xs font-semibold"
                                    >Mark Status as Paid
                                  </label>
                                </div>
                                <div
                                  class="flex flex-row justify-end space-x-2"
                                >
                                  <Button
                                    variant="default"
                                    @click.prevent="toggleDetails(order)"
                                  >
                                    Close
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <!--Loading if checkbox marked/unmarked-->
                            <div
                              v-if="loadingCheckbox"
                              class="flex inset-0 items-center justify-center absolute w-full h-full z-50 bg-black bg-opacity-30"
                            >
                              <span
                                class="material-symbols-outlined text-9xl text-primary animate-spin opacity-90"
                              >
                                autorenew
                              </span>
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
                  <div class="flex flex-row items-center">
                    <p class="text-sm text-secondary-foreground">
                      <span class="font-semibold text-black"
                        >Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{
                          Math.min(
                            currentPage * itemsPerPage,
                            filteredOrders.length
                          )
                        }}
                      </span>
                      results
                    </p>
                    <p class="pl-1 text-sm text-black opacity-50">
                      out of {{ orders.length }} total orders
                    </p>
                  </div>
                  <div>
                    <div class="inline-flex gap-x-2">
                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-background text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
                        @click.prevent="prevPage"
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
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-primary/20 bg-background text-secondary-foreground shadow-sm hover:bg-primary/50 hover:border-muted disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-1 focus:ring-primary/60"
                        @click.prevent="nextPage"
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
  <div class="h-32"></div>
</template>

<script setup lang="ts">
import NavBar from "@/components/admin/dashboard/views/AdminNavBar.vue";
import AdminSidebar from "@/components/admin/dashboard/views/AdminSidebar.vue";
import { ref, computed } from "vue";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Download } from "lucide-vue-next";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { Order } from "../models/adminOrdersModel";
import { setup as setupOrdersController } from "../controllers/adminOrdersController";

const open = ref(false);
const searchTerm = ref("");
const value = ref<string>("all");

const {
  orders,
  markAsPaid,
  declineOrder,
  readyOrder,
  loadingPage,
  loadingCheckbox,
} = setupOrdersController();

const date = ref({
  start: new Date(2024, 0, 1),
  end: new Date(),
});
const showFullDetails = ref(orders.value.map(() => false));

const toggleDetails = (order: Order) => {
  const index = orders.value.indexOf(order);
  if (index !== -1) {
    showFullDetails.value[index] = !showFullDetails.value[index];
  }
};

const frameworks = [
  { value: "all", label: "Show All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "declined", label: "Declined" },
  { value: "cancelled", label: "Cancelled" },
];

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const orderDate = new Date(order.dateOrdered);

    const matchesSearchTerm = [
      order.orderRefNum,
      order.userName,
      ...order.cart.map((product) => product.productName),
    ]
      .filter((field) => field) // Remove undefined fields
      .some((field) =>
        field.toLowerCase().includes(searchTerm.value.toLowerCase())
      );

    const matchesSelectedCategory =
      value.value !== "all" ? order.paymentStatus === value.value : true;

    const isWithinDateRange =
      (!date.value.start || orderDate >= date.value.start) &&
      (!date.value.end || orderDate <= date.value.end);

    return matchesSearchTerm && matchesSelectedCategory && isWithinDateRange;
  });
});

const currentPage = ref(1);
const itemsPerPage = ref(10);

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredOrders.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage.value);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const formatDate = (dateString: string) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const date = new Date(dateString);
  const formattedDate = (date.toLocaleDateString as any)([], dateOptions);
  const formattedTime = (date.toLocaleTimeString as any)([], timeOptions);
  return `${formattedDate} (${formattedTime})`;
};

let tempRemarks = ref("");

const openDeclineModal = () => {
  tempRemarks.value = "";
};
</script>
