<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="text-left">
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Quản lý Kích cỡ (Size)</h1>
        <p class="text-sm text-slate-500 mt-1">Quản lý danh sách kích cỡ giày dép được sử dụng cho các biến thể sản phẩm trong hệ thống.</p>
      </div>
      <div>
        <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
          <i class="ti ti-plus text-base"></i> Thêm Kích cỡ mới
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
        Tất cả kích cỡ ({{ sizes.length }})
      </button>
      <button 
        @click="activeTab = 'active'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeTab === 'active' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Đang hoạt động ({{ sizes.filter(s => s.status === 'active').length }})
      </button>
      <button 
        @click="activeTab = 'paused'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeTab === 'paused' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Tạm khóa ({{ sizes.filter(s => s.status === 'paused').length }})
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
          placeholder="Tìm kiếm tên size, mô tả..." 
          class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800"
        >
      </div>

      <!-- Action filters -->
      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <select v-model="sortBy" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
          <option value="name_asc">Sắp xếp: Tên tăng dần</option>
          <option value="name_desc">Sắp xếp: Tên giảm dần</option>
        </select>
      </div>
    </div>

    <!-- Sizes Table -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">STT</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KÍCH CỠ (SIZE)</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÔ TẢ CHI TIẾT</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KÍCH HOẠT</th>
              <th class="py-4 px-6 w-24"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="(size, index) in sortedAndFilteredSizes" 
              :key="size.id" 
              :class="[
                'hover:bg-slate-50/30 transition-all font-medium',
                size.status === 'paused' ? 'bg-slate-50/50' : ''
              ]"
            >
              <td class="py-4 px-6 text-xs font-bold text-left text-slate-500">
                {{ index + 1 }}
              </td>
              <td class="py-4 px-6 text-xs font-bold text-left" :class="size.status === 'paused' ? 'text-slate-400 line-through' : 'text-slate-900'">
                Size {{ size.name }}
              </td>
              <td 
                class="py-4 px-6 text-xs max-w-xs truncate text-left" 
                :class="size.status === 'paused' ? 'text-slate-400 line-through' : 'text-slate-500'"
                :title="size.description"
              >
                {{ size.description || 'Không có mô tả' }}
              </td>
              <td class="py-4 px-6 text-left">
                <span 
                  v-if="size.status === 'active'"
                  class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đang hoạt động
                </span>
                <span 
                  v-else
                  class="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  <span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Tạm khóa
                </span>
              </td>
              <td class="py-4 px-6 text-left">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    :checked="size.status === 'active'" 
                    @change="toggleSizeActive(size)" 
                    class="sr-only peer"
                  >
                  <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center gap-2 justify-end">
                  <button 
                    @click="openEditModal(size)"
                    class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="sortedAndFilteredSizes.length === 0">
              <td colspan="6" class="text-center py-12 text-slate-400 text-sm">
                Không tìm thấy kích cỡ nào phù hợp.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Pagination -->
      <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-xs text-slate-400 font-medium">Hiển thị 1 - {{ sortedAndFilteredSizes.length }} của {{ sortedAndFilteredSizes.length }} kích cỡ</span>
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

    <!-- Add/Edit Size Modal -->
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
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950">{{ isEditMode ? 'Chỉnh sửa Kích cỡ' : 'Thêm Kích cỡ mới' }}</h3>
            <p class="text-xs text-slate-400 mt-0.5">{{ isEditMode ? 'Cập nhật thông tin chi tiết kích cỡ.' : 'Tạo mới kích cỡ giày dép trong hệ thống.' }}</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form @submit.prevent="saveSize" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- Size Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên kích cỡ (Size) *</label>
            <input 
              type="text" 
              v-model="formSize.name" 
              placeholder="Ví dụ: 39 hoặc M, L" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-bold"
            >
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mô tả chi tiết</label>
            <textarea 
              v-model="formSize.description" 
              placeholder="Ví dụ: Chiều dài chân khoảng 24.5cm..." 
              rows="3" 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-semibold resize-none"
            ></textarea>
          </div>

          <!-- Status select -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái kích cỡ *</label>
            <select 
              v-model="formSize.status" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <option value="active">Đang hoạt động</option>
              <option value="paused">Tạm khóa</option>
            </select>
          </div>

          <!-- Footer buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button 
              type="button" 
              @click="closeModal" 
              class="bg-white border border-slate-200 hover:border-slate-300 text-slate-655 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer text-slate-600"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all border-none cursor-pointer"
            >
              {{ isEditMode ? 'Lưu thay đổi' : 'Tạo kích cỡ' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="toastShow" 
      class="fixed bottom-5 right-5 z-1000 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-fade-in-quick"
    >
      <div class="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm shrink-0">📏</div>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const activeTab = ref('all')
const searchQuery = ref('')
const sortBy = ref('name_asc')

const modalOpen = ref(false)
const isEditMode = ref(false)
const toastShow = ref(false)
const toastMessage = ref('')

const sizes = ref([])

const formSize = ref({
  id: '',
  name: '',
  description: '',
  status: 'active'
})

async function fetchSizes() {
  try {
    const response = await axiosInstance.get('/size')
    if (response && response.success && response.data) {
      sizes.value = response.data.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description || '',
        status: s.status == 1 ? 'active' : 'paused'
      }))
    }
  } catch (error) {
    console.error('Error fetching sizes:', error)
  }
}

