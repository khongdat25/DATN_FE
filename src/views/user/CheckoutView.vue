<template>
  
    <!-- Page Header / Breadcrumb -->
    <div class="bg-white border-b border-border py-8">
      <div class="max-w-300 mx-auto px-5">
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
    <main class="py-12 bg-[#f9f9f9] min-h-150">
      <div class="max-w-300 mx-auto px-5">
        <form @submit.prevent="handlePlaceOrder" class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">

          <!-- ── Left Column ── -->
          <div class="flex flex-col gap-6">

            <!-- ① Địa chỉ nhận hàng -->
            <div class="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <div class="flex items-center justify-between mb-6">
                <h2 class="font-display text-xl font-bold text-text flex items-center gap-3">
                  <i class="ti ti-map-pin text-accent text-2xl"></i> Địa chỉ nhận hàng
                </h2>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="openCreateAddressForm(); showAddressModal = true;"
                    class="flex items-center gap-1.5 border border-accent/40 text-accent text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-accent hover:text-white transition-all cursor-pointer"
                  >
                    <i class="ti ti-plus text-xs"></i> Thêm mới
                  </button>
                  <button
                    type="button"
                    @click="isCreatingAddress = false; showAddressModal = true;"
                    class="flex items-center gap-1.5 border border-accent text-accent text-xs font-semibold px-4 py-2 rounded-lg hover:bg-accent hover:text-white hover:shadow-[0_4px_12px_rgba(255,77,0,0.15)] transition-all cursor-pointer"
                  >
                    <i class="ti ti-edit text-xs"></i> Thay đổi
                  </button>
                </div>
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

                <!-- GHN Auto Shipping Fee Badge -->
                <div v-if="ghnCalculatedFee !== null" class="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50/80 border border-emerald-200 rounded-lg px-3 py-2 w-fit">
                  <i class="ti ti-truck text-base text-emerald-600"></i> Cước phí GHN tính tự động theo địa chỉ: <strong>{{ formatPrice(ghnCalculatedFee) }}</strong>
                </div>
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
                    <span class="font-display font-bold text-base text-text min-w-22.5 text-right">{{ formatPrice(item.price * item.qty) }}</span>
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
            <div class="bg-white border border-border rounded-2xl p-8 shadow-sm sticky top-25">
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

                <!-- Voucher dropdown -->
                <div class="border border-border rounded-xl overflow-hidden">
                  <div
                    @click="voucherOpen = !voucherOpen"
                    :class="['flex justify-between items-center py-3 px-4 cursor-pointer select-none transition-colors', voucherOpen ? 'bg-surface2 font-bold' : 'bg-white font-semibold hover:bg-surface2/60']"
                  >
                    <span class="text-[13px] flex items-center gap-1.5 text-text">
                      <i class="ti ti-ticket text-accent text-base"></i>
                      {{ voucherHeaderLabel }}
                    </span>
                    <i class="ti ti-chevron-down text-xs text-text-muted transition-transform duration-300" :class="{ 'rotate-180': voucherOpen }"></i>
                  </div>

                  <div v-show="voucherOpen" class="bg-white max-h-75 overflow-y-auto border-t border-border">
                    <div v-if="hasFlashSaleInCart" class="px-4 py-2 bg-amber-50 border-b border-amber-200 text-amber-800 text-[11.5px] font-medium flex items-center gap-1.5">
                      <i class="ti ti-flame text-accent text-sm shrink-0"></i>
                      <span>Đơn hàng có SP <strong>Flash Sale</strong> chỉ áp dụng mã <strong>Miễn phí vận chuyển</strong>.</span>
                    </div>

                    <!-- NHÓM 1: MÃ MIỄN PHÍ VẬN CHUYỂN -->
                    <div class="px-4 py-1.5 bg-surface2/60 font-bold text-[11px] uppercase tracking-wider text-text-muted border-b border-border flex items-center gap-1">
                      <i class="ti ti-truck-delivery text-accent"></i> Mã Miễn phí vận chuyển (Tối đa 1)
                    </div>
                    <div class="divide-y divide-border border-b border-border">
                      <div
                        v-for="v in freeshipVouchers"
                        :key="v.code"
                        class="flex items-center gap-3 p-3 transition-colors hover:bg-[rgba(255,77,0,0.02)]"
                      >
                        <div class="w-9 h-9 rounded-lg bg-[rgba(255,77,0,0.1)] text-accent flex items-center justify-center text-lg shrink-0">
                          <i class="ti ti-truck-delivery"></i>
                        </div>
                        <div class="flex-1">
                          <span class="text-[13px] font-semibold text-text block leading-tight">{{ v.title }}</span>
                          <span class="text-[11px] text-text-dim block mt-0.5">{{ v.desc }}</span>
                        </div>
                        <button
                          type="button"
                          @click="toggleVoucher(v)"
                          class="py-1.5 px-3 rounded-md text-[11px] font-semibold border cursor-pointer transition-all"
                          :class="appliedFreeshipVoucher?.code === v.code
                            ? 'bg-accent text-white border-accent shadow-xs'
                            : 'border-accent text-accent bg-transparent hover:bg-accent hover:text-white'"
                        >
                          {{ appliedFreeshipVoucher?.code === v.code ? 'Bỏ chọn' : 'Dùng' }}
                        </button>
                      </div>
                      <div v-if="freeshipVouchers.length === 0" class="p-3 text-[12px] text-text-dim text-center">
                        Không có mã miễn phí vận chuyển khả dụng
                      </div>
                    </div>

                    <!-- NHÓM 2: MÃ GIẢM GIÁ ĐƠN HÀNG (TỰ ĐỘNG ẨN KHI ĐƠN HÀNG CHỨA SP FLASH SALE) -->
                    <div v-if="!hasFlashSaleInCart">
                      <div class="px-4 py-1.5 bg-surface2/60 font-bold text-[11px] uppercase tracking-wider text-text-muted border-b border-border flex items-center gap-1">
                        <i class="ti ti-discount-2 text-accent"></i> Mã Giảm giá đơn hàng (Tối đa 1)
                      </div>
                      <div class="divide-y divide-border">
                        <div
                          v-for="v in orderDiscountVouchers"
                          :key="v.code"
                          class="flex items-center gap-3 p-3 transition-colors hover:bg-[rgba(255,77,0,0.02)]"
                        >
                          <div class="w-9 h-9 rounded-lg bg-[rgba(255,77,0,0.1)] text-accent flex items-center justify-center text-lg shrink-0">
                            <i :class="'ti ' + v.icon"></i>
                          </div>
                          <div class="flex-1">
                            <span class="text-[13px] font-semibold text-text block leading-tight">{{ v.title }}</span>
                            <span class="text-[11px] text-text-dim block mt-0.5">{{ v.desc }}</span>
                          </div>
                          <button
                            type="button"
                            @click="toggleVoucher(v)"
                            class="py-1.5 px-3 rounded-md text-[11px] font-semibold border cursor-pointer transition-all"
                            :class="appliedOrderVoucher?.code === v.code
                              ? 'bg-accent text-white border-accent shadow-xs'
                              : 'border-accent text-accent bg-transparent hover:bg-accent hover:text-white'"
                          >
                            {{ appliedOrderVoucher?.code === v.code ? 'Bỏ chọn' : 'Dùng' }}
                          </button>
                        </div>
                        <div v-if="orderDiscountVouchers.length === 0" class="p-3 text-[12px] text-text-dim text-center">
                          Không có mã giảm giá đơn hàng khả dụng
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <!-- Price Breakdown -->
              <div class="flex flex-col gap-2.5 mb-6">
                <div class="flex justify-between text-sm text-text-muted font-medium">
                  <span>Tổng tiền hàng</span>
                  <span class="text-text font-bold">{{ formatPrice(summary.subtotal) }}</span>
                </div>
                <div v-if="appliedFreeshipVoucher" class="flex justify-between text-sm text-green-600 font-semibold">
                  <span class="flex items-center gap-1"><i class="ti ti-truck-delivery text-sm"></i> Freeship ({{ appliedFreeshipVoucher.code }}):</span>
                  <span>-{{ formatPrice(freeshipDiscountAmount) }}</span>
                </div>
                <div v-if="appliedOrderVoucher" class="flex justify-between text-sm text-green-600 font-semibold">
                  <span class="flex items-center gap-1"><i class="ti ti-ticket text-sm"></i> Giảm đơn ({{ appliedOrderVoucher.code }}):</span>
                  <span>-{{ formatPrice(orderDiscountAmount) }}</span>
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
          <div class="bg-white rounded-2xl w-full max-w-150 shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden transition-all">
            <!-- Modal Header -->
            <div class="flex items-center justify-between px-8 py-5 border-b border-border bg-surface2/30">
              <div class="flex items-center gap-3">
                <button
                  v-if="isCreatingAddress"
                  type="button"
                  @click="isCreatingAddress = false"
                  class="text-text-muted hover:text-accent transition-colors text-lg cursor-pointer flex items-center gap-1"
                  title="Quay lại danh sách"
                >
                  <i class="ti ti-arrow-left"></i>
                </button>
                <h3 class="font-display text-xl font-bold text-text">
                  {{ isCreatingAddress ? 'Thêm địa chỉ nhận hàng mới' : 'Chọn địa chỉ nhận hàng' }}
                </h3>
              </div>
              <button type="button" @click="showAddressModal = false" class="text-text-dim hover:text-text transition-colors text-xl cursor-pointer">
                <i class="ti ti-x"></i>
              </button>
            </div>

            <!-- Mode A: Saved Address List -->
            <div v-if="!isCreatingAddress">
              <div class="p-6 max-h-95 overflow-y-auto flex flex-col gap-3">
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
                    class="w-4.5 h-4.5 mt-1 accent-accent cursor-pointer shrink-0"
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

                <div v-if="savedAddresses.length === 0" class="text-center py-8 text-text-dim">
                  <i class="ti ti-map-pin-off text-4xl block mb-2 opacity-50"></i>
                  <p class="text-sm">Bạn chưa có địa chỉ nhận hàng nào được lưu.</p>
                </div>
              </div>

              <!-- List View Modal Footer -->
              <div class="flex justify-between items-center px-8 py-4 border-t border-border bg-surface2/30">
                <button
                  type="button"
                  @click="openCreateAddressForm"
                  class="flex items-center gap-1.5 text-accent font-bold text-sm hover:underline cursor-pointer"
                >
                  <i class="ti ti-plus text-base"></i> Thêm địa chỉ mới
                </button>
                <div class="flex gap-3">
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

            <!-- Mode B: Create Address Form -->
            <div v-else class="p-6 max-h-125 overflow-y-auto">
              <form @submit.prevent="handleSaveNewAddress" class="flex flex-col gap-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-text mb-1">Họ tên người nhận <span class="text-red-500">*</span></label>
                    <input
                      type="text"
                      v-model="newAddrForm.name"
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      class="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent transition-all"
                    >
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-text mb-1">Số điện thoại <span class="text-red-500">*</span></label>
                    <input
                      type="tel"
                      v-model="newAddrForm.phone"
                      required
                      placeholder="Ví dụ: 0987654321"
                      class="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent transition-all"
                    >
                  </div>
                </div>

                <!-- GHN Dropdowns -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-text mb-1">Tỉnh / Thành <span class="text-red-500">*</span></label>
                    <select
                      v-model="newAddrForm.province_id"
                      @change="onNewAddrProvinceChange"
                      required
                      class="w-full border border-border rounded-xl px-3 py-2.5 text-xs text-text outline-none focus:border-accent bg-white transition-all"
                    >
                      <option :value="null" disabled>Chọn Tỉnh/Thành</option>
                      <option v-for="p in ghnProvinces" :key="p.ProvinceID" :value="p.ProvinceID">{{ p.ProvinceName }}</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-text mb-1">Quận / Huyện <span class="text-red-500">*</span></label>
                    <select
                      v-model="newAddrForm.district_id"
                      @change="onNewAddrDistrictChange"
                      :disabled="!newAddrForm.province_id"
                      required
                      class="w-full border border-border rounded-xl px-3 py-2.5 text-xs text-text outline-none focus:border-accent bg-white transition-all disabled:bg-gray-100 disabled:opacity-60"
                    >
                      <option :value="null" disabled>Chọn Quận/Huyện</option>
                      <option v-for="d in newAddrDistricts" :key="d.DistrictID" :value="d.DistrictID">{{ d.DistrictName }}</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-text mb-1">Xã / Phường <span class="text-red-500">*</span></label>
                    <select
                      v-model="newAddrForm.ward_code"
                      :disabled="!newAddrForm.district_id"
                      required
                      class="w-full border border-border rounded-xl px-3 py-2.5 text-xs text-text outline-none focus:border-accent bg-white transition-all disabled:bg-gray-100 disabled:opacity-60"
                    >
                      <option value="" disabled>Chọn Xã/Phường</option>
                      <option v-for="w in newAddrWards" :key="w.WardCode" :value="w.WardCode">{{ w.WardName }}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-text mb-1">Địa chỉ chi tiết (Số nhà, tên đường) <span class="text-red-500">*</span></label>
                  <input
                    type="text"
                    v-model="newAddrForm.detail"
                    required
                    placeholder="Ví dụ: 123 Nguyễn Huệ, Chung cư A"
                    class="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent transition-all"
                  >
                </div>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-4">
                    <label class="text-xs font-bold text-text">Loại địa chỉ:</label>
                    <label class="flex items-center gap-1 text-xs cursor-pointer select-none">
                      <input type="radio" value="Nhà riêng" v-model="newAddrForm.badge" class="accent-accent"> Nhà riêng
                    </label>
                    <label class="flex items-center gap-1 text-xs cursor-pointer select-none">
                      <input type="radio" value="Văn phòng" v-model="newAddrForm.badge" class="accent-accent"> Văn phòng
                    </label>
                  </div>

                  <label class="flex items-center gap-1.5 text-xs text-text font-semibold cursor-pointer select-none">
                    <input type="checkbox" v-model="newAddrForm.is_default" class="w-4 h-4 accent-accent rounded"> Đặt làm mặc định
                  </label>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t border-border mt-2">
                  <button
                    type="button"
                    @click="isCreatingAddress = false"
                    class="bg-surface2 border border-border text-text-muted px-5 py-2 rounded-xl font-semibold cursor-pointer hover:bg-[#eee] hover:text-text transition-colors text-sm"
                  >Trở lại</button>
                  <button
                    type="submit"
                    :disabled="newAddrForm.isSubmitting"
                    class="bg-accent border border-accent text-white px-6 py-2 rounded-xl font-display font-semibold cursor-pointer hover:bg-accent-hover transition-all shadow-[0_4px_12px_rgba(255,77,0,0.2)] text-sm disabled:opacity-50"
                  >
                    {{ newAddrForm.isSubmitting ? 'Đang lưu...' : 'Lưu địa chỉ' }}
                  </button>
                </div>
              </form>
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
import { getGHNProvinces, getGHNDistricts, getGHNWards, calculateGHNShippingFee } from '@/api/ghn.js'

