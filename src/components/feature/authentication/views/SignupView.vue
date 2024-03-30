<template>
  <div class="flex pt-12 pb-20 justify-center">
    <div
      class="p-7 sm:w-full md:w-1/2 lg:w-1/2 items-center justify-center bg-accent border border-primary/20 rounded-xl shadow-sm"
    >
      <div class="text-center border-b pb-2 border-secondary-foreground/20">
        <h1 class="block text-4xl font-bold text-white">Sign up</h1>
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
              class="bg-secondary border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
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
              class="bg-secondary border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
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
              class="bg-secondary border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
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
              class="bg-secondary border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              v-model="studentId"
              placeholder="(+63)"
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
              class="bg-secondary border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              v-model="username"
              placeholder="Panday"
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
            class="bg-secondary border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
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
            class="bg-secondary border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            :class="{
              'bg-secondary border border-red-600 text-secondary-foreground text-sm rounded-lg focus:ring-red-700 focus:border-red-800 block w-full p-2.5':
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
            class="bg-secondary border border-primary/50 text-secondary-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            :class="{
              'bg-secondary border border-red-600 text-secondary-foreground text-sm rounded-lg focus:ring-red-700 focus:border-red-800 block w-full p-2.5':
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
              class="w-4 h-4 text-primary border border-primary/70 rounded bg-secondary focus:ring-3 focus:ring-primary"
              required
            />
          </div>
          <label
            for="remember"
            class="block ms-2 text-sm font-medium text-secondary-foreground"
            >I agree with the
            <a href="#" class="text-primary hover:underline"
              >terms and conditions</a
            >.</label
          >
        </div>
        <button
          type="submit"
          class="text-secondary-foreground bg-primary/70 hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-primary/70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
  loading,
} from "../models/SignUpModel.ts";
import LoadingComponent from "../../misc/LoadingComponent.vue";

const router = useRouter();

const handleSignUpAccount = () => {
  handleSignup(router);
};
onMounted(() => {
  initFlowbite();
});
</script>
