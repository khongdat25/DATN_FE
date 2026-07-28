<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Chiến dịch Flash Sale</h1>
          <p class="text-sm text-slate-500 mt-1">Lập lịch khung giờ vàng giảm giá kịch sàn đồng bộ trên biến thể sản phẩm.</p>
        </div>
        <div>
          <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
            <i class="ti ti-plus text-base"></i> Tạo Chiến dịch mới
          </button>
        </div>
      </div>

      <!-- Quick Filter Tabs -->
      <div class="flex border-b border-b-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap bg-white px-6 rounded-t-2xl border-t border-x border-slate-100 shadow-2xs">
        <button 
          @click="activeTab = 'all'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'all' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Tất cả ({{ campaigns.length }})
        </button>
        <button 
          @click="activeTab = 'active'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'active' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đang diễn ra ({{ campaigns.filter(c => c.status === 'active').length }})
        </button>
        <button 
          @click="activeTab = 'upcoming'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'upcoming' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Sắp diễn ra ({{ campaigns.filter(c => c.status === 'upcoming').length }})
        </button>
        <button 
          @click="activeTab = 'expired'" 
          :class="[
            'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2',
            activeTab === 'expired' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
          ]"
        >
          Đã kết thúc ({{ campaigns.filter(c => c.status === 'expired').length }})
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
            placeholder="Tìm kiếm chiến dịch..." 
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
          <select v-model="filterTime" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2 px-3 focus:outline-none cursor-pointer text-slate-700 font-semibold">
            <option value="all">Mọi khung giờ</option>
            <option>Khung giờ 09:00 - 11:00</option>
            <option>Khung giờ 12:00 - 14:00</option>
            <option>Khung giờ 15:00 - 17:00</option>
            <option>Khung giờ 20:00 - 22:00</option>
          </select>
        </div>
      </div>

      <!-- Campaigns Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="py-4 px-6 w-10"></th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TÊN CHIẾN DỊCH</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">NGÀY DIỄN RA</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHUNG GIỜ VÀNG</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">% GIẢM GIÁ ĐỒNG BỘ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">SẢN PHẨM SALE</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KÍCH HOẠT</th>
                <th class="py-4 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <template v-for="cam in filteredCampaigns" :key="cam.id">
                <tr 
                  @click="toggleRow(cam.id)" 
                  class="hover:bg-slate-50/30 transition-all font-medium cursor-pointer"
                  :class="cam.status === 'expired' ? 'opacity-70 bg-slate-50/20' : ''"
                >
                  <td class="py-4 px-6 text-center text-slate-400">
                    <i 
                      :class="[
                        'ti ti-chevron-right text-base transition-transform duration-200 block',
                        expandedRows.includes(cam.id) ? 'rotate-90' : ''
                      ]"
                    ></i>
                  </td>
                  <td class="py-4 px-6 text-xs font-bold text-slate-900 text-left" :class="cam.status === 'expired' ? 'line-through' : ''">
                    {{ cam.name }}
                  </td>
                  <td class="py-4 px-6 text-xs text-slate-700 text-left" :class="cam.status === 'expired' ? 'line-through' : ''">{{ formatDate(cam.date) }}</td>
                  <td class="py-4 px-6 text-xs text-slate-900 font-bold text-left" :class="cam.status === 'expired' ? 'line-through' : ''">{{ cam.timeSlot }}</td>
                  <td class="py-4 px-6 text-xs text-accent font-extrabold text-left">{{ cam.discountPercent }}% Giảm</td>
                  <td class="py-4 px-6 text-xs text-slate-500 text-left">{{ cam.products.length }} Sản phẩm</td>
                  <td class="py-4 px-6 text-left">
                    <span 
                      v-if="cam.status === 'active'"
                      class="status-badge inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full relative whitespace-nowrap"
                    >
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping absolute left-2"></span>
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đang diễn ra
                    </span>
                    <span 
                      v-else-if="cam.status === 'upcoming'"
                      class="status-badge inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                    >
                      <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Sắp diễn ra
                    </span>
                    <span 
                      v-else
                      class="status-badge inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 whitespace-nowrap"
                    >
                      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> Đã kết thúc
                    </span>
                  </td>
                  <td class="py-4 px-6 text-left" @click.stop>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        :checked="cam.status === 'active' || cam.status === 'upcoming'" 
                        :disabled="cam.status === 'expired'"
                        @change="toggleCampaignActive(cam)" 
                        class="sr-only peer"
                      >
                      <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent peer-disabled:opacity-50"></div>
                    </label>
                  </td>
                  <td class="py-4 px-6 text-right" @click.stop>
                    <div class="flex items-center gap-2 justify-end">
                      <button 
                        v-if="cam.status !== 'expired'"
                        @click="endCampaign(cam)"
                        class="whitespace-nowrap px-3 py-1.5 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-lg border border-red-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                      >
                        Kết thúc
                      </button>
                      <button 
                        @click="openEditModal(cam)"
                        class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                      >
                        Chỉnh sửa
                      </button>
                      <button 
                        @click="deleteCampaign(cam.id)" 
                        class="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center border-none transition-all cursor-pointer"
                      >
                        <i class="ti ti-trash text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- Collapsible Products List -->
                <tr v-if="expandedRows.includes(cam.id)" class="bg-slate-50/60 transition-all duration-300">
                  <td colspan="9" class="p-6 border-b border-slate-100">
                    <div class="pl-10 space-y-3">
                      <div class="text-[10px] font-bold tracking-[1.5px] text-slate-400 uppercase flex items-center gap-1.5 text-left">
                        <i class="ti ti-shoe"></i> Sản phẩm tham gia Flash Sale (giảm {{ cam.discountPercent }}% tự động tính toán)
                      </div>
                      <div class="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs max-w-3xl">
                        <table class="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr class="bg-slate-100/80 text-slate-550 font-bold border-b border-slate-100">
                              <th class="p-3">SẢN PHẨM</th>
                              <th class="p-3">KHOẢNG GIÁ GỐC</th>
                              <th class="p-3 text-accent font-bold"><i class="ti ti-flame"></i> KHOẢNG GIÁ SALE ({{ cam.discountPercent }}%)</th>
                              <th class="p-3">SỐ LƯỢNG SALE</th>
                              <th class="p-3">TRẠNG THÁI</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100 font-medium">
                            <tr v-for="p in cam.products" :key="p.id || p.name" :class="cam.status === 'expired' ? 'text-slate-400' : ''">
                              <td class="p-3 flex items-center gap-3">
                                <div class="w-8 h-8 bg-slate-50 border border-slate-100 rounded p-1 flex items-center justify-center shrink-0">
                                  <img :src="p.image" alt="Product" class="max-w-full max-h-full object-contain" :class="cam.status === 'expired' ? 'grayscale opacity-60' : ''">
                                </div>
                                <span class="font-bold text-slate-800" :class="cam.status === 'expired' ? 'line-through text-slate-400' : ''">{{ p.name }}</span>
                              </td>
                              <td class="p-3 text-slate-400 line-through">{{ formatCurrency(p.originalPrice) }}</td>
                              <td class="p-3 font-bold" :class="cam.status === 'expired' ? 'text-slate-400' : 'text-accent'">
                                {{ formatCurrency(p.originalPrice * (1 - cam.discountPercent/100)) }}
                              </td>
                              <td class="p-3 font-semibold text-slate-600" :class="cam.status === 'expired' ? 'text-slate-400' : ''">
                                {{ cam.status === 'expired' ? `Đã hoàn tất (Đã bán ${p.sold} đôi)` : `Đã bán ${p.sold} / ${p.limitCount} đôi` }}
                              </td>
                              <td class="p-3 text-left">
                                <span 
                                  v-if="cam.status === 'active'"
                                  class="inline-flex items-center bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                                >
                                  Đang áp dụng
                                </span>
                                <span 
                                  v-else-if="cam.status === 'upcoming'"
                                  class="inline-flex items-center bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                                >
                                  Sắp kích hoạt
                                </span>
                                <span 
                                  v-else
                                  class="inline-flex items-center bg-slate-100 text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                                >
                                  Đã kết thúc
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>

              <tr v-if="filteredCampaigns.length === 0">
                <td colspan="9" class="text-center py-12 text-slate-400 text-sm">
                  Không tìm thấy chiến dịch nào phù hợp.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Pagination -->
        <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">Hiển thị 1 - {{ filteredCampaigns.length }} của {{ filteredCampaigns.length }} chiến dịch</span>
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

    <!-- Create Campaign Modal -->
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
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden z-10 transition-all scale-100 text-left">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950">{{ isEditMode ? 'Chỉnh sửa Chiến dịch' : 'Tạo Chiến dịch Flash Sale mới' }}</h3>
            <p class="text-xs text-slate-400 mt-0.5">Thiết lập khung giờ vàng và chọn các sản phẩm tham gia sale.</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form @submit.prevent="saveCampaign" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên chiến dịch *</label>
            <input 
              type="text" 
              v-model="formCampaign.name" 
              placeholder="Ví dụ: FLASHSALE CUỐI TUẦN HÈ RỰC RỠ" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
            >
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Date -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ngày diễn ra *</label>
              <input 
                type="date" 
                v-model="formCampaign.date" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold cursor-pointer"
              >
            </div>
            <!-- Time slot -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Khung giờ vàng *</label>
              <select 
                v-model="formCampaign.timeSlot" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold cursor-pointer"
              >
                <option value="09:00 - 11:00">09:00 - 11:00</option>
                <option value="12:00 - 14:00">12:00 - 14:00</option>
                <option value="15:00 - 17:00">15:00 - 17:00</option>
                <option value="20:00 - 22:00">20:00 - 22:00</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Discount percent -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">% Giảm giá đồng bộ *</label>
              <input 
                type="number" 
                v-model="formCampaign.discountPercent" 
                placeholder="Ví dụ: 20" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
              >
            </div>
            <!-- Limit count -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Số lượng sản phẩm giới hạn *</label>
              <input 
                type="number" 
                v-model="formCampaign.limitCount" 
                placeholder="Ví dụ: 15" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-semibold text-slate-800"
              >
            </div>
          </div>

          <!-- Product & Variant Picker -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Chọn sản phẩm & Biến thể (Size / Màu) tham gia Flash Sale *</label>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-64 overflow-y-auto space-y-3">
              <div v-for="p in availableProducts" :key="p.id" class="border border-slate-200 rounded-xl p-3 bg-white shadow-2xs">
                <label class="flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800">
                  <div class="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      :checked="isProductSelected(p.id)"
                      @change="toggleProductSelection(p)"
                      class="rounded text-accent focus:ring-accent border-slate-300 w-4 h-4 cursor-pointer"
                    >
                    <span>{{ p.name }}</span>
                  </div>
                  <span class="text-slate-400 font-normal">Từ {{ formatCurrency(p.originalPrice) }}</span>
                </label>

                <!-- Variant list for this product -->
                <div v-if="p.variants && p.variants.length > 0" class="mt-2.5 pl-6 border-l-2 border-slate-100 space-y-1.5">
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tích chọn biến thể được sale:</div>
                  <label v-for="v in p.variants" :key="v.id" class="flex items-center justify-between cursor-pointer text-[11px] text-slate-600 hover:text-slate-900 py-0.5">
                    <div class="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        :checked="isVariantSelected(p.id, v.id)"
                        @change="toggleVariantSelection(p.id, v.id)"
                        class="rounded text-accent focus:ring-accent border-slate-300 w-3.5 h-3.5 cursor-pointer"
                      >
                      <span class="font-medium">{{ v.label }}</span>
                    </div>
                    <div class="flex items-center gap-3 text-[10px]">
                      <span class="text-slate-500">Tồn kho: <strong class="text-slate-700">{{ v.stock }}</strong></span>
                      <span class="text-accent font-semibold">{{ formatCurrency(v.price) }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Status select (only in edit mode) -->
          <div v-if="isEditMode">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái chiến dịch *</label>
            <select 
              v-model="formCampaign.status" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-700 font-semibold cursor-pointer"
            >
              <option value="active">Đang diễn ra</option>
              <option value="upcoming">Sắp diễn ra</option>
              <option value="expired">Đã kết thúc</option>
            </select>
          </div>

          <!-- Footer buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button 
              type="button" 
              @click="closeModal" 
              class="bg-white border border-slate-200 hover:border-slate-300 text-slate-655 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer text-slate-650"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all border-none cursor-pointer font-display"
            >
              {{ isEditMode ? 'Lưu thay đổi' : 'Tạo Chiến dịch' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const activeTab = ref('all')
const searchQuery = ref('')
const filterDate = ref('')
const filterTime = ref('all')

const expandedRows = ref([])
const modalOpen = ref(false)
const isEditMode = ref(false)

const availableProducts = ref([])
const campaigns = ref([])

const formCampaign = ref({
  id: null,
  name: '',
  date: '',
  timeSlot: '12:00 - 14:00',
  discountPercent: 20,
  limitCount: 15,
  selectedProducts: [],
  selectedVariantIds: {},
  status: 'active'
})

function isProductSelected(productId) {
  return formCampaign.value.selectedProducts.some(p => p.id === productId)
}

function isVariantSelected(productId, variantId) {
  const vList = formCampaign.value.selectedVariantIds[productId] || []
  return vList.includes(variantId)
}

function toggleProductSelection(product) {
  const index = formCampaign.value.selectedProducts.findIndex(p => p.id === product.id)
  if (index > -1) {
    formCampaign.value.selectedProducts.splice(index, 1)
    delete formCampaign.value.selectedVariantIds[product.id]
  } else {
    formCampaign.value.selectedProducts.push(product)
    if (product.variants && product.variants.length > 0) {
      formCampaign.value.selectedVariantIds[product.id] = product.variants.map(v => v.id)
    }
  }
}

function toggleVariantSelection(productId, variantId) {
  if (!formCampaign.value.selectedVariantIds[productId]) {
    formCampaign.value.selectedVariantIds[productId] = []
  }
  const vList = formCampaign.value.selectedVariantIds[productId]
  const index = vList.indexOf(variantId)
  if (index > -1) {
    vList.splice(index, 1)
  } else {
    vList.push(variantId)
  }
  
  const product = availableProducts.value.find(p => p.id === productId)
  if (product) {
    const hasAny = vList.length > 0
    const isSel = isProductSelected(productId)
    if (hasAny && !isSel) {
      formCampaign.value.selectedProducts.push(product)
    } else if (!hasAny && isSel) {
      const pIndex = formCampaign.value.selectedProducts.findIndex(p => p.id === productId)
      if (pIndex > -1) formCampaign.value.selectedProducts.splice(pIndex, 1)
    }
  }
}

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/p1.png'
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

async function fetchAvailableProducts() {
  try {
    const response = await axiosInstance.get('/adminproduct')
    if (response && response.success) {
      availableProducts.value = response.data.map(p => {
        let img = '/images/p1.png'
        if (p.images && p.images.length > 0) {
          const firstImg = p.images[0]
          img = getImageUrl(typeof firstImg === 'string' ? firstImg : (firstImg?.image || ''))
        }

        const variants = (p.variants || []).map(v => {
          const sizeName = v.size ? v.size.name : (v.size_name || '')
          const colorName = v.color ? v.color.name : (v.color_name || '')
          const label = [sizeName, colorName].filter(Boolean).join(' - ') || `Biến thể #${v.id}`
          return {
            id: v.id,
            product_id: p.id,
            size_name: sizeName,
            color_name: colorName,
            label: label,
            price: v.price,
            stock: v.stock || 0
          }
        })
        
        const minPrice = variants.length > 0 ? Math.min(...variants.map(v => v.price)) : 0
        
        return {
          id: p.id,
          name: p.name,
          originalPrice: minPrice,
          image: img,
          variants: variants
        }
      })
    }
  } catch (error) {
    console.error('Error fetching available products:', error)
  }
}

async function fetchCampaigns() {
  try {
    const response = await axiosInstance.get('/flash-sale')
    if (response && response.success) {
      campaigns.value = response.data.map(cam => {
        const now = new Date()
        const startTime = cam.start_time ? new Date(cam.start_time.replace(/-/g, '/')) : null
        const endTime = cam.end_time ? new Date(cam.end_time.replace(/-/g, '/')) : null

        let statusText = 'upcoming'
        if (Number(cam.status) === 3 || (endTime && now > endTime)) {
          statusText = 'expired'
        } else if (Number(cam.status) === 2) {
          statusText = 'paused'
        } else if (startTime && now < startTime) {
          statusText = 'upcoming'
        } else if (startTime && endTime && now >= startTime && now <= endTime) {
          statusText = 'active'
        } else if (Number(cam.status) === 1) {
          statusText = 'active'
        }

        let dateVal = cam.date || ''
        let timeSlotVal = cam.timeSlot || ''

        if (startTime && endTime) {
          const yyyy = startTime.getFullYear()
          const mm = String(startTime.getMonth() + 1).padStart(2, '0')
          const dd = String(startTime.getDate()).padStart(2, '0')
          dateVal = `${yyyy}-${mm}-${dd}`

          const startH = String(startTime.getHours()).padStart(2, '0')
          const startM = String(startTime.getMinutes()).padStart(2, '0')
          const endH = String(endTime.getHours()).padStart(2, '0')
          const endM = String(endTime.getMinutes()).padStart(2, '0')
          timeSlotVal = `${startH}:${startM} - ${endH}:${endM}`
        }

        const firstItem = (cam.items && cam.items.length > 0) ? cam.items[0] : null
        const discountVal = firstItem ? parseFloat(firstItem.discount_value) || 20 : 20

        return {
          id: cam.id,
          name: cam.name,
          date: dateVal,
          timeSlot: timeSlotVal,
          discountPercent: discountVal,
          status: statusText,
          products: (cam.items || []).map(item => {
            const prod = item.product || {}
            const variant = item.variant || {}
            const sizeName = variant.size ? variant.size.name : ''
            const colorName = variant.color ? variant.color.name : ''
            const variantLabel = [sizeName, colorName].filter(Boolean).join(' - ')

            const minPrice = variant.price || (prod.variants && prod.variants.length > 0 ? Math.min(...prod.variants.map(v => v.price)) : 0)
            
            let img = '/images/p1.png'
            if (prod.images && prod.images.length > 0) {
              const firstImg = prod.images[0]
              img = getImageUrl(typeof firstImg === 'string' ? firstImg : (firstImg?.image || ''))
            } else if (prod.variants && prod.variants.length > 0 && prod.variants[0].image) {
              img = getImageUrl(prod.variants[0].image)
            }
            
            return {
              id: prod.id,
              variant_id: item.variant_id,
              variantLabel: variantLabel,
              name: variantLabel ? `${prod.name || 'N/A'} (${variantLabel})` : (prod.name || 'N/A'),
              originalPrice: minPrice,
              image: img,
              limitCount: item.quantity_limit || 0,
              sold: item.sold || 0
            }
          })
        }
      })
    }
  } catch (error) {
    console.error('Error fetching campaigns:', error)
  }
}

onMounted(async () => {
  await fetchAvailableProducts()
  await fetchCampaigns()
})

const filteredCampaigns = computed(() => {
  return campaigns.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          c.timeSlot.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    let matchesTab = true
    if (activeTab.value === 'active') {
      matchesTab = c.status === 'active'
    } else if (activeTab.value === 'upcoming') {
      matchesTab = c.status === 'upcoming'
    } else if (activeTab.value === 'expired') {
      matchesTab = c.status === 'expired'
    }

    let matchesDate = true
    if (filterDate.value) {
      matchesDate = c.date === filterDate.value
    }

    let matchesTime = true
    if (filterTime.value !== 'all') {
      matchesTime = c.timeSlot.includes(filterTime.value.replace('Khung giờ ', ''))
    }

    return matchesSearch && matchesTab && matchesDate && matchesTime
  })
})

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [yyyy, mm, dd] = dateStr.split('-')
  return `${dd}/${mm}/${yyyy}`
}

