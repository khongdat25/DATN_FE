<template>
  <section class="py-8" id="sneaker">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">

        <!-- Header row: title left | filters center | view-all right -->
        <div class="grid grid-cols-3 items-center mb-8 gap-4 max-md:flex max-md:flex-col max-md:items-start max-md:gap-3">
          <!-- Left: Title -->
          <div>
            <h2 class="font-display text-[clamp(18px,2.5vw,28px)] tracking-[1.5px] font-bold leading-tight whitespace-nowrap">SẢN PHẨM BÁN CHẠY</h2>
          </div>
          <!-- Center: Filters -->
          <div class="flex gap-2 flex-wrap justify-center max-md:justify-start">
            <button
              v-for="f in filters"
              :key="f.key"
              :class="['py-1.5 px-3.5 rounded-full text-[11px] tracking-[1px] uppercase cursor-pointer transition-all border font-medium',
                activeFilter === f.key
                  ? 'bg-accent border-accent text-white shadow-sm'
                  : 'bg-surface2 text-text-muted border-border hover:bg-accent hover:border-accent hover:text-white']"
              @click="activeFilter = f.key"
            >{{ f.label }}</button>
          </div>
          <!-- Right: View all -->
          <div class="flex justify-end max-md:justify-start">
            <a
              href="/products"
              class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]"
            >Xem tất cả <i class="ti ti-arrow-right"></i></a>
          </div>
        </div>

        <!-- Bestsellers Grid using ProductCard -->
        <div
          class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5"
          id="bestSellerGrid"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="relative"
          >
            <!-- Rank badge -->
            <span class="absolute top-2.5 left-2.5 z-20 bg-gold text-white font-extrabold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-sm shadow-sm pointer-events-none">#{{ product.rank }}</span>
            <ProductCard
              :product="product"
              :show-cart-button="false"
              @add-to-cart="doAddToCart(product)"
              @toggle-wish="toggleWish(product)"
              @click="goToDetail(product)"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { allProducts } from '../../data/products.js'
import ProductCard from '../common/ProductCard.vue'

const router = useRouter()

const addToCart = inject('addToCart', (p) => {})
const showToast = inject('showToast', (msg) => {})

const activeFilter = ref('all')
const wishes = ref({})

const filters = [
  { key: 'all', label: 'Tất cả' },
  { key: 'sneaker', label: 'Sneaker' },
  { key: 'crocs', label: 'Crocs' },
]

function toggleWish(product) {
  wishes.value[product.id] = !wishes.value[product.id]
  showToast(wishes.value[product.id] ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

function doAddToCart(product) {
  addToCart(product)
}

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

const bestSellers = allProducts
  .filter(p => p.id >= 20 && p.id <= 24)
  .map((p, idx) => ({
    ...p,
    rank: idx + 1,
    cat: p.category === 'Dép Crocs' ? 'crocs' : 'sneaker'
  }))

const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') return bestSellers
  return bestSellers.filter(p => p.cat === activeFilter.value)
})
</script>

<style scoped>
.ci-wish.active {
  background-color: var(--color-accent, #FF4D00) !important;
  border-color: var(--color-accent, #FF4D00) !important;
  color: white !important;
}
</style>
