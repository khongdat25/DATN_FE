<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Mã giảm giá (Vouchers) 🎫</h1>
          <p class="text-sm text-slate-500 mt-1">Quản lý các chương trình khuyến mãi, tạo voucher giảm giá trực tiếp hoặc miễn phí vận chuyển.</p>
        </div>
        <div>
          <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
            <i class="ti ti-plus text-base"></i> Thêm Voucher mới
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
          Tất cả ({{ vouchers.length }})
        </button>
        <button 
          @click="activeTab = 'active'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'active' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đang hoạt động ({{ vouchers.filter(v => v.status === 'active').length }})
        </button>
        <button 
          @click="activeTab = 'upcoming'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'upcoming' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Sắp diễn ra ({{ vouchers.filter(v => v.status === 'upcoming').length }})
        </button>
        <button 
          @click="activeTab = 'expired'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'expired' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đã hết hạn ({{ vouchers.filter(v => v.status === 'expired').length }})
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
            placeholder="Tìm kiếm mã voucher, tên chương trình..." 
            class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800 font-semibold"
          >
        </div>

        <!-- Action filters -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <select v-model="filterType" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="all">Tất cả loại giảm</option>
            <option>Giảm theo phần trăm (%)</option>
            <option>Giảm số tiền cố định (đ)</option>
            <option>Miễn phí vận chuyển (Free ship)</option>
          </select>
        </div>
      </div>

      <!-- Vouchers Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÃ CODE VOUCHER</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TÊN CHƯƠNG TRÌNH</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">LOẠI GIẢM GIÁ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRỊ GIÁ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ĐƠN TỐI THIỂU</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ĐÃ DÙNG / TỔNG</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KÍCH HOẠT</th>
                <th class="py-4 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="v in filteredVouchers" 
                :key="v.code" 
                :class="[
                  'hover:bg-slate-50/30 transition-all font-medium',
                  v.status === 'expired' ? 'bg-slate-50/50 opacity-70' : ''
                ]"
              >
                <td class="py-4 px-6">
                  <span 
                    :class="[
                      'inline-block px-3 py-1.5 text-xs font-extrabold rounded-lg border border-dashed font-mono',
                      v.status === 'expired' ? 'text-slate-400 bg-slate-105 border-slate-300' : 'text-accent bg-orange-50/50 border-orange-200'
                    ]"
                  >
                    {{ v.code }}
                  </span>
                </td>
                <td 
                  class="py-4 px-6 text-xs font-semibold text-left"
                  :class="v.status === 'expired' ? 'text-slate-400 line-through' : 'text-slate-900'"
                >
                  {{ v.name }}
                </td>
                <td class="py-4 px-6 text-xs text-slate-500 text-left" :class="v.status === 'expired' ? 'line-through' : ''">
                  {{ v.type }}
                </td>
                <td class="py-4 px-6 text-xs font-bold text-slate-900 text-left" :class="v.status === 'expired' ? 'line-through' : ''">
                  {{ v.valueLabel }}
                </td>
                <td class="py-4 px-6 text-xs text-slate-700 text-left" :class="v.status === 'expired' ? 'line-through' : ''">
                  {{ formatCurrency(v.minOrder) }}
                </td>
                <td class="py-4 px-6 text-xs text-slate-505 text-left">
                  {{ v.used }} / {{ v.total }} lượt
                </td>
                <td class="py-4 px-6 text-left">
                  <span 
                    v-if="v.status === 'active'"
                    class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                  >
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đang hoạt động
                  </span>
                  <span 
                    v-else-if="v.status === 'upcoming'"
                    class="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                  >
                    <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Sắp diễn ra
                  </span>
                  <span 
                    v-else
                    class="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                  >
                    <span class="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Đã hết lượt
                  </span>
                </td>
                <td class="py-4 px-6 text-left">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      :checked="v.status === 'active'" 
                      :disabled="v.status === 'expired'"
                      @change="toggleVoucherActive(v)" 
                      class="sr-only peer"
                    >
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent peer-disabled:opacity-50"></div>
                  </label>
                </td>
                <td class="py-4 px-6 text-right">
                  <div class="flex items-center gap-2 justify-end">
                    <button 
                      @click="openEditModal(v)"
                      class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                    >
                      Chỉnh sửa
                    </button>
                    <button 
                      @click="deleteVoucher(v.code)" 
                      class="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center border-none transition-all cursor-pointer"
                    >
                      <i class="ti ti-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredVouchers.length === 0">
                <td colspan="9" class="text-center py-12 text-slate-400 text-sm">
                  Không tìm thấy mã giảm giá nào phù hợp.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Pagination -->
        <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">Hiển thị 1 - {{ filteredVouchers.length }} của {{ filteredVouchers.length }} voucher</span>
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

    <!-- Add/Edit Voucher Modal -->
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
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden z-10 transition-all scale-100 text-left">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950">{{ isEditMode ? 'Chỉnh sửa Mã giảm giá 🎫' : 'Thêm Mã giảm giá mới 🎫' }}</h3>
            <p class="text-xs text-slate-400 mt-0.5">{{ isEditMode ? 'Cập nhật thông tin chi tiết và điều kiện áp dụng của voucher.' : 'Tạo chương trình chiết khấu sản phẩm hoặc miễn phí vận chuyển.' }}</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form @submit.prevent="saveVoucher" class="flex-1 overflow-y-auto p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <!-- Code -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">MÃ CODE *</label>
              <input 
                type="text" 
                v-model="formVoucher.code" 
                placeholder="Ví dụ: SALEHE2026" 
                required 
                :readonly="isEditMode"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all uppercase font-mono font-bold text-slate-800 disabled:bg-slate-100 disabled:text-slate-500"
                :class="isEditMode ? 'bg-slate-100 text-slate-550' : ''"
              >
            </div>
            <!-- Type -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">LOẠI GIẢM GIÁ *</label>
              <select 
                v-model="formVoucher.type" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all cursor-pointer font-semibold text-slate-700"
              >
                <option value="Giảm theo %">Giảm theo %</option>
                <option value="Khấu trừ tiền hàng">Giảm số tiền cố định (đ)</option>
                <option value="Miễn phí Ship">Miễn phí vận chuyển (Free ship)</option>
              </select>
            </div>
          </div>

          <!-- Program Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên chương trình *</label>
            <input 
              type="text" 
              v-model="formVoucher.name" 
              placeholder="Ví dụ: Ưu đãi chào hè giảm 15% tổng tiền" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
            >
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Value -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Giá trị giảm *</label>
              <input 
                type="text" 
                v-model="formVoucher.valueLabel" 
                placeholder="Ví dụ: 10% hoặc 50.000đ" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-850"
              >
            </div>
            <!-- Min Order -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đơn tối thiểu *</label>
              <input 
                type="number" 
                v-model="formVoucher.minOrder" 
                placeholder="Ví dụ: 300000" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
              >
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Total usage -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng số lượt dùng *</label>
              <input 
                type="number" 
                v-model="formVoucher.total" 
                placeholder="Ví dụ: 100" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
              >
            </div>
            <!-- Max Discount -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Giảm tối đa (nếu giảm %)</label>
              <input 
                type="number" 
                v-model="formVoucher.maxDiscount" 
                placeholder="Ví dụ: 50000" 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
              >
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Start Date -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày bắt đầu *</label>
              <input 
                type="date" 
                v-model="formVoucher.startDate" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all cursor-pointer font-semibold text-slate-700"
              >
            </div>
            <!-- End Date -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày hết hạn *</label>
              <input 
                type="date" 
                v-model="formVoucher.endDate" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all cursor-pointer font-semibold text-slate-700"
              >
            </div>
          </div>

          <!-- Status select (only in edit mode) -->
          <div v-if="isEditMode">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái voucher *</label>
            <select 
              v-model="formVoucher.status" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <option value="active">Đang hoạt động</option>
              <option value="upcoming">Sắp diễn ra</option>
              <option value="expired">Đã hết hạn/Khóa</option>
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
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all border-none cursor-pointer font-display"
            >
              {{ isEditMode ? 'Lưu thay đổi' : 'Kích hoạt mã' }}
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

