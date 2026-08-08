<template>
  <div class="space-y-6 text-left">
    <!-- Page Header Title & Action Button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-bold text-slate-900 tracking-wide">Quản lý Bộ sưu tập (Collections)</h1>
        <p class="text-xs text-slate-400 mt-0.5">Tạo và biên tập các bộ sưu tập thời trang, Lookbooks xu hướng và chiến dịch truyền thông của SaigonShoes.</p>
      </div>
      <button 
        @click="openAddModal" 
        class="inline-flex items-center gap-2 bg-accent text-white px-5 py-3 rounded-xl text-sm font-semibold tracking-wide hover:bg-accent-hover transition-all active:scale-[0.98] shadow-lg shadow-accent/20 cursor-pointer border-none"
      >
        <i class="ti ti-plus text-lg"></i> Thêm bộ sưu tập mới
      </button>
    </div>

    <!-- Statistics Cards Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <!-- Total Collections -->
      <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs relative overflow-hidden group">
        <div class="absolute right-4 top-4 text-slate-100 group-hover:text-accent/10 transition-colors duration-300">
          <i class="ti ti-layout-grid text-5xl"></i>
        </div>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng số BST</p>
        <p class="text-2xl font-bold text-slate-800 mt-2">{{ statTotal }}</p>
        <p class="text-[10px] text-slate-400 mt-1">Hệ thống bộ sưu tập</p>
      </div>

      <!-- Published Collections -->
      <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs relative overflow-hidden group">
        <div class="absolute right-4 top-4 text-slate-100 group-hover:text-emerald-500/10 transition-colors duration-300">
          <i class="ti ti-circle-check text-5xl"></i>
        </div>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang công khai</p>
        <p class="text-2xl font-bold mt-2 text-emerald-600">{{ statPublished }}</p>
        <p class="text-[10px] text-emerald-500 mt-1 flex items-center gap-1">
          <i class="ti ti-eye"></i> Hiển thị trên Website
        </p>
      </div>

      <!-- Featured Collections -->
      <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs relative overflow-hidden group">
        <div class="absolute right-4 top-4 text-slate-100 group-hover:text-amber-500/10 transition-colors duration-300">
          <i class="ti ti-star-filled text-5xl"></i>
        </div>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">BST Nổi bật</p>
        <p class="text-2xl font-bold mt-2 text-amber-600">{{ statFeatured }}</p>
        <p class="text-[10px] text-slate-400 mt-1">Xuất hiện tại Trang chủ</p>
      </div>

      <!-- Total Linked Products -->
      <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs relative overflow-hidden group">
        <div class="absolute right-4 top-4 text-slate-100 group-hover:text-blue-500/10 transition-colors duration-300">
          <i class="ti ti-shirt text-5xl"></i>
        </div>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Sản phẩm gán vào BST</p>
        <p class="text-2xl font-bold mt-2 text-blue-600">{{ statTotalLinkedProducts }}</p>
        <p class="text-[10px] text-slate-400 mt-1">Liên kết biến thể sản phẩm</p>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Search Input -->
      <div class="relative w-full md:w-80">
        <i class="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Tìm kiếm bộ sưu tập..." 
          class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-semibold"
        >
      </div>

      <!-- Status Filter -->
      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <select 
          v-model="filterStatus" 
          class="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-700 outline-none cursor-pointer focus:border-accent transition-colors font-semibold"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="published">Đang công khai</option>
          <option value="draft">Bản nháp (Ẩn)</option>
        </select>
      </div>
    </div>

    <!-- Main Collections Table Card -->
    <div class="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              <th class="py-4 px-6">BANNER / BỘ SƯU TẬP</th>
              <th class="py-4 px-6">SẢN PHẨM GÁN VÀO</th>
              <th class="py-4 px-6">NỔI BẬT</th>
              <th class="py-4 px-6">TRẠNG THÁI</th>
              <th class="py-4 px-6 text-right">THAO TÁC</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-xs">
            <tr 
              v-for="item in filteredCollections" 
              :key="item.id" 
              class="hover:bg-slate-50/75 transition-colors border-b border-slate-100 text-slate-600 font-medium"
            >
              <!-- Banner & Name -->
              <td class="py-4 px-6 font-semibold text-slate-800 max-w-72">
                <div class="flex items-center gap-3.5">
                  <div class="h-14 w-24 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                    <img :src="getBannerUrl(item.banner)" alt="Banner" class="h-full w-full object-cover">
                  </div>
                  <div>
                    <span class="font-bold text-slate-900 hover:text-accent cursor-pointer transition-colors block text-sm">{{ item.name }}</span>
                    <span class="text-[10px] text-slate-400 font-mono block">slug: {{ item.slug }}</span>
                  </div>
                </div>
              </td>

              <!-- Products Count & Preview Badges -->
              <td class="py-4 px-6 text-left">
                <div class="space-y-1">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                    <i class="ti ti-shirt text-slate-500"></i> {{ item.products ? item.products.length : 0 }} sản phẩm
                  </span>
                  <div v-if="item.products && item.products.length > 0" class="flex flex-wrap gap-1 max-w-xs">
                    <span 
                      v-for="p in item.products.slice(0, 3)" 
                      :key="p.id"
                      class="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded truncate max-w-[110px]"
                    >
                      {{ p.name }}
                    </span>
                    <span v-if="item.products.length > 3" class="text-[10px] text-slate-400 font-bold px-1">
                      +{{ item.products.length - 3 }} nữa
                    </span>
                  </div>
                </div>
              </td>

              <!-- Featured Toggle -->
              <td class="py-4 px-6 text-left">
                <button 
                  @click="handleToggleFeatured(item)"
                  :class="[
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-all border-none shadow-2xs',
                    item.is_featured 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  ]"
                >
                  <i :class="['ti text-xs', item.is_featured ? 'ti-star-filled text-amber-500' : 'ti-star']"></i>
                  <span>{{ item.is_featured ? 'Nổi bật' : 'Thường' }}</span>
                </button>
              </td>

              <!-- Status Badge -->
              <td class="py-4 px-6 text-left">
                <button 
                  @click="handleToggleStatus(item)"
                  class="border-none bg-transparent cursor-pointer"
                >
                  <span 
                    v-if="item.status === 'published'" 
                    class="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Đang công khai
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>Bản nháp (Ẩn)
                  </span>
                </button>
              </td>

              <!-- Actions -->
              <td class="py-4 px-6 text-right">
                <div class="flex items-center gap-2 justify-end">
                  <button 
                    @click="openEditModal(item)"
                    class="px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                  >
                    Chỉnh sửa
                  </button>
                  <button 
                    @click="handleDelete(item.id)" 
                    class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                    title="Xóa bộ sưu tập"
                  >
                    <i class="ti ti-trash text-base"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredCollections.length === 0">
              <td colspan="5" class="text-center py-16">
                <i class="ti ti-layout-grid text-5xl text-slate-200 block mb-3 animate-pulse"></i>
                <p class="text-sm font-semibold text-slate-800">Chưa có bộ sưu tập nào</p>
                <p class="text-xs text-slate-400 mt-1">Bấm nút "Thêm bộ sưu tập mới" ở góc trên để bắt đầu tạo BST.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Slide-over / Modal for Creating or Editing Collection -->
    <div 
      v-if="modalOpen" 
      class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick"
    >
      <!-- Backdrop -->
      <div @click="closeModal" class="absolute inset-0 bg-slate-950/45 backdrop-blur-xs"></div>
      
      <!-- Modal Container -->
      <div class="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <header class="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-900 tracking-wide">
              {{ isEditMode ? 'Chỉnh sửa Bộ sưu tập 🖼️' : 'Tạo Bộ sưu tập mới 🖼️' }}
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">Thiết lập các thông tin truyền thông, banner, bài viết SEO và gán danh sách sản phẩm.</p>
          </div>
          <button @click="closeModal" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer">
            <i class="ti ti-x text-lg"></i>
          </button>
        </header>
        
        <form @submit.prevent="saveCollection" class="flex-1 overflow-y-auto p-6 space-y-5">
          <!-- Name Input -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Tên Bộ Sưu Tập <span class="text-accent">*</span>
            </label>
            <input 
              type="text" 
              v-model="formCollection.name" 
              required 
              placeholder="VD: Summer Collection 2026, Lookbook Future Walk..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-semibold"
            >
          </div>

          <!-- Banner Image Upload & URL -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Ảnh Banner Bộ Sưu Tập (URL hoặc Tải từ máy) <span class="text-accent">*</span>
            </label>
            <div class="space-y-3">
              <!-- Banner Preview -->
              <div v-if="formCollection.banner" class="h-40 w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group">
                <img :src="getBannerUrl(formCollection.banner)" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="text-xs font-bold text-white bg-black/50 px-3 py-1.5 rounded-lg">Xem trước Banner</span>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <input 
                  type="text" 
                  v-model="formCollection.banner" 
                  required 
                  placeholder="Nhập đường dẫn URL ảnh banner..." 
                  class="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-medium"
                >
                <input type="file" ref="bannerFileInput" @change="onBannerFileSelected" accept="image/*" class="hidden">
                <button 
                  type="button" 
                  @click="triggerBannerFileInput" 
                  class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl transition-all border-none cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <i class="ti ti-upload text-sm"></i> Tải ảnh từ máy
                </button>
              </div>
            </div>
          </div>

          <!-- Excerpt -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tóm tắt ngắn (Excerpt)</label>
            <textarea 
              v-model="formCollection.excerpt" 
              rows="2" 
              placeholder="Tóm tắt ngắn 1-2 câu giới thiệu bộ sưu tập này..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all resize-none font-medium"
            ></textarea>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Mô tả chi tiết Bộ Sưu Tập
            </label>
            <textarea 
              v-model="formCollection.description" 
              rows="3" 
              placeholder="Nhập mô tả giới thiệu bộ sưu tập này..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all resize-none font-medium"
            ></textarea>
          </div>

          <!-- Product Selector (Assign Products to Collection) -->
          <div class="space-y-3 pt-2">
            <div class="flex items-center justify-between">
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <i class="ti ti-shirt text-accent text-sm"></i> 
                Chọn sản phẩm gán vào Bộ Sưu Tập này ({{ formCollection.product_ids.length }} sản phẩm đã chọn)
              </label>
              <span class="text-[11px] text-slate-400 font-semibold">Tích chọn để nhúng sản phẩm vào BST</span>
            </div>

            <!-- Product Filter inside Modal -->
            <div class="relative">
              <i class="ti ti-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input 
                type="text" 
                v-model="productSearchQuery" 
                placeholder="Tìm kiếm sản phẩm để gắn..." 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all"
              >
            </div>

            <!-- Selectable Products Grid -->
            <div class="border border-slate-200 rounded-2xl max-h-60 overflow-y-auto p-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50/50">
              <div 
                v-for="p in selectableProducts" 
                :key="p.id"
                @click="toggleSelectProduct(p.id)"
                :class="[
                  'p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all select-none',
                  formCollection.product_ids.includes(p.id)
                    ? 'bg-orange-50/90 border-accent/70 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                ]"
              >
                <input 
                  type="checkbox" 
                  :checked="formCollection.product_ids.includes(p.id)"
                  class="h-4 w-4 text-accent border-slate-300 rounded focus:ring-accent cursor-pointer shrink-0"
                  @click.stop
                  @change="toggleSelectProduct(p.id)"
                >
                <div class="h-10 w-10 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200 p-0.5">
                  <img :src="getProductImageUrl(p.image)" class="w-full h-full object-contain">
                </div>
                <div class="flex-1 min-w-0 text-left">
                  <span class="text-xs font-bold text-slate-800 block truncate">{{ p.name }}</span>
                  <span class="text-[10px] text-slate-400 font-medium block">{{ p.categoryName || 'Giày Sneaker' }}</span>
                </div>
              </div>

              <div v-if="selectableProducts.length === 0" class="col-span-full text-center py-6 text-xs text-slate-400">
                Không tìm thấy sản phẩm nào phù hợp.
              </div>
            </div>
          </div>

          <!-- Featured & Status Toggles -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <!-- Is Featured Checkbox -->
            <div class="flex items-center gap-2.5 p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-xl">
              <input 
                type="checkbox" 
                id="collection_featured_cb"
                v-model="formCollection.is_featured" 
                class="w-4 h-4 text-accent border-slate-300 rounded focus:ring-accent cursor-pointer"
              >
              <label for="collection_featured_cb" class="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5 select-none">
                <i class="ti ti-star-filled text-amber-500"></i> Đặt làm Bộ Sưu Tập Nổi Bật
              </label>
            </div>

            <!-- Status Dropdown -->
            <div>
              <select 
                v-model="formCollection.status" 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 font-semibold outline-none cursor-pointer focus:border-accent transition-all"
              >
                <option value="published">Đang Công Khai (Hiển thị FE)</option>
                <option value="draft">Bản nháp (Ẩn)</option>
              </select>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
            <button 
              type="button" 
              @click="closeModal" 
              class="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              class="px-6 py-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover text-xs font-bold transition-colors cursor-pointer border-none shadow-md shadow-accent/20"
            >
              Lưu Bộ Sưu Tập
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const searchQuery = ref('')
const filterStatus = ref('all')

