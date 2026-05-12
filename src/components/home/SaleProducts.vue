<template>
  <section class="py-[60px] max-md:py-10" id="crocs">
    <div class="max-w-[1200px] mx-auto px-5">
      <!-- Header Banner -->
      <div class="bg-gradient-to-r from-accent to-[#ff7a50] rounded-md py-5 px-7 mb-7 flex items-center justify-between flex-wrap gap-[14px]">
        <div>
          <div class="font-display text-[28px] tracking-[2px] text-white">🏷️ SẢN PHẨM GIẢM GIÁ</div>
          <div class="text-[12px] text-white/90 tracking-[1px]">Ưu đãi hấp dẫn — cập nhật mỗi ngày</div>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="f in filters"
            :key="f.key"
            :class="['sale-chip py-1.5 px-3.5 rounded-full text-[11px] tracking-[1px] uppercase cursor-pointer transition-all border',
              activeFilter === f.key ? 'bg-white text-accent border-white' : 'bg-white/15 text-white border-white/30 hover:bg-white hover:text-accent']"
            @click="activeFilter = f.key"
          >{{ f.label }}</button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-4">
        <ProductCard
          v-for="product in filteredProducts"
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
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'

defineEmits(['add-to-cart', 'toggle-wish'])

const activeFilter = ref('all')

const filters = [
  { key: 'all', label: 'Tất cả' },
  { key: 'sneaker', label: 'Sneaker' },
  { key: 'crocs', label: 'Crocs' },
  { key: 'sandal', label: 'Sandal' },
]

const saleProducts = [
  { id: 10, brand: 'Nike', name: 'React Element 55 Triple Black', price: '990.000đ', oldPrice: '1.980.000đ', icon: '👟', rating: '★★★★☆', reviews: '88', cat: 'sneaker', badges: [{ label: '-50%', color: 'bg-accent' }] },
  { id: 11, brand: 'Crocs', name: 'Echo Clog Unisex Slate Grey', price: '623.000đ', oldPrice: '890.000đ', icon: '🥿', rating: '★★★★★', reviews: '214', cat: 'crocs', badges: [{ label: '-30%', color: 'bg-accent' }] },
  { id: 12, brand: 'Adidas', name: 'Stan Smith Lux White', price: '1.125.000đ', oldPrice: '1.500.000đ', icon: '👟', rating: '★★★★☆', reviews: '156', cat: 'sneaker', badges: [{ label: '-25%', color: 'bg-accent' }] },
  { id: 13, brand: 'Crocs', name: 'Brooklyn Low Wedge Women', price: '774.000đ', oldPrice: '1.290.000đ', icon: '👡', rating: '★★★★★', reviews: '92', cat: 'sandal', badges: [{ label: '-40%', color: 'bg-accent' }] },
  { id: 14, brand: 'Puma', name: 'RS-X Bold Platform', price: '845.000đ', oldPrice: '1.300.000đ', icon: '👟', rating: '★★★★☆', reviews: '73', cat: 'sneaker', badges: [{ label: '-35%', color: 'bg-accent' }] },
]

const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') return saleProducts
  return saleProducts.filter(p => p.cat === activeFilter.value)
})
</script>
