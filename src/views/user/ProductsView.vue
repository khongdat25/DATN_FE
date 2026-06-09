<template>
  <HomeLayout>
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

          <!-- Category Filter -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('category')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Danh Mục</p>
              <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeSections.category ? 'ti-chevron-up' : 'ti-chevron-down']"></i>
            </div>
            <div v-show="activeSections.category" class="px-4 pb-4">
              <div class="flex flex-col gap-3">
                <label v-for="cat in availableCategories" :key="cat" class="flex items-center gap-3 cursor-pointer group select-none">
                  <input type="checkbox" v-model="filters.categories" :value="cat" class="w-4 h-4 rounded border-border-light text-accent accent-accent cursor-pointer">
                  <span :class="['text-[13px] transition-colors group-hover:text-accent', filters.categories.includes(cat) ? 'text-accent font-semibold' : 'text-text-muted']">
                    {{ cat }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Brand Filter -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('brand')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Thương Hiệu</p>
              <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeSections.brand ? 'ti-chevron-up' : 'ti-chevron-down']"></i>
            </div>
            <div v-show="activeSections.brand" class="px-4 pb-4">
              <div class="flex flex-col gap-3">
                <label v-for="brand in availableBrands" :key="brand" class="flex items-center gap-3 cursor-pointer group select-none">
                  <input type="checkbox" v-model="filters.brands" :value="brand" class="w-4 h-4 rounded border-border-light text-accent accent-accent cursor-pointer">
                  <span :class="['text-[13px] transition-colors group-hover:text-accent', filters.brands.includes(brand) ? 'text-accent font-semibold' : 'text-text-muted']">
                    {{ brand }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Gender Filter -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('gender')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Giới Tính</p>
              <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeSections.gender ? 'ti-chevron-up' : 'ti-chevron-down']"></i>
            </div>
            <div v-show="activeSections.gender" class="px-4 pb-4">
              <div class="flex flex-col gap-3">
                <label v-for="gender in availableGenders" :key="gender" class="flex items-center gap-3 cursor-pointer group select-none">
                  <input type="checkbox" v-model="filters.genders" :value="gender" class="w-4 h-4 rounded border-border-light text-accent accent-accent cursor-pointer">
                  <span :class="['text-[13px] transition-colors group-hover:text-accent', filters.genders.includes(gender) ? 'text-accent font-semibold' : 'text-text-muted']">
                    {{ gender }}
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

          <!-- Product Grid -->
          <div v-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard 
              v-for="product in paginatedProducts" 
              :key="product.id" 
              :product="product"
              @add-to-cart="handleAddToCart"
              @toggle-wish="handleWish"
              @click="goToDetail(product)"
            />
          </div>
          
          <!-- Empty State -->
          <div v-else class="text-center py-20 bg-white border border-border rounded-2xl shadow-sm">
            <i class="ti ti- moods ti-mood-empty text-[60px] text-text-dim block mb-4"></i>
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
  </HomeLayout>
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import ProductCard from '@/components/common/ProductCard.vue'
import { allProducts } from '@/data/products.js'

const router = useRouter()
const route = useRoute()
const addToCart = inject('addToCart', (p) => {})
const showToast = inject('showToast', (msg) => {})

// Layout sections toggling
const activeSections = reactive({
  category: true,
  brand: true,
  gender: true,
  price: true,
  size: true
})

function toggleSection(section) {
  activeSections[section] = !activeSections[section]
}

// Available options lists
const availableCategories = [
  'Giày Nike',
  'Giày Adidas',
  'Giày New Balance',
  'Giày Puma',
  'Giày MLB',
  "Giày Biti's",
  'Giày Converse',
  'Phụ Kiện'
]
const availableBrands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'MLB', 'Bitis', 'Converse']
const availableGenders = ['Nam', 'Nữ']
const availableSizes = ['38', '39', '40', '41', '42', '43', '44']

const sortOptions = [
  { label: 'Phổ biến', value: 'popular' },
  { label: 'Mới Nhất', value: 'newest' },
  { label: 'Bán Chạy', value: 'best-seller' }
]