const cartCount = inject('cartCount', ref(0))

// ─── Cấu hình tài khoản nhận thanh toán ───────────────────────────────────────
const SHOP_PAYMENT_CONFIG = {
  bankId: 'MB', // Techcombank (TCB), Vietcombank (VCB), MB Bank (MB), ACB, etc.
  bankAccount: '0936715847',
  bankAccountName: 'NGUYEN KHONG DAT'
}

const router = useRouter()
const route = useRoute()

// ─── GHN & Saved Address State ────────────────────────────────────────────────
const ghnProvinces = ref([])
const ghnDistricts = ref([])
const ghnWards = ref([])

const selectedProvinceId = ref(null)
const selectedDistrictId = ref(null)
const selectedWardCode = ref('')
const ghnCalculatedFee = ref(null)

const showAddressModal = ref(false)
const tempSelectedId = ref(1)
const selectedAddressId = ref(1)
const savedAddresses = ref([])

// ─── Inline Address Creation State ──────────────────────────────────────────────
const isCreatingAddress = ref(false)
const newAddrDistricts = ref([])
const newAddrWards = ref([])

const newAddrForm = reactive({
  name: '',
  phone: '',
  province_id: null,
  district_id: null,
  ward_code: '',
  detail: '',
  badge: 'Nhà riêng',
  is_default: false,
  isSubmitting: false
})

