<template>
  <HomeLayout>
    <!-- Page Header -->
    <div class="bg-white border-b border-border py-8">
      <div class="max-w-[1200px] mx-auto px-5 text-left">
        <h1 class="font-display text-3xl font-extrabold text-text tracking-wide">THANH TOÁN ĐƠN HÀNG</h1>
        <div class="flex items-center gap-2 text-xs text-text-dim mt-2 font-semibold">
          <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
          <i class="ti ti-chevron-right text-[10px]"></i>
          <router-link to="/cart" class="hover:text-accent transition-colors">Giỏ hàng</router-link>
          <i class="ti ti-chevron-right text-[10px]"></i>
          <span class="text-text font-bold">Thanh toán</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="py-12 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5">
        <form @submit.prevent="handlePlaceOrder" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Shipping and Payment Form Left -->
          <div class="lg:col-span-2 flex flex-col gap-6">
            
            <!-- Shipping Info Card -->
            <div class="border border-border rounded-2xl bg-white p-6 shadow-sm">
              <h3 class="font-display text-base font-bold text-text mb-6 flex items-center gap-2 uppercase tracking-wide">
                <i class="ti ti-truck text-accent text-lg"></i> Thông tin giao hàng
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Name -->
                <div class="sm:col-span-2 text-left">
                  <label class="block text-xs font-semibold text-text-muted mb-2">Họ và tên *</label>
                  <input type="text" v-model="form.name" required placeholder="Nguyễn Văn A" class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <!-- Phone -->
                <div class="text-left">
                  <label class="block text-xs font-semibold text-text-muted mb-2">Số điện thoại *</label>
                  <input type="tel" v-model="form.phone" required placeholder="0987654321" class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <!-- Email -->
                <div class="text-left">
                  <label class="block text-xs font-semibold text-text-muted mb-2">Email *</label>
                  <input type="email" v-model="form.email" required placeholder="nguyenvana@gmail.com" class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <!-- City -->
                <div class="text-left">
                  <label class="block text-xs font-semibold text-text-muted mb-2">Tỉnh / Thành phố *</label>
                  <select v-model="form.city" required class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white cursor-pointer transition-all">
                    <option value="" disabled>Chọn Tỉnh / Thành phố</option>
                    <option value="Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                    <option value="Hà Nội">Thành phố Hà Nội</option>
                    <option value="Đà Nẵng">Thành phố Đà Nẵng</option>
                  </select>
                </div>

                <!-- District -->
                <div class="text-left">
                  <label class="block text-xs font-semibold text-text-muted mb-2">Quận / Huyện *</label>
                  <select v-model="form.district" required class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white cursor-pointer transition-all">
                    <option value="" disabled>Chọn Quận / Huyện</option>
                    <option v-for="d in districtOptions" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>

                <!-- Specific Address -->
                <div class="sm:col-span-2 text-left">
                  <label class="block text-xs font-semibold text-text-muted mb-2">Địa chỉ cụ thể *</label>
                  <input type="text" v-model="form.address" required placeholder="Số nhà, tên đường, phường/xã..." class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white transition-all">
                </div>

                <!-- Note -->
                <div class="sm:col-span-2 text-left">
                  <label class="block text-xs font-semibold text-text-muted mb-2">Ghi chú đơn hàng (tùy chọn)</label>
                  <textarea v-model="form.note" placeholder="Lưu ý cho shiper, thời gian giao hàng nhận mong muốn..." class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white h-24 transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Shipping Methods -->
            <div class="border border-border rounded-2xl bg-white p-6 shadow-sm">
              <h3 class="font-display text-base font-bold text-text mb-6 flex items-center gap-2 uppercase tracking-wide">
                <i class="ti ti-truck-delivery text-accent text-lg"></i> Phương thức vận chuyển
              </h3>
              
              <div class="flex flex-col gap-4">
                <label 
                  v-for="method in shippingMethods" 
                  :key="method.id"
                  :class="['flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all', form.shippingMethod === method.id ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40 bg-white']"
                >
                  <div class="flex items-center gap-3">
                    <input type="radio" v-model="form.shippingMethod" :value="method.id" @change="onShippingMethodChange(method)" class="w-4 h-4 text-accent accent-accent cursor-pointer">
                    <div class="text-left">
                      <span class="text-xs font-bold text-text block leading-tight">{{ method.name }}</span>
                      <span class="text-[10px] text-text-muted block mt-0.5">{{ method.desc }}</span>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-text">{{ formatPrice(method.fee) }}</span>
                </label>
              </div>
            </div>

            <!-- Payment Methods -->
            <div class="border border-border rounded-2xl bg-white p-6 shadow-sm">
              <h3 class="font-display text-base font-bold text-text mb-6 flex items-center gap-2 uppercase tracking-wide">
                <i class="ti ti-credit-card text-accent text-lg"></i> Phương thức thanh toán
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label 
                  v-for="method in paymentMethods" 
                  :key="method.id"
                  :class="['flex flex-col items-center justify-center p-5 border rounded-2xl cursor-pointer transition-all gap-2 text-center h-28', form.paymentMethod === method.id ? 'border-accent bg-accent/5 font-bold' : 'border-border hover:border-accent/40 bg-white']"
                >
                  <input type="radio" v-model="form.paymentMethod" :value="method.id" class="sr-only">
                  <i :class="['text-2xl', method.icon]" :style="{ color: form.paymentMethod === method.id ? '#FF4D00' : method.iconColor }"></i>
                  <span class="text-xs text-text">{{ method.name }}</span>
                </label>
              </div>
            </div>

          </div>

          <!-- Order Summary Sidebar Right -->
          <div>
            <div class="border border-border rounded-2xl bg-white p-6 shadow-sm sticky top-[100px] flex flex-col gap-6">
              <h3 class="font-display text-base font-bold text-text uppercase tracking-wide border-b border-border/80 pb-4">
                Tóm tắt đơn hàng
              </h3>

              <!-- Products Mini List -->
              <div class="max-h-60 overflow-y-auto divide-y divide-border pr-1">
                <div v-for="item in summary.items" :key="item.id" class="flex gap-4 py-3 first:pt-0 last:pb-0">
                  <div class="w-14 h-14 bg-surface2 border border-border rounded-lg p-1.5 flex items-center justify-center shrink-0">
                    <img :src="item.image" class="max-h-full object-contain" :alt="item.name">
                  </div>
                  <div class="text-left flex-1 min-w-0">
                    <span class="text-xs font-bold text-text block whitespace-nowrap overflow-hidden text-ellipsis">{{ item.name }}</span>
                    <span class="text-[10px] text-text-dim block mt-0.5">{{ item.variant }}</span>
                    <div class="flex justify-between items-center mt-1.5 text-xs">
                      <span class="text-text-muted font-medium">SL: {{ item.qty }}</span>
                      <span class="font-bold text-text">{{ formatPrice(item.price * item.qty) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Price Breakdown -->
              <div class="flex flex-col gap-4 border-t border-border/80 pt-6">
                <div class="flex justify-between text-xs text-text-muted font-medium">
                  <span>Tạm tính:</span>
                  <span class="text-text font-bold">{{ formatPrice(summary.subtotal) }}</span>
                </div>
                
                <div class="flex justify-between text-xs text-text-muted font-medium">
                  <span>Phí vận chuyển:</span>
                  <span class="text-text font-bold">
                    {{ summary.shippingFee === 0 ? 'Miễn phí' : formatPrice(summary.shippingFee) }}
                  </span>
                </div>

                <div v-if="summary.discountAmount > 0" class="flex justify-between text-xs text-[#4CAF50] font-bold">
                  <span>Giảm giá Voucher:</span>
                  <span>-{{ formatPrice(summary.discountAmount) }}</span>
                </div>
              </div>

              <!-- Final Total -->
              <div class="flex justify-between items-end border-t border-border/80 border-dotted pt-6 py-2">
                <span class="text-sm font-bold text-text">Tổng cộng:</span>
                <span class="font-display text-2xl font-extrabold text-accent leading-none">{{ formatPrice(totalPrice) }}</span>
              </div>

              <!-- Complete Order Button -->
              <button 
                type="submit" 
                class="w-full bg-accent text-white py-4 rounded-xl font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-accent-hover transition-all active:scale-[0.98] shadow-[0_8px_20px_rgba(255,77,0,0.15)] hover:shadow-[0_12px_25px_rgba(255,77,0,0.25)] cursor-pointer"
              >
                Đặt hàng ngay <i class="ti ti-circle-check-filled text-base"></i>
              </button>

              <router-link to="/cart" class="flex items-center justify-center gap-1.5 text-xs text-text-muted hover:text-accent font-semibold transition-colors">
                <i class="ti ti-arrow-left"></i> Quay lại giỏ hàng
              </router-link>

            </div>
          </div>

        </form>
      </div>
    </main>
  </HomeLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import Swal from 'sweetalert2'

const router = useRouter()

const summary = ref({
  items: [],
  subtotal: 0,
  shippingFee: 0,
  discountAmount: 0,
  voucherCode: null,
  total: 0
})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  city: '',
  district: '',
  address: '',
  note: '',
  shippingMethod: 'standard',
  paymentMethod: 'cod'
})

