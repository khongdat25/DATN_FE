<template>
  
    <!-- Breadcrumbs -->
    <div class="bg-surface2 py-4 border-b border-border">
      <div class="max-w-[1200px] mx-auto px-5 flex items-center gap-2 text-[12px] text-text-muted">
        <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <router-link to="/products" class="hover:text-accent transition-colors">Sản phẩm</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <span class="text-text font-semibold">Tất cả sản phẩm</span>
      </div>
    </div>

    <!-- Main Content -->
    <main class="py-12 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5 flex flex-col lg:flex-row gap-8">
        
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-[260px] shrink-0 flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h3 class="text-[15px] font-display font-bold flex items-center gap-2 uppercase tracking-widest text-text">
              <i class="ti ti-filter text-accent text-lg"></i> Bộ lọc
            </h3>
            <button @click="resetFilters" class="text-[12px] text-accent font-semibold hover:underline cursor-pointer">
              Xóa tất cả
            </button>
          </div>

          <!-- Brand Filter -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('brand')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Thương Hiệu</p>
              <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeSections.brand ? 'ti-chevron-up' : 'ti-chevron-down']"></i>
            </div>
            <div v-show="activeSections.brand" class="px-4 pb-4">
              <div class="flex flex-col gap-3">
                <div v-if="availableBrands.length === 0" class="text-xs text-text-dim italic">Đang tải...</div>
                <label v-for="brand in availableBrands" :key="brand.id" class="flex items-center gap-3 cursor-pointer group select-none">
                  <input type="checkbox" v-model="filters.brands" :value="brand.name" class="w-4 h-4 rounded border-border-light text-accent accent-accent cursor-pointer">
                  <span :class="['text-[13px] transition-colors group-hover:text-accent', filters.brands.includes(brand.name) ? 'text-accent font-semibold' : 'text-text-muted']">
                    {{ brand.name }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Collection Filter -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('category')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Bộ Sưu Tập</p>
              <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeSections.category ? 'ti-chevron-up' : 'ti-chevron-down']"></i>
            </div>
            <div v-show="activeSections.category" class="px-4 pb-4">
              <div class="flex flex-col gap-3">
                <div v-if="availableCategories.length === 0" class="text-xs text-text-dim italic">Đang tải...</div>
                <label v-for="cat in availableCategories" :key="cat.id" class="flex items-center gap-3 cursor-pointer group select-none">
                  <input type="checkbox" v-model="filters.categories" :value="cat.name" class="w-4 h-4 rounded border-border-light text-accent accent-accent cursor-pointer">
                  <span :class="['text-[13px] transition-colors group-hover:text-accent', filters.categories.includes(cat.name) ? 'text-accent font-semibold' : 'text-text-muted']">
                    {{ cat.name }}
                  </span>
                </label>
              </div>
            </div>
          </div>



          <!-- Price Range Filter -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('price')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Khoảng Giá (đ)</p>
              <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeSections.price ? 'ti-chevron-up' : 'ti-chevron-down']"></i>
            </div>
            <div v-show="activeSections.price" class="px-4 pb-4">
              <div class="flex items-center gap-2 mb-3">
                <input type="number" v-model.number="filters.priceFrom" placeholder="Từ" class="w-full bg-surface2 border border-border rounded-xl py-2 px-3 text-[13px] text-text outline-none focus:border-accent focus:bg-white transition-all">
                <span class="text-text-muted text-sm">—</span>
                <input type="number" v-model.number="filters.priceTo" placeholder="Đến" class="w-full bg-surface2 border border-border rounded-xl py-2 px-3 text-[13px] text-text outline-none focus:border-accent focus:bg-white transition-all">
              </div>
              <button @click="applyPriceFilter" class="w-full bg-accent text-white text-[12px] font-display font-bold py-2.5 rounded-xl transition-colors hover:bg-accent-hover uppercase tracking-wider cursor-pointer active:scale-98">
                Áp dụng
              </button>
            </div>
          </div>

          <!-- Sizes Filter -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('size')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Kích Thước</p>
              <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeSections.size ? 'ti-chevron-up' : 'ti-chevron-down']"></i>
            </div>
            <div v-show="activeSections.size" class="px-4 pb-4">
              <div class="grid grid-cols-3 gap-2">
                <span 
                  v-for="size in availableSizes" 
                  :key="size" 
                  @click="toggleSizeFilter(size)"
                  :class="['border py-2 text-center text-xs font-semibold rounded-xl cursor-pointer select-none transition-all duration-150 active:scale-95', filters.sizes.includes(size) ? 'border-accent text-accent bg-accent/5' : 'border-border text-text-muted bg-white hover:border-accent hover:text-accent hover:bg-accent/5']"
                >
                  {{ size }}
                </span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Product List & Sorting -->
        <div class="flex-1 min-w-0">

          <!-- Search Bar -->
          <div class="relative mb-4">
            <i class="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"></i>
            <input
              v-model="searchQuery"
              @input="onSearchInput"
              type="text"
              placeholder="Tìm kiếm sản phẩm... (VD: Nike, Adidas, Samba...)"
              class="w-full pl-11 pr-10 py-3.5 bg-white border border-border rounded-2xl text-sm text-text outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all placeholder:text-text-dim"
            >
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors cursor-pointer"
            >
              <i class="ti ti-x text-sm"></i>
            </button>
          </div>

          <!-- Sorting Toolbar -->
          <div class="bg-white px-5 py-3.5 border border-border rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3 mb-6 shadow-sm">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[13px] text-text-muted font-medium mr-1">Sắp xếp:</span>
              <button 
                v-for="sort in sortOptions" 
                :key="sort.value" 
                @click="setSortBy(sort.value)"
                :class="['px-4 py-1.5 text-[12px] font-semibold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer', filters.sortBy === sort.value ? 'bg-accent text-white shadow-sm' : 'bg-surface2 text-text-muted hover:bg-border/30 hover:text-text']"
              >
                {{ sort.label }}
              </button>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[13px] text-text-muted">Có <strong>{{ filteredProducts.length }}</strong> sản phẩm</span>
              <select v-model="filters.priceSort" class="bg-surface2 border border-border rounded-xl py-1.5 px-3 text-[12px] text-text-muted outline-none focus:border-accent cursor-pointer transition-colors">
                <option value="default">Giá: Mặc định</option>
                <option value="low-to-high">Giá: Thấp → Cao</option>
                <option value="high-to-low">Giá: Cao → Thấp</option>
              </select>
            </div>
          </div>

          <!-- Product Grid & Loading States -->
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="i in 8" :key="i" class="border border-border rounded-2xl bg-white p-5 flex flex-col gap-4 animate-pulse shadow-sm">
              <div class="bg-surface2 rounded-xl h-48 w-full"></div>
              <div class="h-4 bg-surface2 rounded w-3/4"></div>
              <div class="h-3 bg-surface2 rounded w-1/2"></div>
              <div class="flex items-center justify-between mt-2">
                <div class="h-5 bg-surface2 rounded w-1/3"></div>
                <div class="h-8 bg-surface2 rounded-full w-8"></div>
              </div>
            </div>
          </div>

          <div v-else-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard 
              v-for="product in paginatedProducts" 
              :key="product.id" 
              :product="product"
              @toggle-wish="handleWish"
              @click="goToDetail(product)"
            />
          </div>
          
          <!-- Empty State -->
          <div v-else class="text-center py-20 bg-white border border-border rounded-2xl shadow-sm">
            <i class="ti ti-mood-empty text-[60px] text-text-dim block mb-4"></i>
            <h4 class="text-lg font-bold text-text mb-2">Không tìm thấy sản phẩm nào</h4>
            <p class="text-text-muted text-sm mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn xem sao.</p>
            <button @click="resetFilters" class="bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-semibold tracking-wide hover:bg-accent-hover transition-colors active:scale-95 cursor-pointer">
              Xóa bộ lọc
            </button>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-10">
            <button 
              @click="currentPage = Math.max(1, currentPage - 1)" 
              :disabled="currentPage === 1" 
              class="w-10 h-10 border border-border rounded-xl flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-50 disabled:hover:border-border disabled:hover:text-text-muted cursor-pointer disabled:cursor-not-allowed"
            >
              <i class="ti ti-chevron-left"></i>
            </button>
            <button 
              v-for="page in totalPages" 
              :key="page" 
              @click="currentPage = page"
              :class="['w-10 h-10 font-bold rounded-xl transition-all cursor-pointer', currentPage === page ? 'bg-accent text-white' : 'border border-border text-text-muted hover:border-accent hover:text-accent bg-white']"
            >
              {{ page }}
            </button>
            <button 
              @click="currentPage = Math.min(totalPages, currentPage + 1)" 
              :disabled="currentPage === totalPages" 
              class="w-10 h-10 border border-border rounded-xl flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-50 disabled:hover:border-border disabled:hover:text-text-muted cursor-pointer disabled:cursor-not-allowed"
            >
              <i class="ti ti-chevron-right"></i>
            </button>
          </div>

        </div>
      </div>
    </main>
  
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

