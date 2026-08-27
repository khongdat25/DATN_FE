<template>
  
    <div class="bg-bg py-4 border-b border-border">
      <div class="max-w-300 mx-auto px-5 flex items-center gap-2 text-[12px] text-text-muted">
        <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <router-link to="/products" class="hover:text-accent transition-colors">Sản phẩm</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <span class="text-text font-semibold">{{ product.name }}</span>
      </div>
    </div>

    <main class="py-12 bg-bg">
      <div class="max-w-300 mx-auto px-5">

        <!-- Trạng thái đang tải (Skeleton Loading) -->
        <div v-if="isLoading" class="animate-pulse">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16">
            <div class="flex flex-col gap-6">
              <div class="bg-surface2 rounded-2xl h-115 w-full"></div>
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

        <!-- Phần chi tiết sản phẩm -->
        <section v-else class="pb-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <!-- Bên trái: Thư viện ảnh sản phẩm -->
            <div class="flex flex-col gap-6">
              
              <!-- Ảnh lớn chính -->
              <div class="border border-border rounded-2xl bg-white p-8 flex items-center justify-center h-115 relative overflow-hidden group shadow-sm">
                <img 
                  :src="activeImage" 
                  :class="['max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105', activeImageFlip ? 'scale-x-[-1]' : '']" 
                  :alt="product.name"
                >
              </div>

              <!-- Danh sách ảnh nhỏ -->
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


            </div>

            <!-- Bên phải: Thông tin sản phẩm -->
            <div class="flex flex-col gap-6">
              <div>
                <span class="text-xs uppercase font-bold tracking-[2px] text-accent mb-2 block">{{ product.brand }}</span>
                <h1 class="font-display text-[clamp(28px,4vw,38px)] font-extrabold leading-tight text-text mb-3">{{ product.name }}</h1>
                
                <!-- Đánh giá sao -->
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

              <!-- Khung hiển thị giá -->
              <div class="flex items-center gap-4 py-6 border-y border-border">
                <span class="font-display text-3xl font-extrabold text-accent">{{ displayPrice }}</span>
                <span v-if="displayOldPrice" class="text-lg text-text-dim line-through">{{ displayOldPrice }}</span>
                <span v-if="displayDiscount" class="bg-accent/10 text-accent font-semibold py-1 px-3 rounded-lg text-xs">
                  -{{ displayDiscount }}
                </span>
              </div>

              <!-- Chọn màu sắc -->
              <div>
                <p class="text-[13px] font-bold text-text mb-3">
                  Màu sắc: <span class="text-text-muted font-normal">{{ selectedColor }}</span>
                </p>
                <div class="flex gap-3">
                  <div 
                    v-for="color in product.colors" 
                    :key="color.name"
                    @click="isColorAvailable(color.name) && (selectedColor = color.name)"
                    :class="[
                      'w-11 h-11 rounded-full border-2 p-1 transition-all', 
                      selectedColor === color.name ? 'border-text scale-105' : 'border-transparent',
                      !isColorAvailable(color.name) ? 'opacity-25 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
                    ]"
                    :title="color.name + (!isColorAvailable(color.name) ? ' (Hết hàng)' : '')"
                  >
                    <div class="w-full h-full rounded-full border border-black/10" :style="{ background: color.bg }"></div>
                  </div>
                </div>
              </div>

              <!-- Chọn kích thước (size) -->
              <div>
                <div class="flex items-center justify-between mb-3 text-[13px] font-bold text-text">
                  <p>Kích thước: <span class="text-text-muted font-normal">{{ selectedSize ? 'Size ' + selectedSize : 'Chưa chọn' }}</span></p>
                  <a href="#" class="text-accent underline font-semibold hover:text-accent-hover text-xs">Hướng dẫn chọn size</a>
                </div>
                <div class="grid grid-cols-5 gap-3">
                  <button 
                    v-for="size in product.sizes" 
                    :key="size"
                    :disabled="!isSizeAvailable(size)"
                    @click="isSizeAvailable(size) && (selectedSize = size)"
                    :class="[
                      'h-11 font-bold text-sm rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95', 
                      selectedSize === size ? 'bg-text text-white border-text' : 'bg-white border-border text-text-muted hover:border-text hover:text-text',
                      !isSizeAvailable(size) ? 'opacity-25 line-through cursor-not-allowed pointer-events-none bg-slate-50' : ''
                    ]"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Thông báo khi sản phẩm bị khóa hoặc hết hàng -->
              <div v-if="isProductLocked" class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-bold shadow-2xs">
                <i class="ti ti-lock text-amber-600 text-xl shrink-0"></i>
                <div class="text-left">
                  <span class="block text-sm font-extrabold text-amber-900">Sản phẩm tạm ngưng kinh doanh</span>
                  <span class="font-medium text-amber-700">Sản phẩm này hiện đang trong trạng thái tạm khóa / ngưng bán từ phía cửa hàng.</span>
                </div>
              </div>

              <div v-else-if="isOutOfStock" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800 text-xs font-bold shadow-2xs">
                <i class="ti ti-package-off text-red-600 text-xl shrink-0"></i>
                <div class="text-left">
                  <span class="block text-sm font-extrabold text-red-900">Sản phẩm hiện tại đã hết hàng</span>
                  <span class="font-medium text-red-700">Tất cả các kích cỡ và màu sắc của sản phẩm này đã được bán hết.</span>
                </div>
              </div>

              <!-- Số lượng & Các nút thao tác -->
              <div class="flex gap-4 items-center pt-4">
                <div class="flex items-center border border-border rounded-xl bg-white h-14 shrink-0 shadow-sm" :class="isPurchaseDisabled ? 'opacity-50 pointer-events-none' : ''">
                  <button @click="decreaseQty" :disabled="isPurchaseDisabled" class="w-12 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                    <i class="ti ti-minus"></i>
                  </button>
                  <input type="number" v-model.number="qty" min="1" max="10" :disabled="isPurchaseDisabled" class="w-12 text-center font-bold text-base border-none outline-none select-none">
                  <button @click="increaseQty" :disabled="isPurchaseDisabled" class="w-12 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors cursor-pointer">
                    <i class="ti ti-plus"></i>
                  </button>
                </div>

                <button 
                  @click="doAddToCart" 
                  :disabled="isPurchaseDisabled"
                  :class="[
                    'w-14 h-14 border rounded-xl flex items-center justify-center text-xl transition-all shadow-sm shrink-0',
                    isPurchaseDisabled 
                      ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed pointer-events-none' 
                      : 'bg-accent/10 border-accent/20 text-accent hover:bg-accent hover:text-white cursor-pointer active:scale-95'
                  ]"
                  title="Thêm vào giỏ hàng"
                >
                  <i class="ti ti-shopping-cart-plus"></i>
                </button>

                <button 
                  @click="doBuyNow" 
                  :disabled="isPurchaseDisabled"
                  :class="[
                    'flex-1 h-14 font-display font-bold text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm',
                    isPurchaseDisabled 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed pointer-events-none shadow-none' 
                      : 'bg-accent text-white hover:bg-accent-hover active:scale-[0.98] shadow-[0_8px_20px_rgba(255,77,0,0.15)] hover:shadow-[0_12px_25px_rgba(255,77,0,0.25)] cursor-pointer'
                  ]"
                >
                  {{ isProductLocked ? 'Tạm ngưng kinh doanh' : (isOutOfStock ? 'Hết hàng' : 'Mua ngay') }}
                </button>

                <button 
                  @click="toggleWish"
                  :class="['w-14 h-14 border rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer active:scale-95 shadow-sm', wished ? 'border-accent bg-accent/5 text-accent' : 'border-border bg-white text-text-muted hover:border-accent hover:text-accent']"
                >
                  <i :class="[wished ? 'ti ti-heart-filled' : 'ti ti-heart']"></i>
                </button>
              </div>

              <!-- Khung cam kết & ưu đãi -->
              <div class="mt-4 p-5 bg-surface2 rounded-2xl border border-border/60 flex flex-col gap-4">
                <div class="flex items-center gap-4 text-xs font-semibold text-text">
                  <i class="ti ti-truck-delivery text-accent text-2xl"></i>
                  <span>Giao hàng toàn quốc - Hỗ trợ áp dụng mã Freeship khi thanh toán</span>
                </div>
                <div class="flex items-center gap-4 text-xs font-semibold text-text">
                  <i class="ti ti-shield-check text-accent text-2xl"></i>
                  <span>Bảo hành 12 tháng tại cửa hàng</span>
                </div>
                <div class="flex items-center gap-4 text-xs font-semibold text-text">
                  <i class="ti ti-refresh text-accent text-2xl"></i>
                  <span>Đổi trả dễ dàng trong 30 ngày (còn nguyên tem mác)</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- Phần Tabs thông tin (Mô tả, Thông số, Đánh giá) -->
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

          <!-- Nội dung mô tả sản phẩm -->
          <div v-show="activeTab === 'desc'" class="max-w-200 mx-auto text-[15px] text-text-muted leading-relaxed space-y-4 text-left">
            <div v-if="product.description" v-html="product.description"></div>
            <div v-else>
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
          </div>

          <!-- Nội dung thông số kỹ thuật -->
          <div v-show="activeTab === 'specs'" class="max-w-200 mx-auto">
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

          <!-- Nội dung đánh giá của khách hàng -->
          <div v-show="activeTab === 'reviews'" class="max-w-200 mx-auto space-y-8">
            <div class="flex items-center justify-between p-6 bg-surface2 rounded-2xl border border-border/60">
              <div class="flex items-center gap-6">
                <div class="font-display text-4xl font-extrabold text-text">{{ avgRating }}<span class="text-base text-text-dim font-normal">/5</span></div>
                <div class="text-left">
                  <div class="flex text-gold text-sm gap-0.5 mb-1">
                    <template v-for="n in 5" :key="n">
                      <i :class="['ti', n <= Math.round(Number(avgRating)) ? 'ti-star-filled' : 'ti-star']"></i>
                    </template>
                  </div>
                  <div class="text-xs text-text-muted">Dựa trên {{ reviewsList.length }} nhận xét thực tế từ người mua hàng</div>
                </div>
              </div>
            </div>

            <!-- Bộ lọc bài đánh giá -->
            <div class="flex items-center justify-between gap-3 bg-white p-3 border border-border rounded-xl">
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  @click="reviewFilter = 'all'" 
                  :class="['px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer', reviewFilter === 'all' ? 'bg-accent text-white shadow-xs' : 'bg-surface2 text-text-muted hover:text-text']"
                >
                  Tất cả ({{ reviewsList.length }})
                </button>
                <button 
                  type="button" 
                  @click="reviewFilter = 'with_photo'" 
                  :class="['px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer', reviewFilter === 'with_photo' ? 'bg-accent text-white shadow-xs' : 'bg-surface2 text-text-muted hover:text-text']"
                >
                  Có hình ảnh thực tế 📸 ({{ countWithPhotos }})
                </button>
              </div>
            </div>

            <!-- Danh sách bài đánh giá -->
            <div class="space-y-6">
              <div v-for="(review, idx) in filteredReviewsList" :key="idx" class="pb-6 border-b border-border last:border-b-0 text-left">
                <div class="flex justify-between items-start mb-3">
                  <div class="flex gap-3 items-center">
                    <div class="w-10 h-10 bg-border/80 text-text rounded-full flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden shrink-0">
                      <img v-if="review.userAvatar" :src="getImageUrl(review.userAvatar)" alt="Avatar" class="w-full h-full object-cover">
                      <span v-else>{{ review.name.charAt(0) }}</span>
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
                
                <!-- Ảnh đánh giá thực tế từ người dùng -->
                <div v-if="review.images && review.images.length > 0" class="pl-13 mt-3 flex items-center gap-3 flex-wrap">
                  <div 
                    v-for="(img, imgIdx) in review.images" 
                    :key="imgIdx" 
                    @click="previewImageUrl = img"
                    class="w-20 h-20 rounded-xl overflow-hidden border border-border bg-surface2 cursor-pointer hover:opacity-90 hover:scale-105 transition-all shadow-xs relative group"
                  >
                    <img :src="getImageUrl(img)" alt="Ảnh đánh giá thực tế" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity">
                      <i class="ti ti-zoom-in"></i>
                    </div>
                  </div>
                </div>

                <div v-if="review.variant && review.variant !== 'Chính hãng'" class="text-xs text-text-dim pl-13 mt-2">Phân loại: {{ review.variant }}</div>

                <!-- Admin Reply Box -->
                <div v-if="review.reply" class="ml-13 mt-3 bg-surface2/80 border border-border/80 rounded-2xl p-4 flex gap-3 text-left">
                  <div class="h-7 w-7 rounded-lg bg-accent text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 shadow-2xs">
                    AD
                  </div>
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold text-text">SaigonShoes Admin</span>
                      <span class="text-[9px] uppercase tracking-wider font-extrabold text-accent bg-accent/15 px-1.5 py-0.5 rounded-sm">Ban Quản Trị</span>
                    </div>
                    <p class="text-xs text-text-muted font-medium leading-relaxed">{{ review.reply }}</p>
                  </div>
                </div>
              </div>
              <div v-if="filteredReviewsList.length === 0" class="py-12 text-center text-text-dim">
                <i class="ti ti-messages text-4xl block mb-2 opacity-60"></i>
                <p class="text-sm font-semibold">Chưa có đánh giá nào phù hợp với bộ lọc</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Phần sản phẩm liên quan -->
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

    <!-- Review Image Lightbox Modal -->
    <div v-if="previewImageUrl" class="fixed inset-0 z-500 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" @click="previewImageUrl = null">
      <div class="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-black p-2 flex flex-col items-center">
        <button type="button" @click="previewImageUrl = null" class="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 w-10 h-10 rounded-full flex items-center justify-center text-xl cursor-pointer border-none z-10">
          <i class="ti ti-x"></i>
        </button>
        <img :src="getImageUrl(previewImageUrl)" alt="Ảnh đánh giá phóng to" class="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
      </div>
    </div>
  
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '@/components/common/ProductCard.vue'
import { mapBackendProduct, findMatchingVariant, getVariantSizeName, getVariantColorName } from '@/data/products.js'
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

