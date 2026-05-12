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
        <a href="#" class="font-display text-[26px] tracking-[3px]">STEP<span class="text-accent">UP</span></a>

        <!-- Desktop Nav -->
        <ul class="flex gap-1 max-md:hidden items-center">
          <li>
            <a href="#" class="block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Trang chủ</a>
          </li>

          <!-- Nam dropdown -->
          <li class="relative group">
            <a href="#" class="flex items-center gap-1 py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2 group-hover:text-accent group-hover:bg-surface2">
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
            <a href="#" class="flex items-center gap-1 py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2 group-hover:text-accent group-hover:bg-surface2">
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
            <a href="#" class="flex items-center gap-1 py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2 group-hover:text-accent group-hover:bg-surface2">
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

          <li><a href="#flash" class="block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Giới thiệu</a></li>
          <li><a href="#blog" class="block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Liên hệ</a></li>
        </ul>

        <!-- Actions -->
        <div class="flex items-center gap-[6px]">
          <div class="flex items-center bg-surface2 border border-border rounded-sm overflow-hidden transition-colors focus-within:border-accent max-md:hidden">
            <input type="text" placeholder="Tìm kiếm sản phẩm..." id="searchInput" class="bg-transparent border-none outline-none py-2 px-3.5 text-[13px] text-text w-[160px] font-body placeholder:text-text-dim">
            <button class="bg-transparent border-none py-2 px-3 text-text-muted text-lg transition-colors hover:text-accent"><i class="ti ti-search"></i></button>
          </div>
          <button class="w-10 h-10 flex items-center justify-center rounded-sm bg-transparent border-none text-text-muted text-xl relative transition-all hover:bg-surface2 hover:text-accent" title="Yêu thích"><i class="ti ti-heart"></i></button>
          <button class="w-10 h-10 flex items-center justify-center rounded-sm bg-transparent border-none text-text-muted text-xl relative transition-all hover:bg-surface2 hover:text-accent" title="Thông báo">
            <i class="ti ti-bell"></i>
            <span class="absolute top-[5px] right-[5px] bg-accent text-white text-[9px] font-medium w-[15px] h-[15px] rounded-full flex items-center justify-center">2</span>
          </button>
          <button class="w-10 h-10 flex items-center justify-center rounded-sm bg-transparent border-none text-text-muted text-xl relative transition-all hover:bg-surface2 hover:text-accent" title="Giỏ hàng">
            <i class="ti ti-shopping-cart"></i>
            <span class="absolute top-[5px] right-[5px] bg-accent text-white text-[9px] font-medium w-[15px] h-[15px] rounded-full flex items-center justify-center">{{ cartCount }}</span>
          </button>
          <button class="w-10 h-10 flex items-center justify-center rounded-sm bg-transparent border-none text-text-muted text-xl relative transition-all hover:bg-surface2 hover:text-accent" title="Tài khoản"><i class="ti ti-user"></i></button>
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
      <a href="#" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent">Trang chủ</a>
      <a href="#" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Nam</a>
      <a href="#" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Nữ</a>
      <a href="#" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Trẻ em</a>
      <a href="#flash" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent" @click="menuOpen = false">Giới thiệu</a>
      <a href="#blog" class="block py-3 text-[15px] text-text-muted border-none transition-colors hover:text-accent" @click="menuOpen = false">Liên hệ</a>
    </div>
  </header>
</template>

<script setup>
import { ref, inject } from 'vue'

const cartCount = inject('cartCount', ref(3))
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
.dropdown-mega {
  z-index: 300;
}

.group:hover .ti-chevron-down {
  transform: rotate(180deg);
}
</style>
