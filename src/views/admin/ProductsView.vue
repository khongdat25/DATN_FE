<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Danh sách Sản phẩm 👟</h1>
          <p class="text-sm text-slate-500 mt-1">Quản lý kho sản phẩm, thiết lập giá bán và kiểm soát biến thể kích cỡ chi tiết.</p>
        </div>
        <div>
          <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
            <i class="ti ti-plus text-base"></i> Thêm sản phẩm mới
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search -->
        <div class="relative w-full md:w-80 text-slate-400 focus-within:text-accent">
          <i class="ti ti-search absolute left-3.5 top-1/2 -translate-y-1/2 text-base"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tìm tên sản phẩm, mã..." 
            class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800"
          >
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <select v-model="filterCategory" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2.5 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="all">Tất cả danh mục</option>
            <option v-for="cat in categoriesList" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
          </select>

          <select v-model="filterBrand" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2.5 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="all">Tất cả thương hiệu</option>
            <option v-for="br in brandsList" :key="br.id" :value="br.name">{{ br.name }}</option>
          </select>

          <select v-model="filterStatus" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2.5 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="all">Mọi trạng thái</option>
            <option value="active">Đang bán (Active)</option>
            <option value="out_of_stock">Hết hàng (Out of stock)</option>
          </select>
        </div>
      </div>

      <!-- Product Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="py-4 px-6 w-10"></th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ẢNH / TÊN</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">THƯƠNG HIỆU</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">DANH MỤC</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHO BIẾN THỂ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHOẢNG GIÁ VÉ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
                <th class="py-4 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <template v-for="product in filteredProducts" :key="product.id">
                <!-- Main Product Row -->
                <tr 
                  @click="toggleRow(product.id)" 
                  class="hover:bg-slate-50/30 transition-all cursor-pointer font-medium"
                >
                  <td class="py-4 px-6 text-center text-slate-400">
                    <i 
                      :class="[
                        'ti ti-chevron-right text-base transition-transform duration-200 block',
                        expandedRows.includes(product.id) ? 'rotate-90' : ''
                      ]"
                    ></i>
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                        <img :src="product.image" alt="Pro" class="max-w-full max-h-full object-contain">
                      </div>
                      <div class="text-left">
                        <span class="block text-xs font-bold text-slate-900 hover:text-accent">{{ product.name }}</span>
                        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">SKU: {{ product.sku }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 text-xs text-slate-700 text-left">{{ product.brand }}</td>
                  <td class="py-4 px-6 text-xs text-slate-700 text-left">{{ product.category }}</td>
                  <td class="py-4 px-6 text-xs text-left">
                    <span class="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {{ product.variants.length }} Biến thể (Tổng {{ getTotalStock(product) }} đôi)
                    </span>
                  </td>
                  <td class="py-4 px-6 text-xs font-bold text-slate-900 text-left">
                    {{ getPriceRange(product) }}
                  </td>
                  <td class="py-4 px-6 text-left">
                    <span 
                      v-if="getTotalStock(product) > 0"
                      class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    >
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đang bán
                    </span>
                    <span 
                      v-else
                      class="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    >
                      <span class="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Hết hàng
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right" @click.stop>
                    <div class="flex items-center gap-2 justify-end">
                      <button 
                        @click="openEditModal(product)" 
                        class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                      >
                        <i class="ti ti-edit text-xs"></i> Chỉnh sửa
                      </button>
                      <button 
                        @click="deleteProduct(product.id)" 
                        class="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center border-none transition-all cursor-pointer"
                      >
                        <i class="ti ti-trash text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- Expanded Variants Row -->
                <tr v-if="expandedRows.includes(product.id)" class="bg-slate-50/60 transition-all">
                  <td colspan="8" class="p-6 border-b border-slate-100">
                    <div class="pl-10 space-y-3">
                      <div class="text-[10px] font-bold tracking-[1.5px] text-slate-400 uppercase flex items-center gap-1.5 text-left">
                        <i class="ti ti-list-details"></i> Chi tiết các biến thể kích thước (Variants details)
                      </div>
                      <div class="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs max-w-3xl">
                        <table class="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr class="bg-slate-100/80 text-slate-550 font-bold border-b border-slate-100 text-slate-500">
                              <th class="p-3">SIZE / KÍCH CỠ</th>
                              <th class="p-3">MÀU SẮC</th>
                              <th class="p-3">TỒN KHO</th>
                              <th class="p-3">GIÁ BÁN GỐC</th>
                              <th class="p-3 text-accent font-bold"><i class="ti ti-flame animate-pulse"></i> GIÁ FLASH SALE (20%)</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100 font-medium">
                            <tr v-for="(v, index) in product.variants" :key="index">
                              <td class="p-3 font-semibold text-slate-800">Size {{ v.size }}</td>
                              <td class="p-3 text-slate-500">{{ v.color }}</td>
                              <td class="p-3 font-bold">
                                <span v-if="v.stock > 0" class="text-slate-800">{{ v.stock }} đôi</span>
                                <span v-else class="text-red-500 font-bold">0 đôi (Đã hết)</span>
                              </td>
                              <td class="p-3 text-slate-400 line-through">{{ formatCurrency(v.price) }}</td>
                              <td class="p-3 text-accent font-bold">{{ formatCurrency(v.price * 0.8) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>

              <tr v-if="filteredProducts.length === 0">
                <td colspan="8" class="text-center py-12 text-slate-400 text-sm">
                  Không tìm thấy sản phẩm nào phù hợp bộ lọc.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Pagination -->
        <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">Hiển thị 1 - {{ filteredProducts.length }} của {{ filteredProducts.length }} sản phẩm</span>
          <div class="flex items-center gap-1.5">
            <button class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" disabled>
              <i class="ti ti-chevron-left text-sm"></i>
            </button>
            <button class="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center text-xs font-bold border-none cursor-pointer">1</button>
            <button class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" disabled>
              <i class="ti ti-chevron-right text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div 
      v-if="modalOpen" 
      class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick"
    >
      <!-- Modal Backdrop -->
      <div 
        @click="closeModal" 
        class="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      <!-- Modal Content Container -->
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden z-10 transition-all scale-100 text-left">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950">{{ isEditMode ? 'Chỉnh sửa sản phẩm ✏️' : 'Thêm sản phẩm mới 🆕' }}</h3>
            <p class="text-xs text-slate-400 mt-0.5">Nhập các thông tin cơ bản và thiết lập các biến thể kích cỡ.</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Scrollable Body -->
        <form @submit.prevent="saveProduct" class="flex-1 overflow-y-auto p-6 space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên sản phẩm *</label>
            <input 
              type="text" 
              v-model="formProduct.name" 
              placeholder="Ví dụ: StepUp Air Force 1" 
              required 
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all placeholder:text-slate-400 text-slate-800 font-semibold"
            >
          </div>

          <!-- SKU (Only in edit mode, read-only) -->
          <div v-if="isEditMode">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mã sản phẩm (SKU)</label>
            <input 
              type="text" 
              v-model="formProduct.sku" 
              readonly
              class="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-xs outline-none uppercase font-mono text-slate-500 font-bold"
            >
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mô tả sản phẩm</label>
            <textarea 
              v-model="formProduct.description" 
              placeholder="Nhập mô tả chi tiết sản phẩm..." 
              rows="3"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all placeholder:text-slate-400 text-slate-800 font-semibold resize-none"
            ></textarea>
          </div>

          <!-- Product Images Upload -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ảnh sản phẩm (Images)</label>
            <div class="flex flex-wrap gap-3 mb-3">
              <!-- Uploaded Previews -->
              <div 
                v-for="(img, idx) in formProduct.images" 
                :key="idx" 
                class="relative w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl p-1.5 flex items-center justify-center group"
              >
                <img :src="getImageUrl(img)" class="max-w-full max-h-full object-contain">
                <button 
                  type="button" 
                  @click="removeFormImage(idx)"
                  class="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border-none cursor-pointer"
                >
                  <i class="ti ti-x text-[10px]"></i>
                </button>
              </div>
              
              <!-- File Input Trigger -->
              <label 
                v-if="!isUploading"
                class="w-20 h-20 border-2 border-dashed border-slate-200 hover:border-accent rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors bg-slate-50/50 hover:bg-white"
              >
                <i class="ti ti-camera text-slate-400 text-lg"></i>
                <span class="text-[9px] text-slate-400 font-bold">Thêm ảnh</span>
                <input type="file" @change="onImageUpload" multiple class="hidden" accept="image/*">
              </label>
              
              <!-- Uploading Spinner -->
              <div 
                v-else 
                class="w-20 h-20 border border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50"
              >
                <i class="ti ti-loader animate-spin text-accent text-lg"></i>
                <span class="text-[9px] text-slate-400 font-bold mt-1">Đang tải...</span>
              </div>
            </div>
          </div>

          <!-- Category & Brand -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Danh mục *</label>
              <select 
                v-model="formProduct.category_id" 
                required 
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all cursor-pointer text-slate-700 font-semibold"
              >
                <option value="">Chọn danh mục</option>
                <option v-for="cat in categoriesList" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Thương hiệu *</label>
              <select 
                v-model="formProduct.brand_id" 
                required 
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all cursor-pointer text-slate-700 font-semibold"
              >
                <option value="">Chọn thương hiệu</option>
                <option v-for="br in brandsList" :key="br.id" :value="br.id">{{ br.name }}</option>
              </select>
            </div>
          </div>

          <div class="h-px bg-slate-100"></div>

          <!-- Variants Configuration Section -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider"><i class="ti ti-list-numbers"></i> Cấu hình các biến thể (Variants) *</label>
              <button 
                type="button" 
                @click="addVariantRow" 
                class="text-accent hover:text-accent-hover text-xs font-bold flex items-center gap-1 border-none bg-transparent cursor-pointer"
              >
                + Thêm dòng
              </button>
            </div>
            
            <div class="space-y-3">
              <!-- Variant Form Row -->
              <div 
                v-for="(v, index) in formProduct.variants" 
                :key="index" 
                class="grid grid-cols-12 gap-3 items-end bg-slate-50/50 p-3 rounded-xl border border-slate-100"
              >
                <div class="col-span-3">
                  <span class="block text-[10px] text-slate-400 font-bold mb-1">SIZE *</span>
                  <select 
                    v-model="v.size_id" 
                    required 
                    class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-accent transition-all text-slate-800 font-semibold cursor-pointer"
                  >
                    <option value="">Chọn Size</option>
                    <option v-for="sz in sizesList" :key="sz.id" :value="sz.id">Size {{ sz.name }}</option>
                  </select>
                </div>
                <div class="col-span-3">
                  <span class="block text-[10px] text-slate-400 font-bold mb-1">MÀU SẮC *</span>
                  <select 
                    v-model="v.color_id" 
                    required 
                    class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-accent transition-all text-slate-800 font-semibold cursor-pointer"
                  >
                    <option value="">Chọn Màu</option>
                    <option v-for="cl in colorsList" :key="cl.id" :value="cl.id">{{ cl.name }}</option>
                  </select>
                </div>
                <div class="col-span-3">
                  <span class="block text-[10px] text-slate-400 font-bold mb-1">TỒN KHO *</span>
                  <input 
                    type="number" 
                    v-model="v.stock" 
                    placeholder="10" 
                    required 
                    class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-accent transition-all text-slate-800 font-semibold"
                  >
                </div>
                <div class="col-span-2">
                  <span class="block text-[10px] text-slate-400 font-bold mb-1">GIÁ GỐC *</span>
                  <input 
                    type="number" 
                    v-model="v.price" 
                    placeholder="1.2M" 
                    required 
                    class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-accent transition-all text-slate-800 font-semibold"
                  >
                </div>
                <div class="col-span-1 text-center">
                  <button 
                    type="button" 
                    @click="removeVariantRow(index)" 
                    :disabled="formProduct.variants.length <= 1"
                    class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer border-none disabled:opacity-50"
                  >
                    <i class="ti ti-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button 
              type="button" 
              @click="closeModal" 
              class="bg-white border border-slate-200 hover:border-slate-300 text-slate-650 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer text-slate-600"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all border-none cursor-pointer"
            >
              Lưu sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const searchQuery = ref('')
const filterCategory = ref('all')
const filterBrand = ref('all')
const filterStatus = ref('all')

const expandedRows = ref([])
const modalOpen = ref(false)
const isEditMode = ref(false)
const editingProductId = ref(null)

const products = ref([])
const categoriesList = ref([])
const brandsList = ref([])

const colorsList = ref([])
const sizesList = ref([])

function loadSizesAndColors() {
  const localSizes = localStorage.getItem('admin_sizes')
  if (localSizes) {
    try {
      sizesList.value = JSON.parse(localSizes).filter(s => s.status === 'active')
    } catch (e) {
      sizesList.value = [
        { id: 39, name: '39' },
        { id: 40, name: '40' },
        { id: 41, name: '41' },
        { id: 42, name: '42' },
        { id: 43, name: '43' }
      ]
    }
  } else {
    sizesList.value = [
      { id: 39, name: '39' },
      { id: 40, name: '40' },
      { id: 41, name: '41' },
      { id: 42, name: '42' },
      { id: 43, name: '43' }
    ]
  }

  const localColors = localStorage.getItem('admin_colors')
  if (localColors) {
    try {
      colorsList.value = JSON.parse(localColors).filter(c => c.status === 'active')
    } catch (e) {
      colorsList.value = [
        { id: 1, name: 'Trắng' },
        { id: 2, name: 'Đen' },
        { id: 3, name: 'Xám' },
        { id: 4, name: 'Xanh dương' }
      ]
    }
  } else {
    colorsList.value = [
      { id: 1, name: 'Trắng' },
      { id: 2, name: 'Đen' },
      { id: 3, name: 'Xám' },
      { id: 4, name: 'Xanh dương' }
    ]
  }
}

const formProduct = ref({
  name: '',
  category_id: '',
  brand_id: '',
  description: '',
  images: [],
  variants: [
    { size_id: 40, color_id: 1, stock: 10, price: 1000000 }
  ]
})

const isUploading = ref(false)

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/p1.png'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath
  }
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (imagePath.startsWith('images/')) {
    return `${serverUrl}/${imagePath}`
  }
  return `${serverUrl}/images/${imagePath}`
}

