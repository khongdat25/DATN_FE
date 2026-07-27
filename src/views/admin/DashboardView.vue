<template>
  
    <div class="space-y-8">
      <!-- Welcome Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Xin chào, {{ adminName }}!</h1>
          <p class="text-sm text-slate-500 mt-1">Dưới đây là tổng quan hiệu suất kinh doanh của SaigonShoes hôm nay.</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer">
            <i class="ti ti-calendar text-base"></i> Hôm nay: {{ currentDateString }}
          </button>
          <button @click="downloadReport" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border-none">
            <i class="ti ti-download text-base"></i> Tải báo cáo
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Card Doanh thu -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">DOANH THU THÁNG NÀY</p>
              <h3 class="text-2xl font-display font-extrabold text-slate-950 mt-2">{{ formatCurrency(statsData.revenue) }}</h3>
            </div>
            <div class="w-12 h-12 bg-orange-50 text-accent rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i class="ti ti-coin"></i>
            </div>
          </div>
          <div class="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-600">
            <span class="bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5"><i class="ti ti-trending-up"></i> +12.5%</span>
            <span class="text-slate-400 font-medium">so với tháng trước</span>
          </div>
        </div>

        <!-- Card Đơn hàng -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">ĐƠN HÀNG HOÀN THÀNH</p>
              <h3 class="text-2xl font-display font-extrabold text-slate-950 mt-2">{{ statsData.orders }} Đơn</h3>
            </div>
            <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i class="ti ti-shopping-cart"></i>
            </div>
          </div>
          <div class="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-600">
            <span class="bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5"><i class="ti ti-trending-up"></i> +8.0%</span>
            <span class="text-slate-400 font-medium">đã hoàn tất thanh toán</span>
          </div>
        </div>

        <!-- Card Khách hàng -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">THÀNH VIÊN KHÁCH HÀNG</p>
              <h3 class="text-2xl font-display font-extrabold text-slate-950 mt-2">{{ statsData.customers }} Tài khoản</h3>
            </div>
            <div class="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i class="ti ti-user-plus"></i>
            </div>
          </div>
          <div class="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-600">
            <span class="bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5"><i class="ti ti-trending-up"></i> +15.2%</span>
            <span class="text-slate-400 font-medium">hôm nay</span>
          </div>
        </div>

        <!-- Card Sản phẩm -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">TỔNG SẢN PHẨM KHO</p>
              <h3 class="text-2xl font-display font-extrabold text-slate-950 mt-2">{{ statsData.totalProducts }} Mẫu</h3>
            </div>
            <div class="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i class="ti ti-shoe"></i>
            </div>
          </div>
          <div class="flex items-center gap-1.5 mt-4 text-xs font-semibold text-slate-500">
            <span class="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">Kho hàng</span>
            <span class="text-slate-400 font-medium">đang kinh doanh</span>
          </div>
        </div>
      </div>

      <!-- Revenue Chart and Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Biểu đồ cột doanh thu cao cấp -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs lg:col-span-2 flex flex-col justify-between">
          <div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 class="font-display text-lg font-bold text-slate-950">
                  {{ selectedPeriod === 'week' ? 'Phân tích doanh thu tuần này 📊' : (selectedPeriod === 'month' ? 'Phân tích doanh thu tháng này 📊' : 'Phân tích doanh thu năm nay 📊') }}
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  {{ selectedPeriod === 'week' ? 'Dữ liệu doanh thu thực tế từ Thứ 2 tới Chủ Nhật' : (selectedPeriod === 'month' ? 'Dữ liệu doanh thu tổng hợp theo các tuần trong tháng' : 'Dữ liệu doanh thu 12 tháng trong năm') }}
                </p>
              </div>
              <select 
                v-model="selectedPeriod" 
                class="bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer hover:border-accent transition-colors"
              >
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
                <option value="year">Năm nay</option>
              </select>
            </div>
            
            <!-- Container Biểu Đồ Cột Bar Chart -->
            <div class="relative w-full h-[220px] mt-6 pt-4 flex items-end justify-between gap-2 border-b border-slate-200 px-2">
              <!-- Đường lưới ngang phía sau -->
              <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 z-0">
                <div class="w-full border-b border-dashed border-slate-100"></div>
                <div class="w-full border-b border-dashed border-slate-100"></div>
                <div class="w-full border-b border-dashed border-slate-100"></div>
                <div class="w-full border-b border-slate-100"></div>
              </div>

              <!-- Danh sách các cột Bar Chart -->
              <div 
                v-for="(item, index) in currentChartItems" 
                :key="index"
                class="relative flex-1 flex flex-col items-center justify-end h-full group z-10 cursor-pointer"
              >
                <!-- Tooltip hiển thị số tiền khi hover -->
                <div class="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-30 transform group-hover:-translate-y-1">
                  {{ formatCurrency(item.value) }}
                </div>

                <!-- Thân cột Gradient -->
                <div 
                  class="w-full max-w-[36px] rounded-t-xl bg-gradient-to-t from-orange-500 via-orange-400 to-accent group-hover:from-accent group-hover:to-orange-400 transition-all duration-500 shadow-xs relative overflow-hidden"
                  :style="{ height: `${Math.max((item.value / maxChartValue) * 100, 5)}%` }"
                >
                  <!-- Viền sáng điểm nhấn trên đầu cột -->
                  <div class="absolute inset-x-0 top-0 h-1.5 bg-white/40 rounded-t-xl"></div>
                </div>
              </div>
            </div>
            
            <!-- Nhãn trục X (Thứ 2... / Tuần 1... / Tháng 1...) -->
            <div class="flex justify-between items-center text-[10px] font-extrabold text-slate-400 tracking-wider px-2 mt-3">
              <span 
                v-for="(item, index) in currentChartItems" 
                :key="index" 
                class="flex-1 text-center truncate"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- Bảng xếp hạng bán chạy -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950 mb-5">Sản phẩm bán chạy</h3>
            
            <!-- List -->
            <div class="space-y-4">
              <!-- Item -->
              <div v-for="prod in bestSellers" :key="prod.id" class="flex items-center gap-3.5">
                <div class="w-11 h-11 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center p-1.5 shrink-0">
                  <img :src="prod.image" alt="Pro" class="max-w-full max-h-full object-contain">
                </div>
                <div class="flex-1 min-w-0 text-left">
                  <span class="block text-xs font-semibold text-slate-800 truncate">{{ prod.name }}</span>
                  <span class="text-[10px] text-slate-400">{{ prod.sales }} đôi đã bán</span>
                </div>
                <div class="text-right shrink-0">
                  <span class="block text-xs font-bold text-slate-950">{{ formatCurrency(prod.revenue) }}</span>
                  <span :class="['text-[10px] font-semibold flex items-center justify-end gap-0.5', prod.trendingUp ? 'text-emerald-500' : 'text-red-500']">
                    <i :class="['ti', prod.trendingUp ? 'ti-arrow-up-right' : 'ti-arrow-down-left']"></i> {{ prod.change }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <router-link to="/admin/products" class="block text-center text-xs font-bold text-accent hover:text-accent-hover hover:underline transition-colors mt-6">
            Xem tất cả kho sản phẩm →
          </router-link>
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <!-- Table Header -->
        <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="text-left">
            <h3 class="font-display text-lg font-bold text-slate-950">Đơn hàng mới nhận</h3>
            <p class="text-xs text-slate-400 mt-0.5">Danh sách các đơn đặt hàng mới nhất cần xử lý</p>
          </div>
          <router-link to="/admin/orders" class="bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold py-2 px-3.5 rounded-xl border border-slate-200 transition-colors cursor-pointer">
            Xem toàn bộ đơn hàng
          </router-link>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-55 border-b border-slate-100">
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÃ ĐƠN</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHÁCH HÀNG</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">NGÀY ĐẶT</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TỔNG TIỀN</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="py-4 px-6 text-xs font-bold text-slate-900">{{ order.code }}</td>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 bg-orange-100 text-accent font-bold text-xs rounded-full flex items-center justify-center">
                      {{ getInitials(order.customerName) }}
                    </div>
                    <div class="text-left">
                      <span class="block text-xs font-semibold text-slate-800">{{ order.customerName }}</span>
                      <span class="text-[10px] text-slate-400">{{ order.customerEmail }}</span>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-xs text-slate-500 font-medium">{{ order.date }}</td>
                <td class="py-4 px-6 text-xs font-bold text-slate-900">{{ formatCurrency(order.total) }}</td>
                <td class="py-4 px-6">
                  <span :class="['inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap', order.statusClass]">
                    <span :class="['w-1.5 h-1.5 rounded-full', order.bulletClass]"></span> {{ order.statusText }}
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <router-link :to="`/admin/orders`" class="bg-accent hover:bg-accent-hover text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border-none transition-colors cursor-pointer shadow-xs inline-block">
                    Xử lý đơn
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axiosInstance from '@/api/axios.js'
import Swal from 'sweetalert2'

const adminName = ref('Admin')
const selectedPeriod = ref('week')

// Get current date string in format dd/mm/yyyy
const currentDateString = computed(() => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  return `${dd}/${mm}/${yyyy}`
})

