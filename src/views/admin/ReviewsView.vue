<template>
  
    <div class="space-y-6 text-left">
      <!-- Page Title Header -->
      <div>
        <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Phản hồi & Đánh giá sản phẩm</h1>
        <p class="text-sm text-slate-500 mt-1">Giám sát điểm đánh giá giày dép từ khách hàng, phản hồi tư vấn đổi trả và kiểm duyệt hiển thị nhận xét rác.</p>
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <!-- Rating Average Card -->
        <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-slate-100 group-hover:text-accent/10 transition-colors duration-300">
            <i class="ti ti-star text-5xl"></i>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Điểm đánh giá trung bình</p>
          <div class="flex items-baseline gap-2 mt-2">
            <p class="text-3xl font-bold text-slate-800">{{ statAverage }}</p>
            <span class="text-xs font-bold text-accent">★★★★★</span>
          </div>
          <p class="text-[10px] text-green-500 mt-1 flex items-center gap-1">
            <i class="ti ti-thumb-up"></i> Hài lòng cực kỳ cao (94%)
          </p>
        </div>

        <!-- Total Reviews Card -->
        <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-slate-100 group-hover:text-green-500/10 transition-colors duration-300">
            <i class="ti ti-message-2 text-5xl"></i>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng số lượt đánh giá</p>
          <p class="text-3xl font-bold text-slate-800 mt-2">{{ statTotal }}</p>
          <p class="text-[10px] text-slate-400 mt-1">Gia tăng tự nhiên từ mua hàng thực tế</p>
        </div>

        <!-- New Reviews Today -->
        <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-slate-100 group-hover:text-blue-500/10 transition-colors duration-300">
            <i class="ti ti-bell-ringing text-5xl"></i>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Đánh giá mới hôm nay</p>
          <p class="text-3xl font-bold text-blue-600 mt-2">+12</p>
          <p class="text-[10px] text-green-500 mt-1 flex items-center gap-1">
            <i class="ti ti-trending-up"></i> +15% so với ngày hôm qua
          </p>
        </div>

        <!-- Unreplied Reviews -->
        <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-slate-100 group-hover:text-red-500/10 transition-colors duration-300">
            <i class="ti ti-message-report text-5xl"></i>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Chưa có phản hồi</p>
          <p class="text-3xl font-bold mt-2" :class="statUnreplied > 0 ? 'text-amber-600 animate-pulse' : 'text-slate-800'">
            {{ statUnreplied }}
          </p>
          <p class="text-[10px] text-amber-500 mt-1 font-semibold flex items-center gap-0.5" v-if="statUnreplied > 0">
            <i class="ti ti-alert-triangle"></i> Cần trả lời gấp hỗ trợ khách
          </p>
          <p class="text-[10px] text-slate-400 mt-1 font-semibold flex items-center gap-0.5" v-else>
            <i class="ti ti-circle-check text-green-500"></i> Đã phản hồi toàn bộ
          </p>
        </div>
      </div>

      <!-- Toolbars & Filters -->
      <div class="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Search -->
        <div class="relative w-full md:w-80 text-slate-400 focus-within:text-accent">
          <i class="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-lg"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tìm tên khách, sản phẩm, nhận xét..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all font-semibold"
          >
        </div>

        <!-- Select Filters -->
        <div class="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          <select 
            v-model="ratingFilter" 
            class="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-650 text-slate-700 outline-none cursor-pointer focus:border-accent transition-colors font-semibold"
          >
            <option value="all">Tất cả số sao</option>
            <option value="5">★★★★★ (5 Sao)</option>
            <option value="4">★★★★☆ (4 Sao)</option>
            <option value="3">★★★☆☆ (3 Sao)</option>
            <option value="2">★★☆☆☆ (2 Sao)</option>
            <option value="1">★☆☆☆☆ (1 Sao)</option>
          </select>

          <select 
            v-model="statusFilter" 
            class="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-650 text-slate-700 outline-none cursor-pointer focus:border-accent transition-colors font-semibold"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="replied">Đã phản hồi</option>
            <option value="pending">Chờ phản hồi</option>
            <option value="hidden">Đã ẩn</option>
          </select>
        </div>
      </div>

      <!-- Feed Area (List of Review items) -->
      <div class="space-y-4" v-if="filteredReviews.length > 0">
        <div 
          v-for="rev in filteredReviews" 
          :key="rev.id" 
          class="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs relative overflow-hidden transition-all hover:shadow-md flex flex-col gap-5"
        >
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-50 pb-4">
            <!-- Customer Column -->
            <div class="flex items-center gap-3.5">
              <div :class="['h-11 w-11 rounded-2xl font-display font-extrabold text-sm flex items-center justify-center shrink-0 shadow-2xs overflow-hidden', getInitialsClass(rev.customer.name)]">
                <img v-if="isImageAvatar(rev.customer.avatar)" :src="getImageUrl(rev.customer.avatar)" class="w-full h-full object-cover" :alt="rev.customer.name">
                <span v-else>{{ getInitials(rev.customer.name) }}</span>
              </div>
              <div>
                <h3 class="text-xs font-extrabold text-slate-900">{{ rev.customer.name }}</h3>
                <p class="text-[10px] text-slate-400 font-medium mt-0.5">{{ rev.customer.email }}</p>
              </div>
            </div>

            <!-- Product Purchased Column -->
            <div class="flex items-center gap-3 bg-slate-50 border border-slate-100 py-1.5 px-3.5 rounded-2xl max-w-sm">
              <div class="h-8 w-8 rounded-lg bg-white border border-slate-100 overflow-hidden flex items-center justify-center shrink-0 shadow-3xs">
                <img :src="rev.product.image || '/images/logo.png'" alt="Product" class="max-h-[80%] max-w-[80%] object-contain" style="mix-blend-mode: multiply;">
              </div>
              <div class="text-left">
                <span class="text-[10px] font-bold text-slate-800">{{ rev.product.name }}</span>
                <span class="block text-[8px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{{ rev.product.category }}</span>
              </div>
            </div>
          </div>

          <!-- Rating stars & purchased detail -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex gap-0.5 shrink-0 bg-slate-50 py-1 px-2.5 rounded-lg border border-slate-100">
              <i 
                v-for="i in 5" 
                :key="i" 
                :class="[
                  i <= rev.rating ? 'ti ti-star-filled text-amber-500 text-sm' : 'ti ti-star text-slate-200 text-sm'
                ]"
              ></i>
            </div>
            <span class="text-[10px] font-bold text-slate-400">
              <i class="ti ti-shopping-cart-check"></i> {{ rev.purchaseDetails }}
            </span>
            <div class="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
            <span class="text-[10px] font-semibold text-slate-400">
              <i class="ti ti-calendar"></i> Đăng ngày {{ rev.date }}
            </span>
            <div class="ml-auto">
              <span 
                v-if="rev.status === 'replied'" 
                class="inline-flex items-center gap-1 py-1 px-3 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100 whitespace-nowrap"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>Đã phản hồi
              </span>
              <span 
                v-else-if="rev.status === 'pending'" 
                class="inline-flex items-center gap-1 py-1 px-3 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100 whitespace-nowrap"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping shrink-0"></span>Chờ phản hồi
              </span>
              <span 
                v-else 
                class="inline-flex items-center gap-1 py-1 px-3 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>Đã ẩn bình luận
              </span>
            </div>
          </div>

          <!-- Review Text Comments -->
          <div class="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50/20 p-4 border border-dashed border-slate-200/50 rounded-2xl relative">
            <p>{{ rev.comment }}</p>
          </div>

          <!-- Admin Reply Section -->
          <div v-if="rev.reply" class="mt-2 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-3.5 text-left">
            <div class="h-8 w-8 rounded-lg bg-accent text-white flex items-center justify-center text-xs font-bold shrink-0">
              AD
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-slate-800">SaigonShoes Admin</span>
                <span class="text-[9px] uppercase tracking-wider font-extrabold text-accent bg-accent/15 px-1.5 py-0.5 rounded-sm">Ban Quản Trị</span>
              </div>
              <p class="text-xs text-slate-600 font-medium leading-relaxed">{{ rev.reply }}</p>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-50">
            <button 
              @click="handleReplyPrompt(rev)" 
              class="inline-flex items-center gap-1.5 bg-orange-50 text-accent hover:bg-accent hover:text-white px-4 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all shadow-3xs cursor-pointer border border-orange-100 hover:border-accent"
            >
              <i class="ti ti-message-2 text-xs"></i> Trả lời đánh giá
            </button>
            
            <button 
              @click="toggleHide(rev)" 
              class="inline-flex items-center gap-1.5 bg-slate-50 text-slate-500 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all shadow-3xs cursor-pointer border border-slate-200"
            >
              <i :class="['ti text-xs', rev.status === 'hidden' ? 'ti-eye' : 'ti-eye-off']"></i> 
              {{ rev.status === 'hidden' ? 'Hiện bình luận' : 'Ẩn bình luận' }}
            </button>

            <button 
              @click="handleDeleteReview(rev.id)" 
              class="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl border border-red-100 transition-all cursor-pointer shadow-3xs" 
              title="Xóa đánh giá"
            >
              <i class="ti ti-trash text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white border border-slate-100 rounded-2xl p-16 text-center shadow-xs">
        <i class="ti ti-star-half text-5xl text-slate-200 block mb-3 animate-bounce"></i>
        <p class="text-sm font-semibold text-slate-800">Không tìm thấy đánh giá nào khớp bộ lọc</p>
        <p class="text-xs text-slate-400 mt-1">Vui lòng thay đổi từ khóa hoặc điều chỉnh các bộ lọc sao/trạng thái.</p>
      </div>
    </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const searchQuery = ref('')
