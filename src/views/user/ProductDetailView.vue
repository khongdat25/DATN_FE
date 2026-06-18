<template>
  <HomeLayout>
    <div class="bg-bg py-4 border-b border-border">
      <div class="max-w-[1200px] mx-auto px-5 flex items-center gap-2 text-[12px] text-text-muted">
        <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <router-link to="/products" class="hover:text-accent transition-colors">Sản phẩm</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <span class="text-text font-semibold">{{ product.name }}</span>
      </div>
    </div>

    <main class="py-12 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5">

        <!-- Skeleton Loading -->
        <div v-if="isLoading" class="animate-pulse">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16">
            <div class="flex flex-col gap-6">
              <div class="bg-surface2 rounded-2xl h-[460px] w-full"></div>
              <div class="grid grid-cols-4 gap-4">
                <div v-for="i in 4" :key="i" class="bg-surface2 rounded-2xl h-24"></div>
              </div>
            </div>
            <div class="flex flex-col gap-5 pt-4">
              <div class="h-3 bg-surface2 rounded w-1/4"></div>
              <div class="h-9 bg-surface2 rounded w-3/4"></div>
              <div class="h-4 bg-surface2 rounded w-1/3"></div>
              <div class="h-px bg-border w-full my-2"></div>
              <div class="h-10 bg-surface2 rounded w-1/2"></div>
              <div class="flex gap-3 mt-2">
                <div v-for="i in 3" :key="i" class="h-11 w-11 rounded-full bg-surface2"></div>
              </div>
              <div class="flex gap-2 flex-wrap mt-2">
                <div v-for="i in 6" :key="i" class="h-11 w-14 bg-surface2 rounded-xl"></div>
              </div>
              <div class="flex gap-3 mt-4">
                <div class="h-14 bg-surface2 rounded-xl flex-1"></div>
                <div class="h-14 w-14 bg-surface2 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Detail Section -->
        <section v-else class="pb-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <!-- Left: Gallery & Offers -->
            <div class="flex flex-col gap-6">
              
              <!-- Gallery -->
              <div class="border border-border rounded-2xl bg-surface2 p-8 flex items-center justify-center h-[460px] relative overflow-hidden group shadow-sm">
                <span v-if="product.isNew" class="absolute top-5 left-5 bg-accent text-white py-1 px-4 text-xs font-bold uppercase rounded-full tracking-wider shadow-sm z-10">
                  New Release
                </span>
                <img 
                  :src="activeImage" 
                  :class="['max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105', activeImageFlip ? 'scale-x-[-1]' : '']" 
                  :alt="product.name"
                >
              </div>

              <!-- Thumbs List -->
              <div class="grid grid-cols-4 gap-4">
                <div 
                  v-for="(img, idx) in product.images" 
                  :key="idx"
                  @click="setActiveImage(img.src, img.flip)"
                  :class="['border-2 rounded-2xl p-3 cursor-pointer h-24 flex items-center justify-center transition-all bg-white hover:border-accent hover:bg-white', activeImage === img.src && activeImageFlip === img.flip ? 'border-accent shadow-sm' : 'border-transparent']"
                >
                  <img :src="img.src" :class="['max-h-full object-contain', img.flip ? 'scale-x-[-1]' : '']" :alt="'Thumb ' + (idx + 1)">
                </div>
              </div>

              <!-- Special Offers Box -->
              <div class="mt-6 border border-border rounded-2xl bg-white shadow-sm">
                <div class="px-5 py-4 border-b border-border flex items-center justify-between bg-surface2/50 rounded-t-2xl">
                  <div class="flex items-center gap-2">
                    <i class="ti ti-ticket text-accent text-lg"></i>
                    <span class="text-[13px] font-bold uppercase tracking-wider text-text">Ưu đãi dành cho bạn</span>
                  </div>
                  <span class="text-[12px] text-accent font-semibold cursor-pointer hover:underline">Xem tất cả</span>
                </div>
                <div class="p-4 flex flex-col gap-3">
                  <div 
                    v-for="(voucher, idx) in vouchers" 
                    :key="idx" 
                    class="flex items-center justify-between p-3 border border-border rounded-xl relative overflow-hidden hover:border-accent/40 transition-colors"
                  >
                    <div class="absolute left-0 top-0 bottom-0 w-[4px] bg-accent"></div>
                    <div class="pl-3">
                      <div class="text-[13px] font-bold text-text mb-0.5">{{ voucher.title }}</div>
                      <div class="text-[12px] text-text-muted">{{ voucher.desc }}</div>
                    </div>
                    <button 
                      @click="saveVoucher(voucher)"
                      :disabled="voucher.saved"
                      :class="['text-[11px] font-bold border py-1.5 px-4 rounded-lg transition-all shrink-0 cursor-pointer', voucher.saved ? 'bg-[#4CAF50] border-[#4CAF50] text-white' : 'border-accent bg-accent/5 text-accent hover:bg-accent hover:text-white']"
                    >
                      {{ voucher.saved ? 'Đã lưu' : 'Lưu mã' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Product Info Box -->
            <div class="flex flex-col gap-6">
              <div>
                <span class="text-xs uppercase font-bold tracking-[2px] text-accent mb-2 block">{{ product.brand }}</span>
                <h1 class="font-display text-[clamp(28px,4vw,38px)] font-extrabold leading-tight text-text mb-3">{{ product.name }}</h1>
                
                <!-- Rating -->
                <div class="flex items-center gap-3 text-sm text-text-muted">
                  <div class="flex gap-0.5 text-gold text-base">
                    <i class="ti ti-star-filled"></i>
                    <i class="ti ti-star-filled"></i>
                    <i class="ti ti-star-filled"></i>
                    <i class="ti ti-star-filled"></i>
                    <i class="ti ti-star-half-filled"></i>
                  </div>
                  <span class="font-bold text-text">4.8</span>
                  <span class="text-text-dim">|</span>
                  <span class="underline cursor-pointer hover:text-accent" @click="activeTab = 'reviews'">{{ product.reviews }} đánh giá</span>
                </div>
              </div>

              <!-- Price Box -->
              <div class="flex items-center gap-4 py-6 border-y border-border">
                <span class="font-display text-3xl font-extrabold text-accent">{{ product.price }}</span>
                <span v-if="product.oldPrice" class="text-lg text-text-dim line-through">{{ product.oldPrice }}</span>
                <span v-if="product.discount" class="bg-accent/10 text-accent font-semibold py-1 px-3 rounded-lg text-xs">
                  -{{ product.discount }}
                </span>
              </div>

              <!-- Colors Selection -->
              <div>
                <p class="text-[13px] font-bold text-text mb-3">
                  Màu sắc: <span class="text-text-muted font-normal">{{ selectedColor }}</span>
                </p>
                <div class="flex gap-3">
                  <div 
                    v-for="color in product.colors" 
                    :key="color.name"
                    @click="selectedColor = color.name"
                    :class="['w-11 h-11 rounded-full border-2 cursor-pointer p-1 transition-all', selectedColor === color.name ? 'border-text scale-105' : 'border-transparent']"
                    :title="color.name"
                  >
                    <div class="w-full h-full rounded-full border border-black/10" :style="{ background: color.bg }"></div>
                  </div>
                </div>
              </div>

              <!-- Sizes Selection -->
              <div>
                <div class="flex items-center justify-between mb-3 text-[13px] font-bold text-text">
                  <p>Kích thước: <span class="text-text-muted font-normal">{{ selectedSize ? 'Size ' + selectedSize : 'Chưa chọn' }}</span></p>
                  <a href="#" class="text-accent underline font-semibold hover:text-accent-hover text-xs">Hướng dẫn chọn size</a>
                </div>
                <div class="grid grid-cols-5 gap-3">
                  <button 
                    v-for="size in product.sizes" 
                    :key="size"
                    @click="selectedSize = size"
                    :class="['h-11 font-bold text-sm rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95', selectedSize === size ? 'bg-text text-white border-text' : 'bg-white border-border text-text-muted hover:border-text hover:text-text']"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Quantity & Actions -->
              <div class="flex gap-4 items-center pt-4">
                <div class="flex items-center border border-border rounded-xl bg-white h-14 shrink-0 shadow-sm">
                  <button @click="decreaseQty" class="w-12 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                    <i class="ti ti-minus"></i>
                  </button>
                  <input type="number" v-model.number="qty" min="1" max="10" class="w-12 text-center font-bold text-base border-none outline-none select-none">
                  <button @click="increaseQty" class="w-12 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                    <i class="ti ti-plus"></i>
                  </button>
                </div>

                <button 
                  @click="doAddToCart" 
                  class="flex-1 bg-accent text-white h-14 font-display font-bold text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-accent-hover transition-all active:scale-[0.98] shadow-[0_8px_20px_rgba(255,77,0,0.15)] hover:shadow-[0_12px_25px_rgba(255,77,0,0.25)] cursor-pointer"
                >
                  <i class="ti ti-shopping-cart-plus text-lg"></i> Thêm vào giỏ hàng
                </button>

                <button 
                  @click="toggleWish"
                  :class="['w-14 h-14 border rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer active:scale-95 shadow-sm', wished ? 'border-accent bg-accent/5 text-accent' : 'border-border bg-white text-text-muted hover:border-accent hover:text-accent']"
                >
                  <i :class="[wished ? 'ti ti-heart-filled' : 'ti ti-heart']"></i>
                </button>
              </div>

              <!-- Features Box -->
              <div class="mt-4 p-5 bg-surface2 rounded-2xl border border-border/60 flex flex-col gap-4">
                <div class="flex items-center gap-4 text-xs font-semibold text-text">
                  <i class="ti ti-truck-delivery text-accent text-2xl"></i>
                  <span>Giao hàng miễn phí toàn quốc cho đơn từ 1.000.000₫</span>
                </div>
                <div class="flex items-center gap-4 text-xs font-semibold text-text">
                  <i class="ti ti-shield-check text-accent text-2xl"></i>
                  <span>Bảo hành chính hãng 12 tháng tại các chi nhánh</span>
                </div>
                <div class="flex items-center gap-4 text-xs font-semibold text-text">
                  <i class="ti ti-refresh text-accent text-2xl"></i>
                  <span>Đổi trả dễ dàng trong 30 ngày (còn nguyên tem mác)</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- Tabs Section (only when loaded) -->
        <section v-if="!isLoading" class="py-12 border-t border-border">
          <div class="flex justify-center border-b border-border mb-10 gap-10">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['font-display text-base font-bold pb-4 transition-all border-b-2 cursor-pointer', activeTab === tab.id ? 'border-accent text-accent' : 'border-transparent text-text-muted hover:text-text']"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Description Content -->
          <div v-show="activeTab === 'desc'" class="max-w-[800px] mx-auto text-[15px] text-text-muted leading-relaxed space-y-4">
            <p>Giày thể thao <strong>StepUp Air Max One</strong> là sự kết hợp hoàn hảo giữa phong cách cổ điển và công nghệ hiện đại. Với thiết kế đệm khí đặc trưng lộ ra ở phần gót, đôi giày không chỉ mang lại sự thoải mái tuyệt đối cho đôi chân mà còn là điểm nhấn thời trang cực chất cho mọi outfit của bạn.</p>
            <h3 class="text-[17px] font-bold text-text pt-4">Đặc điểm nổi bật:</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>Công nghệ đệm Air:</strong> Hấp thụ lực va đập tối đa, mang lại cảm giác êm ái khi di chuyển liên tục.</li>
              <li><strong>Chất liệu thoáng khí:</strong> Phần thân trên làm từ lưới (mesh) và da lộn nhân tạo cao cấp giúp giữ form giày tốt và đảm bảo đôi chân luôn khô thoáng.</li>
              <li><strong>Đế ngoài cao su bám đường:</strong> Thiết kế vân đế hình bánh quế (Waffle) đặc trưng tăng độ bám trên mọi bề mặt.</li>
              <li><strong>Thiết kế đa dụng:</strong> Phù hợp cho việc tập luyện nhẹ nhàng, đi bộ hàng ngày hoặc phối đồ streetwear cá tính.</li>
            </ul>
            <p class="pt-4">Màu sắc Cam Trắng (Orange/White) mang đến năng lượng tươi trẻ, nổi bật và dễ dàng thu hút ánh nhìn ở mọi nơi bạn xuất hiện. StepUp Air Max One chắc chắn là một item không thể thiếu trong tủ giày của giới trẻ hiện đại.</p>
          </div>

          <!-- Specs Content -->
          <div v-show="activeTab === 'specs'" class="max-w-[800px] mx-auto">
            <div class="border border-border rounded-2xl bg-white overflow-hidden shadow-sm">
              <table class="w-full text-sm text-left text-text-muted">
                <tbody>
                  <tr v-for="(spec, idx) in specs" :key="idx" class="border-b border-border/80 last:border-b-0 hover:bg-surface2/40 transition-colors">
                    <td class="py-4 px-6 font-semibold text-text w-[35%]">{{ spec.name }}</td>
                    <td class="py-4 px-6">{{ spec.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Reviews Content -->
          <div v-show="activeTab === 'reviews'" class="max-w-[800px] mx-auto space-y-8">
            <div class="flex items-center gap-10 p-6 bg-surface2 rounded-2xl border border-border/60">
              <div class="text-center">
                <div class="font-display text-4xl font-extrabold text-text">{{ avgRating }}<span class="text-base text-text-dim font-normal">/5</span></div>
                <div class="flex text-gold justify-center my-2 text-sm gap-0.5">
                  <template v-for="n in 5" :key="n">
                    <i :class="['ti', n <= Math.round(Number(avgRating)) ? 'ti-star-filled' : 'ti-star']"></i>
                  </template>
                </div>
                <div class="text-xs text-text-muted">Dựa trên {{ reviewsList.length }} đánh giá</div>
              </div>
              <div class="flex-1 flex justify-end">
                <button @click="showWriteReview" class="bg-text text-white px-5 py-3 rounded-xl text-xs font-semibold hover:bg-accent hover:text-white transition-colors active:scale-95 cursor-pointer">
                  Viết đánh giá
                </button>
              </div>
            </div>

            <!-- Reviews List -->
            <div class="space-y-6">
              <div v-for="(review, idx) in reviewsList" :key="idx" class="pb-6 border-b border-border last:border-b-0">
                <div class="flex justify-between items-start mb-3">
                  <div class="flex gap-3 items-center">
                    <div class="w-10 h-10 bg-border/80 text-text rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                      {{ review.name.charAt(0) }}
                    </div>
                    <div>
                      <div class="font-bold text-sm text-text flex items-center gap-2">
                        {{ review.name }}
                        <span class="bg-[#4CAF50]/10 text-[#4CAF50] text-[10px] font-semibold py-0.5 px-2 rounded-md flex items-center gap-1">
                          <i class="ti ti-circle-check"></i> Đã mua hàng
                        </span>
                      </div>
                      <div class="flex text-gold text-[11px] gap-0.5 mt-1">
                        <i v-for="star in 5" :key="star" :class="['ti', star <= review.stars ? 'ti-star-filled' : 'ti-star']"></i>
                      </div>
                    </div>
                  </div>
                  <span class="text-xs text-text-dim">{{ review.date }}</span>
                </div>
                <p class="text-sm text-text leading-relaxed pl-13">{{ review.comment }}</p>
                <div class="text-xs text-text-dim pl-13 mt-2">Phân loại: {{ review.variant }}, Size {{ review.size }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Related Products Section (only when loaded) -->
        <section v-if="!isLoading" class="py-12 border-t border-border mt-12 bg-surface2/30 rounded-3xl p-8 border">
          <h2 class="font-display text-2xl font-bold tracking-wider text-center mb-8 uppercase text-text">Sản phẩm liên quan</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <ProductCard 
              v-for="item in relatedProducts" 
              :key="item.id" 
              :product="item"
              @add-to-cart="handleAddToCart"
              @toggle-wish="handleWish"
              @click="goToDetail(item)"
            />
          </div>
        </section>

      </div>
    </main>
  </HomeLayout>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import ProductCard from '@/components/common/ProductCard.vue'
import { mapBackendProduct } from '@/data/products.js'
import axiosInstance from '@/api/axios.js'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const addToCart = inject('addToCart', (p) => {})
const showToast = inject('showToast', (msg) => {})

const product = ref({
  id: 1,
  brand: 'Nike',
  name: 'StepUp Air Max One Premium',
  price: '1.250.000₫',
  oldPrice: '1.500.000₫',
  discount: '16%',
  reviews: 128,
  isNew: true,
  images: [
    { src: '/images/nike-air-force-1.png', flip: false }
  ],
  colors: [],
  sizes: []
})

const activeImage = ref('')
const activeImageFlip = ref(false)
const selectedColor = ref('')
const selectedSize = ref('')
const qty = ref(1)
const wished = ref(false)
const activeTab = ref('desc')

const vouchers = ref([
  { title: 'Giảm 50.000₫', desc: 'Đơn tối thiểu 500K', saved: false },
  { title: 'Giảm 15%', desc: 'Đơn tối thiểu 1.500K', saved: false }
])

const tabs = computed(() => [
  { id: 'desc', label: 'Mô tả sản phẩm' },
  { id: 'specs', label: 'Thông tin sản phẩm' },
  { id: 'reviews', label: `Đánh giá (${reviewsList.value.length})` }
])

const specs = ref([])
const reviewsList = ref([])
const avgRating = ref('5.0')

const isLoading = ref(true)

async function loadProduct(id) {
  isLoading.value = true
  try {
    const response = await axiosInstance.get(`/product/${id}`)
    if (response.success && response.data) {
      const data = mapBackendProduct(response.data)
      product.value = data

      // Set default gallery image
      if (data.images && data.images.length > 0) {
        activeImage.value = data.images[0].src
        activeImageFlip.value = data.images[0].flip
      } else {
        activeImage.value = data.image || ''
        activeImageFlip.value = false
      }

      // Set default color
      if (data.colors && data.colors.length > 0) {
        selectedColor.value = data.colors[0].name
      } else {
        selectedColor.value = ''
      }

      // Set default size
      if (data.sizes && data.sizes.length > 0) {
        selectedSize.value = data.sizes[0]
      } else {
        selectedSize.value = ''
      }

      qty.value = 1
      wished.value = false

      // Populate specs
      if (data.specs && data.specs.length > 0) {
        specs.value = data.specs
      } else {
        specs.value = [
          { name: 'Thương hiệu', value: data.brand || 'SaigonShoes' },
          { name: 'Dòng sản phẩm', value: data.name || 'Premium' },
          { name: 'Bảo hành', value: '12 tháng chính hãng' }
        ]
      }

      // Map real reviews from API rating array
      const rawRatings = response.data.rating || []
      if (rawRatings.length > 0) {
        const total = rawRatings.reduce((sum, r) => sum + (r.rating || 5), 0)
        avgRating.value = (total / rawRatings.length).toFixed(1)
        reviewsList.value = rawRatings.map(r => ({
          name: r.user?.name || 'Khách hàng',
          stars: r.rating || 5,
          date: new Date(r.created_at).toLocaleDateString('vi-VN'),
          comment: r.comment || 'Sản phẩm tốt!',
          variant: 'Chính hãng',
          size: ''
        }))
      } else {
        avgRating.value = '5.0'
        reviewsList.value = []
      }

      // Load related products
      fetchRelatedProducts(data.category, data.id)
    }
  } catch (error) {
    console.error('Failed to load product detail:', error)
  } finally {
    isLoading.value = false
  }
}

// Related products
const relatedProducts = ref([])

async function fetchRelatedProducts(categoryName, currentProductId) {
  try {
    const prodRes = await axiosInstance.get('/products')
    if (prodRes.success && Array.isArray(prodRes.data)) {
      const allProdsMapped = prodRes.data.map(mapBackendProduct)
      relatedProducts.value = allProdsMapped
        .filter(p => p.category === categoryName && p.id !== currentProductId)
        .slice(0, 4)
    }
  } catch (err) {
    console.error('Failed to load related products:', err)
  }
}

// Watch Route ID for instant reactiveness upon navigation/clicks
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadProduct(newId)
    } else {
      // Default fallback if navigating to '/product-detail' mockup directly
      loadProduct(1)
    }
  },
  { immediate: true }
)

function setActiveImage(src, flip) {
  activeImage.value = src
  activeImageFlip.value = flip
}

function saveVoucher(voucher) {
  voucher.saved = true
  showToast(`Đã lưu voucher "${voucher.title}" vào ví!`)
}

function increaseQty() {
  if (qty.value < 10) qty.value++
}

function decreaseQty() {
  if (qty.value > 1) qty.value--
}

function toggleWish() {
  wished.value = !wished.value
  showToast(wished.value ? 'Đã thêm sản phẩm vào danh sách yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

function doAddToCart() {
  if (!selectedSize.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Chưa chọn size',
      text: 'Vui lòng chọn kích thước giày trước khi thêm vào giỏ.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }
  
  // Find matching variant
  const matchingVariant = (product.value.rawVariants || []).find(v => {
    const sizeName = v.size?.name || String(v.size_id)
    const colorName = v.color?.name || String(v.color_id)
    
    const matchesSize = sizeName == String(selectedSize.value)
    const matchesColor = product.value.colors && product.value.colors.length > 0 
      ? colorName == String(selectedColor.value)
      : true
      
    return matchesSize && matchesColor
  })
  
  const payload = {
    id: product.value.id,
    variant_id: matchingVariant?.id || null,
    brand: product.value.brand,
    name: product.value.name,
    variant_name: product.value.colors && product.value.colors.length > 0 
      ? `Màu ${selectedColor.value} · Size ${selectedSize.value}`
      : `Size ${selectedSize.value}`,
    price: product.value.numericPrice || 0,
    image: activeImage.value,
    qty: qty.value
  }
  
  addToCart(payload)
}

function handleAddToCart(p) {
  addToCart(p)
}

function handleWish(payload) {
  showToast(payload.wished ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

function goToDetail(item) {
  router.push({ name: 'product-detail', params: { id: item.id } })
}

function showWriteReview() {
  Swal.fire({
    title: 'Viết đánh giá sản phẩm',
    html: `
      <div class="text-left">
        <label class="block text-xs font-semibold mb-2">Số sao đánh giá (1-5)</label>
        <input type="number" id="swal-stars" class="swal2-input m-0 mb-4 w-full" min="1" max="5" value="5">
        <label class="block text-xs font-semibold mb-2">Nội dung đánh giá</label>
        <textarea id="swal-comment" class="swal2-textarea m-0 w-full" placeholder="Nhập cảm nhận của bạn..."></textarea>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Gửi đánh giá',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#FF4D00',
    preConfirm: () => {
      return {
        stars: document.getElementById('swal-stars').value,
        comment: document.getElementById('swal-comment').value
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      showToast('Cảm ơn bạn đã gửi đánh giá! Chờ duyệt bài viết.')
    }
  })
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera number arrows remove */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox number input scrollbar remove */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
