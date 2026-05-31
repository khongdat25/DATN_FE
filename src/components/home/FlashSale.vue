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

        <!-- Loading Skeleton -->
        <div v-if="loading" class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5">
          <div v-for="i in 5" :key="i" class="bg-surface2 rounded-md animate-pulse h-[320px]"></div>
        </div>

        <!-- Products Grid (col-5) -->
        <div v-else class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5">
          <ProductCard
            v-for="product in flashProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="$emit('add-to-cart', $event)"
            @toggle-wish="$emit('toggle-wish', $event)"
          />
        </div>

        <!-- Empty state -->
        <div v-if="!loading && flashProducts.length === 0" class="text-center py-12 text-text-muted">
          <i class="ti ti-bolt-off text-[48px] block mb-3"></i>
          <p>Hiện không có Flash Sale nào đang diễn ra</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProductCard from '../common/ProductCard.vue'
import { getFlashSales } from '../../api/homeService'

const BASE_STORAGE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000'

defineEmits(['add-to-cart', 'toggle-wish'])

// --- Countdown ---
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

// --- Data ---
const flashProducts = ref([])
const loading = ref(true)

function getImageUrl(image) {
  if (!image) return null
  if (image.startsWith('http')) return image
  return `${BASE_STORAGE_URL}/storage/${image}`
}

function mapFlashProduct(item, index) {
  const product = item.product || {}
  // Ưu tiên: variant image → product image đầu tiên
  const variantImg = product.variants?.[0]?.image
  const productImg = product.images?.[0]?.image
  const rawImage = variantImg || productImg || null

  // Tính giá sau giảm: discount_value là % hoặc số tiền tùy BE
  const basePrice = product.variants?.[0]?.price || 0
  const discountValue = item.discount_value || 0
  const salePrice = basePrice > 0
    ? Math.round(basePrice * (1 - discountValue / 100))
    : 0

  return {
    id: item.id,
    brand: product.category?.name || 'SaigonShoes',
    name: product.name || 'Sản phẩm',
    price: salePrice > 0 ? salePrice.toLocaleString('vi-VN') + 'đ' : 'Liên hệ',
    oldPrice: basePrice > 0 ? basePrice.toLocaleString('vi-VN') + 'đ' : null,
    image: getImageUrl(rawImage),
    rating: '★★★★★',
    reviews: product.sold || 0,
    soldCount: item.sold || 0,
    total: item.quantity_limit || 100,
    badges: [{ label: `-${discountValue}%`, color: 'bg-accent shadow-sm' }],
  }
}

onMounted(async () => {
  timer = setInterval(tick, 1000)
  try {
    const res = await getFlashSales()
    const flashSales = res.data || []
    // Lấy tất cả items từ tất cả flash sale đang chạy, tối đa 5 sp
    const allItems = flashSales.flatMap(fs => fs.items || [])
    flashProducts.value = allItems.slice(0, 5).map(mapFlashProduct)
  } catch (e) {
    flashProducts.value = []
  } finally {
    loading.value = false
  }
})
onUnmounted(() => { clearInterval(timer) })
</script>