const currentVariant = computed(() => {
  const hasColorOptions = product.value.colors && product.value.colors.length > 0
  return findMatchingVariant(
    product.value.rawVariants || [],
    selectedSize.value,
    selectedColor.value,
    hasColorOptions
  )
})

const displayPrice = computed(() => {
  const variant = currentVariant.value
  if (variant && variant.price !== undefined && variant.price !== null) {
    const priceVal = parseFloat(variant.sale || variant.price)
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVal).replace(/\s/g, '').replace('₫', 'đ')
  }
  return product.value.price
})

const displayOldPrice = computed(() => {
  const variant = currentVariant.value
  if (variant) {
    if (variant.sale && variant.price) {
      const originalPrice = parseFloat(variant.price)
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice).replace(/\s/g, '').replace('₫', 'đ')
    }
    return null
  }
  return product.value.oldPrice
})

const displayDiscount = computed(() => {
  const variant = currentVariant.value
  if (variant) {
    if (variant.sale && variant.price) {
      const sale = parseFloat(variant.sale)
      const price = parseFloat(variant.price)
      if (price > 0) {
        const pct = Math.round((1 - sale / price) * 100)
        return `${pct}%`
      }
    }
    return null
  }
  return product.value.discount
})

const reviewsList = ref([])
const avgRating = ref('5.0')
const reviewFilter = ref('all')
const previewImageUrl = ref(null)

