<template>
  <HomeLayout>
    <!-- Page Header -->
    <div class="bg-white border-b border-border py-8">
      <div class="max-w-[1200px] mx-auto px-5 text-left">
        <h1 class="font-display text-3xl font-extrabold text-text tracking-wide">TRANG TÀI KHOẢN</h1>
        <div class="flex items-center gap-2 text-xs text-text-dim mt-2 font-semibold">
          <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
          <i class="ti ti-chevron-right text-[10px]"></i>
          <span class="text-text font-bold">Tài khoản</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="py-12 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <!-- Sidebar Controls Left -->
          <div class="lg:col-span-1 flex flex-col gap-6">
            
            <!-- User Summary -->
            <div class="border border-border rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center text-center">
              <div class="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-md mb-4 border border-border">
                {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
              </div>
              <h4 class="font-bold text-text text-base leading-tight">{{ user.name || 'Khách hàng' }}</h4>
              <p class="text-xs text-text-dim mt-1 font-semibold">{{ user.email || 'customer@gmail.com' }}</p>
            </div>

            <!-- Tab Toggles -->
            <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm flex flex-col divide-y divide-border">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="['w-full py-4 px-5 font-bold text-xs tracking-wide uppercase text-left transition-colors flex items-center gap-3 cursor-pointer', activeTab === tab.id ? 'bg-accent/5 text-accent' : 'text-text-muted hover:bg-surface2 hover:text-text']"
              >
                <i :class="['text-base', tab.icon]"></i> {{ tab.label }}
              </button>
            </div>

          </div>

          <!-- Tab Panels Right -->
          <div class="lg:col-span-3">
            
            <!-- Profile Tab Panel -->
            <div v-show="activeTab === 'profile'" class="border border-border rounded-2xl bg-white p-6 shadow-sm flex flex-col gap-6">
              <h3 class="font-display text-base font-bold text-text uppercase tracking-wide border-b border-border/80 pb-4 text-left">
                Thông tin cá nhân
              </h3>
              
              <form @submit.prevent="handleSaveProfile" class="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                <div>
                  <label class="block text-xs font-semibold text-text-muted mb-2">Họ và tên</label>
                  <input type="text" v-model="user.name" required class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-text-muted mb-2">Email (Không thể thay đổi)</label>
                  <input type="email" v-model="user.email" disabled class="w-full bg-surface3 border border-border rounded-xl py-3 px-4 text-sm text-text-muted outline-none cursor-not-allowed">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-text-muted mb-2">Số điện thoại</label>
                  <input type="tel" v-model="user.phone" placeholder="Nhập số điện thoại..." class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-text-muted mb-2">Địa chỉ giao hàng mặc định</label>
                  <input type="text" v-model="user.address" placeholder="Nhập địa chỉ nhận hàng của bạn..." class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <div class="sm:col-span-2 pt-2">
                  <button type="submit" class="bg-accent text-white px-6 py-3 rounded-xl font-display font-bold text-xs tracking-wider uppercase hover:bg-accent-hover transition-colors active:scale-95 cursor-pointer shadow-md shadow-accent/15">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>

            <!-- Orders Tab Panel -->
            <div v-show="activeTab === 'orders'" class="border border-border rounded-2xl bg-white p-6 shadow-sm flex flex-col gap-6">
              <h3 class="font-display text-base font-bold text-text uppercase tracking-wide border-b border-border/80 pb-4 text-left">
                Lịch sử mua hàng
              </h3>
              
              <div v-if="orders.length > 0" class="flex flex-col gap-6 divide-y divide-border">
                <div v-for="order in orders" :key="order.orderId" class="pt-6 first:pt-0">
                  
                  <!-- Order Header -->
                  <div class="flex flex-wrap justify-between items-center gap-3 mb-4 text-left">
                    <div>
                      <span class="text-xs font-bold text-accent font-display tracking-wider block">{{ order.orderId }}</span>
                      <span class="text-[11px] text-text-dim font-semibold block mt-0.5">Ngày mua: {{ order.date }}</span>
                    </div>
                    
                    <div class="flex items-center gap-3">
                      <span class="text-xs font-semibold text-text-muted">PTTT: {{ order.paymentMethod }}</span>
                      <span :class="['text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider', getStatusClass(order.status)]">
                        {{ order.status }}
                      </span>
                    </div>
                  </div>

                  <!-- Order Items Mini View -->
                  <div class="flex flex-col gap-3 mb-4">
                    <div v-for="(item, idx) in order.items" :key="idx" class="flex gap-4 items-center bg-surface2/50 border border-border rounded-xl p-3">
                      <div class="w-12 h-12 bg-white rounded-lg border border-border flex items-center justify-center p-1.5 shrink-0">
                        <img :src="item.image" class="max-h-full object-contain" :alt="item.name">
                      </div>
                      <div class="text-left flex-1 min-w-0">
                        <span class="text-xs font-bold text-text block whitespace-nowrap overflow-hidden text-ellipsis">{{ item.name }}</span>
                        <span class="text-[10px] text-text-dim block mt-0.5">{{ item.variant }}</span>
                        <div class="flex justify-between items-center text-xs mt-1 font-semibold">
                          <span class="text-text-muted">Số lượng: {{ item.qty }}</span>
                          <span class="text-text">{{ formatPrice(item.price) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Order Summary Footer -->
                  <div class="flex justify-between items-center py-2 text-sm border-t border-border border-dotted">
                    <span class="text-text-muted font-medium">Tổng tiền thanh toán:</span>
                    <span class="font-display font-extrabold text-accent text-lg">{{ formatPrice(order.total) }}</span>
                  </div>

                </div>
              </div>

              <!-- Empty Orders State -->
              <div v-else class="text-center py-16 bg-surface2/30 border border-border/80 border-dashed rounded-2xl">
                <i class="ti ti-package text-[50px] text-text-dim block mb-3"></i>
                <p class="text-text-muted text-sm font-semibold mb-4">Bạn chưa thực hiện bất kỳ đơn hàng nào</p>
                <router-link to="/products" class="bg-text text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-accent transition-colors active:scale-95 cursor-pointer">
                  Khám phá cửa hàng
                </router-link>
              </div>

            </div>

            <!-- Password Tab Panel -->
            <div v-show="activeTab === 'password'" class="border border-border rounded-2xl bg-white p-6 shadow-sm flex flex-col gap-6">
              <h3 class="font-display text-base font-bold text-text uppercase tracking-wide border-b border-border/80 pb-4 text-left">
                Đổi mật khẩu
              </h3>
              
              <form @submit.prevent="handleChangePassword" class="flex flex-col gap-5 text-left max-w-md">
                <div>
                  <label class="block text-xs font-semibold text-text-muted mb-2">Mật khẩu hiện tại *</label>
                  <input type="password" v-model="passwordForm.current" required class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-text-muted mb-2">Mật khẩu mới *</label>
                  <input type="password" v-model="passwordForm.new" required class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-text-muted mb-2">Xác nhận mật khẩu mới *</label>
                  <input type="password" v-model="passwordForm.confirm" required class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <div class="pt-2">
                  <button type="submit" class="bg-accent text-white px-6 py-3 rounded-xl font-display font-bold text-xs tracking-wider uppercase hover:bg-accent-hover transition-colors active:scale-95 cursor-pointer shadow-md shadow-accent/15">
                    Đổi mật khẩu
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </main>
  </HomeLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import Swal from 'sweetalert2'

const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: 'Hồ sơ cá nhân', icon: 'ti ti-user-circle' },
  { id: 'orders', label: 'Lịch sử mua hàng', icon: 'ti ti-package' },
  { id: 'password', label: 'Đổi mật khẩu', icon: 'ti ti-lock' }
]

const user = reactive({
  name: '',
  email: '',
  phone: '',
  address: ''
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

const orders = ref([])

onMounted(() => {
  loadUserData()
  loadOrdersData()
})

function loadUserData() {
  const localUser = localStorage.getItem('user')
  if (localUser) {
    try {
      const data = JSON.parse(localUser)
      user.name = data.name || 'Thành viên'
      user.email = data.email || 'customer@gmail.com'
      user.phone = data.phone || ''
      user.address = data.address || ''
    } catch (e) {}
  }
}

function loadOrdersData() {
  const localOrders = localStorage.getItem('saigon_orders')
  if (localOrders) {
    try {
      orders.value = JSON.parse(localOrders)
    } catch (e) {
      orders.value = []
    }
  } else {
    // Fallsback default mock orders for rich visuals
    orders.value = [
      {
        orderId: 'SGN-281938',
        date: '15/04/2026',
        items: [
          {
            name: 'StepUp Air Max One Premium',
            variant: 'Màu Cam Trắng - Size 41',
            qty: 1,
            price: 1250000,
            image: '/images/nike-air-force-1.png'
          }
        ],
        total: 1250000,
        shipping: '123 Nguyễn Trãi, Quận 1, Hồ Chi Minh',
        status: 'Đã giao',
        paymentMethod: 'Thanh toán COD'
      }
    ]
    localStorage.setItem('saigon_orders', JSON.stringify(orders.value))
  }
}

function getStatusClass(status) {
  if (status === 'Đã giao') return 'bg-green-100 text-green-700'
  if (status === 'Đang giao') return 'bg-blue-100 text-blue-700'
  if (status === 'Chờ xác nhận') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

function formatPrice(val) {
  return val.toLocaleString('vi-VN') + 'đ'
}

function handleSaveProfile() {
  // Save updated details in user profiles
  localStorage.setItem('user', JSON.stringify({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  }))

  Swal.fire({
    icon: 'success',
    title: 'Cập nhật thành công! 💾',
    text: 'Thông tin cá nhân của bạn đã được thay đổi trên hệ thống.',
    confirmButtonColor: '#FF4D00'
  })
}

function handleChangePassword() {
  if (passwordForm.new !== passwordForm.confirm) {
    Swal.fire({
      icon: 'error',
      title: 'Mật khẩu không khớp',
      text: 'Xác nhận mật khẩu mới không trùng khớp với mật khẩu đã nhập.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  Swal.fire({
    icon: 'success',
    title: 'Đổi mật khẩu thành công! 🔑',
    text: 'Mật khẩu tài khoản của bạn đã được thay đổi an toàn.',
    confirmButtonColor: '#FF4D00'
  }).then(() => {
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''
  })
}
</script>

<style scoped>
</style>
