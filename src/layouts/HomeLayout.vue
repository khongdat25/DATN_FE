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
      :class="['scroll-top fixed bottom-[100px] right-[28px] w-10 h-10 bg-bg border border-border rounded-sm flex items-center justify-center text-lg text-text-muted transition-all duration-200 z-200 cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:bg-accent hover:border-accent hover:text-white', { visible: showScrollTop }]"
      @click="scrollToTop"
    >
      <i class="ti ti-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import ToastNotification from '../components/layout/ToastNotification.vue'
import ChatBot from '../components/layout/ChatBot.vue'
import axiosInstance from '../api/axios.js'

const toastRef = ref(null)
const showScrollTop = ref(false)
const cartCount = ref(0)

// Provide cart count and toast to child components
provide('cartCount', cartCount)
provide('showToast', (msg) => toastRef.value?.show(msg))
provide('addToCart', async (product) => {
  const token = localStorage.getItem('access_token')
  if (token && product.variant_id) {
    try {
      await axiosInstance.post('/cart', {
        variant_id: product.variant_id,
        quantity: product.qty || 1
      })
    } catch (e) {
      console.error('Failed to sync item to database cart:', e)
    }
  }

  // Always update localStorage cart as backup/guest mode
  const local = localStorage.getItem('saigon_cart')
  let items = []
  if (local) {
    try {
      items = JSON.parse(local)
    } catch {
      items = []
    }
  }

  const existIndex = items.findIndex(i => {
    if (product.variant_id && i.variant_id) {
      return i.variant_id === product.variant_id
    }
    return i.productId === product.id && i.variant === product.variant_name
  })

  if (existIndex > -1) {
    items[existIndex].qty += product.qty || 1
  } else {
    items.push({
      id: product.variant_id || product.id,
      variant_id: product.variant_id || null,
      productId: product.id,
      name: product.name,
      variant: product.variant_name || '',
      price: product.price || 0,
      qty: product.qty || 1,
      image: product.image
    })
  }
  
  localStorage.setItem('saigon_cart', JSON.stringify(items))
  cartCount.value = items.reduce((acc, item) => acc + item.qty, 0)
  toastRef.value?.show(`Đã thêm "${product.name?.substring(0, 30) || 'Sản phẩm'}" vào giỏ!`)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  showScrollTop.value = window.scrollY > 400
}

function initCartCount() {
  const local = localStorage.getItem('saigon_cart')
  if (local) {
    try {
      const items = JSON.parse(local)
      cartCount.value = items.reduce((acc, item) => acc + item.qty, 0)
    } catch {
      cartCount.value = 0
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  initCartCount()
})
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