function toggleRow(id) {
  const index = expandedRows.value.indexOf(id)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(id)
  }
}

async function toggleCampaignActive(cam) {
  try {
    const response = await axiosInstance.patch(`/flash-sale/toggle-cate/${cam.id}`)
    if (response) {
      await fetchCampaigns()
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: response.message || 'Cập nhật trạng thái thành công!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })
    }
  } catch (error) {
    console.error('Error toggling campaign status:', error)
  }
}

async function endCampaign(cam) {
  Swal.fire({
    title: 'Xác nhận kết thúc?',
    text: `Bạn có chắc chắn muốn kết thúc sớm chiến dịch "${cam.name}" không?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.patch(`/flash-sale/end-camp/${cam.id}`)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Đã kết thúc!',
            text: 'Chiến dịch Flash Sale đã được kết thúc.',
            confirmButtonColor: '#FF4D00'
          })
          await fetchCampaigns()
        }
      } catch (error) {
        console.error('Error ending campaign:', error)
      }
    }
  })
}

function openAddModal() {
  isEditMode.value = false
  formCampaign.value = {
    id: null,
    name: '',
    date: new Date().toISOString().substring(0, 10),
    timeSlot: '12:00 - 14:00',
    discountPercent: 20,
    limitCount: 15,
    selectedProducts: [],
    selectedVariantIds: {},
    status: 'active'
  }
  modalOpen.value = true
}

function openEditModal(cam) {
  isEditMode.value = true
  const selProds = []
  const selVariantsMap = {}

  cam.products.forEach(p => {
    const ap = availableProducts.value.find(item => item.id === p.id)
    if (ap && !selProds.some(sp => sp.id === ap.id)) {
      selProds.push(ap)
    }
    if (!selVariantsMap[p.id]) {
      selVariantsMap[p.id] = []
    }
    if (p.variant_id) {
      selVariantsMap[p.id].push(p.variant_id)
    } else if (ap && ap.variants) {
      selVariantsMap[p.id] = ap.variants.map(v => v.id)
    }
  })

  formCampaign.value = {
    id: cam.id,
    name: cam.name,
    date: cam.date,
    timeSlot: cam.timeSlot,
    discountPercent: cam.discountPercent,
    limitCount: cam.products[0]?.limitCount || 15,
    selectedProducts: selProds,
    selectedVariantIds: selVariantsMap,
    status: cam.status === 'active' ? 'active' : (cam.status === 'expired' ? 'expired' : 'upcoming')
  }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function saveCampaign() {
  if (formCampaign.value.selectedProducts.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi chọn sản phẩm!',
      text: 'Vui lòng chọn ít nhất một sản phẩm tham gia sale.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  const items = []
  formCampaign.value.selectedProducts.forEach(p => {
    const vIds = formCampaign.value.selectedVariantIds[p.id] || []
    if (vIds.length > 0) {
      vIds.forEach(vId => {
        items.push({ product_id: p.id, variant_id: vId })
      })
    } else {
      items.push({ product_id: p.id, variant_id: null })
    }
  })

  const payload = {
    name: formCampaign.value.name,
    date: formCampaign.value.date,
    golden_hour: formCampaign.value.timeSlot,
    discount_value: formCampaign.value.discountPercent,
    quantity_limit: formCampaign.value.limitCount,
    items: items,
    product_ids: formCampaign.value.selectedProducts.map(p => p.id)
  }

  try {
    if (isEditMode.value) {
      const response = await axiosInstance.put(`/flash-sale/edit/${formCampaign.value.id}`, payload)
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: 'Chiến dịch Flash Sale đã được cập nhật thông tin.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchCampaigns()
        modalOpen.value = false
      }
    } else {
      const response = await axiosInstance.post('/flash-sale/add', payload)
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Tạo thành công!',
          text: 'Chiến dịch Flash Sale mới đã được thiết lập khung giờ.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchCampaigns()
        modalOpen.value = false
      }
    }
  } catch (error) {
    console.error('Error saving campaign:', error)
  }
}

async function deleteCampaign(id) {
  Swal.fire({
    title: 'Xác nhận xóa chiến dịch?',
    text: 'Hành động này sẽ gỡ bỏ chiến dịch Flash Sale vĩnh viễn khỏi hệ thống!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/flash-sale/delete/${id}`)
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa!',
            text: 'Chiến dịch đã bị loại bỏ.',
            confirmButtonColor: '#FF4D00'
          })
          await fetchCampaigns()
        }
      } catch (error) {
        console.error('Error deleting campaign:', error)
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