const collections = ref([])
const availableProducts = ref([])
const productSearchQuery = ref('')

const modalOpen = ref(false)
const isEditMode = ref(false)

const bannerFileInput = ref(null)
const selectedBannerFile = ref(null)

const formCollection = ref({
  id: '',
  name: '',
  banner: 'news_featured.png',
  excerpt: '',
  description: '',
  status: 'published',
  is_featured: false,
  product_ids: []
})

// Statistics Computations
const statTotal = computed(() => collections.value.length)
const statPublished = computed(() => collections.value.filter(c => c.status === 'published').length)
const statFeatured = computed(() => collections.value.filter(c => c.is_featured).length)
const statTotalLinkedProducts = computed(() => {
  return collections.value.reduce((sum, c) => sum + (c.products ? c.products.length : 0), 0)
})

// Filtered Collections
const filteredCollections = computed(() => {
  return collections.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          (c.excerpt && c.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesStatus = filterStatus.value === 'all' || c.status === filterStatus.value

    return matchesSearch && matchesStatus
  })
})

// Selectable Products for modal
const selectableProducts = computed(() => {
  if (!productSearchQuery.value) return availableProducts.value
  const query = productSearchQuery.value.toLowerCase()
  return availableProducts.value.filter(p => p.name.toLowerCase().includes(query))
})

