<template>
  <section class="py-[60px] max-md:py-10 border-y border-border" id="categories">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="flex justify-between items-end mb-9">
        <div>
          <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px]">DANH MỤC SẢN PHẨM</h2>
          <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Khám phá các dòng giày & dép đa dạng</p>
        </div>
        <a href="#" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Tất cả danh mục <i class="ti ti-arrow-right"></i></a>
      </div>
      <div class="grid grid-cols-6 max-lg:grid-cols-3 max-[480px]:grid-cols-2 gap-[14px]">
        <div
          v-for="cat in categories"
          :key="cat.name"
          :class="['group bg-surface border rounded-xl py-7 px-[14px] text-center cursor-pointer transition-all duration-300 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(255,77,0,0.12)] before:content-[\'\'] before:absolute before:inset-0 before:bg-accent before:opacity-0 before:transition-opacity hover:before:opacity-[0.03]',
            cat.featured ? 'border-accent shadow-[0_4px_15px_rgba(255,77,0,0.1)]' : 'border-border hover:border-accent']"
        >
          <span class="text-[36px] mb-[10px] block">{{ cat.icon }}</span>
          <div :class="['text-[11px] tracking-[1.5px] uppercase font-medium transition-colors', cat.featured ? 'text-accent' : 'text-text-muted group-hover:text-accent']">{{ cat.name }}</div>
          <div class="text-[10px] text-text-dim mt-1">{{ cat.count }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  { icon: '👟', name: 'Sneaker', count: '128 sản phẩm', featured: false },
  { icon: '🥿', name: 'Dép Crocs', count: '86 sản phẩm', featured: false },
  { icon: '👡', name: 'Sandal', count: '54 sản phẩm', featured: false },
  { icon: '🏃', name: 'Running', count: '72 sản phẩm', featured: false },
  { icon: '🎒', name: 'Phụ Kiện', count: '35 sản phẩm', featured: false },
  { icon: '🔥', name: 'Flash Sale', count: 'Hôm nay!', featured: true },
]
</script>
