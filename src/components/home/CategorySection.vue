<template>
  <section class="py-4 bg-accent overflow-hidden relative" id="brand-marquee">
    <!-- Left & Right Fade Shadows in Accent Orange -->
    <div class="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-accent to-transparent z-10 pointer-events-none"></div>
    <div class="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-accent to-transparent z-10 pointer-events-none"></div>

    <div class="w-full">
      <div class="marquee-container flex overflow-hidden select-none">
        <div class="marquee-track">
          <!-- Repeat set of brands 4 times to ensure no gaps on wide displays -->
          <div v-for="set in 4" :key="set" class="flex items-center">
            <router-link
              v-for="brand in brands"
              :key="set + '-' + brand.name"
              :to="`/products?brand=${brand.param}`"
              class="flex items-center gap-3.5 mx-8 transition-all duration-300 hover:scale-105"
            >
              <img 
                :src="brand.logo" 
                :alt="brand.name" 
                class="h-6 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity gpu-accelerated" 
              />
              <span class="text-white/40 text-[11px] ml-6">★</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const brands = [
  { name: 'Nike', logo: '/images/Logo_NIKE.svg', param: 'Nike' },
  { name: 'Adidas', logo: '/images/Adidas_Logo.svg', param: 'Adidas' },
  { name: 'Puma', logo: '/images/puma.svg', param: 'Puma' },
  { name: 'New Balance', logo: '/images/New_Balance_logo.svg', param: 'New Balance' },
  { name: 'MLB', logo: '/images/mlb.svg?v=2', param: 'MLB' },
  { name: 'Biti\'s', logo: '/images/bitis.svg', param: 'Bitis' },
  { name: 'Converse', logo: '/images/converse.svg', param: 'Converse' }
]
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-25%, 0, 0);
  }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
  will-change: transform;
}

.marquee-track:hover {
  animation-play-state: paused;
}

/* Force hardware acceleration on the images to keep rendering light and smooth */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}
</style>