async function loadGHNProvinces() {
  try {
    const res = await getGHNProvinces()
    if (res && res.success && res.data) {
      ghnProvinces.value = res.data
    }
  } catch (e) {
    console.error('Không thể tải Tỉnh/Thành từ GHN:', e)
  }
}

async function onProvinceChange() {
  ghnDistricts.value = []
  ghnWards.value = []
  selectedDistrictId.value = null
  selectedWardCode.value = ''
  ghnCalculatedFee.value = null
  if (!selectedProvinceId.value) return

  try {
    const res = await getGHNDistricts(selectedProvinceId.value)
    if (res && res.success && res.data) {
      ghnDistricts.value = res.data
    }
  } catch (e) {
    console.error('Không thể tải Quận/Huyện từ GHN:', e)
  }
}

async function onDistrictChange() {
  ghnWards.value = []
  selectedWardCode.value = ''
  ghnCalculatedFee.value = null
  if (!selectedDistrictId.value) return

  try {
    const res = await getGHNWards(selectedDistrictId.value)
    if (res && res.success && res.data) {
      ghnWards.value = res.data
    }
  } catch (e) {
    console.error('Không thể tải Xã/Phường từ GHN:', e)
  }
}

async function saveGHNToCurrentAddress() {
  if (selectedAddress.value && selectedAddress.value.id && selectedProvinceId.value && selectedDistrictId.value && selectedWardCode.value) {
    try {
      await axiosInstance.put(`/addresses/${selectedAddress.value.id}`, {
        name: selectedAddress.value.name,
        phone: selectedAddress.value.phone,
        address: selectedAddress.value.address,
        badge: selectedAddress.value.badge || 'Nhà riêng',
        is_default: selectedAddress.value.isDefault,
        province_id: selectedProvinceId.value,
        district_id: selectedDistrictId.value,
        ward_code: selectedWardCode.value
      })
      selectedAddress.value.province_id = selectedProvinceId.value
      selectedAddress.value.district_id = selectedDistrictId.value
      selectedAddress.value.ward_code = selectedWardCode.value
    } catch (e) {
      console.error('Lỗi khi lưu vị trí GHN vào địa chỉ:', e)
    }
  }
}

