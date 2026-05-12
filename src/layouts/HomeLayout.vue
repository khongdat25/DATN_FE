<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <ToastNotification ref="toastRef" />
    <ChatBot />
    <!-- Scroll to top button -->
    <button
      :class="['scroll-top fixed bottom-[100px] right-[28px] w-10 h-10 bg-bg border border-border rounded-sm flex items-center justify-center text-lg text-text-muted transition-all duration-200 z-[200] cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:bg-accent hover:border-accent hover:text-white', { visible: showScrollTop }]"
      @click="window.scrollTo({top:0, behavior:'smooth'})"
    >
      <i class="ti ti-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'
import AppHeader from '../components/home/AppHeader.vue'
import AppFooter from '../components/home/AppFooter.vue'
import ToastNotification from '../components/home/ToastNotification.vue'
import ChatBot from '../components/home/ChatBot.vue'

const toastRef = ref(null)
const showScrollTop = ref(false)
const cartCount = ref(3)

// Provide cart count and toast to child components
provide('cartCount', cartCount)
provide('showToast', (msg) => toastRef.value?.show(msg))
provide('addToCart', (product) => {
  cartCount.value++
  toastRef.value?.show(`Đã thêm "${product.name?.substring(0, 30) || 'Sản phẩm'}" vào giỏ!`)
})

function onScroll() {
  showScrollTop.value = window.scrollY > 400
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.scroll-top.visible {
  opacity: 1 !important;
  pointer-events: auto !important;
}
.scroll-top {
  opacity: 0;
  pointer-events: none;
}
</style>
