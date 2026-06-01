<template>
  <section class="py-8 border-y border-border" id="categories">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">
        <div class="flex justify-between items-end mb-9">
          <div>
            <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px] font-bold">DANH MỤC SẢN PHẨM</h2>
            <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Khám phá các dòng giày & dép đa dạng</p>
          </div>
          <a href="#" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Tất cả danh mục <i class="ti ti-arrow-right"></i></a>
        </div>
        <div class="grid grid-cols-4 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-6">
          <router-link
            v-for="cat in categories"
            :key="cat.name"
            to="/products"
            class="group bg-white border border-border hover:border-accent rounded-2xl py-8 px-6 text-center cursor-pointer transition-all relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(255,77,0,0.08)] block"
          >
            <div class="font-display text-[15px] tracking-[2px] uppercase font-extrabold text-text transition-colors group-hover:text-accent mb-1.5">{{ cat.name }}</div>
            <div class="text-[11px] text-text-dim uppercase tracking-wider font-semibold">{{ cat.count }}</div>
            <!-- Decorative bottom accent bar on hover -->
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-accent transition-all duration-300 group-hover:w-2/3 rounded-t-full"></div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  { name: 'Giày Sneaker', count: '120+ sản phẩm' },
  { name: 'Dép Crocs', count: '80+ sản phẩm' },
  { name: 'Dép Sandal', count: '50+ sản phẩm' },
  { name: 'Phụ Kiện', count: '30+ sản phẩm' }
]
</script>
