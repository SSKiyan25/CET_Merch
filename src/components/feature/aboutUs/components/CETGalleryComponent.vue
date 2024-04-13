<template>
  <div
    id="custom-controls-gallery"
    class="relative w-full pb-4"
    data-carousel="slide"
  >
    <!-- Carousel wrapper -->
    <div class="relative h-[20rem] overflow-hidden rounded-lg md:h-[44rem]">
      <!-- Images -->
      <div
        v-for="index in 5"
        :key="index"
        class="hidden duration-700 ease-in-out"
        data-carousel-item
      >
        <img
          :src="`/about_us_page/cet-featured-event-${index}.jpg`"
          class="absolute block h-[20rem] w-full md:w-4/5 md:h-[42rem] object-fit -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-sm"
          alt=""
        />
      </div>
    </div>
    <div class="flex justify-center items-center pt-2">
      <button
        type="button"
        class="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white"
        >
          <svg
            class="rtl:rotate-180 w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        class="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white"
        >
          <svg
            class="rtl:rotate-180 w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
  </div>

  <div
    id="gallery"
    class="flex items-center justify-center py-4 md:py-4 flex-wrap"
  >
    <Tabs
      default-value="all"
      class="w-full flex items-center justify-center p-2 md:p-4 flex-wrap"
    >
      <TabsList class="flex md:space-x-8">
        <TabsTrigger value="all">
          <span class="text-[9px] md:text-sm font-medium"
            >All Organization</span
          >
        </TabsTrigger>
        <TabsTrigger value="cet">
          <span class="text-[9px] md:text-sm font-medium">CET</span>
        </TabsTrigger>
        <TabsTrigger value="cs3">
          <span class="text-[9px] md:text-sm font-medium">CS3</span>
        </TabsTrigger>
        <TabsTrigger value="gep">
          <span class="text-[9px] md:text-sm font-medium">GEP</span>
        </TabsTrigger>
        <TabsTrigger value="metsoc">
          <span class="text-[9px] md:text-sm font-medium">MetSoc</span>
        </TabsTrigger>
        <TabsTrigger value="pice">
          <span class="text-[9px] md:text-sm font-medium">PICE</span>
        </TabsTrigger>
        <TabsTrigger value="psabe">
          <span class="text-[9px] md:text-sm font-medium">PSABE</span>
        </TabsTrigger>
        <TabsTrigger value="psme">
          <span class="text-[9px] md:text-sm font-medium">PSME</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div v-if="isLoading" class="grid grid-cols-3 gap-4">
          <Skeleton
            class="h-[100px] w-[120px] md:h-[250px] md:w-[350px] rounded-xl"
          />
          <Skeleton
            class="h-[100px] w-[120px] md:h-[250px] md:w-[350px] rounded-xl"
          />
          <Skeleton
            class="h-[100px] w-[120px] md:h-[250px] md:w-[350px] rounded-xl"
          />
        </div>
        <div v-else class="grid grid-cols-3 gap-2 md:gap-4">
          <img
            v-for="(url, index) in allUrls"
            @click.prevent="selectedAllImageIndex = index"
            class="w-[24rem] h-[6rem] md:h-[24rem] md:w-full rounded-lg object-cover brightness-75 hover:drop-shadow-xl hover:opacity-90 cursor-pointer"
            :src="url"
            alt=""
          />
        </div>
      </TabsContent>
      <TabsContent value="cs3">
        <div v-if="isLoading" class="grid grid-cols-3 gap-4">
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
        </div>
        <div v-else class="grid grid-cols-3 gap-2 md:gap-4">
          <img
            v-for="(url, index) in cs3Urls"
            @click.prevent="selectedCS3ImageIndex = index"
            class="w-[24rem] h-[6rem] md:h-[24rem] md:w-full rounded-lg object-cover brightness-75 hover:drop-shadow-xl hover:opacity-90 cursor-pointer"
            :src="url"
            alt=""
          />
        </div>
      </TabsContent>
      <TabsContent value="metsoc">
        <div v-if="isLoading" class="grid grid-cols-3 gap-4">
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
        </div>
        <div v-else class="grid grid-cols-3 gap-2 md:gap-4">
          <img
            v-for="(url, index) in metSocUrls"
            @click.prevent="selectedMetSocImageIndex = index"
            class="w-[24rem] h-[6rem] md:h-[24rem] md:w-full rounded-lg object-cover brightness-75 hover:drop-shadow-xl hover:opacity-90 cursor-pointer"
            :src="url"
            alt=""
          />
        </div>
      </TabsContent>
      <TabsContent value="gep">
        <div v-if="isLoading" class="grid grid-cols-3 gap-4">
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
        </div>
        <div v-else class="grid grid-cols-3 gap-2 md:gap-4">
          <img
            v-for="(url, index) in gepUrls"
            @click.prevent="selectedGEPImageIndex = index"
            class="w-[24rem] h-[6rem] md:h-[24rem] md:w-full rounded-lg object-cover brightness-75 hover:drop-shadow-xl hover:opacity-90 cursor-pointer"
            :src="url"
            alt=""
          />
        </div>
      </TabsContent>
      <TabsContent value="pice">
        <div v-if="isLoading" class="grid grid-cols-3 gap-4">
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
        </div>
        <div v-else class="grid grid-cols-3 gap-2 md:gap-4">
          <img
            v-for="(url, index) in piceUrls"
            @click.prevent="selectedPICEImageIndex = index"
            class="w-[24rem] h-[6rem] md:h-[24rem] md:w-full rounded-lg object-cover brightness-75 hover:drop-shadow-xl hover:opacity-90 cursor-pointer"
            :src="url"
            alt=""
          />
        </div>
      </TabsContent>
      <TabsContent value="psme">
        <div v-if="isLoading" class="grid grid-cols-3 gap-4">
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
          <Skeleton class="h-[250px] w-[350px] rounded-xl" />
        </div>
        <div v-else class="grid grid-cols-3 gap-2 md:gap-4">
          <img
            v-for="(url, index) in psmeUrls"
            @click.prevent="selectedPSMEImageIndex = index"
            class="w-[24rem] h-[6rem] md:h-[24rem] md:w-full rounded-lg object-cover brightness-75 hover:drop-shadow-xl hover:opacity-90 cursor-pointer"
            :src="url"
            alt=""
          />
        </div>
      </TabsContent>
    </Tabs>
  </div>

  <!--All Image Carousel-->
  <div
    ref="outerDiv"
    v-if="selectedAllImageIndex !== null"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click.prevent="checkOutsideClick"
  >
    <div
      ref="innerDiv"
      id="gallery"
      class="relative w-full py-2"
      data-carousel="slide"
    >
      <!-- Carousel wrapper -->
      <div class="relative max-h-56 rounded-lg md:h-[36rem]">
        <!-- Items -->
        <div
          v-for="(url, index) in allUrls"
          :class="{
            'hidden duration-700 ease-in-out': index !== selectedAllImageIndex,
          }"
          data-carousel-item
        >
          <div class="flex justify-center items-center">
            <img
              :src="url"
              class="absolute block w-[16rem] md:w-[56rem] -translate-y-1/2 top-1/2 h-[16rem] md:h-[42rem] rounded-sm object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- Slider controls -->
      <button
        type="button"
        @click.prevent="
          selectedAllImageIndex =
            ((selectedAllImageIndex || 0) - 1 + allUrls.length) % allUrls.length
        "
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        @click.prevent="
          selectedAllImageIndex =
            ((selectedAllImageIndex || 0) + 1) % allUrls.length
        "
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <button
      @click.prevent="selectedAllImageIndex = null"
      class="absolute top-0 right-0 m-4 text-white"
    >
      <span class="material-symbols-outlined"> cancel </span>
    </button>
  </div>

  <!--CS3 Image Carousel-->
  <div
    ref="outerDiv"
    v-if="selectedCS3ImageIndex !== null"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click.prevent="checkOutsideClick"
  >
    <div
      ref="innerDiv"
      id="gallery"
      class="relative w-full py-2"
      data-carousel="slide"
    >
      <!-- Carousel wrapper -->
      <div class="relative max-h-56 rounded-lg md:h-[36rem]">
        <!-- Items -->
        <div
          v-for="(url, index) in cs3Urls"
          :class="{
            'hidden duration-700 ease-in-out': index !== selectedCS3ImageIndex,
          }"
          data-carousel-item
        >
          <div class="flex justify-center items-center">
            <img
              :src="url"
              class="absolute block w-[16rem] md:w-[56rem] -translate-y-1/2 top-1/2 h-[16rem] md:h-[42rem] rounded-sm object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- Slider controls -->
      <button
        type="button"
        @click.prevent="
          selectedCS3ImageIndex =
            ((selectedCS3ImageIndex || 0) - 1 + cs3Urls.length) % cs3Urls.length
        "
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        @click.prevent="
          selectedCS3ImageIndex =
            ((selectedCS3ImageIndex || 0) + 1) % cs3Urls.length
        "
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <button
      @click.prevent="selectedCS3ImageIndex = null"
      class="absolute top-0 right-0 m-4 text-white"
    >
      <span class="material-symbols-outlined"> cancel </span>
    </button>
  </div>

  <!--MetSoc Image Carousel-->
  <div
    ref="outerDiv"
    v-if="selectedMetSocImageIndex !== null"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click.prevent="checkOutsideClick"
  >
    <div
      ref="innerDiv"
      id="gallery"
      class="relative w-full py-2"
      data-carousel="slide"
    >
      <!-- Carousel wrapper -->
      <div class="relative max-h-56 rounded-lg md:h-[36rem]">
        <!-- Items -->
        <div
          v-for="(url, index) in metSocUrls"
          :class="{
            'hidden duration-700 ease-in-out':
              index !== selectedMetSocImageIndex,
          }"
          data-carousel-item
        >
          <div class="flex justify-center items-center">
            <img
              :src="url"
              class="absolute block w-[16rem] md:w-[56rem] -translate-y-1/2 top-1/2 h-[16rem] md:h-[42rem] rounded-sm object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- Slider controls -->
      <button
        type="button"
        @click.prevent="
          selectedMetSocImageIndex =
            ((selectedMetSocImageIndex || 0) - 1 + metSocUrls.length) %
            metSocUrls.length
        "
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        @click.prevent="
          selectedMetSocImageIndex =
            ((selectedMetSocImageIndex || 0) + 1) % metSocUrls.length
        "
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <button
      @click.prevent="selectedMetSocImageIndex = null"
      class="absolute top-0 right-0 m-4 text-white"
    >
      <span class="material-symbols-outlined"> cancel </span>
    </button>
  </div>

  <!--GEP Image Carousel-->
  <div
    ref="outerDiv"
    v-if="selectedGEPImageIndex !== null"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click.prevent="checkOutsideClick"
  >
    <div
      ref="innerDiv"
      id="gallery"
      class="relative w-full py-2"
      data-carousel="slide"
    >
      <!-- Carousel wrapper -->
      <div class="relative max-h-56 rounded-lg md:h-[36rem]">
        <!-- Items -->
        <div
          v-for="(url, index) in gepUrls"
          :class="{
            'hidden duration-700 ease-in-out': index !== selectedGEPImageIndex,
          }"
          data-carousel-item
        >
          <div class="flex justify-center items-center">
            <img
              :src="url"
              class="absolute block w-[16rem] md:w-[56rem] -translate-y-1/2 top-1/2 h-[16rem] md:h-[42rem] rounded-sm object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- Slider controls -->
      <button
        type="button"
        @click.prevent="
          selectedGEPImageIndex =
            ((selectedGEPImageIndex || 0) - 1 + gepUrls.length) % gepUrls.length
        "
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        @click.prevent="
          selectedGEPImageIndex =
            ((selectedGEPImageIndex || 0) + 1) % gepUrls.length
        "
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <button
      @click.prevent="selectedGEPImageIndex = null"
      class="absolute top-0 right-0 m-4 text-white"
    >
      <span class="material-symbols-outlined"> cancel </span>
    </button>
  </div>

  <!--PICE Image Carousel-->
  <div
    ref="outerDiv"
    v-if="selectedPICEImageIndex !== null"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click.prevent="checkOutsideClick"
  >
    <div
      ref="innerDiv"
      id="gallery"
      class="relative w-full py-2"
      data-carousel="slide"
    >
      <!-- Carousel wrapper -->
      <div class="relative max-h-56 rounded-lg md:h-[36rem]">
        <!-- Items -->
        <div
          v-for="(url, index) in piceUrls"
          :class="{
            'hidden duration-700 ease-in-out': index !== selectedPICEImageIndex,
          }"
          data-carousel-item
        >
          <div class="flex justify-center items-center">
            <img
              :src="url"
              class="absolute block w-[16rem] md:w-[56rem] -translate-y-1/2 top-1/2 h-[16rem] md:h-[42rem] rounded-sm object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- Slider controls -->
      <button
        type="button"
        @click.prevent="
          selectedPICEImageIndex =
            ((selectedPICEImageIndex || 0) - 1 + piceUrls.length) %
            piceUrls.length
        "
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        @click.prevent="
          selectedPICEImageIndex =
            ((selectedPICEImageIndex || 0) + 1) % piceUrls.length
        "
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <button
      @click.prevent="selectedPICEImageIndex = null"
      class="absolute top-0 right-0 m-4 text-white"
    >
      <span class="material-symbols-outlined"> cancel </span>
    </button>
  </div>

  <!--PSME Image Carousel-->
  <div
    ref="outerDiv"
    v-if="selectedPSMEImageIndex !== null"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click.prevent="checkOutsideClick"
  >
    <div
      ref="innerDiv"
      id="gallery"
      class="relative w-full py-2"
      data-carousel="slide"
    >
      <!-- Carousel wrapper -->
      <div class="relative max-h-56 rounded-lg md:h-[36rem]">
        <!-- Items -->
        <div
          v-for="(url, index) in psmeUrls"
          :class="{
            'hidden duration-700 ease-in-out': index !== selectedPSMEImageIndex,
          }"
          data-carousel-item
        >
          <div class="flex justify-center items-center">
            <img
              :src="url"
              class="absolute block w-[16rem] md:w-[56rem] -translate-y-1/2 top-1/2 h-[16rem] md:h-[42rem] rounded-sm object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- Slider controls -->
      <button
        type="button"
        @click.prevent="
          selectedPSMEImageIndex =
            ((selectedPSMEImageIndex || 0) - 1 + psmeUrls.length) %
            psmeUrls.length
        "
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        @click.prevent="
          selectedPSMEImageIndex =
            ((selectedPSMEImageIndex || 0) + 1) % psmeUrls.length
        "
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
        >
          <svg
            class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <button
      @click.prevent="selectedPSMEImageIndex = null"
      class="absolute top-0 right-0 m-4 text-white"
    >
      <span class="material-symbols-outlined"> cancel </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, onUpdated } from "vue";
