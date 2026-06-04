<template>
  <section class="py-8" id="collection">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">

        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="font-display text-[clamp(18px,2.5vw,28px)] tracking-[1.5px] font-bold">BỘ SƯU TẬP</h2>
          <router-link to="/products" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">
            Xem tất cả <i class="ti ti-arrow-right"></i>
          </router-link>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5">

          <!-- Card 1: Crocs -->
          <router-link to="/products?category=Dép Crocs"
            class="group rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          >
            <div class="bg-white overflow-hidden" style="height:240px;">
              <img
                src="/images/puma-mb1.webp"
                class="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                alt="Crocs Collection"
              >
            </div>
            <div class="bg-[#1a1a2e] px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <div class="text-[10px] text-white/50 tracking-[2px] uppercase font-medium mb-1">Crocs Limited 2026</div>
                <h3 class="font-display text-white text-[22px] tracking-[1px] font-bold leading-tight">CROCS COLLECTION</h3>
                <p class="text-white/60 text-[12px] mt-1 leading-[1.5]">Cá tính, thoải mái, không đụng hàng.</p>
              </div>
              <span class="shrink-0 flex items-center gap-2 bg-accent text-white text-[11px] font-bold tracking-[1px] uppercase px-4 py-2.5 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-[#1a1a2e]">
                Xem ngay <i class="ti ti-arrow-right"></i>
              </span>
            </div>
          </router-link>

          <!-- Card 2: Sport -->
          <router-link to="/products?category=Giày Sneaker"
            class="group rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          >
            <div class="bg-white overflow-hidden" style="height:240px;">
              <img
                src="/images/puma1.webp"
                class="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                alt="Sport Performance"
              >
            </div>
            <div class="bg-[#111] px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <div class="text-[10px] text-white/50 tracking-[2px] uppercase font-medium mb-1">Giày thể thao chính hãng</div>
                <h3 class="font-display text-white text-[22px] tracking-[1px] font-bold leading-tight">SPORT PERFORMANCE</h3>
                <p class="text-white/60 text-[12px] mt-1 leading-[1.5]">Hiệu suất đỉnh, phong cách không lỗi.</p>
              </div>
              <span class="shrink-0 flex items-center gap-2 bg-white text-[#111] text-[11px] font-bold tracking-[1px] uppercase px-4 py-2.5 rounded-full transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                Khám phá <i class="ti ti-arrow-right"></i>
              </span>
            </div>
          </router-link>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
