<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="text-left">
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Quản lý Màu sắc (Color) 🎨</h1>
        <p class="text-sm text-slate-500 mt-1">Quản lý danh sách màu sắc, thiết lập mã màu HEX trực quan để áp dụng cho các biến thể sản phẩm.</p>
      </div>
      <div>
        <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
          <i class="ti ti-plus text-base"></i> Thêm Màu sắc mới
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
        Tất cả màu sắc ({{ colors.length }})
      </button>
      <button 
        @click="activeTab = 'active'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeTab === 'active' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Đang hoạt động ({{ colors.filter(c => c.status === 'active').length }})
      </button>
      <button 
        @click="activeTab = 'paused'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeTab === 'paused' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Tạm khóa ({{ colors.filter(c => c.status === 'paused').length }})
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
          placeholder="Tìm kiếm tên màu, mã HEX, mô tả..." 
          class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800"
        >
      </div>

      <!-- Action filters -->
      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <select v-model="sortBy" class="bg-slate-50 border border-slate-200 text-slate-655 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
          <option value="name_asc">Sắp xếp: Tên A-Z</option>
          <option value="name_desc">Sắp xếp: Tên Z-A</option>
        </select>
      </div>
    </div>

    <!-- Colors Table -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">STT</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TÊN MÀU SẮC</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PREVIEW MÀU</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÃ HEX</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÔ TẢ CHI TIẾT</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KÍCH HOẠT</th>
              <th class="py-4 px-6 w-24"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="(color, index) in sortedAndFilteredColors" 
              :key="color.id" 
              :class="[
                'hover:bg-slate-50/30 transition-all font-medium',
                color.status === 'paused' ? 'bg-slate-50/50' : ''
              ]"
            >
              <td class="py-4 px-6 text-xs font-bold text-left text-slate-500">
                {{ index + 1 }}
              </td>
              <td class="py-4 px-6 text-xs font-bold text-left" :class="color.status === 'paused' ? 'text-slate-400 line-through' : 'text-slate-900'">
                {{ color.name }}
              </td>
              <td class="py-4 px-6 text-left">
                <div class="flex items-center gap-2">
                  <span 
                    class="w-6 h-6 rounded-full border border-slate-200 block shadow-2xs" 
                    :style="{ backgroundColor: color.hex }"
                  ></span>
                </div>
              </td>
              <td class="py-4 px-6 text-xs font-bold font-mono text-left text-slate-700">
                {{ color.hex }}
              </td>
              <td 
                class="py-4 px-6 text-xs max-w-xs truncate text-left" 
                :class="color.status === 'paused' ? 'text-slate-400 line-through' : 'text-slate-500'"
                :title="color.description"
              >
                {{ color.description || 'Không có mô tả' }}
              </td>
              <td class="py-4 px-6 text-left">
                <span 
                  v-if="color.status === 'active'"
                  class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full"
                >
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đang hoạt động
                </span>
                <span 
                  v-else
                  class="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full"
                >
                  <span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Tạm khóa
                </span>
              </td>
              <td class="py-4 px-6 text-left">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    :checked="color.status === 'active'" 
                    @change="toggleColorActive(color)" 
                    class="sr-only peer"
                  >
                  <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center gap-2 justify-end">
                  <button 
                    @click="openEditModal(color)"
                    class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                  >
                    <i class="ti ti-edit text-xs"></i> Chỉnh sửa
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="sortedAndFilteredColors.length === 0">
              <td colspan="8" class="text-center py-12 text-slate-400 text-sm">
                Không tìm thấy màu sắc nào phù hợp.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Pagination -->
      <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-xs text-slate-400 font-medium">Hiển thị 1 - {{ sortedAndFilteredColors.length }} của {{ sortedAndFilteredColors.length }} màu sắc</span>
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

    <!-- Add/Edit Color Modal -->
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
            <h3 class="font-display text-lg font-bold text-slate-950">{{ isEditMode ? 'Chỉnh sửa Màu sắc 🎨' : 'Thêm Màu sắc mới 🎨' }}</h3>
            <p class="text-xs text-slate-400 mt-0.5">{{ isEditMode ? 'Cập nhật thông tin mã màu HEX và chi tiết màu.' : 'Tạo mới màu sắc biến thể cho sản phẩm.' }}</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form @submit.prevent="saveColor" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- Color Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên màu sắc *</label>
            <input 
              type="text" 
              v-model="formColor.name" 
              placeholder="Ví dụ: Đỏ Đô, Trắng Basic" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-bold"
            >
          </div>

          <!-- HEX Code & Color Picker -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mã màu HEX *</label>
            <div class="flex items-center gap-3">
              <!-- Color input picker -->
              <div class="relative w-11 h-11 rounded-xl border border-slate-200 overflow-hidden cursor-pointer shrink-0 shadow-2xs">
                <input 
                  type="color" 
                  v-model="formColor.hex" 
                  class="absolute inset-0 w-[150%] h-[150%] translate-x-[-15%] translate-y-[-15%] cursor-pointer border-none p-0 bg-transparent"
                >
              </div>
              <!-- Text Input -->
              <input 
                type="text" 
                v-model="formColor.hex" 
                placeholder="#FF0000" 
                required 
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none uppercase font-mono focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-extrabold"
              >
            </div>
            <p class="text-[10px] text-slate-400 mt-1">Sử dụng Color Picker hoặc nhập mã HEX hợp lệ dạng #RGB hoặc #RRGGBB.</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mô tả màu sắc</label>
            <textarea 
              v-model="formColor.description" 
              placeholder="Ví dụ: Tông màu đỏ trầm ấm, phù hợp mùa đông..." 
              rows="3" 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-semibold resize-none"
            ></textarea>
          </div>

          <!-- Status select -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái màu sắc *</label>
            <select 
              v-model="formColor.status" 
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
              {{ isEditMode ? 'Lưu thay đổi' : 'Tạo màu sắc' }}
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
      <div class="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm shrink-0">🎨</div>
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

