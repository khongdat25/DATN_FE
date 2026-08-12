<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      @click.self="close"
    >
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-up">
        
        <!-- Modal Header -->
        <div class="px-6 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between shrink-0 shadow-md">
          <div class="flex items-center gap-3 text-left">
            <div class="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl">
              <i class="ti ti-truck-delivery"></i>
            </div>
            <div>
              <h3 class="font-display font-bold text-lg leading-tight">Theo Dõi Vận Đơn GHN Real-time</h3>
              <p class="text-xs text-orange-100 font-medium">Cập nhật vị trí & chặng giao hàng từ Giao Hàng Nhanh</p>
            </div>
          </div>
          <button 
            @click="close" 
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors border-none cursor-pointer"
          >
            <i class="ti ti-x"></i>
          </button>
        </div>

        <!-- Modal Content Scrollable -->
        <div class="p-6 overflow-y-auto space-y-6 flex-1 text-left">
          
          <!-- Loading State -->
          <div v-if="loading" class="py-12 text-center space-y-3">
            <div class="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p class="text-xs font-semibold text-slate-500">Đang truy vấn vị trí real-time từ API GHN...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-2">
            <i class="ti ti-alert-circle text-red-500 text-3xl"></i>
            <p class="text-sm font-bold text-red-800">{{ error }}</p>
            <button @click="fetchTracking" class="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl border-none cursor-pointer">Thử lại</button>
          </div>

          <template v-else-if="trackingData">
            <!-- Order summary card -->
            <div class="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400 block">Mã vận đơn GHN</span>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="font-mono font-extrabold text-base text-slate-900">{{ trackingData.order_code }}</span>
                  <button @click="copyCode(trackingData.order_code)" class="text-xs text-orange-600 font-bold hover:underline border-none bg-transparent cursor-pointer">
                    <i class="ti ti-copy"></i> Sao chép
                  </button>
                </div>
              </div>

              <div v-if="trackingData.order_id">
                <span class="text-[10px] uppercase font-bold text-slate-400 block">Mã đơn hàng</span>
                <span class="font-semibold text-sm text-slate-800">{{ trackingData.order_id }}</span>
              </div>

              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400 block">Dự kiến giao hàng</span>
                <span class="font-bold text-sm text-orange-600">📅 {{ trackingData.expected_delivery_date }}</span>
              </div>
            </div>

            <!-- Current status banner -->
            <div class="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 flex items-start gap-3.5 shadow-2xs">
              <div class="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl shrink-0 shadow-sm animate-pulse">
                <i class="ti ti-radar"></i>
              </div>
              <div class="space-y-1 flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-extrabold uppercase tracking-wider text-orange-800">Vị trí & Trạng thái hiện tại</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-200 text-orange-950 font-mono">REAL-TIME</span>
                </div>
                <h4 class="font-bold text-slate-900 text-base leading-snug">{{ trackingData.status_text }}</h4>
                <p class="text-xs text-slate-600 font-medium flex items-center gap-1">
                  <i class="ti ti-map-pin text-orange-600 text-sm"></i>
                  <span>{{ trackingData.current_location }}</span>
                </p>
              </div>
            </div>

            <!-- Visual Stepper Progress Bar -->
            <div class="py-2">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-4">Tiến trình vận chuyển (5 Chặng)</span>
              <div class="relative flex items-center justify-between">
                <!-- Track Line background -->
                <div class="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1.5 bg-slate-200 rounded-full z-0"></div>
                <!-- Track Line active fill -->
                <div 
                  class="absolute left-4 top-1/2 -translate-y-1/2 h-1.5 bg-orange-500 rounded-full z-0 transition-all duration-500"
                  :style="{ width: getStepPercent(trackingData.status) + '%' }"
                ></div>

                <!-- Steps -->
                <div v-for="(step, idx) in steps" :key="idx" class="relative z-10 flex flex-col items-center gap-1.5">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm',
                      isStepActive(step.key, trackingData.status) 
                        ? 'bg-orange-500 text-white ring-4 ring-orange-100 scale-110' 
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    ]"
                  >
                    <i :class="['ti', step.icon]"></i>
                  </div>
                  <span :class="['text-[10px] font-bold whitespace-nowrap', isStepActive(step.key, trackingData.status) ? 'text-orange-600' : 'text-slate-400']">
                    {{ step.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Timeline Checkpoints Log -->
            <div class="space-y-3 pt-2">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Lịch sử mốc thời gian luân chuyển kho GHN</span>
              <div class="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-4 max-h-72 overflow-y-auto">
                <div 
                  v-for="(cp, idx) in trackingData.checkpoints" 
                  :key="idx" 
                  class="relative pl-6 pb-4 last:pb-0 border-l-2 border-slate-200 last:border-l-0"
                >
                  <!-- Bullet -->
                  <div class="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-white border-4 border-orange-500 shadow-2xs"></div>
                  
                  <div class="space-y-1">
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-bold text-slate-900">{{ cp.note }}</span>
                      <span class="text-[11px] font-semibold text-slate-400 font-mono">⏱️ {{ cp.time }}</span>
                    </div>
                    <p class="text-xs text-slate-600 font-medium flex items-center gap-1">
                      <i class="ti ti-building-warehouse text-slate-400 text-sm"></i>
                      <span>{{ cp.location }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>

        </div>

        <!-- Modal Footer -->
        <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <a 
            v-if="trackingData?.tracking_url" 
            :href="trackingData.tracking_url" 
            target="_blank" 
            class="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
          >
            <i class="ti ti-external-link"></i> Mở trang tra cứu chính thức GHN.vn →
          </a>
          <div v-else></div>
          
          <button 
            @click="close" 
            class="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl border-none cursor-pointer transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { trackGHNOrder } from '@/api/ghn.js'
import Swal from 'sweetalert2'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  orderCode: { type: String, default: '' }
})

const emit = defineEmits(['close'])

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

async function fetchTracking() {
  if (!props.orderCode) return
  loading.value = true
  error.value = ''
  trackingData.value = null
  try {
    const res = await trackGHNOrder(props.orderCode)
    if (res && res.data && res.data.success) {
      trackingData.value = res.data
    } else if (res && res.success) {
      trackingData.value = res
    } else {
      error.value = res?.message || 'Không tìm thấy thông tin vận đơn GHN.'
    }
  } catch (err) {
    console.error('Error fetching tracking:', err)
    error.value = err.response?.data?.message || 'Lỗi khi kết nối tới API tra cứu GHN.'
  } finally {
    loading.value = false
  }
}

function copyCode(code) {
  if (!code) return
  navigator.clipboard.writeText(code)
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title: 'Đã sao chép mã vận đơn!',
    timer: 2000,
    showConfirmButton: false
  })
}

function close() {
  emit('close')
}

watch(
  () => [props.isOpen, props.orderCode],
  ([newOpen, newCode]) => {
    if (newOpen && newCode) {
      fetchTracking()
    }
  },
  { immediate: true }
)
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleUp {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
