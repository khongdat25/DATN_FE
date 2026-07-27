<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Quản lý Khách hàng</h1>
          <p class="text-sm text-slate-500 mt-1">Quản lý danh sách người dùng đăng ký tài khoản, giám sát đơn mua hàng và kiểm soát quyền hoạt động.</p>
        </div>
        <div>
          <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
            <i class="ti ti-plus text-base"></i> Thêm Khách hàng mới
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
          Tất cả khách hàng ({{ totalUsers }})
        </button>
        <button 
          @click="activeTab = 'active'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'active' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đang hoạt động
        </button>
        <button 
          @click="activeTab = 'blocked'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'blocked' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đã khóa
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
            placeholder="Tìm tên khách hàng, email, SĐT..." 
            class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800 font-semibold"
          >
        </div>

        <!-- Action filters -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <select v-model="selectedRole" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="all">Tất cả vai trò</option>
            <option value="Quản trị viên">Quản trị viên</option>
            <option value="Khách hàng">Khách hàng</option>
          </select>
          <select v-model="sortBy" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="registeredDate">Sắp xếp: Ngày đăng ký</option>
          </select>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHÁCH HÀNG</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">THÔNG TIN LIÊN HỆ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">VAI TRÒ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">NGÀY ĐĂNG KÝ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI TÀI KHOẢN</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">QUYỀN HOẠT ĐỘNG</th>
                <th class="py-4 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="user in sortedAndFilteredUsers" 
                :key="user.id" 
                class="hover:bg-slate-50/30 transition-all font-medium"
              >
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div :class="['w-10 h-10 font-bold text-sm rounded-xl flex items-center justify-center shrink-0', getAvatarClass(user.role)]">
                      {{ getInitials(user.name) }}
                    </div>
                    <div class="text-left">
                      <span class="block text-xs font-bold text-slate-900">{{ user.name }}</span>
                      <span class="text-[9px] font-bold text-slate-400 tracking-wider">ID: {{ user.id }}</span>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-left">
                  <span class="block text-xs text-slate-800 font-semibold">{{ user.email }}</span>
                  <span class="text-[10px] text-slate-400">SĐT: <span>{{ user.phone || 'N/A' }}</span></span>
                </td>
                <td class="py-4 px-6 text-left">
                  <span 
                    v-if="user.role === 'Quản trị viên'" 
                    class="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-rose-100"
                  >
                    <i class="ti ti-shield text-xs"></i> <span>Quản trị viên</span>
                  </span>
                  <span 
                    v-else-if="user.role === 'Nhân viên'" 
                    class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-100"
                  >
                    <i class="ti ti-user-cog text-xs"></i> <span>Nhân viên</span>
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-100"
                  >
                    <i class="ti ti-user text-xs"></i> <span>Khách hàng</span>
                  </span>
                </td>
                <td class="py-4 px-6 text-xs text-slate-500 text-left">{{ user.registeredDate }}</td>
                <td class="py-4 px-6 text-left">
                  <span 
                    v-if="user.status === 'active'" 
                    class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                  >
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> <span>Hoạt động</span>
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                  >
                    <span class="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> <span>Đã khóa</span>
                  </span>
                </td>
                <td class="py-4 px-6 text-left">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      :checked="user.status === 'active'" 
                      @change="toggleUserStatus(user)" 
                      class="sr-only peer"
                    >
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </td>
                <td class="py-4 px-6 text-right">
                  <div class="flex items-center gap-2 justify-end">
                    <button 
                      @click="openEditModal(user)"
                      class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="sortedAndFilteredUsers.length === 0">
                <td colspan="9" class="text-center py-12 text-slate-400 text-sm">
                  Không tìm thấy khách hàng nào phù hợp.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Pagination -->
        <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">
            Hiển thị {{ totalUsers === 0 ? 0 : (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, totalUsers) }} của {{ totalUsers }} khách hàng
          </span>
          <div class="flex items-center gap-1.5">
            <button 
              @click="changePage(currentPage - 1)" 
              :disabled="currentPage === 1" 
              class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="ti ti-chevron-left text-sm"></i>
            </button>
            <span class="text-xs font-bold text-slate-700 px-2">Trang {{ currentPage }} / {{ lastPage }}</span>
            <button 
              @click="changePage(currentPage + 1)" 
              :disabled="currentPage === lastPage || lastPage === 0" 
              class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="ti ti-chevron-right text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div 
      v-if="modalOpen" 
      class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick text-left"
    >
      <!-- Modal Backdrop -->
      <div 
        @click="closeModal" 
        class="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      <!-- Modal Container -->
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden z-10 transition-all scale-100">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-955 text-slate-950">
              {{ isEditMode ? 'Chỉnh sửa Vai trò 👥' : 'Thêm Khách hàng mới 👥' }}
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              {{ isEditMode ? 'Cập nhật phân quyền và vai trò tài khoản thành viên.' : 'Khởi tạo nhanh tài khoản thành viên SaigonShoes.' }}
            </p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form @submit.prevent="saveUser" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Họ và tên *</label>
            <input 
              type="text" 
              v-model="formUser.name" 
              placeholder="Ví dụ: Nguyễn Văn A" 
              required 
              :readonly="isEditMode"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-semibold"
              :class="isEditMode ? 'bg-slate-100 text-slate-500 cursor-not-allowed font-semibold' : ''"
            >
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email tài khoản *</label>
            <input 
              type="email" 
              v-model="formUser.email" 
              placeholder="Ví dụ: nguyenvana@gmail.com" 
              required 
              :readonly="isEditMode"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-semibold"
              :class="isEditMode ? 'bg-slate-100 text-slate-500 cursor-not-allowed font-semibold' : ''"
            >
          </div>

          <!-- Phone (Only when adding new user) -->
          <div v-if="!isEditMode">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Số điện thoại *</label>
            <input 
              type="tel" 
              v-model="formUser.phone" 
              placeholder="Ví dụ: 0912 345 678" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800 font-semibold"
            >
          </div>

          <!-- Role -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vai trò tài khoản *</label>
            <select 
              v-model="formUser.role" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <option value="Khách hàng">Khách hàng</option>
              <option value="Quản trị viên">Quản trị viên</option>
            </select>
          </div>

          <!-- Password (Only when adding new user) -->
          <div v-if="!isEditMode">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mật khẩu khởi tạo *</label>
            <input 
              type="password" 
              v-model="formUser.password" 
              placeholder="••••••••" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 text-slate-800"
            >
          </div>

          <!-- Footer buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button 
              type="button" 
              @click="closeModal" 
              class="bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all border-none cursor-pointer font-display"
            >
              {{ isEditMode ? 'Lưu thay đổi' : 'Tạo tài khoản' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Floating Toast Notification System -->
    <div 
      v-if="toastShow" 
      class="fixed bottom-5 right-5 z-1000 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-fade-in-quick"
    >
      <div class="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm shrink-0">
        {{ toastEmoji }}
      </div>
      <span>{{ toastMessage }}</span>
    </div>
  
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const activeTab = ref('all')
const searchQuery = ref('')
const sortBy = ref('registeredDate')

const modalOpen = ref(false)
const isEditMode = ref(false)

const toastShow = ref(false)
const toastMessage = ref('')
const toastEmoji = ref('👥')

const users = ref([])

const currentPage = ref(1)
const lastPage = ref(1)
const totalUsers = ref(0)
const perPage = ref(10)
const selectedRole = ref('all')

const formUser = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  role: 'Khách hàng',
  password: '',
  status: 'active'
})

