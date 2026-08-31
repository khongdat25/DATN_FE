<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Quản lý Đơn hàng</h1>
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
          Tất cả ({{ orders.length }})
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
        <button 
          @click="activeStatusTab = 'refund_requested'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2 flex items-center gap-1.5',
            activeStatusTab === 'refund_requested' ? 'text-amber-600 border-amber-500' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          <span v-if="refundRequestedCount > 0" class="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block"></span>
          <span>Yêu cầu hoàn tiền</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-extrabold">{{ refundRequestedCount }}</span>
        </button>
        <button 
          @click="activeStatusTab = 'refunded'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2 flex items-center gap-1.5',
            activeStatusTab === 'refunded' ? 'text-purple-600 border-purple-500' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          <span>Đã hoàn tiền</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-800 font-extrabold">{{ orders.filter(o => o.payment_status === 'refunded').length }}</span>
        </button>
        <button 
          @click="activeStatusTab = 'cancelled'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeStatusTab === 'cancelled' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đã hủy ({{ orders.filter(o => o.status === 'cancelled').length }})
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
                    <div class="flex flex-col gap-1 items-start">
                      <span :class="['inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap', getStatusBadgeClass(order.status)]">
                        <span :class="['w-1.5 h-1.5 rounded-full', getStatusBulletClass(order.status)]"></span>
                        {{ getStatusText(order.status) }}
                      </span>

                      <!-- Refund Status Badges -->
                      <span v-if="isRefundOrder(order)" class="inline-flex items-center gap-1 text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                        💸 Chờ hoàn tiền
                      </span>
                      <span v-else-if="order.payment_status === 'refunded'" class="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap bg-purple-50 text-purple-700 border border-purple-200">
                        ✅ Đã hoàn tiền
                      </span>
                      <span v-else :class="['inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap', getPaymentStatusBadgeClass(order.payment_status)]">
                        {{ getPaymentStatusText(order.payment_status) }}
                      </span>

                      <!-- Customer Bank Account Badge -->
                      <span v-if="order.bank_account_number" class="inline-flex items-center gap-1 text-[9px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap bg-amber-50 text-amber-900 border border-amber-200" title="Thông tin STK khách nhận tiền">
                        💳 STK: {{ order.bank_name }} - {{ order.bank_account_number }}
                      </span>
                    </div>
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

                        <!-- Timeline Lịch sử cập nhật -->
                        <div class="text-[10px] font-bold tracking-[1.5px] text-slate-400 uppercase flex items-center gap-1.5 text-left pt-2">
                          <i class="ti ti-history"></i> Lịch sử thay đổi đơn hàng
                        </div>
                        <div class="bg-white border border-slate-100 rounded-xl p-5 shadow-xs max-h-60 overflow-y-auto">
                          <div class="relative pl-6 space-y-4 text-xs text-left">
                            <div v-for="(log, idx) in order.histories" :key="idx" class="relative">
                              <!-- Line connecting bullets -->
                              <div v-if="idx < order.histories.length - 1" class="absolute -left-4.25 top-5 -bottom-5 w-0.5 bg-slate-100"></div>
                              
                              <!-- Bullet indicator -->
                              <span class="absolute -left-5.75 top-0.5 w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center"
                                :class="log.new_status === 'cancelled' ? 'bg-red-400!' : (log.new_status === 'delivered' ? 'bg-emerald-400!' : 'bg-slate-350!')"
                              ></span>
                              
                              <div class="font-medium">
                                <span class="font-bold text-slate-800">{{ log.note }}</span>
                                <span class="text-[10px] text-slate-400 block mt-0.5">
                                  ⏱️ {{ log.created_at }}
                                  <span v-if="log.old_status || log.new_status" class="text-slate-500 font-semibold ml-2">
                                    [{{ getStatusText(log.old_status) || 'Khởi tạo' }} → {{ getStatusText(log.new_status) }}]
                                  </span>
                                  <span v-if="log.old_payment_status || log.new_payment_status" class="text-slate-500 font-semibold ml-2">
                                    [Thanh toán: {{ getPaymentStatusText(log.old_payment_status) || 'Chờ' }} → {{ getPaymentStatusText(log.new_payment_status) }}]
                                  </span>
                                </span>
                              </div>
                            </div>
                            
                            <div v-if="!order.histories || order.histories.length === 0" class="text-slate-400 text-center py-2">
                              Chưa có lịch sử cập nhật.
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

                          <!-- GHN Order Fulfillment Card -->
                          <div class="p-3 bg-orange-50/90 border border-orange-200 rounded-xl space-y-2 text-left">
                            <div class="font-extrabold text-orange-950 flex items-center justify-between text-[11px] uppercase tracking-wider">
                              <span class="flex items-center gap-1.5"><i class="ti ti-truck text-orange-600 text-base"></i> Vận chuyển GHN Express</span>
                              <span v-if="order.ghn_order_code" class="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-200 text-orange-900 font-mono">
                                {{ order.ghn_order_code }}
                              </span>
                            </div>

                            <div v-if="!order.ghn_order_code && order.status !== 'cancelled'">
                              <button 
                                type="button" 
                                @click="handlePushToGHN(order)"
                                class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2 px-3 rounded-lg shadow-sm transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 font-display"
                              >
                                <i class="ti ti-send text-sm"></i> 🚚 Đẩy đơn sang GHN lấy mã vận đơn
                              </button>
                            </div>
                            <div v-else-if="order.status === 'cancelled' && !order.ghn_order_code" class="text-[11px] font-semibold text-slate-500 bg-orange-100/50 p-2 rounded-lg text-center border border-orange-200/60">
                              🚫 Đơn hàng đã bị hủy, không thể tạo vận đơn GHN.
                            </div>
                            <div v-else class="text-[11px] text-orange-900 font-semibold space-y-2">
                              <div>Mã vận đơn: <strong class="font-mono text-orange-700 select-all">{{ order.ghn_order_code }}</strong></div>
                              <div class="flex flex-wrap items-center gap-2">
                                <a 
                                  :href="'https://donhang.ghn.vn/?order_code=' + order.ghn_order_code" 
                                  target="_blank" 
                                  class="inline-flex items-center gap-1 text-orange-600 hover:underline font-bold"
                                >
                                  <i class="ti ti-external-link text-xs"></i> Tra cứu hành trình GHN →
                                </a>
                                <button 
                                  v-if="order.status !== 'cancelled'"
                                  type="button" 
                                  @click="handleCancelGHN(order)"
                                  class="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg px-2.5 py-1 transition-all cursor-pointer shadow-2xs"
                                >
                                  <i class="ti ti-x text-xs"></i> Hủy vận đơn GHN
                                </button>
                              </div>
                            </div>
                          </div>

                          <!-- Refund Bank Info Card (If present or refund pending) -->
                          <div v-if="isRefundOrder(order) || order.payment_status === 'refunded' || order.cancel_reason || order.bank_account_number || order.bank_name" class="p-4 bg-amber-50/90 border border-amber-200/90 rounded-2xl space-y-3 text-left shadow-2xs">
                            <div class="flex items-center justify-between">
                              <div class="font-extrabold text-amber-950 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                                <i class="ti ti-receipt-refund text-amber-600 text-base"></i> Thông tin Yêu cầu Hoàn tiền
                              </div>
                              <span v-if="order.payment_status === 'refunded'" class="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                                ĐÃ HOÀN TIỀN
                              </span>
                              <span v-else-if="isRefundOrder(order)" class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 animate-pulse">
                                CHỜ HOÀN TIỀN
                              </span>
                            </div>

                            <div v-if="order.cancel_reason" class="text-amber-950 text-xs bg-white/70 p-2.5 rounded-xl border border-amber-100">
                              <strong class="text-amber-900 font-bold">Lý do hủy:</strong> {{ order.cancel_reason }}
                            </div>

                            <div v-if="order.bank_account_number" class="space-y-2 text-amber-950 text-xs pt-1 border-t border-amber-200/80">
                              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div><strong class="text-amber-900 font-semibold">Ngân hàng:</strong> <span class="font-bold">{{ order.bank_name }}</span></div>
                                <div><strong class="text-amber-900 font-semibold">Chủ tài khoản:</strong> <span class="font-bold uppercase text-slate-900">{{ order.bank_account_name }}</span></div>
                              </div>

                              <div class="flex items-center justify-between bg-white p-2.5 rounded-xl border border-amber-200">
                                <div>
                                  <span class="text-[10px] uppercase font-bold text-slate-400 block">SỐ TÀI KHOẢN NHẬN TIỀN</span>
                                  <span class="font-mono font-extrabold text-sm text-slate-900 select-all">{{ order.bank_account_number }}</span>
                                </div>
                                <button 
                                  @click="copyBankAccount(order.bank_account_number)" 
                                  type="button"
                                  class="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-300 transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <i class="ti ti-copy text-sm"></i>
                                  <span>Sao chép STK</span>
                                </button>
                              </div>

                              <div v-if="order.refund_notes" class="text-[11px] text-amber-800 italic">
                                * Ghi chú hoàn tiền từ khách: "{{ order.refund_notes }}"
                              </div>
                            </div>
                            <div v-else-if="isRefundOrder(order)" class="text-amber-800 text-xs italic bg-white/70 p-2.5 rounded-xl border border-amber-200">
                              ⚠️ Đơn hàng này đã thanh toán nhưng bị hủy. Khách chưa cập nhật thông tin tài khoản ngân hàng nhận tiền.
                            </div>

                            <!-- Quick Action 1-Click Refund -->
                            <div v-if="isRefundOrder(order) && order.payment_status !== 'refunded'" class="pt-2">
                              <button 
                                @click="quickConfirmRefund(order)" 
                                type="button"
                                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all border-none cursor-pointer flex items-center justify-center gap-2 font-display"
                              >
                                <i class="ti ti-check text-base"></i>
                                <span>Xác nhận Đã hoàn tiền cho đơn hàng này</span>
                              </button>
                            </div>
                          </div>

                          <div class="h-px bg-slate-100"></div>
                          
                          <!-- Action Control -->
                          <div class="space-y-3">
                            <div>
                              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Cập nhật trạng thái đơn</label>
                              <select 
                                v-model="order.tempStatus" 
                                class="w-full bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold"
                              >
                                <option value="new" :disabled="!isStatusTransitionAllowed(order.status, 'new')">Đơn mới</option>
                                <option value="pending" :disabled="!isStatusTransitionAllowed(order.status, 'pending')">Chờ xử lý</option>
                                <option value="shipping" :disabled="!isStatusTransitionAllowed(order.status, 'shipping')">Đang giao</option>
                                <option value="delivered" :disabled="!isStatusTransitionAllowed(order.status, 'delivered')">Đã giao</option>
                                <option value="cancelled" :disabled="!isStatusTransitionAllowed(order.status, 'cancelled')">Đã hủy</option>
                              </select>
                            </div>

                            <div>
                              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Trạng thái thanh toán</label>
                              <select 
                                v-model="order.tempPaymentStatus" 
                                class="w-full bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer font-semibold"
                              >
                                <option value="pending">Chờ thanh toán / Chưa thanh toán</option>
                                <option value="paid">Đã thanh toán</option>
                                <option value="refunded">Đã hoàn tiền</option>
                              </select>
                            </div>

                            <div class="flex gap-2 pt-1">
                              <button 
                                @click="updateStatus(order)" 
                                class="flex-1 bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2 rounded-xl border-none transition-colors cursor-pointer shadow-xs font-display"
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
import { pushOrderToGHN, cancelGHNOrder } from '@/api/ghn.js'

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

