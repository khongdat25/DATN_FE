<template>
  
    <!-- Page Header / Breadcrumb -->
    <div class="bg-white border-b border-border py-8">
      <div class="max-w-300 mx-auto px-5">
        <h1 class="font-display text-3xl font-extrabold text-text tracking-wide">GIỎ HÀNG CỦA BẠN</h1>
        <div class="flex items-center gap-2 text-xs text-text-dim mt-2 font-semibold">
          <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
          <i class="ti ti-chevron-right text-[10px]"></i>
          <span class="text-text font-bold">Giỏ hàng</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="py-12 bg-[#f9f9f9] min-h-125">
      <div class="max-w-300 mx-auto px-5">

        <!-- ── Has Items ── -->
        <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">

          <!-- ── Left: Cart Items ── -->
          <div class="flex flex-col gap-4">
            <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">

              <!-- Desktop Table -->
              <table class="w-full border-collapse hidden md:table">
                <thead>
                  <tr class="bg-surface2 text-[11px] font-display font-bold uppercase tracking-wider text-text-muted">
                    <th class="py-5 px-5 text-center w-12">
                      <input 
                        type="checkbox" 
                        v-model="allSelected" 
                        class="w-4 h-4 accent-accent rounded cursor-pointer block mx-auto"
                      >
                    </th>
                    <th class="py-5 px-6 text-left">Sản phẩm</th>
                    <th class="py-5 px-4 text-center">Đơn giá</th>
                    <th class="py-5 px-4 text-center">Số lượng</th>
                    <th class="py-5 px-4 text-center">Tạm tính</th>
                    <th class="py-5 px-6 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in cartItems"
                    :key="item.id"
                    class="border-b border-border last:border-b-0 group hover:bg-surface2/30 transition-colors"
                    :class="{ 'bg-accent/2 hover:bg-accent/4': item.selected }"
                  >
                    <!-- Checkbox -->
                    <td class="py-6 px-5 text-center">
                      <input 
                        type="checkbox" 
                        v-model="item.selected" 
                        class="w-4 h-4 accent-accent rounded cursor-pointer block mx-auto"
                      >
                    </td>
                    <!-- Product -->
                    <td class="py-6 px-6">
                      <div class="flex items-center gap-4">
                        <div class="w-20 h-20 bg-surface2 rounded-xl border border-border/80 flex items-center justify-center p-2 shrink-0">
                          <img :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain">
                        </div>
                        <div>
                          <router-link
                            :to="{ name: 'product-detail', params: { id: item.productId || 1 } }"
                            class="font-bold text-sm text-text hover:text-accent transition-colors block leading-snug"
                          >{{ item.name }}</router-link>
                          <span class="text-[11px] text-text-dim font-semibold tracking-wide uppercase mt-1 block">
                            {{ item.variant || 'Mặc định' }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Unit price -->
                    <td class="py-6 px-4 text-center">
                      <span class="text-sm font-bold text-text">{{ formatPrice(item.price) }}</span>
                    </td>

                    <!-- Quantity -->
                    <td class="py-6 px-4">
                      <div class="flex justify-center">
                        <div class="flex items-center border border-border rounded-xl bg-white h-9 shadow-sm overflow-hidden">
                          <button
                            @click="decreaseQty(item)"
                            class="w-8 h-full flex items-center justify-center text-text-muted hover:text-accent hover:bg-surface2 transition-colors cursor-pointer"
                          ><i class="ti ti-minus text-xs"></i></button>
                          <input
                            type="number"
                            v-model.number="item.qty"
                            @change="onQtyChange(item)"
                            min="1" max="10"
                            class="w-10 text-center font-bold text-xs border-none outline-none bg-transparent"
                          >
                          <button
                            @click="increaseQty(item)"
                            class="w-8 h-full flex items-center justify-center text-text-muted hover:text-accent hover:bg-surface2 transition-colors cursor-pointer"
                          ><i class="ti ti-plus text-xs"></i></button>
                        </div>
                      </div>
                    </td>

                    <!-- Subtotal -->
                    <td class="py-6 px-4 text-center">
                      <span class="text-sm font-extrabold text-accent">{{ formatPrice(item.price * item.qty) }}</span>
                    </td>

                    <!-- Remove -->
                    <td class="py-6 px-6 text-center">
                      <button
                        @click="removeItem(item)"
                        class="text-text-dim hover:text-red-500 hover:scale-110 transition-all cursor-pointer text-xl"
                        title="Xóa sản phẩm"
                      ><i class="ti ti-x"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Mobile Cards -->
              <div class="md:hidden divide-y divide-border">
                <!-- Mobile Select All -->
                <div class="p-4 bg-surface2/50 flex items-center gap-3 border-b border-border text-xs font-bold text-text-muted">
                  <input 
                    type="checkbox" 
                    v-model="allSelected" 
                    id="mobileSelectAll"
                    class="w-4 h-4 accent-accent rounded cursor-pointer"
                  >
                  <label for="mobileSelectAll" class="cursor-pointer select-none uppercase tracking-wider">Chọn tất cả ({{ cartItems.length }} sản phẩm)</label>
                </div>

                <div
                  v-for="item in cartItems"
                  :key="'m-' + item.id"
                  class="p-5 flex items-start gap-4 relative"
                  :class="{ 'bg-accent/2': item.selected }"
                >
                  <!-- Checkbox -->
                  <div class="shrink-0 pt-2 flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="item.selected" 
                      class="w-4 h-4 accent-accent rounded cursor-pointer"
                    >
                  </div>
                  <!-- Image -->
                  <div class="w-18 h-18 bg-surface2 rounded-xl border border-border flex items-center justify-center p-2 shrink-0">
                    <img :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain">
                  </div>
                  <div class="flex-1 min-w-0">
                    <router-link
                      :to="{ name: 'product-detail', params: { id: item.productId || 1 } }"
                      class="font-bold text-sm text-text leading-snug hover:text-accent transition-colors block truncate"
                    >{{ item.name }}</router-link>
                    <span class="text-[11px] text-text-dim uppercase tracking-wide block mt-0.5">{{ item.variant || 'Mặc định' }}</span>
                    <div class="flex items-center justify-between mt-3 gap-3">
                      <!-- Qty -->
                      <div class="flex items-center border border-border rounded-lg bg-white h-8 overflow-hidden">
                        <button @click="decreaseQty(item)" class="w-7 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer"><i class="ti ti-minus text-[10px]"></i></button>
                        <input type="number" v-model.number="item.qty" @change="onQtyChange(item)" min="1" max="10" class="w-8 text-center font-bold text-xs border-none outline-none bg-transparent">
                        <button @click="increaseQty(item)" class="w-7 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer"><i class="ti ti-plus text-[10px]"></i></button>
                      </div>
                      <span class="font-extrabold text-accent text-sm">{{ formatPrice(item.price * item.qty) }}</span>
                    </div>
                  </div>
                  <button
                    @click="removeItem(item)"
                    class="absolute top-4 right-4 text-text-dim hover:text-red-500 transition-colors text-lg cursor-pointer"
                  ><i class="ti ti-x"></i></button>
                </div>
              </div>

              <!-- Table Footer Actions -->
              <div class="flex items-center justify-between px-6 py-4 border-t border-border bg-surface2/40">
                <router-link
                  to="/products"
                  class="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-accent transition-colors"
                >
                  <i class="ti ti-arrow-narrow-left text-base"></i> Tiếp tục mua sắm
                </router-link>
                <button
                  @click="clearCart"
                  class="text-sm font-semibold text-text-muted hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <i class="ti ti-trash text-sm"></i> Xóa tất cả
                </button>
              </div>
            </div>
          </div>

          <!-- ── Right: Summary ── -->
          <div>
            <div class="border border-border rounded-2xl bg-white p-7 shadow-sm sticky top-25">
              <h2 class="font-display text-xl font-bold text-text mb-6">Tổng đơn hàng</h2>

              <!-- Price rows -->
              <div class="flex flex-col gap-4 pb-5 border-b border-border/80">
                <div class="flex justify-between text-sm text-text-muted font-medium">
                  <span>Tạm tính</span>
                  <span class="text-text font-bold">{{ formatPrice(subTotal) }}</span>
                </div>
                <div class="flex justify-between text-sm text-text-muted font-medium">
                  <span>Phí vận chuyển</span>
                  <span class="text-text font-bold">{{ shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee) }}</span>
                </div>
                <div v-if="appliedVoucher" class="flex justify-between text-sm text-green-600 font-bold">
                  <span class="flex items-center gap-1.5">
                    <i class="ti ti-ticket text-base"></i> Voucher giảm giá:
                  </span>
                  <span>-{{ formatPrice(discountAmount) }}</span>
                </div>
              </div>

              <!-- Voucher selector -->
              <div class="my-5">
                <label class="text-[13px] font-semibold text-text-muted block mb-2">Mã giảm giá</label>

                <!-- Manual promo input -->
                <div class="flex gap-2 mb-3">
                  <input
                    type="text"
                    v-model="promoCode"
                    @keyup.enter="applyPromoCode"
                    placeholder="Nhập mã..."
                    class="flex-1 border border-border rounded-[10px] py-3 px-4 text-sm text-text outline-none focus:border-accent transition-all"
                  >
                  <button
                    @click="applyPromoCode"
                    class="px-5 rounded-[10px] border-none bg-text text-white font-semibold text-[13px] cursor-pointer hover:bg-accent transition-colors"
                  >Áp dụng</button>
                </div>

                <!-- Voucher dropdown -->
                <div class="border border-border rounded-xl overflow-hidden">
                  <div
                    @click="voucherOpen = !voucherOpen"
                    class="flex justify-between items-center py-3 px-4 cursor-pointer select-none transition-colors"
                    :class="voucherOpen ? 'bg-surface2 font-bold' : 'bg-white font-semibold hover:bg-surface2/60'"
                  >
                    <span class="text-[13px] flex items-center gap-1.5 text-text">
                      <i class="ti ti-ticket text-accent text-base"></i>
                      {{ appliedVoucher ? `Đang dùng: ${appliedVoucher.code}` : 'Chọn Voucher từ SaigonShoes' }}
                    </span>
                    <i
                      class="ti ti-chevron-down text-xs text-text-muted transition-transform duration-300"
                      :class="{ 'rotate-180': voucherOpen }"
                    ></i>
                  </div>

                  <div v-show="voucherOpen" class="bg-white max-h-75 overflow-y-auto divide-y divide-border border-t border-border">
                    <div
                      v-for="voucher in availableVouchers"
                      :key="voucher.code"
                      class="flex items-center gap-3 p-3 hover:bg-[rgba(255,77,0,0.02)] transition-colors"
                    >
                      <div class="w-10 h-10 rounded-lg bg-[rgba(255,77,0,0.1)] text-accent flex items-center justify-center text-xl shrink-0">
                        <i :class="'ti ' + voucher.icon"></i>
                      </div>
                      <div class="flex-1 text-left">
                        <span class="text-[13px] font-semibold text-text block leading-tight">{{ voucher.title }}</span>
                        <span class="text-[11px] text-text-dim block mt-0.5">{{ voucher.desc }}</span>
                      </div>
                      <button
                        @click="applyVoucher(voucher)"
                        class="py-1.5 px-3 rounded-md text-[11px] font-semibold border cursor-pointer transition-colors"
                        :class="appliedVoucher?.code === voucher.code
                          ? 'bg-accent text-white border-accent'
                          : 'border-accent text-accent bg-transparent hover:bg-accent hover:text-white'"
                      >{{ appliedVoucher?.code === voucher.code ? 'Đang dùng' : 'Dùng' }}</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Total -->
              <div class="flex justify-between items-end mt-6 pt-6 border-t border-dashed border-border">
                <span class="text-sm font-bold text-text">Tổng cộng</span>
                <span class="font-display text-2xl font-extrabold text-accent leading-none">{{ formatPrice(total) }}</span>
              </div>

              <!-- Checkout button -->
              <button
                @click="proceedToCheckout"
                class="w-full mt-6 bg-accent text-white py-4 rounded-xl font-display font-bold text-base tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-accent-hover active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(255,77,0,0.2)] hover:shadow-[0_14px_28px_rgba(255,77,0,0.3)] cursor-pointer"
              >
                THANH TOÁN <i class="ti ti-arrow-narrow-right text-lg"></i>
              </button>

              <div class="flex items-center justify-center gap-1.5 mt-4 text-xs text-text-dim">
                <i class="ti ti-shield-check text-sm"></i> Thanh toán an toàn &amp; bảo mật
              </div>
            </div>
          </div>

        </div>

        <!-- ── Empty State ── -->
        <div v-else class="text-center py-24 bg-white border border-border rounded-2xl shadow-sm max-w-2xl mx-auto">
          <i class="ti ti-shopping-cart text-[80px] text-text-dim block mb-4"></i>
          <h2 class="text-xl font-bold text-text mb-2">Giỏ hàng của bạn đang trống</h2>
          <p class="text-text-muted text-sm mb-8 max-w-xs mx-auto">SaigonShoes đang có rất nhiều ưu đãi cực hot và BST giày mới vừa hạ cánh!</p>
          <router-link
            to="/products"
            class="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide hover:bg-accent-hover active:scale-95 transition-all shadow-lg shadow-accent/20"
          >
            Mua sắm ngay <i class="ti ti-arrow-right"></i>
          </router-link>
        </div>

      </div>
    </main>
  
