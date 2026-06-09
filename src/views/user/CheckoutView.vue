<template>
  <HomeLayout>
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

              <!-- QR Payment Box -->
              <transition name="fade-slide">
                <div
                  v-if="form.paymentMethod !== 'cod'"
                  class="mt-6 bg-[#fafafa] border border-border rounded-xl p-6"
                >
                  <div class="flex items-start gap-6 flex-wrap sm:flex-nowrap">
                    <!-- QR SVG -->
                    <div class="bg-white p-4 rounded-xl border border-border shadow-sm flex items-center justify-center relative shrink-0">
                      <svg viewBox="0 0 100 100" width="140" height="140" class="block">
                        <path d="M0,0 h30 v10 h-20 v20 h-10 zM70,0 h30 v30 h-10 v-20 h-20 zM0,70 h10 v20 h20 v10 h-30 zM70,90 h20 v-20 h10 v30 h-30 z" fill="#1a1a1a"/>
                        <rect x="10" y="10" width="15" height="15" fill="#1a1a1a"/>
                        <rect x="75" y="10" width="15" height="15" fill="#1a1a1a"/>
                        <rect x="10" y="75" width="15" height="15" fill="#1a1a1a"/>
                        <circle cx="50" cy="50" r="10" fill="#FF4D00" opacity="0.8"/>
                        <rect x="35" y="15" width="5" height="10" fill="#1a1a1a"/>
                        <rect x="45" y="25" width="10" height="5" fill="#1a1a1a"/>
                        <rect x="60" y="15" width="5" height="5" fill="#1a1a1a"/>
                        <rect x="35" y="40" width="8" height="8" fill="#1a1a1a"/>
                        <rect x="55" y="35" width="10" height="5" fill="#1a1a1a"/>
                        <rect x="60" y="55" width="8" height="8" fill="#1a1a1a"/>
                        <rect x="35" y="75" width="12" height="5" fill="#1a1a1a"/>
                        <rect x="35" y="85" width="5" height="5" fill="#1a1a1a"/>
                        <rect x="50" y="75" width="8" height="8" fill="#1a1a1a"/>
                        <rect x="75" y="35" width="10" height="10" fill="#1a1a1a"/>
                      </svg>
                      <div
                        class="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center text-[9px] font-extrabold border-2 shadow"
                        :style="{ color: qrInfo.color, borderColor: qrInfo.color }"
                      >{{ qrInfo.logo }}</div>
                    </div>

                    <!-- QR Details -->
                    <div class="flex-1 w-full">
                      <h4 class="font-display font-bold text-base text-text mb-3">{{ qrInfo.title }}</h4>
                      <div class="flex flex-col gap-2">
                        <div class="flex justify-between text-[13px] border-b border-dashed border-border pb-1.5">
                          <span class="text-text-muted">Tài khoản:</span>
                          <strong class="text-text font-semibold">{{ qrInfo.account }}</strong>
                        </div>
                        <div class="flex justify-between text-[13px] border-b border-dashed border-border pb-1.5">
                          <span class="text-text-muted">Số TK / SĐT:</span>
                          <strong class="text-text font-semibold">{{ qrInfo.number }}</strong>
                        </div>
                        <div v-if="qrInfo.bank" class="flex justify-between text-[13px] border-b border-dashed border-border pb-1.5">
                          <span class="text-text-muted">Ngân hàng:</span>
                          <strong class="text-text font-semibold">{{ qrInfo.bank }}</strong>
                        </div>
                        <div class="flex justify-between text-[13px] border-b border-dashed border-border pb-1.5">
                          <span class="text-text-muted">Số tiền:</span>
                          <strong class="text-accent font-bold text-base">{{ formatPrice(totalPrice) }}</strong>
                        </div>
                        <div class="flex justify-between text-[13px]">
                          <span class="text-text-muted">Nội dung CK:</span>
                          <strong class="font-mono text-[#2196f3] bg-[rgba(33,150,243,0.06)] px-1.5 py-0.5 rounded text-sm">{{ qrMemo }}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start gap-2 mt-5 pt-4 border-t border-border text-xs text-text-muted">
                    <i class="ti ti-info-circle text-accent text-base shrink-0 mt-px"></i>
                    Vui lòng quét mã đúng số tiền và nội dung chuyển khoản để đơn hàng được phê duyệt tự động ngay lập tức.
                  </div>
                </div>
              </transition>
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

  </HomeLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import Swal from 'sweetalert2'

const router = useRouter()

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

// ─── Static Data ──────────────────────────────────────────────────────────────
const savedAddresses = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    badge: 'Mặc định',
    phone: '0123 456 789',
    address: 'Số 123, Đường ABC, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    badge: 'Nhà riêng',
    phone: '0987 654 321',
    address: 'Số 456, Đường XYZ, Phường 12, Quận Bình Thạnh, TP. Hồ Chí Minh'
  },
  {
    id: 3,
    name: 'Nguyễn Văn A',
    badge: 'Văn phòng',
    phone: '0123 456 789',
    address: 'Tòa nhà Keangnam, Mễ Trì, Quận Nam Từ Liêm, Hà Nội'
  }
]

const shippingMethods = [
  { id: 'standard', name: 'Giao hàng nhanh', desc: 'Nhận hàng từ 2 – 3 ngày làm việc', fee: 30000 },
  { id: 'express', name: 'Giao hàng hỏa tốc', desc: 'Giao nhanh bằng Grab/Lalamove trong 2 giờ', fee: 50000 }
]