const sortedAndFilteredUsers = computed(() => {
  return users.value
})

// Watch search, role, tab, and reload with 400ms debounce for search query
let searchTimeout = null
watch(searchQuery, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchUsers()
  }, 400)
})

watch([activeTab, selectedRole, sortBy], () => {
  currentPage.value = 1
  fetchUsers()
})

function changePage(page) {
  if (page >= 1 && page <= lastPage.value) {
    currentPage.value = page
    fetchUsers()
  }
}

function getInitials(name) {
  if (!name) return 'US'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function getAvatarClass(role) {
  if (role === 'Quản trị viên') return 'bg-orange-100 text-accent'
  return 'bg-rose-100 text-rose-500'
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

function showToast(message, emoji = '👥') {
  toastMessage.value = message
  toastEmoji.value = emoji
  toastShow.value = true
  setTimeout(() => {
    toastShow.value = false
  }, 3000)
}

// Fetch users from API
async function fetchUsers() {
  try {
    const params = {
      page: currentPage.value,
      per_page: perPage.value,
      search: searchQuery.value,
      status: activeTab.value,
      role: selectedRole.value,
    }
    const response = await axiosInstance.get('/admin/users', { params })
    if (response && response.success && response.data) {
      users.value = response.data.data
      currentPage.value = response.data.current_page
      lastPage.value = response.data.last_page
      totalUsers.value = response.data.total
      perPage.value = response.data.per_page
    }
  } catch (error) {
    console.error('Error fetching users from API:', error)
  }
}

onMounted(() => {
  fetchUsers()
})

async function toggleUserStatus(user) {
  const previousStatus = user.status
  const targetStatus = user.status === 'active' ? 'blocked' : 'active'
  
  // Set temporary visual state
  user.status = targetStatus
  
  try {
    const response = await axiosInstance.put(`/admin/users/${user.id}/status`, {
      status: targetStatus
    })
    if (response && response.success) {
      if (targetStatus === 'active') {
        showToast(`Đã mở khóa hoạt động tài khoản: ${user.name}! 🟢`, '👥')
      } else {
        showToast(`Đã khóa quyền truy cập của: ${user.name}! 🔴`, '🔒')
      }
    } else {
      user.status = previousStatus
    }
  } catch (error) {
    user.status = previousStatus
    console.error('Error toggling user status:', error)
  }
}

function openAddModal() {
  isEditMode.value = false
  formUser.value = {
    id: '',
    name: '',
    email: '',
    phone: '',
    role: 'Khách hàng',
    password: '',
    status: 'active'
  }
  modalOpen.value = true
}

function openEditModal(user) {
  isEditMode.value = true
  formUser.value = { ...user }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveUser() {
  if (isEditMode.value) {
    try {
      const response = await axiosInstance.put(`/admin/users/${formUser.value.id}`, {
        role: formUser.value.role
      })
      if (response && response.success) {
        showToast(`Đã thay đổi quyền hạn của ${formUser.value.name} thành ${formUser.value.role}!`, '👥')
        fetchUsers()
        modalOpen.value = false
      }
    } catch (e) {
      console.error('Error updating user role:', e)
    }
  } else {
    try {
      const response = await axiosInstance.post('/admin/users', {
        name: formUser.value.name,
        email: formUser.value.email,
        phone: formUser.value.phone,
        role: formUser.value.role,
        password: formUser.value.password
      })
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Tạo tài khoản thành công!',
          text: `Thành viên mới ${formUser.value.name} đã được đăng ký.`,
          confirmButtonColor: '#FF4D00'
        })
        fetchUsers()
        modalOpen.value = false
      }
    } catch (e) {
      console.error('Error creating user:', e)
    }
  }
}

async function deleteUser(id) {
  const user = users.value.find(u => u.id === id)
  if (!user) return

  Swal.fire({
    title: 'Xác nhận xóa tài khoản?',
    text: `Hành động này sẽ xóa vĩnh viễn tài khoản của "${user.name}" và không thể hoàn tác!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/admin/users/${id}`)
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa!',
            text: 'Thành viên đã bị gỡ bỏ khỏi hệ thống.',
            confirmButtonColor: '#FF4D00'
          })
          fetchUsers()
        }
      } catch (e) {
        console.error('Error deleting user:', e)
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
