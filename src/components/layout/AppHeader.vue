<template>
  <!-- Top Bar -->
  <div class="bg-accent text-center py-[9px] px-5 text-xs tracking-[2px] uppercase font-medium text-white [&>span]:mx-4">
    <span>🚀 FREE SHIP đơn từ 500K</span>
    <span>|</span>
    <span>⚡ FLASH SALE mỗi ngày 12H–14H</span>
    <span>|</span>
    <span>🎁 Tặng quà khi mua từ 1 triệu</span>
  </div>

  <!-- Header -->
  <header class="bg-white/95 backdrop-blur-[12px] border-b border-border sticky top-0 z-[200]">
    <div class="max-w-[1200px] mx-auto px-5">
      <nav class="flex items-center justify-between h-[72px] gap-4">
        <router-link to="/" class="font-display text-[22px] tracking-[2px] font-bold shrink-0 transition-all duration-300">SAIGON<span class="text-accent">SHOES</span></router-link>

        <!-- Desktop Nav -->
        <ul class="flex gap-0.5 max-md:hidden items-center">
          <li>
            <router-link to="/" class="block py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-lg transition-all duration-300 whitespace-nowrap hover:text-accent hover:bg-surface2 active:scale-95">Trang chủ</router-link>
          </li>
          <li>
            <router-link to="/products" class="block py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-lg transition-all duration-300 whitespace-nowrap hover:text-accent hover:bg-surface2 active:scale-95">Cửa hàng</router-link>
          </li>

          <!-- Nam dropdown -->
          <li class="relative group">
            <a href="#" class="flex items-center gap-1 py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-lg transition-all duration-300 whitespace-nowrap hover:text-accent hover:bg-surface2 group-hover:text-accent group-hover:bg-surface2 active:scale-95">
              Nam <i class="ti ti-chevron-down text-[11px] transition-transform duration-200 group-hover:rotate-180"></i>
            </a>
            <div class="dropdown-mega absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <div class="bg-white border border-border rounded-lg shadow-xl p-5 flex gap-8 min-w-[420px]">
                <!-- Giày -->
                <div class="flex-1">
                  <p class="text-[11px] uppercase tracking-[2px] font-semibold text-accent mb-3 pb-2 border-b border-border">👟 Giày</p>
                  <ul class="space-y-1">
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày thể thao nam</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày chạy bộ nam</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày casual nam</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày boots nam</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Xem tất cả giày nam →</a></li>
                  </ul>
                </div>
                <!-- Dép Crocs -->
                <div class="flex-1">
                  <p class="text-[11px] uppercase tracking-[2px] font-semibold text-accent mb-3 pb-2 border-b border-border">🩴 Dép Crocs</p>
                  <ul class="space-y-1">
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Crocs Classic nam</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép sandal nam</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép xỏ ngón nam</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép bệt nam</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Xem tất cả dép nam →</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <!-- Nữ dropdown -->
          <li class="relative group">
            <a href="#" class="flex items-center gap-1 py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2 group-hover:text-accent group-hover:bg-surface2">
              Nữ <i class="ti ti-chevron-down text-[11px] transition-transform duration-200 group-hover:rotate-180"></i>
            </a>
            <div class="dropdown-mega absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <div class="bg-white border border-border rounded-lg shadow-xl p-5 flex gap-8 min-w-[420px]">
                <div class="flex-1">
                  <p class="text-[11px] uppercase tracking-[2px] font-semibold text-accent mb-3 pb-2 border-b border-border">👟 Giày</p>
                  <ul class="space-y-1">
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày thể thao nữ</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày chạy bộ nữ</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày casual nữ</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày cao gót nữ</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Xem tất cả giày nữ →</a></li>
                  </ul>
                </div>
                <div class="flex-1">
                  <p class="text-[11px] uppercase tracking-[2px] font-semibold text-accent mb-3 pb-2 border-b border-border">🩴 Dép Crocs</p>
                  <ul class="space-y-1">
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Crocs Classic nữ</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép sandal nữ</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép xỏ ngón nữ</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép bệt nữ</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Xem tất cả dép nữ →</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <!-- Trẻ em dropdown -->
          <li class="relative group">
            <a href="#" class="flex items-center gap-1 py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2 group-hover:text-accent group-hover:bg-surface2">
              Trẻ em <i class="ti ti-chevron-down text-[11px] transition-transform duration-200 group-hover:rotate-180"></i>
            </a>
            <div class="dropdown-mega absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <div class="bg-white border border-border rounded-lg shadow-xl p-5 flex gap-8 min-w-[420px]">
                <div class="flex-1">
                  <p class="text-[11px] uppercase tracking-[2px] font-semibold text-accent mb-3 pb-2 border-b border-border">👟 Giày</p>
                  <ul class="space-y-1">
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày thể thao trẻ em</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày tập đi</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày học sinh</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Giày casual trẻ em</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Xem tất cả giày trẻ em →</a></li>
                  </ul>
                </div>
                <div class="flex-1">
                  <p class="text-[11px] uppercase tracking-[2px] font-semibold text-accent mb-3 pb-2 border-b border-border">🩴 Dép Crocs</p>
                  <ul class="space-y-1">
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Crocs Kids Classic</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép sandal trẻ em</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép xỏ ngón trẻ em</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Dép bệt trẻ em</a></li>
                    <li><a href="#" class="block py-1.5 px-2 text-sm text-text-muted rounded hover:text-accent hover:bg-surface2 transition-colors">Xem tất cả dép trẻ em →</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li><a href="#flash" class="block py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Giới thiệu</a></li>
          <li><a href="#blog" class="block py-2.5 px-2.5 text-[13px] text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Liên hệ</a></li>
        </ul>

        <!-- Actions -->
        <div class="flex items-center gap-[6px]">
          <div class="flex items-center bg-surface2 border border-border rounded-xl overflow-hidden transition-all duration-300 focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(255,77,0,0.1)] max-md:hidden">
            <input type="text" placeholder="Tìm kiếm..." id="searchInput" class="bg-transparent border-none outline-none py-2 px-3.5 text-[13px] text-text w-[120px] font-body placeholder:text-text-dim">
            <button class="bg-transparent border-none py-2 px-3 text-text-muted text-lg transition-all duration-300 hover:text-accent active:scale-90"><i class="ti ti-search"></i></button>
          </div>
          <button class="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-none text-text-muted text-xl relative transition-all duration-300 hover:bg-surface2 hover:text-accent hover:shadow-sm active:scale-90" title="Yêu thích"><i class="ti ti-heart"></i></button>
          <button class="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-none text-text-muted text-xl relative transition-all duration-300 hover:bg-surface2 hover:text-accent hover:shadow-sm active:scale-90" title="Thông báo">
            <i class="ti ti-bell"></i>
            <span class="absolute top-[5px] right-[5px] bg-accent text-white text-[9px] font-medium w-[15px] h-[15px] rounded-full flex items-center justify-center shadow-sm">2</span>
          </button>
          <button class="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-none text-text-muted text-xl relative transition-all duration-300 hover:bg-surface2 hover:text-accent hover:shadow-sm active:scale-90" title="Giỏ hàng">
            <i class="ti ti-shopping-cart"></i>
            <span class="absolute top-[5px] right-[5px] bg-accent text-white text-[9px] font-medium w-[15px] h-[15px] rounded-full flex items-center justify-center shadow-sm">{{ cartCount }}</span>
          </button>
          <div class="relative group h-full flex items-center ml-1">
            <template v-if="isLoggedIn">
              <button class="flex items-center gap-1.5 py-1.5 px-3 bg-surface2 border border-border rounded-xl text-xs font-semibold text-text-muted transition-all duration-300 hover:text-accent hover:border-accent hover:bg-bg cursor-pointer shadow-sm active:scale-95">
                <i class="ti ti-user text-sm"></i>
                <span class="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">{{ userName }}</span>
                <i class="ti ti-chevron-down text-[10px]"></i>
              </button>
              <div class="dropdown-account absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 w-44 bg-white border border-border rounded-xl shadow-xl py-2 z-[300]">
                <div class="px-4 py-2 border-b border-border text-xs text-text-muted font-medium text-left">Xin chào, {{ userName }}</div>
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
      <router-link to="/products" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Cửa hàng</router-link>
      <a href="#" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Nam</a>
      <a href="#" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Nữ</a>
      <a href="#" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Trẻ em</a>
      <a href="#flash" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Giới thiệu</a>
      <a href="#blog" class="block py-3 text-[15px] text-text-muted border-none transition-colors hover:text-accent" @click="menuOpen = false">Liên hệ</a>
      
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
import { ref, inject, onMounted } from 'vue'

const cartCount = inject('cartCount', ref(3))
const menuOpen = ref(false)

const isLoggedIn = ref(false)
const userName = ref('')

function checkAuth() {
  const token = localStorage.getItem('access_token')
  isLoggedIn.value = !!token
  if (token) {
    try {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        userName.value = user.name || 'Thành viên'
      } else {
        userName.value = 'Thành viên'
      }
    } catch (e) {
      userName.value = 'Thành viên'
    }
  }
}

onMounted(() => {
  checkAuth()
})

function handleLogout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  userName.value = ''
  window.location.href = '/'
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
</style>
