<template>
  <section class="py-8 border-y border-border" id="categories">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">
        <div class="flex justify-between items-end mb-9">
          <div>
            <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px] font-bold">DANH MỤC SẢN PHẨM</h2>
            <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Khám phá các dòng giày &amp; dép đa dạng</p>
          </div>
          <a href="#" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Tất cả danh mục <i class="ti ti-arrow-right"></i></a>
        </div>

        <!-- Loading Skeleton -->
        <div v-if="loading" class="grid grid-cols-6 max-lg:grid-cols-3 max-[480px]:grid-cols-2 gap-[14px]">
          <div
            v-for="i in 6"
            :key="i"
            class="bg-surface2 rounded-md py-6 px-[14px] animate-pulse h-[110px]"
          ></div>
        </div>

        <!-- Categories Grid -->
        <div v-else class="grid grid-cols-6 max-lg:grid-cols-3 max-[480px]:grid-cols-2 gap-[14px]">
          <div
            v-for="cat in categories"
            :key="cat.name"
            class="group bg-surface border border-border hover:border-accent rounded-md py-6 px-[14px] text-center cursor-pointer transition-all relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] before:content-[''] before:absolute before:inset-0 before:bg-accent before:opacity-0 before:transition-opacity hover:before:opacity-[0.03]"
          >
            <span class="text-[36px] mb-[10px] block">{{ getCategoryIcon(cat.name) }}</span>
            <div class="text-[11px] tracking-[1.5px] uppercase font-semibold transition-colors text-text-muted group-hover:text-accent">{{ cat.name }}</div>
            <div class="text-[10px] text-text-dim mt-1">{{ cat.products_count }} sản phẩm</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '../../api/homeService'

const categories = ref([])
const loading = ref(true)

// Map tên danh mục sang icon emoji
const ICON_MAP = {
  'sneaker': '👟',
  'giày': '👟',
  'crocs': '🥿',
  'dép': '🥿',
  'sandal': '👡',
  'running': '🏃',
  'chạy bộ': '🏃',
  'phụ kiện': '🎒',
  'accessory': '🎒',
  'sale': '🔥',
  'boots': '👢',
  'thể thao': '⚽',
}

function getCategoryIcon(name) {
  const key = name?.toLowerCase() || ''
  for (const [k, v] of Object.entries(ICON_MAP)) {
    if (key.includes(k)) return v
  }
  return '👟'
}

onMounted(async () => {
  try {
    const res = await getCategories()
    categories.value = res.data || []
  } catch (e) {
    // Fallback dữ liệu tĩnh
    categories.value = [
      { name: 'Sneaker', products_count: 128 },
      { name: 'Dép Crocs', products_count: 86 },
      { name: 'Sandal', products_count: 54 },
      { name: 'Running', products_count: 72 },
      { name: 'Phụ Kiện', products_count: 35 },
      { name: 'Sale', products_count: 0 },
    ]
  } finally {
    loading.value = false
  }
})
</script>
