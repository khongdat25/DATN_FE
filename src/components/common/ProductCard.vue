<template>
  <!-- Reusable Product Card -->
  <div class="group prod-card bg-bg border border-border rounded-md overflow-hidden transition-all relative hover:border-border-light hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,.08)]">
    <!-- Image Area -->
    <div class="h-[200px] bg-surface2 flex items-center justify-center relative overflow-hidden cursor-pointer after:content-[''] after:absolute after:inset-0 after:bg-transparent after:transition-[0.3s] group-hover:after:bg-black/5">
      <img v-if="product.image" :src="product.image" class="w-full h-full object-contain p-3 bg-white transition-transform duration-500 group-hover:scale-105" :alt="product.name" />
      <span v-else class="text-[80px]">{{ product.icon }}</span>
      <!-- Badges -->
      <div class="absolute top-[10px] left-[10px] flex flex-col gap-[5px] z-[2]">
        <span
          v-for="badge in product.badges"
          :key="badge.label"
          :class="['inline-block text-[9px] font-medium tracking-[1.5px] uppercase py-[3px] px-2 rounded-sm text-white', badge.color]"
        >{{ badge.label }}</span>
      </div>
      <!-- Wish Button -->
      <button
        :class="['prod-wish absolute top-[10px] right-[10px] w-8 h-8 bg-bg border border-border rounded-full flex items-center justify-center text-base text-text-muted z-[3] transition-all duration-300 cursor-pointer hover:bg-accent hover:border-accent hover:text-white active:scale-90', { active: wished }]"
        @click.stop="toggleWish"
      ><i class="ti ti-heart"></i></button>
      <!-- Add to Cart hover button -->
      <button
        class="absolute -bottom-12 left-0 right-0 bg-white/95 backdrop-blur-md border-none border-t border-border text-accent text-xl p-3.5 transition-all duration-300 ease-out z-[2] group-hover:bottom-0 hover:bg-accent hover:text-white active:bg-accent-hover flex items-center justify-center"
        @click.stop="doAddToCart"
      ><i class="ti ti-shopping-cart-plus"></i></button>
    </div>

    <!-- Info -->
    <div class="p-[14px]">
      <div class="text-[10px] text-text-muted tracking-[1.5px] uppercase mb-[3px]">{{ product.brand }}</div>
      <div class="text-[14px] font-medium mb-[6px] whitespace-nowrap overflow-hidden text-ellipsis text-text">{{ product.name }}</div>
      <div class="flex items-baseline gap-2 mb-2">
        <span class="font-display text-[20px] text-accent tracking-[0.5px]">{{ product.price }}</span>
        <span v-if="product.oldPrice" class="text-[12px] text-text-dim line-through">{{ product.oldPrice }}</span>
      </div>
      <div class="flex items-center gap-1 text-[12px] text-gold mb-[10px]">
        {{ product.rating }} <span class="text-text-muted text-[11px]">({{ product.reviews }})</span>
      </div>
      <!-- Sold bar (optional) -->
      <div v-if="product.soldCount !== undefined && product.total" class="mb-3">
        <div class="flex justify-between text-[10px] text-text-muted mb-1">
          <span>Đã bán</span>
          <span class="font-medium">{{ product.soldCount }}<span class="text-text-dim">/{{ product.total }}</span></span>
        </div>
        <div class="h-[3px] bg-surface3 rounded-sm overflow-hidden">
          <div class="h-full bg-accent rounded-sm transition-[width] duration-[0.6s] ease"
            :style="{ width: Math.round(product.soldCount / product.total * 100) + '%' }"
          ></div>
        </div>
      </div>
      <!-- Buttons -->
      <div class="flex gap-2">
        <button
          :class="['w-11 h-11 border text-lg rounded-xl transition-all duration-300 flex items-center justify-center active:scale-90 shadow-sm hover:shadow-md', addedToCart ? 'bg-[#4CAF50] text-white border-[#4CAF50]' : 'bg-surface2 text-text border-border hover:border-accent hover:text-accent hover:bg-bg']"
          @click="doAddToCart"
          :title="addedToCart ? 'Đã thêm' : 'Thêm vào giỏ'"
        >
          <i :class="[addedToCart ? 'ti ti-check' : 'ti ti-shopping-cart']"></i>
        </button>
        <button class="flex-1 bg-accent text-white border-none h-11 text-[11px] tracking-[1.5px] font-semibold uppercase rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.2)] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] active:scale-95">Mua ngay</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: { type: Object, required: true }
})
const emit = defineEmits(['add-to-cart', 'toggle-wish'])

const wished = ref(false)
const addedToCart = ref(false)
let cartTimer = null

function toggleWish() {
  wished.value = !wished.value
  emit('toggle-wish', { product: props.product, wished: wished.value })
}

function doAddToCart() {
  addedToCart.value = true
  emit('add-to-cart', props.product)
  clearTimeout(cartTimer)
  cartTimer = setTimeout(() => { addedToCart.value = false }, 2000)
}
</script>

<style scoped>
.prod-wish.active {
  background-color: #FF4D00 !important;
  border-color: #FF4D00 !important;
  color: white !important;
}
</style>