const shippingMethods = [
  { id: 'standard', name: 'Giao hàng nhanh', desc: 'Nhận hàng từ 2 - 3 ngày làm việc', fee: 30000 },
  { id: 'express', name: 'Giao hàng hỏa tốc', desc: 'Giao nhanh bằng Grab/Lalamove trong 2 giờ', fee: 50000 }
]

const paymentMethods = [
  { id: 'cod', name: 'Thanh toán COD', icon: 'ti ti-wallet', iconColor: '#FF4D00' },
  { id: 'vnpay', name: 'Thanh toán VNPay', icon: 'ti ti-brand-visa', iconColor: '#005baa' },
  { id: 'momo', name: 'Thanh toán MoMo', icon: 'ti ti-credit-card', iconColor: '#a50064' }
]

onMounted(() => {
  loadSummary()
  loadUserDefaultData()
})

function loadSummary() {
  const localSummary = localStorage.getItem('saigon_checkout_summary')
  if (localSummary) {
    try {
      summary.value = JSON.parse(localSummary)
    } catch (e) {
      router.push({ name: 'cart' })
    }
  } else {
    // If not found, load cart and build fallback summary
    const localCart = localStorage.getItem('saigon_cart')
    if (localCart) {
      try {
        const items = JSON.parse(localCart)
        if (items.length === 0) {
          router.push({ name: 'cart' })
          return
        }
        const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0)
        const shippingFee = subtotal >= 500000 ? 0 : 30000
        summary.value = {
          items,
          subtotal,
          shippingFee,
          discountAmount: 0,
          voucherCode: null,
          total: subtotal + shippingFee
        }
      } catch (e) {
        router.push({ name: 'cart' })
      }
    } else {
      router.push({ name: 'cart' })
    }
  }
}