import { initFlowbite } from "flowbite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  displayMetSocImages,
  displayCS3Images,
  displayGEPImages,
  displayPICEImages,
  displayPSMEImages,
} from "../controller/aboutUsController";
import { Skeleton } from "@/components/ui/skeleton";

const metSocUrls = ref<string[]>([]);
const cs3Urls = ref<string[]>([]);
const gepUrls = ref<string[]>([]);
const piceUrls = ref<string[]>([]);
const psmeUrls = ref<string[]>([]);
const allUrls = ref<string[]>([]);
const outerDiv = ref<HTMLElement | null>(null);
const innerDiv = ref<HTMLElement | null>(null);

const isLoading = ref(false);
onMounted(async () => {
  initFlowbite();
  isLoading.value = true;
  cs3Urls.value = await displayCS3Images();
  metSocUrls.value = await displayMetSocImages();
  gepUrls.value = await displayGEPImages();
  piceUrls.value = await displayPICEImages();
  psmeUrls.value = await displayPSMEImages();
  allUrls.value = [
    ...cs3Urls.value,
    ...metSocUrls.value,
    ...gepUrls.value,
    ...piceUrls.value,
    ...psmeUrls.value,
  ];
  shuffleArray(allUrls.value);
  isLoading.value = false;
  startAllCarousel();
  startCS3Carousel();
  startMetSocCarousel();
  startGEPCarousel();
  startPICECarousel();
  startPSMECarousel();
  window.addEventListener("keydown", checkEscPress);
});

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//All Image Carousel
const selectedAllImageIndex = ref<number | null>(null);
let carouselAllImageIndex: number | null = null;
const startAllCarousel = () => {
  carouselAllImageIndex = setInterval(() => {
    if (selectedAllImageIndex.value !== null) {
      selectedAllImageIndex.value =
        (selectedAllImageIndex.value + 1) % allUrls.value.length;
    }
  }, 5000) as unknown as number;
};

