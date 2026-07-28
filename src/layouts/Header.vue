<template>
  <!-- Top Bar -->
  <div class="bg-accent text-center py-[9px] px-5 text-xs tracking-[2px] uppercase font-medium text-white [&>span]:mx-4">
    <span>🚀 FREE SHIP đơn từ 500K</span>
    <span>|</span>
    <span>FLASH SALE mỗi ngày 12H–14H</span>
    <span>|</span>
    <span>🎁 Tặng quà khi mua từ 1 triệu</span>
  </div>

  <!-- Header -->
  <header class="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-200">
    <div class="max-w-[1200px] mx-auto px-5">
      <nav class="flex items-center justify-between h-[72px] gap-4">
        <router-link to="/" class="flex items-center shrink-0 transition-all duration-300 group select-none">
          <img src="/images/logo.png" alt="SaigonShoes Logo" class="h-16 w-40 object-contain transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6 mix-blend-multiply" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
          <span class="font-display text-[20px] tracking-[2px] font-bold text-text hidden">SAIGON<span class="text-accent">SHOES</span></span>
        </router-link>

        <!-- Desktop Nav -->
        <ul class="flex gap-0.5 max-md:hidden items-center">
          <li>
            <router-link to="/" class="block py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-lg transition-all duration-300 whitespace-nowrap hover:text-accent hover:bg-surface2 active:scale-95">Trang chủ</router-link>
          </li>
          
          <!-- Sản phẩm dropdown -->
          <li class="relative group">
            <router-link to="/products" class="flex items-center gap-1 py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-lg transition-all duration-300 whitespace-nowrap hover:text-accent hover:bg-surface2 group-hover:text-accent group-hover:bg-surface2 active:scale-95">
              Sản phẩm <i class="ti ti-chevron-down text-[11px] transition-transform duration-200 group-hover:rotate-180"></i>
            </router-link>
            <div class="dropdown-mega absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <div class="bg-white border border-border rounded-2xl shadow-xl p-6 grid grid-cols-4 gap-x-8 gap-y-6 min-w-[840px]">
                <!-- Cột 1: DANH MỤC / ĐỐI TƯỢNG -->
                <div class="text-left">
                  <div class="h-8 mb-3 pb-1 border-b border-border flex items-center">
                    <span class="text-xs font-bold text-text uppercase tracking-wider">Danh Mục</span>
                  </div>
                  <ul class="space-y-2.5 pl-1">
                    <li>
                      <router-link to="/products?category=Nam" class="block text-[13px] text-text-muted hover:text-accent font-semibold transition-colors">
                        Giày Nam
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/products?category=N%E1%BB%AF" class="block text-[13px] text-text-muted hover:text-accent font-semibold transition-colors">
                        Giày Nữ
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/products?category=Tr%E1%BA%BB+em" class="block text-[13px] text-text-muted hover:text-accent font-semibold transition-colors">
                        Giày Trẻ Em
                      </router-link>
                    </li>
                    <li class="pt-2 border-t border-slate-100">
                      <router-link to="/products" class="text-xs font-bold text-accent hover:underline block">
                        Tất cả sản phẩm →
                      </router-link>
                    </li>
                  </ul>
                </div>

                <!-- Cột 2: THƯƠNG HIỆU -->
                <div class="text-left">
                  <div class="h-8 mb-3 pb-1 border-b border-border flex items-center">
                    <span class="text-xs font-bold text-text uppercase tracking-wider">Thương Hiệu</span>
                  </div>
                  <ul class="space-y-2 pl-1">
                    <li v-for="brand in (brands.length > 0 ? brands.slice(0, 6) : defaultBrands)" :key="brand.id || brand.name">
                      <router-link :to="`/products?brand=${brand.name}`" class="block text-[13px] text-text-muted hover:text-accent font-medium transition-colors">
                        {{ brand.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>

                <!-- Cột 3: KHOẢNG GIÁ & BỘ SƯU TẬP -->
                <div class="text-left">
                  <div class="h-8 mb-3 pb-1 border-b border-border flex items-center">
                    <span class="text-xs font-bold text-text uppercase tracking-wider">Khoảng Giá & Hot</span>
                  </div>
                  <ul class="space-y-2 pl-1">
                    <li>
                      <router-link to="/products?sort=newest" class="block text-[13px] text-text-muted hover:text-accent font-medium transition-colors">
                        Mới về (New Arrivals)
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/products?sort=sold_desc" class="block text-[13px] text-text-muted hover:text-accent font-medium transition-colors">
                        Bán chạy nhất
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/products?max_price=1000000" class="block text-[13px] text-text-muted hover:text-accent transition-colors">
                        Dưới 1.000.000đ
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/products?min_price=1000000&max_price=2000000" class="block text-[13px] text-text-muted hover:text-accent transition-colors">
                        1.000.000đ - 2.000.000đ
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/products?min_price=2000000" class="block text-[13px] text-text-muted hover:text-accent transition-colors">
                        Trên 2.000.000đ
                      </router-link>
                    </li>
                  </ul>
                </div>

                <!-- Cột 4: CARD QUẢNG CÁO / KÍCH CẦU -->
                <div class="flex flex-col justify-between p-4 bg-linear-to-br from-accent/5 to-accent/10 border border-accent/15 rounded-2xl hover:shadow-md transition-all duration-300 text-left">
                  <div>
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-0.5 rounded-full inline-block mb-2">Ưu đãi hôm nay</span>
                    <h4 class="text-sm font-bold text-slate-900 font-display leading-tight mb-1">Miễn Phí Vận Chuyển</h4>
                    <p class="text-[11px] text-text-muted leading-relaxed">Cho tất cả đơn hàng từ 500.000đ. Đổi trả miễn phí trong 7 ngày.</p>
                  </div>
                  <router-link to="/products" class="inline-flex items-center gap-1.5 text-[12px] font-bold text-white bg-accent hover:bg-accent-hover px-3.5 py-2 rounded-xl transition-all shadow-xs mt-3 select-none w-fit">
                    Khám phá ngay →
                  </router-link>
                </div>
              </div>
            </div>
          </li>

          <li><router-link to="/about" class="block py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-lg transition-all duration-300 whitespace-nowrap hover:text-accent hover:bg-surface2 active:scale-95">Giới thiệu</router-link></li>
          <li><router-link to="/news" class="block py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-lg transition-all duration-300 whitespace-nowrap hover:text-accent hover:bg-surface2 active:scale-95">Tin tức</router-link></li>
          <li><router-link to="/contact" class="block py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-lg transition-all duration-300 whitespace-nowrap hover:text-accent hover:bg-surface2 active:scale-95">Liên hệ</router-link></li>
        </ul>

        <!-- Actions -->
        <div class="flex items-center gap-[6px]">
          <div class="flex items-center bg-surface2 border border-border rounded-xl overflow-hidden transition-all duration-300 focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(255,77,0,0.1)] max-md:hidden">
            <input type="text" placeholder="Tìm kiếm..." id="searchInput" class="bg-transparent border-none outline-none py-2 px-3.5 text-[13px] text-text w-[120px] font-body placeholder:text-text-dim">
            <button class="bg-transparent border-none py-2 px-3 text-text-muted text-lg transition-all duration-300 hover:text-accent active:scale-90"><i class="ti ti-search"></i></button>
          </div>

          <!-- Notification Bell -->
          <div class="relative" ref="notifRef">
            <button
              @click="toggleNotif"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-none text-text-muted text-xl relative transition-all duration-300 hover:bg-surface2 hover:text-accent hover:shadow-sm active:scale-90"
              title="Thông báo"
            >
              <i class="ti ti-bell"></i>
              <span
                v-if="unreadCount > 0"
                class="absolute top-[5px] right-[5px] bg-accent text-white text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center shadow-sm px-px"
              >{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
            </button>

            <!-- Dropdown Panel -->
            <transition name="notif-drop">
              <div
                v-if="notifOpen"
                class="absolute right-0 top-[calc(100%+10px)] w-[360px] bg-white border border-border rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-400 overflow-hidden"
              >
                <!-- Header -->
                <div class="flex items-center justify-between px-5 py-4 border-b border-border">
                  <span class="font-display font-bold text-sm text-text tracking-wide">Thông báo</span>
                  <button
                    v-if="unreadCount > 0"
                    @click="markAllRead"
                    class="text-[11px] font-semibold text-accent hover:underline cursor-pointer bg-transparent border-none"
                  >Đánh dấu tất cả đã đọc</button>
                </div>

                <!-- Filter Tabs -->
                <div class="flex gap-1 px-4 pt-3 pb-1">
                  <button
                    v-for="f in notifFilters"
                    :key="f.key"
                    @click="activeFilter = f.key"
                    :class="[
                      'px-3 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer',
                      activeFilter === f.key
                        ? 'bg-accent text-white border-accent'
                        : 'bg-transparent text-text-muted border-border hover:border-accent hover:text-accent'
                    ]"
                  >{{ f.label }}</button>
                </div>

                <!-- List -->
                <div class="max-h-[340px] overflow-y-auto">
                  <div v-if="filteredNotifs.length === 0" class="text-center py-12 text-text-dim">
                    <i class="ti ti-bell-off text-4xl block mb-2 opacity-40"></i>
                    <p class="text-sm">Không có thông báo nào</p>
                  </div>

                  <div
                    v-for="notif in filteredNotifs"
                    :key="notif.id"
                    @click="readNotif(notif)"
                    :class="[
                      'flex items-start gap-3.5 px-5 py-4 border-b border-border/60 last:border-b-0 cursor-pointer transition-colors',
                      notif.read ? 'bg-white hover:bg-surface2/50' : 'bg-[rgba(255,77,0,0.02)] hover:bg-[rgba(255,77,0,0.04)]'
                    ]"
                  >
                    <!-- Icon -->
                    <div
                      :class="['w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0', notif.iconBg]"
                    >
                      <i :class="['ti', notif.icon, notif.iconColor]"></i>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-2">
                        <span :class="['text-[13px] leading-snug', notif.read ? 'font-medium text-text' : 'font-bold text-text']">{{ notif.title }}</span>
                        <span v-if="!notif.read" class="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5"></span>
                      </div>
                      <p class="text-[11px] text-text-muted mt-0.5 leading-relaxed">{{ notif.body }}</p>
                      <span class="text-[10px] text-text-dim mt-1 block">{{ notif.time }}</span>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div class="px-5 py-3 border-t border-border text-center">
                  <router-link
                    to="/profile"
                    @click="notifOpen = false"
                    class="text-[12px] font-bold text-accent hover:underline"
                  >Xem tất cả thông báo →</router-link>
                </div>
              </div>
            </transition>
          </div>
          <router-link to="/cart" class="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-none text-text-muted text-xl relative transition-all duration-300 hover:bg-surface2 hover:text-accent hover:shadow-sm active:scale-90" title="Giỏ hàng">
            <i class="ti ti-shopping-cart"></i>
            <span class="absolute top-[5px] right-[5px] bg-accent text-white text-[9px] font-medium w-[15px] h-[15px] rounded-full flex items-center justify-center shadow-sm">{{ cartCount }}</span>
          </router-link>
          <!-- Admin Quick Access Button -->
          <router-link 
            v-if="isAdmin" 
            to="/admin" 
            class="flex items-center gap-1.5 py-1.5 px-3 bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/20 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm active:scale-95 max-md:hidden select-none cursor-pointer"
            title="Quay lại trang quản trị"
          >
            <i class="ti ti-shield text-sm"></i>
            <span>Trang Admin</span>
          </router-link>
          <div class="relative group h-full flex items-center ml-1">
            <template v-if="isLoggedIn">
              <button class="flex items-center gap-1.5 py-1.5 px-3 bg-surface2 border border-border rounded-xl text-xs font-semibold text-text-muted transition-all duration-300 hover:text-accent hover:border-accent hover:bg-bg cursor-pointer shadow-sm active:scale-95">
                <div v-if="userAvatar" class="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white shadow-2xs">
                  <img :src="getImageUrl(userAvatar)" alt="Avatar" class="w-full h-full object-cover">
                </div>
                <i v-else class="ti ti-user text-sm"></i>
                <span class="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">{{ userName }}</span>
                <i class="ti ti-chevron-down text-[10px]"></i>
              </button>
              <div class="dropdown-account absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 w-44 bg-white border border-border rounded-xl shadow-xl py-2 z-300">
                <div class="px-4 py-2 border-b border-border text-xs text-text-muted font-medium text-left">Xin chào, {{ userName }}</div>
                <router-link v-if="isAdmin" to="/admin" class="block w-full text-left px-4 py-2 text-sm text-accent font-bold hover:bg-surface2 hover:text-accent transition-colors">Trang quản trị (Admin)</router-link>
                <router-link to="/profile" class="block w-full text-left px-4 py-2 text-sm text-text hover:bg-surface2 hover:text-accent transition-colors">Tài khoản của tôi</router-link>
                <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer font-semibold">Đăng xuất</button>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="bg-accent text-white font-display font-bold text-[11px] tracking-[1.5px] uppercase py-2.5 px-4 rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.15)] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(255,77,0,0.25)] hover:-translate-y-0.5 active:scale-95 whitespace-nowrap block">
                Đăng Nhập
              </router-link>
            </template>
          </div>
          <!-- Hamburger -->
          <button class="hidden flex-col gap-[5px] bg-transparent border-none p-2 max-md:flex" @click="toggleMenu" aria-label="Menu">
            <span class="block w-[22px] h-[2px] bg-text transition-all duration-300"></span>
            <span class="block w-[22px] h-[2px] bg-text transition-all duration-300"></span>
            <span class="block w-[22px] h-[2px] bg-text transition-all duration-300"></span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <div v-show="menuOpen" class="bg-bg border-t border-border py-4 px-5">
      <router-link to="/" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Trang chủ</router-link>
      <router-link to="/products" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Sản phẩm</router-link>
      <router-link v-if="isAdmin" to="/admin" class="block py-3 text-[15px] text-accent font-bold border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Trang quản trị (Admin)</router-link>
      <router-link to="/about" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Giới thiệu</router-link>
      <router-link to="/news" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Tin tức</router-link>
      <router-link to="/contact" class="block py-3 text-[15px] text-text-muted border-none transition-colors hover:text-accent" @click="menuOpen = false">Liên hệ</router-link>
      
      <!-- Mobile Auth Links -->
      <div class="border-t border-border mt-3 pt-3">
        <template v-if="isLoggedIn">
          <div class="py-2 text-sm text-accent font-medium text-left">Xin chào, {{ userName }}</div>
          <router-link to="/profile" class="block py-2.5 text-sm text-text-muted hover:text-accent transition-colors text-left" @click="menuOpen = false">Tài khoản của tôi</router-link>
          <button @click="handleLogout" class="block w-full text-left py-2.5 text-sm text-red-500 font-semibold border-none bg-transparent cursor-pointer">Đăng xuất</button>
        </template>
        <template v-else>
          <router-link to="/login" class="block py-2.5 text-sm text-text-muted hover:text-accent transition-colors text-left" @click="menuOpen = false">Đăng nhập</router-link>
          <router-link to="/register" class="block py-2.5 text-sm text-text-muted hover:text-accent transition-colors text-left" @click="menuOpen = false">Đăng ký</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject, computed, onMounted, onUnmounted } from 'vue'
