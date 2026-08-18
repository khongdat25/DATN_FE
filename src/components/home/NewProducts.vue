<template>
  <section class="py-8 bg-surface2/30" id="new-products">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">

        <!-- Header row: title left | view-all right -->
        <div class="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <!-- Left: Title -->
          <div>
            <h2 class="font-display text-[clamp(18px,2.5vw,28px)] tracking-[1.5px] font-bold leading-tight whitespace-nowrap">SẢN PHẨM MỚI NHẤT</h2>
          </div>
          <!-- Right: Navigation buttons & View all -->
          <div class="flex items-center justify-end gap-3 flex-wrap">
            <div v-if="filteredProducts.length > 5" class="flex items-center gap-1.5">
              <button 
                @click="scrollLeft" 
                class="w-8 h-8 rounded-full border border-border bg-white text-text hover:bg-accent hover:text-white hover:border-accent flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title="Lướt sang trái"
              >
                <i class="ti ti-chevron-left text-sm font-bold"></i>
              </button>
              <button 
                @click="scrollRight" 
                class="w-8 h-8 rounded-full border border-border bg-white text-text hover:bg-accent hover:text-white hover:border-accent flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title="Lướt sang phải"
              >
                <i class="ti ti-chevron-right text-sm font-bold"></i>
              </button>
            </div>

            <a
              href="/products"
              class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]"
            >Xem tất cả <i class="ti ti-arrow-right"></i></a>
          </div>
        </div>

        <!-- Skeleton loader -->
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

        <!-- Horizontal scrollable products slider -->
        <div
          v-else
          ref="scrollContainer"
          class="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth custom-scrollbar snap-x"
          id="newProductGrid"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="w-[224px] min-w-[224px] max-w-[224px] shrink-0 snap-start animate-fade-in"
          >
            <ProductCard
              :product="product"
              :show-cart-button="false"
              @toggle-wish="toggleWish(product)"
              @click="goToDetail(product)"
            />
          </div>

          <div v-if="filteredProducts.length === 0" class="w-full text-center py-10 text-text-muted text-sm">
            Không tìm thấy sản phẩm mới nào.
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
const scrollContainer = ref(null)

const showToast = inject('showToast', (msg) => {})

const activeFilter = ref('all')
const wishes = ref({})

const filters = [
  { key: 'all', label: 'Tất cả' },
  { key: 'sneaker', label: 'Sneaker' },
  { key: 'crocs', label: 'Crocs' },
]

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -244, behavior: 'smooth' })
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 244, behavior: 'smooth' })
  }
}

function toggleWish(product) {
  wishes.value[product.id] = !wishes.value[product.id]
  showToast(wishes.value[product.id] ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.slug || product.id } })
}

const newProducts = ref([])
const isLoading = ref(true)

async function fetchNewProducts() {
  isLoading.value = true
  try {
    const response = await axiosInstance.get('/search', { params: { sort: 'newest', limit: 15 } })
    if (response.success && Array.isArray(response.data)) {
      newProducts.value = response.data.map(p => {
        const mapped = mapBackendProduct(p)
        return {
          ...mapped,
          cat: mapped.category === 'Dép Crocs' ? 'crocs' : 'sneaker'
        }
      })
    }
  } catch (error) {
    console.error('Failed to load new products:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchNewProducts()
})

const filteredProducts = computed(() => {
  return newProducts.value.slice(0, 7) // Tối đa 7 sản phẩm mới nhất
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
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
