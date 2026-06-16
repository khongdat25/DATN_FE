<template>
  <!-- Reusable Product Card -->
  <div @click="emit('click')" class="group prod-card bg-bg border border-border rounded-md overflow-hidden transition-all relative hover:border-border-light hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,.08)] cursor-pointer">
    <!-- Image Area -->
    <div class="h-[200px] bg-surface2 flex items-center justify-center relative overflow-hidden cursor-pointer after:content-[''] after:absolute after:inset-0 after:bg-transparent after:transition-[0.3s] group-hover:after:bg-black/5">
      <img v-if="product.image" :src="product.image" class="w-full h-full object-contain p-3 bg-white transition-transform duration-500 group-hover:scale-105" :alt="product.name" />
      <span v-else class="text-[80px]">{{ product.icon }}</span>
      <!-- Badges -->
      <div class="absolute top-[10px] left-[10px] flex flex-col gap-[5px] z-2">
        <span
          v-for="badge in product.badges"
          :key="badge.label"
          :class="['inline-block text-[9px] font-medium tracking-[1.5px] uppercase py-[3px] px-2 rounded-sm text-white', badge.color]"
        >{{ badge.label }}</span>
      </div>
      <!-- Wish Button -->
      <button
        :class="['prod-wish absolute top-[10px] right-[10px] w-8 h-8 bg-bg border border-border rounded-full flex items-center justify-center text-base text-text-muted z-3 transition-all duration-300 cursor-pointer hover:bg-accent hover:border-accent hover:text-white active:scale-90', { active: wished }]"
        @click.stop="toggleWish"
      ><i class="ti ti-heart"></i></button>
      <!-- Add to Cart hover button -->
      <button
        class="absolute -bottom-12 left-0 right-0 bg-white/95 backdrop-blur-md border-none border-t border-border text-accent text-xl p-3.5 transition-all duration-300 ease-out z-2 group-hover:bottom-0 hover:bg-accent hover:text-white active:bg-accent-hover flex items-center justify-center"
        @click.stop="openModal('add')"
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

      <!-- Buttons -->
      <div class="flex gap-2">
        <button @click.stop="openModal('buy')" class="flex-1 bg-accent text-white border-none h-11 text-[11px] tracking-[1.5px] font-semibold uppercase rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.2)] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] active:scale-95">Mua ngay</button>
      </div>
    </div>
  </div>

  <!-- Teleport Option Modal to Body -->
  <teleport to="body">
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click="closeModal">
        <!-- Modal Container -->
        <div class="bg-white rounded-3xl w-full max-w-[550px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-border flex flex-col md:flex-row relative animate-scale-up" @click.stop>
          <!-- Close Button -->
          <button @click="closeModal" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface2 hover:bg-accent hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10">
            <i class="ti ti-x text-sm"></i>
          </button>
          
          <!-- Product Left: Image -->
          <div class="w-full md:w-[45%] bg-surface2 p-6 flex items-center justify-center border-r border-border min-h-[220px]">
            <img :src="product.image" class="max-h-[180px] max-w-full object-contain mix-blend-multiply" :alt="product.name" />
          </div>

          <!-- Product Right: Detail & Options -->
          <div class="w-full md:w-[55%] p-6 flex flex-col justify-between">
            <div>
              <span class="text-[10px] text-accent tracking-[1.5px] uppercase font-bold block mb-1">{{ product.brand }}</span>
              <h3 class="text-[16px] font-bold text-text mb-2 line-clamp-2 leading-snug">{{ product.name }}</h3>
              <div class="text-[20px] font-display font-extrabold text-accent mb-4">{{ product.price }}</div>

              <!-- Colors -->
              <div v-if="product.colors && product.colors.length > 0" class="mb-4">
                <p class="text-[12px] font-bold text-text-muted mb-2">Màu sắc: <span class="text-text font-semibold">{{ selectedColor }}</span></p>
                <div class="flex gap-2 flex-wrap">
                  <div 
                    v-for="color in product.colors" 
                    :key="color.name"
                    @click="selectedColor = color.name"
                    :class="['w-8 h-8 rounded-full border-2 cursor-pointer p-[2px] transition-all', selectedColor === color.name ? 'border-text scale-105' : 'border-transparent']"
                    :title="color.name"
                  >
                    <div class="w-full h-full rounded-full border border-black/10" :style="{ background: color.bg }"></div>
                  </div>
                </div>
              </div>

              <!-- Sizes -->
              <div v-if="product.sizes && product.sizes.length > 0" class="mb-4">
                <p class="text-[12px] font-bold text-text-muted mb-2">Kích thước: <span class="text-text font-semibold">{{ selectedSize }}</span></p>
                <div class="flex gap-1.5 flex-wrap">
                  <button 
                    v-for="size in product.sizes" 
                    :key="size"
                    @click="selectedSize = size"
                    :class="['h-8 min-w-[36px] px-2 font-bold text-xs rounded-lg border flex items-center justify-center transition-all cursor-pointer active:scale-95', selectedSize === size ? 'bg-text text-white border-text' : 'bg-white border-border text-text-muted hover:border-text hover:text-text']"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Quantity -->
              <div class="mb-6">
                <p class="text-[12px] font-bold text-text-muted mb-2">Số lượng</p>
                <div class="flex items-center border border-border rounded-xl bg-surface2 h-10 w-28 overflow-hidden">
                  <button @click="qty = Math.max(1, qty - 1)" class="w-8 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                    <i class="ti ti-minus text-xs"></i>
                  </button>
                  <span class="flex-1 text-center font-bold text-sm text-text select-none">{{ qty }}</span>
                  <button @click="qty = Math.min(10, qty + 1)" class="w-8 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                    <i class="ti ti-plus text-xs"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Confirm Button -->
            <button 
              @click="confirmAction" 
              class="w-full bg-accent text-white h-11 text-xs font-display font-bold tracking-[1.5px] uppercase rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.2)] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] active:scale-98 cursor-pointer"
            >
              {{ modalAction === 'buy' ? 'Mua ngay' : 'Thêm vào giỏ' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  product: { type: Object, required: true },
  showCartButton: { type: Boolean, default: true }
})
const emit = defineEmits(['add-to-cart', 'toggle-wish', 'click'])

