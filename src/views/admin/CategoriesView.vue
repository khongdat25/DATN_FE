<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Quản lý Danh mục sản phẩm 📁</h1>
          <p class="text-sm text-slate-500 mt-1">Phân loại sản phẩm của cửa hàng, chỉnh sửa thông tin mô tả danh mục để phục vụ bộ lọc người dùng.</p>
        </div>
        <div>
          <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
            <i class="ti ti-plus text-base"></i> Thêm Danh mục mới
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
          Tất cả danh mục ({{ categories.length }})
        </button>
        <button 
          @click="activeTab = 'active'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'active' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đang hoạt động ({{ categories.filter(c => c.status === 'active').length }})
        </button>
        <button 
          @click="activeTab = 'paused'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'paused' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Tạm khóa ({{ categories.filter(c => c.status === 'paused').length }})
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
            placeholder="Tìm kiếm tên danh mục, mã danh mục..." 
            class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800"
          >
        </div>

        <!-- Action filters -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <select v-model="sortBy" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="code">Sắp xếp: Mã danh mục</option>
            <option value="productCount">Sắp xếp: Số lượng sản phẩm</option>
            <option value="name">Sắp xếp: Tên A-Z</option>
          </select>
        </div>
      </div>

      <!-- Categories Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÃ CODE</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TÊN DANH MỤC</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÔ TẢ CHI TIẾT</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">SỐ SẢN PHẨM</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KÍCH HOẠT</th>
                <th class="py-4 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="cat in sortedAndFilteredCategories" 
                :key="cat.code" 
                :class="[
                  'hover:bg-slate-50/30 transition-all font-medium',
                  cat.status === 'paused' ? 'bg-slate-50/50' : ''
                ]"
              >
                <td class="py-4 px-6 text-xs font-extrabold font-mono text-left">
                  <span :class="cat.status === 'paused' ? 'text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-350' : 'text-slate-900'">
                    {{ cat.code }}
                  </span>
                </td>
                <td class="py-4 px-6 text-xs font-bold text-left" :class="cat.status === 'paused' ? 'text-slate-400 line-through' : 'text-slate-900'">
                  {{ cat.name }}
                </td>
                <td 
                  class="py-4 px-6 text-xs max-w-xs truncate text-left" 
                  :class="cat.status === 'paused' ? 'text-slate-400 line-through' : 'text-slate-500'"
                  :title="cat.description"
                >
                  {{ cat.description }}
                </td>
                <td class="py-4 px-6 text-xs font-bold text-left" :class="cat.status === 'paused' ? 'text-slate-400' : 'text-slate-900'">
                  {{ cat.productCount }} sản phẩm
                </td>
                <td class="py-4 px-6 text-left">
                  <span 
                    v-if="cat.status === 'active'"
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
                      :checked="cat.status === 'active'" 
                      @change="toggleCategoryActive(cat)" 
                      class="sr-only peer"
                    >
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </td>
                <td class="py-4 px-6 text-right">
                  <div class="flex items-center gap-2 justify-end">
                    <button 
                      @click="openEditModal(cat)"
                      class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                    >
                      Chỉnh sửa
                    </button>
                    <button 
                      @click="deleteCategory(cat.code)" 
                      class="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center border-none transition-all cursor-pointer"
                    >
                      <i class="ti ti-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="sortedAndFilteredCategories.length === 0">
                <td colspan="7" class="text-center py-12 text-slate-400 text-sm">
                  Không tìm thấy danh mục nào phù hợp.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Pagination -->
        <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">Hiển thị 1 - {{ sortedAndFilteredCategories.length }} của {{ sortedAndFilteredCategories.length }} danh mục</span>
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

    <!-- Add/Edit Category Modal -->
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
            <h3 class="font-display text-lg font-bold text-slate-950">{{ isEditMode ? 'Chỉnh sửa Danh mục 📁' : 'Thêm Danh mục mới 📁' }}</h3>
            <p class="text-xs text-slate-400 mt-0.5">{{ isEditMode ? 'Cập nhật thông tin chi tiết của danh mục sản phẩm.' : 'Tạo mới phân loại danh mục sản phẩm của hệ thống.' }}</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form @submit.prevent="saveCategory" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- Code -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mã code danh mục *</label>
            <input 
              type="text" 
              v-model="formCategory.code" 
              placeholder="Ví dụ: CAT-GIAYTUYET" 
              required 
              :readonly="isEditMode"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none uppercase font-mono focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-500"
              :class="isEditMode ? 'bg-slate-100 text-slate-500' : ''"
            >
          </div>

          <!-- Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên danh mục *</label>
            <input 
              type="text" 
              v-model="formCategory.name" 
              placeholder="Ví dụ: Giày Đi Tuyết" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-semibold"
            >
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mô tả danh mục *</label>
            <textarea 
              v-model="formCategory.description" 
              placeholder="Ví dụ: Dòng sản phẩm giày chuyên dụng đi trên tuyết và giữ ấm..." 
              required 
              rows="3" 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-semibold resize-none"
            ></textarea>
          </div>

          <!-- Status select (only in edit mode) -->
          <div v-if="isEditMode">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái danh mục *</label>
            <select 
              v-model="formCategory.status" 
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
              {{ isEditMode ? 'Lưu thay đổi' : 'Tạo danh mục' }}
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
      <div class="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm shrink-0">📁</div>
      <span>{{ toastMessage }}</span>
    </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const activeTab = ref('all')
