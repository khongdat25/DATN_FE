<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="text-left">
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Hộp thư liên hệ 📬</h1>
        <p class="text-sm text-slate-500 mt-1">Quản lý các tin nhắn đóng góp ý kiến, phản hồi, thắc mắc từ khách hàng và gửi email trả lời.</p>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <!-- Total Contacts Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div class="flex justify-between items-start">
          <div class="text-left">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng số liên hệ</p>
            <h3 class="text-2xl font-display font-extrabold text-slate-950 mt-2">{{ stats.total }} Tin nhắn</h3>
          </div>
          <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            <i class="ti ti-mail"></i>
          </div>
        </div>
        <p class="text-[10px] text-slate-400 mt-3 font-medium">Hộp thư đến từ biểu mẫu khách hàng</p>
      </div>

      <!-- Pending Contacts Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div class="flex justify-between items-start">
          <div class="text-left">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Chưa xử lý</p>
            <h3 class="text-2xl font-display font-extrabold text-amber-600 mt-2">{{ stats.pending }} Chờ duyệt</h3>
          </div>
          <div class="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            <i class="ti ti-clock"></i>
          </div>
        </div>
        <p class="text-[10px] text-amber-500 mt-3 font-semibold flex items-center gap-1">
          <i class="ti ti-alert-circle"></i> Cần phản hồi và chăm sóc khách hàng
        </p>
      </div>

      <!-- Processed Contacts Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div class="flex justify-between items-start">
          <div class="text-left">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Đã hoàn thành</p>
            <h3 class="text-2xl font-display font-extrabold text-emerald-600 mt-2">{{ stats.processed }} Đã xử lý</h3>
          </div>
          <div class="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            <i class="ti ti-mail-opened"></i>
          </div>
        </div>
        <p class="text-[10px] text-emerald-500 mt-3 font-semibold flex items-center gap-1">
          <i class="ti ti-circle-check"></i> Đã phản hồi đầy đủ cho khách hàng
        </p>
      </div>
    </div>

    <!-- Quick Filter Tabs -->
    <div class="flex border-b border-b-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap bg-white px-6 rounded-t-2xl border-t border-x border-slate-100 shadow-2xs">
      <button 
        @click="activeStatusTab = 'all'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeStatusTab === 'all' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Tất cả liên hệ
      </button>
      <button 
        @click="activeStatusTab = 'pending'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeStatusTab === 'pending' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Chưa xử lý
      </button>
      <button 
        @click="activeStatusTab = 'processed'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeStatusTab === 'processed' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Đã xử lý
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
          placeholder="Tìm kiếm theo tên, email, tiêu đề..." 
          class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800 font-semibold"
        >
      </div>
    </div>

    <!-- Contacts Table -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÃ TIN</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHÁCH HÀNG</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">SỐ ĐIỆN THOẠI</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TIÊU ĐỀ LIÊN HỆ</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">NGÀY GỬI</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
              <th class="py-4 px-6 w-24"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="c in contacts" 
              :key="c.id" 
              class="hover:bg-slate-50/30 transition-all font-medium"
            >
              <td class="py-4 px-6 text-xs font-bold text-slate-900 text-left">#CNT-{{ c.id }}</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 bg-orange-100 text-accent font-bold text-[10px] rounded-full flex items-center justify-center">
                    {{ getInitials(c.name) }}
                  </div>
                  <div class="text-left">
                    <span class="block text-xs font-semibold text-slate-800">{{ c.name }}</span>
                    <span class="text-[10px] text-slate-400">{{ c.email }}</span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-xs text-slate-600 text-left">
                <div class="flex items-center gap-1.5">
                  <span>{{ c.phone || 'Chưa cung cấp' }}</span>
                  <a 
                    v-if="c.phone" 
                    :href="`https://zalo.me/${cleanPhone(c.phone)}`" 
                    target="_blank" 
                    class="w-5 h-5 bg-blue-50 hover:bg-[#0068FF] hover:text-white text-[#0068FF] rounded-md flex items-center justify-center transition-colors cursor-pointer text-[10px]"
                    title="Liên hệ qua Zalo"
                  >
                    <i class="ti ti-brand-whatsapp text-xs"></i>
                  </a>
                </div>
              </td>
              <td class="py-4 px-6 text-xs text-slate-800 text-left font-semibold max-w-xs truncate">
                {{ c.subject || 'Không có tiêu đề' }}
              </td>
              <td class="py-4 px-6 text-xs text-slate-500 text-left">{{ formatDate(c.created_at) }}</td>
              <td class="py-4 px-6 text-left">
                <span 
                  v-if="c.status === 'processed'"
                  class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đã xử lý
                </span>
                <span 
                  v-else
                  class="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  <span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Chờ xử lý
                </span>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center gap-2 justify-end">
                  <button 
                    @click="openDetail(c)" 
                    class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                  >
                    Chi tiết
                  </button>
                  <button 
                    @click="deleteContact(c.id)" 
                    class="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center border-none transition-all cursor-pointer"
                  >
                    <i class="ti ti-trash text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="contacts.length === 0">
              <td colspan="7" class="text-center py-12 text-slate-400 text-xs font-semibold">
                Không tìm thấy thư liên hệ nào phù hợp.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Pagination -->
      <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-xs text-slate-400">
          Hiển thị {{ totalContacts === 0 ? 0 : (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, totalContacts) }} của {{ totalContacts }} liên hệ
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

    <!-- Detail Modal -->
    <div 
      v-if="modalOpen" 
      class="fixed inset-0 z-110 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in-quick"
    >
      <div class="bg-white border border-slate-150 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="ti ti-mail-opened text-accent text-lg"></i>
            <span class="font-display font-bold text-slate-800 text-sm uppercase tracking-wider">Chi Tiết Liên Hệ #CNT-{{ activeContact.id }}</span>
          </div>
          <button @click="modalOpen = false" class="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-650 transition-colors border-none cursor-pointer">
            <i class="ti ti-x text-base"></i>
          </button>
        </div>

        <!-- Modal Content (Scrollable) -->
        <div class="p-6 overflow-y-auto space-y-5 text-xs font-medium text-slate-700">
          <!-- Customer info grid -->
          <div class="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
            <div>
              <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Người gửi</span>
              <span class="text-slate-900 block mt-0.5 font-bold">{{ activeContact.name }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Số điện thoại</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="text-slate-900 font-bold">{{ activeContact.phone || 'Chưa cung cấp' }}</span>
                <a 
                  v-if="activeContact.phone" 
                  :href="`https://zalo.me/${cleanPhone(activeContact.phone)}`" 
                  target="_blank" 
                  class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 hover:bg-[#0068FF] hover:text-white text-[#0068FF] rounded-md transition-colors cursor-pointer text-[10px] font-bold"
                  title="Mở Chat Zalo"
                >
                  <i class="ti ti-brand-whatsapp text-xs"></i> Zalo
                </a>
              </div>
            </div>
            <div class="col-span-2">
              <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Email</span>
              <span class="text-slate-900 block mt-0.5 font-bold">{{ activeContact.email }}</span>
            </div>
          </div>

          <!-- Message details -->
          <div class="space-y-2">
            <div>
              <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Tiêu đề liên hệ</span>
              <span class="text-slate-900 block mt-0.5 font-semibold text-xs leading-relaxed">{{ activeContact.subject || 'Không có tiêu đề' }}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Nội dung tin nhắn</span>
              <div class="text-slate-800 block mt-1 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-xl font-medium max-h-48 overflow-y-auto whitespace-pre-wrap">
                {{ activeContact.message }}
              </div>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Thời gian gửi</span>
              <span class="text-slate-550 block mt-0.5 font-semibold">{{ formatDate(activeContact.created_at) }}</span>
            </div>
          </div>

          <!-- Quick reply area if pending -->
          <div v-if="activeContact.status === 'pending'" class="border-t border-dashed border-slate-200 pt-4 space-y-3.5">
            <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Viết email phản hồi trực tiếp</span>
            <div>
              <textarea 
                v-model="replyText"
                rows="4"
                placeholder="Nhập nội dung thư phản hồi đến email của khách hàng..."
                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-850 outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,77,0,0.06)] transition-all resize-none font-semibold leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button 
            @click="deleteContact(activeContact.id)" 
            class="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-200 transition-colors cursor-pointer font-display"
          >
            Xóa liên hệ
          </button>
          
          <div class="flex items-center gap-2">
            <!-- Mark as processed if pending -->
            <button 
              v-if="activeContact.status === 'pending'"
              @click="markProcessed(activeContact)"
              class="bg-blue-50 hover:bg-blue-500 hover:text-white text-blue-500 text-xs font-bold px-4 py-2.5 rounded-xl border border-blue-200 transition-colors cursor-pointer font-display"
            >
              Đánh dấu đã xử lý
            </button>

            <!-- Send email reply button -->
            <button 
              v-if="activeContact.status === 'pending'"
              @click="sendEmailResponse"
              :disabled="!replyText.trim()"
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl border-none transition-colors cursor-pointer font-display shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gửi phản hồi Email
            </button>
            
            <span 
              v-else 
              class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-100"
            >
              <i class="ti ti-circle-check text-base"></i> Đã hoàn thành
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const searchQuery = ref('')
const activeStatusTab = ref('all')
const contacts = ref([])
const currentPage = ref(1)
const lastPage = ref(1)
const totalContacts = ref(0)
const perPage = ref(15)

