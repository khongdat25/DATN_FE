<template>
  <HomeLayout>
    <!-- News Hero -->
    <section class="bg-surface2 py-16 text-center relative overflow-hidden">
      <div class="absolute w-[300px] h-[300px] rounded-full bg-accent/5 blur-[60px] top-10 right-10 pointer-events-none"></div>
      <div class="absolute w-[200px] h-[200px] rounded-full bg-accent2/5 blur-[50px] bottom-10 left-10 pointer-events-none"></div>

      <div class="max-w-[1200px] mx-auto px-5 relative z-10 text-left sm:text-center">
        <div class="flex sm:justify-center gap-2 text-xs text-text-dim mb-4 font-semibold uppercase tracking-wider">
          <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
          <span>/</span>
          <span class="text-text">Tin tức</span>
        </div>
        <h1 class="font-display text-[clamp(32px,5vw,48px)] font-extrabold text-text tracking-wide mb-4">
          TIN TỨC & <span class="text-accent">BLOG</span>
        </h1>
        <p class="text-text-muted max-w-xl sm:mx-auto text-sm sm:text-base leading-relaxed">
          Cập nhật những xu hướng thời trang sneaker mới nhất, các hướng dẫn bảo quản hữu ích và các sự kiện độc quyền từ cộng đồng SaigonShoes.
        </p>
      </div>
    </section>

    <!-- Categories Filter Bar -->
    <div class="bg-white border-b border-border sticky top-[72px] z-100 shadow-sm">
      <div class="max-w-[1200px] mx-auto px-5">
        <ul class="flex justify-start md:justify-center gap-8 py-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          <li 
            v-for="cat in categories" 
            :key="cat"
            @click="activeCategory = cat"
            :class="['text-xs uppercase font-bold tracking-wider cursor-pointer transition-colors pb-1 border-b-2 select-none', activeCategory === cat ? 'border-accent text-accent' : 'border-transparent text-text-dim hover:text-text']"
          >
            {{ cat }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Featured News -->
    <section v-if="featuredNews" class="py-12 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5">
        <div 
          @click="goToDetail(featuredNews)"
          class="bg-white rounded-3xl overflow-hidden border border-border flex flex-col md:flex-row shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <!-- Left/Top Featured Image -->
          <div class="md:w-[55%] h-[300px] sm:h-[450px] overflow-hidden shrink-0 relative">
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
            <div class="w-full h-full bg-surface3 flex items-center justify-center text-4xl text-text-dim/30 font-display font-extrabold uppercase">
              {{ featuredNews.tag }} Image
            </div>
          </div>
          
          <!-- Right/Bottom Featured Content -->
          <div class="p-8 sm:p-12 flex flex-col justify-center text-left">
            <span class="bg-accent text-white py-1 px-4 text-[10px] font-bold uppercase rounded-full tracking-widest w-fit mb-4">
              {{ featuredNews.tag }}
            </span>
            <h2 class="font-display text-2xl sm:text-3xl font-extrabold text-text leading-snug group-hover:text-accent transition-colors mb-4">
              {{ featuredNews.title }}
            </h2>
            <p class="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
              {{ featuredNews.excerpt }}
            </p>
            
            <div class="flex items-center gap-4 text-xs text-text-dim font-medium border-t border-border pt-6 mt-2">
              <span class="flex items-center gap-1.5"><i class="ti ti-calendar"></i> {{ featuredNews.date }}</span>
              <span class="flex items-center gap-1.5"><i class="ti ti-user"></i> By {{ featuredNews.author }}</span>
              <span class="flex items-center gap-1.5"><i class="ti ti-message-circle"></i> {{ featuredNews.comments }} Bình luận</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- News Grid -->
    <section class="py-12 bg-bg pb-20">
      <div class="max-w-[1200px] mx-auto px-5">
        <div v-if="filteredNews.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="item in paginatedNews" 
            :key="item.id"
            @click="goToDetail(item)"
            class="bg-white rounded-2xl overflow-hidden border border-border flex flex-col shadow-sm hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
          >
            <!-- Thumbnail -->
            <div class="h-56 bg-surface3 flex items-center justify-center text-2xl text-text-dim/30 font-display font-bold uppercase overflow-hidden shrink-0 relative">
              {{ item.tag }}
            </div>
            
            <!-- Info Content -->
            <div class="p-6 flex flex-col flex-1 text-left">
              <span :class="['py-0.5 px-3 text-[9px] font-bold uppercase rounded-full tracking-widest w-fit mb-3 text-white', getTagColor(item.tag)]">
                {{ item.tag }}
              </span>
              <h3 class="font-bold text-text text-base leading-snug group-hover:text-accent transition-colors mb-3">
                {{ item.title }}
              </h3>
              <p class="text-text-muted text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                {{ item.excerpt }}
              </p>
              
              <div class="flex items-center justify-between border-t border-border pt-4 mt-auto">
                <span class="text-[11px] text-text-dim font-medium">{{ item.date }}</span>
                <span class="text-accent text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Đọc tiếp <i class="ti ti-arrow-right"></i>
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white border border-border rounded-2xl shadow-sm">
          <i class="ti ti-news text-[50px] text-text-dim block mb-3"></i>
          <p class="text-text-muted text-sm font-semibold">Chưa có tin tức nào trong danh mục này.</p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-12">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)" 
            :disabled="currentPage === 1" 
            class="w-10 h-10 border border-border rounded-xl flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-50 cursor-pointer"
          >
            <i class="ti ti-chevron-left"></i>
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            @click="currentPage = page"
            :class="['w-10 h-10 font-bold rounded-xl transition-all cursor-pointer', currentPage === page ? 'bg-accent text-white' : 'border border-border text-text-muted hover:border-accent hover:text-accent bg-white']"
          >
            {{ page }}
          </button>
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)" 
            :disabled="currentPage === totalPages" 
            class="w-10 h-10 border border-border rounded-xl flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-50 cursor-pointer"
          >
            <i class="ti ti-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-[#111111] py-16 text-white text-center">
      <div class="max-w-[1200px] mx-auto px-5 flex flex-col items-center">
        <h2 class="font-display text-2xl sm:text-3xl font-extrabold tracking-wide mb-3 uppercase">Đăng ký nhận tin tức mới nhất</h2>
        <p class="text-white/60 text-xs sm:text-sm max-w-md mb-8">Đừng bỏ lỡ những thông tin cập nhật về sản phẩm giới hạn độc quyền và các sự kiện ưu đãi từ SaigonShoes.</p>
        
        <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
          <input 
            type="email" 
            required 
            v-model="newsletterEmail" 
            placeholder="Nhập email của bạn..." 
            class="flex-1 bg-white/10 border border-white/15 rounded-xl py-3.5 px-5 text-sm text-white outline-none focus:border-accent focus:bg-white/15 transition-all placeholder:text-white/40"
          >
          <button type="submit" class="bg-accent text-white py-3.5 px-8 font-display font-bold text-xs uppercase rounded-xl tracking-wider hover:bg-accent-hover transition-colors active:scale-95 cursor-pointer shadow-md">
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  </HomeLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import Swal from 'sweetalert2'