const searchQuery = ref('')
const sortBy = ref('code')

const modalOpen = ref(false)
const isEditMode = ref(false)
const toastShow = ref(false)
const toastMessage = ref('')

const categories = ref([])

const formCategory = ref({
  code: '',
  name: '',
  description: '',
  status: 'active'
})

async function fetchCategories() {
  try {
    const response = await axiosInstance.get('/admincategory')
    if (response && response.success) {
      categories.value = response.data.map(cat => ({
        id: cat.id,
        code: cat.slug, // Map slug to code in the UI
        name: cat.name,
        description: cat.description || '',
        productCount: cat.total || 0,
        status: cat.status == 1 ? 'active' : 'paused'
      }))
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

onMounted(() => {
  fetchCategories()
})

const sortedAndFilteredCategories = computed(() => {
  let result = categories.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    let matchesTab = true
    if (activeTab.value === 'active') {
      matchesTab = c.status === 'active'
    } else if (activeTab.value === 'paused') {
      matchesTab = c.status === 'paused'
    }
    return matchesSearch && matchesTab
  })

  // Sort
  if (sortBy.value === 'code') {
    result.sort((a, b) => a.code.localeCompare(b.code))
  } else if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'productCount') {
    result.sort((a, b) => b.productCount - a.productCount)
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

async function toggleCategoryActive(cat) {
  try {
    const response = await axiosInstance.patch(`/toggle/${cat.id}`)
    cat.status = cat.status === 'active' ? 'paused' : 'active'
    const stateText = cat.status === 'active' ? 'Kích hoạt' : 'Khóa tạm thời'
    showToast(`Đã ${stateText} danh mục "${cat.name}" thành công!`)
  } catch (error) {
    console.error('Error toggling category status:', error)
  }
}

function openAddModal() {
  isEditMode.value = false
  formCategory.value = {
    code: '',
    name: '',
    description: '',
    status: 'active'
  }
  modalOpen.value = true
}

function openEditModal(cat) {
  isEditMode.value = true
  formCategory.value = { ...cat }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveCategory() {
  try {
    if (isEditMode.value) {
      const catToEdit = categories.value.find(c => c.code === formCategory.value.code)
      if (!catToEdit) return

      const payload = {
        name: formCategory.value.name,
        slug: formCategory.value.code.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formCategory.value.description,
        status: formCategory.value.status === 'active' ? 1 : 0
      }

      const response = await axiosInstance.post(`/category_edit/${catToEdit.id}`, payload)
      if (response && response.success) {
        showToast(`Đã cập nhật danh mục "${formCategory.value.name}"!`)
        await fetchCategories()
        modalOpen.value = false
      }
    } else {
      const slug = formCategory.value.code.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      const payload = {
        name: formCategory.value.name,
        slug: slug,
        description: formCategory.value.description
      }

      const response = await axiosInstance.post('/category_add', payload)
      if (response && response.success) {
        showToast(`Đã thêm danh mục mới "${formCategory.value.name}"!`)
        await fetchCategories()
        modalOpen.value = false
      }
    }
  } catch (error) {
    console.error('Error saving category:', error)
  }
}

async function deleteCategory(code) {
  const cat = categories.value.find(c => c.code === code)
  if (!cat) return
  
  Swal.fire({
    title: 'Xác nhận xóa danh mục?',
    text: `Hành động này sẽ xóa vĩnh viễn danh mục "${cat.name}" và không thể hoàn tác!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/category/${cat.id}`)
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa!',
            text: 'Danh mục đã được xóa bỏ khỏi hệ thống.',
            confirmButtonColor: '#FF4D00'
          })
          await fetchCategories()
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi xóa danh mục.'
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xóa danh mục',
          text: errorMsg,
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
