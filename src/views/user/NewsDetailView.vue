<template>
  
    <main class="py-12 bg-bg">
      <div class="max-w-300 mx-auto px-5">
        
        <!-- Main Two-Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <!-- Article Content Left Column -->
          <div class="lg:col-span-2 flex flex-col gap-6">
            
            <!-- Article Header -->
            <div class="text-left">
              <div class="flex items-center gap-2 text-xs text-text-dim mb-4 font-semibold uppercase tracking-wider">
                <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
                <i class="ti ti-chevron-right text-[10px]"></i>
                <router-link to="/news" class="hover:text-accent transition-colors">Tin tức</router-link>
                <i class="ti ti-chevron-right text-[10px]"></i>
                <span class="text-text font-bold">{{ article.tag }}</span>
              </div>
              
              <h1 class="font-display text-[clamp(24px,4vw,38px)] font-extrabold text-text leading-tight mb-4">
                {{ article.title }}
              </h1>
              
              <div class="flex flex-wrap items-center gap-4 text-xs text-text-muted font-medium border-b border-border pb-6">
                <span class="flex items-center gap-1.5"><i class="ti ti-calendar text-accent"></i> {{ article.date }}</span>
                <span class="flex items-center gap-1.5"><i class="ti ti-user text-accent"></i> Bởi {{ article.author }}</span>
                <span class="flex items-center gap-1.5"><i class="ti ti-eye text-accent"></i> {{ article.views }} Lượt xem</span>
              </div>
            </div>

            <!-- Main Feature Image -->
            <div class="border border-border bg-surface3 rounded-3xl h-70 sm:h-100 flex items-center justify-center overflow-hidden shadow-sm relative shrink-0">
              <img v-if="article.image" :src="getImageUrl(article.image)" alt="Featured" class="w-full h-full object-cover">
              <span v-else class="text-4xl text-text-dim/20 font-display font-extrabold uppercase">{{ article.tag }} Hero Image</span>
            </div>

            <!-- Article Body Content -->
            <div v-if="article.content" class="text-left text-sm sm:text-base text-text-muted leading-relaxed space-y-6" v-html="article.content">
            </div>
            <div v-else class="text-left text-sm sm:text-base text-text-muted leading-relaxed space-y-6">
              <p>Chào mừng bạn đến với kỷ nguyên mới của Sneaker. Tại sự kiện diễn ra vào tối qua tại TP.HCM, SaigonShoes đã chính thức trình làng bộ sưu tập được mong đợi nhất năm mang tên <strong>"Future Walk"</strong>. Đây không chỉ là một bộ sưu tập giày đơn thuần, mà còn là một tuyên ngôn vững chãi về sự giao thoa hoàn mỹ giữa công nghệ tương lai và nghệ thuật đương đại.</p>
              
              <p>Bộ sưu tập lần này được lấy cảm hứng từ những thành phố tương lai thông minh, nơi sự tối giản trong thiết kế và tính năng vượt trội được đặt lên hàng đầu. Mỗi đôi giày trong bộ sưu tập "Future Walk" đều sử dụng vật liệu tái chế sinh học cao cấp, giúp giảm thiểu tối đa tác động tiêu cực đến môi trường tự nhiên mà vẫn đảm bảo độ bền bỉ cùng sự êm ái tuyệt đối cho bàn chân của bạn.</p>

              <blockquote class="border-l-4 border-accent bg-surface2 p-6 rounded-r-2xl italic text-base sm:text-lg text-text font-medium my-6 shadow-sm">
                "Future Walk không chỉ là bước đi của ngày hôm nay, mà là tầm nhìn bền vững đầy tự hào của chúng tôi về một tương lai tràn đầy phong cách độc bản." - Giám đốc thiết kế SaigonShoes chia sẻ.
              </blockquote>

              <h2 class="font-display text-xl sm:text-2xl font-bold text-text pt-4">Công nghệ AI trong thiết kế</h2>
              <p>Điểm đặc biệt nhất của bộ sưu tập này chính là việc áp dụng thành công trí tuệ nhân tạo (AI) trong quá trình mô phỏng và thiết kế cấu trúc đế giày. AI đã giúp phân tích hàng triệu dữ liệu cảm biến bước chân thực tế của người dùng để tạo ra hệ thống đệm khí Air tối ưu hoàn hảo nhất từ trước đến nay.</p>
              
              <div class="border border-border bg-surface3 rounded-2xl h-50 sm:h-75 flex items-center justify-center text-2xl text-text-dim/20 font-display font-extrabold uppercase overflow-hidden shadow-sm">
                AI Technology Image
              </div>

              <p>Ngoài ra, hệ thống dây giày thông minh tự động điều chỉnh độ ôm theo form chân cũng là một điểm nhấn công nghệ đột phá không thể bỏ qua. Bạn chỉ cần xỏ chân vào, đôi giày sẽ tự động điều khiển áp lực ôm sát vừa vặn nhất.</p>

              <h2 class="font-display text-xl sm:text-2xl font-bold text-text pt-4">Số lượng phát hành giới hạn</h2>
              <p>Đúng như tinh thần của phiên bản "Limited Edition", SaigonShoes chỉ sản xuất đúng 100 đôi cho mỗi phối màu độc quyền. Mỗi đôi giày sẽ được đánh số thứ tự khắc laser từ 001 đến 100, tạo nên giá trị sưu tầm vô giá cho những tín đồ Sneaker chân chính.</p>
            </div>

            <!-- Tags & Share Buttons -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-border pt-6 mt-4">
              <div class="flex gap-2 flex-wrap">
                <span v-for="tag in article.tags" :key="tag" class="bg-surface2 text-text-muted py-1 px-4 text-xs font-semibold rounded-full border border-border">
                  {{ tag }}
                </span>
              </div>
              

            </div>

          </div>

          <!-- Sidebar Right Column -->
          <aside class="flex flex-col gap-8">
            
            <!-- Related Posts Widget -->
            <div class="border border-border bg-white rounded-2xl p-6 shadow-sm text-left">
              <h3 class="font-display text-sm font-bold text-text uppercase tracking-wider pb-3 border-b-2 border-text inline-block mb-6">
                Bài viết liên quan
              </h3>
              <div class="flex flex-col gap-5">
                <div 
                  v-for="post in relatedPosts" 
                  :key="post.id"
                  @click="goToOther(post)"
                  class="flex gap-4 items-center cursor-pointer group"
                >
                  <div class="w-16 h-16 bg-surface3 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-xs text-text-dim/40 font-bold uppercase border border-border">
                    Post
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-xs text-text group-hover:text-accent transition-colors leading-snug line-clamp-2">
                      {{ post.title }}
                    </h4>
                    <span class="text-[10px] text-text-dim font-medium block mt-1">{{ post.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Categories Widget -->
            <div class="border border-border bg-white rounded-2xl p-6 shadow-sm text-left">
              <h3 class="font-display text-sm font-bold text-text uppercase tracking-wider pb-3 border-b-2 border-text inline-block mb-6">
                Chuyên mục
              </h3>
              <ul class="flex flex-col gap-3">
                <li 
                  v-for="cat in widgetCategories" 
                  :key="cat.name"
                  @click="goToCategory(cat.name)"
                  class="flex justify-between items-center text-xs sm:text-sm font-bold text-text-muted hover:text-accent cursor-pointer transition-colors"
                >
                  <span>{{ cat.name }}</span>
                  <span class="text-text-dim">({{ cat.count }})</span>
                </li>
              </ul>
            </div>

            <!-- Tags Widget -->
            <div class="border border-border bg-white rounded-2xl p-6 shadow-sm text-left">
              <h3 class="font-display text-sm font-bold text-text uppercase tracking-wider pb-3 border-b-2 border-text inline-block mb-6">
                Tags phổ biến
              </h3>
              <div class="flex gap-2 flex-wrap">
                <span 
                  v-for="tag in popularTags" 
                  :key="tag"
                  class="bg-surface2 hover:bg-accent/10 border border-border text-text-muted hover:text-accent py-1.5 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

          </aside>

        </div>

      </div>
    </main>
  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const route = useRoute()
const router = useRouter()

const article = ref({
  id: 1,
  tag: 'Sự kiện',
  title: 'Sự kiện ra mắt bộ sưu tập giới hạn "Future Walk" của SaigonShoes',
  date: '15 Tháng 5, 2026',
  author: 'Admin',
  views: '1.240',
  tags: ['#Sneaker', '#FutureWalk', '#LimitedEdition'],
  image: 'news_featured.png',
  content: ''
})

const relatedPosts = [
  { id: 2, title: 'Cách vệ sinh giày Sneaker trắng luôn sáng bóng như mới tại nhà', date: '12 Tháng 5, 2026' },
  { id: 4, title: 'Đại tiệc sinh nhật SaigonShoes bùng nổ giảm giá tới 50%', date: '08 Tháng 5, 2026' },
  { id: 5, title: 'Bật mí cách chọn size giày chuẩn xác tuyệt đối khi mua online', date: '05 Tháng 5, 2026' }
]

const widgetCategories = [
  { name: 'Xu hướng', count: 12 },
  { name: 'Hướng dẫn', count: 8 },
  { name: 'Sự kiện', count: 5 },
  { name: 'Khuyến mãi', count: 10 }
]

const popularTags = ['Nike', 'Adidas', 'Jordan', 'Clean', 'Fashion', 'Sandal', 'Crocs']

function getImageUrl(image) {
  if (!image) return '/images/news_featured.png'
  if (image.startsWith('http') || image.startsWith('data:')) return image
  return `/images/${image}`
}

async function fetchArticleDetail() {
  try {
    const id = route.params.id
    const response = await axiosInstance.get(`/blogs/${id}`)
    if (response && response.success && response.data) {
      const blog = response.data
      article.value = {
        id: blog.id,
        tag: blog.featuring ? 'Sự kiện' : 'Xu hướng',
        title: blog.name,
        excerpt: blog.comment || '',
        content: blog.content || '',
        date: new Date(blog.created_at).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        author: 'Admin',
        views: blog.views || 0,
        image: blog.avatar || 'news_featured.png',
        tags: ['#Sneaker', '#SaigonShoes']
      }
    }
  } catch (error) {
    console.error('Error fetching blog detail:', error)
  }
}

onMounted(() => {
  fetchArticleDetail()
})

function shareArticle(platform) {
  Swal.fire({
    icon: 'info',
    title: `Chia sẻ qua ${platform}`,
    text: `Tính năng chia sẻ bài viết này qua mạng xã hội ${platform} đang được xử lý liên kết.`,
    confirmButtonColor: '#FF4D00'
  })
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href)
  Swal.fire({
    icon: 'success',
    title: 'Đã sao chép liên kết!',
    text: 'Đường dẫn bài viết đã được lưu vào khay nhớ tạm.',
    timer: 1500,
    showConfirmButton: false
  })
}

function goToOther(post) {
  router.push({ name: 'news-detail', params: { id: post.id } })
}

function goToCategory(catName) {
  router.push({ name: 'news' })
}
</script>

<style scoped>
</style>