async function autoDetectGHNFromAddress(addr) {
  if (!addr || !addr.address) return false
  const addressText = addr.address.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ')

  if (!ghnProvinces.value || ghnProvinces.value.length === 0) {
    await loadGHNProvinces()
  }

  let matchedProvince = ghnProvinces.value.find(p => {
    const pName = p.ProvinceName.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ')
    if (addressText.includes(pName)) return true
    if (p.NameExtension) {
      return p.NameExtension.some(ext => addressText.includes(ext.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ')))
    }
    if (p.ProvinceID === 202 && (addressText.includes('hcm') || addressText.includes('ho chi minh') || addressText.includes('sai gon') || addressText.includes('saigon') || addressText.includes('tp.hcm') || addressText.includes('tphcm'))) return true
    if (p.ProvinceID === 201 && (addressText.includes('ha noi') || addressText.includes('hanoi') || addressText.includes('hn'))) return true
    return false
  })

  if (!matchedProvince) {
    matchedProvince = ghnProvinces.value.find(p => p.ProvinceID === 202) || ghnProvinces.value[0]
  }

  if (!matchedProvince) return false

  selectedProvinceId.value = matchedProvince.ProvinceID

  try {
    const resD = await getGHNDistricts(matchedProvince.ProvinceID)
    if (resD && resD.success && resD.data) {
      ghnDistricts.value = resD.data
      
      // 1. Thử tìm trực tiếp theo tên Quận/Huyện trong chuỗi địa chỉ
      let matchedDistrict = ghnDistricts.value.find(d => {
        const dName = d.DistrictName.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ').replace(/^(quận|huyện|thành phố|thị xã)\s+/i, '')
        if (dName.length >= 2 && addressText.includes(dName)) return true
        if (d.NameExtension) {
          return d.NameExtension.some(ext => {
            const cleanExt = ext.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ')
            return cleanExt.length >= 2 && addressText.includes(cleanExt)
          })
        }
        return false
      })

      let matchedWard = null

      if (matchedDistrict) {
        selectedDistrictId.value = matchedDistrict.DistrictID
        const resW = await getGHNWards(matchedDistrict.DistrictID)
        if (resW && resW.success && resW.data) {
          ghnWards.value = resW.data
          matchedWard = ghnWards.value.find(w => {
            const wName = w.WardName.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ').replace(/^(xã|phường|thị trấn)\s+/i, '')
            if (wName.length >= 2 && addressText.includes(wName)) return true
            if (w.NameExtension) {
              return w.NameExtension.some(ext => {
                const cleanExt = ext.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ')
                return cleanExt.length >= 2 && addressText.includes(cleanExt)
              })
            }
            return false
          })
        }
      }

      // 2. Nếu chuỗi địa chỉ không ghi tên Quận/Huyện, quét danh sách Xã/Phường của các Quận/Huyện để khớp
      if (!matchedWard) {
        for (const dist of ghnDistricts.value) {
          try {
            const resW = await getGHNWards(dist.DistrictID)
            if (resW && resW.success && resW.data) {
              const foundW = resW.data.find(w => {
                const wName = w.WardName.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ').replace(/^(xã|phường|thị trấn)\s+/i, '')
                if (wName.length >= 3 && addressText.includes(wName)) return true
                if (w.NameExtension) {
                  return w.NameExtension.some(ext => {
                    const cleanExt = ext.toLowerCase().replace(/[\.\,\-\_\s]+/g, ' ')
                    return cleanExt.length >= 3 && addressText.includes(cleanExt)
                  })
                }
                return false
              })

              if (foundW) {
                matchedDistrict = dist
                matchedWard = foundW
                selectedDistrictId.value = dist.DistrictID
                ghnWards.value = resW.data
                break
              }
            }
          } catch (err) {}
        }
      }

      // 3. Tính phí ship GHN chính xác dựa vào khu vực khớp được
      const targetDistrictId = matchedDistrict ? matchedDistrict.DistrictID : (matchedProvince.ProvinceID === 202 ? 1442 : 1442)
      const targetWardCode = matchedWard ? matchedWard.WardCode : '20101'

      selectedDistrictId.value = targetDistrictId
      selectedWardCode.value = targetWardCode

      const resFee = await calculateGHNShippingFee(targetDistrictId, targetWardCode)
      if (resFee && resFee.success && resFee.fee !== undefined) {
        ghnCalculatedFee.value = resFee.fee
      } else {
        ghnCalculatedFee.value = 28000
      }

      if (matchedDistrict && matchedWard) {
        await saveGHNToCurrentAddress()
      }
      return true
    }
  } catch (e) {
    console.error('Error auto detecting GHN location:', e)
  }

  ghnCalculatedFee.value = 28000
  return false
}

async function applyAddressGHN(addr) {
  if (!addr) return
  if (addr.province_id) {
    selectedProvinceId.value = addr.province_id
    try {
      const resD = await getGHNDistricts(addr.province_id)
      if (resD && resD.success && resD.data) {
        ghnDistricts.value = resD.data
      }
    } catch (e) {}

    if (addr.district_id) {
      selectedDistrictId.value = addr.district_id
      try {
        const resW = await getGHNWards(addr.district_id)
        if (resW && resW.success && resW.data) {
          ghnWards.value = resW.data
        }
      } catch (e) {}

      if (addr.ward_code) {
        selectedWardCode.value = addr.ward_code
        try {
          const resFee = await calculateGHNShippingFee(addr.district_id, addr.ward_code)
          if (resFee && resFee.success && resFee.fee !== undefined) {
            ghnCalculatedFee.value = resFee.fee
          }
        } catch (e) {}
      }
    }
  } else {
    // Nếu chưa có ID GHN trong CSDL, chạy tự động nhận diện từ chuỗi chữ địa chỉ
    const detected = await autoDetectGHNFromAddress(addr)
    if (!detected) {
      selectedProvinceId.value = null
      selectedDistrictId.value = null
      selectedWardCode.value = ''
      ghnCalculatedFee.value = null
      ghnDistricts.value = []
      ghnWards.value = []
    }
  }
}

async function onWardChange() {
  if (selectedDistrictId.value && selectedWardCode.value) {
    try {
      const res = await calculateGHNShippingFee(selectedDistrictId.value, selectedWardCode.value)
      if (res && res.success && res.fee !== undefined) {
        ghnCalculatedFee.value = res.fee
        await saveGHNToCurrentAddress()
      }
    } catch (e) {
      console.error('Không thể tính phí ship GHN:', e)
    }
  }
}

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

const voucherOpen = ref(false)
const promoCode = ref('')
const appliedFreeshipVoucher = ref(null)
const appliedOrderVoucher = ref(null)

const freeshipVouchers = computed(() => availableVouchers.value.filter(v => v.type === 'free_ship'))
const orderDiscountVouchers = computed(() => availableVouchers.value.filter(v => v.type !== 'free_ship'))

const voucherHeaderLabel = computed(() => {
  const codes = []
  if (appliedFreeshipVoucher.value) codes.push(appliedFreeshipVoucher.value.code)
  if (appliedOrderVoucher.value) codes.push(appliedOrderVoucher.value.code)
  if (codes.length > 0) return `Đang dùng: ${codes.join(' + ')}`
  return 'Chọn Voucher từ SaigonShoes'
})

function openCreateAddressForm() {
  const userStr = localStorage.getItem('user')
  let userObj = {}
  try { userObj = JSON.parse(userStr) || {} } catch {}

  newAddrForm.name = userObj.name || ''
  newAddrForm.phone = userObj.phone || ''
  newAddrForm.province_id = null
  newAddrForm.district_id = null
  newAddrForm.ward_code = ''
  newAddrForm.detail = ''
  newAddrForm.badge = 'Nhà riêng'
  newAddrForm.is_default = savedAddresses.value.length === 0
  newAddrForm.isSubmitting = false

  newAddrDistricts.value = []
  newAddrWards.value = []
  isCreatingAddress.value = true
}

async function onNewAddrProvinceChange() {
  newAddrDistricts.value = []
  newAddrWards.value = []
  newAddrForm.district_id = null
  newAddrForm.ward_code = ''
  if (!newAddrForm.province_id) return
  try {
    const res = await getGHNDistricts(newAddrForm.province_id)
    if (res && res.success && res.data) {
      newAddrDistricts.value = res.data
    }
  } catch (e) {
    console.error('Không thể tải Quận/Huyện:', e)
  }
}

async function onNewAddrDistrictChange() {
  newAddrWards.value = []
  newAddrForm.ward_code = ''
  if (!newAddrForm.district_id) return
  try {
    const res = await getGHNWards(newAddrForm.district_id)
    if (res && res.success && res.data) {
      newAddrWards.value = res.data
    }
  } catch (e) {
    console.error('Không thể tải Xã/Phường:', e)
  }
}

async function handleSaveNewAddress() {
  if (!newAddrForm.name || !newAddrForm.phone || !newAddrForm.detail || !newAddrForm.province_id || !newAddrForm.district_id || !newAddrForm.ward_code) {
    Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Vui lòng điền đầy đủ tất cả thông tin địa chỉ!', confirmButtonColor: '#FF4D00' })
    return
  }

  const pObj = ghnProvinces.value.find(p => p.ProvinceID === newAddrForm.province_id)
  const dObj = newAddrDistricts.value.find(d => d.DistrictID === newAddrForm.district_id)
  const wObj = newAddrWards.value.find(w => w.WardCode === newAddrForm.ward_code)

  const pName = pObj ? pObj.ProvinceName : ''
  const dName = dObj ? dObj.DistrictName : ''
  const wName = wObj ? wObj.WardName : ''

  const fullAddress = `${newAddrForm.detail.trim()}, ${wName}, ${dName}, ${pName}`.replace(/^,\s*/, '')

  newAddrForm.isSubmitting = true
  try {
    const response = await axiosInstance.post('/addresses', {
      name: newAddrForm.name.trim(),
      phone: newAddrForm.phone.trim(),
      address: fullAddress,
      badge: newAddrForm.badge,
      is_default: newAddrForm.is_default,
      province_id: newAddrForm.province_id,
      district_id: newAddrForm.district_id,
      ward_code: newAddrForm.ward_code
    })

    if (response.success && response.data) {
      const createdAddr = response.data
      await loadAddresses()
      selectedAddressId.value = createdAddr.id
      tempSelectedId.value = createdAddr.id
      isCreatingAddress.value = false
      showAddressModal.value = false
      if (selectedAddress.value) {
        await applyAddressGHN(selectedAddress.value)
      }
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Đã thêm địa chỉ mới thành công!',
        showConfirmButton: false,
        timer: 2000
      })
    }
  } catch (error) {
    console.error('Lỗi tạo địa chỉ mới:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi tạo địa chỉ',
      text: error.response?.data?.message || 'Không thể tạo địa chỉ mới. Vui lòng kiểm tra lại.',
      confirmButtonColor: '#FF4D00'
    })
  } finally {
    newAddrForm.isSubmitting = false
  }
}