import axiosInstance from '@/api/axios.js'

const cartCount = inject('cartCount', ref(3))
const menuOpen = ref(false)

// ── Brand loading state ──────────────────────────────────────────────────────
const brands = ref([])

const defaultBrands = [
  { name: 'Nike' },
  { name: 'Adidas' },
  { name: 'Puma' },
  { name: 'New Balance' },
  { name: 'MLB' },
  { name: 'Converse' }
]

const BRAND_LOGOS = {
  'nike': '/images/Logo_NIKE.svg',
  'adidas': '/images/Adidas_Logo.svg',
  'new balance': '/images/New_Balance_logo.svg',
  'puma': '/images/puma.svg',
  'mlb': '/images/mlb.svg?v=2',
  'bitis': '/images/bitis.svg',
  'converse': '/images/converse.svg'
}

const BRAND_SERIES = {
  'nike': ['Air Force 1', 'Air Max', 'Dunk Low', 'Jordan'],
  'adidas': ['Samba OG', 'Superstar', 'Stan Smith', 'Ultraboost'],
  'new balance': ['NB 530', 'NB 550', 'NB 574', 'NB 9060'],
  'puma': ['Puma Suede', 'Puma RS-X'],
  'mlb': ['Chunky Liner', 'Bigball Chunky', 'MLB Boston'],
  'bitis': ['Hunter Street', 'Hunter Feast', 'Hunter Core'],
  'converse': ['Chuck Taylor', 'Chuck 70', 'One Star']
}

