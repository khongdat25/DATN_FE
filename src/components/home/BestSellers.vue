<template>
  <section class="py-8" id="sneaker">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">

        <!-- Header row: title left | view-all right -->
        <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <!-- Left: Title -->
          <div>
            <h2 class="font-display text-[clamp(18px,2.5vw,28px)] tracking-[1.5px] font-bold leading-tight whitespace-nowrap">SẢN PHẨM BÁN CHẠY</h2>
          </div>
          <!-- Right: View all -->
          <div class="flex justify-end">
            <a
              href="/products"
              class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]"
            >Xem tất cả <i class="ti ti-arrow-right"></i></a>
          </div>
        </div>

        <!-- Bestsellers Grid using ProductCard -->
        <div
          v-if="isLoading"
          class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5"
        >
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

        <div
          v-else
          class="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-5"
          id="bestSellerGrid"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="relative"
          >
            <ProductCard
              :product="product"
              :show-cart-button="false"
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
import { ref, computed, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mapBackendProduct } from '../../data/products.js'
import axiosInstance from '../../api/axios.js'
import ProductCard from '../common/ProductCard.vue'

const router = useRouter()

const showToast = inject('showToast', (msg) => {})

const wishes = ref({})

function toggleWish(payload) {
  if (payload && typeof payload.wished === 'boolean') {
    showToast(payload.wished ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
  }
}

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.slug || product.id } })
}

const bestSellers = ref([])
const isLoading = ref(true)

async function fetchBestSellers() {
  isLoading.value = true
  try {
    const response = await axiosInstance.get('/bestsellings')
    if (response.success && Array.isArray(response.data)) {
      bestSellers.value = response.data.map((p, idx) => {
        const mapped = mapBackendProduct(p)
        return {
          ...mapped,
          rank: idx + 1
        }
      })
    }
  } catch (error) {
    console.error('Failed to load best sellers:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchBestSellers()
})

const filteredProducts = computed(() => bestSellers.value)
</script>

<style scoped>
.ci-wish.active {
  background-color: var(--color-accent, #FF4D00) !important;
  border-color: var(--color-accent, #FF4D00) !important;
  color: white !important;
}
</style>
