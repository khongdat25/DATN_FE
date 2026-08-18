<template>
  
    <!-- Đường dẫn trang (Breadcrumbs) -->
    <div class="bg-surface2 py-4 border-b border-border">
      <div class="max-w-[1200px] mx-auto px-5 flex items-center gap-2 text-[12px] text-text-muted">
        <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <router-link to="/products" class="hover:text-accent transition-colors">Sản phẩm</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <span class="text-text font-semibold">Tất cả sản phẩm</span>
      </div>
    </div>

    <!-- Nội dung chính -->
    <main class="py-12 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5 flex flex-col lg:flex-row gap-8">
        
        <!-- Thanh bộ lọc bên cạnh -->
        <aside class="w-full lg:w-[260px] shrink-0 flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h3 class="text-[15px] font-display font-bold flex items-center gap-2 uppercase tracking-widest text-text">
              <i class="ti ti-filter text-accent text-lg"></i> Bộ lọc
            </h3>
            <button @click="resetFilters" class="text-[12px] text-accent font-semibold hover:underline cursor-pointer">
              Xóa tất cả
            </button>
          </div>

          <!-- Bộ lọc thương hiệu -->
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

          <!-- Bộ lọc danh mục -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('category')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Danh Mục</p>
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

          <!-- Bộ lọc bộ sưu tập -->
          <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
            <div @click="toggleSection('collection')" class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 select-none">
              <p class="text-[12px] font-display font-bold uppercase tracking-wider text-text">Bộ Sưu Tập</p>
              <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeSections.collection ? 'ti-chevron-up' : 'ti-chevron-down']"></i>
            </div>
            <div v-show="activeSections.collection" class="px-4 pb-4">
              <div class="flex flex-col gap-3">
                <div v-if="availableCollections.length === 0" class="text-xs text-text-dim italic">Chưa có BST nào</div>
                <label v-for="col in availableCollections" :key="col.id" class="flex items-center gap-3 cursor-pointer group select-none">
                  <input type="checkbox" v-model="filters.collections" :value="col.id" class="w-4 h-4 rounded border-border-light text-accent accent-accent cursor-pointer">
                  <span :class="['text-[13px] transition-colors group-hover:text-accent', filters.collections.includes(col.id) ? 'text-accent font-semibold' : 'text-text-muted']">
                    {{ col.name }}
                  </span>
                </label>
              </div>
            </div>
          </div>



          <!-- Bộ lọc khoảng giá -->
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

          <!-- Bộ lọc kích thước -->
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

        <!-- Danh sách sản phẩm & Sắp xếp -->
        <div class="flex-1 min-w-0">

          <!-- Thanh công cụ sắp xếp -->
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
              <span v-if="searchQuery" class="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-lg">
                Từ khóa: "{{ searchQuery }}"
                <button @click="clearSearch" title="Xóa từ khóa tìm kiếm" class="hover:text-red-500 cursor-pointer border-none bg-transparent flex items-center p-0"><i class="ti ti-x text-xs"></i></button>
              </span>
              <span class="text-[13px] text-text-muted">Có <strong>{{ filteredProducts.length }}</strong> sản phẩm</span>
              <select v-model="filters.priceSort" class="bg-surface2 border border-border rounded-xl py-1.5 px-3 text-[12px] text-text-muted outline-none focus:border-accent cursor-pointer transition-colors">
                <option value="default">Giá: Mặc định</option>
                <option value="low-to-high">Giá: Thấp → Cao</option>
                <option value="high-to-low">Giá: Cao → Thấp</option>
              </select>
            </div>
          </div>

          <!-- Lưới sản phẩm & Trạng thái tải -->
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
          
          <!-- Trạng thái trống -->
          <div v-else class="text-center py-20 bg-white border border-border rounded-2xl shadow-sm">
            <i class="ti ti-mood-empty text-[60px] text-text-dim block mb-4"></i>
            <h4 class="text-lg font-bold text-text mb-2">Không tìm thấy sản phẩm nào</h4>
            <p class="text-text-muted text-sm mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn xem sao.</p>
            <button @click="resetFilters" class="bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-semibold tracking-wide hover:bg-accent-hover transition-colors active:scale-95 cursor-pointer">
              Xóa bộ lọc
            </button>
          </div>

          <!-- Phân trang -->
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

// Đóng/mở các mục bộ lọc
const activeSections = reactive({
  category: true,
  collection: true,
  brand: true,
  price: true,
  size: true
})
function toggleSection(section) { activeSections[section] = !activeSections[section] }

// Danh mục, bộ sưu tập được tải từ API, thương hiệu và kích thước tĩnh
const availableCategories = ref([])
const availableCollections = ref([])
const availableBrands = ref([])
const availableSizes = ['38', '39', '40', '41', '42', '43', '44']