//CS3 Carousel
const selectedCS3ImageIndex = ref<number | null>(null);
let carouselCS3Interval: number | null = null;
const startCS3Carousel = () => {
  carouselCS3Interval = setInterval(() => {
    if (selectedCS3ImageIndex.value !== null) {
      selectedCS3ImageIndex.value =
        (selectedCS3ImageIndex.value + 1) % cs3Urls.value.length;
    }
  }, 5000) as unknown as number;
};

//MetSoc Carousel
const selectedMetSocImageIndex = ref<number | null>(null);
let carouselMetSocInterval: number | null = null;
const startMetSocCarousel = () => {
  carouselMetSocInterval = setInterval(() => {
    if (selectedMetSocImageIndex.value !== null) {
      selectedMetSocImageIndex.value =
        (selectedMetSocImageIndex.value + 1) % metSocUrls.value.length;
    }
  }, 5000) as unknown as number;
};

//Gep Carousel
const selectedGEPImageIndex = ref<number | null>(null);
let carouselGEPInterval: number | null = null;
const startGEPCarousel = () => {
  carouselGEPInterval = setInterval(() => {
    if (selectedGEPImageIndex.value !== null) {
      selectedGEPImageIndex.value =
        (selectedGEPImageIndex.value + 1) % gepUrls.value.length;
    }
  }, 5000) as unknown as number;
};

