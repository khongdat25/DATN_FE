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
          <!-- Large Featured Card Skeleton -->
          <div v-if="isLoading" class="bg-white border border-border rounded-xl overflow-hidden p-6 animate-pulse flex flex-col gap-4 shadow-sm">
            <div class="bg-surface2 rounded-xl h-[280px] max-lg:h-[220px] w-full"></div>
            <div class="h-3 bg-surface2 rounded w-1/4"></div>
            <div class="h-6 bg-surface2 rounded w-3/4"></div>
            <div class="h-5 bg-surface2 rounded w-1/2"></div>
            <div class="flex gap-2 mt-4">
              <div class="h-10 bg-surface2 rounded flex-1"></div>
              <div class="h-10 bg-surface2 rounded flex-1"></div>
            </div>
          </div>

          <!-- Large Featured Card -->
          <div v-else class="bg-bg rounded-xl overflow-hidden relative cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,.05)]" @click="goToDetail(featured)">
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
                <button class="flex-1 bg-surface2 text-text border border-border p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-all flex items-center justify-center gap-[6px] hover:border-accent hover:text-accent hover:bg-bg active:scale-95 cursor-pointer font-bold" @click.stop="openModal(featured, 'add')">
                  <i class="ti ti-shopping-cart"></i> Thêm vào giỏ
                </button>
                <button class="flex-1 bg-accent text-white border-none p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-colors hover:bg-accent-hover font-bold cursor-pointer" @click.stop="openModal(featured, 'buy')">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>

          <!-- Small Card List Skeleton -->
          <div v-if="isLoading" class="flex flex-col gap-4">
            <div v-for="i in 3" :key="i" class="bg-white border border-border rounded-xl p-4 flex gap-4 animate-pulse shadow-sm h-[135px]">
              <div class="bg-surface2 rounded-lg w-[110px] h-full shrink-0"></div>
              <div class="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div class="h-3 bg-surface2 rounded w-1/4 mb-2"></div>
                  <div class="h-4 bg-surface2 rounded w-3/4"></div>
                </div>
                <div class="h-4 bg-surface2 rounded w-1/3"></div>
              </div>
            </div>
          </div>

          <!-- Small Card List -->
          <div v-else class="flex flex-col gap-4">
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
                  <button class="flex-1 bg-surface2 text-text border border-border p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-all flex items-center justify-center gap-[6px] hover:border-accent hover:text-accent hover:bg-bg cursor-pointer font-bold" @click.stop="openModal(item, 'add')">
                    <i class="ti ti-shopping-cart"></i> Giỏ hàng
                  </button>
                  <button class="flex-1 bg-accent text-white border-none p-[9px] text-[11px] tracking-[1px] uppercase rounded-sm transition-colors hover:bg-accent-hover font-bold cursor-pointer" @click.stop="openModal(item, 'buy')">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
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
              <img :src="modalProduct?.image" class="max-h-[180px] max-w-full object-contain mix-blend-multiply" :alt="modalProduct?.name" />
            </div>

            <!-- Product Right: Detail & Options -->
            <div class="w-full md:w-[55%] p-6 flex flex-col justify-between">
              <div>
                <span class="text-[10px] text-accent tracking-[1.5px] uppercase font-bold block mb-1">{{ modalProduct?.brand }}</span>
                <h3 class="text-[16px] font-bold text-text mb-2 line-clamp-2 leading-snug">{{ modalProduct?.name }}</h3>
                <div class="text-[20px] font-display font-extrabold text-accent mb-4">{{ modalProduct?.price }}</div>

                <!-- Colors -->
                <div v-if="modalProduct?.colors && modalProduct.colors.length > 0" class="mb-4">
                  <p class="text-[12px] font-bold text-text-muted mb-2">Màu sắc: <span class="text-text font-semibold">{{ modalSelectedColor }}</span></p>
                  <div class="flex gap-2 flex-wrap">
                    <div 
                      v-for="color in modalProduct.colors" 
                      :key="color.name"
                      @click="modalSelectedColor = color.name"
                      :class="['w-8 h-8 rounded-full border-2 cursor-pointer p-[2px] transition-all', modalSelectedColor === color.name ? 'border-text scale-105' : 'border-transparent']"
                      :title="color.name"
                    >
                      <div class="w-full h-full rounded-full border border-black/10" :style="{ background: color.bg }"></div>
                    </div>
                  </div>
                </div>

                <!-- Sizes -->
                <div v-if="modalProduct?.sizes && modalProduct.sizes.length > 0" class="mb-4">
                  <p class="text-[12px] font-bold text-text-muted mb-2">Kích thước: <span class="text-text font-semibold">{{ modalSelectedSize }}</span></p>
                  <div class="flex gap-1.5 flex-wrap">
                    <button 
                      v-for="size in modalProduct.sizes" 
                      :key="size"
                      @click="modalSelectedSize = size"
                      :class="['h-8 min-w-[36px] px-2 font-bold text-xs rounded-lg border flex items-center justify-center transition-all cursor-pointer active:scale-95', modalSelectedSize === size ? 'bg-text text-white border-text' : 'bg-white border-border text-text-muted hover:border-text hover:text-text']"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <!-- Quantity -->
                <div class="mb-6">
                  <p class="text-[12px] font-bold text-text-muted mb-2">Số lượng</p>
                  <div class="flex items-center border border-border rounded-xl bg-surface2 h-10 w-28 overflow-hidden">
                    <button @click="modalQty = Math.max(1, modalQty - 1)" class="w-8 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                      <i class="ti ti-minus text-xs"></i>
                    </button>
                    <span class="flex-1 text-center font-bold text-sm text-text select-none">{{ modalQty }}</span>
                    <button @click="modalQty = Math.min(10, modalQty + 1)" class="w-8 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
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
  </section>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mapBackendProduct } from '../../data/products.js'