const statsData = ref({
  revenue: 0,
  orders: 0,
  customers: 0,
  totalProducts: 0
})

const chartDataRaw = ref({
  week: [],
  month: [],
  year: []
})

const bestSellers = ref([
  { id: 1, name: 'StepUp Air Max One', sales: 120, revenue: 150000000, image: '/images/p1.png', trendingUp: true, change: '18%' },
  { id: 2, name: 'StepUp Pro Dunker', sales: 95, revenue: 199500000, image: '/images/p2.png', trendingUp: true, change: '12%' },
  { id: 3, name: 'StepUp Sport Flyknit', sales: 60, revenue: 84000000, image: '/images/p3.png', trendingUp: false, change: '3%' }
])

const recentOrders = ref([
  { 
    id: 1, 
    code: '#SS-9502', 
    customerName: 'Khổng Đạt', 
    customerEmail: 'khongdat@gmail.com', 
    date: '31/05/2026 14:24', 
    total: 3350000, 
    statusText: 'Chờ xử lý', 
    statusClass: 'bg-amber-50 text-amber-700', 
    bulletClass: 'bg-amber-500'
  },
  { 
    id: 2, 
    code: '#SS-9501', 
    customerName: 'Minh Thư', 
    customerEmail: 'minhthu@gmail.com', 
    date: '31/05/2026 13:02', 
    total: 1250000, 
    statusText: 'Đang giao', 
    statusClass: 'bg-blue-50 text-blue-700', 
    bulletClass: 'bg-blue-500'
  },
  { 
    id: 3, 
    code: '#SS-9500', 
    customerName: 'Hải Vy', 
    customerEmail: 'haivy@gmail.com', 
    date: '31/05/2026 11:15', 
    total: 2100000, 
    statusText: 'Đã giao thành công', 
    statusClass: 'bg-emerald-50 text-emerald-700', 
    bulletClass: 'bg-emerald-500'
  }
])

