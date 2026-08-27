<template>
  <section v-if="isLoading || flashProducts.length > 0" class="bg-surface border-b border-border relative" id="flash">
    <div class="max-w-[1200px] mx-auto px-5 py-8">
      <div class="section-wrapper">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div class="flex items-center gap-4 flex-wrap">
            <div class="font-display text-[26px] sm:text-[32px] tracking-[2px] uppercase font-bold text-slate-900">
              FLASH SALE
            </div>
            <!-- Countdown -->
            <div class="flex items-center gap-[6px]">
              <div class="text-center">
                <div class="bg-accent text-white font-display text-[20px] md:text-[22px] min-w-[42px] md:min-w-[46px] h-[42px] md:h-[46px] rounded-lg flex items-center justify-center tracking-[2px] shadow-sm font-bold">{{ pad(hours) }}</div>
                <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center font-bold">Giờ</div>
              </div>
              <div class="font-display text-[20px] md:text-[22px] text-accent pb-3 font-bold">:</div>
              <div class="text-center">
                <div class="bg-accent text-white font-display text-[20px] md:text-[22px] min-w-[42px] md:min-w-[46px] h-[42px] md:h-[46px] rounded-lg flex items-center justify-center tracking-[2px] shadow-sm font-bold">{{ pad(minutes) }}</div>
                <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center font-bold">Phút</div>
              </div>
              <div class="font-display text-[20px] md:text-[22px] text-accent pb-3 font-bold">:</div>
              <div class="text-center">
                <div class="bg-accent text-white font-display text-[20px] md:text-[22px] min-w-[42px] md:min-w-[46px] h-[42px] md:h-[46px] rounded-lg flex items-center justify-center tracking-[2px] shadow-sm font-bold">{{ pad(seconds) }}</div>
                <div class="text-[9px] text-text-muted tracking-[1px] uppercase mt-[3px] text-center font-bold">Giây</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider Carousel Wrapper with Floating Navigation Buttons on Both Sides -->
        <div class="relative group">
          <!-- Left Floating Navigation Button -->
          <button 
            v-if="!isLoading && flashProducts.length > 0"
            @click="scrollLeft" 
            class="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg hover:bg-accent hover:border-accent hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90 border-none"
            aria-label="Xem sản phẩm trước"
          >
            <i class="ti ti-chevron-left text-lg md:text-xl font-bold"></i>
          </button>

          <!-- Right Floating Navigation Button -->
          <button 
            v-if="!isLoading && flashProducts.length > 0"
            @click="scrollRight" 
            class="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg hover:bg-accent hover:border-accent hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90 border-none"
            aria-label="Xem sản phẩm tiếp theo"
          >
            <i class="ti ti-chevron-right text-lg md:text-xl font-bold"></i>
          </button>

          <!-- Skeleton Loading -->
          <div v-if="isLoading" class="flex gap-5 overflow-hidden">
            <div v-for="i in 5" :key="i" class="w-[210px] sm:w-[226px] flex-shrink-0 border border-border rounded-2xl bg-white p-4 flex flex-col gap-4 animate-pulse shadow-sm">
              <div class="bg-surface2 rounded-xl h-44 w-full"></div>
              <div class="h-4 bg-surface2 rounded w-3/4"></div>
              <div class="h-3 bg-surface2 rounded w-1/2"></div>
              <div class="flex items-center justify-between mt-2">
                <div class="h-5 bg-surface2 rounded w-1/3"></div>
                <div class="h-8 bg-surface2 rounded-full w-8"></div>
              </div>
            </div>
          </div>

          <!-- Horizontal Scrollable Slider Carousel -->
          <div 
            v-else 
            ref="scrollContainer"
            class="flex overflow-x-auto gap-5 scroll-smooth py-2 px-1 no-scrollbar select-none"
          >
            <div
              v-for="product in flashProducts"
              :key="product.id"
              class="w-[210px] sm:w-[226px] flex-shrink-0"
            >
              <ProductCard
                :product="product"
                :show-cart-button="false"
                @toggle-wish="$emit('toggle-wish', $event)"
                @click="goToDetail(product)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { mapBackendProduct } from '../../data/products.js'
import axiosInstance from '../../api/axios.js'
import ProductCard from '../common/ProductCard.vue'

const router = useRouter()
const scrollContainer = ref(null)

defineEmits(['toggle-wish'])

const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let timer = null

function pad(n) { return String(n).padStart(2, '0') }

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -480, behavior: 'smooth' })
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 480, behavior: 'smooth' })
  }
}

function startCountdown(endTimeStr) {
  if (timer) clearInterval(timer)
  
  const targetDate = new Date(endTimeStr.replace(/-/g, '/'))
  
  function updateTimer() {
    const now = new Date()
    const diff = targetDate.getTime() - now.getTime()
    
    if (diff <= 0) {
      hours.value = 0
      minutes.value = 0
      seconds.value = 0
      flashProducts.value = []
      if (timer) clearInterval(timer)
      // Tự động kiểm tra và nạp chiến dịch tiếp theo ngay khi vừa hết giờ
      setTimeout(() => {
        fetchFlashSale()
      }, 1000)
      return
    }
    
    hours.value = Math.floor(diff / (1000 * 60 * 60))
    minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
  }
  
  updateTimer()
  timer = setInterval(updateTimer, 1000)
}

const flashProducts = ref([])
const isLoading = ref(true)

async function fetchFlashSale() {
  isLoading.value = true
  try {
    const response = await axiosInstance.get('/flashsales')
    if (response && response.success && Array.isArray(response.data) && response.data.length > 0) {
      const activeSale = response.data[0]
      if (activeSale && activeSale.end_time) {
        startCountdown(activeSale.end_time)
        
        const variantsList = activeSale.variants || activeSale.items || []
        if (variantsList.length > 0) {
          const uniqueProductsMap = new Map()

          variantsList.forEach(item => {
            const prod = item.product
            if (prod && !uniqueProductsMap.has(prod.id)) {
              const mapped = mapBackendProduct(prod)
              const originalPrice = parseFloat(item.price) || parseFloat(mapped.numericPrice) || 0
              const flashPrice = parseFloat(item.sale_price) || originalPrice

              let discountPercent = 0
              if (originalPrice > 0 && flashPrice < originalPrice) {
                discountPercent = Math.round(((originalPrice - flashPrice) / originalPrice) * 100)
              } else if (item.discount_value !== undefined && item.discount_value !== null) {
                discountPercent = parseFloat(item.discount_value) || 0
              }

              mapped.price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(flashPrice).replace(/\s/g, '').replace('₫', 'đ')
              mapped.oldPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice).replace(/\s/g, '').replace('₫', 'đ')
              if (discountPercent > 0) {
                mapped.badges = [{ label: `-${discountPercent}%`, color: 'bg-accent' }]
              }
              mapped.soldCount = item.sold || 0
              mapped.total = item.stock || item.quantity_limit || 100
              uniqueProductsMap.set(prod.id, mapped)
            }
          })

          flashProducts.value = Array.from(uniqueProductsMap.values())
        } else {
          flashProducts.value = []
        }
      } else {
        flashProducts.value = []
      }
    } else {
      flashProducts.value = []
    }
  } catch (error) {
    console.error('Failed to load flash sale products:', error)
    flashProducts.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchFlashSale()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.slug || product.id } })
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
