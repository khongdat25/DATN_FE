<template>
  <section class="py-[60px] max-md:py-10" id="sneaker">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="flex justify-between items-end mb-9 flex-wrap gap-4">
        <div>
          <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px]">SẢN PHẨM BÁN CHẠY</h2>
          <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Top sản phẩm được yêu thích nhất tháng này</p>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="f in filters"
            :key="f.key"
            :class="['bestseller-chip py-1.5 px-3.5 rounded-full text-[11px] tracking-[1px] uppercase cursor-pointer transition-all border',
              activeFilter === f.key ? 'bg-accent border-accent text-white' : 'bg-surface2 text-text-muted border-border hover:bg-accent hover:border-accent hover:text-white']"
            @click="activeFilter = f.key"
          >{{ f.label }}</button>
        </div>
      </div>

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
]

const bestSellers = [
  { id: 20, brand: 'Nike', name: 'Air Force 1 Shadow Women', price: '2.100.000đ', icon: '👟', rating: '★★★★★', reviews: '512', cat: 'sneaker', badges: [{ label: '#1 Bán chạy', color: 'bg-gold' }] },
  { id: 21, brand: 'Crocs', name: 'Classic Lined Clog Fuzzy', price: '1.200.000đ', icon: '🥿', rating: '★★★★★', reviews: '389', cat: 'crocs', badges: [{ label: '#2 Bán chạy', color: 'bg-gold' }] },
  { id: 22, brand: 'New Balance', name: '550 White Green', price: '2.800.000đ', icon: '👟', rating: '★★★★★', reviews: '276', cat: 'sneaker', badges: [{ label: '#3 Bán chạy', color: 'bg-gold' }] },
  { id: 23, brand: 'Crocs', name: 'Mega Crush Sandal Women', price: '1.650.000đ', icon: '🥿', rating: '★★★★★', reviews: '198', cat: 'crocs', badges: [{ label: '#4 Bán chạy', color: 'bg-gold' }] },
  { id: 24, brand: 'Vans', name: 'Old Skool Classic Black', price: '1.350.000đ', icon: '👟', rating: '★★★★☆', reviews: '445', cat: 'sneaker', badges: [{ label: '#5 Bán chạy', color: 'bg-gold' }] },
]

const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') return bestSellers
  return bestSellers.filter(p => p.cat === activeFilter.value)
})
</script>
