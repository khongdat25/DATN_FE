<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Quản lý Đơn hàng 📦</h1>
          <p class="text-sm text-slate-500 mt-1">Duyệt đơn hàng, cập nhật tiến trình giao hàng và kiểm soát thông tin vận chuyển chi tiết.</p>
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
          Tất cả đơn hàng ({{ orders.length }})
        </button>
        <button 
          @click="activeStatusTab = 'new'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeStatusTab === 'new' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đơn mới ({{ orders.filter(o => o.status === 'new').length }})
        </button>
        <button 
          @click="activeStatusTab = 'pending'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeStatusTab === 'pending' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Chờ xử lý ({{ orders.filter(o => o.status === 'pending').length }})
        </button>
        <button 
          @click="activeStatusTab = 'shipping'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeStatusTab === 'shipping' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đang giao ({{ orders.filter(o => o.status === 'shipping').length }})
        </button>
        <button 
          @click="activeStatusTab = 'delivered'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeStatusTab === 'delivered' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đã giao ({{ orders.filter(o => o.status === 'delivered').length }})
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
            placeholder="Tìm kiếm mã đơn, tên khách nhận..." 
            class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800 font-semibold"
          >
        </div>

        <!-- Action filters -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <input 
            type="date" 
            v-model="filterDate" 
            class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer text-slate-700 font-semibold"
          >
          <select v-model="filterPayment" class="bg-slate-50 border border-slate-200 text-slate-655 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer text-slate-700 font-semibold">
            <option value="all">Mọi thanh toán</option>
            <option value="COD">COD (Thanh toán nhận hàng)</option>
            <option value="Chuyển khoản">Chuyển khoản ngân hàng</option>
            <option value="VNPAY">Ví VNPAY</option>
          </select>
        </div>
      </div>

      <!-- Orders List Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="py-4 px-6 w-10"></th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÃ ĐƠN HÀNG</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHÁCH HÀNG</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">NGÀY ĐẶT</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PHƯƠNG THỨC</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TỔNG ĐƠN</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
                <th class="py-4 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <template v-for="order in filteredOrders" :key="order.id">
                <!-- Main Order Row -->
                <tr 
                  @click="toggleRow(order.id)" 
                  class="hover:bg-slate-50/30 transition-all cursor-pointer font-medium"
                >
                  <td class="py-4 px-6 text-center text-slate-400">
                    <i 
                      :class="[
                        'ti ti-chevron-right text-base transition-transform duration-200 block',
                        expandedRows.includes(order.id) ? 'rotate-90' : ''
                      ]"
                    ></i>
                  </td>
                  <td class="py-4 px-6 text-xs font-bold text-slate-900 text-left">{{ order.code }}</td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-2.5">
                      <div class="w-7 h-7 bg-orange-100 text-accent font-bold text-[10px] rounded-full flex items-center justify-center">
                        {{ getInitials(order.customerName) }}
                      </div>
                      <div class="text-left">
                        <span class="block text-xs font-semibold text-slate-800">{{ order.customerName }}</span>
                        <span class="text-[10px] text-slate-400">{{ order.customerEmail }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 text-xs text-slate-500 text-left">{{ order.date }}</td>
                  <td class="py-4 px-6 text-xs text-slate-700 text-left">{{ order.paymentMethod }}</td>
                  <td class="py-4 px-6 text-xs font-bold text-slate-900 text-left">{{ formatCurrency(order.total) }}</td>
                  <td class="py-4 px-6 text-left">
                    <span :class="['inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full', getStatusBadgeClass(order.status)]">
                      <span :class="['w-1.5 h-1.5 rounded-full', getStatusBulletClass(order.status)]"></span>
                      {{ getStatusText(order.status) }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right" @click.stop>
                    <button 
                      @click="toggleRow(order.id)" 
                      class="bg-accent hover:bg-accent-hover text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border-none transition-colors cursor-pointer shadow-xs"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>

                <!-- Expanded Detail Row -->
                <tr v-if="expandedRows.includes(order.id)" class="bg-slate-50/60 transition-all duration-300">
                  <td colspan="8" class="p-6 border-b border-slate-100">
                    <div class="pl-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <!-- Items list -->
                      <div class="lg:col-span-2 space-y-4">
                        <div class="text-[10px] font-bold tracking-[1.5px] text-slate-400 uppercase flex items-center gap-1.5 text-left">
                          <i class="ti ti-package-import"></i> Danh sách sản phẩm mua
                        </div>
                        <div class="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                          <div class="p-4 divide-y divide-slate-100">
                            <!-- Item -->
                            <div v-for="item in order.items" :key="item.name" class="flex items-center gap-4 py-2.5">
                              <div class="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg p-1 flex items-center justify-center shrink-0">
                                <img :src="item.image" alt="Product" class="max-w-full max-h-full object-contain">
                              </div>
                              <div class="flex-1 min-w-0 text-left">
                                <span class="block text-xs font-semibold text-slate-800 truncate">{{ item.name }}</span>
                                <span class="text-[10px] text-slate-400">Size: {{ item.size }} | Màu: {{ item.color }}</span>
                              </div>
                              <div class="text-right shrink-0">
                                <span class="block text-xs font-bold text-slate-900">{{ formatCurrency(item.price) }}</span>
                                <span class="text-[10px] text-slate-400">Số lượng: {{ item.quantity }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Delivery info & Status Updater -->
                      <div class="space-y-4">
                        <div class="text-[10px] font-bold tracking-[1.5px] text-slate-400 uppercase flex items-center gap-1.5 text-left">
                          <i class="ti ti-map-pin"></i> Thông tin giao hàng & xử lý
                        </div>
                        <div class="bg-white p-4 border border-slate-100 rounded-xl shadow-xs space-y-3.5 text-xs font-medium text-left">
                          <div>
                            <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Người nhận</span>
                            <span class="text-slate-900 block mt-0.5 font-semibold">{{ order.receiverName }} ({{ order.receiverPhone }})</span>
                          </div>
                          <div>
                            <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Địa chỉ giao hàng</span>
                            <span class="text-slate-700 block mt-0.5 leading-relaxed font-semibold">{{ order.receiverAddress }}</span>
                          </div>

                          <div class="h-px bg-slate-100"></div>
                          
                          <!-- Action Control -->
                          <div>
                            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">CẬP NHẬT TRẠNG THÁI</label>
                            <div class="flex gap-2">
                              <select 
                                v-model="order.tempStatus" 
                                class="flex-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold"
                              >
                                <option value="new">Đơn mới</option>
                                <option value="pending">Chờ xử lý</option>
                                <option value="shipping">Đang giao</option>
                                <option value="delivered">Đã giao</option>
                                <option value="cancelled">Đã hủy</option>
                              </select>
                              <button 
                                @click="updateStatus(order)" 
                                class="bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 rounded-xl border-none transition-colors cursor-pointer shadow-xs font-display"
                              >
                                Cập nhật
                              </button>
                              <button 
                                @click="deleteOrder(order.id)" 
                                class="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 text-xs font-bold px-4 rounded-xl border border-red-200 transition-colors cursor-pointer shadow-xs font-display"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>

              <tr v-if="filteredOrders.length === 0">
                <td colspan="8" class="text-center py-12 text-slate-400 text-sm">
                  Không tìm thấy đơn hàng nào phù hợp bộ lọc.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Pagination -->
        <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">Hiển thị 1 - {{ filteredOrders.length }} của {{ filteredOrders.length }} đơn hàng</span>
          <div class="flex items-center gap-1.5">
            <button class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" disabled>
              <i class="ti ti-chevron-left text-sm"></i>
            </button>
            <button class="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center text-xs font-bold border-none cursor-pointer font-display">1</button>
            <button class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" disabled>
              <i class="ti ti-chevron-right text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const searchQuery = ref('')
const activeStatusTab = ref('all')
const filterDate = ref('')
const filterPayment = ref('all')

const expandedRows = ref([])
const orders = ref([])

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/placeholder.png'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath
  }
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (imagePath.startsWith('images/')) {
    return `${serverUrl}/${imagePath}`
  }
  return `${serverUrl}/images/${imagePath}`
}

async function fetchOrders() {
  try {
    const response = await axiosInstance.get('/admin/orders')
    if (response && response.success) {
      orders.value = response.data.map(order => {
        // Map payment method name
        let pm = 'COD'
        if (order.payment_method_id === 2) pm = 'Chuyển khoản'
        if (order.payment_method_id === 3) pm = 'VNPAY'

        // Map items
        const items = (order.items || []).map(item => {
          const v = item.variant || {}
          const p = v.product || {}
          
          let img = '/images/placeholder.png'
          if (v.image) {
            img = getImageUrl(v.image)
          } else if (p.images && p.images.length > 0) {
            const firstImg = p.images[0]
            const imgPath = typeof firstImg === 'string' ? firstImg : (firstImg?.image || '')
            img = getImageUrl(imgPath)
          }

          return {
            name: p.name || 'Sản phẩm',
            size: v.size?.name || 'Mặc định',
            color: v.color?.name || 'Mặc định',
            price: item.price || 0,
            quantity: item.quantity || 1,
            image: img
          }
        })

        // Map date
        const dateStr = order.created_at ? order.created_at.split('T')[0] : ''

        return {
          id: order.id,
          code: '#SGS-' + order.id,
          customerName: order.name || 'Khách hàng',
          customerEmail: order.email || '',
          date: dateStr,
          paymentMethod: pm,
          total: order.total_amount || 0,
          status: order.status || 'new',
          tempStatus: order.status || 'new',
          receiverName: order.name || 'Chưa rõ',
          receiverPhone: order.phone || '',
          receiverAddress: order.address || 'Chưa rõ',
          items: items
        }
      })
    }
  } catch (error) {
    console.error('Error fetching admin orders:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi lấy dữ liệu',
      text: 'Không thể tải danh sách đơn hàng từ server.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

onMounted(() => {
  fetchOrders()
})

const filteredOrders = computed(() => {
  return orders.value.filter(o => {
    const matchesSearch = o.code.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          o.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          o.receiverName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    let matchesTab = true
    if (activeStatusTab.value !== 'all') {
      matchesTab = o.status === activeStatusTab.value
    }

    let matchesDate = true
    if (filterDate.value) {
      matchesDate = o.date === filterDate.value
    }

    let matchesPayment = true
    if (filterPayment.value !== 'all') {
      matchesPayment = o.paymentMethod.toLowerCase().includes(filterPayment.value.toLowerCase())
    }

    return matchesSearch && matchesTab && matchesDate && matchesPayment
  })
})

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

function getInitials(name) {
  if (!name) return 'KH'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function toggleRow(id) {
  const index = expandedRows.value.indexOf(id)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(id)
  }
}

function getStatusText(status) {
  switch (status) {
    case 'new': return 'Đơn mới'
    case 'pending': return 'Chờ xử lý'
    case 'shipping': return 'Đang giao'
    case 'delivered': return 'Đã giao'
    case 'cancelled': return 'Đã hủy'
    default: return status
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'new': return 'bg-sky-50 text-sky-700 border border-sky-200'
    case 'pending': return 'bg-amber-50 text-amber-700 border border-amber-200'
    case 'shipping': return 'bg-blue-50 text-blue-700 border border-blue-200'
    case 'delivered': return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    case 'cancelled': return 'bg-slate-50 text-slate-500 border border-slate-200'
    default: return 'bg-slate-100 text-slate-700 border border-slate-200'
  }
}

function getStatusBulletClass(status) {
  switch (status) {
    case 'new': return 'bg-sky-500'
    case 'pending': return 'bg-amber-500'
    case 'shipping': return 'bg-blue-500'
    case 'delivered': return 'bg-emerald-500'
    case 'cancelled': return 'bg-slate-400'
    default: return 'bg-slate-500'
  }
}

async function updateStatus(order) {
  try {
    const response = await axiosInstance.post(`/admin/orders/${order.id}/status`, {
      status: order.tempStatus
    })

    if (response && response.success) {
      order.status = order.tempStatus
      
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật trạng thái thành công!',
        text: `Đơn hàng ${order.code} đã được chuyển sang trạng thái: ${getStatusText(order.status)}`,
        confirmButtonColor: '#FF4D00'
      })
      await fetchOrders()
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    Swal.fire({
      icon: 'error',
      title: 'Thất bại',
      text: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

async function deleteOrder(id) {
  Swal.fire({
    title: 'Xác nhận xóa đơn hàng?',
    text: 'Hành động này sẽ xóa vĩnh viễn đơn hàng và không thể hoàn tác!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Xóa đơn hàng!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/admin/orders/${id}`)
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa!',
            text: 'Đơn hàng đã được xóa khỏi hệ thống thành công.',
            confirmButtonColor: '#FF4D00'
          })
          await fetchOrders()
        }
      } catch (error) {
        console.error('Error deleting order:', error)
        Swal.fire({
          icon: 'error',
          title: 'Thất bại',
          text: error.response?.data?.message || 'Không thể xóa đơn hàng.',
          confirmButtonColor: '#FF4D00'
        })
      }
    }
  })
}
</script>

<style scoped>
</style>
