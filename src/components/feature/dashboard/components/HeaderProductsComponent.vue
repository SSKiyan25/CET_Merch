<template>
  <div class="w-full px-8">
    <div class="flex flex-row w-full justify-between pt-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div class="group flex bg-secondary shadow-sm rounded-sm">
          <div
            class="flex flex-row h-[12rem] w-[32rem] border-primary/60 justify-start items-start max-h-[22rem] pl-4 pt-5"
          >
            <div class="w-48 h-64">
              <img src="/1-Lanyard.png" class="object-cover rounded-sm" />
            </div>
            <div class="flex flex-col space-y-2">
              <span class="text-sm pl-8 pt-12 uppercase opacity-70"
                >View Our</span
              >
              <router-link to="" class="hover:underline">
                <span class="pl-8 text-lg font-semibold text-wrap"
                  >Featured Products
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="group flex bg-secondary shadow-sm rounded-sm">
          <div
            class="flex flex-row h-[12rem] w-[32rem] border-primary/60 justify-start items-start max-h-[22rem] pl-4 pt-5"
          >
            <div class="w-48 h-64">
              <img src="/1-Lanyard.png" class="object-cover rounded-sm" />
            </div>
            <div class="flex flex-col space-y-2">
              <span class="text-sm pl-8 pt-12 uppercase opacity-70"
                >Buy The</span
              >
              <router-link to="" class="hover:underline">
                <span class="pl-8 text-lg font-semibold text-wrap"
                  >Best Selling Products</span
                >
              </router-link>
            </div>
          </div>
        </div>
        <div class="group flex bg-secondary shadow-sm rounded-sm">
          <div
            class="flex flex-row h-[12rem] w-[32rem] border-primary/60 justify-start items-start max-h-[22rem] pl-4 pt-5"
          >
            <div class="w-48 h-64">
              <img src="/1-Lanyard.png" class="object-cover rounded-sm" />
            </div>
            <div class="flex flex-col space-y-2">
              <span class="text-sm pl-8 pt-12 uppercase opacity-70"
                >Browse The</span
              >
              <router-link to="" class="hover:underline">
                <span class="pl-8 text-lg font-semibold text-wrap"
                  >Most Popular Products</span
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