const colors = ref([])

const formColor = ref({
  id: '',
  name: '',
  hex: '#000000',
  description: '',
  status: 'active'
})

async function fetchColors() {
  try {
    const response = await axiosInstance.get('/color')
    if (response && response.success && response.data) {
      colors.value = response.data.map(c => ({
        id: c.id,
        name: c.name,
        hex: c.color_code || '#000000',
        description: c.description || '',
        status: c.status == 1 ? 'active' : 'paused'
      }))
    }
  } catch (error) {
    console.error('Error fetching colors:', error)
  }
}

onMounted(() => {
  fetchColors()
})

const sortedAndFilteredColors = computed(() => {
  let result = colors.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          c.hex.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          (c.description || '').toLowerCase().includes(searchQuery.value.toLowerCase())
    let matchesTab = true
    if (activeTab.value === 'active') {
      matchesTab = c.status === 'active'
    } else if (activeTab.value === 'paused') {
      matchesTab = c.status === 'paused'
    }
    return matchesSearch && matchesTab
  })

  // Sort
  if (sortBy.value === 'name_asc') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'name_desc') {
    result.sort((a, b) => b.name.localeCompare(a.name))
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

async function toggleColorActive(color) {
  const oldStatus = color.status
  const newStatus = oldStatus === 'active' ? 'paused' : 'active'
  try {
    await axiosInstance.patch(`/color/toggle-cate/${color.id}`)
    color.status = newStatus
    const stateText = newStatus === 'active' ? 'Kích hoạt' : 'Khóa tạm thời'
    showToast(`Đã ${stateText} màu sắc "${color.name}" thành công!`)
  } catch (e) {
    console.error('Error toggling color status:', e)
  }
}

function openAddModal() {
  isEditMode.value = false
  formColor.value = {
    id: '',
    name: '',
    hex: '#FF0000',
    description: '',
    status: 'active'
  }
  modalOpen.value = true
}

function openEditModal(color) {
  isEditMode.value = true
  formColor.value = { ...color }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveColor() {
  // Validate duplicate colors name
  const isDuplicate = colors.value.some(c => c.name.trim().toLowerCase() === formColor.value.name.trim().toLowerCase() && c.id !== formColor.value.id)
  if (isDuplicate) {
    Swal.fire({
      icon: 'error',
      title: 'Trùng lặp màu sắc',
      text: `Màu sắc "${formColor.value.name}" đã tồn tại trên hệ thống!`,
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  // Force HEX format starting with #
  if (!formColor.value.hex.startsWith('#')) {
    formColor.value.hex = '#' + formColor.value.hex
  }

  const payload = {
    name: formColor.value.name.trim(),
    color_code: formColor.value.hex.trim(),
    description: formColor.value.description ? formColor.value.description.trim() : '',
    status: formColor.value.status === 'active' ? 1 : 0
  }

  if (isEditMode.value) {
    try {
      await axiosInstance.put(`/color/edit/${formColor.value.id}`, payload)
      showToast(`Đã cập nhật màu sắc "${formColor.value.name}"!`)
      fetchColors()
      modalOpen.value = false
    } catch (e) {
      console.error('Error editing color:', e)
    }
  } else {
    try {
      await axiosInstance.post('/color/add', payload)
      showToast(`Đã thêm màu sắc mới "${formColor.value.name}"!`)
      fetchColors()
      modalOpen.value = false
    } catch (e) {
      console.error('Error adding color:', e)
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
