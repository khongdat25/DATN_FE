<template>
  <section class="py-[60px] max-md:py-10" id="products">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="flex justify-between items-end mb-9">
        <div>
          <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px]">SẢN PHẨM NỔI BẬT</h2>
          <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Được chọn lọc kỹ càng cho bạn</p>
        </div>
        <router-link to="/products" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Xem tất cả <i class="ti ti-arrow-right"></i></router-link>
      </div>

      <div class="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
        <!-- Large Featured Card -->
        <div class="bg-bg border border-border rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,.05)]">
          <div class="h-[450px] max-lg:h-[260px] bg-surface2 flex items-center justify-center text-[140px] relative">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,77,0,.15),transparent_60%)]"></div>
            👟
            <div class="absolute top-[12px] left-[12px] flex flex-col gap-[6px] z-[2]">
              <span class="inline-block text-[10px] font-semibold tracking-[1.5px] uppercase py-[4px] px-2.5 rounded-lg text-white bg-[#4CAF50] shadow-sm">NEW</span>
              <span class="inline-block text-[10px] font-semibold tracking-[1.5px] uppercase py-[4px] px-2.5 rounded-lg text-white bg-gold shadow-sm">BESTSELLER</span>
            </div>
          </div>
          <div class="p-6">
            <div class="text-[11px] text-text-muted tracking-[1.5px] uppercase mb-1">Nike × Off-White</div>
            <div class="font-display text-[24px] whitespace-normal tracking-[1px] mb-2 text-text">Air Max 97 OW Collab Limited</div>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="font-display text-[28px] text-accent tracking-[0.5px]">4.500.000đ</span>
              <span class="text-[12px] text-text-dim line-through">6.200.000đ</span>
            </div>
            <div class="flex items-center gap-1 text-[12px] text-gold mb-[10px]">★★★★★ <span class="text-text-muted text-[11px]">(203 đánh giá)</span></div>
            <!-- Size chips -->
            <div class="flex gap-[6px] flex-wrap mb-[14px]">
              <span
                v-for="size in sizes"
                :key="size"
                :class="['text-[11px] py-[4px] px-[10px] rounded-lg border font-medium cursor-pointer transition-all duration-300',
                  selectedSize === size ? 'border-accent text-accent bg-[rgba(255,77,0,.08)] shadow-sm' : 'border-border text-text-muted hover:border-accent hover:text-accent hover:bg-[rgba(255,77,0,.08)]']"
                @click="selectedSize = size"
              >{{ size }}</span>
            </div>
            <div class="flex gap-2.5">
              <button class="w-12 h-12 bg-surface2 text-text border border-border text-xl rounded-xl transition-all duration-300 flex items-center justify-center hover:border-accent hover:text-accent hover:bg-bg active:scale-90 shadow-sm" title="Thêm vào giỏ" @click="$emit('add-to-cart', featured)">
                <i class="ti ti-shopping-cart"></i>
              </button>
              <button class="flex-1 bg-accent text-white border-none h-12 font-display text-[16px] tracking-[2px] rounded-xl transition-all duration-300 shadow-[0_6px_20px_rgba(255,77,0,0.25)] hover:bg-accent-hover hover:shadow-[0_8px_25px_rgba(255,77,0,0.35)] hover:-translate-y-0.5 active:scale-95">MUA NGAY</button>
            </div>
          </div>
        </div>

        <!-- Small cards -->
        <div class="flex flex-col gap-4">
          <div
            v-for="item in smallProducts"
            :key="item.id"
            class="featured-small group bg-bg border border-border rounded-xl flex overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent hover:translate-x-1.5 hover:shadow-[0_8px_25px_rgba(0,0,0,.06)]"
          >
            <div class="w-[110px] min-w-[110px] bg-surface2 flex items-center justify-center text-[50px]">{{ item.icon }}</div>
            <div class="p-[14px] flex-1">
              <div class="text-[10px] text-text-muted tracking-[1.5px] uppercase mb-[3px]">{{ item.brand }}</div>
              <div class="text-[13px] font-medium mb-[5px] text-text">{{ item.name }}</div>
              <div class="flex items-baseline gap-2 mb-2">
                <span class="font-display text-[17px] text-accent tracking-[0.5px]">{{ item.price }}</span>
                <span v-if="item.oldPrice" class="text-[12px] text-text-dim line-through">{{ item.oldPrice }}</span>
              </div>
              <div class="flex items-center justify-between gap-2 mt-2">
                <div class="flex items-center gap-1 text-[12px] text-gold">{{ item.rating }} <span class="text-text-muted text-[11px]">({{ item.reviews }})</span></div>
                <div class="flex gap-1.5">
                  <button class="w-9 h-9 bg-surface2 text-text border border-border text-lg rounded-lg transition-all duration-300 flex items-center justify-center hover:border-accent hover:text-accent hover:bg-bg active:scale-90 shadow-sm" title="Thêm vào giỏ" @click="$emit('add-to-cart', item)">
                    <i class="ti ti-shopping-cart"></i>
                  </button>
                  <button class="bg-accent text-white border-none py-1.5 px-3 text-[10px] tracking-[1px] font-semibold uppercase rounded-lg shadow-sm transition-all duration-300 hover:bg-accent-hover active:scale-95">Mua</button>
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
import { ref } from 'vue'

defineEmits(['add-to-cart'])

const sizes = ['38', '39', '40', '41', '42', '43']
const selectedSize = ref('39')

const featured = { id: 30, name: 'Air Max 97 OW Collab Limited', brand: 'Nike × Off-White' }

const smallProducts = [
  { id: 31, brand: 'Crocs', name: 'Mega Crush Clog Platform', price: '1.450.000đ', oldPrice: '1.800.000đ', icon: '🥿', rating: '★★★★★', reviews: '205' },
  { id: 32, brand: 'Adidas', name: 'Yeezy Boost 350 V2 Onyx', price: '3.200.000đ', oldPrice: '4.500.000đ', icon: '👟', rating: '★★★★★', reviews: '178' },
  { id: 33, brand: 'Crocs', name: 'Echo Sandal Unisex 2026', price: '1.090.000đ', icon: '👡', rating: '★★★★☆', reviews: '67' },
  { id: 34, brand: 'Nike', name: 'Dunk Low Retro Panda', price: '1.890.000đ', oldPrice: '2.300.000đ', icon: '👟', rating: '★★★★★', reviews: '334' },
]
</script>