const router = useRouter()

const categories = ['Tất cả', 'Xu hướng', 'Hướng dẫn', 'Sự kiện', 'Khuyến mãi']
const activeCategory = ref('Tất cả')

const newsletterEmail = ref('')

const newsList = ref([
  {
    id: 1,
    tag: 'Sự kiện',
    title: 'Sự kiện ra mắt bộ sưu tập giới hạn "Future Walk" của SaigonShoes',
    excerpt: 'Chiêm ngưỡng những siêu phẩm Sneaker mang phong cách tương lai với sự kết hợp đột phá giữa nghệ thuật thiết kế đương đại và chất liệu bảo vệ môi trường hoàn hảo. Cơ hội có 1-không-2 để sở hữu 1 trong 100 đôi sneaker giới hạn duy nhất trên thế giới.',
    date: '15 Tháng 5, 2026',
    author: 'Admin',
    comments: 12,
    isFeatured: true
  },
  {
    id: 2,
    tag: 'Hướng dẫn',
    title: 'Cách vệ sinh giày Sneaker trắng luôn sáng bóng như mới tại nhà',
    excerpt: 'Giày trắng bị bám bẩn luôn là nỗi phiền toái lớn của cộng đồng yêu giày. Tuy nhiên việc vệ sinh sẽ cực kỳ đơn giản nếu bạn áp dụng đúng 5 bước vàng chuẩn salon cực kỳ dễ dàng sau đây tại nhà.',
    date: '12 Tháng 5, 2026',
    isFeatured: false
  },
  {
    id: 3,
    tag: 'Xu hướng',
    title: 'Gợi ý các outfit phối đồ với Sneaker cực chất năng động cho mùa hè',
    excerpt: 'Mùa hè năng động chính là thời điểm hoàn hảo nhất để bạn trình diễn các outfit thời trang đầy màu sắc của mình. Cùng SaigonShoes điểm qua top 5 cách phối đồ cực cá tính và trendy năm nay.',
    date: '10 Tháng 5, 2026',
    isFeatured: false
  },
  {
    id: 4,
    tag: 'Khuyến mãi',
    title: 'Đại tiệc sinh nhật SaigonShoes tròn 5 tuổi - Bùng nổ giảm giá tới 50%',
    excerpt: 'Mừng cột mốc sinh nhật đáng nhớ, SaigonShoes mang đến chương trình ưu đãi lớn nhất năm. Cơ hội săn ngay những đôi sneaker và Crocs mơ ước với mức giá siêu hời và hàng ngàn quà tặng độc quyền đi kèm.',
    date: '08 Tháng 5, 2026',
    isFeatured: false
  },
  {
    id: 5,
    tag: 'Hướng dẫn',
    title: 'Bật mí cách chọn size giày chuẩn xác tuyệt đối khi mua hàng online',
    excerpt: 'Lo lắng giày mua online bị chật hoặc rộng chân? Hãy bỏ túi ngay cách đo chiều dài bàn chân và bảng quy đổi size giày nam nữ, trẻ em cực chi tiết này để luôn tự tin chốt đơn từ xa.',
    date: '05 Tháng 5, 2026',
    isFeatured: false
  },
  {
    id: 6,
    tag: 'Xu hướng',
    title: 'Review chi tiết siêu phẩm đệm khí StepUp Air Max One',
    excerpt: 'Tại sao dòng giày Air Max One với hệ thống đệm khí lộ hông đặc trưng vẫn giữ vững ngôi vương "giày quốc dân" được giới trẻ săn lùng nhất mỗi năm? Hãy cùng khám phá chi tiết tại bài viết này.',
    date: '01 Tháng 5, 2026',
    isFeatured: false
  },
  {
    id: 7,
    tag: 'Sự kiện',
    title: 'SaigonShoes đồng hành tài trợ chính thức cùng giải chạy Marathon TP.HCM',
    excerpt: 'Chúng tôi vô cùng tự hào là đơn vị tài trợ giày chạy bộ và đồng hành chăm sóc sức khỏe bàn chân cho hàng ngàn vận động viên tham dự giải chạy bộ lớn nhất năm. Hãy cùng xem lại những hình ảnh đáng nhớ.',
    date: '28 Tháng 4, 2026',
    isFeatured: false
  }
])