const activeTab = ref('all')
const searchQuery = ref('')
const filterType = ref('all')

const modalOpen = ref(false)
const isEditMode = ref(false)

const vouchers = ref([])

onMounted(() => {
  loadVouchers()
})

async function loadVouchers() {
  try {
    const response = await axiosInstance.get('/admin/vouchers')
    if (response.success && response.data) {
      vouchers.value = response.data.map(v => ({
        id: v.id,
        code: v.code,
        name: v.name,
        type: v.type === 'percent' ? 'Giảm theo %' : (v.type === 'fixed' ? 'Giảm số tiền cố định (đ)' : 'Miễn phí vận chuyển (Free ship)'),
        valueLabel: v.type === 'percent' 
          ? `${v.value}% ${v.max_discount ? `(Tối đa ${v.max_discount/1000}K)` : ''}` 
          : `${v.value.toLocaleString('vi-VN')}₫`,
        rawType: v.type,
        rawValue: v.value,
        minOrder: v.min_order,
        used: v.used_count,
        total: v.total_usage,
        maxDiscount: v.max_discount,
        startDate: v.start_date,
        endDate: v.end_date,
        status: v.status
      }))
    }
  } catch (error) {
    console.error('Failed to load vouchers:', error)
  }
}

const formVoucher = ref({
  code: '',
  name: '',
  type: 'Giảm theo %',
  valueLabel: '',
  minOrder: 300000,
  used: 0,
  total: 100,
  maxDiscount: 50000,
  startDate: '',
  endDate: '',
  status: 'active'
})