defineOptions({ name: 'ProductsView' })
import ProductCard from '@/components/common/ProductCard.vue'
import { mapBackendProduct } from '@/data/products.js'
import axiosInstance from '@/api/axios.js'

const router = useRouter()
const route = useRoute()
const showToast = inject('showToast', (msg) => {})

// Layout sections toggling
const activeSections = reactive({
  category: true,
  brand: true,
  price: true,
  size: true
})
function toggleSection(section) { activeSections[section] = !activeSections[section] }

// Categories loaded from API, brands/sizes stay static
const availableCategories = ref([])
const availableBrands = ref([])
const availableSizes = ['38', '39', '40', '41', '42', '43', '44']

const sortOptions = [
  { label: 'Phổ biến', value: 'popular' },
  { label: 'Mới Nhất', value: 'newest' },
  { label: 'Bán Chạy', value: 'best-seller' }
]

// Search
const searchQuery = ref('')
let debounceTimer = null

// Filters state
const filters = reactive({
  categories: [],
  brands: [],
  priceFrom: null,
  priceTo: null,
  appliedPriceFrom: null,
  appliedPriceTo: null,
  sizes: [],
  sortBy: 'popular',
  priceSort: 'default'
})

const currentPage = ref(1)
const itemsPerPage = 8
const products = ref([])
const isLoading = ref(true)