function loadUserDefaultData() {
  const localUser = localStorage.getItem('user')
  if (localUser) {
    try {
      const user = JSON.parse(localUser)
      form.name = user.name || ''
      form.email = user.email || ''
      form.phone = user.phone || ''
    } catch (e) {}
  }
}

const districtOptions = computed(() => {
  if (form.city === 'Hồ Chí Minh') {
    return ['Quận 1', 'Quận 3', 'Quận 5', 'Quận 10', 'Bình Thạnh', 'Tân Bình', 'Thủ Đức']
  } else if (form.city === 'Hà Nội') {
    return ['Hoàn Kiếm', 'Ba Đình', 'Đống Đa', 'Hai Bà Trưng', 'Cầu Giấy', 'Tây Hồ', 'Thanh Xuân']
  } else if (form.city === 'Đà Nẵng') {
    return ['Hải Châu', 'Thanh Khê', 'Liên Chiểu', 'Sơn Trà', 'Ngũ Hành Sơn', 'Cẩm Lệ']
  }
  return []
})

// Recalculating shipping fees
const totalPrice = computed(() => {
  let ship = summary.value.subtotal >= 500000 ? 0 : 30000
  if (form.shippingMethod === 'express') {
    ship = 50000
  }
  return Math.max(0, summary.value.subtotal + ship - summary.value.discountAmount)
})

function onShippingMethodChange(method) {
  let fee = summary.value.subtotal >= 500000 ? 0 : 30000
  if (method.id === 'express') {
    fee = 50000
  }
  summary.value.shippingFee = fee
}

function formatPrice(val) {
  return val.toLocaleString('vi-VN') + 'đ'
}

function handlePlaceOrder() {
  Swal.fire({
    title: 'Đang xử lý đặt hàng...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  // Simulated backend processing latency
  setTimeout(() => {
    Swal.close()

    // Add this order to user orders in localStorage
    const newOrder = {
      orderId: 'SGN-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('vi-VN'),
      items: summary.value.items,
      total: totalPrice.value,
      shipping: form.address + ', ' + form.district + ', ' + form.city,
      status: 'Chờ xác nhận',
      paymentMethod: paymentMethods.find(m => m.id === form.paymentMethod)?.name || 'COD'
    }

    const localOrders = localStorage.getItem('saigon_orders')
    let ordersList = []
    if (localOrders) {
      try {
        ordersList = JSON.parse(localOrders)
      } catch (e) {}
    }
    ordersList.unshift(newOrder)
    localStorage.setItem('saigon_orders', JSON.stringify(ordersList))

    // Clear cart
    localStorage.removeItem('saigon_cart')
    localStorage.removeItem('saigon_checkout_summary')

    Swal.fire({
      icon: 'success',
      title: 'ĐẶT HÀNG THÀNH CÔNG! 🎉',
      text: `Mã đơn hàng của bạn là ${newOrder.orderId}. SaigonShoes sẽ liên hệ sớm để xác nhận đơn hàng.`,
      confirmButtonText: 'Xem lịch sử mua hàng 📦',
      confirmButtonColor: '#FF4D00'
    }).then(() => {
      router.push({ name: 'profile' })
    })
  }, 1500)
}
</script>

<style scoped>
</style>
