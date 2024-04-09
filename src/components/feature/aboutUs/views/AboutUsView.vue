<template>
  <div class="relative h-screen">
    <div class="max-w-screen pb-4 mx-auto border-b-2">
      <div
        class="flex bg-inherit items-center justify-center shadow-2xl relative"
      >
        <img
          src="/about_us_page/cover.jpg"
          class="object-cover md:object-fit brightness-50 backdrop-contrast-50 backdrop-hue-rotate-90 w-[1920px] h-[180px] md:w-[1920px] md:h-[620px]"
        />
        <!--Overlayed content-->
        <div
          class="absolute bottom-0 left-0 flex flex-col items-start justify-end w-full h-full pl-4 pr-16 pb-6 md:p-16 space-y-2 md:space-y-4 backdrop-filter text-white"
          style="backdrop-filter: blur(1px)"
        >
          <h1
            class="uppercase font-black text-sm md:text-5xl drop-shadow-xl"
            style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            College of Engineering and Technology
          </h1>
          <p
            class="text-start text-[8px] md:text-sm font-semibold text-wrap"
            style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            Learn more about the College of Engineering and Technology Supreme
            Student Council and the other course-related organizations.
          </p>
          <button
            class="bg-white p-2 md:p-4 transform transition-all rounded-md duration-500 hover:scale-110 text-black text-[10px] md:text-xl font-bold"
            v-scroll-to="'#products'"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
