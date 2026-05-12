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
      <ul class="nav-links flex gap-1 max-md:hidden">
        <li><a href="#" class="active block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Trang chủ</a></li>
        <li><a href="#sneaker" class="block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Sneaker</a></li>
        <li><a href="#crocs" class="block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Dép Crocs</a></li>
        <li><a href="#products" class="block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Sandal</a></li>
        <li><a href="#flash" class="block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Khuyến mãi</a></li>
        <li><a href="#blog" class="block py-2.5 px-4 text-sm text-text-muted tracking-[0.5px] rounded-sm transition-all whitespace-nowrap hover:text-accent hover:bg-surface2">Tin tức</a></li>
      </ul>
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
        <button class="w-10 h-10 flex items-center justify-center rounded-sm bg-transparent border-none text-text-muted text-xl relative transition-all hover:bg-surface2 hover:text-accent" title="Giỏ hàng" id="cartBtn">
          <i class="ti ti-shopping-cart"></i>
          <span class="absolute top-[5px] right-[5px] bg-accent text-white text-[9px] font-medium w-[15px] h-[15px] rounded-full flex items-center justify-center" id="cartCount">3</span>
        </button>
        <button class="w-10 h-10 flex items-center justify-center rounded-sm bg-transparent border-none text-text-muted text-xl relative transition-all hover:bg-surface2 hover:text-accent" title="Tài khoản"><i class="ti ti-user"></i></button>
        <button class="hidden flex-col gap-[5px] bg-transparent border-none p-2 max-md:flex" id="hamburger" aria-label="Menu">
          <span class="block w-[22px] h-[2px] bg-text transition-all duration-300"></span>
          <span class="block w-[22px] h-[2px] bg-text transition-all duration-300"></span>
          <span class="block w-[22px] h-[2px] bg-text transition-all duration-300"></span>
        </button>
      </div>
    </nav>
  </div>
  <div class="hidden bg-bg border-t border-border py-4 px-5 [&.open]:block" id="mobileMenu">
    <a href="#" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent">Trang chủ</a>
    <a href="#sneaker" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent">Sneaker</a>
    <a href="#crocs" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent">Dép Crocs</a>
    <a href="#products" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent">Sandal</a>
    <a href="#flash" class="block py-3 text-[15px] text-text-muted border-b border-border transition-colors hover:text-accent">Khuyến mãi</a>
    <a href="#blog" class="block py-3 text-[15px] text-text-muted border-none transition-colors hover:text-accent">Tin tức</a>
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