// --- API functions ---
async function fetchCategories() {
  try {
    const res = await axiosInstance.get('/getcategories')
    if (res?.success && Array.isArray(res?.data)) {
      availableCategories.value = res.data
    }
  } catch (e) {
    console.error('Failed to fetch categories:', e)
  }
}

async function fetchBrands() {
  try {
    const res = await axiosInstance.get('/getbrands')
    if (res?.success && Array.isArray(res?.data)) {
      availableBrands.value = res.data
    }
  } catch (e) {
    console.error('Failed to fetch brands:', e)
  }
}

async function fetchProducts() {
  isLoading.value = true
  try {
    const params = {}

    // Text search (server-side)
    if (searchQuery.value.trim()) params.q = searchQuery.value.trim()

    // Category filter: lookup ID from loaded categories
    if (filters.categories.length > 0) {
      const cat = availableCategories.value.find(c => filters.categories.includes(c.name))
      if (cat?.id) params.category_id = cat.id
    }

    // Price filter (server-side)
    if (filters.appliedPriceFrom !== null) params.min_price = filters.appliedPriceFrom
    if (filters.appliedPriceTo !== null) params.max_price = filters.appliedPriceTo

    // Sort (server-side)
    if (filters.priceSort === 'low-to-high') params.sort = 'price_asc'
    else if (filters.priceSort === 'high-to-low') params.sort = 'price_desc'
    else if (filters.sortBy === 'best-seller') params.sort = 'sold_desc'
    else if (filters.sortBy === 'newest') params.sort = 'newest'
    else params.sort = 'sold_desc' // popular default

    const res = await axiosInstance.get('/search', { params })
    if (res?.success && Array.isArray(res?.data)) {
      products.value = res.data.map(mapBackendProduct)
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
  } finally {
    isLoading.value = false
  }
}

// Debounced search handler
function onSearchInput() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    currentPage.value = 1
    fetchProducts()
  }, 450)
}

function clearSearch() {
  searchQuery.value = ''
  currentPage.value = 1
  fetchProducts()
}

// --- Computed: only brand + size are client-side (price/sort/category/q are server-side) ---
const filteredProducts = computed(() => {
  let result = [...products.value]
  if (filters.brands.length > 0) {
    result = result.filter(p =>
      filters.brands.some(b => p.brand?.toLowerCase().includes(b.toLowerCase()))
    )
  }
  if (filters.sizes.length > 0) {
    result = result.filter(p => p.sizes.some(s => filters.sizes.includes(s)))
  }
  return result
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

// --- Filter actions ---
function toggleSizeFilter(size) {
  const idx = filters.sizes.indexOf(size)
  if (idx >= 0) filters.sizes.splice(idx, 1)
  else filters.sizes.push(size)
  currentPage.value = 1
}

function setSortBy(val) {
  filters.sortBy = val
  currentPage.value = 1
}

function applyPriceFilter() {
  filters.appliedPriceFrom = filters.priceFrom
  filters.appliedPriceTo = filters.priceTo
  currentPage.value = 1
}

function resetFilters() {
  filters.categories = []
  filters.brands = []
  filters.priceFrom = null
  filters.priceTo = null
  filters.appliedPriceFrom = null
  filters.appliedPriceTo = null
  filters.sizes = []
  filters.sortBy = 'popular'
  filters.priceSort = 'default'
  searchQuery.value = ''
  currentPage.value = 1
  fetchProducts()
}

function handleWish(payload) {
  showToast(payload.wished ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}
function goToDetail(product) {
  // Navigate using slug (backend Detail route uses slug, not numeric id)
  router.push({ name: 'product-detail', params: { id: product.slug || product.id } })
}

function applyQueryFilters() {
  const queryCategory = route.query.category
  if (queryCategory) {
    filters.categories = [queryCategory]
  } else {
    filters.categories = []
  }
  const queryBrand = route.query.brand
  if (queryBrand) {
    const foundBrand = availableBrands.value.find(b => b.name.toLowerCase() === queryBrand.toLowerCase())
    if (foundBrand) {
      filters.brands = [foundBrand.name]
    } else {
      filters.brands = []
    }
  } else {
    filters.brands = []
  }
  const querySearch = route.query.q
  if (querySearch) searchQuery.value = querySearch
}

let isMounted = false

// Watch server-side filter changes → refetch
watch(
  [() => filters.sortBy, () => filters.priceSort, () => filters.categories,
   () => filters.appliedPriceFrom, () => filters.appliedPriceTo],
  () => {
    if (!isMounted) return
    currentPage.value = 1
    fetchProducts()
  }
)

watch(() => route.query, () => { applyQueryFilters() })

onMounted(async () => {
  await Promise.all([fetchCategories(), fetchBrands()])
  applyQueryFilters()
  await fetchProducts()
  isMounted = true
})
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera number arrows remove */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox number input scrollbar remove */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
