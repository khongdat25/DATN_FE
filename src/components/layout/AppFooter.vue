<template>
  <footer id="contact" class="bg-[linear-gradient(180deg,#ffffff,#fffcf9)] border-t border-border pt-[60px] mt-0">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="grid grid-cols-[2fr_1fr_1fr_1fr] max-lg:grid-cols-2 max-md:grid-cols-1 gap-12 pb-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4 select-none">
            <img src="/images/logo.png" alt="SaigonShoes Logo" class="h-10 w-10 object-contain mix-blend-multiply" onerror="this.style.display='none'">
            <div class="font-display text-[22px] tracking-[2px] font-bold text-text">SAIGON<span class="text-accent">SHOES</span></div>
          </div>
          <p class="text-[13px] text-text-muted leading-[1.7] max-w-[260px] mb-5">Cửa hàng giày sneaker, dép Crocs và sandal chính hãng hàng đầu tại TP.HCM. Cam kết chất lượng — giá tốt — giao nhanh.</p>
          <div class="flex gap-2.5">
            <a href="#" class="w-[38px] h-[38px] bg-white border border-border rounded-xl flex items-center justify-center text-[18px] text-text-muted transition-all hover:bg-accent hover:border-accent hover:text-white hover:scale-105 active:scale-95 shadow-sm" title="Facebook"><i class="ti ti-brand-facebook"></i></a>
            <a href="#" class="w-[38px] h-[38px] bg-white border border-border rounded-xl flex items-center justify-center text-[18px] text-text-muted transition-all hover:bg-accent hover:border-accent hover:text-white hover:scale-105 active:scale-95 shadow-sm" title="Instagram"><i class="ti ti-brand-instagram"></i></a>
            <a href="#" class="w-[38px] h-[38px] bg-white border border-border rounded-xl flex items-center justify-center text-[18px] text-text-muted transition-all hover:bg-accent hover:border-accent hover:text-white hover:scale-105 active:scale-95 shadow-sm" title="TikTok"><i class="ti ti-brand-tiktok"></i></a>
            <a href="#" class="w-[38px] h-[38px] bg-white border border-border rounded-xl flex items-center justify-center text-[18px] text-text-muted transition-all hover:bg-accent hover:border-accent hover:text-white hover:scale-105 active:scale-95 shadow-sm" title="YouTube"><i class="ti ti-brand-youtube"></i></a>
          </div>
        </div>
        <!-- Products -->
        <div class="flex flex-col">
          <h4 class="font-display text-[14px] uppercase tracking-[2px] font-bold mb-[18px] text-text">SẢN PHẨM</h4>
          <router-link to="/products" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Sneaker Nam</router-link>
          <router-link to="/products" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Sneaker Nữ</router-link>
          <router-link to="/products" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Dép Crocs</router-link>
          <router-link to="/products" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Sandal</router-link>
          <router-link to="/products" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Flash Sale</router-link>
          <router-link to="/products" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Hàng mới về</router-link>
        </div>
        <!-- Support -->
        <div class="flex flex-col">
          <h4 class="font-display text-[14px] uppercase tracking-[2px] font-bold mb-[18px] text-text">HỖ TRỢ</h4>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Theo dõi đơn hàng</a>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Đổi trả hàng</a>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Hướng dẫn chọn size</a>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Câu hỏi thường gặp</a>
          <router-link to="/contact" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Liên hệ</router-link>
        </div>
        <!-- Policy -->
        <div class="flex flex-col">
          <h4 class="font-display text-[14px] uppercase tracking-[2px] font-bold mb-[18px] text-text">CHÍNH SÁCH</h4>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Chính sách đổi trả</a>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Bảo mật thông tin</a>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Điều khoản sử dụng</a>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Phương thức vận chuyển</a>
          <a href="#" class="text-[13px] text-text-muted mb-2.5 transition-colors hover:text-accent font-medium">Thanh toán</a>
        </div>
      </div>
      <!-- Bottom Bar -->
      <div class="border-t border-border py-6 flex items-center justify-between flex-wrap gap-3">
        <span class="text-[12px] text-text-muted/80 font-medium">© 2026 SaigonShoes Store. All rights reserved. Designed for Fullstack Web Project.</span>
        <div class="flex items-center gap-2.5">
          <span class="bg-surface2 border border-border rounded-xl py-[5px] px-2.5 text-[11px] text-text-muted tracking-[0.5px] font-semibold">COD</span>
          <span class="bg-surface2 border border-border rounded-xl py-[5px] px-2.5 text-[11px] text-text-muted tracking-[0.5px] font-semibold">VNPay</span>
          <span class="bg-surface2 border border-border rounded-xl py-[5px] px-2.5 text-[11px] text-text-muted tracking-[0.5px] font-semibold">MoMo</span>
          <span class="bg-surface2 border border-border rounded-xl py-[5px] px-2.5 text-[11px] text-text-muted tracking-[0.5px] font-semibold">QR Pay</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
