<template>
  <section class="py-8" id="products">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">
        <div class="flex justify-between items-end mb-9">
          <div>
            <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px] font-bold">SẢN PHẨM NỔI BẬT</h2>
            <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Được chọn lọc kỹ càng cho bạn</p>
          </div>
          <a href="#" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Xem tất cả <i class="ti ti-arrow-right"></i></a>
        </div>

        <!-- Loading Skeleton -->
        <div v-if="loading" class="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
          <div class="bg-surface2 rounded-xl animate-pulse h-[500px]"></div>
          <div class="flex flex-col gap-4">
            <div v-for="i in 4" :key="i" class="bg-surface2 rounded-md animate-pulse h-[110px]"></div>
          </div>
        </div>

        <div v-else class="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
          <!-- Large Featured Card -->
          <div v-if="featured" class="bg-bg rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,.05)]">
            <div class="h-[450px] max-lg:h-[260px] relative overflow-hidden">
              <img :src="featured.image" class="w-full h-full object-contain p-3 bg-white" :alt="featured.name">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,77,0,0.1),transparent_60%)]"></div>
              <div class="absolute top-[10px] left-[10px] flex flex-col gap-[5px] z-[2]">
                <span class="inline-block text-[9px] font-medium tracking-[1.5px] uppercase py-[3px] px-2 rounded-sm text-white bg-[#4CAF50]">NEW</span>
                <span class="inline-block text-[9px] font-medium tracking-[1.5px] uppercase py-[3px] px-2 rounded-sm text-white bg-gold">BESTSELLER</span>
              </div>
            </div>
            <div class="p-6 text-left">
              <div class="text-[11px] text-text-muted tracking-[1.5px] uppercase mb-1 font-bold">{{ featured.brand }}</div>
              <div class="font-display text-[24px] whitespace-normal tracking-[1px] mb-2 text-text font-bold">{{ featured.name }}</div>
              <div class="flex items-baseline gap-2 mb-2">
                <span class="font-display text-[28px] text-accent tracking-[0.5px] font-bold">{{ featured.price }}</span>
                <span v-if="featured.oldPrice" class="text-[12px] text-text-dim line-through">{{ featured.oldPrice }}</span>
              </div>
              <div class="flex items-center gap-1 text-[12px] text-gold mb-[10px]">★★★★★ <span class="text-text-muted text-[11px]">({{ featured.reviews }} đánh giá)</span></div>
              <div class="prod-sizes flex gap-[5px] flex-wrap mb-[10px]">
                <span
                  v-for="size in sizes"
                  :key="size"
                  :class="['size-chip text-[10px] py-[3px] px-[7px] rounded-[3px] border cursor-pointer transition-all duration-150',
                    selectedSize === size ? 'border-accent text-accent bg-accent/5 font-semibold' : 'border-border text-text-muted hover:border-accent hover:text-accent hover:bg-accent/5']"
                  @click="selectedSize = size"
                >{{ size }}</span>
              </div>
              <div class="flex gap-2">
                <button class="flex-1 bg-surface2 text-text border border-border p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-all flex items-center justify-center gap-[6px] hover:border-accent hover:text-accent hover:bg-bg active:scale-95 cursor-pointer font-bold" @click="doAddToCart(featured)">
                  <i class="ti ti-shopping-cart"></i> Thêm vào giỏ
                </button>
                <button class="flex-1 bg-accent text-white border-none p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-colors hover:bg-accent-hover font-bold cursor-pointer">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>

          <!-- Small Card List -->
          <div class="flex flex-col gap-4">
            <div
              v-for="item in smallProducts"
              :key="item.id"
              class="featured-small group bg-bg rounded-md border border-border flex overflow-hidden cursor-pointer transition-all hover:translate-x-1 hover:shadow-[0_4px_15px_rgba(0,0,0,.05)]"
            >
              <div class="w-[110px] min-w-[110px] overflow-hidden">
                <img :src="item.image" class="w-full h-full object-contain p-3 bg-white transition-transform duration-500 group-hover:scale-105" :alt="item.name">
              </div>
              <div class="feat-small-info p-[14px] flex-1 text-left">
                <div class="text-[10px] text-text-muted tracking-[1.5px] uppercase mb-[3px] font-bold">{{ item.brand }}</div>
                <div class="text-[13px] font-medium mb-[5px] text-text leading-tight">{{ item.name }}</div>
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="font-display text-[17px] text-accent tracking-[0.5px] font-bold">{{ item.price }}</span>
                  <span v-if="item.oldPrice" class="text-[12px] text-text-dim line-through">{{ item.oldPrice }}</span>
                </div>
                <div class="flex items-center gap-1 text-[12px] text-gold mb-[10px]">
                  {{ item.rating }} <span class="text-text-muted text-[11px]">({{ item.reviews }})</span>
                </div>
                <button class="bg-surface2 text-text border border-border p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-all flex items-center justify-center gap-[6px] mt-2 w-full hover:border-accent hover:text-accent hover:bg-bg cursor-pointer font-bold" @click="doAddToCart(item)">
                  <i class="ti ti-shopping-cart"></i> Giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { getHotProducts } from '../../api/homeService'

const BASE_STORAGE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000'

const addToCart = inject('addToCart', (p) => {})

const sizes = ['38', '39', '40', '41', '42', '43']
const selectedSize = ref('39')
const loading = ref(true)
const hotProducts = ref([])

function doAddToCart(product) {
  addToCart(product)
}

function getImageUrl(image) {
  if (!image) return '/images/nike-air1.png'
  if (image.startsWith('http')) return image
  return `${BASE_STORAGE_URL}/storage/${image}`
}

const featured = computed(() => hotProducts.value[0] || null)
const smallProducts = computed(() => hotProducts.value.slice(1))

onMounted(async () => {
  try {
    const res = await getHotProducts()
    const products = res.data || []
    hotProducts.value = products.map(p => {
      const rawImage = p.variants?.[0]?.image || null
      const basePrice = p.variants?.[0]?.price || 0
      return {
        id: p.id,
        brand: p.brand?.name || p.category?.name || 'SaigonShoes',
        name: p.name,
        price: basePrice > 0 ? basePrice.toLocaleString('vi-VN') + 'đ' : 'Liên hệ',
        oldPrice: null,
        image: getImageUrl(rawImage),
        rating: '★★★★★',
        reviews: p.sold || 0,
      }
    })
  } catch (e) {
    hotProducts.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.size-chip.active {
  border-color: var(--color-accent, #FF4D00) !important;
  color: var(--color-accent, #FF4D00) !important;
  background-color: rgba(255, 77, 0, 0.08) !important;
}
</style>