const ratingFilter = ref('all')
const statusFilter = ref('all')

const reviews = ref([
  {
    id: 1,
    customer: {
      name: 'Khổng Đạt',
      email: 'khongdat@gmail.com',
      avatar: 'KĐ'
    },
    product: {
      name: 'StepUp Air Max One',
      image: '', // Use fallback
      category: 'Giày Chạy Bộ'
    },
    rating: 5,
    purchaseDetails: 'Size: 42 | Màu: Cam Đen | Mua tại Cửa hàng',
    date: '01 Tháng 6, 2026',
    comment: 'Giày đi rất êm chân, đúng form, giao hàng siêu nhanh. Màu cam nổi bật rất đúng tinh thần thể thao. Sẽ ủng hộ SaigonShoes nhiều hơn!',
    status: 'replied',
    reply: 'Chào Đạt, đội ngũ SaigonShoes rất vui khi bạn hài lòng với chất lượng dịch vụ và đôi giày mới! Chúc bạn có những hành trình tuyệt vời phía trước!'
  },
  {
    id: 2,
    customer: {
      name: 'Minh Thư',
      email: 'minhthu@gmail.com',
      avatar: 'MT'
    },
    product: {
      name: 'StepUp Sport Flyknit',
      image: '',
      category: 'Giày Sneakers'
    },
    rating: 4,
    purchaseDetails: 'Size: 38 | Màu: Trắng Hồng | Mua Online',
    date: '31 Tháng 5, 2026',
    comment: 'Giày rất đẹp, trọng lượng nhẹ đi chạy bộ cực kỳ sướng chân. Tuy nhiên hộp đựng giày khi nhận bị móp méo một xíu do bên vận chuyển đè nặng lên, mong shop bọc bong bóng khí dày hơn ở đơn sau nhé.',
    status: 'replied',
    reply: 'Chào Thư, SaigonShoes chân thành xin lỗi bạn về sự cố móp méo hộp do lỗi vận chuyển. Shop ghi nhận phản hồi và chắc chắn sẽ bọc đóng gói dày dặn hơn ở các đơn sau ạ!'
  },
  {
    id: 3,
    customer: {
      name: 'Hải Vy',
      email: 'haivy@gmail.com',
      avatar: 'HV'
    },
    product: {
      name: 'StepUp Pro Dunker',
      image: '',
      category: 'Giày Bóng Rổ'
    },
    rating: 2,
    purchaseDetails: 'Size: 40 | Màu: Đen Đỏ | Mua Online',
    date: '30 Tháng 5, 2026',
    comment: 'Đế giày hơi cứng so với mong đợi của em, mang đi thi đấu lâu bị đau gót chân một chút. Shop cho em hỏi bên mình có chính sách đổi trả hoặc lót đệm êm hơn hỗ trợ không ạ?',
    status: 'pending',
    reply: null
  },
  {
    id: 4,
    customer: {
      name: 'Tuấn Anh',
      email: 'tuananh@gmail.com',
      avatar: 'TA'
    },
    product: {
      name: 'StepUp Classic Crocs',
      image: '',
      category: 'Dép Sandals'
    },
    rating: 5,
    purchaseDetails: 'Size: 41 | Màu: Xám Đen | Mua tại Cửa hàng',
    date: '28 Tháng 5, 2026',
    comment: 'Dép đi mưa vô tư, bền đẹp và rất thời trang. Phù hợp cho những ngày mưa ngập ở Sài Gòn. Rất hài lòng về chất nhựa dẻo cao cấp của shop!',
    status: 'pending',
    reply: null
  }
])

