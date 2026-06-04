<template>
  <section class="py-8" id="products">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="section-wrapper">
        <div class="grid grid-cols-3 items-center mb-6 gap-4 max-md:flex max-md:flex-col max-md:items-start max-md:gap-3">
          <!-- Left: Title -->
          <h2 class="font-display text-[clamp(18px,2.5vw,28px)] tracking-[1.5px] font-bold whitespace-nowrap">SẢN PHẨM NỔI BẬT</h2>
          <!-- Center: Collab Filter Chips -->
          <div class="flex gap-2 flex-wrap justify-center max-md:justify-start">
            <button
              v-for="f in collabFilters"
              :key="f.key"
              :class="['py-1.5 px-3.5 rounded-full text-[11px] tracking-[1px] uppercase cursor-pointer transition-all border font-medium',
                activeCollab === f.key
                  ? 'bg-accent border-accent text-white shadow-sm'
                  : 'bg-surface2 text-text-muted border-border hover:bg-accent hover:border-accent hover:text-white']"
              @click="activeCollab = f.key"
            >{{ f.label }}</button>
          </div>
          <!-- Right: View all -->
          <div class="flex justify-end max-md:justify-start">
            <a href="/products" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Xem tất cả <i class="ti ti-arrow-right"></i></a>
          </div>
        </div>

        <div class="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
          <!-- Large Featured Card -->
          <div class="bg-bg rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,.05)]" @click="goToDetail(featured)">
            <div class="h-[280px] max-lg:h-[220px] relative overflow-hidden">
              <img :src="featured.image" class="w-full h-full object-contain p-3 bg-white" :alt="featured.name">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,77,0,0.1),transparent_60%)]"></div>

            </div>
            <div class="p-6 text-left">
              <div class="text-[11px] text-text-muted tracking-[1.5px] uppercase mb-1 font-bold">{{ featured.brand }}</div>
              <div class="font-display text-[24px] whitespace-normal tracking-[1px] mb-2 text-text font-bold">{{ featured.name }}</div>
              <div class="flex items-baseline gap-2 mb-2">
                <span class="font-display text-[28px] text-accent tracking-[0.5px] font-bold">{{ featured.price }}</span>
                <span class="text-[12px] text-text-dim line-through">{{ featured.oldPrice }}</span>
              </div>
              <div class="flex items-center gap-1 text-[12px] text-gold mb-[10px]">★★★★★ <span class="text-text-muted text-[11px]">({{ featured.reviews }} đánh giá)</span></div>
              <div class="prod-sizes flex gap-[5px] flex-wrap mb-[10px]">
                <span
                  v-for="size in sizes"
                  :key="size"
                  :class="['size-chip text-[10px] py-[3px] px-[7px] rounded-[3px] border cursor-pointer transition-all duration-150',
                    selectedSize === size ? 'border-accent text-accent bg-accent/5 font-semibold' : 'border-border text-text-muted hover:border-accent hover:text-accent hover:bg-accent/5']"
                  @click.stop="selectedSize = size"
                >{{ size }}</span>
              </div>
              <div class="flex gap-2">
                <button class="flex-1 bg-surface2 text-text border border-border p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-all flex items-center justify-center gap-[6px] hover:border-accent hover:text-accent hover:bg-bg active:scale-95 cursor-pointer font-bold" @click.stop="doAddToCart(featured)">
                  <i class="ti ti-shopping-cart"></i> Thêm vào giỏ
                </button>
                <button class="flex-1 bg-accent text-white border-none p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-colors hover:bg-accent-hover font-bold cursor-pointer" @click.stop="doBuyNow(featured)">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>

          <!-- Small Card List -->
          <div class="flex flex-col gap-4">
            <div
              v-for="item in smallProducts"
              :key="item.id"
              class="featured-small group bg-bg rounded-md border border-border flex overflow-hidden cursor-pointer transition-all hover:translate-x-1 hover:shadow-[0_4px_15px_rgba(0,0,0,.05)]"
              @click="goToDetail(item)"
            >
              <div class="w-[110px] min-w-[110px] overflow-hidden">
                <img :src="item.image" class="w-full h-full object-contain p-3 bg-white transition-transform duration-500 group-hover:scale-105" :alt="item.name">
              </div>
              <div class="feat-small-info p-[14px] flex-1 text-left">
                <div class="text-[10px] text-text-muted tracking-[1.5px] uppercase mb-[3px] font-bold">{{ item.brand }}</div>
                <div class="text-[13px] font-medium mb-[5px] text-text leading-tight">{{ item.name }}</div>
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="font-display text-[17px] text-accent tracking-[0.5px] font-bold">{{ item.price }}</span>
                  <span v-if="item.oldPrice" class="text-[12px] text-text-dim line-through">{{ item.oldPrice }}</span>
                </div>
                <div class="flex items-center gap-1 text-[12px] text-gold mb-[10px]">
                  {{ item.rating }} <span class="text-text-muted text-[11px]">({{ item.reviews }})</span>
                </div>
                <div class="flex gap-1.5 mt-2">
                  <button class="flex-1 bg-surface2 text-text border border-border p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-all flex items-center justify-center gap-[6px] hover:border-accent hover:text-accent hover:bg-bg cursor-pointer font-bold" @click.stop="doAddToCart(item)">
                    <i class="ti ti-shopping-cart"></i> Giỏ hàng
                  </button>
                  <button class="flex-1 bg-accent text-white border-none p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-colors hover:bg-accent-hover font-bold cursor-pointer" @click.stop="doBuyNow(item)">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { allProducts } from '../../data/products.js'

const router = useRouter()

const addToCart = inject('addToCart', (p) => {})

const activeCollab = ref('all')
const collabFilters = [
  { key: 'all', label: 'Tất cả' },
  { key: 'collab', label: 'Collab Anime' },
  { key: 'limited', label: 'Limited' },
]

const sizes = ['38', '39', '40', '41', '42', '43']
const selectedSize = ref('39')

function doAddToCart(product) {
  addToCart(product)
}

function doBuyNow(product) {
  addToCart(product)
  router.push('/cart')
}

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

const featured = allProducts.find(p => p.id === 30)

const smallProducts = allProducts.filter(p => p.id >= 31 && p.id <= 33)
</script>

<style scoped>
.size-chip.active {
  border-color: var(--color-accent, #FF4D00) !important;
  color: var(--color-accent, #FF4D00) !important;
  background-color: rgba(255, 77, 0, 0.08) !important;
}
</style>