async function fetchProducts() {
  try {
    const response = await axiosInstance.get('/adminproduct')
    if (response && response.success) {
      products.value = response.data.map(p => {
        let img = '/images/p1.png'
        if (p.images && p.images.length > 0) {
          const firstImg = p.images[0];
          img = getImageUrl(typeof firstImg === 'string' ? firstImg : (firstImg?.image || ''));
        } else if (p.variants && p.variants.length > 0 && p.variants[0].image) {
          img = getImageUrl(p.variants[0].image)
        }
        
        return {
          id: p.id,
          name: p.name,
          sku: p.variants && p.variants.length > 0 ? p.variants[0].sku : 'N/A',
          brand: p.brand ? p.brand.name : 'N/A',
          brand_id: p.brand_id,
          category: p.category ? p.category.name : 'N/A',
          category_id: p.category_id,
          description: p.description || '',
          image: img,
          images: p.images || [],
          variants: (p.variants || []).map(v => ({
            id: v.id,
            size: v.size ? v.size.name : v.size_id,
            size_id: v.size_id,
            color: v.color ? v.color.name : v.color_id,
            color_id: v.color_id,
            stock: v.stock || 0,
            price: v.price || 0,
            sku: v.sku || ''
          }))
        }
      })
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

async function loadFilterOptions() {
  try {
    const [catRes, brandRes] = await Promise.all([
      axiosInstance.get('/getcategories'),
      axiosInstance.get('/getbrands')
    ])
    if (catRes && catRes.success) {
      categoriesList.value = catRes.data
    }
    if (brandRes && brandRes.success) {
      brandsList.value = brandRes.data
    }
  } catch (error) {
    console.error('Error loading filter options:', error)
  }
}

onMounted(() => {
  fetchProducts()
  loadFilterOptions()
  loadSizesAndColors()
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = filterCategory.value === 'all' || p.category === filterCategory.value
    const matchesBrand = filterBrand.value === 'all' || p.brand === filterBrand.value
    
    const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0)
    let matchesStatus = true
    if (filterStatus.value === 'active') {
      matchesStatus = totalStock > 0
    } else if (filterStatus.value === 'out_of_stock') {
      matchesStatus = totalStock === 0
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus
  })
})

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

function toggleRow(id) {
  const index = expandedRows.value.indexOf(id)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(id)
  }
}

