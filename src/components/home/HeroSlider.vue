<template>
  <section class="relative overflow-hidden bg-surface">
    <!-- Slides container -->
    <div
      class="flex transition-transform duration-600 ease-[cubic-bezier(.4,0,.2,1)]"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <!-- Slide 1: Sneaker -->
      <div class="min-w-full py-[80px] pb-[60px] relative overflow-hidden" style="--slide-color:#FF4D0015;">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_65%_50%,var(--slide-color)_0%,transparent_70%)]"></div>
        <div class="max-w-[1200px] mx-auto px-5 grid grid-cols-2 max-md:grid-cols-1 items-center gap-10">
          <div>
            <span class="inline-block bg-accent text-white text-[11px] tracking-[3px] uppercase py-[5px] px-3 rounded-sm mb-4">New Drop 2026</span>
            <h1 class="font-display text-[clamp(48px,7vw,88px)] max-[480px]:text-[40px] leading-[0.92] tracking-[2px] mb-4">WEAR THE<br><em class="text-accent not-italic">STREETS.</em><br>OWN THE<br>GAME.</h1>
            <p class="text-[15px] text-text-muted max-w-[360px] leading-[1.7] mb-7">Sneaker & dép Crocs đỉnh cao — phong cách đường phố không giới hạn. Chính hãng 100%, giao hàng toàn quốc.</p>
            <div class="flex gap-[14px] items-center flex-wrap">
              <button class="bg-accent text-white border-none py-[14px] px-7 font-display text-[17px] tracking-[2px] rounded-sm transition-all hover:bg-accent-hover active:scale-[0.98]">MUA NGAY</button>
              <button class="bg-transparent text-text border border-border-light py-[13px] px-[22px] text-[13px] tracking-[1px] uppercase rounded-sm transition-all hover:border-accent hover:text-accent hover:bg-surface2">Xem bộ sưu tập</button>
            </div>
          </div>
          <div class="flex items-center justify-center text-[clamp(100px,15vw,160px)] drop-shadow-[0_20px_60px_rgba(255,77,0,.15)] animate-float max-md:hidden">👟</div>
        </div>
      </div>

      <!-- Slide 2: Crocs -->
      <div class="min-w-full py-[80px] pb-[60px] relative overflow-hidden" style="--slide-color:#00E5FF10;">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_65%_50%,var(--slide-color)_0%,transparent_70%)]"></div>
        <div class="max-w-[1200px] mx-auto px-5 grid grid-cols-2 max-md:grid-cols-1 items-center gap-10">
          <div>
            <span class="inline-block bg-accent2 text-white text-[11px] tracking-[3px] uppercase py-[5px] px-3 rounded-sm mb-4">Crocs Limited</span>
            <h1 class="font-display text-[clamp(48px,7vw,88px)] max-[480px]:text-[40px] leading-[0.92] tracking-[2px] mb-4">COMFORT<br><span class="text-accent2-dim">REDEFINED.</span><br>CROCS<br>2026.</h1>
            <p class="text-[15px] text-text-muted max-w-[360px] leading-[1.7] mb-7">Dép Crocs chính hãng — thoải mái cả ngày, phong cách mọi lúc. Hơn 50 màu sắc đang chờ bạn.</p>
            <div class="flex gap-[14px] items-center flex-wrap">
              <button class="bg-accent2 text-white border-none py-[14px] px-7 font-display text-[17px] tracking-[2px] rounded-sm transition-all active:scale-[0.98]">KHÁM PHÁ NGAY</button>
              <button class="bg-transparent text-text border border-border-light py-[13px] px-[22px] text-[13px] tracking-[1px] uppercase rounded-sm transition-all hover:border-accent hover:text-accent hover:bg-surface2">Xem Crocs</button>
            </div>
          </div>
          <div class="flex items-center justify-center text-[clamp(100px,15vw,160px)] drop-shadow-[0_20px_60px_rgba(255,77,0,.15)] animate-float max-md:hidden">🥿</div>
        </div>
      </div>

      <!-- Slide 3: Flash Sale -->
      <div class="min-w-full py-[80px] pb-[60px] relative overflow-hidden" style="--slide-color:#F5A62315;">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_65%_50%,var(--slide-color)_0%,transparent_70%)]"></div>
        <div class="max-w-[1200px] mx-auto px-5 grid grid-cols-2 max-md:grid-cols-1 items-center gap-10">
          <div>
            <span class="inline-block bg-gold text-white text-[11px] tracking-[3px] uppercase py-[5px] px-3 rounded-sm mb-4">Flash Sale</span>
            <h1 class="font-display text-[clamp(48px,7vw,88px)] max-[480px]:text-[40px] leading-[0.92] tracking-[2px] mb-4">SALE<br>UP TO<br><em class="text-accent not-italic">50%</em><br>OFF.</h1>
            <p class="text-[15px] text-text-muted max-w-[360px] leading-[1.7] mb-7">Hàng nghìn sản phẩm giảm giá sốc mỗi ngày. Nhanh tay kẻo hết — số lượng có hạn!</p>
            <div class="flex gap-[14px] items-center flex-wrap">
              <button class="bg-gold text-white border-none py-[14px] px-7 font-display text-[17px] tracking-[2px] rounded-sm transition-all active:scale-[0.98]">XEM SALE</button>
              <button class="bg-transparent text-text border border-border-light py-[13px] px-[22px] text-[13px] tracking-[1px] uppercase rounded-sm transition-all hover:border-accent hover:text-accent hover:bg-surface2">Tất cả sản phẩm</button>
            </div>
          </div>
          <div class="flex items-center justify-center text-[clamp(100px,15vw,160px)] drop-shadow-[0_20px_60px_rgba(255,77,0,.15)] animate-float max-md:hidden">🔥</div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button class="absolute top-1/2 -translate-y-1/2 left-5 bg-bg border border-border w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] text-text-muted transition-all z-10 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:bg-accent hover:text-white hover:border-accent" @click="prevSlide">
      <i class="ti ti-chevron-left"></i>
    </button>
    <button class="absolute top-1/2 -translate-y-1/2 right-5 bg-bg border border-border w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] text-text-muted transition-all z-10 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:bg-accent hover:text-white hover:border-accent" @click="nextSlide">
      <i class="ti ti-chevron-right"></i>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="i in totalSlides"
        :key="i"
        :class="['h-2 rounded-full border-none transition-all cursor-pointer', currentSlide === i - 1 ? 'w-6 bg-accent' : 'w-2 bg-border-light']"
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