const countWithPhotos = computed(() => {
  return reviewsList.value.filter(r => r.images && r.images.length > 0).length
})

const isProductLocked = computed(() => {
  return product.value && (Number(product.value.status) === 0 || product.value.status === 'hidden' || product.value.status === 'disabled')
})

const isOutOfStock = computed(() => {
  if (!product.value.rawVariants || product.value.rawVariants.length === 0) {
    return false
  }
  return product.value.rawVariants.every(v => (v.stock === undefined || v.stock === null ? false : Number(v.stock) <= 0))
})

const isPurchaseDisabled = computed(() => {
  if (isProductLocked.value) return true
  if (isOutOfStock.value) return true
  if (currentVariant.value && currentVariant.value.stock !== undefined && Number(currentVariant.value.stock) <= 0) return true
  return false
})

const filteredReviewsList = computed(() => {
  if (reviewFilter.value === 'with_photo') {
    return reviewsList.value.filter(r => r.images && r.images.length > 0)
  }
  return reviewsList.value
})

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/p1.png'
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

const tabs = computed(() => [
  { id: 'desc', label: 'Mô tả sản phẩm' },
  { id: 'specs', label: 'Thông tin sản phẩm' },
  { id: 'reviews', label: `Đánh giá (${reviewsList.value.length})` }
])