// Filters state
const filters = reactive({
  categories: [],
  brands: [],
  genders: [],
  priceFrom: null,
  priceTo: null,
  appliedPriceFrom: null,
  appliedPriceTo: null,
  sizes: [],
  sortBy: 'popular',
  priceSort: 'default'
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 8

// Mock products database
const products = ref(allProducts.filter(p => p.id >= 1 && p.id <= 9))

// Computed filtered products
const filteredProducts = computed(() => {
  let result = [...products.value]

  // Filter by category
  if (filters.categories.length > 0) {
    result = result.filter(p => {
      return filters.categories.some(cat => {
        if (cat === 'Giày Nike') {
          return p.brand?.toLowerCase() === 'nike' && (p.category === 'Giày Sneaker' || p.category === 'Giày Thể Thao')
        }
        if (cat === 'Giày Adidas') {
          return p.brand?.toLowerCase() === 'adidas' && (p.category === 'Giày Sneaker' || p.category === 'Giày Thể Thao')
        }
        if (cat === 'Giày New Balance') {
          return (p.brand?.toLowerCase() === 'new balance' || p.brand?.toLowerCase() === 'nb') && (p.category === 'Giày Sneaker' || p.category === 'Giày Thể Thao')
        }
        if (cat === 'Giày Puma') {
          return p.brand?.toLowerCase() === 'puma' && (p.category === 'Giày Sneaker' || p.category === 'Giày Thể Thao')
        }
        if (cat === 'Giày MLB') {
          return p.brand?.toLowerCase() === 'mlb' && (p.category === 'Giày Sneaker' || p.category === 'Giày Thể Thao')
        }
        if (cat === "Giày Biti's") {
          return (p.brand?.toLowerCase() === 'bitis' || p.brand?.toLowerCase() === "biti's") && (p.category === 'Giày Sneaker' || p.category === 'Giày Thể Thao')
        }
        if (cat === 'Giày Converse') {
          return p.brand?.toLowerCase() === 'converse' && (p.category === 'Giày Sneaker' || p.category === 'Giày Thể Thao')
        }

        if (cat === 'Phụ Kiện') {
          return p.category === 'Phụ Kiện' || p.category?.toLowerCase().includes('phụ kiện') || p.category?.toLowerCase().includes('accessories')
        }
        return p.category === cat
      })
    })
  }

  // Filter by brand
  if (filters.brands.length > 0) {
    result = result.filter(p => filters.brands.includes(p.brand))
  }

  // Filter by gender
  if (filters.genders.length > 0) {
    result = result.filter(p => filters.genders.includes(p.gender))
  }

  // Filter by size
  if (filters.sizes.length > 0) {
    result = result.filter(p => p.sizes.some(s => filters.sizes.includes(s)))
  }

  // Filter by price
  if (filters.appliedPriceFrom !== null) {
    result = result.filter(p => p.numericPrice >= filters.appliedPriceFrom)
  }
  if (filters.appliedPriceTo !== null) {
    result = result.filter(p => p.numericPrice <= filters.appliedPriceTo)
  }

  // Sorting metrics
  if (filters.sortBy === 'popular') {
    result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.reviews - a.reviews)
  } else if (filters.sortBy === 'newest') {
    result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id)
  } else if (filters.sortBy === 'best-seller') {
    result.sort((a, b) => b.soldCount - a.soldCount)
  }

  // Price ordering select dropdown
  if (filters.priceSort === 'low-to-high') {
    result.sort((a, b) => a.numericPrice - b.numericPrice)
  } else if (filters.priceSort === 'high-to-low') {
    result.sort((a, b) => b.numericPrice - a.numericPrice)
  }

  return result
})

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(startIndex, startIndex + itemsPerPage)
})

// Toggle specific size in filter array
function toggleSizeFilter(size) {
  const idx = filters.sizes.indexOf(size)
  if (idx >= 0) {
    filters.sizes.splice(idx, 1)
  } else {
    filters.sizes.push(size)
  }
  currentPage.value = 1
}

// Sorting buttons
function setSortBy(val) {
  filters.sortBy = val
  currentPage.value = 1
}

// Price filters trigger
function applyPriceFilter() {
  filters.appliedPriceFrom = filters.priceFrom
  filters.appliedPriceTo = filters.priceTo
  currentPage.value = 1
}

// Reset filters to defaults
function resetFilters() {
  filters.categories = []
  filters.brands = []
  filters.genders = []
  filters.priceFrom = null
  filters.priceTo = null
  filters.appliedPriceFrom = null
  filters.appliedPriceTo = null
  filters.sizes = []
  filters.sortBy = 'popular'
  filters.priceSort = 'default'
  currentPage.value = 1
}

// Event handlers
function handleAddToCart(product) {
  addToCart(product)
}

function handleWish(payload) {
  showToast(payload.wished ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

function applyQueryFilters() {
  const queryCategory = route.query.category
  if (queryCategory) {
    if (queryCategory === 'Giày Sneaker') {
      filters.categories = ['Giày Nike', 'Giày Adidas', 'Giày New Balance', 'Giày Puma', 'Giày MLB', "Giày Biti's", 'Giày Converse']
    } else if (availableCategories.includes(queryCategory)) {
      filters.categories = [queryCategory]
    } else {
      filters.categories = []
    }
  } else {
    filters.categories = []
  }

  const queryGender = route.query.gender
  if (queryGender && availableGenders.includes(queryGender)) {
    filters.genders = [queryGender]
  } else {
    filters.genders = []
  }

  const queryBrand = route.query.brand
  if (queryBrand && availableBrands.includes(queryBrand)) {
    filters.brands = [queryBrand]
  } else {
    filters.brands = []
  }
}

onMounted(() => {
  applyQueryFilters()
})

watch(() => route.query, () => {
  applyQueryFilters()
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
}
</style>