// Stats counting
const stats = reactive({
  total: 0,
  pending: 0,
  processed: 0
})

// Modal controls
const modalOpen = ref(false)
const activeContact = ref(null)
const replyText = ref('')

function getInitials(name) {
  if (!name) return 'US'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function cleanPhone(phone) {
  if (!phone) return ''
  return phone.replace(/\D/g, '')
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch (e) {
    return dateStr
  }
}

// Fetch stats separately for precise overall counts
async function fetchStats() {
  try {
    const [resAll, resPending, resProcessed] = await Promise.all([
      axiosInstance.get('/admin/contacts', { params: { limit: 1 } }),
      axiosInstance.get('/admin/contacts', { params: { limit: 1, status: 'pending' } }),
      axiosInstance.get('/admin/contacts', { params: { limit: 1, status: 'processed' } })
    ])
    
    if (resAll && resAll.success && resAll.data) {
      stats.total = resAll.data.total
    }
    if (resPending && resPending.success && resPending.data) {
      stats.pending = resPending.data.total
    }
    if (resProcessed && resProcessed.success && resProcessed.data) {
      stats.processed = resProcessed.data.total
    }
  } catch (error) {
    console.error('Error fetching contact stats:', error)
  }
}

// Fetch list of contacts with parameters
async function fetchContacts() {
  try {
    const params = {
      page: currentPage.value,
      limit: perPage.value,
      search: searchQuery.value,
    }
    
    if (activeStatusTab.value !== 'all') {
      params.status = activeStatusTab.value
    }
    
    const response = await axiosInstance.get('/admin/contacts', { params })
    if (response && response.success && response.data) {
      contacts.value = response.data.data
      currentPage.value = response.data.current_page
      lastPage.value = response.data.last_page
      totalContacts.value = response.data.total
    }
  } catch (error) {
    console.error('Error fetching contacts from API:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi tải dữ liệu',
      text: 'Không thể tải danh sách liên hệ từ máy chủ.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

// Watchers for immediate reload on tab/search changes
let searchTimeout = null
watch(searchQuery, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchContacts()
  }, 400)
})

watch(activeStatusTab, () => {
  currentPage.value = 1
  fetchContacts()
})

function changePage(page) {
  if (page >= 1 && page <= lastPage.value) {
    currentPage.value = page
    fetchContacts()
  }
}

// Modal open helper
function openDetail(contact) {
  activeContact.value = contact
  replyText.value = ''
  modalOpen.value = true
}

// Mark contact as processed
async function markProcessed(contact) {
  try {
    const response = await axiosInstance.put(`/admin/contacts/${contact.id}`, {
      status: 'processed'
    })
    
    if (response && response.success) {
      contact.status = 'processed'
      modalOpen.value = false
      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật!',
        text: 'Đã đánh dấu liên hệ này đã được xử lý thành công.',
        confirmButtonColor: '#FF4D00'
      })
      fetchContacts()
      fetchStats()
    }
  } catch (error) {
    console.error('Error updating contact status:', error)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: 'Không thể cập nhật trạng thái liên hệ.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

// Send email response via backend API
async function sendEmailResponse() {
  if (!replyText.value.trim()) return
  
  Swal.fire({
    title: 'Đang gửi phản hồi...',
    text: 'Hệ thống đang soạn thư và gửi đến khách hàng qua email...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  try {
    const response = await axiosInstance.put(`/admin/contacts/${activeContact.value.id}`, {
      status: 'processed',
      reply_content: replyText.value.trim()
    })
    
    if (response && response.success) {
      activeContact.value.status = 'processed'
      modalOpen.value = false
      Swal.fire({
        icon: 'success',
        title: 'Đã gửi phản hồi!',
        text: 'Hệ thống đã gửi nội dung thư phản hồi đến email ' + activeContact.value.email + ' của khách hàng.',
        confirmButtonColor: '#FF4D00'
      })
      fetchContacts()
      fetchStats()
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: error.response?.data?.message || 'Không thể gửi phản hồi và cập nhật trạng thái.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

// Delete contact message
function deleteContact(id) {
  Swal.fire({
    title: 'Xác nhận xóa liên hệ?',
    text: 'Hành động này sẽ gỡ bỏ vĩnh viễn thư liên hệ này khỏi hệ thống!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Xóa liên hệ!',
    cancelButtonText: 'Hủy bỏ'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/admin/contacts/${id}`)
        if (response && response.success) {
          modalOpen.value = false
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa thành công!',
            text: 'Dữ liệu liên hệ đã được dọn sạch khỏi cơ sở dữ liệu.',
            confirmButtonColor: '#FF4D00'
          })
          fetchContacts()
          fetchStats()
        }
      } catch (error) {
        console.error('Error deleting contact:', error)
        Swal.fire({
          icon: 'error',
          title: 'Thất bại',
          text: 'Không thể xóa tin nhắn liên hệ.',
          confirmButtonColor: '#FF4D00'
        })
      }
    }
  })
}

onMounted(() => {
  fetchContacts()
  fetchStats()
})
</script>

<style scoped>
.animate-fade-in-quick {
  animation: fadeInQuick 0.15s ease-out;
}

@keyframes fadeInQuick {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
