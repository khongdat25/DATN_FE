<template>
  <section class="bg-surface border-b border-border" id="flash">
    <div class="max-w-[1200px] mx-auto px-5 py-8">
      <div class="section-wrapper">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6 flex-wrap gap-4 max-md:flex-col max-md:items-start">
          <div class="flex items-center gap-5 flex-wrap">
            <div class="font-display text-[32px] tracking-[2px] flex items-center gap-[10px] uppercase font-bold">
              FLASH SALE
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
        </div>

        <!-- Products Grid (col-5) -->
        <div v-if="isLoading" class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5">
          <div v-for="i in 5" :key="i" class="border border-border rounded-2xl bg-white p-5 flex flex-col gap-4 animate-pulse shadow-sm">
            <div class="bg-surface2 rounded-xl h-48 w-full"></div>
            <div class="h-4 bg-surface2 rounded w-3/4"></div>
            <div class="h-3 bg-surface2 rounded w-1/2"></div>
            <div class="flex items-center justify-between mt-2">
              <div class="h-5 bg-surface2 rounded w-1/3"></div>
              <div class="h-8 bg-surface2 rounded-full w-8"></div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5">
          <ProductCard
            v-for="product in flashProducts"
            :key="product.id"
            :product="product"
            :show-cart-button="false"
            @toggle-wish="$emit('toggle-wish', $event)"
            @click="goToDetail(product)"
          />
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

defineEmits(['toggle-wish'])// Countdown logic
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let timer = null

function pad(n) { return String(n).padStart(2, '0') }

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
      if (timer) clearInterval(timer)
      return
    }
    
    hours.value = Math.floor(diff / (1000 * 60 * 60))
    minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
  }
  
  updateTimer()
  timer = setInterval(updateTimer, 1000)
}

let mockH = 2, mockM = 0, mockS = 0
function startMockCountdown() {
  if (timer) clearInterval(timer)
  hours.value = mockH
  minutes.value = mockM
  seconds.value = mockS
  
  timer = setInterval(() => {
    mockS--
    if (mockS < 0) { mockS = 59; mockM-- }
    if (mockM < 0) { mockM = 59; mockH-- }
    if (mockH < 0) { mockH = 2; mockM = 59; mockS = 59 }
    hours.value = mockH; minutes.value = mockM; seconds.value = mockS
  }, 1000)
}

const flashProducts = ref([])
const isLoading = ref(true)

async function fetchFlashSale() {
  isLoading.value = true
  try {
    const response = await axiosInstance.get('/flashsales')
    if (response.success && Array.isArray(response.data) && response.data.length > 0) {
      const activeSale = response.data[0]
      if (activeSale) {
        if (activeSale.end_time) {
          startCountdown(activeSale.end_time)
        } else {
          startMockCountdown()
        }
        
        if (activeSale.items) {
          flashProducts.value = activeSale.items.map(item => {
            if (item.product) {
              const mapped = mapBackendProduct(item.product)
              if (item.discount_value !== undefined && item.discount_value !== null) {
                const originalPrice = parseFloat(mapped.numericPrice) || 0
                const discountPercent = parseFloat(item.discount_value) || 0
                const flashPrice = originalPrice * (1 - discountPercent / 100)
                mapped.price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(flashPrice).replace(/\s/g, '').replace('₫', 'đ')
                mapped.oldPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice).replace(/\s/g, '').replace('₫', 'đ')
                mapped.badges = [{ label: `-${Math.round(discountPercent)}%`, color: 'bg-accent' }]
              }
              mapped.soldCount = item.sold || 0
              mapped.total = item.quantity_limit || 100
              return mapped
            }
            return null
          }).filter(Boolean)
        }
      } else {
        startMockCountdown()
      }
    } else {
      startMockCountdown()
    }
  } catch (error) {
    console.error('Failed to load flash sale products:', error)
    startMockCountdown()
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
