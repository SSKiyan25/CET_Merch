<template>
  <!-- Card Blog -->
  <div class="max-w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-8 mx-auto">
    <!-- Grid -->
    <div class="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 mb-10 lg:mb-14">
      <router-link
        class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
        to="/products"
      >
        <div class="aspect-w-16 aspect-h-2">
          <img
            class="w-full h-48 object-cover rounded-t-xl brightness-50"
            src="/homepage/products-2.jpg"
            alt="Image Description"
          />
        </div>
        <div class="p-4 md:p-5">
          <p class="mt-2 text-xs uppercase text-gray-600 dark:text-gray-400">
            Products
          </p>
          <h3
            class="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-white"
          >
            High-quality and affordable products for you
          </h3>
        </div>
      </router-link>

      <router-link
        class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
        to="/aboutUs"
      >
        <div class="aspect-w-16 aspect-h-9">
          <img
            class="w-full h-48 object-cover brightness-50 rounded-t-xl"
            src="/about_us_page/cover.jpg"
            alt="Image Description"
          />
        </div>
        <div class="p-4 md:p-5">
          <p class="mt-2 text-xs uppercase text-gray-600 dark:text-gray-400">
            About Us
          </p>
          <h3
            class="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-white"
          >
            Discover our CET Organizations
          </h3>
        </div>
      </router-link>

      <router-link
        class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
        to=""
      >
        <div class="aspect-w-16 aspect-h-9">
          <img
            class="w-full h-48 object-cover rounded-t-xl"
            src="/homepage/gallery-1.jpg"
            alt="Image Description"
          />
        </div>
        <div class="p-4 md:p-5">
          <p class="mt-2 text-xs uppercase text-gray-600 dark:text-gray-400">
            Gallery
          </p>
          <h3
            class="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-white"
          >
            Browse our events this academic year
          </h3>
        </div>
      </router-link>
    </div>
    <!-- Title -->
    <div class="max-w-9xl text-center mx-auto mb-10 lg:mb-14">
      <h2
        class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white"
      >
        Enjoy your experience with our e-store!
      </h2>
      <p class="mt-1 text-gray-600 dark:text-gray-400">
        We look forward to your orders and feedbacks.
      </p>
    </div>
    <!-- End Title -->
    <!-- End Grid -->
  </div>
  <!-- End Card Blog -->
</template>

<script setup lang="ts"></script>
