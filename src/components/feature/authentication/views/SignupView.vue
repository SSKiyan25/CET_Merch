<template>
  <div class="flex pt-12 pb-20 justify-center">
    <div
      class="p-7 sm:w-full md:w-1/2 lg:w-1/2 items-center justify-center bg-slate-100 border border-primary/20 rounded-xl shadow-sm"
    >
      <div class="text-center border-b pb-2 border-secondary-foreground/20">
        <h1 class="block text-4xl font-bold text-black">Sign up</h1>
        <p class="py-2 text-sm text-secondary-foreground">
          Already have an account?
          <router-link
            to="/login"
            class="text-primary hover:underline font-medium focus:outline-none focus:ring-1 focus:ring-primary"
          >
            Sign in here
          </router-link>
        </p>
      </div>

      <form @submit.prevent="handleSignUpAccount">
        <div class="pt-4 grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-secondary-foreground"
              >First name</label
            >
            <input
              type="text"
              id="first_name"
              class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Juan"
              v-model="firstName"
              required
            />
          </div>
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-secondary-foreground"
              >Last name</label
            >
            <input
              type="text"
              id="last_name"
              class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Dela Cruz"
              v-model="lastName"
              required
            />
          </div>
          <div>
            <label
              for="department"
              class="block mb-2 text-sm font-medium text-secondary-foreground"
            >
              Department
              <span class="text-xs opacity-50">(Optional)</span>
            </label>
            <select
              id="department"
              class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              v-model="department"
            >
              <option value="" disabled selected>Select your department</option>
              <option value="BSGE">BSGE</option>
              <option value="BSMET">BSMET</option>
              <option value="BSCE">BSCE</option>
              <option value="BSME">BSME</option>
              <option value="BSABE">BSABE</option>
              <option value="BSCS">BSCS</option>
            </select>
          </div>
          <div>
            <label
              for="studentId"
              class="block mb-2 text-sm font-medium text-secondary-foreground"
              >Student ID
              <span class="text-xs opacity-50">(Optional)</span>
            </label>
            <input
              type="text"
              id="studentId"
              class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              v-model="studentId"
              placeholder="(XX-X-XXXXX)"
            />
          </div>
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-secondary-foreground"
              >Username</label
            >
            <input
              type="text"
              id="username"
              class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              v-model="username"
              placeholder="Panday"
            />
          </div>
          <div>
            <label
              for="phoneNumber"
              class="block mb-2 text-sm font-medium text-secondary-foreground"
              >Phone Number</label
            >
            <input
              type="text"
              id="phoneNumber"
              class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              v-model="phoneNumber"
              placeholder="+63"
            />
          </div>
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-secondary-foreground"
            >Email address</label
          >
          <input
            type="email"
            id="email"
            class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="example@gmail.com"
            v-model="email"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-secondary-foreground"
            >Password</label
          >
          <input
            type="password"
            id="password"
            class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            :class="{
              'bg-backgroudn border border-red-600 text-secondary-foreground text-sm rounded-lg focus:ring-red-700 focus:border-red-800 block w-full p-2.5':
                errorPassword,
            }"
            v-model="password"
            placeholder="•••••••••"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-secondary-foreground"
            >Confirm password</label
          >
          <input
            type="password"
            id="confirm_password"
            class="bg-background border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            :class="{
              'bg-backgroudn border border-red-600 text-secondary-foreground text-sm rounded-lg focus:ring-red-700 focus:border-red-800 block w-full p-2.5':
                errorPassword,
            }"
            v-model="confirmPassword"
            placeholder="•••••••••"
            required
          />
        </div>
        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 text-primary border border-primary/70 rounded bg-background focus:ring-3 focus:ring-primary"
              required
            />
          </div>

          <label
            for="remember"
            class="block ms-2 text-sm font-medium text-secondary-foreground"
          >
            I agree with the
            <span
              data-modal-target="terms-modal"
              data-modal-toggle="terms-modal"
              class="text-primary hover:underline cursor-pointer"
            >
              terms and conditions </span
            >.
            <div
              id="terms-modal"
              data-modal-backdrop="static"
              tabindex="-1"
              aria-hidden="true"
              class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div
                  class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <div
                    class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                  >
                    <h3
                      class="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                      Terms and Conditions
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="terms-modal"
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div class="p-4 md:p-5 space-y-4">
                    <h3 class="font-semibold text-lg">I. Introduction</h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      These Terms and Regulations ("Terms") govern your use of
                      the VSU College of Engineering and Technology - Supreme
                      Student Council (VSU CET-SSC) e-commerce website (the
                      "Website"). This website is developed and maintained by
                      the VSU Computer Science Students' Society (VSU CS3
                      Organization). By accessing or using the Website, you
                      agree to be bound by these Terms.
                    </p>
                    <h3 class="font-semibold text-lg">II. User Data</h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      The Website collects the following data from users during
                      the checkout process:
                      <span class="font-bold">
                        <p class="text-xs">____</p>
                        <p class="text-xs">Name</p>
                        <p class="text-xs">Phone</p>
                        <p class="text-xs">Number</p>
                        <p class="text-xs">Email Address</p>
                        <p class="text-xs">_____</p>
                      </span>
                      Student ID Department This data is used solely for
                      record-keeping purposes and to facilitate the reservation
                      process. It functions similarly to a face-to-face
                      transaction.
                    </p>
                    <h3 class="font-semibold text-lg">III. Data Privacy</h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      VSU CET-SSC and VSU CS3 Organization are committed to
                      protecting the privacy of your data. We comply with the
                      Data Privacy Act of 2012 (DPA) of the Philippines. Your
                      data will be secured and will not be shared with any third
                      party without your consent.
                    </p>
                    <h3 class="font-semibold text-lg">IV. Use of Website</h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      The Website is for your personal, non-commercial use. You
                      may not use the Website for any illegal or unauthorized
                      purpose. You agree not to:
                      <span
                        class="font-semibold text-sm p-2 text-justify indent-0"
                      >
                        <p>___</p>
                        <p>
                          1. Interfere with or disrupt the Website or servers or
                          networks connected to the Website.
                        </p>
                        <p>Violate any applicable laws or regulations.</p>
                        <p>
                          2. Impersonate any person or entity, or falsely state
                          or misrepresent your affiliation with a person or
                          entity.
                        </p>
                        <p>
                          3. Transmit any content that is unlawful, harmful,
                          threatening, abusive, harassing, defamatory, vulgar,
                          obscene, hateful, or racially or ethnically offensive.
                        </p>
                        <p>___</p>
                      </span>
                    </p>
                    <h3 class="font-semibold text-lg">V. Disclaimer</h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      The Website is provided "as is" and without warranties of
                      any kind, whether express or implied. VSU CET-SSC and VSU
                      CS3 Organization disclaim all warranties, including, but
                      not limited to, the implied warranties of merchantability,
                      fitness for a particular purpose, and non-infringement.
                      VSU CET-SSC and VSU CS3 Organization do not warrant that
                      the Website will be uninterrupted or error-free, that
                      defects will be corrected, or that the Website or the
                      server that makes it available are free of viruses or
                      other harmful components.
                    </p>
                    <h3 class="font-semibold text-lg">
                      VI. Limitation of Liability
                    </h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      VSU CET-SSC and VSU CS3 Organization shall not be liable
                      for any damages arising out of or in connection with your
                      use of the Website. This includes, but is not limited to,
                      direct, indirect, incidental, consequential, and punitive
                      damages.
                    </p>
                    <h3 class="font-semibold text-lg">VII. Termination</h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      VSU CET-SSC and VSU CS3 Organization may terminate your
                      access to the Website at any time, for any reason, without
                      notice.
                    </p>
                    <h3 class="font-semibold text-lg">VIII. Governing Law</h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      These Terms shall be governed by and construed in
                      accordance with the laws of the Philippines.
                    </p>
                    <h3 class="font-semibold text-lg">
                      IX. Changes to the Terms
                    </h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      VSU CET-SSC and VSU CS3 Organization reserve the right to
                      change these Terms at any time. Your continued use of the
                      Website following any changes constitutes your acceptance
                      of those changes.
                    </p>
                    <h3 class="font-semibold text-lg">X. Contact Us</h3>
                    <p class="text-[10px] md:text-xs p-2 text-justify indent-4">
                      If you have any questions about these Terms, please
                      contact us at our
                    </p>
                    <p class="text-xs">Phone Number: 0975 524 0400</p>
                    <p class="text-xs">Email: cet.ssc@vsu.edu.ph</p>
                    <p class="text-xs">
                      FB Page: https://www.facebook.com/VSUCETSSCofficial
                    </p>
                    <p class="text-xs">
                      Instagram: https://www.instagram.com/vsu.cetssc
                    </p>
                  </div>
                  <div
                    class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
                  >
                    <button
                      data-modal-hide="terms-modal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      I accept
                    </button>
                    <button
                      data-modal-hide="terms-modal"
                      type="button"
                      class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
        <button
          type="submit"
          class="text-secondary-foreground bg-secondary hover:bg-secondary/80 focus:ring-4 focus:outline-none focus:ring-primary/70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  <div v-if="loading">
    <LoadingComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { useRouter } from "vue-router";
import {
  firstName,
  lastName,
  email,
  password,
  department,
  studentId,
  username,
  handleSignup,
  confirmPassword,
  errorPassword,
  phoneNumber,
  loading,
} from "../models/SignUpModel";

import LoadingComponent from "../../misc/LoadingComponent.vue";

const router = useRouter();

const handleSignUpAccount = () => {
  handleSignup(router);
};
onMounted(() => {
  initFlowbite();
});
</script>