const statTotal = computed(() => reviews.value.length)
const statUnreplied = computed(() => reviews.value.filter(r => r.status === 'pending').length)
const statAverage = computed(() => {
  if (reviews.value.length === 0) return '0.0'
  const totalStars = reviews.value.reduce((sum, r) => sum + r.rating, 0)
  return (totalStars / reviews.value.length).toFixed(1)
})

const filteredReviews = computed(() => {
  return reviews.value.filter(rev => {
    const matchesSearch = rev.customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          rev.comment.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          rev.product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
                          
    const matchesRating = ratingFilter.value === 'all' || rev.rating === parseInt(ratingFilter.value)
    const matchesStatus = statusFilter.value === 'all' || rev.status === statusFilter.value

    return matchesSearch && matchesRating && matchesStatus
  })
})

function getInitials(name) {
  if (!name) return 'US'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function getInitialsClass(name) {
  if (!name) return 'bg-orange-100 text-accent'
  if (name.includes('Thư')) return 'bg-pink-100 text-pink-600'
  if (name.includes('Vy')) return 'bg-teal-100 text-teal-600'
  if (name.includes('Anh')) return 'bg-blue-100 text-blue-600'
  return 'bg-orange-100 text-accent'
}

function isImageAvatar(avatar) {
  if (!avatar || typeof avatar !== 'string') return false
  return avatar.includes('.') || avatar.startsWith('http') || avatar.startsWith('data:') || avatar.startsWith('images/')
}

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

async function fetchReviews() {
  try {
    const response = await axiosInstance.get('/admin/reviews')
    if (response && response.success && Array.isArray(response.data)) {
      reviews.value = response.data.map(r => {
        let img = '/images/p1.png'
        if (r.product && r.product.image) {
          img = getImageUrl(r.product.image)
        }
        return {
          ...r,
          product: {
            ...r.product,
            image: img
          }
        }
      })
    }
  } catch (error) {
    console.error('Error fetching reviews from API, using mockup:', error)
  }
}

onMounted(() => {
  fetchReviews()
})

function handleReplyPrompt(rev) {
  Swal.fire({
    title: 'Trả lời đánh giá của ' + rev.customer.name,
    input: 'textarea',
    inputPlaceholder: 'Nhập nội dung tin nhắn tư vấn / cảm ơn gửi đến khách hàng...',
    inputValue: rev.reply || '',
    inputAttributes: {
      'aria-label': 'Phản hồi chăm sóc khách hàng'
    },
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Gửi phản hồi!',
    cancelButtonText: 'Hủy bỏ',
    preConfirm: (value) => {
      if (!value.trim()) {
        Swal.showValidationMessage('Vui lòng không để trống nội dung phản hồi!')
      }
      return value
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      const replyText = result.value.trim()

      try {
        const res = await axiosInstance.post(`/admin/reviews/${rev.id}/reply`, {
          reply: replyText
        })
        if (res && res.success) {
          rev.reply = replyText
          rev.status = 'replied'
          Swal.fire({
            icon: 'success',
            title: 'Đã phản hồi thành công!',
            text: 'Ý kiến chăm sóc khách hàng đã được lưu và hiển thị công khai trên Website.',
            confirmButtonColor: '#FF4D00'
          })
          fetchReviews()
        }
      } catch (e) {
        console.error('Lỗi gửi phản hồi đánh giá:', e)
        Swal.fire({
          icon: 'error',
          title: 'Gửi phản hồi thất bại!',
          text: e.response?.data?.message || 'Có lỗi xảy ra khi kết nối tới máy chủ.',
          confirmButtonColor: '#FF4D00'
        })
      }
    }
  })
}

async function toggleHide(rev) {
  const isCurrentlyHidden = rev.status === 'hidden'
  const newStatus = isCurrentlyHidden ? (rev.reply ? 'replied' : 'pending') : 'hidden'

  try {
    const res = await axiosInstance.put(`/admin/reviews/${rev.id}/status`, {
      status: newStatus
    })
    if (res && res.success) {
      rev.status = newStatus
      Swal.fire({
        icon: isCurrentlyHidden ? 'success' : 'warning',
        title: isCurrentlyHidden ? 'Đã khôi phục hiển thị!' : 'Đã ẩn bình luận!',
        text: isCurrentlyHidden 
          ? 'Bình luận của ' + rev.customer.name + ' đã hiển thị lại bình thường trên trang sản phẩm.'
          : 'Bình luận này đã bị chặn/ẩn khỏi trang chi tiết sản phẩm của người dùng!',
        confirmButtonColor: '#FF4D00'
      })
      fetchReviews()
    }
  } catch (e) {
    console.error('Lỗi chuyển đổi trạng thái ẩn/hiện:', e)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi cập nhật',
      text: 'Không thể cập nhật trạng thái hiển thị của đánh giá.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

function handleDeleteReview(id) {
  Swal.fire({
    title: 'Xác nhận xóa đánh giá?',
    text: 'Hành động này sẽ gỡ bỏ vĩnh viễn đánh giá của khách hàng và phản hồi liên quan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy bỏ'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/admin/reviews/${id}`)
        if (res && res.success) {
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa thành công!',
            text: 'Dữ liệu phản hồi đã bị loại bỏ khỏi hệ thống.',
            confirmButtonColor: '#FF4D00'
          })
          fetchReviews()
        }
      } catch (e) {
        console.error('Lỗi xóa đánh giá:', e)
        Swal.fire({
          icon: 'error',
          title: 'Xóa thất bại!',
          text: e.response?.data?.message || 'Không thể xóa đánh giá này.',
          confirmButtonColor: '#FF4D00'
        })
      }
    }
  })
}
</script>

<style scoped>
.animate-fade-in-quick {
  animation: fadeInQuick 0.2s ease-out;
}

@keyframes fadeInQuick {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