//Pice Carousel
const selectedPICEImageIndex = ref<number | null>(null);
let carouselPICEInterval: number | null = null;
const startPICECarousel = () => {
  carouselPICEInterval = setInterval(() => {
    if (selectedPICEImageIndex.value !== null) {
      selectedPICEImageIndex.value =
        (selectedPICEImageIndex.value + 1) % piceUrls.value.length;
    }
  }, 5000) as unknown as number;
};

//PSME Carousel
const selectedPSMEImageIndex = ref<number | null>(null);
let carouselPSMEInterval: number | null = null;
const startPSMECarousel = () => {
  carouselPSMEInterval = setInterval(() => {
    if (selectedPSMEImageIndex.value !== null) {
      selectedPSMEImageIndex.value =
        (selectedPSMEImageIndex.value + 1) % psmeUrls.value.length;
    }
  }, 5000) as unknown as number;
};

onUpdated(() => {
  if (outerDiv.value) {
    outerDiv.value.addEventListener("click", checkOutsideClick);
  }
});

const checkOutsideClick = (event: any) => {
  if (innerDiv.value && !innerDiv.value.contains(event.target)) {
    selectedMetSocImageIndex.value = null;
    selectedCS3ImageIndex.value = null;
    selectedGEPImageIndex.value = null;
    selectedPICEImageIndex.value = null;
    selectedPSMEImageIndex.value = null;
    selectedAllImageIndex.value = null;
  }
};

const checkEscPress = (event: any) => {
  if (event.key === "Escape") {
    selectedMetSocImageIndex.value = null;
    selectedCS3ImageIndex.value = null;
    selectedGEPImageIndex.value = null;
    selectedPICEImageIndex.value = null;
    selectedPSMEImageIndex.value = null;
    selectedAllImageIndex.value = null;
  }
};

onBeforeUnmount(() => {
  if (carouselAllImageIndex !== null) {
    clearInterval(carouselAllImageIndex);
  }
  if (carouselCS3Interval !== null) {
    clearInterval(carouselCS3Interval);
  }
  if (carouselMetSocInterval !== null) {
    clearInterval(carouselMetSocInterval);
  }
  if (carouselGEPInterval !== null) {
    clearInterval(carouselGEPInterval);
  }
  if (carouselPICEInterval !== null) {
    clearInterval(carouselPICEInterval);
  }
  if (carouselPSMEInterval !== null) {
    clearInterval(carouselPSMEInterval);
  }
  window.removeEventListener("keydown", checkEscPress);
  if (outerDiv.value) {
    outerDiv.value.removeEventListener("click", checkOutsideClick);
  }
});
</script>