</template>

<script setup>
import { ref, computed, inject, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const router = useRouter()
const showToast = inject('showToast', () => {})
const cartCount = inject('cartCount', ref(0))

// ─── State ───────────────────────────────────────────────────────────────────
const cartItems = ref([])
const voucherOpen = ref(false)
const promoCode = ref('')
const appliedVoucher = ref(null)

const allSelected = computed({
  get() {
    return cartItems.value.length > 0 && cartItems.value.every(item => item.selected)
  },
  set(val) {
    cartItems.value.forEach(item => {
      item.selected = val
    })
  }
})

const availableVouchers = ref([])

// ─── Lifecycle ───────────────────────────────────────────────────────────────
onMounted(async () => {
  loadCart()
  try {
    const response = await axiosInstance.get('/vouchers/available')
    if (response.success && response.data) {
      availableVouchers.value = response.data.map(v => ({
        id: v.id,
        code: v.code,
        title: v.name,
        desc: v.type === 'percent' ? `Giảm ${v.value}% (Tối đa ${v.max_discount/1000}K)` : (v.type === 'fixed' ? `Giảm ${v.value.toLocaleString('vi-VN')}₫` : 'Miễn phí vận chuyển'),
        icon: v.type === 'percent' ? 'ti-brightness' : (v.type === 'fixed' ? 'ti-discount-2' : 'ti-gift'),
        value: v.type === 'percent' ? v.value / 100 : v.value,
        minSubtotal: v.min_order,
        maxDiscount: v.max_discount,
        type: v.type
      }))
    }
  } catch (error) {
    console.error('Failed to load vouchers', error)
  }
})

// ─── Cart persistence ─────────────────────────────────────────────────────────
async function loadCart() {
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      const response = await axiosInstance.get('/cart')
      if (response && response.data) {
        cartItems.value = response.data.map(item => {
          const v = item.variant || {}
          const p = v.product || {}
          let img = '/images/placeholder.png'
          if (p.images && p.images.length > 0) {
            const firstImg = p.images[0]
            const imgPath = typeof firstImg === 'string' ? firstImg : (firstImg?.image || '')
            img = getImageUrl(imgPath)
          } else if (v.image) {
            img = getImageUrl(v.image)
          }
          
          return {
            id: item.id,
            variant_id: v.id,
            productId: p.id || 1,
            name: p.name || 'Sản phẩm',
            variant: (v.color?.name || v.size?.name) 
              ? `Màu ${v.color?.name || ''} · Size ${v.size?.name || ''}`
              : 'Mặc định',
            price: v.price || 0,
            qty: item.quantity || 1,
            image: img,
            selected: true
          }
        })
        updateHeaderCartCount()
        return
      }
    } catch (e) {
      console.error('Failed to load cart from API:', e)
    }
  } else {
    router.push({ name: 'login' })
  }
}

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

