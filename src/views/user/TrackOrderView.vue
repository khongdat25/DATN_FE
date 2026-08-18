<template>
  
    <main class="py-12 min-h-[calc(100vh-72px-350px)] bg-slate-50 relative overflow-hidden text-left">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        
        <!-- Page Title & Header -->
        <div class="text-center max-w-xl mx-auto mb-10">
          <h1 class="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Theo Dõi Đơn Hàng</h1>
          <p class="text-slate-500 text-sm mt-2">Nhập mã đơn hàng (#SGS-xxx) hoặc mã vận đơn GHN để tra cứu vị trí thực tế của gói hàng.</p>
        </div>

        <!-- Search Box Card -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl mb-8">
          <form @submit.prevent="handleSearch" class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1 text-slate-400 focus-within:text-orange-500">
              <i class="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-xl"></i>
              <input 
                type="text" 
                v-model="searchCode" 
                placeholder="Ví dụ: #SGS-44 hoặc GY8L8RPH..." 
                required
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:font-normal placeholder:text-slate-400"
              >
            </div>
            <button 
              type="submit" 
              :disabled="loading"
              class="py-4 px-8 bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-base rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer border-none flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <i v-if="loading" class="ti ti-loader animate-spin text-xl"></i>
              <span v-else class="flex items-center gap-2">
                <i class="ti ti-radar"></i> Tra cứu ngay
              </span>
            </button>
          </form>
        </div>

        <!-- Result Loading State -->
        <div v-if="loading" class="bg-white p-12 rounded-3xl border border-slate-100 shadow-md text-center space-y-3">
          <div class="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-sm font-bold text-slate-600">Đang truy vấn dữ liệu vận chuyển Real-time từ GHN Express...</p>
        </div>

        <!-- Result Error State -->
        <div v-else-if="error" class="bg-white p-8 rounded-3xl border border-red-200 shadow-md text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mx-auto">
            <i class="ti ti-alert-circle"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-lg">Không tìm thấy mã vận đơn</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">{{ error }}</p>
        </div>

        <!-- Result Success State -->
        <div v-else-if="trackingData" class="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden space-y-6 p-6 sm:p-8">
          
          <!-- Header Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Mã vận đơn GHN</span>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="font-mono font-extrabold text-xl text-slate-900">{{ trackingData.order_code }}</span>
                <button @click="copyText(trackingData.order_code)" class="text-xs text-orange-600 font-bold hover:underline border-none bg-transparent cursor-pointer">
                  <i class="ti ti-copy"></i> Sao chép
                </button>
              </div>
            </div>

            <div v-if="trackingData.order_id">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Mã đơn hàng Shop</span>
              <span class="font-bold text-base text-slate-800">{{ trackingData.order_id }}</span>
            </div>

            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Dự kiến giao hàng</span>
              <span class="font-extrabold text-base text-orange-600">📅 {{ trackingData.expected_delivery_date }}</span>
            </div>
          </div>

          <!-- Current Location Highlight Card -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-2xl shrink-0">
              <i class="ti ti-radar"></i>
            </div>
            <div class="space-y-1 flex-1">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-orange-100">Vị trí & Trạng thái Real-time</span>
                <span class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">API LIVE</span>
              </div>
              <h3 class="font-display font-extrabold text-xl leading-snug">{{ trackingData.status_text }}</h3>
              <p class="text-xs text-orange-100 font-medium flex items-center gap-1.5 pt-0.5">
                <i class="ti ti-map-pin text-sm"></i>
                <span>{{ trackingData.current_location }}</span>
              </p>
            </div>
          </div>

          <!-- Stepper Progress Bar -->
          <div class="py-4">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-6">Tiến trình vận chuyển</span>
            <div class="relative flex items-center justify-between">
              <!-- Track Line bg -->
              <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-2 bg-slate-100 rounded-full z-0"></div>
              <!-- Track Line active -->
              <div 
                class="absolute left-6 top-1/2 -translate-y-1/2 h-2 bg-orange-500 rounded-full z-0 transition-all duration-500"
                :style="{ width: getStepPercent(trackingData.status) + '%' }"
              ></div>

              <!-- Steps -->
              <div v-for="(step, idx) in steps" :key="idx" class="relative z-10 flex flex-col items-center gap-2">
                <div 
                  :class="[
                    'w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all shadow-sm',
                    isStepActive(step.key, trackingData.status) 
                      ? 'bg-orange-500 text-white ring-4 ring-orange-100 scale-110' 
                      : 'bg-white border-2 border-slate-200 text-slate-400'
                  ]"
                >
                  <i :class="['ti', step.icon]"></i>
                </div>
                <span :class="['text-xs font-bold text-center max-w-[80px]', isStepActive(step.key, trackingData.status) ? 'text-orange-600' : 'text-slate-400']">
                  {{ step.label }}
                </span>
              </div>
            </div>
          </div>

          <!-- Receiver & Item info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <!-- Receiver -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Thông tin người nhận</span>
              <div class="text-xs font-semibold text-slate-800 space-y-1">
                <div><strong class="text-slate-900 font-bold">Người nhận:</strong> {{ trackingData.receiver?.name }} ({{ trackingData.receiver?.phone }})</div>
                <div><strong class="text-slate-900 font-bold">Địa chỉ giao:</strong> {{ trackingData.receiver?.address }}</div>
              </div>
            </div>

            <!-- Tracking Link -->
            <div class="p-4 bg-orange-50/80 border border-orange-200/80 rounded-2xl flex flex-col justify-between">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-orange-900 block">Hệ thống tra cứu GHN</span>
              <p class="text-xs text-orange-950 font-medium">Bạn cũng có thể mở trực tiếp trang tra cứu của Giao Hàng Nhanh.</p>
              <a 
                :href="trackingData.tracking_url" 
                target="_blank" 
                class="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:underline pt-2"
              >
                <i class="ti ti-external-link"></i> Mở trang GHN.vn →
              </a>
            </div>
          </div>

          <!-- Timeline Checkpoints -->
          <div class="space-y-4 pt-4 border-t border-slate-100">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Lịch sử mốc thời gian luân chuyển kho GHN</span>
            <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-6">
              <div 
                v-for="(cp, idx) in trackingData.checkpoints" 
                :key="idx" 
                class="relative pl-7 pb-6 last:pb-0 border-l-2 border-slate-200 last:border-l-0"
              >
                <!-- Bullet -->
                <div class="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-white border-4 border-orange-500 shadow-2xs"></div>
                
                <div class="space-y-1">
                  <div class="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span class="font-bold text-slate-900">{{ cp.note }}</span>
                    <span class="text-xs font-semibold text-slate-400 font-mono">⏱️ {{ cp.time }}</span>
                  </div>
                  <p class="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                    <i class="ti ti-building-warehouse text-slate-400 text-base"></i>
                    <span>{{ cp.location }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { trackGHNOrder } from '@/api/ghn.js'
import Swal from 'sweetalert2'

const route = useRoute()
const searchCode = ref('')
const loading = ref(false)
const error = ref('')
const trackingData = ref(null)

const steps = [
  { key: 'ready_to_pick', label: 'Khởi tạo', icon: 'ti-file-invoice' },
  { key: 'picking', label: 'GHN lấy hàng', icon: 'ti-package' },
  { key: 'storing', label: 'Qua kho tổng', icon: 'ti-building-warehouse' },
  { key: 'delivering', label: 'Đang đi giao', icon: 'ti-truck-delivery' },
  { key: 'delivered', label: 'Đã giao thành công', icon: 'ti-circle-check' }
]

const statusOrder = ['ready_to_pick', 'picking', 'storing', 'transporting', 'shipping', 'delivering', 'delivered']

function isStepActive(stepKey, currentStatus) {
  const currentIdx = statusOrder.indexOf(currentStatus)
  const stepIdx = statusOrder.indexOf(stepKey)
  if (currentStatus === 'shipping' || currentStatus === 'transporting') {
    if (stepKey === 'storing' || stepKey === 'picking' || stepKey === 'ready_to_pick') return true
  }
  if (currentIdx === -1) return stepKey === 'ready_to_pick'
  return stepIdx <= currentIdx
}

function getStepPercent(currentStatus) {
  if (currentStatus === 'delivered') return 100
  if (currentStatus === 'delivering') return 75
  if (currentStatus === 'shipping' || currentStatus === 'transporting' || currentStatus === 'storing') return 50
  if (currentStatus === 'picking') return 25
  return 10
}

async function fetchTracking(code) {
  if (!code) return
  loading.value = true
  error.value = ''
  trackingData.value = null
  try {
    const res = await trackGHNOrder(code)
    if (res && res.data && res.data.success) {
      trackingData.value = res.data
    } else if (res && res.success) {
      trackingData.value = res
    } else {
      error.value = res?.message || 'Không tìm thấy đơn hàng hoặc mã vận đơn.'
    }
  } catch (err) {
    console.error('Error tracking:', err)
    error.value = err.response?.data?.message || 'Không thể kết nối tới máy chủ tra cứu GHN.'
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  if (searchCode.value.trim()) {
    fetchTracking(searchCode.value.trim())
  }
}

function copyText(text) {
  if (!text) return
  navigator.clipboard.writeText(text)
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title: 'Đã sao chép!',
    timer: 1500,
    showConfirmButton: false
  })
}

onMounted(() => {
  if (route.query.code) {
    searchCode.value = route.query.code
    fetchTracking(route.query.code)
  }
})
</script>