const specs = ref([])

const isLoading = ref(true)

async function loadProduct(slug) {
  isLoading.value = true
  try {
    // Đường dẫn API Backend: GET /product/{slug} => trả về { success, data: { product, related } }
    const response = await axiosInstance.get(`/product/${slug}`)
    if (response?.success && response?.data) {
      const rawProduct = response.data.product
      const data = mapBackendProduct(rawProduct)
      product.value = data

      // Đặt ảnh mặc định cho thư viện ảnh
      if (data.images && data.images.length > 0) {
        activeImage.value = data.images[0].src
        activeImageFlip.value = data.images[0].flip
      } else {
        activeImage.value = data.image || ''
        activeImageFlip.value = false
      }

      // Đặt màu sắc mặc định (giữ nguyên nếu màu đang chọn vẫn hợp lệ)
      if (!selectedColor.value || !data.colors.some(c => c.name === selectedColor.value)) {
        if (data.colors && data.colors.length > 0) {
          selectedColor.value = data.colors[0].name
        } else {
          selectedColor.value = ''
        }
      }

      // Đặt kích thước mặc định (giữ nguyên nếu size đang chọn vẫn hợp lệ)
      if (!selectedSize.value || !data.sizes.some(s => String(s) === String(selectedSize.value))) {
        if (data.sizes && data.sizes.length > 0) {
          selectedSize.value = data.sizes[0]
        } else {
          selectedSize.value = ''
        }
      }

      qty.value = 1
      const savedStr = localStorage.getItem('saigon_wishlist')
      let ids = []
      if (savedStr) {
        try { ids = JSON.parse(savedStr) } catch (e) {}
      }
      wished.value = ids.includes(Number(data.id)) || ids.includes(String(data.id))

      // Đổ dữ liệu thông số kỹ thuật
      if (data.specs && data.specs.length > 0) {
        specs.value = data.specs
      } else {
        specs.value = [
          { name: 'Thương hiệu', value: data.brand || 'SaigonShoes' },
          { name: 'Dòng sản phẩm', value: data.name || 'Premium' },
          { name: 'Bảo hành', value: '12 tháng chính hãng' }
        ]
      }

      // Ánh xạ danh sách đánh giá thực tế từ mảng rating của API
      const rawRatings = rawProduct.rating || []
      if (rawRatings.length > 0) {
        const total = rawRatings.reduce((sum, r) => sum + (r.rating || 5), 0)
        avgRating.value = (total / rawRatings.length).toFixed(1)
        reviewsList.value = rawRatings.map(r => ({
          name: r.user?.name || 'Khách hàng',
          userAvatar: r.user?.avatar || null,
          stars: r.rating || 5,
          date: new Date(r.created_at).toLocaleDateString('vi-VN'),
          comment: r.comment || 'Sản phẩm tốt!',
          reply: r.reply || null,
          images: r.image_urls || r.images || [],
          variant: 'Chính hãng',
          size: ''
        }))
      } else {
        avgRating.value = '5.0'
        reviewsList.value = []
      }

      // Kiểm tra xem sản phẩm có đang thuộc chiến dịch Flash Sale đang diễn ra không
      try {
        const fsRes = await axiosInstance.get('/flashsales')
        if (fsRes?.success && Array.isArray(fsRes.data) && fsRes.data.length > 0) {
          const activeSale = fsRes.data[0]
          const fsVariants = (activeSale?.variants || activeSale?.items || []).filter(item => item.product_id === rawProduct.id || item.product?.id === rawProduct.id)
          
          if (fsVariants.length > 0 && data.rawVariants && data.rawVariants.length > 0) {
            data.rawVariants = data.rawVariants.map(v => {
              const matchedFsItem = fsVariants.find(i => i.id === v.id || i.variant_id === v.id)
              
              if (matchedFsItem) {
                const originalPrice = parseFloat(v.price) || 0
                const flashPrice = parseFloat(matchedFsItem.sale_price) || (matchedFsItem.discount_value ? originalPrice * (1 - matchedFsItem.discount_value / 100) : (v.sale_price || originalPrice))
                const discountPercent = originalPrice > 0 && flashPrice < originalPrice ? Math.round(((originalPrice - flashPrice) / originalPrice) * 100) : (matchedFsItem.discount_value || 0)

                return {
                  ...v,
                  isFlashSale: true,
                  discountPercent: discountPercent,
                  sale: flashPrice
                }
              }
              
              return {
                ...v,
                isFlashSale: false,
                sale: null
              }
            })
          }
        }
      } catch (fsErr) {
        console.error('Không thể kiểm tra flash sale cho sản phẩm chi tiết:', fsErr)
      }

      // Sử dụng danh sách sản phẩm liên quan được trả về trực tiếp từ API Chi tiết
      const rawRelated = response.data.related || []
      relatedProducts.value = rawRelated
        .map(mapBackendProduct)
        .filter(Boolean)
        .slice(0, 4)
    }
  } catch (error) {
    console.error('Không thể tải chi tiết sản phẩm:', error)
  } finally {
    isLoading.value = false
  }
}

