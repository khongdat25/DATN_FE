<template>
  <section class="py-8" id="products">
    <div class="max-w-300 mx-auto px-5">
      <div class="section-wrapper">
        <div class="flex items-center justify-between mb-6 gap-4">
          <h2 class="font-display text-[clamp(18px,2.5vw,28px)] tracking-[1.5px] font-bold whitespace-nowrap">SẢN PHẨM NỔI BẬT</h2>

          <div class="flex justify-end">
            <a href="/products" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-1.5 transition-all whitespace-nowrap font-medium hover:gap-2.5">
              Xem tất cả <i class="ti ti-arrow-right"></i>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
          <div v-if="isLoading" class="bg-white border border-border rounded-xl overflow-hidden p-6 animate-pulse flex flex-col gap-4 shadow-sm">
            <div class="bg-surface2 rounded-xl h-70 max-lg:h-55 w-full"></div>
            <div class="h-3 bg-surface2 rounded w-1/4"></div>
            <div class="h-6 bg-surface2 rounded w-3/4"></div>
            <div class="h-5 bg-surface2 rounded w-1/2"></div>
          </div>

          <div
            v-else
            class="bg-bg rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,.05)] flex flex-col justify-between"
            @click="goToDetail(featured)"
          >
            <div class="h-64 sm:h-72 md:h-80 relative overflow-hidden flex items-center justify-center bg-white">
              <img :src="featured.image" class="max-w-full max-h-full w-auto h-auto object-contain p-4 transition-transform duration-500 hover:scale-105" :alt="featured.name">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,77,0,0.06),transparent_60%)] pointer-events-none"></div>
            </div>
            <div class="p-6 text-left">
              <div class="text-[11px] text-text-muted tracking-[1.5px] uppercase mb-1 font-bold">{{ featured.brand }}</div>
              <div class="font-display text-[24px] whitespace-normal tracking-[1px] mb-2 text-text font-bold">{{ featured.name }}</div>
              <div class="flex items-baseline gap-2 mb-2">
                <span class="font-display text-[28px] text-accent tracking-[0.5px] font-bold">{{ featured.price }}</span>
                <span v-if="featured.oldPrice" class="text-[12px] text-text-dim line-through">{{ featured.oldPrice }}</span>
              </div>
              <div class="flex items-center gap-1 text-[12px] text-gold">
                {{ featured.rating }} <span class="text-text-muted text-[11px]">({{ featured.reviews }} đánh giá)</span>
              </div>
            </div>
          </div>

          <div v-if="isLoading" class="flex flex-col gap-4">
            <div v-for="i in 3" :key="i" class="bg-white border border-border rounded-xl p-4 flex gap-4 animate-pulse shadow-sm h-33.75">
              <div class="bg-surface2 rounded-lg w-27.5 h-full shrink-0"></div>
              <div class="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div class="h-3 bg-surface2 rounded w-1/4 mb-2"></div>
                  <div class="h-4 bg-surface2 rounded w-3/4"></div>
                </div>
                <div class="h-4 bg-surface2 rounded w-1/3"></div>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col gap-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
            <div
              v-for="item in smallProducts"
              :key="item.id"
              class="featured-small group bg-bg rounded-md border border-border flex overflow-hidden cursor-pointer transition-all hover:translate-x-1 hover:shadow-[0_4px_15px_rgba(0,0,0,.05)] shrink-0"
              @click="goToDetail(item)"
            >
              <div class="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden flex items-center justify-center bg-white p-2 shrink-0">
                <img :src="item.image" class="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105" :alt="item.name">
              </div>
              <div class="feat-small-info p-3.5 flex-1 text-left">
                <div class="text-[10px] text-text-muted tracking-[1.5px] uppercase mb-0.75 font-bold">{{ item.brand }}</div>
                <div class="text-[13px] font-medium mb-1.25 text-text leading-tight">{{ item.name }}</div>
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="font-display text-[17px] text-accent tracking-[0.5px] font-bold">{{ item.price }}</span>
                  <span v-if="item.oldPrice" class="text-[12px] text-text-dim line-through">{{ item.oldPrice }}</span>
                </div>
                <div class="flex items-center gap-1 text-[12px] text-gold">
                  {{ item.rating }} <span class="text-text-muted text-[11px]">({{ item.reviews }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mapBackendProduct } from '../../data/products.js'
import axiosInstance from '../../api/axios.js'

const router = useRouter()

const featured = ref({
  id: 0,
  brand: 'SaigonShoes',
  name: 'Dang tai...',
  price: '0d',
  image: '/images/placeholder.png',
  images: [{ src: '/images/placeholder.png', flip: false }],
  sizes: []
})
const smallProducts = ref([])
const isLoading = ref(true)

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.slug || product.id } })
}

async function fetchHotProducts() {
  isLoading.value = true
  try {
    const response = await axiosInstance.get('/hotproducts')
    if (response.success && Array.isArray(response.data) && response.data.length > 0) {
      const mapped = response.data.map(mapBackendProduct)
      featured.value = mapped[0]
      smallProducts.value = mapped.slice(1)
    }
  } catch (error) {
    console.error('Failed to load hot products:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchHotProducts)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ff4d00;
}
</style>
