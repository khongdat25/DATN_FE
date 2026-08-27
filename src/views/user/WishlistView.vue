<template>
  <div class="py-8 bg-surface2/30 min-h-[80vh]">
    <div class="max-w-[1200px] mx-auto px-5">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs text-text-muted mb-6">
        <router-link to="/" class="hover:text-accent font-medium">Trang chủ</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <span class="text-text font-bold">Danh sách yêu thích</span>
      </nav>

      <!-- Page Title Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-border/80 shadow-2xs">
        <div class="text-left">
          <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-text tracking-tight flex items-center gap-2">
            <span>Danh sách yêu thích</span>
            <span class="text-accent">❤️</span>
          </h1>
          <p class="text-xs sm:text-sm text-text-muted mt-1 font-medium">
            Lưu trữ các sản phẩm bạn quan tâm để dễ dàng xem lại và đặt mua bất cứ lúc nào.
          </p>
        </div>
        
        <div v-if="wishlistProducts.length > 0" class="flex items-center gap-3">
          <button 
            @click="clearAllWishlist" 
            class="px-4 py-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-red-100 flex items-center gap-1.5 active:scale-95 shadow-2xs"
          >
            <i class="ti ti-trash text-sm"></i> Xóa tất cả
          </button>
          <router-link 
            to="/products" 
            class="px-4 py-2.5 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-accent/20 flex items-center gap-1.5 active:scale-95 shadow-2xs"
          >
            <i class="ti ti-plus text-sm"></i> Tiếp tục xem sản phẩm
          </router-link>
        </div>
      </div>

      <!-- Wishlist Product Grid -->
      <div v-if="wishlistProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="prod in wishlistProducts" 
          :key="prod.id" 
          class="bg-white border border-border/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col relative"
        >
          <!-- Delete button overlay -->
          <button 
            @click.stop="removeFromWishlist(prod.id)" 
            class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-border text-text-muted hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90"
            title="Bỏ khỏi yêu thích"
          >
            <i class="ti ti-x text-sm font-bold"></i>
          </button>

          <!-- Image preview -->
          <div 
            @click="goToDetail(prod)" 
            class="h-56 bg-white p-4 flex items-center justify-center relative cursor-pointer overflow-hidden border-b border-border/50 group-hover:bg-slate-50/50 transition-colors"
          >
            <img 
              :src="getImageUrl(prod.image)" 
              :alt="prod.name" 
              class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <!-- Product Details -->
          <div class="p-5 flex-1 flex flex-col justify-between text-left">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-accent/5 px-2 py-0.5 rounded-md mb-2 inline-block">
                {{ prod.brand || 'SaigonShoes' }}
              </span>
              <h3 
                @click="goToDetail(prod)" 
                class="font-bold text-sm text-text line-clamp-2 hover:text-accent transition-colors cursor-pointer leading-snug mb-2"
                :title="prod.name"
              >
                {{ prod.name }}
              </h3>
              
              <div class="flex items-baseline gap-2 mb-3">
                <span class="font-display font-extrabold text-lg text-accent tracking-tight">{{ prod.price }}</span>
                <span v-if="prod.oldPrice" class="text-xs text-text-dim line-through font-medium">{{ prod.oldPrice }}</span>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="pt-3 border-t border-border/60 flex items-center gap-2">
              <button 
                @click="goToDetail(prod)" 
                class="flex-1 py-2.5 px-3 bg-accent text-white hover:bg-accent-hover rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 text-center cursor-pointer border-none flex items-center justify-center gap-1.5"
              >
                <i class="ti ti-shopping-cart text-sm"></i> Xem & Đặt mua
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white border border-border/80 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs my-8">
        <div class="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent text-4xl mx-auto mb-4 animate-bounce">
          <i class="ti ti-heart-off"></i>
        </div>
        <h3 class="font-display text-xl font-bold text-text mb-2">Danh sách yêu thích đang trống</h3>
        <p class="text-xs text-text-muted leading-relaxed mb-6 font-medium">
          Bạn chưa lưu sản phẩm nào. Hãy khám phá hàng ngàn đôi giày thể thao cá tính và bấm biểu tượng ❤️ để lưu lại nhé!
        </p>
        <router-link 
          to="/products" 
          class="inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-accent-hover font-display font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-md transition-all active:scale-95"
        >
          <i class="ti ti-shopping-bag text-base"></i> Khám phá sản phẩm ngay
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { allProducts, mapBackendProduct } from '@/data/products.js'
import axiosInstance from '@/api/axios.js'
import Swal from 'sweetalert2'