const sortOptions = [
  { label: 'Phổ biến', value: 'popular' },
  { label: 'Mới Nhất', value: 'newest' },
  { label: 'Bán Chạy', value: 'best-seller' }
]

// Tìm kiếm
const searchQuery = ref('')
let debounceTimer = null

// Trạng thái lưu bộ lọc
const filters = reactive({
  categories: [],
  collections: [],
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

// --- Các hàm gọi API ---
async function fetchCategories() {
  try {
    const res = await axiosInstance.get('/getcategories')
    if (res?.success && Array.isArray(res?.data)) {
      availableCategories.value = res.data
    }
  } catch (e) {
    console.error('Không thể lấy danh mục:', e)
  }
}

async function fetchCollections() {
  try {
    const res = await axiosInstance.get('/collections')
    if (res) {
      const list = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : [])
      availableCollections.value = list
    }
  } catch (e) {
    console.error('Không thể lấy bộ sưu tập:', e)
  }
}

async function fetchBrands() {
  try {
    const res = await axiosInstance.get('/getbrands')
    if (res?.success && Array.isArray(res?.data)) {
      availableBrands.value = res.data
    }
  } catch (e) {
    console.error('Không thể lấy thương hiệu:', e)
  }
}

async function fetchProducts() {
  isLoading.value = true
  try {
    // 0. Nếu có Bộ sưu tập được chọn trong filters
    if (filters.collections.length > 0) {
      try {
        const colPromises = filters.collections.map(id => axiosInstance.get(`/collections/${id}`))
        const colResponses = await Promise.all(colPromises)
        let colProducts = []
        for (const res of colResponses) {
          const rawCol = res?.data || res
          const colData = rawCol?.data || rawCol
          if (colData && Array.isArray(colData.products)) {
            colProducts.push(...colData.products)
          }
        }
        const uniqueProducts = Array.from(new Map(colProducts.map(p => [p.id, p])).values())
        products.value = uniqueProducts.map(mapBackendProduct)
        isLoading.value = false
        return
      } catch (e) {
        console.error('Không thể tải bộ sưu tập:', e)
      }
    }

    const params = {}

    // Tìm kiếm từ khóa (phía máy chủ)
    if (searchQuery.value.trim()) params.q = searchQuery.value.trim()

    // Lọc danh mục: Tra cứu ID từ danh mục đã tải
    if (filters.categories.length > 0) {
      const cat = availableCategories.value.find(c => 
        filters.categories.includes(c.name) || 
        filters.categories.some(sel => c.name.toLowerCase().includes(sel.toLowerCase()) || sel.toLowerCase().includes(c.name.toLowerCase()))
      )
      if (cat?.id) {
        params.category_id = cat.id
      } else if (!params.q) {
        params.q = filters.categories[0]
      }
    }

    // Lọc thương hiệu: Tra cứu ID từ thương hiệu đã tải
    if (filters.brands.length > 0) {
      const brand = availableBrands.value.find(b => 
        filters.brands.includes(b.name) ||
        filters.brands.some(sel => b.name.toLowerCase() === sel.toLowerCase())
      )
      if (brand?.id) {
        params.brand_id = brand.id
      }
    }

    // Lọc giá (phía máy chủ)
    if (filters.appliedPriceFrom !== null) params.min_price = filters.appliedPriceFrom
    if (filters.appliedPriceTo !== null) params.max_price = filters.appliedPriceTo

    // Sắp xếp (phía máy chủ)
    if (filters.priceSort === 'low-to-high') params.sort = 'price_asc'
    else if (filters.priceSort === 'high-to-low') params.sort = 'price_desc'
    else if (filters.sortBy === 'best-seller') params.sort = 'sold_desc'
    else if (filters.sortBy === 'newest') params.sort = 'newest'
    else params.sort = 'sold_desc' // mặc định phổ biến

    const res = await axiosInstance.get('/search', { params })
    let searchResults = []
    if (res?.success && Array.isArray(res?.data)) {
      searchResults = res.data.map(mapBackendProduct)
    }

    // Nếu tìm kiếm cụm từ ghép (VD: "nike panda") mà API không trả kết quả do tìm cụm từ chính xác,
    // tự động fallback tìm theo từ khóa chính rồi lọc đa từ phía client
    const rawQuery = searchQuery.value.trim()
    if (searchResults.length === 0 && rawQuery.includes(' ')) {
      const words = rawQuery.split(/\s+/).filter(Boolean)
      const fallbackParams = { ...params, q: words[0] }
      try {
        const fallbackRes = await axiosInstance.get('/search', { params: fallbackParams })
        if (fallbackRes?.success && Array.isArray(fallbackRes?.data)) {
          searchResults = fallbackRes.data.map(mapBackendProduct)
        }
      } catch (e) {
        console.error('Fallback search error:', e)
      }
    }

    products.value = searchResults
  } catch (error) {
    console.error('Không thể lấy danh sách sản phẩm:', error)
  } finally {
    isLoading.value = false
  }
}

// Hàm xử lý tìm kiếm có thời gian chờ (debounce)
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
  if (route.query.q) {
    const newQuery = { ...route.query }
    delete newQuery.q
    router.push({ path: '/products', query: newQuery })
  } else {
    fetchProducts()
  }
}