const filteredVouchers = computed(() => {
  return vouchers.value.filter(v => {
    const matchesSearch = v.code.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          v.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    let matchesTab = true
    if (activeTab.value === 'active') {
      matchesTab = v.status === 'active'
    } else if (activeTab.value === 'upcoming') {
      matchesTab = v.status === 'upcoming'
    } else if (activeTab.value === 'expired') {
      matchesTab = v.status === 'expired'
    }

    let matchesType = true
    if (filterType.value !== 'all') {
      matchesType = v.type.includes(filterType.value) || (filterType.value.includes('phần trăm') && v.type.includes('%')) || (filterType.value.includes('tiền cố định') && v.type.includes('số tiền cố định')) || (filterType.value.includes('vận chuyển') && v.type.includes('vận chuyển'))
    }

    return matchesSearch && matchesTab && matchesType
  })
})

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

async function toggleVoucherActive(v) {
  const newStatus = v.status === 'active' ? 'expired' : 'active'
  const stateText = newStatus === 'active' ? 'Kích hoạt' : 'Hủy bỏ/Khóa'
  
  try {
    await axiosInstance.put(`/admin/vouchers/${v.id}`, {
      status: newStatus
    })
    v.status = newStatus
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: `Đã ${stateText} mã giảm giá ${v.code}!`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })
  } catch (error) {
    Swal.fire('Lỗi', 'Không thể cập nhật trạng thái', 'error')
  }
}

function openAddModal() {
  isEditMode.value = false
  formVoucher.value = {
    code: '',
    name: '',
    type: 'Giảm theo %',
    valueLabel: '',
    minOrder: 0,
    used: 0,
    total: 100,
    maxDiscount: 0,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    status: 'active'
  }
  modalOpen.value = true
}

function openEditModal(v) {
  isEditMode.value = true
  formVoucher.value = { ...v }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveVoucher() {
  let rawType = 'percent'
  if (formVoucher.value.type === 'Giảm theo %') rawType = 'percent'
  else if (formVoucher.value.type === 'Miễn phí Ship') rawType = 'free_ship'
  else rawType = 'fixed'

  const payload = {
    code: formVoucher.value.code.toUpperCase(),
    name: formVoucher.value.name,
    type: rawType,
    value: parseFloat(formVoucher.value.valueLabel) || 0, // In UI valueLabel acts as the actual value input currently
    min_order: formVoucher.value.minOrder,
    total_usage: formVoucher.value.total,
    max_discount: formVoucher.value.maxDiscount || null,
    start_date: formVoucher.value.startDate,
    end_date: formVoucher.value.endDate,
    status: formVoucher.value.status
  }

  if (isEditMode.value) {
    try {
      await axiosInstance.put(`/admin/vouchers/${formVoucher.value.id}`, payload)
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công!',
        text: 'Mã giảm giá đã được cập nhật thông tin.',
        confirmButtonColor: '#FF4D00'
      })
      loadVouchers()
    } catch (error) {
      Swal.fire('Lỗi', error.response?.data?.message || 'Có lỗi xảy ra', 'error')
    }
  } else {
    try {
      await axiosInstance.post('/admin/vouchers', payload)
      Swal.fire({
        icon: 'success',
        title: 'Tạo voucher thành công!',
        text: 'Mã giảm giá mới đã được phát hành.',
        confirmButtonColor: '#FF4D00'
      })
      loadVouchers()
    } catch (error) {
      Swal.fire('Lỗi', error.response?.data?.message || 'Có lỗi xảy ra khi tạo', 'error')
    }
  }
  modalOpen.value = false
}

function deleteVoucher(code) {
  const v = vouchers.value.find(v => v.code === code)
  Swal.fire({
    title: 'Xác nhận xóa Voucher?',
    text: `Hành động này sẽ gỡ bỏ hoàn toàn mã giảm giá "${code}" khỏi hệ thống!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/admin/vouchers/${v.id}`)
        Swal.fire({
          icon: 'success',
          title: 'Đã xóa!',
          text: 'Mã giảm giá đã bị gỡ bỏ.',
          confirmButtonColor: '#FF4D00'
        })
        loadVouchers()
      } catch (error) {
        Swal.fire('Lỗi', 'Không thể xóa', 'error')
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
