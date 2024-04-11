<template>
  <div class="relative max-h-[36rem]">
    <div class="max-w-screen pb-4 mx-auto border-b-2">
      <div
        class="flex bg-inherit items-center justify-center shadow-2xl relative"
      >
        <div
          class="before:absolute before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]"
        >
          <img
            src="/about_us_page/cover.jpg"
            class="object-cover md:object-fit brightness-50 backdrop-contrast-50 backdrop-hue-rotate-90 w-[1920px] h-[180px] md:w-[1920px] md:h-[620px]"
          />
        </div>

        <!--Overlayed content-->
        <div
          class="absolute bottom-0 left-0 inset-x-0 z-10 flex flex-col items-start justify-end w-full h-full pl-4 pr-16 pb-6 md:p-16 space-y-2 md:space-y-4 backdrop-filter text-white"
          style="backdrop-filter: blur(1px)"
        >
          <h1
            class="uppercase font-black text-xs md:text-5xl drop-shadow-xl"
            style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            College of Engineering and Technology
          </h1>
          <p
            class="text-start text-[5px] md:text-sm font-semibold text-wrap"
            style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            Learn more about the College of Engineering and Technology Supreme
            Student Council and the other course-related organizations.
          </p>
          <button
            class="bg-white p-2 md:p-4 transform transition-all rounded-md duration-500 hover:scale-110 text-black text-[10px] md:text-xl font-bold"
            v-scroll-to="'#products'"
          >
            Know Us
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="max-w-[110rem] max-h-screen px-8 py-2 sm:px-6 lg:px-16 lg:py-14 mx-auto"
  >
    <!-- Grid -->
    <div class="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
      <div class="lg:col-span-1">
        <h2
          class="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200"
        >
          We tackle the challenges start-ups face
        </h2>
        <p class="mt-2 md:mt-4 text-gray-500">
          Besides working with start-up enterprises as a partner for
          digitalization, we have built enterprise products for common pain
          points that we have encountered in various products and projects.
        </p>
      </div>
      <!-- End Col -->

      <div class="lg:col-span-2">
        <div class="grid sm:grid-cols-2 gap-8 md:gap-12">
          <!-- Icon Block -->
          <div class="flex gap-x-5">
            <svg
              class="flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="10" x="3" y="11" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" x2="8" y1="16" y2="16" />
              <line x1="16" x2="16" y1="16" y2="16" />
            </svg>
            <div class="grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                Creative minds
              </h3>
              <p class="mt-1 text-gray-600 dark:text-gray-400">
                We choose our teams carefully. Our people are the secret to
                great work.
              </p>
            </div>
          </div>
          <!-- End Icon Block -->

          <!-- Icon Block -->
          <div class="flex gap-x-5">
            <svg
              class="flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M7 10v12" />
              <path
                d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
              />
            </svg>
            <div class="grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                Simple and affordable
              </h3>
              <p class="mt-1 text-gray-600 dark:text-gray-400">
                From boarding passes to movie tickets, there's pretty much
                nothing you can't store with Preline.
              </p>
            </div>
          </div>
          <!-- End Icon Block -->

          <!-- Icon Block -->
          <div class="flex gap-x-5">
            <svg
              class="flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <div class="grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                Industry-leading documentation
              </h3>
              <p class="mt-1 text-gray-600 dark:text-gray-400">
                Our documentation and extensive Client libraries contain
                everything a business needs to build a custom integration.
              </p>
            </div>
          </div>
          <!-- End Icon Block -->

          <!-- Icon Block -->
          <div class="flex gap-x-5">
            <svg
              class="flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div class="grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                Designing for people
              </h3>
              <p class="mt-1 text-gray-600 dark:text-gray-400">
                We actively pursue the right balance between functionality and
                aesthetics, creating delightful experiences.
              </p>
            </div>
          </div>
          <!-- End Icon Block -->
        </div>
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->
  </div>

  <!-- Card Blog -->
  <div class="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-2 mx-auto">
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Card -->
      <a class="group block rounded-xl" href="#">
        <div class="aspect-w-16 aspect-h-9">
          <img
            class="w-full max-h-[16rem] object-cover rounded-xl"
            src="/Featured_Events/1-MrMs-Feb9.jpg"
            alt="Image Description"
          />
        </div>
        <h3
          class="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600"
        >
          Mr. & Ms. CET 2024
        </h3>
        <p class="mt-2 text-sm text-gray-600">February 9, 2024</p>
      </a>
      <!-- End Card -->

      <!-- Card -->
      <a class="group block rounded-xl" href="#">
        <div class="aspect-w-16 aspect-h-9">
          <img
            class="w-full max-h-[16rem] object-cover rounded-xl"
            src="/Featured_Events/2-Donation-Nov15.jpg"
            alt="Image Description"
          />
        </div>
        <h3
          class="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600"
        >
          Chair Donation Drive for Marcos Elementary School
        </h3>
        <p class="mt-2 text-sm text-gray-600">November 15, 2023</p>
      </a>
      <!-- End Card -->

      <!-- Card -->
      <a class="group block rounded-xl" href="#">
        <div class="aspect-w-16 aspect-h-9">
          <img
            class="w-full max-h-[16rem] object-cover rounded-xl"
            src="/Featured_Events/CET-Sportsfest-Feb24.jpg"
            alt="Image Description"
          />
        </div>
        <h3
          class="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600"
        >
          CET Month 2024 - Sportsfest
        </h3>
        <p class="mt-2 text-sm text-gray-600">February 24, 2024</p>
      </a>
      <!-- End Card -->

      <!-- Card -->
      <a class="group block rounded-xl" href="#">
        <div class="aspect-w-16 aspect-h-9">
          <img
            class="w-full max-h-[16rem] object-cover rounded-xl"
            src="/Featured_Events/CET-Update.jpg"
            alt="Image Description"
          />
        </div>
        <h3
          class="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600"
        >
          CET Updates
        </h3>
        <p class="mt-2 text-sm text-gray-600">A.S.Y 2023-2024</p>
      </a>
      <!-- End Card -->
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Card Blog -->

  <!-- Icon Blocks -->
  <div
    class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto space-y-4"
  >
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
      <!-- Card -->
      <a
        class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all"
        href="https://www.facebook.com/VSUCSCube"
      >
        <img
          src="/logos/cs.png"
          class="w-8 h-8 object-cover drop-shadow-sm mr-2"
        />

        <div>
          <div>
            <h3 class="block font-bold text-gray-800">
              Computer Science Students' Society
            </h3>
            <p class="text-gray-600">
              The simplest way to keep your portfolio always up-to-date.
            </p>
          </div>

          <p
            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800"
          >
            Visit FB Page
            <svg
              class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </p>
        </div>
      </a>
      <!-- End Card -->

      <!-- Card -->
      <a
        class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all"
        href="https://www.facebook.com/GEPVSUSC"
      >
        <img
          src="/logos/gep.png"
          class="w-8 h-8 object-cover drop-shadow-sm mr-2"
        />

        <div>
          <div>
            <h3 class="block font-bold text-gray-800">
              Geodetic Engineers of the Philippines
            </h3>
            <p class="text-gray-600">
              New design projects delivered to your inbox each morning.
            </p>
          </div>

          <p
            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800"
          >
            Visit FB Page
            <svg
              class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </p>
        </div>
      </a>
      <!-- End Card -->

      <!-- Card -->
      <a
        class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all"
        href="https://www.facebook.com/VSUMetSoc"
      >
        <img
          src="/logos/metsoc.png"
          class="w-8 h-8 object-cover drop-shadow-sm mr-2"
        />

        <div>
          <div>
            <h3 class="block font-bold text-gray-800">
              Meteorological Society
            </h3>
            <p class="text-gray-600">
              Get your goods in front of millions of potential customers with
              ease.
            </p>
          </div>

          <p
            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800"
          >
            Visit Page
            <svg
              class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </p>
        </div>
      </a>
      <!-- End Card -->
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
      <!-- Card -->
      <a
        class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all"
        href="https://www.facebook.com/picevsusc"
      >
        <img
          src="/logos/pice.png"
          class="w-8 h-8 object-cover drop-shadow-sm mr-2"
        />

        <div>
          <div>
            <h3 class="block font-bold text-gray-800">
              Philippine Institute of Civil Engineers
            </h3>
            <p class="text-gray-600">
              The simplest way to keep your portfolio always up-to-date.
            </p>
          </div>

          <p
            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800"
          >
            Visit FB Page
            <svg
              class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </p>
        </div>
      </a>
      <!-- End Card -->

      <!-- Card -->
      <a
        class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all"
        href="https://www.facebook.com/psabevsusc"
      >
        <img
          src="/logos/psabe.png"
          class="w-8 h-8 object-cover drop-shadow-sm mr-2"
        />
        <div>
          <div>
            <h3 class="block font-bold text-gray-800">
              Philippine Society of Agricultural and Biosystems Engineers
            </h3>
            <p class="text-gray-600">
              New design projects delivered to your inbox each morning.
            </p>
          </div>

          <p
            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800"
          >
            Visit FB Page
            <svg
              class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </p>
        </div>
      </a>
      <!-- End Card -->

      <!-- Card -->
      <a
        class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all"
        href="https://www.facebook.com/psmevsu"
      >
        <img
          src="/logos/psme.png"
          class="w-8 h-8 object-cover drop-shadow-sm mr-2"
        />

        <div>
          <div>
            <h3 class="block font-bold text-gray-800">
              Philippine Society of Mechanical Engineers
            </h3>
            <p class="text-gray-600">
              Get your goods in front of millions of potential customers with
              ease.
            </p>
          </div>

          <p
            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800"
          >
            Visit FB Page
            <svg
              class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </p>
        </div>
      </a>
      <!-- End Card -->
    </div>
  </div>
  <!-- End Icon Blocks -->
  <CETGalleryComponent />
  <CardComponent />
</template>

<script setup lang="ts">
import CETGalleryComponent from "../components/CETGalleryComponent.vue";
import CardComponent from "../components/CardBottomComponent.vue";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
