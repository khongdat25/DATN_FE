<template>
  <section class="relative overflow-hidden bg-surface">
    <!-- Loading Skeleton -->
    <div v-if="loading" class="w-full h-[600px] max-md:h-[260px] bg-surface2 animate-pulse flex items-center justify-center">
      <i class="ti ti-photo text-[48px] text-border"></i>
    </div>

    <!-- Slides container -->
    <div
      v-else
      class="flex transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)]"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="banner in banners"
        :key="banner.id"
        class="min-w-full h-[600px] max-md:h-[260px]"
        :style="`background-image:url('${getImageUrl(banner.image)}'); background-size:cover; background-position:center;`"
      ></div>
    </div>

    <!-- Navigation Buttons (chỉ hiện khi có > 1 banner) -->
    <template v-if="!loading && banners.length > 1">
      <button class="absolute top-1/2 -translate-y-1/2 left-5 bg-white/20 backdrop-blur-sm border border-white/30 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] text-white transition-all z-10 hover:bg-accent hover:border-accent shadow-sm cursor-pointer hover:scale-105 active:scale-95" @click="prevSlide">
        <i class="ti ti-chevron-left"></i>
      </button>
      <button class="absolute top-1/2 -translate-y-1/2 right-5 bg-white/20 backdrop-blur-sm border border-white/30 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] text-white transition-all z-10 hover:bg-accent hover:border-accent shadow-sm cursor-pointer hover:scale-105 active:scale-95" @click="nextSlide">
        <i class="ti ti-chevron-right"></i>
      </button>

      <!-- Dots -->
      <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          v-for="(_, i) in banners"
          :key="i"
          :class="['slide-dot w-2 h-2 rounded-full bg-border-light border-none transition-all cursor-pointer', currentSlide === i ? 'active w-6 bg-accent' : '']"
          @click="goSlide(i)"
        ></button>
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getBanners } from '../../api/homeService'

const BASE_STORAGE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000'

const banners = ref([])
const loading = ref(true)
const currentSlide = ref(0)
let autoTimer = null

function getImageUrl(image) {
  if (!image) return '/images/banner_sneaker.png'
  if (image.startsWith('http')) return image
  return `${BASE_STORAGE_URL}/storage/${image}`
}

function goSlide(n) {
  currentSlide.value = n
}
function prevSlide() {
  const total = banners.value.length
  currentSlide.value = (currentSlide.value - 1 + total) % total
}
function nextSlide() {
  const total = banners.value.length
  currentSlide.value = (currentSlide.value + 1) % total
}

function startAutoPlay() {
  clearInterval(autoTimer)
  if (banners.value.length > 1) {
    autoTimer = setInterval(() => nextSlide(), 5000)
  }
}

onMounted(async () => {
  try {
    const res = await getBanners()
    banners.value = res.data || []
  } catch (e) {
    // Fallback: dùng ảnh tĩnh nếu API lỗi
    banners.value = [
      { id: 1, name: 'Banner Sneaker', image: null },
      { id: 2, name: 'Banner Crocs', image: null },
      { id: 3, name: 'Banner Sale', image: null },
    ]
  } finally {
    loading.value = false
    startAutoPlay()
  }
})
onUnmounted(() => {
  clearInterval(autoTimer)
})
</script>

<style scoped>
.slide-dot.active {
  width: 1.5rem;
  border-radius: 0.25rem;
  background-color: var(--color-accent, #FF4D00);
}
</style>