// Danh sách sản phẩm liên quan
const relatedProducts = ref([])

// Theo dõi slug trên đường dẫn để tự động nạp lại khi chuyển trang
watch(
  () => route.params.id,
  (newSlug) => {
    if (newSlug) {
      loadProduct(newSlug)
    }
    // Nếu không có slug, tắt trạng thái đang tải
    else {
      isLoading.value = false
    }
  },
  { immediate: true }
)

const isColorAvailable = (colorName) => {
  if (!selectedSize.value) return true
  return (product.value.rawVariants || []).some(v => {
    const isMatch = getVariantSizeName(v) === String(selectedSize.value) && getVariantColorName(v) === colorName
    const hasStock = (v.stock === undefined || v.stock === null || Number(v.stock) > 0)
    return isMatch && hasStock
  })
}

const isSizeAvailable = (sizeName) => {
  if (!selectedColor.value) return true
  return (product.value.rawVariants || []).some(v => {
    const isMatch = getVariantSizeName(v) === String(sizeName) && getVariantColorName(v) === selectedColor.value
    const hasStock = (v.stock === undefined || v.stock === null || Number(v.stock) > 0)
    return isMatch && hasStock
  })
}

// Theo dõi khi đổi màu để tự động chọn size khả dụng
watch(selectedColor, (newColor) => {
  if (!newColor || !selectedSize.value) return
  const isCompatible = (product.value.rawVariants || []).some(v => {
    return getVariantSizeName(v) === String(selectedSize.value) && getVariantColorName(v) === newColor
  })
  if (!isCompatible) {
    const firstAvail = (product.value.rawVariants || []).find(v => getVariantColorName(v) === newColor)
    if (firstAvail) {
      selectedSize.value = getVariantSizeName(firstAvail)
    }
  }
})

