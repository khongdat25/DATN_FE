<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Quản lý Banner Quảng cáo</h1>
          <p class="text-sm text-slate-500 mt-1">Quản lý các slide quảng cáo hiển thị trên trang chủ và các phân khu khuyến mãi của cửa hàng.</p>
        </div>
        <div>
          <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
            <i class="ti ti-plus text-base"></i> Thêm Banner mới
          </button>
        </div>
      </div>

      <!-- Quick Filter Tabs -->
      <div class="flex border-b border-b-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap bg-white px-6 rounded-t-2xl border-t border-x border-slate-100 shadow-2xs">
        <button 
          @click="activeTab = 'all'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'all' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Tất cả banner ({{ banners.length }})
        </button>
        <button 
          @click="activeTab = 'active'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'active' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đang hiển thị ({{ banners.filter(b => b.status === 'active').length }})
        </button>
        <button 
          @click="activeTab = 'scheduled'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'scheduled' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Chờ kích hoạt ({{ banners.filter(b => b.status === 'scheduled').length }})
        </button>
        <button 
          @click="activeTab = 'expired'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'expired' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đã hết hạn/Tạm khóa ({{ banners.filter(b => b.status === 'expired').length }})
        </button>
      </div>

      <!-- Toolbar & Search -->
      <div class="bg-white p-4 rounded-b-2xl border-b border-x border-slate-100 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search bar -->
        <div class="relative w-full md:w-80 text-slate-400 focus-within:text-accent">
          <i class="ti ti-search absolute left-3.5 top-1/2 -translate-y-1/2 text-base"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tìm kiếm tên banner, vị trí, liên kết..." 
            class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800"
          >
        </div>

        <!-- Action filters -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <select v-model="sortBy" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="newest">Sắp xếp: Mới nhất</option>
            <option value="position">Sắp xếp: Vị trí hiển thị</option>
            <option value="endDate">Sắp xếp: Ngày kết thúc</option>
          </select>
        </div>
      </div>

      <!-- Banners Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-36">ẢNH PREVIEW</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">THÔNG TIN BANNER</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">VỊ TRÍ HIỂN THỊ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">THỜI GIAN HIỂN THỊ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KÍCH HOẠT</th>
                <th class="py-4 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="b in sortedAndFilteredBanners" 
                :key="b.id" 
                :class="[
                  'hover:bg-slate-50/30 transition-all font-medium',
                  b.status === 'expired' ? 'opacity-60' : ''
                ]"
              >
                <td class="py-4 px-6">
                  <img :src="getImageUrl(b.image)" alt="Banner" class="w-24 h-12 rounded-lg object-cover ring-2 ring-slate-100/50" :class="b.status === 'expired' ? 'grayscale' : ''">
                </td>
                <td class="py-4 px-6">
                  <div class="text-xs font-bold text-slate-900 text-left" :class="b.status === 'expired' ? 'line-through' : ''">{{ b.title }}</div>
                  <div class="text-[10px] text-slate-400 mt-1 flex items-center gap-1 text-left">
                    <i class="ti ti-link text-xs"></i>
                    <a :href="b.link" class="hover:text-accent font-semibold" :class="b.status === 'expired' ? 'line-through' : ''">{{ b.link }}</a>
                  </div>
                </td>
                <td class="py-4 px-6 text-left">
                  <span class="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-100">
                    {{ b.position }}
                  </span>
                </td>
                <td class="py-4 px-6 text-xs text-slate-500 font-mono text-left">
                  {{ formatDate(b.startDate) }} - {{ formatDate(b.endDate) }}
                </td>
                <td class="py-4 px-6 text-left">
                  <span 
                    v-if="b.status === 'active'"
                    class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 whitespace-nowrap"
                  >
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đang hiển thị
                  </span>
                  <span 
                    v-else-if="b.status === 'scheduled'"
                    class="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 whitespace-nowrap"
                  >
                    <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Chờ kích hoạt
                  </span>
                  <span 
                    v-else
                    class="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 whitespace-nowrap"
                  >
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> Đã hết hạn
                  </span>
                </td>
                <td class="py-4 px-6 text-left">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      :checked="b.status === 'active' || b.status === 'scheduled'" 
                      @change="toggleBannerActive(b)" 
                      class="sr-only peer"
                    >
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </td>
                <td class="py-4 px-6 text-right">
                  <div class="flex items-center gap-2 justify-end">
                    <button 
                      @click="openEditModal(b)"
                      class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                    >
                      Chỉnh sửa
                    </button>
                    <button 
                      @click="deleteBanner(b.id)" 
                      class="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center border-none transition-all cursor-pointer"
                    >
                      <i class="ti ti-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="sortedAndFilteredBanners.length === 0">
                <td colspan="7" class="text-center py-12 text-slate-400 text-sm">
                  Không tìm thấy banner nào phù hợp.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Pagination -->
        <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">Hiển thị 1 - {{ sortedAndFilteredBanners.length }} của {{ sortedAndFilteredBanners.length }} banner</span>
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

    <!-- Add/Edit Banner Modal -->
    <div 
      v-if="modalOpen" 
      class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick"
    >
      <!-- Modal Backdrop -->
      <div 
        @click="closeModal" 
        class="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      <!-- Modal Container -->
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden z-10 transition-all scale-100 text-left">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950">{{ isEditMode ? 'Chỉnh sửa Banner quảng cáo' : 'Thêm Banner quảng cáo mới' }}</h3>
            <p class="text-xs text-slate-400 mt-0.5">{{ isEditMode ? 'Cập nhật cấu hình và nội dung hình ảnh của banner.' : 'Tạo mới chiến dịch slide banner cho trang bán hàng.' }}</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form @submit.prevent="saveBanner" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tiêu đề Banner *</label>
            <input 
              type="text" 
              v-model="formBanner.title" 
              placeholder="Ví dụ: Bộ sưu tập giày thể thao thu đông" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
            >
          </div>

          <!-- Image URL / Upload -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đường dẫn ảnh Banner *</label>
            <div class="space-y-2">
              <input 
                type="text" 
                v-model="formBanner.image" 
                placeholder="Nhập URL ảnh hoặc chọn file từ máy..."
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all font-mono text-slate-700"
              >
              <div class="flex items-center gap-2">
                <input type="file" ref="bannerFileInput" @change="onBannerFileSelected" accept="image/*" class="hidden">
                <button 
                  type="button" 
                  @click="triggerBannerFileInput" 
                  class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg transition-all border-none cursor-pointer flex items-center gap-1.5"
                >
                  <i class="ti ti-upload text-sm"></i> Tải ảnh từ máy
                </button>
                <span v-if="selectedBannerFileName" class="text-[11px] text-emerald-600 font-bold truncate max-w-[200px]">{{ selectedBannerFileName }}</span>
              </div>
            </div>
            <span class="text-[10px] text-slate-400 mt-1 block">Khuyên dùng tỷ lệ banner rộng (1200x500px).</span>
          </div>

          <!-- Display Position -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vị trí hiển thị *</label>
            <select 
              v-model="formBanner.position" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-750 font-semibold cursor-pointer text-slate-700"
            >
              <option value="Trang chủ - Slider chính (Hero)">Trang chủ - Slider chính (Hero)</option>
              <option value="Trang chủ - Giữa trang">Trang chủ - Giữa trang</option>
              <option value="Trang chủ - Chân trang">Trang chủ - Chân trang</option>
            </select>
          </div>

          <!-- Target Link -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Liên kết điều hướng *</label>
            <input 
              type="text" 
              v-model="formBanner.link" 
              placeholder="Ví dụ: products.html" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold"
            >
          </div>

          <!-- Dates -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày bắt đầu *</label>
              <input 
                type="date" 
                v-model="formBanner.startDate" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold"
              >
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày kết thúc *</label>
              <input 
                type="date" 
                v-model="formBanner.endDate" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold"
              >
            </div>
          </div>

          <!-- Status (only in edit mode) -->
          <div v-if="isEditMode">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái *</label>
            <select 
              v-model="formBanner.status" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <option value="active">Đang hiển thị</option>
              <option value="scheduled">Chờ kích hoạt</option>
              <option value="expired">Đã hết hạn/Tạm khóa</option>
            </select>
          </div>

          <!-- Footer buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button 
              type="button" 
              @click="closeModal" 
              class="bg-white border border-slate-200 hover:border-slate-300 text-slate-655 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer text-slate-650"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all border-none cursor-pointer"
            >
              {{ isEditMode ? 'Lưu thay đổi' : 'Tạo Banner' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios'

const activeTab = ref('all')
const searchQuery = ref('')
const sortBy = ref('newest')

const modalOpen = ref(false)
const isEditMode = ref(false)
const bannerFileInput = ref(null)
const selectedBannerFile = ref(null)
const selectedBannerFileName = ref('')

const banners = ref([])

const formBanner = ref({
  id: null,
  title: '',
  image: '/images/banner_sneaker.png',
  position: 'Trang chủ - Slider chính (Hero)',
  link: '/products',
  startDate: '',
  endDate: '',
  status: 'active'
})

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/banner_sneaker.png'
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

async function fetchBanners() {
  try {
    const response = await axiosInstance.get('/admin/banners')
    if (response && response.success && Array.isArray(response.data)) {
      banners.value = response.data.map(b => ({
        ...b,
        title: b.title || b.name || 'Banner quảng cáo',
        startDate: b.start_date || '',
        endDate: b.end_date || ''
      }))
    }
  } catch (error) {
    console.error('Error fetching admin banners:', error)
  }
}

onMounted(() => {
  fetchBanners()
})

const sortedAndFilteredBanners = computed(() => {
  let result = banners.value.filter(b => {
    const titleStr = b.title || b.name || ''
    const matchesSearch = titleStr.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          (b.position && b.position.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
                          (b.link && b.link.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    let matchesTab = true
    if (activeTab.value === 'active') {
      matchesTab = b.status === 'active'
    } else if (activeTab.value === 'scheduled') {
      matchesTab = b.status === 'scheduled'
    } else if (activeTab.value === 'expired') {
      matchesTab = b.status === 'expired'
    }

    return matchesSearch && matchesTab
  })

  if (sortBy.value === 'newest') {
    result.sort((a, b) => b.id - a.id)
  } else if (sortBy.value === 'position') {
    result.sort((a, b) => (a.position || '').localeCompare(b.position || ''))
  } else if (sortBy.value === 'endDate') {
    result.sort((a, b) => (a.endDate || '').localeCompare(b.endDate || ''))
  }

  return result
})

function formatDate(dateStr) {
  if (!dateStr) return '-'
  if (dateStr.includes('-')) {
    const [yyyy, mm, dd] = dateStr.split('-')
    return `${dd}/${mm}/${yyyy}`
  }
  return dateStr
}

function triggerBannerFileInput() {
  if (bannerFileInput.value) {
    bannerFileInput.value.click()
  }
}

function onBannerFileSelected(event) {
  const file = event.target.files?.[0]
  if (file) {
    selectedBannerFile.value = file
    selectedBannerFileName.value = file.name
    formBanner.value.image = URL.createObjectURL(file)
  }
}

async function toggleBannerActive(b) {
  try {
    const response = await axiosInstance.patch(`/admin/banners/${b.id}/toggle`)
    if (response && response.success) {
      b.status = response.status
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: `Đã cập nhật trạng thái: ${b.status === 'active' ? 'Đang hiển thị' : 'Đã ẩn/Hết hạn'}`,
        showConfirmButton: false,
        timer: 2000
      })
    }
  } catch (e) {
    console.error('Error toggling banner status:', e)
  }
}

function openAddModal() {
  isEditMode.value = false
  selectedBannerFile.value = null
  selectedBannerFileName.value = ''
  formBanner.value = {
    id: null,
    title: '',
    image: '/images/banner_sneaker.png',
    position: 'Trang chủ - Slider chính (Hero)',
    link: '/products',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    status: 'active'
  }
  modalOpen.value = true
}

function openEditModal(b) {
  isEditMode.value = true
  selectedBannerFile.value = null
  selectedBannerFileName.value = ''
  formBanner.value = { ...b }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveBanner() {
  try {
    let finalImageUrl = formBanner.value.image.trim()

    if (finalImageUrl.includes('postimg.cc/') && !finalImageUrl.includes('i.postimg.cc/')) {
      Swal.fire({
        icon: 'warning',
        title: 'Link trang web PostImg',
        html: `Bạn đang dán link <b>trang web</b> PostImg (<code>${finalImageUrl}</code>).<br><br>Để ảnh hiển thị, bạn cần copy <b>"Direct Link" (Link trực tiếp)</b> dạng <code>https://i.postimg.cc/.../filename.jpg</code>!`,
        confirmButtonColor: '#FF4D00'
      })
      return
    }

    if (selectedBannerFile.value) {
      const formData = new FormData()
      formData.append('image', selectedBannerFile.value)
      const uploadRes = await axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (uploadRes && uploadRes.data && uploadRes.data.path) {
        finalImageUrl = uploadRes.data.path
      }
    }

    const payload = {
      title: formBanner.value.title,
      image: finalImageUrl,
      position: formBanner.value.position,
      link: formBanner.value.link,
      start_date: formBanner.value.startDate,
      end_date: formBanner.value.endDate,
      status: formBanner.value.status
    }

    if (isEditMode.value) {
      const res = await axiosInstance.put(`/admin/banners/${formBanner.value.id}`, payload)
      if (res && res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: 'Thông tin Banner đã được cập nhật.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchBanners()
        closeModal()
      }
    } else {
      const res = await axiosInstance.post('/admin/banners', payload)
      if (res && res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Tạo banner thành công!',
          text: 'Banner quảng cáo mới đã được đưa lên hệ thống.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchBanners()
        closeModal()
      }
    }
  } catch (error) {
    console.error('Error saving banner:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lưu thất bại!',
      text: error.response?.data?.message || 'Có lỗi xảy ra khi lưu banner.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

function deleteBanner(id) {
  Swal.fire({
    title: 'Xác nhận xóa Banner?',
    text: 'Hành động này sẽ gỡ bỏ banner quảng cáo vĩnh viễn và không thể khôi phục!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/admin/banners/${id}`)
        if (res && res.success) {
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa!',
            text: 'Banner quảng cáo đã bị gỡ bỏ.',
            confirmButtonColor: '#FF4D00'
          })
          await fetchBanners()
        }
      } catch (e) {
        console.error('Error deleting banner:', e)
        Swal.fire({
          icon: 'error',
          title: 'Xóa thất bại!',
          text: e.response?.data?.message || 'Không thể xóa banner này.',
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
