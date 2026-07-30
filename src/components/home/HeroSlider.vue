<template>
  <section class="relative overflow-hidden bg-surface">
    <!-- Slides container -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <a 
        v-for="(banner, index) in slidesList" 
        :key="banner.id || index"
        :href="banner.link || '#'"
        class="min-w-full h-[calc(100vh-165px)] min-h-[450px] max-md:h-[200px] block cursor-pointer"
        :style="{ backgroundImage: `url(${getImageUrl(banner.image)})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
      ></a>
    </div>

    <!-- Navigation Buttons -->
    <button 
      v-if="slidesList.length > 1"
      class="absolute top-1/2 -translate-y-1/2 left-5 bg-white/20 backdrop-blur-sm border border-white/30 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] text-white transition-all z-10 hover:bg-accent hover:border-accent shadow-sm cursor-pointer hover:scale-105 active:scale-95" 
      @click="prevSlide"
    >
      <i class="ti ti-chevron-left"></i>
    </button>
    <button 
      v-if="slidesList.length > 1"
      class="absolute top-1/2 -translate-y-1/2 right-5 bg-white/20 backdrop-blur-sm border border-white/30 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] text-white transition-all z-10 hover:bg-accent hover:border-accent shadow-sm cursor-pointer hover:scale-105 active:scale-95" 
      @click="nextSlide"
    >
      <i class="ti ti-chevron-right"></i>
    </button>

    <!-- Dots -->
    <div v-if="slidesList.length > 1" class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(banner, i) in slidesList"
        :key="i"
        :class="['slide-dot w-2 h-2 rounded-full bg-border-light border-none transition-all cursor-pointer', currentSlide === i ? 'active w-6 bg-accent' : '']"
        @click="goSlide(i)"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axiosInstance from '@/api/axios'

const banners = ref([])
const fallbackBanners = [
  { id: 1, image: '/images/banner_sneaker.png', link: '/products' },
  { id: 2, image: '/images/banner_crocs.png', link: '/categories' },
  { id: 3, image: '/images/banner_sale.png', link: '/flashsales' }
]

const slidesList = computed(() => {
  return banners.value.length > 0 ? banners.value : fallbackBanners
})

const totalSlides = computed(() => slidesList.value.length)
const currentSlide = ref(0)
let autoTimer = null

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/banner_sneaker.png'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath
  }
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (imagePath.startsWith('images/')) {
    return `${serverUrl}/${imagePath}`
  }
  return `${serverUrl}/images/${imagePath}`
}

async function fetchPublicBanners() {
  try {
    const response = await axiosInstance.get('/banner')
    if (response && response.success && Array.isArray(response.data) && response.data.length > 0) {
      banners.value = response.data
    }
  } catch (error) {
    console.error('Error fetching public banners:', error)
  }
}

function goSlide(n) {
  currentSlide.value = n
}
function prevSlide() {
  if (totalSlides.value === 0) return
  currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value
}
function nextSlide() {
  if (totalSlides.value === 0) return
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value
}

onMounted(() => {
  fetchPublicBanners()
  autoTimer = setInterval(() => nextSlide(), 5000)
})
onUnmounted(() => {
  if (autoTimer) clearInterval(autoTimer)
})
</script>

<style scoped>
.slide-dot.active {
  width: 1.5rem;
  border-radius: 0.25rem;
  background-color: var(--color-accent, #FF4D00);
}
</style>