// Theo dõi khi đổi size để tự động chọn màu khả dụng
watch(selectedSize, (newSize) => {
  if (!newSize || !selectedColor.value) return
  const isCompatible = (product.value.rawVariants || []).some(v => {
    return getVariantSizeName(v) === String(newSize) && getVariantColorName(v) === selectedColor.value
  })
  if (!isCompatible) {
    const firstAvail = (product.value.rawVariants || []).find(v => getVariantSizeName(v) === String(newSize))
    if (firstAvail) {
      selectedColor.value = getVariantColorName(firstAvail)
    }
  }
})

function setActiveImage(src, flip) {
  activeImage.value = src
  activeImageFlip.value = flip
}

function increaseQty() {
  if (qty.value < 10) qty.value++
}

function decreaseQty() {
  if (qty.value > 1) qty.value--
}

async function toggleWish() {
  wished.value = !wished.value

  const token = localStorage.getItem('access_token')
  if (token && product.value && product.value.id) {
    try {
      await axiosInstance.post('/wishlist/toggle', { product_id: product.value.id })
    } catch (e) {
      console.error('Failed to toggle wishlist on server:', e)
    }
  }

  const savedStr = localStorage.getItem('saigon_wishlist')
  let ids = []
  if (savedStr) {
    try { ids = JSON.parse(savedStr) } catch (e) {}
  }
  if (wished.value) {
    if (!ids.includes(product.value.id)) {
      ids.push(product.value.id)
    }
  } else {
    ids = ids.filter(id => Number(id) !== Number(product.value.id) && String(id) !== String(product.value.id))
  }
  localStorage.setItem('saigon_wishlist', JSON.stringify(ids))
  window.dispatchEvent(new Event('wishlist-updated'))

  showToast(wished.value ? 'Đã thêm sản phẩm vào danh sách yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

async function doAddToCart() {
  if (isProductLocked.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Sản phẩm tạm ngưng kinh doanh',
      text: 'Sản phẩm này hiện đang tạm khóa và không thể đặt mua.',
      confirmButtonColor: '#FF4D00'
    })
    return false
  }

  if (isOutOfStock.value) {
    Swal.fire({
      icon: 'error',
      title: 'Sản phẩm đã hết hàng',
      text: 'Tất cả kích thước và màu sắc của sản phẩm này đã được bán hết.',
      confirmButtonColor: '#FF4D00'
    })
    return false
  }

  if (!selectedSize.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Chưa chọn size',
      text: 'Vui lòng chọn kích thước giày trước khi thêm vào giỏ.',
      confirmButtonColor: '#FF4D00'
    })
    return false
  }
  
  const matchingVariant = currentVariant.value
  if (!matchingVariant || (matchingVariant.stock !== undefined && matchingVariant.stock <= 0)) {
    Swal.fire({
      icon: 'error',
      title: 'Kích thước hết hàng',
      text: 'Size/Màu sắc sản phẩm này hiện tại đã hết hàng.',
      confirmButtonColor: '#FF4D00'
    })
    return false
  }

  const activePrice = matchingVariant ? (matchingVariant.sale || matchingVariant.sale_price || matchingVariant.price) : (product.value.numericPrice || 0)
  
  const payload = {
    id: product.value.id,
    variant_id: matchingVariant?.id || null,
    brand: product.value.brand,
    name: product.value.name,
    variant_name: product.value.colors && product.value.colors.length > 0 
      ? `Màu ${selectedColor.value} · Size ${selectedSize.value}`
      : `Size ${selectedSize.value}`,
    price: activePrice,
    image: activeImage.value,
    qty: qty.value
  }
  
  return await addToCart(payload)
}

