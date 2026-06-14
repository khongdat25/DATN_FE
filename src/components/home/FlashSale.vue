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
          <div class="bg-linear-to-br from-accent to-[#ff7043] text-white text-[12px] tracking-[2px] uppercase py-2 px-5 rounded-full font-bold shadow-sm">🔥 Giảm đến 50%</div>
        </div>

        <!-- Products Grid (col-5) -->
        <div class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5">
          <ProductCard
            v-for="product in flashProducts"
            :key="product.id"
            :product="product"
            :show-cart-button="false"
            @add-to-cart="$emit('add-to-cart', $event)"
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

const flashProducts = ref([])

async function fetchFlashSale() {
  try {
    const response = await axiosInstance.get('/flashsales')
    if (response.success && Array.isArray(response.data) && response.data.length > 0) {
      const activeSale = response.data[0]
      if (activeSale && activeSale.items) {
        flashProducts.value = activeSale.items.map(item => {
          if (item.product) {
            const mapped = mapBackendProduct(item.product)
            if (item.discount_value) {
              const originalPrice = parseFloat(mapped.numericPrice) || 0
              const discountVal = parseFloat(item.discount_value) || 0
              const flashPrice = originalPrice - discountVal
              mapped.price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(flashPrice).replace(/\s/g, '').replace('₫', 'đ')
              mapped.oldPrice = mapped.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice).replace(/\s/g, '').replace('₫', 'đ') : null
              mapped.badges = [{ label: `-${Math.round((discountVal/originalPrice)*100)}%`, color: 'bg-accent' }]
            }
            mapped.soldCount = item.sold || 0
            mapped.total = item.quantity_limit || 100
            return mapped
          }
          return null
        }).filter(Boolean)
      }
    }
  } catch (error) {
    console.error('Failed to load flash sale products:', error)
  }
}

onMounted(async () => {
  timer = setInterval(tick, 1000)
  await fetchFlashSale()
})

onUnmounted(() => {
  clearInterval(timer)
})

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}
</script>