async function handlePushToGHN(order) {
  if (order.status === 'cancelled') {
    Swal.fire({
      icon: 'error',
      title: 'Không thể đẩy đơn',
      text: 'Đơn hàng này đã bị hủy, không thể tạo vận đơn sang GHN!',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  Swal.fire({
    title: 'Đang đẩy đơn sang GHN...',
    text: 'Hệ thống đang kết nối tới Giao Hàng Nhanh...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  })

  try {
    const res = await pushOrderToGHN(order.id)
    if (res && res.success) {
      order.ghn_order_code = res.ghn_order_code
      order.status = 'shipping'
      order.tempStatus = 'shipping'
      Swal.fire({
        icon: 'success',
        title: 'ĐẨY ĐƠN THÀNH CÔNG! 🚚',
        html: `Mã vận đơn GHN: <strong class="text-orange-600 font-mono text-base">${res.ghn_order_code}</strong><br><br>Đã chuyển trạng thái đơn hàng thành <strong>Đang giao hàng</strong>.`,
        confirmButtonColor: '#FF4D00'
      })
      await fetchOrders()
    }
  } catch (error) {
    console.error('Lỗi đẩy đơn sang GHN:', error)
    const errMsg = error.response?.data?.message || 'Có lỗi khi kết nối tới hệ thống GHN.'
    
    let tipHtml = ''
    if (errMsg.includes('giới hạn 3 đơn') || errMsg.includes('vượt quá số lượng')) {
      tipHtml = `<br><br><div class="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 text-left">💡 <strong>Mẹo:</strong> Tài khoản thử nghiệm GHN đang bị giới hạn tối đa 3 đơn. Bạn hãy bấm <strong>"Hủy vận đơn GHN"</strong> ở các đơn thử nghiệm cũ để giải phóng slot, hoặc thay <strong>Token/ShopID GHN chính thức</strong> vào file <code>.env</code> Backend.</div>`
    }

    Swal.fire({
      icon: 'error',
      title: 'Đẩy đơn thất bại từ GHN',
      html: `${errMsg}${tipHtml}`,
      confirmButtonColor: '#FF4D00'
    })
  }
}

async function handleCancelGHN(order) {
  const result = await Swal.fire({
    title: 'Hủy vận đơn GHN?',
    html: `Bạn có chắc chắn muốn hủy vận đơn <strong class="text-orange-600 font-mono text-base">${order.ghn_order_code}</strong> trên hệ thống Giao Hàng Nhanh không?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý hủy vận đơn GHN',
    cancelButtonText: 'Không'
  })

  if (result.isConfirmed) {
    Swal.fire({
      title: 'Đang hủy vận đơn GHN...',
      text: 'Hệ thống đang kết nối tới Giao Hàng Nhanh...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })

    try {
      const res = await cancelGHNOrder(order.id)
      if (res && res.success) {
        order.status = 'cancelled'
        order.tempStatus = 'cancelled'
        Swal.fire({
          icon: 'success',
          title: 'ĐÃ HỦY VẬN ĐƠN GHN! 🛑',
          html: res.message || `Mã vận đơn <strong>${order.ghn_order_code}</strong> đã được hủy thành công trên GHN.`,
          confirmButtonColor: '#FF4D00'
        })
        await fetchOrders()
      }
    } catch (error) {
      console.error('Lỗi hủy vận đơn GHN:', error)
      Swal.fire({
        icon: 'error',
        title: 'Hủy vận đơn GHN thất bại',
        text: error.response?.data?.message || 'GHN từ chối hủy hoặc có lỗi kết nối hệ thống GHN.',
        confirmButtonColor: '#FF4D00'
      })
    }
  }
}

async function fetchOrders() {
  try {
    const response = await axiosInstance.get('/admin/orders')
    if (response && response.success) {
      orders.value = response.data.map(order => {
        // Ánh xạ tên phương thức thanh toán
        let pm = 'COD'
        if (order.payment_method_id === 2) pm = 'Chuyển khoản'
        if (order.payment_method_id === 3) pm = 'VNPAY'

        // Ánh xạ danh sách sản phẩm
        const items = (order.items || []).map(item => {
          const v = item.variant || {}
          const p = v.product || {}
          
          let img = '/images/nike-air-force-1.png'
          if (p.images && p.images.length > 0) {
            const firstImg = p.images[0]
            const imgPath = typeof firstImg === 'string' ? firstImg : (firstImg?.image || '')
            img = getImageUrl(imgPath)
          } else if (v.image) {
            img = getImageUrl(v.image)
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
          payment_status: order.payment_status || 'pending',
          tempPaymentStatus: order.payment_status || 'pending',
          receiverName: order.name || 'Chưa rõ',
          receiverPhone: order.phone || '',
          receiverAddress: order.address || 'Chưa rõ',
          ghn_order_code: order.ghn_order_code || null,
          cancel_reason: order.cancel_reason || order.reason || '',
          bank_name: order.bank_name || '',
          bank_account_number: order.bank_account_number || '',
          bank_account_name: order.bank_account_name || '',
          refund_notes: order.refund_notes || '',
          items: items,
          histories: (order.histories || []).map(h => ({
            note: h.note,
            old_status: h.old_status,
            new_status: h.new_status,
            old_payment_status: h.old_payment_status,
            new_payment_status: h.new_payment_status,
            created_at: h.created_at ? new Date(h.created_at).toLocaleString('vi-VN') : ''
          }))
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

function isRefundOrder(o) {
  if (!o) return false
  // Đã hoàn tiền rồi thì bỏ qua
  if (o.payment_status === 'refunded') return false
  // Chỉ cần hoàn tiền khi đơn đã bị hủy VÀ đã thanh toán thực sự (payment_status === 'paid')
  if (o.status === 'cancelled' && o.payment_status === 'paid') return true
  return false
}

const refundRequestedCount = computed(() => {
  return orders.value.filter(o => isRefundOrder(o)).length
})

const filteredOrders = computed(() => {
  return orders.value.filter(o => {
    const matchesSearch = o.code.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          o.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          o.receiverName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    let matchesTab = true
    if (activeStatusTab.value === 'refund_requested') {
      matchesTab = isRefundOrder(o)
    } else if (activeStatusTab.value === 'refunded') {
      matchesTab = o.payment_status === 'refunded'
    } else if (activeStatusTab.value !== 'all') {
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

function copyBankAccount(accountNum) {
  if (!accountNum) return
  navigator.clipboard.writeText(accountNum)
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title: 'Đã sao chép số tài khoản!',
    text: accountNum,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  })
}



async function quickConfirmRefund(order) {
  Swal.fire({
    title: 'Xác nhận Đã hoàn tiền?',
    text: `Bạn có chắc chắn đã hoàn tiền cho đơn hàng ${order.code}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Xác nhận Đã hoàn tiền!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.post(`/admin/orders/${order.id}/status`, {
          status: 'cancelled',
          payment_status: 'refunded'
        })
        if (response && response.success) {
          order.payment_status = 'refunded'
          order.tempPaymentStatus = 'refunded'
          Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: `Đơn hàng ${order.code} đã cập nhật trạng thái Đã hoàn tiền.`,
            confirmButtonColor: '#10b981'
          })
          await fetchOrders()
        }
      } catch (error) {
        console.error('Error confirming refund:', error)
        Swal.fire('Lỗi', error.response?.data?.message || 'Không thể cập nhật trạng thái', 'error')
      }
    }
  })
}

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

function isStatusTransitionAllowed(currentStatus, targetStatus) {
  if (currentStatus === targetStatus) return true;
  const allowedTransitions = {
    'new': ['pending', 'shipping', 'delivered', 'cancelled'],
    'pending': ['shipping', 'delivered', 'cancelled'],
    'shipping': ['delivered', 'cancelled'],
    'delivered': [],
    'cancelled': []
  };
  return (allowedTransitions[currentStatus] || []).includes(targetStatus);
}

function getPaymentStatusText(status) {
  switch (status) {
    case 'pending': return 'Chưa thanh toán'
    case 'paid': return 'Đã thanh toán'
    case 'refunded': return 'Đã hoàn tiền'
    default: return status
  }
}

function getPaymentStatusBadgeClass(status) {
  switch (status) {
    case 'pending': return 'bg-rose-50 text-rose-700 border border-rose-200'
    case 'paid': return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    case 'refunded': return 'bg-purple-50 text-purple-700 border border-purple-200'
    default: return 'bg-slate-100 text-slate-700 border border-slate-200'
  }
}

async function updateStatus(order) {
  if (order.tempStatus === 'cancelled' && order.ghn_order_code && order.status !== 'cancelled') {
    const confirmGHNCancel = await Swal.fire({
      title: 'Đơn hàng có mã GHN Express',
      html: `Đơn hàng này đã có mã vận đơn GHN: <strong class="text-orange-600 font-mono">${order.ghn_order_code}</strong>.<br><br>Bạn có muốn gửi yêu cầu <strong>Hủy vận đơn trên GHN</strong> đồng thời với việc hủy đơn trên Website không?`,
      icon: 'question',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: '#ef4444',
      denyButtonColor: '#f59e0b',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Hủy trên Web & GHN',
      denyButtonText: 'Chỉ hủy trên Web',
      cancelButtonText: 'Hủy thao tác'
    })

    if (confirmGHNCancel.isDismissed) {
      // Restore tempStatus back to current status
      order.tempStatus = order.status
      return
    }

    if (confirmGHNCancel.isConfirmed) {
      // Hủy cả bên GHN
      return await handleCancelGHN(order)
    }
    // Nếu chọn deny (Chỉ hủy trên Web) -> tiếp tục xuống bên dưới
  }

  try {
    const response = await axiosInstance.post(`/admin/orders/${order.id}/status`, {
      status: order.tempStatus,
      payment_status: order.tempPaymentStatus
    })

    if (response && response.success) {
      order.status = order.tempStatus
      order.payment_status = order.tempPaymentStatus
      
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công!',
        text: `Đơn hàng ${order.code} đã được cập nhật thành công.`,
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