// ─── Address Data ──────────────────────────────────────────────────────────────
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
        isDefault: !!item.is_default,
        province_id: item.province_id,
        district_id: item.district_id,
        ward_code: item.ward_code
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

      if (selectedAddress.value) {
        await applyAddressGHN(selectedAddress.value)
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
  await loadGHNProvinces()
  await loadAddresses()
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
const hasFlashSaleInCart = computed(() => {
  if (!summary.value.items || summary.value.items.length === 0) return false
  return summary.value.items.some(item => {
    const v = item.variantObj || item.variant || {}
    const fs = v.flash_sale || v.flashSale
    const hasFsId = !!(item.flash_sale_id || v.flash_sale_id || item.is_flash_sale)
    const hasSalePrice = (item.sale_price !== null && item.sale_price !== undefined && Number(item.sale_price) > 0) || (v.sale_price !== null && v.sale_price !== undefined && Number(v.sale_price) > 0)
    
    if (fs) {
      const now = new Date()
      const isStatusActive = Number(fs.status) === 1
      const startTime = fs.start_time ? new Date(fs.start_time.replace(/-/g, '/')) : null
      const endTime = fs.end_time ? new Date(fs.end_time.replace(/-/g, '/')) : null
      const isTimeActive = (!startTime || now >= startTime) && (!endTime || now <= endTime)
      return isStatusActive && isTimeActive
    }

    return hasFsId || hasSalePrice
  })
})

const selectedAddress = computed(() =>
  savedAddresses.value.find(a => a.id === selectedAddressId.value) || savedAddresses.value[0] || {}
)

function parseNumeric(val) {
  if (typeof val === 'number') return isNaN(val) ? 0 : val
  if (!val) return 0
  const cleaned = String(val).replace(/[^0-9]/g, '')
  return parseInt(cleaned, 10) || 0
}

const baseShippingFee = computed(() => {
  if (ghnCalculatedFee.value !== null) return parseNumeric(ghnCalculatedFee.value)
  return form.shippingMethod === 'express' ? 50000 : 30000
})

const freeshipDiscountAmount = computed(() => {
  if (!appliedFreeshipVoucher.value) return 0
  const cap = parseNumeric(appliedFreeshipVoucher.value.value)
  const limit = cap > 0 ? cap : baseShippingFee.value
  return Math.min(baseShippingFee.value, limit)
})

const shippingFee = computed(() => {
  return Math.max(0, baseShippingFee.value - freeshipDiscountAmount.value)
})

const orderDiscountAmount = computed(() => {
  if (!appliedOrderVoucher.value) return 0
  const v = appliedOrderVoucher.value
  const sub = parseNumeric(summary.value.subtotal)
  const val = parseNumeric(v.value)

  if (v.type === 'percent') {
    const rawVal = typeof v.value === 'number' ? v.value : parseFloat(v.value)
    const pct = rawVal < 1 && rawVal > 0 ? rawVal : val / 100
    let dist = sub * pct
    if (v.maxDiscount) {
      dist = Math.min(dist, parseNumeric(v.maxDiscount))
    }
    return dist
  }

  return val
})

const discountAmount = computed(() => orderDiscountAmount.value)

const totalPrice = computed(() => {
  const sub = parseNumeric(summary.value.subtotal)
  return Math.max(0, sub + shippingFee.value - orderDiscountAmount.value)
})

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

// ─── Methods ──────────────────────────────────────────────────────────────────
function badgeStyle(badge) {
  if (badge === 'Mặc định') return { background: 'rgba(255,77,0,0.1)', color: '#FF4D00' }
  if (badge === 'Nhà riêng') return { background: 'rgba(33,150,243,0.1)', color: '#2196f3' }
  return { background: 'rgba(76,175,80,0.1)', color: '#4caf50' }
}

async function confirmAddress() {
  selectedAddressId.value = tempSelectedId.value
  showAddressModal.value = false
  if (selectedAddress.value) {
    await applyAddressGHN(selectedAddress.value)
  }
}

async function toggleVoucher(voucher) {
  if (voucher.type === 'free_ship') {
    if (appliedFreeshipVoucher.value?.code === voucher.code) {
      appliedFreeshipVoucher.value = null
      Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Đã hủy chọn mã Miễn phí vận chuyển', showConfirmButton: false, timer: 1500 })
    } else {
      await applyVoucherCode(voucher.code)
    }
  } else {
    if (hasFlashSaleInCart.value) {
      Swal.fire({ icon: 'warning', title: 'Không thể chọn mã', text: 'Đơn hàng chứa sản phẩm Flash Sale chỉ được áp dụng mã Miễn phí vận chuyển!', confirmButtonColor: '#FF4D00' })
      return
    }
    if (appliedOrderVoucher.value?.code === voucher.code) {
      appliedOrderVoucher.value = null
      Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Đã hủy chọn mã Giảm giá đơn hàng', showConfirmButton: false, timer: 1500 })
    } else {
      await applyVoucherCode(voucher.code)
    }
  }
}

async function applyVoucherCode(codeToApply) {
  let baseShipping = form.shippingMethod === 'express' ? 50000 : 30000

  try {
    const payload = {
      code: codeToApply,
      subtotal: summary.value.subtotal,
      shipping_fee: baseShipping,
      has_flash_sale: hasFlashSaleInCart.value
    }
    if (summary.value.isBuyNow && summary.value.items.length === 1) {
      payload.variant_id = summary.value.items[0]?.variant_id
    } else if (summary.value.items && summary.value.items.length > 0) {
      payload.cart_item_ids = summary.value.items.map(item => item.id)
    }

    const resp = await axiosInstance.post('/vouchers/apply', payload)
    if (resp.success && resp.data) {
      const v = resp.data
      const voucherObj = {
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

      if (v.type === 'free_ship') {
        appliedFreeshipVoucher.value = voucherObj
      } else {
        appliedOrderVoucher.value = voucherObj
      }
      promoCode.value = ''
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Đã áp dụng mã ${v.code}!`,
        showConfirmButton: false,
        timer: 1500
      })
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
  applyVoucherCode(code)
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
      province_id: selectedProvinceId.value,
      district_id: selectedDistrictId.value,
      ward_code: selectedWardCode.value,
      note: orderNote,
      payment_method_id: form.paymentMethod === 'cod' ? 1 : 2,
      voucher_id: appliedOrderVoucher.value ? appliedOrderVoucher.value.id : null,
      voucher_code: appliedOrderVoucher.value ? appliedOrderVoucher.value.code : null,
      shipping_voucher_id: appliedFreeshipVoucher.value ? appliedFreeshipVoucher.value.id : null,
      shipping_voucher_code: appliedFreeshipVoucher.value ? appliedFreeshipVoucher.value.code : null,
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
  const isCancelled = route.query.payment_cancel === '1'
    || route.query.cancel === 'true'
    || (route.query.status && (
         route.query.status === 'cancelled' ||
         route.query.status === 'CANCELLED' ||
         (Array.isArray(route.query.status) && route.query.status.some(s => String(s).toLowerCase() === 'cancelled'))
       ))
  const cancelOrderId = route.query.order_id || route.query.orderCode

  if (isCancelled && cancelOrderId) {
    const orderId = cancelOrderId
    Swal.fire({
      title: 'Đang hủy giao dịch...',
      text: 'Vui lòng chờ trong giây lát.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })
    try {
      // 1. Call Backend to update order status to 'cancelled' and restore cart
      await axiosInstance.post(`/user/orders/${orderId}/cancel`, { restore_cart: true })

      // 2. Update status to 'cancelled' in local orders in localStorage
      const localOrders = localStorage.getItem('saigon_orders')
      if (localOrders) {
        try {
          let ordersList = JSON.parse(localOrders) || []
          ordersList = ordersList.map(o => {
            if (o.orderId === 'SGS-' + orderId || o.id == orderId) {
              o.status = 'cancelled'
            }
            return o
          })
          localStorage.setItem('saigon_orders', JSON.stringify(ordersList))
        } catch (e) {
          console.error(e)
        }
      }

      Swal.close()
      Swal.fire({
        icon: 'info',
        title: 'Đơn hàng đã hủy',
        text: 'Đơn hàng đã hủy và hàng đó sẽ về giỏ hàng của bạn.',
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
      if (summary.value.freeshipVoucher) appliedFreeshipVoucher.value = summary.value.freeshipVoucher
      if (summary.value.orderVoucher) appliedOrderVoucher.value = summary.value.orderVoucher
    } catch {
      loadFromCart()
    }
  } else {
    loadFromCart()
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
        
        const isFs = !!(v.flash_sale_id || (v.sale_price !== null && v.sale_price !== undefined && Number(v.sale_price) > 0))
        const effectivePrice = (v.sale_price !== null && v.sale_price !== undefined && Number(v.sale_price) > 0) ? Number(v.sale_price) : (v.price || 0)

        return {
          id: item.id,
          variant_id: v.id,
          productId: p.id || 1,
          name: p.name || 'Sản phẩm',
          variant: (v.color?.name || v.size?.name) 
            ? `Màu ${v.color?.name || ''} · Size ${v.size?.name || ''}`
            : 'Mặc định',
          price: effectivePrice,
          originalPrice: v.price || 0,
          qty: item.quantity || 1,
          image: img,
          is_flash_sale: isFs,
          flash_sale_id: v.flash_sale_id || null,
          sale_price: v.sale_price || null,
          variantObj: v
        }
      })

      if (!items.length) {
        router.push({ name: 'cart' })
        return
      }
      const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)
      const shippingFee = 30000
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
