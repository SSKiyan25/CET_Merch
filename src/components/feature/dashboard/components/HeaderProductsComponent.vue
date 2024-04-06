<template>
  <div class="w-full px-2 md:px-8">
    <div class="w-full pt-4">
      <div class="grid grid-cols-3 gap-1 md:gap-2">
        <div
          class="group bg-gradient-to-br from-gold to-light-gold h-20 w-auto md:h-[12rem] md:w-full shadow-lg rounded-sm"
        >
          <div
            class="flex flex-row border-primary/60 justify-start items-start pl-1 md:pl-4 pt-5"
          >
            <div class="">
              <img
                src="/homepage/about-1.jpg"
                class="md:w-48 md:h-36 object-cover brightness-90 rounded-lg"
              />
            </div>
            <div class="flex flex-col -space-y-1 md:space-y-2">
              <span
                class="text-[7px] pl-1 pt-1 md:text-sm md:pl-8 md:pt-8 uppercase opacity-70"
                >Read our
              </span>
              <router-link to="" class="hover:underline">
                <span
                  class="text-[10px] text-primary pl-1 md:pl-8 md:text-3xl font-bold text-wrap uppercase"
                  >About Page
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="group bg-gradient-to-br from-gold to-light-gold h-20 w-auto md:h-[12rem] md:w-full shadow-lg rounded-sm"
        >
          <div
            class="flex flex-row border-primary/60 justify-start items-start max-h-[22rem] pl-1 md:pl-4 pt-5"
          >
            <div class="">
              <img
                src="/homepage/products-1.jpg"
                class="md:w-48 md:h-36 object-cover brightness-90 rounded-lg shadow-xl"
              />
            </div>
            <div class="flex flex-col -space-y-1 md:space-y-2">
              <span
                class="text-[7px] pl-1 pt-1 md:text-sm md:pl-8 md:pt-9 uppercase opacity-70"
                >Buy our
              </span>
              <router-link
                to="/products"
                class="hover:underline hover:underline-offset-4"
              >
                <span
                  class="text-[10px] text-primary pl-1 md:pl-8 md:text-3xl font-bold text-wrap uppercase"
                >
                  Products
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="group bg-gradient-to-br from-gold to-light-gold h-20 w-auto md:h-[12rem] md:w-full shadow-lg rounded-sm"
        >
          <div
            class="flex flex-row border-primary/60 justify-start items-start max-h-[22rem] pl-1 md:pl-4 pt-5"
          >
            <div class="w-12 h-28 md:w-48 md:h-64">
              <img
                src="/homepage/gallery-1.jpg"
                class="md:w-48 md:h-36 object-cover brightness-90 rounded-lg shadow-xl"
              />
            </div>
            <div class="flex flex-col -space-y-1 md:space-y-2">
              <span
                class="text-[7px] pl-1 pt-1 md:text-sm md:pl-8 md:pt-9 uppercase opacity-70"
                >View Our
              </span>
              <router-link to="" class="hover:underline">
                <span
                  class="text-[10px] text-primary pl-1 md:pl-8 md:text-3xl font-bold text-wrap uppercase"
                  >Gallery
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