function getBrandLogo(brandName) {
  if (!brandName) return null
  const key = brandName.toLowerCase().trim()
  return BRAND_LOGOS[key] || null
}

function getBrandSeries(brandName) {
  if (!brandName) return []
  const key = brandName.toLowerCase().trim()
  return BRAND_SERIES[key] || []
}

async function fetchBrands() {
  try {
    const res = await axiosInstance.get('/getbrands')
    if (res && res.data) {
      brands.value = res.data
    }
  } catch (e) {
    console.error('Failed to fetch brands in Header:', e)
  }
}

// ── Notification state ──────────────────────────────────────────────────────
const notifOpen = ref(false)
const notifRef = ref(null)
const activeFilter = ref('all')

const notifFilters = [
  { key: 'all',    label: 'Tất cả' },
  { key: 'order',  label: 'Đơn hàng' },
  { key: 'promo',  label: 'Ưu đãi' },
  { key: 'system', label: 'Hệ thống' }
]

const notifications = ref([
  {
    id: 1, type: 'order', read: false,
    icon: 'ti-truck-delivery', iconBg: 'bg-blue-50', iconColor: 'text-blue-500',
    title: 'Đơn hàng SGS-281938 đang được giao',
    body: 'Shipper đang trên đường giao hàng đến bạn. Dự kiến nhận hàng hôm nay.',
    time: '5 phút trước'
  },
  {
    id: 2, type: 'order', read: false,
    icon: 'ti-circle-check', iconBg: 'bg-green-50', iconColor: 'text-green-500',
    title: 'Đơn hàng SGS-192847 đã hoàn thành',
    body: 'Cảm ơn bạn đã mua hàng! Hãy để lại đánh giá cho sản phẩm nhé.',
    time: '2 giờ trước'
  },
  {
    id: 3, type: 'promo', read: false,
    icon: 'ti-discount-2', iconBg: 'bg-[rgba(255,77,0,0.08)]', iconColor: 'text-accent',
    title: 'Flash Sale 12H–14H hôm nay!',
    body: 'Giảm đến 40% hàng trăm mẫu giày hot. Số lượng có hạn, nhanh tay!',
    time: '30 phút trước'
  },
  {
    id: 4, type: 'promo', read: true,
    icon: 'ti-gift', iconBg: 'bg-pink-50', iconColor: 'text-pink-500',
    title: 'Quà sinh nhật dành cho bạn 🎁',
    body: 'Voucher BIRTHDAY20 giảm 20% đang chờ bạn. Hạn sử dụng đến 30/06.',
    time: '1 ngày trước'
  },
  {
    id: 5, type: 'promo', read: true,
    icon: 'ti-ticket', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600',
    title: 'Bạn có voucher SAIGON50 chưa dùng',
    body: 'Giảm 50.000₫ cho đơn hàng tiếp theo từ 500K. Hết hạn sau 3 ngày!',
    time: '2 ngày trước'
  },
  {
    id: 6, type: 'system', read: true,
    icon: 'ti-shield-check', iconBg: 'bg-surface2', iconColor: 'text-text-muted',
    title: 'Cập nhật chính sách bảo mật',
    body: 'SaigonShoes đã cập nhật chính sách bảo mật. Vui lòng xem lại để nắm rõ.',
    time: '1 tuần trước'
  },
  {
    id: 7, type: 'system', read: true,
    icon: 'ti-star', iconBg: 'bg-[rgba(255,215,0,0.1)]', iconColor: 'text-yellow-500',
    title: 'Chào mừng bạn đến với SaigonShoes! 🎉',
    body: 'Tài khoản của bạn đã được kích hoạt. Khám phá hàng nghìn mẫu giày hot ngay!',
    time: '3 tuần trước'
  }
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const filteredNotifs = computed(() => {
  if (activeFilter.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === activeFilter.value)
})

function toggleNotif() {
  notifOpen.value = !notifOpen.value
}

function readNotif(notif) {
  notif.read = true
}

function markAllRead() {
  notifications.value.forEach(n => { n.read = true })
}

// Đóng khi click bên ngoài
function onClickOutside(e) {
  if (notifRef.value && !notifRef.value.contains(e.target)) {
    notifOpen.value = false
  }
}

const isLoggedIn = ref(false)
const userName = ref('')
const userAvatar = ref('')
const isAdmin = ref(false)

function getImageUrl(imagePath) {
  if (!imagePath) return ''
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

function checkAuth() {
  const token = localStorage.getItem('access_token')
  isLoggedIn.value = !!token
  isAdmin.value = false
  if (token) {
    try {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        userName.value = user.name || 'Thành viên'
        userAvatar.value = user.avatar || ''
        isAdmin.value = user && user.role === 'admin'
      } else {
        userName.value = 'Thành viên'
      }
    } catch (e) {
      userName.value = 'Thành viên'
    }
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  checkAuth()
  fetchBrands()
  window.addEventListener('user-profile-updated', checkAuth)
  window.addEventListener('storage', checkAuth)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('user-profile-updated', checkAuth)
  window.removeEventListener('storage', checkAuth)
})

async function handleLogout() {
  localStorage.setItem('is_logging_out', 'true')
  try {
    await axiosInstance.post('/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    localStorage.removeItem('is_logging_out')
    isLoggedIn.value = false
    userName.value = ''
    window.location.href = '/'
  }
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
.dropdown-mega,
.dropdown-account {
  z-index: 300;
}

.group:hover .ti-chevron-down {
  transform: rotate(180deg);
}

/* Notification dropdown animation */
.notif-drop-enter-active,
.notif-drop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.notif-drop-enter-from,
.notif-drop-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}
</style>
