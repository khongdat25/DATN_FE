<template>
  <section class="py-[60px] max-md:py-10" id="products">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="flex justify-between items-end mb-9">
        <div>
          <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px]">SẢN PHẨM NỔI BẬT</h2>
          <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Được chọn lọc kỹ càng cho bạn</p>
        </div>
        <a href="#" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Xem tất cả <i class="ti ti-arrow-right"></i></a>
      </div>

      <div class="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
        <!-- Large Featured Card -->
        <div class="bg-bg border border-border rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,.05)]">
          <div class="h-[450px] max-lg:h-[260px] bg-surface2 flex items-center justify-center text-[140px] relative">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,77,0,.15),transparent_60%)]"></div>
            👟
            <div class="absolute top-[10px] left-[10px] flex flex-col gap-[5px] z-[2]">
              <span class="inline-block text-[9px] font-medium tracking-[1.5px] uppercase py-[3px] px-2 rounded-sm text-white bg-[#4CAF50]">NEW</span>
              <span class="inline-block text-[9px] font-medium tracking-[1.5px] uppercase py-[3px] px-2 rounded-sm text-white bg-gold">BESTSELLER</span>
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
            <div class="flex gap-[5px] flex-wrap mb-[10px]">
              <span
                v-for="size in sizes"
                :key="size"
                :class="['text-[10px] py-[3px] px-[7px] rounded-[3px] border cursor-pointer transition-all duration-150',
                  selectedSize === size ? 'border-accent text-accent bg-[rgba(255,77,0,.08)]' : 'border-border text-text-muted hover:border-accent hover:text-accent hover:bg-[rgba(255,77,0,.08)]']"
                @click="selectedSize = size"
              >{{ size }}</span>
            </div>
            <div class="flex gap-2">
              <button class="flex-1 bg-surface2 text-text border border-border p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-all flex items-center justify-center gap-[6px] hover:border-accent hover:text-accent hover:bg-bg" @click="$emit('add-to-cart', featured)">
                <i class="ti ti-shopping-cart"></i> Thêm vào giỏ
              </button>
              <button class="flex-1 bg-accent text-white border-none p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-colors hover:bg-accent-hover">Mua ngay</button>
            </div>
          </div>
        </div>

        <!-- Small cards -->
        <div class="flex flex-col gap-4">
          <div
            v-for="item in smallProducts"
            :key="item.id"
            class="featured-small group bg-bg border border-border rounded-md flex overflow-hidden cursor-pointer transition-all hover:border-border-light hover:translate-x-1 hover:shadow-[0_4px_15px_rgba(0,0,0,.05)]"
          >
            <div class="w-[110px] min-w-[110px] bg-surface2 flex items-center justify-center text-[50px]">{{ item.icon }}</div>
            <div class="p-[14px] flex-1">
              <div class="text-[10px] text-text-muted tracking-[1.5px] uppercase mb-[3px]">{{ item.brand }}</div>
              <div class="text-[13px] font-medium mb-[5px] text-text">{{ item.name }}</div>
              <div class="flex items-baseline gap-2 mb-2">
                <span class="font-display text-[17px] text-accent tracking-[0.5px]">{{ item.price }}</span>
                <span v-if="item.oldPrice" class="text-[12px] text-text-dim line-through">{{ item.oldPrice }}</span>
              </div>
              <div class="flex items-center gap-1 text-[12px] text-gold mb-[10px]">{{ item.rating }} <span class="text-text-muted text-[11px]">({{ item.reviews }})</span></div>
              <button class="bg-surface2 text-text border border-border p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-all flex items-center justify-center gap-[6px] mt-2 w-full hover:border-accent hover:text-accent hover:bg-bg" @click="$emit('add-to-cart', item)">
                <i class="ti ti-shopping-cart"></i> Giỏ hàng
              </button>
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
