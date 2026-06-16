<template>
  <AdminLayout>
    <div class="space-y-8">
      <!-- Welcome Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Xin chào, {{ adminName }}! 👋</h1>
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
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">ĐƠN HÀNG MỚI</p>
              <h3 class="text-2xl font-display font-extrabold text-slate-950 mt-2">{{ statsData.orders }} Đơn</h3>
            </div>
            <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i class="ti ti-shopping-cart"></i>
            </div>
          </div>
          <div class="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-600">
            <span class="bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5"><i class="ti ti-trending-up"></i> +8.0%</span>
            <span class="text-slate-400 font-medium">so với tuần trước</span>
          </div>
        </div>

        <!-- Card Khách hàng -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">THÀNH VIÊN MỚI</p>
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
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">TỔNG SẢN PHẨM</p>
              <h3 class="text-2xl font-display font-extrabold text-slate-950 mt-2">{{ statsData.totalProducts }} Đôi</h3>
            </div>
            <div class="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i class="ti ti-shoe"></i>
            </div>
          </div>
          <div class="flex items-center gap-1.5 mt-4 text-xs font-semibold text-slate-500">
            <span class="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">3 Thể loại</span>
            <span class="text-slate-400 font-medium">đang phân phối</span>
          </div>
        </div>
      </div>

      <!-- Revenue Chart and Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Biểu đồ doanh thu SVG mượt mà -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs lg:col-span-2 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3 class="font-display text-lg font-bold text-slate-950">Phân tích doanh thu tuần này</h3>
                <p class="text-xs text-slate-400 mt-0.5">Dữ liệu doanh thu từ Thứ 2 tới Chủ Nhật</p>
              </div>
              <select class="bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-xl py-1.5 px-3 focus:outline-none cursor-pointer">
                <option>Tuần này</option>
                <option>Tháng này</option>
                <option>Năm nay</option>
              </select>
            </div>
            
            <!-- Biểu đồ SVG cực kỳ cao cấp -->
            <div class="relative w-full h-[220px] mt-4">
              <!-- SVG Area & Line Chart -->
              <svg class="w-full h-full" viewBox="0 0 700 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FF4D00" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="#FF4D00" stop-opacity="0.00" />
                  </linearGradient>
                </defs>
                
                <!-- Grid Lines -->
                <line x1="0" y1="40" x2="700" y2="40" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4" />
                <line x1="0" y1="95" x2="700" y2="95" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4" />
                <line x1="0" y1="150" x2="700" y2="150" stroke="#f1f5f9" stroke-width="1.5" stroke-dasharray="4" />
                <line x1="0" y1="200" x2="700" y2="200" stroke="#e2e8f0" stroke-width="1.5" />

                <!-- Gradient Area -->
                <path d="M 0 200 L 0 170 Q 116 110, 233 130 T 466 60 T 700 30 L 700 200 Z" fill="url(#chartGradient)" />
                
                <!-- Line Path -->
                <path d="M 0 170 Q 116 110, 233 130 T 466 60 T 700 30" fill="none" stroke="#FF4D00" stroke-width="4.5" stroke-linecap="round" />
                
                <!-- Dot points -->
                <circle cx="233" cy="130" r="5" fill="#ffffff" stroke="#FF4D00" stroke-width="3" />
                <circle cx="466" cy="60" r="5" fill="#ffffff" stroke="#FF4D00" stroke-width="3" />
                <circle cx="700" cy="30" r="5" fill="#ffffff" stroke="#FF4D00" stroke-width="3" />
              </svg>
            </div>
            
            <!-- X-Axis Labels -->
            <div class="flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-wider px-2 mt-3">
              <span>T2</span>
              <span>T3</span>
              <span>T4 (15M)</span>
              <span>T5</span>
              <span>T6 (30M)</span>
              <span>T7</span>
              <span>CN (45M)</span>
            </div>
          </div>
        </div>

        <!-- Bảng xếp hạng bán chạy -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950 mb-5">Sản phẩm bán chạy 🔥</h3>
            
            <!-- List -->
            <div class="space-y-4">
              <!-- Item 1 -->
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
            <h3 class="font-display text-lg font-bold text-slate-950">Đơn hàng mới nhận 📦</h3>
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
                  <span :class="['inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full', order.statusClass]">
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
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import axiosInstance from '@/api/axios.js'
import Swal from 'sweetalert2'

const adminName = ref('Admin')

// Get current date string in format dd/mm/yyyy
const currentDateString = computed(() => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  return `${dd}/${mm}/${yyyy}`
})

const statsData = ref({
  revenue: 124500000,
  orders: 450,
  customers: 89,
  totalProducts: 1200
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
    if (response.data) {
      // Safely map API values
      if (response.data.revenue) statsData.value.revenue = response.data.revenue
      if (response.data.orders) statsData.value.orders = response.data.orders
      if (response.data.customers) statsData.value.customers = response.data.customers
      if (response.data.totalProducts) statsData.value.totalProducts = response.data.totalProducts
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