function getBannerUrl(bannerPath) {
  if (!bannerPath) return '/images/news_featured.png'
  if (bannerPath.startsWith('http://') || bannerPath.startsWith('https://') || bannerPath.startsWith('data:')) {
    return bannerPath
  }
  if (bannerPath.startsWith('/images/')) {
    return bannerPath
  }
  if (bannerPath.startsWith('images/')) {
    return `/${bannerPath}`
  }
  if (bannerPath.startsWith('/uploads/') || bannerPath.startsWith('uploads/')) {
    const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
    const cleanPath = bannerPath.startsWith('/') ? bannerPath : `/${bannerPath}`
    return `${serverUrl}${cleanPath}`
  }
  return `/images/${bannerPath}`
}

function getProductImageUrl(imagePath) {
  if (!imagePath) return '/images/placeholder.png'
  if (typeof imagePath === 'object') {
    if (Array.isArray(imagePath) && imagePath.length > 0) imagePath = imagePath[0]
  }
  if (typeof imagePath !== 'string') return '/images/placeholder.png'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath
  }
  if (imagePath.startsWith('/images/')) return imagePath
  if (imagePath.startsWith('images/')) return `/${imagePath}`
  if (imagePath.startsWith('/uploads/') || imagePath.startsWith('uploads/')) {
    const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    return `${serverUrl}${cleanPath}`
  }
  return `/images/${imagePath}`
}

