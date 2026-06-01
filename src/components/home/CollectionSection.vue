<template>
  <section class="py-8" id="collection">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">
        <div class="flex justify-between items-end mb-9 text-left">
          <div>
            <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px] font-bold">BỘ SƯU TẬP</h2>
            <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Phong cách dành riêng cho bạn</p>
          </div>
          <router-link to="/products" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Xem tất cả <i class="ti ti-arrow-right"></i></router-link>
        </div>

        <div class="grid grid-cols-2 max-md:grid-cols-1 grid-rows-auto gap-4">
          <!-- Large left card -->
          <router-link to="/products?category=Giày Sneaker" class="group rounded-xl overflow-hidden relative cursor-pointer bg-[linear-gradient(160deg,#fff0e6,#ffffff)] transition-transform hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,0,0,.1)] row-span-2 max-md:row-span-1 block">
            <div class="h-full min-h-[380px] relative overflow-hidden z-[1]">
              <img src="/images/nike-paris1.png" class="w-full h-full object-contain p-3 bg-white" alt="Streetwear">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-white/95 to-transparent/60 z-[2]"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 z-[3] text-left">
              <div class="text-[10px] tracking-[2px] uppercase text-accent mb-1.5 font-bold">● Mới ra mắt</div>
              <h3 class="font-display text-text text-[clamp(22px,3vw,30px)] tracking-[1px] mb-1.5 font-bold">STREETWEAR<br>COLLECTION</h3>
              <p class="text-[12px] text-text-muted leading-[1.5]">Sneaker đường phố đỉnh cao — phong cách riêng, cá tính mạnh.</p>
              <span class="inline-flex items-center gap-[6px] mt-3.5 text-[12px] tracking-[1px] font-medium uppercase text-text border-b border-text-muted pb-[2px] transition-all group-hover:text-accent group-hover:border-accent font-semibold">Khám phá <i class="ti ti-arrow-right"></i></span>
            </div>
          </router-link>

          <!-- Top right -->
          <router-link to="/products?category=Dép Crocs" class="group bg-surface2 rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,0,0,.1)] block">
            <div class="h-full min-h-[200px] relative overflow-hidden z-[1]">
              <img src="/images/puma-mb1.webp" class="w-full h-full object-contain p-3 bg-white" alt="Crocs 2026">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-white/95 to-transparent/60 z-[2]"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 z-[3] text-left">
              <div class="text-[10px] tracking-[2px] uppercase text-accent mb-1.5 font-bold">● Crocs Limited</div>
              <h3 class="font-display text-text text-[clamp(22px,3vw,30px)] tracking-[1px] mb-1.5 font-bold">CROCS 2026</h3>
              <p class="text-[12px] text-text-muted leading-[1.5]">Dòng Crocs giới hạn — mang một lần, nhớ mãi mãi.</p>
              <span class="inline-flex items-center gap-[6px] mt-3.5 text-[12px] tracking-[1px] font-medium uppercase text-text border-b border-text-muted pb-[2px] transition-all group-hover:text-accent group-hover:border-accent font-semibold">Xem ngay <i class="ti ti-arrow-right"></i></span>
            </div>
          </router-link>

          <!-- Bottom right -->
          <router-link to="/products?category=Giày Sneaker" class="group bg-surface2 rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,0,0,.1)] block">
            <div class="h-full min-h-[200px] relative overflow-hidden z-[1]">
              <img src="/images/puma1.webp" class="w-full h-full object-cover" alt="Sport Performance">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-white/95 to-transparent/60 z-[2]"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 z-[3] text-left">
              <div class="text-[10px] tracking-[2px] uppercase text-accent mb-1.5 font-bold">● Sport Style</div>
              <h3 class="font-display text-text text-[clamp(22px,3vw,30px)] tracking-[1px] mb-1.5 font-bold">SPORT<br>PERFORMANCE</h3>
              <p class="text-[12px] text-text-muted leading-[1.5]">Giày thể thao chính hãng — vừa chạy vừa đẹp.</p>
              <span class="inline-flex items-center gap-[6px] mt-3.5 text-[12px] tracking-[1px] font-medium uppercase text-text border-b border-text-muted pb-[2px] transition-all group-hover:text-accent group-hover:border-accent font-semibold">Xem bộ sưu tập <i class="ti ti-arrow-right"></i></span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