const router = useRouter()
const showToast = inject('showToast', () => {})
const wishlistProducts = ref([])

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/p1.png'
  if (typeof imagePath === 'string' && imagePath.includes('postimg.cc/') && !imagePath.includes('i.postimg.cc/')) {
    imagePath = imagePath.replace('postimg.cc/', 'i.postimg.cc/')
  }
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath
  }
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (imagePath.startsWith('images/')) {
    return `${serverUrl}/${imagePath}`
  }
  return `${serverUrl}/images/${imagePath}`
}

async function loadWishlist() {
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      const res = await axiosInstance.get('/wishlist')
      if (res && res.success && Array.isArray(res.data)) {
        const backendMapped = res.data.map(mapBackendProduct).filter(Boolean)
        wishlistProducts.value = backendMapped
        const ids = backendMapped.map(p => p.id)
        localStorage.setItem('saigon_wishlist', JSON.stringify(ids))
        window.dispatchEvent(new Event('wishlist-updated'))
        return
      }
    } catch (err) {
      console.error('Failed to load wishlist from server:', err)
    }
  }

  const savedIdsStr = localStorage.getItem('saigon_wishlist')
  let ids = []
  if (savedIdsStr) {
    try {
      ids = JSON.parse(savedIdsStr)
    } catch (e) {
      ids = []
    }
  }

  if (!Array.isArray(ids) || ids.length === 0) {
    wishlistProducts.value = []
    return
  }

  try {
    const res = await axiosInstance.get('/products')
    if (res && res.success && Array.isArray(res.data)) {
      const backendMapped = res.data.map(mapBackendProduct).filter(Boolean)
      wishlistProducts.value = backendMapped.filter(p => ids.includes(Number(p.id)) || ids.includes(String(p.id)))
    } else {
      wishlistProducts.value = allProducts.filter(p => ids.includes(p.id))
    }
  } catch (err) {
    wishlistProducts.value = allProducts.filter(p => ids.includes(p.id))
  }
}

async function removeFromWishlist(id) {
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      await axiosInstance.delete(`/wishlist/${id}`)
    } catch (e) {
      console.error('Failed to delete wishlist item on server:', e)
    }
  }

  const savedIdsStr = localStorage.getItem('saigon_wishlist')
  let ids = []
  if (savedIdsStr) {
    try { ids = JSON.parse(savedIdsStr) } catch (e) {}
  }
  ids = ids.filter(item => Number(item) !== Number(id) && String(item) !== String(id))
  localStorage.setItem('saigon_wishlist', JSON.stringify(ids))
  window.dispatchEvent(new Event('wishlist-updated'))
  wishlistProducts.value = wishlistProducts.value.filter(p => Number(p.id) !== Number(id))
  showToast('Đã xóa sản phẩm khỏi danh sách yêu thích')
}

function clearAllWishlist() {
  Swal.fire({
    title: 'Xóa toàn bộ danh sách yêu thích?',
    text: 'Bạn có chắc chắn muốn làm trống danh sách các sản phẩm đã lưu?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          await axiosInstance.delete('/wishlist/clear')
        } catch (e) {
          console.error('Failed to clear wishlist on server:', e)
        }
      }

      localStorage.setItem('saigon_wishlist', JSON.stringify([]))
      window.dispatchEvent(new Event('wishlist-updated'))
      wishlistProducts.value = []
      showToast('Đã xóa tất cả sản phẩm khỏi danh sách yêu thích')
    }
  })
}

function goToDetail(product) {
  if (product.slug) {
    router.push(`/product/${product.slug}`)
  } else {
    router.push(`/product/${product.id}`)
  }
}

onMounted(() => {
  loadWishlist()
})
</script>