const paymentMethods = [
  { id: 'cod',      name: 'Tiền mặt (COD)',      desc: 'Thanh toán trực tiếp khi nhận hàng',  icon: 'ti ti-cash',           iconColor: '#4CAF50' },
  { id: 'qr_bank',  name: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản nhanh qua mã VietQR', icon: 'ti ti-building-bank',  iconColor: '#2196f3' },
  { id: 'qr_wallet',name: 'Ví điện tử (MoMo)',   desc: 'Quét mã QR liên kết ví MoMo',         icon: 'ti ti-wallet',         iconColor: '#d81b60' }
]

const availableVouchers = [
  { code: 'FREESHIP',  title: 'FREE SHIP',   desc: 'Miễn phí vận chuyển toàn quốc',       icon: 'ti-gift',       freeShip: true,  value: 0,    minSubtotal: 0 },
  { code: 'GIAM10K',   title: 'GIAM10K',     desc: 'Giảm 10.000₫ cho đơn hàng từ 500K',  icon: 'ti-discount-2', value: 10000,    minSubtotal: 500000 },
  { code: 'STEPUPNEW', title: 'STEPUPNEW',   desc: 'Giảm 10% cho khách hàng mới',          icon: 'ti-brightness', value: 0.1,      minSubtotal: 0, maxDiscount: 200000 }
]

// ─── Computed ─────────────────────────────────────────────────────────────────
const selectedAddress = computed(() =>
  savedAddresses.find(a => a.id === selectedAddressId.value) || savedAddresses[0]
)

const shippingFee = computed(() => {
  if (appliedVoucher.value?.freeShip) return 0
  if (form.shippingMethod === 'express') return 50000
  return summary.value.subtotal >= 500000 ? 0 : 30000
})

const discountAmount = computed(() => {
  if (!appliedVoucher.value) return 0
  const v = appliedVoucher.value
  if (v.freeShip) return 0
  if (summary.value.subtotal < v.minSubtotal) return 0
  if (v.value < 1) {
    const calc = summary.value.subtotal * v.value
    return v.maxDiscount ? Math.min(calc, v.maxDiscount) : calc
  }
  return v.value
})

const totalPrice = computed(() =>
  Math.max(0, summary.value.subtotal + shippingFee.value - discountAmount.value)
)

// ─── QR Payment Info ─────────────────────────────────────────────────────────
const qrInfo = computed(() => {
  if (form.paymentMethod === 'qr_bank') {
    return {
      title: 'Chuyển khoản VietQR',
      account: 'CÔNG TY TNHH SAIGON SHOES',
      number: '1903 5678 9999',
      bank: 'Techcombank',
      logo: 'QR',
      color: '#FF4D00'
    }
  }
  return {
    title: 'Thanh toán Ví MoMo',
    account: 'CÔNG TY TNHH SAIGON SHOES',
    number: '0123 456 789',
    bank: null,
    logo: 'MoMo',
    color: '#d81b60'
  }
})

const qrMemo = computed(() => 'SGS_' + Math.floor(100000 + Math.random() * 900000))

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

function onShippingChange() {
  // shipping fee recalculated via computed
}

function applyVoucher(voucher) {
  if (summary.value.subtotal < voucher.minSubtotal) {
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
  Swal.fire({
    icon: 'success',
    title: 'Áp dụng thành công!',
    text: `Mã "${voucher.code}" đã được áp dụng vào đơn hàng của bạn.`,
    timer: 1800,
    showConfirmButton: false,
    confirmButtonColor: '#FF4D00'
  })
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
      text: 'Mã coupon bạn nhập không tồn tại hoặc đã hết hạn.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

function formatPrice(val) {
  if (!val && val !== 0) return '0₫'
  return Number(val).toLocaleString('vi-VN') + '₫'
}

function handlePlaceOrder() {
  if (summary.value.items.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Giỏ hàng trống!', text: 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.', confirmButtonColor: '#FF4D00' })
    return
  }

  Swal.fire({ title: 'Đang xử lý đặt hàng...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

  setTimeout(() => {
    Swal.close()

    const newOrder = {
      orderId: 'SGS-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('vi-VN'),
      items: summary.value.items,
      total: totalPrice.value,
      shipping: selectedAddress.value.address,
      status: 'Chờ xác nhận',
      paymentMethod: paymentMethods.find(m => m.id === form.paymentMethod)?.name || 'COD'
    }

    const localOrders = localStorage.getItem('saigon_orders')
    let ordersList = []
    try { ordersList = JSON.parse(localOrders) || [] } catch {}
    ordersList.unshift(newOrder)
    localStorage.setItem('saigon_orders', JSON.stringify(ordersList))
    localStorage.removeItem('saigon_cart')
    localStorage.removeItem('saigon_checkout_summary')

    Swal.fire({
      icon: 'success',
      title: 'ĐẶT HÀNG THÀNH CÔNG! 🎉',
      text: `Mã đơn hàng: ${newOrder.orderId}. SaigonShoes sẽ liên hệ sớm để xác nhận!`,
      confirmButtonText: 'Xem lịch sử đơn hàng 📦',
      confirmButtonColor: '#FF4D00'
    }).then(() => router.push({ name: 'profile' }))
  }, 1500)
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
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
    const v = availableVouchers.find(x => x.code === summary.value.voucherCode)
    if (v) appliedVoucher.value = v
  }
})

function loadFromCart() {
  const local = localStorage.getItem('saigon_cart')
  if (!local) { router.push({ name: 'cart' }); return }
  try {
    const items = JSON.parse(local)
    if (!items.length) { router.push({ name: 'cart' }); return }
    const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)
    const shippingFee = subtotal >= 500000 ? 0 : 30000
    summary.value = { items, subtotal, shippingFee, discountAmount: 0, voucherCode: null, total: subtotal + shippingFee }
  } catch {
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
</style>