const wished = ref(false)

const showModal = ref(false)
const modalAction = ref('add') // 'add' or 'buy'
const selectedColor = ref('')
const selectedSize = ref('')
const qty = ref(1)

function toggleWish() {
  wished.value = !wished.value
  emit('toggle-wish', { product: props.product, wished: wished.value })
}

function openModal(action) {
  modalAction.value = action
  // Set default selection
  if (props.product.colors && props.product.colors.length > 0) {
    selectedColor.value = props.product.colors[0].name
  } else {
    selectedColor.value = ''
  }
  if (props.product.sizes && props.product.sizes.length > 0) {
    selectedSize.value = props.product.sizes[0]
  } else {
    selectedSize.value = ''
  }
  qty.value = 1
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function confirmAction() {
  if (!selectedSize.value && props.product.sizes && props.product.sizes.length > 0) {
    return
  }

  const payload = {
    ...props.product,
    name: selectedColor.value 
      ? `${props.product.name} - Màu ${selectedColor.value} - Size ${selectedSize.value}`
      : `${props.product.name} - Size ${selectedSize.value}`,
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
    qty: qty.value
  }

  emit('add-to-cart', payload)
  closeModal()

  if (modalAction.value === 'buy') {
    router.push('/cart')
  }
}
</script>

<style scoped>
.prod-wish.active {
  background-color: #FF4D00 !important;
  border-color: #FF4D00 !important;
  color: white !important;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scale Up Animation */
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes scaleUp {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