onMounted(() => {
  fetchSizes()
})

const sortedAndFilteredSizes = computed(() => {
  let result = sizes.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          (s.description || '').toLowerCase().includes(searchQuery.value.toLowerCase())
    let matchesTab = true
    if (activeTab.value === 'active') {
      matchesTab = s.status === 'active'
    } else if (activeTab.value === 'paused') {
      matchesTab = s.status === 'paused'
    }
    return matchesSearch && matchesTab
  })

  // Sort
  if (sortBy.value === 'name_asc') {
    result.sort((a, b) => {
      // Try numeric sort first, fallback to string compare
      const na = parseFloat(a.name)
      const nb = parseFloat(b.name)
      if (!isNaN(na) && !isNaN(nb)) return na - nb
      return a.name.localeCompare(b.name)
    })
  } else if (sortBy.value === 'name_desc') {
    result.sort((a, b) => {
      const na = parseFloat(a.name)
      const nb = parseFloat(b.name)
      if (!isNaN(na) && !isNaN(nb)) return nb - na
      return b.name.localeCompare(a.name)
    })
  }

  return result
})

function showToast(msg) {
  toastMessage.value = msg
  toastShow.value = true
  setTimeout(() => {
    toastShow.value = false
  }, 3000)
}

async function toggleSizeActive(size) {
  const oldStatus = size.status
  const newStatus = oldStatus === 'active' ? 'paused' : 'active'
  try {
    await axiosInstance.patch(`/size/toggle-cate/${size.id}`)
    size.status = newStatus
    const stateText = newStatus === 'active' ? 'Kích hoạt' : 'Khóa tạm thời'
    showToast(`Đã ${stateText} kích cỡ "Size ${size.name}" thành công!`)
  } catch (e) {
    console.error('Error toggling size status:', e)
  }
}

function openAddModal() {
  isEditMode.value = false
  formSize.value = {
    id: '',
    name: '',
    description: '',
    status: 'active'
  }
  modalOpen.value = true
}

function openEditModal(size) {
  isEditMode.value = true
  formSize.value = { ...size }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveSize() {
  const isDuplicate = sizes.value.some(s => s.name.trim().toLowerCase() === formSize.value.name.trim().toLowerCase() && s.id !== formSize.value.id)
  
  if (isDuplicate) {
    Swal.fire({
      icon: 'error',
      title: 'Trùng lặp kích cỡ',
      text: `Kích cỡ "Size ${formSize.value.name}" đã tồn tại trên hệ thống!`,
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  if (isEditMode.value) {
    try {
      const payload = {
        name: formSize.value.name.trim(),
        description: formSize.value.description ? formSize.value.description.trim() : ''
      }
      await axiosInstance.put(`/size/edit/${formSize.value.id}`, payload)
      showToast(`Đã cập nhật kích cỡ "Size ${formSize.value.name}"!`)
      fetchSizes()
      modalOpen.value = false
    } catch (e) {
      console.error('Error editing size:', e)
    }
  } else {
    try {
      const payload = {
        name: formSize.value.name.trim(),
        description: formSize.value.description ? formSize.value.description.trim() : ''
      }
      await axiosInstance.post('/size/add', payload)
      showToast(`Đã thêm kích cỡ mới "Size ${formSize.value.name}"!`)
      fetchSizes()
      modalOpen.value = false
    } catch (e) {
      console.error('Error adding size:', e)
    }
  }
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
