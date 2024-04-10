<template>
  <!-- Contact Us -->
  <div class="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 lg:py-10 mx-auto">
    <div class="max-w-xl mx-auto">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-primary sm:text-4xl">Contact us</h1>
        <p class="mt-1 text-secondary-foreground/70">
          We'd love to talk about how we can help you.
        </p>
      </div>
    </div>

    <div class="mt-8 max-w-xl mx-auto">
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
  <!-- End Contact Us -->
  <div class="pb-12"></div>
  <div>
    <LoadingComponent v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Inbox } from "../models/contactModel";
import {
  createInboxMessage,
  isLoading,
} from "../controllers/contactController";
import LoadingComponent from "../../misc/LoadingComponent.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const inbox = ref({
  username: "", // Add this line
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

const sendInquiry = async () => {
  inbox.value.dateSent = new Date().toISOString();
  inbox.value.status = "unread";
  inbox.value.username = `${inbox.value.firstName}, ${inbox.value.lastName}`;
  await createInboxMessage(inbox.value, router);
};
</script>
