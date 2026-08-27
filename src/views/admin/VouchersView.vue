
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="text-left">
        <div class="flex items-center gap-3">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {{ categoryTab === 'shipping' ? 'Mã miễn phí vận chuyển (Free ship)' : 'Mã giảm giá đơn hàng' }}
          </h1>
          <span :class="['px-2.5 py-1 rounded-full text-xs font-extrabold border', categoryTab === 'shipping' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-accent border-orange-200']">
            {{ categoryTab === 'shipping' ? `${shippingVouchersCount} mã` : `${orderVouchersCount} mã` }}
          </span>
        </div>
        <p class="text-sm text-slate-500 mt-1">
          {{ categoryTab === 'shipping' ? 'Quản lý các chương trình ưu đãi miễn phí hoặc trợ giá vận chuyển.' : 'Quản lý các chương trình chiết khấu đơn hàng theo phần trăm hoặc số tiền cố định.' }}
        </p>
      </div>
      <div>
        <button 
          @click="openAddModal" 
          class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer"
        >
          <i class="ti ti-plus text-base"></i> 
          {{ categoryTab === 'shipping' ? 'Thêm Mã Free Ship Mới' : 'Thêm Mã Giảm Giá Mới' }}
        </button>
      </div>
    </div>

    <!-- Quick Status Filter Tabs Level 2 -->
    <div class="flex border-b border-b-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap bg-white px-6 rounded-t-2xl border-t border-x border-slate-100 shadow-2xs">
      <button 
        @click="activeTab = 'all'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeTab === 'all' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Tất cả ({{ currentCategoryVouchers.length }})
      </button>
      <button 
        @click="activeTab = 'active'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeTab === 'active' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Đang hoạt động ({{ currentCategoryVouchers.filter(v => v.status === 'active').length }})
      </button>
      <button 
        @click="activeTab = 'upcoming'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeTab === 'upcoming' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Sắp diễn ra ({{ currentCategoryVouchers.filter(v => v.status === 'upcoming').length }})
      </button>
      <button 
        @click="activeTab = 'expired'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
          activeTab === 'expired' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        Đã hết hạn ({{ currentCategoryVouchers.filter(v => v.status === 'expired').length }})
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
          :placeholder="categoryTab === 'shipping' ? 'Tìm mã code, chương trình freeship...' : 'Tìm kiếm mã voucher, tên chương trình...'" 
          class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800 font-semibold"
        >
      </div>

      <!-- Helper status display -->
      <div class="text-xs text-slate-500 font-medium">
        Đang xem: <span class="font-bold text-slate-900">{{ categoryTab === 'shipping' ? 'Mã miễn phí vận chuyển' : 'Mã giảm giá đơn hàng' }}</span>
      </div>
    </div>

    <!-- Vouchers Table -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">MÃ CODE VOUCHER</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TÊN CHƯƠNG TRÌNH</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">LOẠI ƯU ĐÃI</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {{ categoryTab === 'shipping' ? 'MỨC MIỄN PHÍ SHIP' : 'MỨC GIẢM GIÁ' }}
              </th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ĐƠN TỐI THIỂU</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ĐÃ DÙNG / TỔNG</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
              <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KÍCH HOẠT</th>
              <th class="py-4 px-6 w-24"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="v in filteredVouchers" 
              :key="v.code" 
              :class="[
                'hover:bg-slate-50/30 transition-all font-medium',
                v.status === 'expired' ? 'bg-slate-50/50 opacity-70' : ''
              ]"
            >
              <td class="py-4 px-6">
                <span 
                  :class="[
                    'inline-block px-3 py-1.5 text-xs font-extrabold rounded-lg border border-dashed font-mono',
                    v.status === 'expired' ? 'text-slate-400 bg-slate-100 border-slate-300' : 'text-accent bg-orange-50/50 border-orange-200'
                  ]"
                >
                  {{ v.code }}
                </span>
              </td>
              <td 
                class="py-4 px-6 text-xs font-semibold text-left"
                :class="v.status === 'expired' ? 'text-slate-400 line-through' : 'text-slate-900'"
              >
                {{ v.name }}
              </td>
              <td class="py-4 px-6 text-xs text-slate-500 text-left" :class="v.status === 'expired' ? 'line-through' : ''">
                <span v-if="v.isShipping" class="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md text-[11px] font-bold">
                  <i class="ti ti-truck-delivery"></i> Free Ship
                </span>
                <span v-else class="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-1 rounded-md text-[11px] font-semibold">
                  {{ v.type }}
                </span>
              </td>
              <td class="py-4 px-6 text-xs font-bold text-slate-900 text-left" :class="v.status === 'expired' ? 'line-through' : ''">
                <span :class="v.isShipping ? 'text-emerald-600 font-extrabold' : 'text-slate-900'">
                  {{ v.valueDisplay }}
                </span>
              </td>
              <td class="py-4 px-6 text-xs text-slate-700 text-left" :class="v.status === 'expired' ? 'line-through' : ''">
                {{ v.minOrder > 0 ? formatCurrency(v.minOrder) : 'Không yêu cầu' }}
              </td>
              <td class="py-4 px-6 text-xs text-slate-500 text-left">
                {{ v.used }} / {{ v.total }} lượt
              </td>
              <td class="py-4 px-6 text-left">
                <span 
                  v-if="v.status === 'active'"
                  class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đang hoạt động
                </span>
                <span 
                  v-else-if="v.status === 'upcoming'"
                  class="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Sắp diễn ra
                </span>
                <span 
                  v-else
                  class="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  <span class="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Đã hết lượt / Khóa
                </span>
              </td>
              <td class="py-4 px-6 text-left">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    :checked="v.status === 'active'" 
                    :disabled="v.status === 'expired'"
                    @change="toggleVoucherActive(v)" 
                    class="sr-only peer"
                  >
                  <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent peer-disabled:opacity-50"></div>
                </label>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center gap-2 justify-end">
                  <button 
                    @click="openEditModal(v)"
                    class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                  >
                    Chỉnh sửa
                  </button>
                  <button 
                    @click="deleteVoucher(v.code)" 
                    class="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center border-none transition-all cursor-pointer"
                  >
                    <i class="ti ti-trash text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredVouchers.length === 0">
              <td colspan="9" class="text-center py-12 text-slate-400 text-sm">
                Không tìm thấy {{ categoryTab === 'shipping' ? 'mã miễn phí vận chuyển' : 'mã giảm giá đơn hàng' }} nào phù hợp.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Pagination -->
      <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-xs text-slate-400">Hiển thị 1 - {{ filteredVouchers.length }} của {{ filteredVouchers.length }} voucher</span>
        <div class="flex items-center gap-1.5">
          <button class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" disabled>
            <i class="ti ti-chevron-left text-sm"></i>
          </button>
          <button class="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center text-xs font-bold border-none cursor-pointer">1</button>
          <button class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" disabled>
            <i class="ti ti-chevron-right text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add/Edit Voucher Modal -->
  <div 
    v-if="modalOpen" 
    class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick"
  >
    <!-- Modal Backdrop -->
    <div 
      @click="closeModal" 
      class="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-300"
    ></div>
    
    <!-- Modal Container -->
    <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden z-10 transition-all scale-100 text-left">
      <!-- Modal Header -->
      <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
        <div class="flex items-center gap-3">
          <div :class="['w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-2xs', formVoucher.category === 'shipping' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-accent']">
            <i :class="formVoucher.category === 'shipping' ? 'ti ti-truck-delivery' : 'ti ti-ticket'"></i>
          </div>
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950">
              {{ isEditMode ? (formVoucher.category === 'shipping' ? 'Chỉnh sửa Mã Free Ship' : 'Chỉnh sửa Mã Giảm Giá') : (formVoucher.category === 'shipping' ? 'Thêm Mã Free Ship Mới' : 'Thêm Mã Giảm Giá Mới') }}
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ formVoucher.category === 'shipping' ? 'Tạo chương trình ưu đãi miễn phí hoặc hỗ trợ phí vận chuyển.' : 'Tạo chương trình chiết khấu đơn hàng theo phần trăm hoặc số tiền cố định.' }}
            </p>
          </div>
        </div>
        <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
          <i class="ti ti-x text-lg"></i>
        </button>
      </div>

      <!-- Modal Form -->
      <form @submit.prevent="saveVoucher" class="flex-1 overflow-y-auto p-6 space-y-4">
        
        <!-- ==================== FORM DÀNH CHO MA MIEN PHI VAN CHUYEN (FREE SHIP) ==================== -->
        <template v-if="formVoucher.category === 'shipping'">
          <!-- Code & Name -->
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">MÃ CODE VOUCHER *</label>
              <input 
                type="text" 
                v-model="formVoucher.code" 
                placeholder="Ví dụ: FREESHIP50K" 
                required 
                :readonly="isEditMode"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all uppercase font-mono font-bold text-slate-800 disabled:bg-slate-100 disabled:text-slate-500"
                :class="isEditMode ? 'bg-slate-100 text-slate-500' : ''"
              >
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên chương trình Freeship *</label>
              <input 
                type="text" 
                v-model="formVoucher.name" 
                placeholder="Ví dụ: Miễn phí vận chuyển cho đơn hàng từ 200k" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
              >
            </div>
          </div>

          <!-- Mức hỗ trợ phí Ship (Option chọn Free 100% hoặc Giảm tối đa X tiền ship) -->
          <div class="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl space-y-3">
            <label class="block text-xs font-bold text-emerald-900 uppercase tracking-wider">HÌNH THỨC MIỄN PHÍ VẬN CHUYỂN *</label>
            <div class="grid grid-cols-2 gap-3">
              <label 
                :class="[
                  'flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-xs font-bold',
                  formVoucher.shipType === '100%' ? 'bg-white border-emerald-500 text-emerald-800 shadow-xs' : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                ]"
              >
                <input type="radio" v-model="formVoucher.shipType" value="100%" class="accent-emerald-600">
                <span>Miễn phí 100% phí ship</span>
              </label>

              <label 
                :class="[
                  'flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-xs font-bold',
                  formVoucher.shipType === 'max' ? 'bg-white border-emerald-500 text-emerald-800 shadow-xs' : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                ]"
              >
                <input type="radio" v-model="formVoucher.shipType" value="max" class="accent-emerald-600">
                <span>Giảm tối đa phí ship (đ)</span>
              </label>
            </div>

            <!-- Nếu chọn giảm tối đa số tiền ship -->
            <div v-if="formVoucher.shipType === 'max'" class="pt-2 animate-fade-in-quick">
              <label class="block text-[11px] font-bold text-emerald-800 uppercase mb-1.5">Số tiền ship giảm tối đa (VNĐ) *</label>
              <div class="relative">
                <input 
                  type="number" 
                  v-model="formVoucher.discountValue" 
                  placeholder="Ví dụ: 30000" 
                  required 
                  min="1000"
                  step="1000"
                  class="w-full px-4 py-2.5 bg-white border border-emerald-300 rounded-xl text-xs outline-none focus:border-emerald-600 font-bold text-slate-800"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">VNĐ</span>
              </div>
            </div>
            <p v-else class="text-[11px] text-emerald-700 italic">
              * Khách hàng thỏa mãn điều kiện sẽ được miễn phí hoàn toàn 100% tiền giao hàng.
            </p>
          </div>

          <!-- Đơn tối thiểu & Lượt sử dụng -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đơn tối thiểu (VNĐ) *</label>
              <input 
                type="number" 
                v-model="formVoucher.minOrder" 
                placeholder="Ví dụ: 200000 (0 = Mọi đơn hàng)" 
                required 
                min="0"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all font-semibold text-slate-800"
              >
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng số lượt dùng *</label>
              <input 
                type="number" 
                v-model="formVoucher.total" 
                placeholder="Ví dụ: 100" 
                required 
                min="1"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all font-semibold text-slate-800"
              >
            </div>
          </div>
        </template>

        <!-- ==================== FORM DÀNH CHO MA GIAM GIA DON HANG (ORDER DISCOUNT) ==================== -->
        <template v-else>
          <div class="grid grid-cols-2 gap-4">
            <!-- Code -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">MÃ CODE *</label>
              <input 
                type="text" 
                v-model="formVoucher.code" 
                placeholder="Ví dụ: SALEHE2026" 
                required 
                :readonly="isEditMode"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all uppercase font-mono font-bold text-slate-800 disabled:bg-slate-100 disabled:text-slate-500"
                :class="isEditMode ? 'bg-slate-100 text-slate-500' : ''"
              >
            </div>
            <!-- Type -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">LOẠI GIẢM GIÁ *</label>
              <select 
                v-model="formVoucher.type" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all cursor-pointer font-semibold text-slate-700"
              >
                <option value="percent">Giảm theo phần trăm (%)</option>
                <option value="fixed">Giảm số tiền cố định (đ)</option>
              </select>
            </div>
          </div>

          <!-- Program Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên chương trình *</label>
            <input 
              type="text" 
              v-model="formVoucher.name" 
              placeholder="Ví dụ: Ưu đãi chào hè giảm 15% tổng tiền đơn hàng" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
            >
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Value -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {{ formVoucher.type === 'percent' ? 'Giá trị giảm (%) *' : 'Số tiền giảm (VNĐ) *' }}
              </label>
              <input 
                type="number" 
                v-model="formVoucher.discountValue" 
                :placeholder="formVoucher.type === 'percent' ? 'Ví dụ: 15 (nghĩa là 15%)' : 'Ví dụ: 50000'" 
                required 
                min="1"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-850"
              >
            </div>
            <!-- Min Order -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đơn tối thiểu (VNĐ) *</label>
              <input 
                type="number" 
                v-model="formVoucher.minOrder" 
                placeholder="Ví dụ: 300000" 
                required 
                min="0"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
              >
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Max Discount (Only for Percent) -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {{ formVoucher.type === 'percent' ? 'Giảm tối đa (VNĐ) *' : 'Giảm tối đa' }}
              </label>
              <input 
                type="number" 
                v-model="formVoucher.maxDiscount" 
                :placeholder="formVoucher.type === 'percent' ? 'Ví dụ: 50000' : 'Không áp dụng'" 
                :disabled="formVoucher.type !== 'percent'"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800 disabled:bg-slate-100 disabled:text-slate-400"
              >
            </div>

            <!-- Total usage -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng số lượt dùng *</label>
              <input 
                type="number" 
                v-model="formVoucher.total" 
                placeholder="Ví dụ: 100" 
                required 
                min="1"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
              >
            </div>
          </div>
        </template>

        <!-- Common Start & End Date -->
        <div class="grid grid-cols-2 gap-4 pt-1 border-t border-slate-100">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày bắt đầu *</label>
            <input 
              type="date" 
              v-model="formVoucher.startDate" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all cursor-pointer font-semibold text-slate-700"
            >
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày hết hạn *</label>
            <input 
              type="date" 
              v-model="formVoucher.endDate" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all cursor-pointer font-semibold text-slate-700"
            >
          </div>
        </div>

        <!-- Status select (only in edit mode) -->
        <div v-if="isEditMode">
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái voucher *</label>
          <select 
            v-model="formVoucher.status" 
            required 
            class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold cursor-pointer"
          >
            <option value="active">Đang hoạt động</option>
            <option value="upcoming">Sắp diễn ra</option>
            <option value="expired">Đã hết hạn / Khóa</option>
          </select>
        </div>

        <!-- Footer buttons -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
          <button 
            type="button" 
            @click="closeModal" 
            class="bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer"
          >
            Hủy
          </button>
          <button 
            type="submit" 
            class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-md transition-all border-none cursor-pointer font-display"
          >
            {{ isEditMode ? 'Lưu thay đổi' : 'Kích hoạt mã' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const route = useRoute()

// Category Tab: 'order' (Mã giảm giá đơn hàng) | 'shipping' (Mã miễn phí vận chuyển)
const categoryTab = ref('order')

watch(() => route.query.type, (newType) => {
  if (newType === 'shipping') {
    categoryTab.value = 'shipping'
  } else {
    categoryTab.value = 'order'
  }
}, { immediate: true })

// Status Sub-Tab: 'all' | 'active' | 'upcoming' | 'expired'
const activeTab = ref('all')
const searchQuery = ref('')

const modalOpen = ref(false)
const isEditMode = ref(false)

const vouchers = ref([])

onMounted(() => {
  loadVouchers()
})

function isShippingVoucher(v) {
  return v.type === 'free_ship' || v.type === 'shipping' || v.type === 'Miễn phí Ship' || (typeof v.type === 'string' && v.type.toLowerCase().includes('vận chuyển'))
}

async function loadVouchers() {
  try {
    const response = await axiosInstance.get('/admin/vouchers')
    const rawList = Array.isArray(response) ? response : (response?.data || response?.vouchers || [])
    if (Array.isArray(rawList)) {
      vouchers.value = rawList.map(v => {
        const isShip = v.type === 'free_ship' || v.type === 'shipping' || v.type === 'Miễn phí Ship'
        let valueDisplay = ''
        if (isShip) {
          valueDisplay = v.value > 0 ? `Giảm tối đa ${(v.value || 0).toLocaleString('vi-VN')}₫` : 'Miễn phí 100%'
        } else if (v.type === 'percent') {
          valueDisplay = `${v.value}% ${v.max_discount ? `(Tối đa ${v.max_discount.toLocaleString('vi-VN')}₫)` : ''}`
        } else {
          valueDisplay = `${(v.value || 0).toLocaleString('vi-VN')}₫`
        }

        let typeText = 'Giảm theo %'
        if (isShip) typeText = 'Miễn phí vận chuyển'
        else if (v.type === 'fixed') typeText = 'Giảm số tiền cố định (đ)'

        return {
          id: v.id,
          code: v.code,
          name: v.name,
          type: typeText,
          isShipping: isShip,
          valueDisplay: valueDisplay,
          rawType: v.type,
          rawValue: v.value,
          minOrder: v.min_order,
          used: v.used_count || 0,
          total: v.total_usage || 100,
          maxDiscount: v.max_discount,
          startDate: v.start_date,
          endDate: v.end_date,
          status: v.status
        }
      })
    }
  } catch (error) {
    console.error('Failed to load vouchers:', error)
  }
}

// Count helper for level 1 category tabs
const orderVouchersCount = computed(() => {
  return vouchers.value.filter(v => !v.isShipping).length
})

const shippingVouchersCount = computed(() => {
  return vouchers.value.filter(v => v.isShipping).length
})

// Vouchers filtered by Level 1 Category
const currentCategoryVouchers = computed(() => {
  return vouchers.value.filter(v => {
    if (categoryTab.value === 'shipping') {
      return v.isShipping
    }
    return !v.isShipping
  })
})

// Vouchers filtered by Level 1 Category + Level 2 Status + Search Query
const filteredVouchers = computed(() => {
  return currentCategoryVouchers.value.filter(v => {
    const matchesSearch = v.code.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          v.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    let matchesTab = true
    if (activeTab.value === 'active') {
      matchesTab = v.status === 'active'
    } else if (activeTab.value === 'upcoming') {
      matchesTab = v.status === 'upcoming'
    } else if (activeTab.value === 'expired') {
      matchesTab = v.status === 'expired'
    }

    return matchesSearch && matchesTab
  })
})

function switchCategory(cat) {
  categoryTab.value = cat
  activeTab.value = 'all'
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

const formVoucher = ref({
  category: 'order',
  id: null,
  code: '',
  name: '',
  type: 'percent',
  shipType: '100%',
  discountValue: 0,
  minOrder: 0,
  used: 0,
  total: 100,
  maxDiscount: 0,
  startDate: '',
  endDate: '',
  status: 'active'
})

function openAddModal() {
  isEditMode.value = false
  const now = new Date()
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  if (categoryTab.value === 'shipping') {
    formVoucher.value = {
      category: 'shipping',
      id: null,
      code: '',
      name: '',
      type: 'free_ship',
      shipType: '100%',
      discountValue: 0,
      minOrder: 0,
      used: 0,
      total: 100,
      maxDiscount: 0,
      startDate: now.toISOString().substring(0, 10),
      endDate: nextMonth.toISOString().substring(0, 10),
      status: 'active'
    }
  } else {
    formVoucher.value = {
      category: 'order',
      id: null,
      code: '',
      name: '',
      type: 'percent',
      shipType: '100%',
      discountValue: 15,
      minOrder: 200000,
      used: 0,
      total: 100,
      maxDiscount: 50000,
      startDate: now.toISOString().substring(0, 10),
      endDate: nextMonth.toISOString().substring(0, 10),
      status: 'active'
    }
  }
  modalOpen.value = true
}

function openEditModal(v) {
  isEditMode.value = true
  const isShip = v.isShipping

  formVoucher.value = {
    category: isShip ? 'shipping' : 'order',
    id: v.id,
    code: v.code,
    name: v.name,
    type: isShip ? 'free_ship' : (v.rawType === 'fixed' ? 'fixed' : 'percent'),
    shipType: isShip ? (v.rawValue > 0 ? 'max' : '100%') : '100%',
    discountValue: v.rawValue || 0,
    minOrder: v.minOrder || 0,
    used: v.used || 0,
    total: v.total || 100,
    maxDiscount: v.maxDiscount || 0,
    startDate: v.startDate,
    endDate: v.endDate,
    status: v.status
  }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveVoucher() {
  if (formVoucher.value.startDate && formVoucher.value.endDate) {
    if (new Date(formVoucher.value.startDate) > new Date(formVoucher.value.endDate)) {
      Swal.fire({
        icon: 'warning',
        title: 'Ngày không hợp lệ',
        text: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.',
        confirmButtonColor: '#FF4D00'
      })
      return
    }
  }

  if (formVoucher.value.category !== 'shipping' && formVoucher.value.type === 'percent') {
    const val = parseFloat(formVoucher.value.discountValue) || 0
    if (val <= 0 || val > 100) {
      Swal.fire({
        icon: 'warning',
        title: 'Giá trị giảm không hợp lệ',
        text: 'Mức giảm giá theo phần trăm phải nằm trong khoảng từ 1% đến 100%.',
        confirmButtonColor: '#FF4D00'
      })
      return
    }
  }

  let rawType = 'percent'
  let value = 0

  if (formVoucher.value.category === 'shipping') {
    rawType = 'free_ship'
    value = formVoucher.value.shipType === 'max' ? (parseFloat(formVoucher.value.discountValue) || 0) : 0
  } else {
    rawType = formVoucher.value.type === 'fixed' ? 'fixed' : 'percent'
    value = parseFloat(formVoucher.value.discountValue) || 0
  }

  const payload = {
    code: formVoucher.value.code.trim().toUpperCase(),
    name: formVoucher.value.name.trim(),
    type: rawType,
    value: value,
    min_order: parseFloat(formVoucher.value.minOrder) || 0,
    total_usage: parseInt(formVoucher.value.total) || 1,
    max_discount: rawType === 'percent' ? (parseFloat(formVoucher.value.maxDiscount) || null) : null,
    start_date: formVoucher.value.startDate,
    end_date: formVoucher.value.endDate,
    status: formVoucher.value.status
  }

  try {
    if (isEditMode.value) {
      await axiosInstance.put(`/admin/vouchers/${formVoucher.value.id}`, payload)
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công!',
        text: 'Mã giảm giá đã được cập nhật thông tin.',
        confirmButtonColor: '#FF4D00'
      })
    } else {
      await axiosInstance.post('/admin/vouchers', payload)
      Swal.fire({
        icon: 'success',
        title: 'Tạo voucher thành công!',
        text: formVoucher.value.category === 'shipping' ? 'Mã miễn phí vận chuyển mới đã được phát hành.' : 'Mã giảm giá đơn hàng mới đã được phát hành.',
        confirmButtonColor: '#FF4D00'
      })
    }
    loadVouchers()
    modalOpen.value = false
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errorsObj = error.response.data?.errors || {}
      let msgList = []
      for (const key in errorsObj) {
        if (Array.isArray(errorsObj[key])) {
          msgList.push(...errorsObj[key])
        }
      }
      const errorMsg = msgList.join('<br>') || error.response.data?.message || 'Mã Code Voucher đã tồn tại hoặc dữ liệu nhập vào chưa hợp lệ!'
      Swal.fire({
        icon: 'warning',
        title: 'Không thể lưu Voucher (Lỗi 422)',
        html: `<div class="text-left text-xs space-y-1"><b>Chi tiết lỗi từ hệ thống:</b><br><span class="text-red-500 font-semibold">${errorMsg}</span></div>`,
        confirmButtonColor: '#FF4D00'
      })
    } else {
      Swal.fire('Lỗi', error.response?.data?.message || 'Có lỗi xảy ra khi lưu voucher', 'error')
    }
  }
}

async function toggleVoucherActive(v) {
  const newStatus = v.status === 'active' ? 'expired' : 'active'
  const stateText = newStatus === 'active' ? 'Kích hoạt' : 'Hủy bỏ/Khóa'

  const payload = {
    code: (v.code || '').toUpperCase(),
    name: v.name,
    type: v.rawType || (v.isShipping ? 'free_ship' : 'percent'),
    value: v.rawValue || 0,
    min_order: v.minOrder || 0,
    total_usage: v.total || 100,
    max_discount: v.maxDiscount || null,
    start_date: v.startDate,
    end_date: v.endDate,
    status: newStatus
  }
  
  try {
    await axiosInstance.put(`/admin/vouchers/${v.id}`, payload)
    v.status = newStatus
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: `Đã ${stateText} mã ${v.code}!`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })
  } catch (error) {
    if (error.response?.status !== 422) {
      Swal.fire('Lỗi', 'Không thể cập nhật trạng thái', 'error')
    }
  }
}

function deleteVoucher(code) {
  const v = vouchers.value.find(v => v.code === code)
  if (!v) return

  Swal.fire({
    title: 'Xác nhận xóa Voucher?',
    text: `Hành động này sẽ gỡ bỏ hoàn toàn mã "${code}" khỏi hệ thống!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/admin/vouchers/${v.id}`)
        Swal.fire({
          icon: 'success',
          title: 'Đã xóa!',
          text: 'Mã giảm giá đã bị gỡ bỏ.',
          confirmButtonColor: '#FF4D00'
        })
        loadVouchers()
      } catch (error) {
        Swal.fire('Lỗi', 'Không thể xóa', 'error')
      }
    }
  })
}
</script>

<style scoped>
.animate-fade-in-quick {
  animation: fadeInQuick 0.2s ease-out;
}

@keyframes fadeInQuick {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
