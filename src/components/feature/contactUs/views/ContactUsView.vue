<template>
  <!-- Contact Us -->
  <div class="max-w-[85rem] h-full px-4 py-4 sm:px-6 lg:px-8 lg:py-10 mx-auto">
    <div class="grid md:grid-cols-2 items-start gap-6">
      <div class="max-w-full pt-8">
        <div class="text-start">
          <h1 class="text-xl font-bold text-primary md:text-4xl">Contact us</h1>
          <p class="text-xs md:text-sm mt-1 text-secondary-foreground/70">
            We'd love to talk about how we can help you.
          </p>
        </div>
        <div class="">
          <div class="pl-2 md:pl-4 pt-8 space-y-6">
            <div v-for="seller in sortedSellers" :key="seller.contactEmail">
              <!--CET-->
              <div v-if="seller.faction === 'CET'" class="flex flex-col">
                <div class="flex flex-row items-center">
                  <img src="/logo-2.png" class="w-8 h-auto" />
                  <label class="font-bold text-black text-lg md:text-xl"
                    >CET-SSC
                    <span class="opacity-70 text-black text-sm md:text-xs">
                      (College of Engineering and Technology Supreme Student
                      Council)
                    </span>
                  </label>
                </div>
                <div class="flex flex-col pl-4 md:pl-8 py-4 space-y-4">
                  <div class="flex flex-row items-center space-x-2">
                    <Mail />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Email Address:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                    >
                      {{ seller.contactEmail }}
                    </label>
                    <span
                      v-if="!seller.contactEmail"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <PhoneCall />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Phone Number:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.phoneNumber }}</label
                    >
                    <span
                      v-if="!seller.phoneNumber"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <Facebook />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Facebook Page:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.fbLink }}</label
                    >
                    <span
                      v-if="!seller.fbLink"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                </div>
              </div>

              <!--BSCS-->
              <div v-if="seller.faction === 'BSCS'" class="flex flex-col">
                <div class="flex flex-row items-center space-x-1">
                  <img src="/logos/cs.png" class="w-8 h-auto" />
                  <label class="font-bold text-black text-lg md:text-xl"
                    >CS3 - VSU
                    <span class="opacity-70 text-black text-sm md:text-xs">
                      (Computer Science Students' Society - Visayas State
                      University)
                    </span>
                  </label>
                </div>
                <div class="flex flex-col pl-4 md:pl-8 py-4 space-y-4">
                  <div class="flex flex-row items-center space-x-2">
                    <Mail />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Email Address:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                    >
                      {{ seller.contactEmail }}
                    </label>
                    <span
                      v-if="!seller.contactEmail"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <PhoneCall />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Phone Number:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.phoneNumber }}</label
                    >
                    <span
                      v-if="!seller.phoneNumber"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <Facebook />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Facebook Page:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.fbLink }}</label
                    >
                    <span
                      v-if="!seller.fbLink"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                </div>
              </div>

              <!--BSCE-->
              <div v-if="seller.faction === 'BSCE'" class="flex flex-col">
                <div class="flex flex-row items-center space-x-1">
                  <img src="/logos/pice.png" class="w-8 h-auto" />
                  <label class="font-bold text-black text-lg md:text-xl"
                    >PICE-VSUSC
                    <span class="opacity-70 text-black text-sm md:text-xs">
                      (Philippine Institute of Civil Engineers - Visayas State
                      University SC)
                    </span>
                  </label>
                </div>
                <div class="flex flex-col pl-4 md:pl-8 py-4 space-y-4">
                  <div class="flex flex-row items-center space-x-2">
                    <Mail />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Email Address:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                    >
                      {{ seller.contactEmail }}
                    </label>
                    <span
                      v-if="!seller.contactEmail"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <PhoneCall />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Phone Number:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.phoneNumber }}</label
                    >
                    <span
                      v-if="!seller.phoneNumber"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <Facebook />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Facebook Page:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.fbLink }}</label
                    >
                    <span
                      v-if="!seller.fbLink"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                </div>
              </div>

              <!--BSGE-->
              <div v-if="seller.faction === 'BSGE'" class="flex flex-col">
                <div class="flex flex-row items-center space-x-1">
                  <img src="/logos/gep.png" class="w-8 h-auto" />
                  <label class="font-bold text-black text-lg md:text-xl"
                    >GEP-VSUSC
                    <span class="opacity-70 text-black text-sm md:text-xs">
                      (Geodetic Engineers of the Philippines - VSU SC)
                    </span>
                  </label>
                </div>
                <div class="flex flex-col pl-4 md:pl-8 py-4 space-y-4">
                  <div class="flex flex-row items-center space-x-2">
                    <Mail />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Email Address:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                    >
                      {{ seller.contactEmail }}
                    </label>
                    <span
                      v-if="!seller.contactEmail"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <PhoneCall />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Phone Number:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.phoneNumber }}</label
                    >
                    <span
                      v-if="!seller.phoneNumber"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <Facebook />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Facebook Page:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.fbLink }}</label
                    >
                    <span
                      v-if="!seller.fbLink"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                </div>
              </div>

              <!--BSABE-->
              <div v-if="seller.faction === 'BSABE'" class="flex flex-col">
                <div class="flex flex-row items-center space-x-1">
                  <img src="/logos/psabe.png" class="w-8 h-auto" />
                  <label class="font-bold text-black text-lg md:text-xl"
                    >PSABE - VSUSC
                    <span class="opacity-70 text-black text-sm md:text-xs">
                      (Philippine Society of Agricultural and Biosystems
                      Engineers - VSU SC)
                    </span>
                  </label>
                </div>
                <div class="flex flex-col pl-4 md:pl-8 py-4 space-y-4">
                  <div class="flex flex-row items-center space-x-2">
                    <Mail />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Email Address:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                    >
                      {{ seller.contactEmail }}
                    </label>
                    <span
                      v-if="!seller.contactEmail"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <PhoneCall />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Phone Number:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.phoneNumber }}</label
                    >
                    <span
                      v-if="!seller.phoneNumber"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <Facebook />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Facebook Page:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.fbLink }}</label
                    >
                    <span
                      v-if="!seller.fbLink"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                </div>
              </div>

              <!--BSME-->
              <div v-if="seller.faction === 'BSME'" class="flex flex-col">
                <div class="flex flex-row items-center space-x-1">
                  <img src="/logos/psme.png" class="w-8 h-auto" />
                  <label class="font-bold text-black text-lg md:text-xl"
                    >PSME - VSU SU
                    <span class="opacity-70 text-black text-sm md:text-xs">
                      (Philippine Society of Mechanical Engineers - Visayas
                      State University SU)
                    </span>
                  </label>
                </div>
                <div class="flex flex-col pl-4 md:pl-8 py-4 space-y-4">
                  <div class="flex flex-row items-center space-x-2">
                    <Mail />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Email Address:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                    >
                      {{ seller.contactEmail }}
                    </label>
                    <span
                      v-if="!seller.contactEmail"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <PhoneCall />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Phone Number:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.phoneNumber }}</label
                    >
                    <span
                      v-if="!seller.phoneNumber"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <Facebook />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Facebook Page:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.fbLink }}</label
                    >
                    <span
                      v-if="!seller.fbLink"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                </div>
              </div>

              <!--BSMet-->
              <div v-if="seller.faction === 'BSMet'" class="flex flex-col">
                <div class="flex flex-row items-center space-x-1">
                  <img src="/logos/metsoc.png" class="w-8 h-auto" />
                  <label class="font-bold text-black text-lg md:text-xl"
                    >VSU MetSoc
                    <span class="opacity-70 text-black text-sm md:text-xs">
                      (VSU Meteorological Society)
                    </span>
                  </label>
                </div>
                <div class="flex flex-col pl-4 md:pl-8 py-4 space-y-4">
                  <div class="flex flex-row items-center space-x-2">
                    <Mail />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Email Address:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                    >
                      {{ seller.contactEmail }}
                    </label>
                    <span
                      v-if="!seller.contactEmail"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <PhoneCall />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Phone Number:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.phoneNumber }}</label
                    >
                    <span
                      v-if="!seller.phoneNumber"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <Facebook />
                    <label class="text-[10px] md:text-xs font-semibold">
                      Facebook Page:
                    </label>
                    <label
                      class="text-[10px] md:text-xs underline text-blue-600 cursor-pointer"
                      >{{ seller.fbLink }}</label
                    >
                    <span
                      v-if="!seller.fbLink"
                      class="text-[10px] md:text-xs opacity-80"
                    >
                      Coming Soon</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative mt-8 max-w-full mx-auto">
        <!-- Card -->
        <div
          class="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 hover:border-primary/20"
        >
          <div class="border-b pb-2">
            <h2 class="text-xl font-semibold text-primary">Fill in the form</h2>
          </div>

          <form @submit.prevent="sendInquiry">
            <div class="grid gap-4 lg:gap-6 pt-8">
              <!-- Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label
                    for="hs-firstname-contacts-1"
                    class="block mb-2 text-sm text-secondary-foreground font-medium"
                    >First Name</label
                  >
                  <input
                    type="text"
                    id="hs-firstname-contact-1"
                    v-model="inbox.firstName"
                    class="py-3 px-4 block w-full bg-background border-primary/40 rounded-lg text-sm focus:border-primary/60 focus:ring-primary/80 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>

                <div>
                  <label
                    for="hs-lastname-contacts-1"
                    class="block mb-2 text-sm text-secondary-foreground font-medium"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    id="hs-lastname-contact-1"
                    v-model="inbox.lastName"
                    class="py-3 px-4 block w-full bg-background border-primary/40 rounded-lg text-sm focus:border-primary/60 focus:ring-primary/80 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
              </div>
              <!-- End Grid -->

              <!-- Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label
                    for="hs-email-contacts-1"
                    class="block mb-2 text-sm text-secondary-foreground font-medium"
                    >Email</label
                  >
                  <input
                    type="email"
                    id="hs-email-contacts-1"
                    v-model="inbox.email"
                    class="py-3 px-4 block w-full bg-background border-primary/40 rounded-lg text-sm focus:border-primary/60 focus:ring-primary/80 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                </div>

                <div>
                  <label
                    for="hs-phone-number-1"
                    class="block mb-2 text-sm text-secondary-foreground font-medium"
                    >Phone Number</label
                  >
                  <input
                    type="text"
                    id="hs-phone-number-1"
                    v-model="inbox.phoneNumber"
                    class="py-3 px-4 block w-full bg-background border-primary/40 rounded-lg text-sm focus:border-primary/60 focus:ring-primary/80 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
              </div>
              <!-- End Grid -->

              <div>
                <label
                  for="hs-message-contacts-1"
                  class="block mb-2 text-sm text-secondary-foreground font-medium"
                  >Details
                </label>
                <textarea
                  rows="4"
                  v-model.lazy="inbox.message"
                  class="py-3 px-4 block w-full bg-background border-primary/40 rounded-lg text-sm focus:border-primary/60 focus:ring-primary/80 disabled:opacity-50 disabled:pointer-events-none"
                ></textarea>
              </div>

              <label class="text-sm text-primary font-semibold"
                >If Student (Optional):
              </label>
              <!-- Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label
                    for="student-id"
                    class="block mb-2 text-sm text-secondary-foreground font-medium"
                    >Student ID</label
                  >
                  <input
                    type="text"
                    id="student-id"
                    v-model="inbox.studentId"
                    class="py-3 px-4 block w-full bg-background border-primary/40 rounded-lg text-sm focus:border-primary/60 focus:ring-primary/80 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>

                <div>
                  <label
                    for="department"
                    class="block mb-2 text-sm text-secondary-foreground font-medium"
                    >Department</label
                  >
                  <input
                    type="text"
                    id="department"
                    v-model="inbox.department"
                    class="py-3 px-4 block w-full bg-background border-primary/40 rounded-lg text-sm focus:border-primary/60 focus:ring-primary/80 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
              </div>
              <!-- End Grid -->

              <div>
                <label
                  class="block mb-2 text-sm text-secondary-foreground font-medium"
                  >Send to:
                </label>
                <select
                  id="send-to"
                  v-model="inbox.faction"
                  class="p-2 border w-full text-sm rounded-lg bg-background border-primary/40 text-secondary-foreground"
                  required
                >
                  <option disabled value="">
                    Please select the seller to message
                  </option>
                  <option value="CET">CET</option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSCE">BSCE</option>
                  <option value="BSGE">BSGE</option>
                  <option value="BSME">BSME</option>
                  <option value="BSMet">BSMet</option>
                  <option value="BSABE">BSABE</option>
                </select>
              </div>
            </div>

            <!-- End Grid -->

            <div class="mt-6 grid">
              <button
                type="submit"
                class="py-3 px-4 block w-full bg-primary text-primary-foreground border-primary/40 rounded-lg text-sm focus:border-primary/60 focus:ring-primary/80 disabled:opacity-50 disabled:pointer-events-none hover:bg-primary/90"
              >
                Send inquiry
              </button>
            </div>

            <div class="mt-3 text-center">
              <p class="text-sm text-secondary-foreground/70">
                We'll get back to you in 1-2 business days.
              </p>
            </div>
          </form>
        </div>
        <!-- End Card -->
      </div>
    </div>
  </div>
  <!-- End Contact Us -->
  <div class="pb-12"></div>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
    v-if="isLoading"
  >
    <SentSuccessfullyComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Inbox, Seller } from "../models/contactModel";
import {
  createInboxMessage,
  isLoading,
  fetchSellers,
} from "../controllers/contactController";
//import LoadingComponent from "../../misc/LoadingComponent.vue";
import SentSuccessfullyComponent from "../components/SentSuccessfully.vue";
import { Mail, PhoneCall, Facebook } from "lucide-vue-next";
import { useRouter } from "vue-router";

const inbox = ref({
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
  studentId: "",
  department: "",
  faction: "",
  dateSent: "",
  status: "unread",
} as Inbox);

const router = useRouter();
const sendInquiry = async () => {
  inbox.value.dateSent = new Date().toISOString();
  inbox.value.status = "unread";
  inbox.value.username = `${inbox.value.firstName}, ${inbox.value.lastName}`;
  await createInboxMessage(inbox.value, router);
};

const sellers = ref([] as Seller[]);

onMounted(async () => {
  sellers.value = await fetchSellers();
});

const order = ["CET", "BSCS", "BSCE", "BSGE", "BSABE", "BSME", "BSMet"];

const sortedSellers = computed(() => {
  return sellers.value.slice().sort((a, b) => {
    return order.indexOf(a.faction) - order.indexOf(b.faction);
  });
});
</script>
