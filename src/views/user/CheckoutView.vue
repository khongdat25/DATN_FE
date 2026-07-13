<template>
  
    <!-- Page Header / Breadcrumb -->
    <div class="bg-white border-b border-border py-8">
      <div class="max-w-[1200px] mx-auto px-5">
        <h1 class="font-display text-3xl font-extrabold text-text tracking-wide">THANH TOÁN</h1>
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
    <main class="py-12 bg-[#f9f9f9] min-h-[600px]">
      <div class="max-w-[1200px] mx-auto px-5">
        <form @submit.prevent="handlePlaceOrder" class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">

          <!-- ── Left Column ── -->
          <div class="flex flex-col gap-6">

            <!-- ① Địa chỉ nhận hàng -->
            <div class="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <div class="flex items-center justify-between mb-6">
                <h2 class="font-display text-xl font-bold text-text flex items-center gap-3">
                  <i class="ti ti-map-pin text-accent text-2xl"></i> Địa chỉ nhận hàng
                </h2>
                <button
                  type="button"
                  @click="showAddressModal = true"
                  class="flex items-center gap-1.5 border border-accent text-accent text-sm font-semibold px-4 py-2 rounded-lg hover:bg-accent hover:text-white hover:shadow-[0_4px_12px_rgba(255,77,0,0.15)] transition-all cursor-pointer"
                >
                  <i class="ti ti-edit text-sm"></i> Thay đổi
                </button>
              </div>

              <!-- Address Card Display -->
              <div class="bg-[rgba(255,77,0,0.02)] border border-dashed border-[rgba(255,77,0,0.25)] rounded-xl p-5">
                <div class="flex items-center gap-3 mb-2.5 flex-wrap">
                  <span class="font-display font-bold text-base text-text">{{ selectedAddress.name }}</span>
                  <span
                    class="text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase"
                    :style="badgeStyle(selectedAddress.badge)"
                  >{{ selectedAddress.badge }}</span>
                  <span class="text-sm font-semibold text-text-muted">{{ selectedAddress.phone }}</span>
                </div>
                <p class="text-sm text-text-muted leading-relaxed">{{ selectedAddress.address }}</p>
              </div>
            </div>

            <!-- ② Sản phẩm đã chọn -->
            <div class="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <h2 class="font-display text-xl font-bold text-text flex items-center gap-3 mb-6">
                <i class="ti ti-shopping-bag text-accent text-2xl"></i> Sản phẩm đã chọn
              </h2>

              <div v-if="summary.items.length > 0" class="flex flex-col gap-4">
                <div
                  v-for="item in summary.items"
                  :key="item.id"
                  class="flex items-center gap-5 p-4 border border-border rounded-xl hover:border-text-muted hover:shadow-sm transition-all"
                >
                  <div class="w-20 h-20 bg-surface2 rounded-lg p-2 flex items-center justify-center shrink-0">
                    <img :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain">
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-display font-bold text-base text-text leading-snug truncate">{{ item.name }}</h3>
                    <p class="text-xs text-text-dim mt-0.5">{{ item.variant || 'Mặc định' }}</p>
                  </div>
                  <div class="flex items-center gap-3 shrink-0">
                    <!-- Qty badge -->
                    <span class="text-sm font-semibold text-text-muted bg-surface2 px-3 py-1 rounded-full">x{{ item.qty }}</span>
                    <!-- Price -->
                    <span class="font-display font-bold text-base text-text min-w-[90px] text-right">{{ formatPrice(item.price * item.qty) }}</span>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-10 text-text-dim">
                <i class="ti ti-shopping-cart-off text-5xl block mb-3 text-accent opacity-60"></i>
                <p class="text-sm">Không có sản phẩm nào.</p>
                <router-link to="/products" class="text-accent font-semibold text-sm mt-2 inline-block hover:underline">Tiếp tục mua sắm →</router-link>
              </div>
            </div>

            <!-- ③ Phương thức vận chuyển -->
            <div class="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <h2 class="font-display text-xl font-bold text-text flex items-center gap-3 mb-6">
                <i class="ti ti-truck-delivery text-accent text-2xl"></i> Phương thức vận chuyển
              </h2>
              <div class="flex flex-col gap-3">
                <label
                  v-for="method in shippingMethods"
                  :key="method.id"
                  :class="[
                    'flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all',
                    form.shippingMethod === method.id
                      ? 'border-accent bg-[rgba(255,77,0,0.03)]'
                      : 'border-border hover:border-accent/40 bg-white'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <input
                      type="radio"
                      :value="method.id"
                      v-model="form.shippingMethod"
                      @change="onShippingChange(method)"
                      class="w-4 h-4 accent-accent cursor-pointer"
                    >
                    <div>
                      <span class="text-sm font-bold text-text block">{{ method.name }}</span>
                      <span class="text-[11px] text-text-muted">{{ method.desc }}</span>
                    </div>
                  </div>
                  <span class="text-sm font-bold text-text">
                    {{ method.fee === 0 ? 'Miễn phí' : formatPrice(method.fee) }}
                  </span>
                </label>
              </div>
            </div>

            <!-- ④ Phương thức thanh toán -->
            <div class="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <h2 class="font-display text-xl font-bold text-text flex items-center gap-3 mb-6">
                <i class="ti ti-credit-card text-accent text-2xl"></i> Phương thức thanh toán
              </h2>
              <div class="flex flex-col gap-3">
                <label
                  v-for="method in paymentMethods"
                  :key="method.id"
                  :class="[
                    'flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all',
                    form.paymentMethod === method.id
                      ? 'border-accent bg-[rgba(255,77,0,0.03)]'
                      : 'border-border hover:border-accent/40 bg-white'
                  ]"
                >
                  <input
                    type="radio"
                    :value="method.id"
                    v-model="form.paymentMethod"
                    class="w-4 h-4 accent-accent cursor-pointer"
                  >
                  <div class="flex-1">
                    <span class="text-sm font-bold text-text block">{{ method.name }}</span>
                    <span class="text-[11px] text-text-muted">{{ method.desc }}</span>
                  </div>
                  <i :class="['text-2xl', method.icon]" :style="{ color: method.iconColor }"></i>
                </label>
              </div>
            </div>

            <!-- ⑤ Ghi chú -->
            <div class="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <h2 class="font-display text-xl font-bold text-text flex items-center gap-3 mb-6">
                <i class="ti ti-notes text-accent text-2xl"></i> Ghi chú đơn hàng
              </h2>
              <textarea
                v-model="form.note"
                placeholder="Lưu ý cho shipper, thời gian giao hàng mong muốn..."
                class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white h-24 transition-all resize-none"
              ></textarea>
            </div>

          </div>

          <!-- ── Right Column: Order Summary ── -->
          <div>
            <div class="bg-white border border-border rounded-2xl p-8 shadow-sm sticky top-[100px]">
              <h2 class="font-display text-xl font-bold text-text mb-6">Tóm tắt đơn hàng</h2>

              <!-- Voucher section -->
              <div class="mb-6 pb-6 border-b border-dashed border-border">
                <label class="text-[13px] font-semibold text-text-muted block mb-2">Mã giảm giá / Voucher</label>

                <!-- Manual promo input -->
                <div class="flex gap-2 mb-3">
                  <input
                    type="text"
                    v-model="promoCode"
                    @keyup.enter="applyPromoCode"
                    placeholder="Nhập mã..."
                    class="flex-1 border border-border rounded-[10px] py-3 px-4 text-sm outline-none focus:border-accent transition-all"
                  >
                  <button
                    type="button"
                    @click="applyPromoCode"
                    class="px-5 rounded-[10px] bg-text text-white font-semibold text-[13px] cursor-pointer hover:bg-accent transition-colors border-none"
                  >Áp dụng</button>
                </div>

                <!-- Voucher suggestion bar -->
                <transition name="fade">
                  <div
                    v-if="summary.subtotal > 0"
                    class="flex items-start gap-2 rounded-[10px] p-3 text-[12.5px] mb-3 transition-all"
                    :style="suggestionStyle"
                  >
                    <i :class="['text-base shrink-0 mt-px', suggestionIcon]" :style="{ color: suggestionIconColor }"></i>
                    <div class="flex-1 leading-relaxed" v-html="suggestionText"></div>
                  </div>
                </transition>

                <!-- Voucher dropdown -->
                <div class="border border-border rounded-xl overflow-hidden">
                  <div
                    @click="voucherOpen = !voucherOpen"
                    :class="['flex justify-between items-center py-3 px-4 cursor-pointer select-none transition-colors', voucherOpen ? 'bg-surface2 font-bold' : 'bg-white font-semibold hover:bg-surface2/60']"
                  >
                    <span class="text-[13px] flex items-center gap-1.5 text-text">
                      <i class="ti ti-ticket text-accent text-base"></i>
                      {{ appliedVoucher ? `Đang dùng: ${appliedVoucher.code}` : 'Chọn Voucher từ SaigonShoes' }}
                    </span>
                    <i class="ti ti-chevron-down text-xs text-text-muted transition-transform duration-300" :class="{ 'rotate-180': voucherOpen }"></i>
                  </div>
                  <div v-show="voucherOpen" class="bg-white max-h-[250px] overflow-y-auto divide-y divide-border border-t border-border">
                    <div
                      v-for="voucher in availableVouchers"
                      :key="voucher.code"
                      class="flex items-center gap-3 p-3 hover:bg-[rgba(255,77,0,0.02)] transition-colors"
                    >
                      <div class="w-9 h-9 rounded-lg bg-[rgba(255,77,0,0.1)] text-accent flex items-center justify-center text-lg shrink-0">
                        <i :class="'ti ' + voucher.icon"></i>
                      </div>
                      <div class="flex-1">
                        <span class="text-[13px] font-semibold text-text block leading-tight">{{ voucher.title }}</span>
                        <span class="text-[11px] text-text-dim">{{ voucher.desc }}</span>
                      </div>
                      <button
                        type="button"
                        @click="applyVoucher(voucher.code)"
                        class="py-1.5 px-3 rounded-md text-[11px] font-semibold border cursor-pointer transition-colors"
                        :class="appliedVoucher?.code === voucher.code
                          ? 'bg-accent text-white border-accent'
                          : 'border-accent text-accent bg-transparent hover:bg-accent hover:text-white'"
                      >{{ appliedVoucher?.code === voucher.code ? 'Đang dùng' : 'Dùng' }}</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
              <div class="flex flex-col gap-3 mb-6">
                <div class="flex justify-between text-sm text-text-muted font-medium">
                  <span>Tổng đơn hàng</span>
                  <span class="text-text font-bold">{{ formatPrice(summary.subtotal) }}</span>
                </div>
                <div v-if="appliedVoucher" class="flex justify-between text-sm text-green-600 font-bold">
                  <span class="flex items-center gap-1"><i class="ti ti-ticket text-sm"></i> Voucher giảm:</span>
                  <span>-{{ formatPrice(discountAmount) }}</span>
                </div>
                <div class="flex justify-between text-sm text-text-muted font-medium">
                  <span>Phí vận chuyển</span>
                  <span class="text-text font-bold">{{ shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee) }}</span>
                </div>
              </div>

              <!-- Total -->
              <div class="flex justify-between items-end border-t border-dotted border-border pt-5 mb-6">
                <span class="text-sm font-bold text-text">Tổng thanh toán</span>
                <span class="font-display text-2xl font-extrabold text-accent leading-none">{{ formatPrice(totalPrice) }}</span>
              </div>

              <!-- Place Order button -->
              <button
                type="submit"
                class="w-full bg-accent text-white py-4 rounded-xl font-display font-bold text-base tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-accent-hover active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(255,77,0,0.2)] hover:shadow-[0_14px_28px_rgba(255,77,0,0.3)] cursor-pointer mb-4"
              >
                ĐẶT HÀNG NGAY <i class="ti ti-circle-check-filled text-lg"></i>
              </button>

              <!-- Security badges -->
              <div class="flex justify-center gap-6 opacity-40 mb-3">
                <i class="ti ti-shield-lock text-2xl" title="Thanh toán an toàn"></i>
                <i class="ti ti-truck-delivery text-2xl" title="Giao hàng siêu tốc"></i>
                <i class="ti ti-certificate text-2xl" title="Sản phẩm chính hãng"></i>
              </div>
              <p class="text-center text-[11px] text-text-dim">
                Nhấn "Đặt hàng ngay" đồng nghĩa với việc bạn đồng ý với Điều khoản mua hàng của SaigonShoes.
              </p>
            </div>
          </div>

        </form>
      </div>
    </main>

    <!-- ── Address Modal ── -->
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="showAddressModal"
          class="fixed inset-0 bg-black/40 backdrop-blur-[6px] flex items-center justify-center z-1000 px-4"
          @click.self="showAddressModal = false"
        >
          <div class="bg-white rounded-2xl w-full max-w-[550px] shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden">
            <!-- Modal Header -->
            <div class="flex items-center justify-between px-8 py-5 border-b border-border">
              <h3 class="font-display text-xl font-bold text-text">Chọn địa chỉ nhận hàng</h3>
              <button type="button" @click="showAddressModal = false" class="text-text-dim hover:text-text transition-colors text-xl cursor-pointer">
                <i class="ti ti-x"></i>
              </button>
            </div>

            <!-- Saved Address List -->
            <div class="p-8 max-h-[380px] overflow-y-auto flex flex-col gap-4">
              <div
                v-for="addr in savedAddresses"
                :key="addr.id"
                @click="tempSelectedId = addr.id"
                :class="[
                  'border-[1.5px] rounded-xl p-4 flex gap-4 cursor-pointer transition-all',
                  tempSelectedId === addr.id
                    ? 'border-accent bg-[rgba(255,77,0,0.03)] shadow-[0_4px_12px_rgba(255,77,0,0.05)]'
                    : 'border-border hover:border-accent/60 bg-white'
                ]"
              >
                <input
                  type="radio"
                  :checked="tempSelectedId === addr.id"
                  class="w-[18px] h-[18px] mt-1 accent-accent cursor-pointer shrink-0"
                >
                <div class="flex-1">
                  <div class="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <span class="font-display font-bold text-[15px] text-text">{{ addr.name }}</span>
                    <span
                      class="text-[10px] font-semibold px-1.5 py-px rounded-full uppercase"
                      :style="badgeStyle(addr.badge)"
                    >{{ addr.badge }}</span>
                    <span class="font-semibold text-text-muted text-[13px]">{{ addr.phone }}</span>
                  </div>
                  <p class="text-[13px] text-text-muted leading-snug">{{ addr.address }}</p>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-end gap-3 px-8 py-5 border-t border-border">
              <button
                type="button"
                @click="showAddressModal = false"
                class="bg-surface2 border border-border text-text-muted px-5 py-2.5 rounded-xl font-semibold cursor-pointer hover:bg-[#eee] hover:text-text transition-colors text-sm"
              >Hủy</button>
              <button
                type="button"
                @click="confirmAddress"
                class="bg-accent border border-accent text-white px-6 py-2.5 rounded-xl font-display font-semibold cursor-pointer hover:bg-accent-hover transition-all shadow-[0_4px_12px_rgba(255,77,0,0.2)] text-sm"
              >Xác nhận</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- ── PayOS Payment Modal ── -->
    <!-- Removed local PayOS payment modal. Redirection is handled directly to PayOS checkout page. -->
  
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const cartCount = inject('cartCount', ref(0))

