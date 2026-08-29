<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <ToastNotification ref="toastRef" />
    <ChatBot />
    <ZaloButton />
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
import { ref, onMounted, onUnmounted, provide, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import AppHeader from './Header.vue'
import AppFooter from './Footer.vue'
import ToastNotification from '../components/layout/ToastNotification.vue'
import ChatBot from '../components/layout/ChatBot.vue'
import ZaloButton from '../components/layout/ZaloButton.vue'
import axiosInstance from '../api/axios.js'

const router = useRouter()
const route = useRoute()
const toastRef = ref(null)
const showScrollTop = ref(false)
const cartCount = ref(0)

// Provide cart count and toast to child components
provide('cartCount', cartCount)
provide('showToast', (msg) => toastRef.value?.show(msg))
provide('addToCart', async (product) => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    Swal.fire({
      title: 'Yêu cầu đăng nhập',
      text: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng nhập ngay',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#FF4D00',
      cancelButtonColor: '#aaa'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({ name: 'login' })
      }
    })
    return false
  }

  if (product.variant_id !== undefined && product.variant_id !== null && product.variant_id !== '') {
    try {
      await axiosInstance.post('/cart', {
        variant_id: product.variant_id,
        quantity: product.qty || 1
      })
      // Increment locally to avoid extra API request
      cartCount.value += product.qty || 1
      toastRef.value?.show(`Đã thêm "${product.name?.substring(0, 30) || 'Sản phẩm'}" vào giỏ!`)
      return true
    } catch (e) {
      console.error('Failed to sync item to database cart:', e)
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: e.response?.data?.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại.',
        confirmButtonColor: '#FF4D00'
      })
      return false
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Không tìm thấy thông tin phân loại sản phẩm. Vui lòng chọn size/màu sắc đầy đủ.',
      confirmButtonColor: '#FF4D00'
    })
    return false
  }
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  showScrollTop.value = window.scrollY > 400
}

async function initCartCount() {
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      const response = await axiosInstance.get('/cart')
      if (response && response.data) {
        cartCount.value = response.data.reduce((acc, item) => acc + (item.quantity || 0), 0)
      } else {
        cartCount.value = 0
      }
    } catch (e) {
      console.error('Failed to fetch cart count:', e)
      cartCount.value = 0
    }
  } else {
    cartCount.value = 0
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