function getTotalStock(product) {
  return product.variants.reduce((sum, v) => sum + v.stock, 0)
}

function getPriceRange(product) {
  if (!product.variants || product.variants.length === 0) return '0đ'
  const prices = product.variants.map(v => v.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  if (min === max) return formatCurrency(min)
  return `${formatCurrency(min)} - ${formatCurrency(max)}`
}

function addVariantRow() {
  formProduct.value.variants.push({ size_id: 40, color_id: 1, stock: 10, price: 1000000 })
}

function removeVariantRow(index) {
  if (formProduct.value.variants.length <= 1) return;

  const variant = formProduct.value.variants[index];
  const isExisting = !!variant.id;

  Swal.fire({
    title: isExisting ? 'Xác nhận xóa biến thể?' : 'Xóa dòng biến thể?',
    text: isExisting
      ? 'Biến thể này đã tồn tại trên hệ thống. Khi lưu sản phẩm, biến thể sẽ bị xóa vĩnh viễn khỏi cơ sở dữ liệu!'
      : 'Bạn có chắc chắn muốn loại bỏ dòng biến thể này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý!',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      formProduct.value.variants.splice(index, 1);
    }
  });
}

function openAddModal() {
  loadSizesAndColors()
  isEditMode.value = false
  editingProductId.value = null
  formProduct.value = {
    name: '',
    category_id: '',
    brand_id: '',
    description: '',
    images: [],
    variants: [
      { size_id: 40, color_id: 1, stock: 10, price: 1000000 }
    ]
  }
  modalOpen.value = true
}

