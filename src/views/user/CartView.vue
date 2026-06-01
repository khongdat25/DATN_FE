<template>
  <HomeLayout>
    <!-- Page Header -->
    <div class="bg-white border-b border-border py-8">
      <div class="max-w-[1200px] mx-auto px-5 text-left">
        <h1 class="font-display text-3xl font-extrabold text-text tracking-wide">GIỎ HÀNG CỦA BẠN</h1>
        <div class="flex items-center gap-2 text-xs text-text-dim mt-2 font-semibold">
          <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
          <i class="ti ti-chevron-right text-[10px]"></i>
          <span class="text-text font-bold">Giỏ hàng</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="py-12 bg-bg min-h-[500px]">
      <div class="max-w-[1200px] mx-auto px-5">
        <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Cart Table Left -->
          <div class="lg:col-span-2">
            <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-surface2 border-b border-border text-[11px] font-display font-bold uppercase tracking-wider text-text-muted">
                    <th class="py-4 px-6 text-left">Sản phẩm</th>
                    <th class="py-4 px-3 text-center">Đơn giá</th>
                    <th class="py-4 px-3 text-center">Số lượng</th>
                    <th class="py-4 px-3 text-center">Tạm tính</th>
                    <th class="py-4 px-6 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartItems" :key="item.id" class="border-b border-border last:border-b-0">
                    <!-- Product Cell -->
                    <td class="py-6 px-6">
                      <div class="flex items-center gap-4">
                        <div class="w-20 h-20 bg-surface2 rounded-xl border border-border/80 flex items-center justify-center p-2.5 shrink-0">
                          <img :src="item.image" class="max-h-full object-contain" :alt="item.name">
                        </div>
                        <div class="text-left">
                          <router-link :to="{ name: 'product-detail', params: { id: item.productId || 1 } }" class="font-bold text-sm text-text hover:text-accent transition-colors block leading-snug">
                            {{ item.name }}
                          </router-link>
                          <span class="text-[11px] text-text-dim font-semibold tracking-wide uppercase mt-1 block">
                            {{ item.variant || 'Mặc định' }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Price Cell -->
                    <td class="py-6 px-3 text-center">
                      <span class="text-sm font-bold text-text">{{ formatPrice(item.price) }}</span>
                    </td>

                    <!-- Quantity Cell -->
                    <td class="py-6 px-3">
                      <div class="flex justify-center">
                        <div class="flex items-center border border-border rounded-xl bg-white h-9 shadow-sm shrink-0">
                          <button @click="decreaseQty(item)" class="w-8 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                            <i class="ti ti-minus text-xs"></i>
                          </button>
                          <input type="number" v-model.number="item.qty" @change="onQtyChange(item)" min="1" max="10" class="w-10 text-center font-bold text-xs border-none outline-none select-none">
                          <button @click="increaseQty(item)" class="w-8 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                            <i class="ti ti-plus text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </td>

                    <!-- Subtotal Cell -->
                    <td class="py-6 px-3 text-center">
                      <span class="text-sm font-extrabold text-accent">
                        {{ formatPrice(item.price * item.qty) }}
                      </span>
                    </td>

                    <!-- Delete Cell -->
                    <td class="py-6 px-6 text-center">
                      <button @click="removeItem(item)" class="text-text-dim hover:text-red-500 hover:scale-110 transition-all cursor-pointer text-lg">
                        <i class="ti ti-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Summary Sidebar Right -->
          <div>
            <div class="border border-border rounded-2xl bg-white p-6 shadow-sm sticky top-[100px]">
              <h3 class="font-display text-lg font-bold text-text mb-6">TỔNG ĐƠN HÀNG</h3>
              
              <div class="flex flex-col gap-4 border-b border-border/80 pb-6">
                <div class="flex justify-between text-sm text-text-muted font-medium">
                  <span>Giá tạm tính:</span>
                  <span class="text-text font-bold">{{ formatPrice(subTotal) }}</span>
                </div>
                
                <div class="flex justify-between text-sm text-text-muted font-medium">
                  <span>Phí vận chuyển:</span>
                  <span class="text-text font-bold">
                    {{ shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee) }}
                  </span>
                </div>

                <div v-if="appliedVoucher" class="flex justify-between text-sm text-[#4CAF50] font-bold">
                  <span class="flex items-center gap-1.5">
                    <i class="ti ti-ticket text-base"></i> Voucher giảm giá:
                  </span>
                  <span>-{{ formatPrice(discountAmount) }}</span>
                </div>
              </div>

              <!-- Voucher selector dropdown -->
              <div class="my-6">
                <div class="border border-border rounded-xl overflow-hidden shadow-sm">
                  <div 
                    @click="voucherOpen = !voucherOpen" 
                    :class="['flex justify-between items-center py-3.5 px-4 cursor-pointer hover:bg-surface2 transition-all select-none', voucherOpen ? 'bg-surface2 font-bold' : 'bg-white font-semibold']"
                  >
                    <span class="text-xs flex items-center gap-1.5 text-text">
                      <i class="ti ti-ticket text-accent text-base"></i> 
                      {{ appliedVoucher ? `Đang áp dụng: ${appliedVoucher.code}` : 'Chọn mã giảm giá SaigonShoes' }}
                    </span>
                    <i :class="['ti ti-chevron-down text-xs text-text-muted transition-transform duration-300', voucherOpen ? 'rotate-180' : '']"></i>
                  </div>
                  
                  <div v-show="voucherOpen" class="bg-white max-h-48 overflow-y-auto divide-y divide-border border-t border-border">
                    <div 
                      v-for="voucher in availableVouchers" 
                      :key="voucher.code"
                      class="flex items-center justify-between p-3.5 hover:bg-surface2/50 transition-colors"
                    >
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center text-lg shrink-0">
                          <i class="ti ti-ticket"></i>
                        </div>
                        <div class="text-left">
                          <span class="text-xs font-bold text-text block leading-tight">{{ voucher.title }}</span>
                          <span class="text-[10px] text-text-dim block mt-0.5">{{ voucher.desc }}</span>
                        </div>
                      </div>
                      <button 
                        @click="applyVoucher(voucher)"
                        :class="['text-[10px] font-bold border py-1.5 px-3 rounded-lg transition-colors cursor-pointer', appliedVoucher?.code === voucher.code ? 'bg-accent text-white border-accent' : 'border-accent bg-accent/5 text-accent hover:bg-accent hover:text-white']"
                      >
                        {{ appliedVoucher?.code === voucher.code ? 'Đã dùng' : 'Áp dụng' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Promo input text field -->
              <div class="promo-box mb-6">
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    v-model="promoCode" 
                    placeholder="Nhập mã ưu đãi..." 
                    class="flex-1 bg-surface2 border border-border rounded-xl py-3 px-4 text-xs text-text outline-none focus:border-accent focus:bg-white transition-all uppercase"
                  >
                  <button @click="applyPromoCode" class="bg-text text-white text-xs font-bold px-5 rounded-xl hover:bg-accent active:scale-95 transition-all cursor-pointer">
                    Áp dụng
                  </button>
                </div>
              </div>

              <!-- Total price -->
              <div class="flex justify-between items-end mb-6 py-6 border-t border-border/80 border-dotted">
                <span class="text-sm font-bold text-text">Tổng thanh toán:</span>
                <span class="font-display text-2xl font-extrabold text-accent leading-none">{{ formatPrice(total) }}</span>
              </div>

              <!-- Checkout action -->
              <button 
                @click="proceedToCheckout" 
                class="w-full bg-accent text-white py-4 rounded-xl font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-accent-hover transition-all active:scale-[0.98] shadow-[0_8px_20px_rgba(255,77,0,0.15)] hover:shadow-[0_12px_25px_rgba(255,77,0,0.25)] cursor-pointer"
              >
                Tiến hành thanh toán <i class="ti ti-arrow-right text-base"></i>
              </button>

              <router-link to="/products" class="flex items-center justify-center gap-1.5 mt-5 text-xs text-text-muted hover:text-accent font-semibold transition-colors">
                <i class="ti ti-arrow-left"></i> Tiếp tục mua sắm
              </router-link>

            </div>
          </div>

        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20 bg-white border border-border rounded-2xl shadow-sm max-w-2xl mx-auto">
          <i class="ti ti-shopping-cart text-[80px] text-text-dim block mb-4"></i>
          <h4 class="text-lg font-bold text-text mb-2">Giỏ hàng của bạn đang trống</h4>
          <p class="text-text-muted text-sm mb-8">SaigonShoes đang có rất nhiều ưu đãi cực hot và BST giày mới vừa hạ cánh!</p>
          <router-link to="/products" class="bg-accent text-white px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide hover:bg-accent-hover transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-accent/15">
            Mua sắm ngay <i class="ti ti-arrow-right"></i>
          </router-link>
        </div>

      </div>
    </main>
  </HomeLayout>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import Swal from 'sweetalert2'

const router = useRouter()
const showToast = inject('showToast', (msg) => {})
const cartCount = inject('cartCount', ref(0))

// Cart Items list
const cartItems = ref([])
const voucherOpen = ref(false)
const promoCode = ref('')
const appliedVoucher = ref(null)

const availableVouchers = [
  { code: 'SAIGON50', title: 'Giảm 50.000₫', desc: 'Đơn tối thiểu 500K', value: 50000, minSubtotal: 500000 },
  { code: 'SAIGON15', title: 'Giảm 15%', desc: 'Đơn tối thiểu 1.500K (Giảm tối đa 300K)', value: 0.15, minSubtotal: 1500000, maxDiscount: 300000 }
]

onMounted(() => {
  loadCart()
})

function loadCart() {
  const localCart = localStorage.getItem('saigon_cart')
  if (localCart) {
    try {
      cartItems.value = JSON.parse(localCart)
    } catch (e) {
      cartItems.value = []
    }
  } else {
    // Inject beautifully customized mock cart items for standard experience
    cartItems.value = [
      {
        id: 101,
        productId: 1,
        name: "Nike Air Force 1 '07 White Original",
        variant: 'Màu Cam Trắng - Size 41',
        price: 1290000,
        qty: 1,
        image: '/images/nike-air-force-1.png'
      },
      {
        id: 102,
        productId: 2,
        name: 'Adidas Samba OG Core White/Black',
        variant: 'Màu Đen Trắng - Size 42',
        price: 1590000,
        qty: 2,
        image: '/images/adidas-samba-og1.png'
      }
    ]
    saveCart()
  }
  updateHeaderCartCount()
}

function saveCart() {
  localStorage.setItem('saigon_cart', JSON.stringify(cartItems.value))
  updateHeaderCartCount()
}

function updateHeaderCartCount() {
  const totalQty = cartItems.value.reduce((acc, item) => acc + item.qty, 0)
  cartCount.value = totalQty
}

// Qty modification
function increaseQty(item) {
  if (item.qty < 10) {
    item.qty++
    saveCart()
  }
}

function decreaseQty(item) {
  if (item.qty > 1) {
    item.qty--
    saveCart()
  }
}

function onQtyChange(item) {
  if (isNaN(item.qty) || item.qty < 1) item.qty = 1
  if (item.qty > 10) item.qty = 10
  saveCart()
}

function removeItem(item) {
  Swal.fire({
    title: 'Xác nhận xóa?',
    text: `Bạn muốn xóa sản phẩm "${item.name}" khỏi giỏ hàng?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý xóa 🗑️',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#aaa'
  }).then((result) => {
    if (result.isConfirmed) {
      cartItems.value = cartItems.value.filter(i => i.id !== item.id)
      saveCart()
      showToast('Đã xóa sản phẩm khỏi giỏ hàng')
    }
  })
}

// Price calculations
const subTotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.qty, 0)
})

const shippingFee = computed(() => {
  if (subTotal.value >= 500000) return 0
  return 30000
})

const discountAmount = computed(() => {
  if (!appliedVoucher.value) return 0
  
  const voucher = appliedVoucher.value
  if (subTotal.value < voucher.minSubtotal) {
    return 0 // Reset if criteria no longer met
  }

  if (voucher.value < 1) {
    // Percentage coupon
    let calculated = subTotal.value * voucher.value
    if (voucher.maxDiscount && calculated > voucher.maxDiscount) {
      calculated = voucher.maxDiscount
    }
    return calculated
  } else {
    // Fixed amount coupon
    return voucher.value
  }
})

const total = computed(() => {
  return Math.max(0, subTotal.value + shippingFee.value - discountAmount.value)
})

// Voucher apply triggers
function applyVoucher(voucher) {
  if (subTotal.value < voucher.minSubtotal) {
    Swal.fire({
      icon: 'info',
      title: 'Chưa đủ điều kiện',
      text: `Mã này chỉ áp dụng cho đơn hàng từ ${formatPrice(voucher.minSubtotal)} trở lên.`,
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  appliedVoucher.value = voucher
  voucherOpen.value = false
  showToast(`Đã áp dụng mã giảm giá: ${voucher.code}`)
}

function applyPromoCode() {
  const code = promoCode.value.trim().toUpperCase()
  if (!code) return

  const matched = availableVouchers.find(v => v.code === code)
  if (matched) {
    applyVoucher(matched)
    promoCode.value = ''
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Mã không hợp lệ',
      text: 'Mã coupon giảm giá bạn nhập không tồn tại hoặc đã hết hạn.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

function formatPrice(val) {
  return val.toLocaleString('vi-VN') + 'đ'
}

function proceedToCheckout() {
  // Store checkout subtotal, shipping fee, discount, total and items
  const summary = {
    items: cartItems.value,
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
/* Chrome, Safari, Edge, Opera number arrows remove */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox number input scrollbar remove */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