import axiosInstance from '../../api/axios.js'

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

const showModal = ref(false)
const modalAction = ref('add') // 'add' or 'buy'
const modalProduct = ref(null)
const modalSelectedColor = ref('')
const modalSelectedSize = ref('')
const modalQty = ref(1)

function openModal(product, action) {
  modalProduct.value = product
  modalAction.value = action
  
  // Set default selection
  if (product.colors && product.colors.length > 0) {
    modalSelectedColor.value = product.colors[0].name
  } else {
    modalSelectedColor.value = ''
  }
  
  if (product.id === featured.value.id) {
    modalSelectedSize.value = selectedSize.value
  } else if (product.sizes && product.sizes.length > 0) {
    modalSelectedSize.value = product.sizes[0]
  } else {
    modalSelectedSize.value = ''
  }
  modalQty.value = 1
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function confirmAction() {
  if (!modalSelectedSize.value && modalProduct.value.sizes && modalProduct.value.sizes.length > 0) {
    return
  }

  const payload = {
    ...modalProduct.value,
    name: modalSelectedColor.value 
      ? `${modalProduct.value.name} - Màu ${modalSelectedColor.value} - Size ${modalSelectedSize.value}`
      : `${modalProduct.value.name} - Size ${modalSelectedSize.value}`,
    selectedColor: modalSelectedColor.value,
    selectedSize: modalSelectedSize.value,
    qty: modalQty.value
  }

  addToCart(payload)
  closeModal()

  if (modalAction.value === 'buy') {
    router.push('/cart')
  }
}

function goToDetail(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

const featured = ref({
  id: 0,
  brand: 'SaigonShoes',
  name: 'Đang tải...',
  price: '0đ',
  image: '/images/placeholder.png',
  images: [{ src: '/images/placeholder.png', flip: false }],
  sizes: []
})

const smallProducts = ref([])
const isLoading = ref(true)

async function fetchHotProducts() {
  isLoading.value = true
  try {
    const response = await axiosInstance.get('/hotproducts')
    if (response.success && Array.isArray(response.data) && response.data.length > 0) {
      const mapped = response.data.map(mapBackendProduct)
      featured.value = mapped[0]
      smallProducts.value = mapped.slice(1, 4)
    }
  } catch (error) {
    console.error('Failed to load hot products:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchHotProducts()
})
</script>

<style scoped>
.size-chip.active {
  border-color: var(--color-accent, #FF4D00) !important;
  color: var(--color-accent, #FF4D00) !important;
  background-color: rgba(255, 77, 0, 0.08) !important;
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