const currentChartItems = computed(() => {
  const rawItems = chartDataRaw.value[selectedPeriod.value] || []
  if (rawItems.length > 0) {
    return rawItems
  }
  
  // Khởi tạo danh sách các mốc thời gian với giá trị 0đ khi chưa có dữ liệu từ backend
  if (selectedPeriod.value === 'week') {
    return ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(label => ({ label, value: 0 }))
  } else if (selectedPeriod.value === 'month') {
    return ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'].map(label => ({ label, value: 0 }))
  } else {
    return Array.from({ length: 12 }, (_, i) => ({ label: `T${i + 1}`, value: 0 }))
  }
})

const maxChartValue = computed(() => {
  const vals = currentChartItems.value.map(item => Number(item.value) || 0)
  return Math.max(...vals, 1)
})

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

function getInitials(name) {
  if (!name) return 'AD'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function downloadReport() {
  Swal.fire({
    title: 'Tải xuống báo cáo',
    text: 'Hệ thống đang chuẩn bị báo cáo phân tích doanh thu...',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    confirmButtonText: 'Tải xuống ngay!',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Thành công!',
        text: 'Báo cáo doanh thu đã được tải xuống.',
        icon: 'success',
        confirmButtonColor: '#FF4D00'
      })
    }
  })
}

async function fetchStats() {
  try {
    const response = await axiosInstance.get('/admin/dashboard-stats')
    const resData = response.data?.data || response.data || {}
    if (resData) {
      if (resData.revenue !== undefined) statsData.value.revenue = resData.revenue
      if (resData.orders !== undefined) statsData.value.orders = resData.orders
      if (resData.customers !== undefined) statsData.value.customers = resData.customers
      if (resData.totalProducts !== undefined) statsData.value.totalProducts = resData.totalProducts
      if (resData.bestSellers && resData.bestSellers.length > 0) bestSellers.value = resData.bestSellers
      if (resData.recentOrders && resData.recentOrders.length > 0) recentOrders.value = resData.recentOrders
      if (resData.chartData) chartDataRaw.value = resData.chartData
    }
  } catch (error) {
    console.error('Lỗi khi tải thông số admin:', error)
  }
}

onMounted(() => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      adminName.value = user.name || 'Admin'
    } catch (e) {
      console.error(e)
    }
  }
  fetchStats()
})
</script>

<style scoped>
</style>