function openEditModal(product) {
  loadSizesAndColors()
  isEditMode.value = true
  editingProductId.value = product.id
  formProduct.value = JSON.parse(JSON.stringify(product)) // Deep clone
  if (!formProduct.value.images) {
    formProduct.value.images = []
  }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function onImageUpload(event) {
  const files = event.target.files
  if (!files || files.length === 0) return
  
  isUploading.value = true
  try {
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      formData.append('image', files[i])
      
      const response = await axiosInstance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response && response.success) {
        if (!formProduct.value.images) {
          formProduct.value.images = []
        }
        formProduct.value.images.push(response.filename)
      }
    }
    Swal.fire({
      icon: 'success',
      title: 'Tải ảnh thành công!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })
  } catch (err) {
    console.error('Failed to upload image:', err)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi tải ảnh',
      text: 'Có lỗi xảy ra khi tải ảnh lên server.',
      confirmButtonColor: '#FF4D00'
    })
  } finally {
    isUploading.value = false
  }
}

function removeFormImage(index) {
  if (formProduct.value.images) {
    formProduct.value.images.splice(index, 1)
  }
}

async function saveProduct() {
  // Kiểm tra trùng lặp size và color trong danh sách biến thể
  const seen = new Set();
  for (const v of formProduct.value.variants) {
    if (!v.size_id || !v.color_id) continue;
    const key = `${v.size_id}-${v.color_id}`;
    if (seen.has(key)) {
      const sizeObj = sizesList.value.find(s => Number(s.id) === Number(v.size_id));
      const colorObj = colorsList.value.find(c => Number(c.id) === Number(v.color_id));
      const sizeName = sizeObj ? sizeObj.name : v.size_id;
      const colorName = colorObj ? colorObj.name : v.color_id;

      Swal.fire({
        icon: 'error',
        title: 'Trùng lặp biến thể!',
        text: `Biến thể với Size ${sizeName} và Màu ${colorName} đã tồn tại trong danh sách. Vui lòng loại bỏ hoặc điều chỉnh lại!`,
        confirmButtonColor: '#FF4D00'
      });
      return;
    }
    seen.add(key);
  }

  try {
    const payload = {
      name: formProduct.value.name,
      category_id: formProduct.value.category_id,
      brand_id: formProduct.value.brand_id,
      description: formProduct.value.description || '',
      images: formProduct.value.images || [],
      variants: formProduct.value.variants.map(v => ({
        id: v.id || null,
        size_id: v.size_id,
        color_id: v.color_id,
        stock: v.stock,
        price: v.price
      }))
    }

    if (isEditMode.value) {
      const response = await axiosInstance.post(`/product_edit/${editingProductId.value}`, payload)
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Đã cập nhật sản phẩm!',
          text: 'Thông tin chỉnh sửa đã được cập nhật thành công.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchProducts()
        modalOpen.value = false
      }
    } else {
      const response = await axiosInstance.post('/product_add', payload)
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Đã thêm sản phẩm!',
          text: 'Sản phẩm mới đã được lưu thành công vào kho.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchProducts()
        modalOpen.value = false
      }
    }
  } catch (error) {
    console.error('Error saving product:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lưu thất bại!',
      text: error.response?.data?.message || 'Đã xảy ra lỗi khi lưu sản phẩm.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

async function deleteProduct(id) {
  Swal.fire({
    title: 'Xác nhận xóa sản phẩm?',
    text: 'Hành động này sẽ xóa vĩnh viễn sản phẩm khỏi kho hàng!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/product/${id}`)
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa!',
            text: 'Sản phẩm đã bị loại bỏ khỏi danh sách.',
            confirmButtonColor: '#FF4D00'
          })
          await fetchProducts()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        Swal.fire({
          icon: 'error',
          title: 'Xóa thất bại!',
          text: error.response?.data?.message || 'Không thể xóa sản phẩm này.',
          confirmButtonColor: '#FF4D00'
        })
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