function triggerBannerFileInput() {
  if (bannerFileInput.value) bannerFileInput.value.click()
}

function onBannerFileSelected(event) {
  const file = event.target.files?.[0]
  if (file) {
    selectedBannerFile.value = file
    formCollection.value.banner = URL.createObjectURL(file)
  }
}

function toggleSelectProduct(productId) {
  const index = formCollection.value.product_ids.indexOf(productId)
  if (index > -1) {
    formCollection.value.product_ids.splice(index, 1)
  } else {
    formCollection.value.product_ids.push(productId)
  }
}

async function fetchCollections() {
  try {
    const res = await axiosInstance.get('/admin/collections')
    if (res) {
      if (Array.isArray(res.data)) {
        collections.value = res.data
      } else if (Array.isArray(res)) {
        collections.value = res
      } else if (res.data && Array.isArray(res.data.data)) {
        collections.value = res.data.data
      }
    }
  } catch (err) {
    console.error('Fetch collections error:', err)
  }
}

async function fetchProducts() {
  try {
    const res = await axiosInstance.get('/adminproduct')
    if (res && res.data) {
      const rawProducts = Array.isArray(res.data) ? res.data : (res.data.data || [])
      availableProducts.value = rawProducts.map(p => {
        let img = ''
        if (p.image_urls && Array.isArray(p.image_urls) && p.image_urls.length > 0) {
          img = p.image_urls[0]
        } else if (Array.isArray(p.images) && p.images.length > 0) {
          img = p.images[0]
        } else if (typeof p.images === 'string') {
          try {
            const parsed = JSON.parse(p.images)
            img = Array.isArray(parsed) ? parsed[0] : parsed
          } catch (e) {
            img = p.images
          }
        } else {
          img = p.image || ''
        }

        let catName = 'Giày Sneaker'
        if (typeof p.category === 'object' && p.category !== null) {
          catName = p.category.name || 'Giày Sneaker'
        } else if (typeof p.category === 'string') {
          catName = p.category
        }

        return {
          id: p.id,
          name: p.name,
          image: img,
          categoryName: catName
        }
      })
    }
  } catch (err) {
    console.error('Fetch products error:', err)
  }
}