function updateHeaderCartCount() {
  cartCount.value = cartItems.value.reduce((acc, item) => acc + item.qty, 0)
}

async function syncQtyToServer(item, oldQty) {
  const token = localStorage.getItem('access_token')
  if (token && item.id) {
    try {
      await axiosInstance.put(`/cart/${item.id}`, { quantity: item.qty })
      updateHeaderCartCount()
    } catch (e) {
      console.error('Failed to sync quantity to server:', e)
      item.qty = oldQty
      updateHeaderCartCount()
      Swal.fire({
        icon: 'error',
        title: 'Lỗi cập nhật số lượng',
        text: e.response?.data?.message || 'Không thể cập nhật số lượng sản phẩm. Vui lòng thử lại.',
        confirmButtonColor: '#FF4D00'
      })
    }
  }
}

// ─── Qty ──────────────────────────────────────────────────────────────────────
async function increaseQty(item) {
  if (item.qty < 10) { 
    const oldQty = item.qty
    item.qty++
    await syncQtyToServer(item, oldQty)
  }
}

async function decreaseQty(item) {
  if (item.qty > 1) { 
    const oldQty = item.qty
    item.qty--
    await syncQtyToServer(item, oldQty)
  }
}

async function onQtyChange(item) {
  if (!item.qty || item.qty < 1) item.qty = 1
  if (item.qty > 10) item.qty = 10
  
  const token = localStorage.getItem('access_token')
  if (token && item.id) {
    try {
      await axiosInstance.put(`/cart/${item.id}`, { quantity: item.qty })
      updateHeaderCartCount()
    } catch (e) {
      console.error('Failed to sync quantity:', e)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi cập nhật số lượng',
        text: e.response?.data?.message || 'Không thể cập nhật số lượng.',
        confirmButtonColor: '#FF4D00'
      })
      loadCart()
    }
  }
}