async function doBuyNow() {
  if (isProductLocked.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Sản phẩm tạm ngưng kinh doanh',
      text: 'Sản phẩm này hiện đang tạm khóa và không thể đặt mua.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  if (isOutOfStock.value) {
    Swal.fire({
      icon: 'error',
      title: 'Sản phẩm đã hết hàng',
      text: 'Tất cả kích thước và màu sắc của sản phẩm này đã được bán hết.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  if (!selectedSize.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Chưa chọn size',
      text: 'Vui lòng chọn kích thước giày trước khi mua.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }
  
  const matchingVariant = currentVariant.value
  
  if (!matchingVariant?.id || (matchingVariant.stock !== undefined && matchingVariant.stock <= 0)) {
    Swal.fire({
      icon: 'error',
      title: 'Kích thước hết hàng',
      text: 'Size/Màu sắc sản phẩm này hiện tại đã hết hàng.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  const token = localStorage.getItem('access_token')
  if (!token) {
    Swal.fire({
      title: 'Yêu cầu đăng nhập',
      text: 'Bạn cần đăng nhập để mua sản phẩm.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng nhập ngay',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#FF4D00',
      cancelButtonColor: '#aaa'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({ name: 'login', query: { redirect: route.fullPath } })
      }
    })
    return
  }

  const activePrice = matchingVariant.sale || matchingVariant.sale_price || matchingVariant.price || product.value.numericPrice || 0
  const isFs = matchingVariant.isFlashSale || !!(matchingVariant.flash_sale_id || (matchingVariant.sale_price !== null && matchingVariant.sale_price !== undefined && Number(matchingVariant.sale_price) > 0) || matchingVariant.sale)
  const subtotal = activePrice * qty.value
  const shippingFee = 30000
  
  const buyNowItem = {
    id: null,
    variant_id: matchingVariant.id,
    productId: product.value.id,
    name: product.value.name,
    variant: product.value.colors && product.value.colors.length > 0 
      ? `Màu ${selectedColor.value} · Size ${selectedSize.value}`
      : `Size ${selectedSize.value}`,
    price: activePrice,
    qty: qty.value,
    image: activeImage.value,
    is_flash_sale: isFs,
    flash_sale_id: matchingVariant.flash_sale_id || null,
    sale_price: matchingVariant.sale || matchingVariant.sale_price || null,
    variantObj: matchingVariant
  }

  const summary = {
    items: [buyNowItem],
    subtotal: subtotal,
    shippingFee: shippingFee,
    discountAmount: 0,
    voucherCode: null,
    total: subtotal + shippingFee,
    isBuyNow: true
  }

  localStorage.setItem('saigon_checkout_summary', JSON.stringify(summary))
  router.push({ name: 'checkout' })
}

function handleAddToCart(p) {
  addToCart(p)
}

function handleWish(payload) {
  showToast(payload.wished ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

function goToDetail(item) {
  // Chuyển hướng bằng slug (đường dẫn chi tiết phía backend sử dụng slug thay vì ID dạng số)
  router.push({ name: 'product-detail', params: { id: item.slug || item.id } })
}

async function showWriteReview() {
  const token = localStorage.getItem('access_token')
  if (!token) {
    Swal.fire({
      title: 'Yêu cầu đăng nhập & Mua hàng',
      text: 'Chỉ những khách hàng đã mua và nhận hàng thành công mới được viết đánh giá cho sản phẩm này.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng nhập ngay',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#FF4D00',
      cancelButtonColor: '#94a3b8'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({ name: 'login', query: { redirect: route.fullPath } })
      }
    })
    return
  }

  Swal.fire({
    title: 'Đang kiểm tra đơn hàng...',
    text: 'Vui lòng chờ trong giây lát',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  try {
    const res = await axiosInstance.get('/user/orders')
    Swal.close()

    if (!res || !res.success || !Array.isArray(res.data)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Không thể kiểm tra lịch sử đơn hàng của bạn.',
        confirmButtonColor: '#FF4D00'
      })
      return
    }

    const currentProdId = product.value.id
    // Tìm các orderItem thỏa mãn: đơn hàng 'delivered' và thuộc sản phẩm này
    let eligibleItems = []
    res.data.forEach(order => {
      if (order.status === 'delivered' && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const itemProdId = item.variant?.product_id || item.product_id
          if (Number(itemProdId) === Number(currentProdId)) {
            eligibleItems.push({
              orderItemId: item.id,
              orderCode: order.code || order.id,
              rating: item.rating || null
            })
          }
        })
      }
    })

    if (eligibleItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Chưa thể đánh giá sản phẩm',
        text: 'Bạn chưa mua sản phẩm này hoặc đơn hàng chưa được giao thành công. Chỉ khách hàng đã mua và nhận hàng thành công mới có thể gửi đánh giá!',
        confirmButtonColor: '#FF4D00'
      })
      return
    }

    // Lọc item chưa đánh giá
    const unratedItem = eligibleItems.find(i => !i.rating)

    if (!unratedItem) {
      Swal.fire({
        icon: 'info',
        title: 'Đã hoàn thành đánh giá',
        text: 'Bạn đã gửi đánh giá cho sản phẩm này ở các đơn hàng đã mua rồi. Cảm ơn bạn!',
        confirmButtonColor: '#FF4D00'
      })
      return
    }

    // Cho phép đánh giá item chưa được đánh giá
    let selectedStars = 5

    Swal.fire({
      title: 'Viết đánh giá sản phẩm',
      html: `
        <div class="text-left space-y-4">
          <p class="text-xs text-slate-500 font-semibold">Sản phẩm: <strong class="text-slate-800">${product.value.name}</strong></p>
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1.5">SỐ SAO ĐÁNH GIÁ *</label>
            <div id="swal-stars-container" class="flex gap-2 text-2xl text-amber-400 cursor-pointer">
              <span data-star="1">★</span>
              <span data-star="2">★</span>
              <span data-star="3">★</span>
              <span data-star="4">★</span>
              <span data-star="5">★</span>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1.5">NỘI DUNG NHẬN XÉT</label>
            <textarea id="swal-comment" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-accent text-slate-800 resize-none" rows="4" placeholder="Nhập cảm nhận thực tế của bạn về kiểu dáng, độ êm, form dáng..."></textarea>
          </div>
        </div>
      `,
      didOpen: () => {
        const container = document.getElementById('swal-stars-container')
        if (container) {
          const stars = container.querySelectorAll('span')
          const updateStars = (val) => {
            selectedStars = val
            stars.forEach((s, idx) => {
              s.style.color = idx < val ? '#f59e0b' : '#cbd5e1'
            })
          }
          stars.forEach((s, idx) => {
            s.addEventListener('click', () => updateStars(idx + 1))
          })
          updateStars(5)
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Gửi đánh giá ngay',
      cancelButtonText: 'Hủy bỏ',
      confirmButtonColor: '#FF4D00',
      cancelButtonColor: '#94a3b8',
      preConfirm: () => {
        const comment = document.getElementById('swal-comment').value.trim()
        return {
          rating: selectedStars,
          comment: comment
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const payload = {
            order_item_id: unratedItem.orderItemId,
            rating: result.value.rating,
            comment: result.value.comment
          }
          const ratingRes = await axiosInstance.post('/ratings', payload)
          if (ratingRes && ratingRes.success) {
            Swal.fire({
              icon: 'success',
              title: 'Gửi đánh giá thành công!',
              text: 'Cảm ơn bạn đã chia sẻ ý kiến trải nghiệm sản phẩm.',
              confirmButtonColor: '#FF4D00'
            })
            // Reload product details to update review list
            if (route.params.id) {
              loadProduct(route.params.id)
            }
          }
        } catch (err) {
          console.error('Lỗi gửi đánh giá:', err)
          Swal.fire({
            icon: 'error',
            title: 'Không thể gửi đánh giá',
            text: err.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá.',
            confirmButtonColor: '#FF4D00'
          })
        }
      }
    })

  } catch (error) {
    console.error('Error checking user order eligibility:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Không thể kiểm tra thông tin đơn hàng.',
      confirmButtonColor: '#FF4D00'
    })
  }
}
</script>

<style scoped>
/* Ẩn mũi tên tăng giảm số trên Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Ẩn thanh cuộn nhập số trên Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