onMounted(() => {
  fetchCollections()
  fetchProducts()
})

function openAddModal() {
  isEditMode.value = false
  selectedBannerFile.value = null
  productSearchQuery.value = ''
  formCollection.value = {
    id: '',
    name: '',
    banner: 'news_featured.png',
    excerpt: '',
    description: '',
    status: 'published',
    is_featured: false,
    product_ids: []
  }
  modalOpen.value = true
}

function openEditModal(item) {
  isEditMode.value = true
  selectedBannerFile.value = null
  productSearchQuery.value = ''
  const linkedProductIds = item.products ? item.products.map(p => p.id) : []
  formCollection.value = {
    id: item.id,
    name: item.name,
    banner: item.banner,
    excerpt: item.excerpt || '',
    description: item.description || '',
    status: item.status || 'published',
    is_featured: item.is_featured || false,
    product_ids: linkedProductIds
  }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveCollection() {
  let finalBanner = formCollection.value.banner

  if (selectedBannerFile.value) {
    try {
      const formData = new FormData()
      formData.append('image', selectedBannerFile.value)
      const uploadRes = await axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (uploadRes && uploadRes.data && uploadRes.data.path) {
        finalBanner = uploadRes.data.path
      }
    } catch (e) {
      console.error('Banner upload failed:', e)
    }
  }

  const payload = {
    name: formCollection.value.name,
    banner: finalBanner,
    excerpt: formCollection.value.excerpt,
    description: formCollection.value.description,
    status: formCollection.value.status,
    is_featured: formCollection.value.is_featured,
    product_ids: formCollection.value.product_ids
  }

  try {
    if (isEditMode.value) {
      await axiosInstance.post(`/admin/collections/${formCollection.value.id}`, payload)
      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật Bộ sưu tập!',
        confirmButtonColor: '#FF4D00'
      })
    } else {
      await axiosInstance.post('/admin/collections', payload)
      Swal.fire({
        icon: 'success',
        title: 'Đã tạo Bộ sưu tập mới!',
        confirmButtonColor: '#FF4D00'
      })
    }
    await fetchCollections()
    modalOpen.value = false
  } catch (err) {
    console.error('Save collection error:', err)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi lưu thông tin',
      text: err.response?.data?.message || 'Có lỗi xảy ra khi lưu bộ sưu tập',
      confirmButtonColor: '#FF4D00'
    })
  }
}

async function handleToggleStatus(item) {
  try {
    await axiosInstance.patch(`/admin/collections/${item.id}/toggle`)
    await fetchCollections()
  } catch (err) {
    console.error('Toggle status error:', err)
  }
}

async function handleToggleFeatured(item) {
  try {
    await axiosInstance.patch(`/admin/collections/${item.id}/toggle-featured`)
    await fetchCollections()
  } catch (err) {
    console.error('Toggle featured error:', err)
  }
}

function handleDelete(id) {
  Swal.fire({
    title: 'Xác nhận xóa Bộ sưu tập?',
    text: 'Hành động này không thể khôi phục lại!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/admin/collections/${id}`)
        Swal.fire({
          icon: 'success',
          title: 'Đã xóa Bộ sưu tập!',
          confirmButtonColor: '#FF4D00'
        })
        await fetchCollections()
      } catch (err) {
        console.error('Delete collection error:', err)
      }
    }
  })
}
</script>

<style scoped>
.animate-fade-in-quick {
  animation: fadeInQuick 0.2s ease-out;
}

@keyframes fadeInQuick {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
