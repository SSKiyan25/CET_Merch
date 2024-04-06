<template>
  <div class="h-auto">
    <div class="max-w-screen pb-4 mx-auto border-b-2">
      <div
        class="flex bg-inherit items-center justify-center shadow-xl relative"
      >
        <img
          src="/about_us_page/cover.jpg"
          class="object-cover md:object-fit brightness-50 backdrop-contrast-50 backdrop-hue-rotate-90"
          style="width: 1920px; height: 620px"
        />
      </div>
    </div>
    <div
      class="absolute bottom-48 md:bottom-0 left-0 flex flex-col items-center justify-end w-full h-full pb-20 p-2 md:pb-28 md:pl-20 lg:pb-36 md:items-start opacity-90"
    >
      <div class="p-4 rounded-lg">
        <h1
          class="text-white uppercase font-black text-3xl md:text-5xl"
          style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
        >
          College of Engineering and Technology
        </h1>
      </div>
      <div class="md:pl-5 pb-4 w-1/2 md:w-1/2">
        <p
          class="text-white text-center md:text-start text-xs md:text-sm font-semibold text-wrap"
          style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
        >
          Learn more about the College of Engineering and Technology Supreme
          Student Council and the other course-related organizations.
        </p>
      </div>
      <div class="pt-2 ps-4">
        <div class="overflow-hidden rounded-lg">
          <button
            class="bg-white p-4 transform transition-all duration-500 hover:scale-110 text-black text-base md:text-xl font-bold"
            v-scroll-to="'#products'"
          >
            Hello!
          </button>
        </div>
      </div>
    </div>
    <div class="mx-auto w-11/12">test</div>
  </div>
</template>

<script setup lang="ts"></script>
