<template>
  <section class="bg-surface border-b border-border" id="flash">
    <div class="max-w-[1200px] mx-auto px-5 py-8">
      <div class="section-wrapper">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6 flex-wrap gap-4 max-md:flex-col max-md:items-start">
          <div class="flex items-center gap-5 flex-wrap">
            <div class="font-display text-[32px] tracking-[2px] flex items-center gap-[10px] uppercase font-bold">
              <i class="ti ti-bolt text-accent text-[28px] animate-pulse"></i> FLASH SALE
            </div>
            <!-- Countdown -->
            <div class="flex items-center gap-[6px]">
              <div class="text-center">
                <div class="bg-accent text-white font-display text-[24px] min-w-[48px] h-[48px] rounded-sm flex items-center justify-center tracking-[2px] shadow-sm">{{ pad(hours) }}</div>
                <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center">Giờ</div>
              </div>
              <div class="font-display text-[24px] text-accent pb-3">:</div>
              <div class="text-center">
                <div class="bg-accent text-white font-display text-[24px] min-w-[48px] h-[48px] rounded-sm flex items-center justify-center tracking-[2px] shadow-sm">{{ pad(minutes) }}</div>
                <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center">Phút</div>
              </div>
              <div class="font-display text-[24px] text-accent pb-3">:</div>
              <div class="text-center">
                <div class="bg-accent text-white font-display text-[24px] min-w-[48px] h-[48px] rounded-sm flex items-center justify-center tracking-[2px] shadow-sm">{{ pad(seconds) }}</div>
                <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center">Giây</div>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-accent to-[#ff7043] text-white text-[12px] tracking-[2px] uppercase py-2 px-5 rounded-full font-bold shadow-sm">🔥 Giảm đến 50%</div>
        </div>

        <!-- Products Grid (col-5) -->
        <div class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5">
          <ProductCard
            v-for="product in flashProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="$emit('add-to-cart', $event)"
            @toggle-wish="$emit('toggle-wish', $event)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProductCard from '../common/ProductCard.vue'

defineEmits(['add-to-cart', 'toggle-wish'])

// Countdown logic
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
  { id: 1, brand: 'Nike', name: 'Air Force 1 \'07 White', price: '1.290.000đ', oldPrice: '1.990.000đ', image: '/images/nike-air-force-1.png', rating: '★★★★★', reviews: '128', soldCount: 78, total: 100, badges: [{ label: '-35%', color: 'bg-accent shadow-sm' }] },
  { id: 2, brand: 'Crocs', name: 'Classic Clog Black', price: '712.000đ', oldPrice: '890.000đ', image: '/images/puma-black1.png', rating: '★★★★☆', reviews: '341', soldCount: 92, total: 100, badges: [{ label: '-20%', color: 'bg-accent shadow-sm' }, { label: 'HOT', color: 'bg-accent2-dim shadow-sm' }] },
  { id: 3, brand: 'Adidas', name: 'Samba OG White/Black', price: '1.590.000đ', oldPrice: '2.650.000đ', image: '/images/adidas-samba-og1.png', rating: '★★★★★', reviews: '89', soldCount: 62, total: 100, badges: [{ label: '-40%', color: 'bg-accent shadow-sm' }] },
  { id: 4, brand: 'Jordan', name: 'Air Jordan 1 Retro High OG', price: '2.090.000đ', oldPrice: '3.800.000đ', image: '/images/nike-bred1.png', rating: '★★★★★', reviews: '412', soldCount: 91, total: 100, badges: [{ label: '-45%', color: 'bg-accent shadow-sm' }, { label: 'HOT', color: 'bg-accent2-dim shadow-sm' }] },
  { id: 5, brand: 'Converse', name: 'Chuck 70 Classic High Top', price: '1.350.000đ', oldPrice: '1.800.000đ', image: '/images/nike-mid1.png', rating: '★★★★☆', reviews: '210', soldCount: 85, total: 100, badges: [{ label: '-25%', color: 'bg-accent shadow-sm' }] },
]
</script>
