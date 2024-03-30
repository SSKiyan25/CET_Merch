<template>
  <div class="flex pt-12 pb-20 justify-center">
    <div
      class="p-7 sm:w-full md:w-1/2 lg:w-1/3 items-center justify-center bg-accent border border-primary/20 rounded-xl shadow-sm"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-white">Sign in</h1>
          <p class="py-2 text-sm text-secondary-foreground">
            Don't have an account yet?
            <router-link
              to="/signup"
              class="text-primary hover:underline font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            >
              Sign up here
            </router-link>
          </p>
        </div>

        <div class="py-5">
          <div class="text-center">
            <Button variant="default" class="" @click.prevent="guestLogin">
              <span class="material-symbols-outlined"> for_you </span>
              <p class="text-primary-foreground px-4">Sign in as Guest</p>
            </Button>
          </div>

          <div
            class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600"
          >
            Or
          </div>

          <!-- Form -->
          <form action="" @submit.prevent="handleLogin">
            <div class="grid gap-y-4">
              <!-- Form Group -->
              <div>
                <label for="email" class="block text-sm mb-2"
                  >Email address</label
                >
                <div class="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    v-model="email"
                    class="py-3 px-4 block w-full border-primary/40 rounded-lg text-sm focus:border-primary/50 focus:ring-primary/90 disabled:opacity-50 disabled:pointer-events-none bg-muted"
                    :class="{
                      'py-3 px-4 block w-full border-red-600 rounded-lg text-sm focus:border-red-700 focus:ring-red-800 disabled:opacity-50 disabled:pointer-events-none bg-muted':
                        emailError,
                    }"
                    required
                    aria-describedby="email-error"
                    placeholder="example@gmail.com"
                  />
                  <div
                    class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3"
                  >
                    <svg
                      class="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                      />
                    </svg>
                  </div>
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">
                  Please include a valid email address so we can get back to you
                </p>
              </div>
              <!-- End Form Group -->

              <!-- Form Group -->
              <div>
                <div class="flex justify-between items-center">
                  <label
                    for="password"
                    class="block text-sm mb-2 dark:text-white"
                    >Password</label
                  >
                  <a
                    class="text-sm text-primary hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="../examples/html/recover-account.html"
                    >Forgot password?</a
                  >
                </div>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    v-model="password"
                    class="py-3 px-4 block w-full border-primary/40 rounded-lg text-sm focus:border-primary/50 focus:ring-primary/90 disabled:opacity-50 disabled:pointer-events-none bg-accent"
                    :class="{
                      'py-3 px-4 block w-full border-red-600 rounded-lg text-sm focus:border-red-700 focus:ring-red-800 disabled:opacity-50 disabled:pointer-events-none bg-muted':
                        passwordError,
                    }"
                    required
                    aria-describedby="password-error"
                    placeholder="********"
                  />
                  <div
                    class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3"
                  >
                    <svg
                      class="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Checkbox -->
              <div class="flex items-center">
                <div class="flex">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="shrink-0 mt-0.5 rounded text-primary-foreground focus:ring-primary/50 bg-secondary border-primary/80 checked:bg-white checked:border-primary dark:focus:ring-offset-primary/20"
                  />
                </div>
                <div class="ms-3">
                  <label for="remember-me" class="text-sm dark:text-white"
                    >Remember me</label
                  >
                </div>
              </div>
              <!-- End Checkbox -->

              <button
                type="submit"
                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-primary-foreground hover:bg-primary/70 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <!-- End Form -->
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <LoadingComponent />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  email,
  password,
  handleLogin as handleLoginController,
  loading,
  passwordError,
  emailError,
  handleGuestLogin,
} from "../controllers/LoginController.ts";
import LoadingComponent from "../../misc/LoadingComponent.vue";

const router = useRouter();

const handleLogin = () => {
  handleLoginController(router);
};

const guestLogin = () => {
  handleGuestLogin(router);
};
</script>
