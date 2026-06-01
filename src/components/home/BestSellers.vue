<template>
  <section class="py-8" id="sneaker">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">
        <div class="flex justify-between items-end mb-9 flex-wrap gap-4">
          <div>
            <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px] font-bold">SẢN PHẨM BÁN CHẠY</h2>
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

        <!-- Bestsellers Grid using cv2 card classes -->
        <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-6" id="bestSellerGrid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="cv2 prod-card cursor-pointer"
            :data-cat="product.cat"
            @click="goToDetail(product)"
          >
            <div class="ci mb-3 relative overflow-hidden aspect-square bg-transparent flex items-center justify-center">
              <span class="ci-b bg-gold text-white font-extrabold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-sm absolute top-2.5 left-2.5 z-10 shadow-sm">#{{ product.rank }}</span>
              <button 
                :class="['ci-wish absolute top-2.5 right-2.5 w-8 h-8 bg-bg border border-border rounded-full flex items-center justify-center text-sm z-10 transition-all cursor-pointer hover:bg-accent hover:border-accent hover:text-white', { active: wishes[product.id] }]"
                @click.stop="toggleWish(product)"
              >
                <i class="ti ti-heart"></i>
              </button>
              <div class="ci-inner w-full h-full flex items-center justify-center transition-transform duration-500 hover:scale-107">
                <img :src="product.image" class="w-full h-full object-contain p-3 bg-white" :alt="product.name">
              </div>
              <button class="ci-add absolute bottom-0 left-0 right-0 bg-black/85 text-white text-center py-2.5 text-[11px] font-bold uppercase tracking-wider translate-y-full transition-transform duration-300 cursor-pointer border-none z-10 hover:bg-accent" @click.stop="doAddToCart(product)">
                + Thêm vào giỏ
              </button>
            </div>
            <div class="text-[10px] text-text-muted tracking-[1.5px] uppercase mb-[3px] text-left font-bold">{{ product.brand }}</div>
            <div class="text-[14px] font-semibold mb-[5px] whitespace-nowrap overflow-hidden text-ellipsis text-text text-left" :title="product.name">{{ product.name }}</div>
            <div class="font-display text-[18px] text-accent font-bold text-left">{{ product.price }}</div>
            <div class="text-[12px] text-gold mt-1 text-left">
              {{ product.rating }} <span class="text-text-muted text-[11px]">({{ product.reviews }})</span>
            </div>
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