// ─── Cấu hình tài khoản nhận thanh toán ───────────────────────────────────────
const SHOP_PAYMENT_CONFIG = {
  bankId: 'MB', // Techcombank (TCB), Vietcombank (VCB), MB Bank (MB), ACB, etc.
  bankAccount: '0936715847',
  bankAccountName: 'NGUYEN KHONG DAT'
}

const router = useRouter()
const route = useRoute()

// ─── State ───────────────────────────────────────────────────────────────────
const summary = ref({
  items: [],
  subtotal: 0,
  shippingFee: 0,
  discountAmount: 0,
  voucherCode: null,
  total: 0
})

const form = reactive({
  note: '',
  shippingMethod: 'standard',
  paymentMethod: 'cod'
})

const showAddressModal = ref(false)
const tempSelectedId = ref(1)
const selectedAddressId = ref(1)
const voucherOpen = ref(false)
const promoCode = ref('')
const appliedVoucher = ref(null)

// ─── Address Data ──────────────────────────────────────────────────────────────
const savedAddresses = ref([])

async function loadAddresses() {
  try {
    const response = await axiosInstance.get('/addresses')
    if (response.success && response.data) {
      savedAddresses.value = response.data.map(item => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        address: item.address,
        badge: item.badge,
        isDefault: !!item.is_default
      }))
      
      // Thiết lập địa chỉ được chọn mặc định từ danh sách
      const defaultAddr = savedAddresses.value.find(a => a.isDefault || a.badge === 'Mặc định')
      if (defaultAddr) {
        selectedAddressId.value = defaultAddr.id
        tempSelectedId.value = defaultAddr.id
      } else if (savedAddresses.value.length > 0) {
        selectedAddressId.value = savedAddresses.value[0].id
        tempSelectedId.value = savedAddresses.value[0].id
      }
    }
  } catch (error) {
    console.error('Failed to load addresses:', error)
  }
}

