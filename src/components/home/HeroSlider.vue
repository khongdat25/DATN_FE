<template>
  <section class="relative overflow-hidden bg-surface">
    <!-- Slides container -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div class="min-w-full h-[calc(100vh-165px)] min-h-[450px] max-md:h-[200px]" style="background-image:url('/images/banner_sneaker.png'); background-size:cover; background-position:center;"></div>
      <div class="min-w-full h-[calc(100vh-165px)] min-h-[450px] max-md:h-[200px]" style="background-image:url('/images/banner_crocs.png'); background-size:cover; background-position:center;"></div>
      <div class="min-w-full h-[calc(100vh-165px)] min-h-[450px] max-md:h-[200px]" style="background-image:url('/images/banner_sale.png'); background-size:cover; background-position:center;"></div>
    </div>

    <!-- Navigation Buttons -->
    <button class="absolute top-1/2 -translate-y-1/2 left-5 bg-white/20 backdrop-blur-sm border border-white/30 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] text-white transition-all z-10 hover:bg-accent hover:border-accent shadow-sm cursor-pointer hover:scale-105 active:scale-95" @click="prevSlide">
      <i class="ti ti-chevron-left"></i>
    </button>
    <button class="absolute top-1/2 -translate-y-1/2 right-5 bg-white/20 backdrop-blur-sm border border-white/30 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] text-white transition-all z-10 hover:bg-accent hover:border-accent shadow-sm cursor-pointer hover:scale-105 active:scale-95" @click="nextSlide">
      <i class="ti ti-chevron-right"></i>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="i in totalSlides"
        :key="i"
        :class="['slide-dot w-2 h-2 rounded-full bg-border-light border-none transition-all cursor-pointer', currentSlide === i - 1 ? 'active w-6 bg-accent' : '']"
        @click="goSlide(i - 1)"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const totalSlides = 3
const currentSlide = ref(0)
let autoTimer = null

function goSlide(n) {
  currentSlide.value = n
}
function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

onMounted(() => {
  autoTimer = setInterval(() => nextSlide(), 5000)
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