// --- Thuộc tính tính toán: Lọc đa từ khóa (Multi-word Tokenized Matching) + Thương hiệu + Size ---
const filteredProducts = computed(() => {
  let result = [...products.value]

  // Tách từ khóa và kiểm tra sản phẩm phải chứa TẤT CẢ các từ (không phụ thuộc thứ tự)
  if (searchQuery.value.trim()) {
    const keywords = searchQuery.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
    result = result.filter(p => {
      const fullText = [
        p.name || '',
        p.brand || '',
        p.category || '',
        p.gender || '',
        ...(p.specs || []).map(s => s.value || '')
      ].join(' ').toLowerCase()

      return keywords.every(kw => fullText.includes(kw))
    })
  }

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

// --- Thao tác bộ lọc ---
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
  filters.collections = []
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
  // Chuyển hướng bằng slug (backend dùng slug thay vì id số)
  router.push({ name: 'product-detail', params: { id: product.slug || product.id } })
}

function applyQueryFilters() {
  // 1. Category
  const queryCategory = route.query.category
  if (queryCategory) {
    const foundCat = availableCategories.value.find(c => 
      c.name.toLowerCase().trim() === queryCategory.toLowerCase().trim() ||
      c.name.toLowerCase().includes(queryCategory.toLowerCase().trim()) ||
      queryCategory.toLowerCase().includes(c.name.toLowerCase().trim())
    )
    if (foundCat) {
      filters.categories = [foundCat.name]
    } else {
      filters.categories = [queryCategory]
    }
  } else {
    filters.categories = []
  }

  // 2. Collection
  const queryCollection = route.query.collection
  if (queryCollection) {
    const colId = Number(queryCollection) || queryCollection
    const foundCol = availableCollections.value.find(c => String(c.id) === String(colId) || c.slug === colId)
    if (foundCol) {
      filters.collections = [foundCol.id]
    } else {
      filters.collections = [colId]
    }
  } else {
    filters.collections = []
  }

  // 3. Brand
  const queryBrand = route.query.brand
  if (queryBrand) {
    const foundBrand = availableBrands.value.find(b => b.name.toLowerCase().trim() === queryBrand.toLowerCase().trim())
    if (foundBrand) {
      filters.brands = [foundBrand.name]
    } else {
      filters.brands = [queryBrand]
    }
  } else {
    filters.brands = []
  }

  // 4. Min/Max Price
  if (route.query.min_price !== undefined) {
    filters.priceFrom = Number(route.query.min_price)
    filters.appliedPriceFrom = Number(route.query.min_price)
  } else {
    filters.priceFrom = null
    filters.appliedPriceFrom = null
  }

  if (route.query.max_price !== undefined) {
    filters.priceTo = Number(route.query.max_price)
    filters.appliedPriceTo = Number(route.query.max_price)
  } else {
    filters.priceTo = null
    filters.appliedPriceTo = null
  }

  // 5. Sort
  if (route.query.sort) {
    if (route.query.sort === 'newest') {
      filters.sortBy = 'newest'
      filters.priceSort = 'default'
    } else if (route.query.sort === 'sold_desc') {
      filters.sortBy = 'best-seller'
      filters.priceSort = 'default'
    } else if (route.query.sort === 'price_asc') {
      filters.priceSort = 'low-to-high'
    } else if (route.query.sort === 'price_desc') {
      filters.priceSort = 'high-to-low'
    }
  } else {
    filters.sortBy = 'popular'
    filters.priceSort = 'default'
  }

  // 6. Search Query
  const querySearch = route.query.q
  if (querySearch) {
    searchQuery.value = querySearch
  } else {
    searchQuery.value = ''
  }
}

let isMounted = false

// Theo dõi thay đổi bộ lọc phía máy chủ → tải lại dữ liệu
watch(
  [() => filters.sortBy, () => filters.priceSort, () => filters.categories, () => filters.collections,
   () => filters.appliedPriceFrom, () => filters.appliedPriceTo],
  () => {
    if (!isMounted) return
    currentPage.value = 1
    fetchProducts()
  }
)

watch(() => route.query, () => { 
  applyQueryFilters() 
  fetchProducts()
}, { deep: true })

onMounted(async () => {
  await Promise.all([fetchCategories(), fetchBrands(), fetchCollections()])
  applyQueryFilters()
  await fetchProducts()
  isMounted = true
})
</script>

<style scoped>
/* Ẩn mũi tên nhập số trên Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Ẩn thanh cuộn nhập số trên Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
