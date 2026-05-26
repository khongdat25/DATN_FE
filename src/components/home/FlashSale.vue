<template>
  <section class="bg-surface border-b border-border" id="flash">
    <div class="max-w-[1200px] mx-auto px-5 py-[60px] max-md:py-10">
      <!-- Header -->
      <div class="flex items-center justify-between py-5 flex-wrap gap-4 max-md:flex-col max-md:items-start">
        <div class="flex items-center gap-5 flex-wrap">
          <div class="font-display text-[32px] tracking-[2px] flex items-center gap-[10px]">
            <i class="ti ti-bolt text-accent text-[28px]"></i> FLASH SALE
          </div>
          <!-- Countdown -->
          <div class="flex items-center gap-[6px]">
            <div class="text-center">
              <div class="bg-accent text-white font-display text-[24px] min-w-[48px] h-[48px] rounded-lg shadow-[0_4px_12px_rgba(255,77,0,0.2)] flex items-center justify-center tracking-[2px] transition-transform hover:scale-105">{{ pad(hours) }}</div>
              <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center">Giờ</div>
            </div>
            <div class="font-display text-[24px] text-accent pb-3">:</div>
            <div class="text-center">
              <div class="bg-accent text-white font-display text-[24px] min-w-[48px] h-[48px] rounded-lg shadow-[0_4px_12px_rgba(255,77,0,0.2)] flex items-center justify-center tracking-[2px] transition-transform hover:scale-105">{{ pad(minutes) }}</div>
              <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center">Phút</div>
            </div>
            <div class="font-display text-[24px] text-accent pb-3">:</div>
            <div class="text-center">
              <div class="bg-accent text-white font-display text-[24px] min-w-[48px] h-[48px] rounded-lg shadow-[0_4px_12px_rgba(255,77,0,0.2)] flex items-center justify-center tracking-[2px] transition-transform hover:scale-105">{{ pad(seconds) }}</div>
              <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center">Giây</div>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-accent to-[#ff7043] text-white text-[12px] tracking-[2px] uppercase py-1.5 px-4 rounded-full font-medium">🔥 Giảm đến 50%</div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-4">
        <ProductCard
          v-for="product in flashProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="$emit('add-to-cart', $event)"
          @toggle-wish="$emit('toggle-wish', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProductCard from './ProductCard.vue'

defineEmits(['add-to-cart', 'toggle-wish'])

// Countdown
let h = 2, m = 47, s = 33
const hours = ref(h), minutes = ref(m), seconds = ref(s)
let timer = null

function pad(n) { return String(n).padStart(2, '0') }

function tick() {
  s--
  if (s < 0) { s = 59; m-- }
  if (m < 0) { m = 59; h-- }
  if (h < 0) { h = 2; m = 59; s = 59 }
  hours.value = h; minutes.value = m; seconds.value = s
}

onMounted(() => { timer = setInterval(tick, 1000) })
onUnmounted(() => { clearInterval(timer) })

const flashProducts = [
  { id: 1, brand: 'Nike', name: 'Air Force 1 \'07 White', price: '1.290.000đ', oldPrice: '1.990.000đ', icon: '👟', rating: '★★★★★', reviews: '128 đánh giá', soldCount: 312, total: 400, badges: [{ label: '-35%', color: 'bg-accent' }] },
  { id: 2, brand: 'Crocs', name: 'Classic Clog Black', price: '712.000đ', oldPrice: '890.000đ', icon: '🥿', rating: '★★★★☆', reviews: '341 đánh giá', soldCount: 276, total: 300, badges: [{ label: 'HOT', color: 'bg-accent2-dim' }, { label: '-20%', color: 'bg-accent' }] },
  { id: 3, brand: 'Adidas', name: 'Samba OG White/Black', price: '1.590.000đ', oldPrice: '2.650.000đ', icon: '👟', rating: '★★★★★', reviews: '89 đánh giá', soldCount: 124, total: 200, badges: [{ label: '-40%', color: 'bg-accent' }] },
  { id: 4, brand: 'Jordan', name: 'Air Jordan 1 Retro High OG', price: '2.090.000đ', oldPrice: '3.800.000đ', icon: '👟', rating: '★★★★★', reviews: '412 đánh giá', soldCount: 455, total: 500, badges: [{ label: '-45%', color: 'bg-accent' }, { label: 'HOT', color: 'bg-accent2-dim' }] },
  { id: 5, brand: 'Converse', name: 'Chuck 70 Classic High Top', price: '1.350.000đ', oldPrice: '1.800.000đ', icon: '👟', rating: '★★★★☆', reviews: '210 đánh giá', soldCount: 170, total: 200, badges: [{ label: '-25%', color: 'bg-accent' }] },
]
</script>