// ─── Remove / Clear ──────────────────────────────────────────────────────────
async function removeItem(item) {
  Swal.fire({
    title: 'Xác nhận xóa?',
    text: `Bạn muốn xóa "${item.name}" khỏi giỏ hàng?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý xóa 🗑️',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#aaa'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const token = localStorage.getItem('access_token')
      if (token && item.id) {
        try {
          await axiosInstance.delete(`/cart/${item.id}`)
          cartItems.value = cartItems.value.filter(i => i.id !== item.id)
          updateHeaderCartCount()
          showToast('Đã xóa sản phẩm khỏi giỏ hàng')
        } catch (e) {
          console.error('Failed to delete cart item on server:', e)
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể xóa sản phẩm. Vui lòng thử lại.',
            confirmButtonColor: '#FF4D00'
          })
        }
      }
    }
  })
}

async function clearCart() {
  if (!cartItems.value.length) return
  Swal.fire({
    title: 'Xóa toàn bộ giỏ hàng?',
    text: 'Tất cả sản phẩm sẽ bị xóa khỏi giỏ hàng của bạn.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa tất cả',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#aaa'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          await axiosInstance.delete('/cart/clear')
          cartItems.value = []
          appliedVoucher.value = null
          updateHeaderCartCount()
          showToast('Đã xóa toàn bộ giỏ hàng')
        } catch (e) {
          console.error('Failed to clear cart on server:', e)
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể xóa giỏ hàng. Vui lòng thử lại.',
            confirmButtonColor: '#FF4D00'
          })
        }
      }
    }
  })
}

// ─── Prices ──────────────────────────────────────────────────────────────────
const subTotal = computed(() =>
  cartItems.value
    .filter(item => item.selected)
    .reduce((acc, item) => acc + item.price * item.qty, 0)
)

const shippingFee = computed(() => {
  if (appliedVoucher.value?.type === 'free_ship' || appliedVoucher.value?.freeShip) return 0
  return subTotal.value >= 500000 ? 0 : 30000
})

const discountAmount = computed(() => {
  if (!appliedVoucher.value) return 0
  const v = appliedVoucher.value
  if (v.serverDiscount !== undefined) {
    return v.serverDiscount
  }
  if (v.type === 'free_ship') {
    return Math.min(shippingFee.value, v.value || 30000)
  }
  if (subTotal.value < v.minSubtotal) return 0
  if (v.value < 1) {
    const calc = subTotal.value * v.value
    return v.maxDiscount ? Math.min(calc, v.maxDiscount) : calc
  }
  return v.value
})

const total = computed(() =>
  Math.max(0, subTotal.value + shippingFee.value - discountAmount.value)
)

watch(subTotal, async (newSubtotal) => {
  if (appliedVoucher.value) {
    if (newSubtotal < appliedVoucher.value.minSubtotal) {
      appliedVoucher.value = null
      showToast('⚠️ Đã hủy áp dụng voucher do tổng giá trị đơn hàng thay đổi.')
    } else {
      // Re-apply to update discount
      try {
        let baseShipping = newSubtotal >= 500000 ? 0 : 30000
        const resp = await axiosInstance.post('/vouchers/apply', {
          code: appliedVoucher.value.code,
          subtotal: newSubtotal,
          shipping_fee: baseShipping
        })
        if (resp.success && resp.discount !== undefined) {
          appliedVoucher.value.serverDiscount = resp.discount
        }
      } catch (e) {
        appliedVoucher.value = null
      }
    }
  }
})

// ─── Voucher logic ───────────────────────────────────────────────────────────
async function applyVoucher(voucher) {
  if (subTotal.value < voucher.minSubtotal) {
    Swal.fire({
      icon: 'info',
      title: 'Chưa đủ điều kiện',
      text: `Mã này chỉ áp dụng cho đơn hàng từ ${formatPrice(voucher.minSubtotal)} trở lên.`,
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  try {
    let baseShipping = subTotal.value >= 500000 ? 0 : 30000
    const resp = await axiosInstance.post('/vouchers/apply', {
      code: voucher.code,
      subtotal: subTotal.value,
      shipping_fee: baseShipping
    })
    if (resp.success && resp.data) {
      const v = resp.data
      appliedVoucher.value = {
        id: v.id,
        code: v.code,
        title: v.name,
        desc: v.type === 'percent' ? `Giảm ${v.value}% (Tối đa ${v.max_discount/1000}K)` : (v.type === 'fixed' ? `Giảm ${v.value.toLocaleString('vi-VN')}₫` : 'Miễn phí vận chuyển'),
        icon: v.type === 'percent' ? 'ti-brightness' : (v.type === 'fixed' ? 'ti-discount-2' : 'ti-gift'),
        value: v.type === 'percent' ? v.value / 100 : v.value,
        minSubtotal: v.min_order,
        maxDiscount: v.max_discount,
        type: v.type,
        serverDiscount: resp.discount
      }
      voucherOpen.value = false
      showToast(`✅ Đã áp dụng mã giảm giá: ${v.code}`)
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Mã không hợp lệ',
      text: error.response?.data?.message || 'Mã giảm giá không hợp lệ',
      confirmButtonColor: '#FF4D00'
    })
  }
}

async function applyPromoCode() {
  const code = promoCode.value.trim().toUpperCase()
  if (!code) return
  
  try {
    let baseShipping = subTotal.value >= 500000 ? 0 : 30000
    const resp = await axiosInstance.post('/vouchers/apply', {
      code: code,
      subtotal: subTotal.value,
      shipping_fee: baseShipping
    })
    if (resp.success && resp.data) {
      const v = resp.data
      appliedVoucher.value = {
        id: v.id,
        code: v.code,
        title: v.name,
        desc: v.type === 'percent' ? `Giảm ${v.value}% (Tối đa ${v.max_discount/1000}K)` : (v.type === 'fixed' ? `Giảm ${v.value.toLocaleString('vi-VN')}₫` : 'Miễn phí vận chuyển'),
        icon: v.type === 'percent' ? 'ti-brightness' : (v.type === 'fixed' ? 'ti-discount-2' : 'ti-gift'),
        value: v.type === 'percent' ? v.value / 100 : v.value,
        minSubtotal: v.min_order,
        maxDiscount: v.max_discount,
        type: v.type,
        serverDiscount: resp.discount
      }
      promoCode.value = ''
      showToast(`✅ Đã áp dụng mã giảm giá: ${v.code}`)
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Mã không hợp lệ',
      text: error.response?.data?.message || 'Mã coupon bạn nhập không tồn tại hoặc đã hết hạn.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

// ─── Format ──────────────────────────────────────────────────────────────────
function formatPrice(val) {
  return val.toLocaleString('vi-VN') + '₫'
}

// ─── Checkout ─────────────────────────────────────────────────────────────────
function proceedToCheckout() {
  const selectedItems = cartItems.value.filter(item => item.selected)
  if (selectedItems.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Chưa chọn sản phẩm',
      text: 'Vui lòng tích chọn ít nhất một sản phẩm để thanh toán.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }
  const summary = {
    items: selectedItems,
    subtotal: subTotal.value,
    shippingFee: shippingFee.value,
    discountAmount: discountAmount.value,
    voucherCode: appliedVoucher.value?.code || null,
    total: total.value
  }
  localStorage.setItem('saigon_checkout_summary', JSON.stringify(summary))
  router.push({ name: 'checkout' })
}
</script>

<style scoped>
/* Ẩn mũi tên input[number] trên Chrome/Safari */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Ẩn mũi tên input[number] trên Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
