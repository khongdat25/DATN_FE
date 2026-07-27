<template>
  <div
    @click="emit('click')"
    class="group prod-card bg-bg border border-border rounded-md overflow-hidden transition-all relative hover:border-border-light hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,.08)] cursor-pointer"
  >
    <div class="h-50 bg-white flex items-center justify-center relative overflow-hidden cursor-pointer after:content-[''] after:absolute after:inset-0 after:bg-transparent after:transition-[0.3s] group-hover:after:bg-black/5">
      <img
        v-if="product.image"
        :src="product.image"
        class="w-full h-full object-contain p-3 bg-white transition-transform duration-500 group-hover:scale-105"
        :alt="product.name"
      />
      <span v-else class="text-[80px]">{{ product.icon }}</span>

      <div class="absolute top-2.5 left-2.5 flex flex-col gap-1.25 z-2">
        <span
          v-for="badge in product.badges"
          :key="badge.label"
          :class="['inline-block text-[9px] font-medium tracking-[1.5px] uppercase py-0.75 px-2 rounded-sm text-white', badge.color]"
        >
          {{ badge.label }}
        </span>
      </div>

      <button
        :class="['prod-wish absolute top-2.5 right-2.5 w-8 h-8 bg-bg border border-border rounded-full flex items-center justify-center text-base text-text-muted z-3 transition-all duration-300 cursor-pointer hover:bg-accent hover:border-accent hover:text-white active:scale-90', { active: wished }]"
        @click.stop="toggleWish"
      >
        <i class="ti ti-heart"></i>
      </button>
    </div>

    <div class="p-3.5">
      <div class="text-[10px] text-text-muted tracking-[1.5px] uppercase mb-0.75">{{ product.brand }}</div>
      <div class="text-[14px] font-medium mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis text-text">{{ product.name }}</div>
      <div class="flex items-baseline gap-2 mb-2">
        <span class="font-display text-[20px] text-accent tracking-[0.5px]">{{ product.price }}</span>
        <span v-if="product.oldPrice" class="text-[12px] text-text-dim line-through">{{ product.oldPrice }}</span>
      </div>
      <div class="flex items-center gap-1 text-[12px] text-gold">
        {{ product.rating }} <span class="text-text-muted text-[11px]">({{ product.reviews }})</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: { type: Object, required: true },
  showCartButton: { type: Boolean, default: false }
})
const emit = defineEmits(['toggle-wish', 'click'])

const wished = ref(false)

function toggleWish() {
  wished.value = !wished.value
  emit('toggle-wish', { product: props.product, wished: wished.value })
}
</script>

<style scoped>
.prod-wish.active {
  background-color: #FF4D00 !important;
  border-color: #FF4D00 !important;
  color: white !important;
}
</style>