const featuredNews = computed(() => {
  return newsList.value.find(item => item.isFeatured)
})

// Filtered list
const filteredNews = computed(() => {
  let list = newsList.value.filter(item => !item.isFeatured)
  if (activeCategory.value !== 'Tất cả') {
    list = list.filter(item => item.tag === activeCategory.value)
  }
  return list
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil(filteredNews.value.length / itemsPerPage))

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredNews.value.slice(start, start + itemsPerPage)
})

function getTagColor(tag) {
  if (tag === 'Sự kiện') return 'bg-red-500'
  if (tag === 'Hướng dẫn') return 'bg-blue-500'
  if (tag === 'Xu hướng') return 'bg-teal-500'
  if (tag === 'Khuyến mãi') return 'bg-gold'
  return 'bg-accent'
}

function handleSubscribe() {
  Swal.fire({
    icon: 'success',
    title: 'Đăng ký thành công! ✉️',
    text: `SaigonShoes đã lưu địa chỉ email ${newsletterEmail.value}. Chúng tôi sẽ gửi các bản tin ưu đãi sớm nhất tới bạn.`,
    confirmButtonColor: '#FF4D00'
  }).then(() => {
    newsletterEmail.value = ''
  })
}

function goToDetail(item) {
  router.push({ name: 'news-detail', params: { id: item.id } })
}
</script>

<style scoped>
/* Scrollbar hide utility */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