const shippingMethods = [
  { id: 'standard', name: 'Giao hàng nhanh', desc: 'Nhận hàng từ 2 – 3 ngày làm việc', fee: 30000 },
  { id: 'express', name: 'Giao hàng hỏa tốc', desc: 'Giao nhanh bằng Grab/Lalamove trong 2 giờ', fee: 50000 }
]

const paymentMethods = [
  { id: 'cod',      name: 'Tiền mặt (COD)',      desc: 'Thanh toán trực tiếp khi nhận hàng',  icon: 'ti ti-cash',           iconColor: '#4CAF50' },
  { id: 'qr_bank',  name: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản nhanh qua mã VietQR', icon: 'ti ti-building-bank',  iconColor: '#2196f3' }
]

const availableVouchers = ref([])

watch(availableVouchers, (newVal) => {
  if (summary.value.voucherCode && !appliedVoucher.value) {
    const v = newVal.find(x => x.code === summary.value.voucherCode)
    if (v) {
      appliedVoucher.value = v
      applyVoucher(v.code)
    }
  }
})

onMounted(async () => {
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

// ─── Computed ─────────────────────────────────────────────────────────────────
const selectedAddress = computed(() =>
  savedAddresses.value.find(a => a.id === selectedAddressId.value) || savedAddresses.value[0] || {}
)

const shippingFee = computed(() => {
  if (appliedVoucher.value?.type === 'free_ship') return 0
  if (form.shippingMethod === 'express') return 50000
  return summary.value.subtotal >= 500000 ? 0 : 30000
})

const discountAmount = computed(() => {
  if (!appliedVoucher.value) return 0
  if (appliedVoucher.value.serverDiscount !== undefined) {
    return appliedVoucher.value.serverDiscount
  }
  if (appliedVoucher.value.type === 'free_ship') {
    return Math.min(shippingFee.value, appliedVoucher.value.value || 30000)
  }
  if (appliedVoucher.value.value < 1) { // percentage
    let dist = summary.value.subtotal * appliedVoucher.value.value
    if (appliedVoucher.value.maxDiscount) {
      dist = Math.min(dist, appliedVoucher.value.maxDiscount)
    }
    return dist
  }
  return appliedVoucher.value.value
})

const totalPrice = computed(() =>
  Math.max(0, summary.value.subtotal + shippingFee.value - discountAmount.value)
)

// ─── QR Payment Info ─────────────────────────────────────────────────────────
const qrMemo = ref('SGS' + Math.floor(100000 + Math.random() * 900000))
const qrLoaded = ref(false)

const qrInfo = computed(() => {
  return {
    title: 'Chuyển khoản VietQR',
    account: SHOP_PAYMENT_CONFIG.bankAccountName,
    number: SHOP_PAYMENT_CONFIG.bankAccount,
    bank: SHOP_PAYMENT_CONFIG.bankId === 'MB' ? 'MB Bank' : SHOP_PAYMENT_CONFIG.bankId,
    logo: 'QR',
    color: '#FF4D00'
  }
})

const dynamicQrUrl = computed(() => {
  if (form.paymentMethod === 'qr_bank') {
    return `https://img.vietqr.io/image/${SHOP_PAYMENT_CONFIG.bankId}-${SHOP_PAYMENT_CONFIG.bankAccount}-compact2.png?amount=${totalPrice.value}&addInfo=${encodeURIComponent(qrMemo.value)}&accountName=${encodeURIComponent(SHOP_PAYMENT_CONFIG.bankAccountName)}`
  }
  return ''
})

// Reset loading state and generate local QR if needed
watch([() => form.paymentMethod, totalPrice], () => {
  qrLoaded.value = false
})

// ─── Voucher Suggestion ───────────────────────────────────────────────────────
const suggestionStyle = computed(() => {
  if (summary.value.subtotal >= 500000) {
    return { background: 'rgba(76,175,80,0.04)', border: '1px solid rgba(76,175,80,0.15)' }
  }
  return { background: 'rgba(255,77,0,0.04)', border: '1px solid rgba(255,77,0,0.15)' }
})

const suggestionIcon = computed(() =>
  summary.value.subtotal >= 500000 ? 'ti ti-circle-check' : 'ti ti-flame'
)
const suggestionIconColor = computed(() =>
  summary.value.subtotal >= 500000 ? '#4caf50' : '#FF4D00'
)

const suggestionText = computed(() => {
  const sub = summary.value.subtotal
  if (sub === 0) return ''
  if (sub < 500000) {
    const remaining = 500000 - sub
    const pct = Math.round((sub / 500000) * 100)
    return `Mua thêm <strong>${remaining.toLocaleString('vi-VN')}₫</strong> để đủ điều kiện dùng mã <strong>GIAM10K</strong> (giảm 10.000₫)!
      <div style="margin-top:8px;background:rgba(0,0,0,0.05);height:6px;border-radius:3px;overflow:hidden;">
        <div style="background:#FF4D00;width:${pct}%;height:100%;border-radius:3px;transition:width 0.3s"></div>
      </div>`
  }
  return `🎉 Tuyệt vời! Đơn hàng đã đủ điều kiện dùng mã <strong>GIAM10K</strong> và được <strong>MIỄN PHÍ VẬN CHUYỂN</strong>!
    <div style="margin-top:8px;background:rgba(0,0,0,0.05);height:6px;border-radius:3px;overflow:hidden;">
      <div style="background:#4caf50;width:100%;height:100%;border-radius:3px;"></div>
    </div>`
})

// ─── Methods ──────────────────────────────────────────────────────────────────
function badgeStyle(badge) {
  if (badge === 'Mặc định') return { background: 'rgba(255,77,0,0.1)', color: '#FF4D00' }
  if (badge === 'Nhà riêng') return { background: 'rgba(33,150,243,0.1)', color: '#2196f3' }
  return { background: 'rgba(76,175,80,0.1)', color: '#4caf50' }
}

function confirmAddress() {
  selectedAddressId.value = tempSelectedId.value
  showAddressModal.value = false
}

async function applyVoucher(codeToApply) {
  // Calculate base shipping fee without voucher
  let baseShipping = 30000
  if (summary.value.subtotal >= 500000) baseShipping = 0
  else if (form.shippingMethod === 'express') baseShipping = 50000

  // Validate against backend
  try {
    const resp = await axiosInstance.post('/vouchers/apply', {
      code: codeToApply,
      subtotal: summary.value.subtotal,
      shipping_fee: baseShipping
    })
    if (resp.success && resp.data) {
      // Backend returned discount
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
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Đã áp dụng mã ${appliedVoucher.value.code}!`,
        showConfirmButton: false,
        timer: 1500
      })
      voucherOpen.value = false
    }
  } catch (error) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: error.response?.data?.message || 'Mã giảm giá không hợp lệ',
      showConfirmButton: false,
      timer: 1500
    })
  }
}

function applyPromoCode() {
  const code = promoCode.value.trim().toUpperCase()
  if (!code) return
  applyVoucher(code)
}

function formatPrice(val) {
  if (!val && val !== 0) return '0₫'
  return Number(val).toLocaleString('vi-VN') + '₫'
}

async function handlePlaceOrder() {
  if (summary.value.items.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Giỏ hàng trống!', text: 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.', confirmButtonColor: '#FF4D00' })
    return
  }

  if (!selectedAddress.value || !selectedAddress.value.name || !selectedAddress.value.phone || !selectedAddress.value.address) {
    Swal.fire({ icon: 'warning', title: 'Thiếu thông tin nhận hàng!', text: 'Vui lòng chọn hoặc thêm địa chỉ nhận hàng đầy đủ.', confirmButtonColor: '#FF4D00' })
    return
  }

  Swal.fire({ title: 'Đang xử lý đặt hàng...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

  try {
    const userStr = localStorage.getItem('user')
    const userObj = userStr ? JSON.parse(userStr) : {}
    
    let orderNote = form.note
    if (form.paymentMethod !== 'cod') {
      const paymentType = 'VietQR'
      const qrMemoText = `[Thanh toán qua ${paymentType} - Mã QR: ${qrMemo.value}]`
      orderNote = orderNote ? `${orderNote}\n${qrMemoText}` : qrMemoText
    }

    const payload = {
      name: selectedAddress.value.name,
      email: userObj.email || '',
      phone: selectedAddress.value.phone,
      address: selectedAddress.value ? `${selectedAddress.value.address}` : '',
      note: orderNote,
      payment_method_id: form.paymentMethod === 'cod' ? 1 : 2,
      voucher_id: appliedVoucher.value ? appliedVoucher.value.id : null,
      shipping_fee: shippingFee.value,
      discount_amount: discountAmount.value
    }

    if (summary.value.isBuyNow && summary.value.items.length === 1) {
      payload.variant_id = summary.value.items[0].variant_id
      payload.quantity = summary.value.items[0].qty
    } else {
      payload.cart_item_ids = summary.value.items.map(item => item.id)
    }

    // Call real backend API (Extended timeout of 30 seconds for external payment link generation)
    const response = await axiosInstance.post('/checkout', payload, { timeout: 30000 })

    Swal.close()

    // Map response or keep standard orderId for profile history display
    const orderData = response.data || response
    const dbOrderId = orderData.id || Math.floor(100000 + Math.random() * 900000)

    const newOrder = {
      orderId: 'SGS-' + dbOrderId,
      date: new Date().toLocaleDateString('vi-VN'),
      items: summary.value.items,
      total: totalPrice.value,
      shipping: selectedAddress.value.address,
      status: 'pending', // Trạng thái 'pending' lúc bắt đầu
      paymentMethod: paymentMethods.find(m => m.id === form.paymentMethod)?.name || 'COD'
    }

    const localOrders = localStorage.getItem('saigon_orders')
    let ordersList = []
    try { ordersList = JSON.parse(localOrders) || [] } catch {}
    ordersList.unshift(newOrder)
    localStorage.setItem('saigon_orders', JSON.stringify(ordersList))
    localStorage.removeItem('saigon_checkout_summary')
    localStorage.removeItem('saigon_buy_now_item')

    // If payment method is COD
    if (form.paymentMethod === 'cod') {
      if (!summary.value.isBuyNow) {
        cartCount.value = 0 // Reset cart count in header
      }

      Swal.fire({
        icon: 'success',
        title: 'ĐẶT HÀNG THÀNH CÔNG! 🎉',
        text: `Mã đơn hàng: ${newOrder.orderId}. SaigonShoes sẽ liên hệ sớm để xác nhận!`,
        confirmButtonText: 'Xem lịch sử đơn hàng 📦',
        confirmButtonColor: '#FF4D00'
      }).then(() => router.push({ name: 'profile', query: { tab: 'orders' } }))
    } else {
      // If payment is QR (VietQR)
      const checkoutUrl = response.checkout_url || response.checkoutUrl || response.data?.checkout_url || response.data?.checkoutUrl
      
      if (checkoutUrl) {
        // Clear cart count in header if not a Buy Now order
        if (!summary.value.isBuyNow) {
          cartCount.value = 0
        }
        // Redirect directly to PayOS checkout page
        window.location.href = checkoutUrl
      } else {
        // Fallback mode if PayOS keys are not configured
        if (!summary.value.isBuyNow) {
          cartCount.value = 0
        }
        Swal.fire({
          icon: 'success',
          title: 'ĐẶT HÀNG THÀNH CÔNG! 🎉',
          text: `Mã đơn hàng: ${newOrder.orderId}. Cổng thanh toán tạm thời bảo trì, đơn hàng của bạn đã được ghi nhận ở trạng thái Chờ duyệt!`,
          confirmButtonText: 'Xem lịch sử đơn hàng 📦',
          confirmButtonColor: '#FF4D00'
        }).then(() => router.push({ name: 'profile', query: { tab: 'orders' } }))
      }
    }

  } catch (error) {
    Swal.close()
    console.error('Checkout failed:', error)
    
    let errMsg = error.response?.data?.message || 'Có lỗi xảy ra trong quá trình xử lý đơn hàng. Vui lòng thử lại.'
    if (error.response?.data?.errors) {
      const details = Object.values(error.response.data.errors).flat().join('<br>')
      errMsg = `<div style="text-align: left; font-size: 13px;">${errMsg}<br><br><strong>Chi tiết:</strong><br>${details}</div>`
    }

    Swal.fire({
      icon: 'error',
      title: 'Đặt hàng thất bại',
      html: errMsg,
      confirmButtonColor: '#FF4D00'
    })
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  // Handle redirect from PayOS cancel
  if (route.query.status === 'cancelled' && route.query.order_id) {
    const orderId = route.query.order_id
    Swal.fire({
      title: 'Đang hủy giao dịch...',
      text: 'Vui lòng chờ trong giây lát.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })
    try {
      // 1. Call Backend to delete the order and restore cart
      await axiosInstance.delete(`/user/orders/${orderId}`)

      // 2. Remove from local orders in localStorage
      const localOrders = localStorage.getItem('saigon_orders')
      if (localOrders) {
        try {
          let ordersList = JSON.parse(localOrders) || []
          ordersList = ordersList.filter(o => o.orderId !== 'SGS-' + orderId)
          localStorage.setItem('saigon_orders', JSON.stringify(ordersList))
        } catch (e) {
          console.error(e)
        }
      }

      Swal.close()
      Swal.fire({
        icon: 'info',
        title: 'Đã hủy thanh toán',
        text: 'Đơn hàng đã được hủy bỏ thành công. Các sản phẩm đã được khôi phục về giỏ hàng của bạn.',
        confirmButtonText: 'Quay lại Giỏ hàng 🛒',
        confirmButtonColor: '#FF4D00'
      }).then(() => {
        router.push({ name: 'cart' })
      })
    } catch (error) {
      Swal.close()
      console.error('Failed to cancel order on backend:', error)
      router.push({ name: 'cart' })
    }
    return
  }

  await loadAddresses()

  const local = localStorage.getItem('saigon_checkout_summary')
  if (local) {
    try {
      summary.value = JSON.parse(local)
    } catch {
      loadFromCart()
    }
  } else {
    loadFromCart()
  }
  // Restore applied voucher from summary
  if (summary.value.voucherCode) {
    const v = availableVouchers.value.find(x => x.code === summary.value.voucherCode)
    if (v) appliedVoucher.value = v
  }
})

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

async function loadFromCart() {
  try {
    const response = await axiosInstance.get('/cart')
    if (response && response.data) {
      const items = response.data.map(item => {
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
          image: img
        }
      })

      if (!items.length) {
        router.push({ name: 'cart' })
        return
      }
      const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)
      const shippingFee = subtotal >= 500000 ? 0 : 30000
      summary.value = { items, subtotal, shippingFee, discountAmount: 0, voucherCode: null, total: subtotal + shippingFee }
    } else {
      router.push({ name: 'cart' })
    }
  } catch (e) {
    console.error('Failed to load cart for checkout:', e)
    router.push({ name: 'cart' })
  }
}
</script>

<style scoped>
/* Fade + slide for QR box */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Modal transition */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.25s ease;
}
.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}

/* Fade for suggestion */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* PayOS Payment Modal Styles */
.pulse-circle {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: rgba(255, 77, 0, 0.04);
  animation: pulse-ring 2s infinite ease-out;
  pointer-events: none;
}

.radar-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #FF4D00, transparent);
  animation: radar-scan 2.5s infinite linear;
  top: 0;
  z-index: 20;
}

/* Checkmark success animation */
.checkmark-circle {
  width: 72px;
  height: 72px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 20px;
}
.checkmark-circle .background {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #10b981; /* emerald-500 */
  position: absolute;
  animation: scale-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
.checkmark-circle .checkmark:after {
  opacity: 0;
  height: 34px;
  width: 17px;
  transform-origin: left top;
  border-right: 4px solid #fff;
  border-top: 4px solid #fff;
  content: '';
  left: 20px;
  top: 36px;
  position: absolute;
  transform: scaleX(-1) rotate(135deg);
  animation: draw-checkmark 0.5s 0.3s ease forwards;
}

@keyframes pulse-ring {
  0% { transform: scale(0.65); opacity: 0; }
  50% { opacity: 0.6; }
  100% { transform: scale(1.1); opacity: 0; }
}

@keyframes radar-scan {
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
}

@keyframes scale-up {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

@keyframes draw-checkmark {
  0% { height: 0; width: 0; opacity: 1; }
  35% { height: 0; width: 17px; opacity: 1; }
  100% { height: 34px; width: 17px; opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
