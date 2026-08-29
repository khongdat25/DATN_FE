<template>
  <section class="py-8" id="blog">
    <div class="max-w-300 mx-auto px-5">
      <div class="section-wrapper">
        <div class="flex justify-between items-end mb-9 text-left">
          <div>
            <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px] font-bold">TIN TỨC & PHONG CÁCH</h2>
            <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Xu hướng, tips mix đồ và tin tức sneaker mới nhất</p>
          </div>
          <router-link to="/news" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-1.5 transition-all whitespace-nowrap font-medium hover:gap-2.5">Tất cả bài viết <i class="ti ti-arrow-right"></i></router-link>
        </div>

        <div class="grid grid-cols-3 max-md:grid-cols-1 gap-5">
          <div
            v-for="post in posts"
            :key="post.id"
            class="bg-bg border border-border rounded-md overflow-hidden transition-all hover:border-border-light hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,.06)]"
          >
            <div class="h-45 bg-surface2 flex items-center justify-center relative overflow-hidden">
              <img v-if="post.image" :src="getImageUrl(post.image)" alt="Thumb" class="w-full h-full object-cover">
              <span v-else class="text-[60px]">{{ post.icon || '👟' }}</span>
              <div class="absolute inset-0 bg-linear-to-b from-transparent/30 to-white/70"></div>
              <span :class="['absolute top-3 left-3 text-[9px] tracking-[1.5px] uppercase py-1 px-2.5 rounded-sm z-2 font-bold', post.tagClass || 'bg-accent text-white']">{{ post.tag }}</span>
            </div>
            <div class="p-4.5 text-left">
              <div class="text-[11px] text-text-dim mb-2 tracking-[0.5px]">{{ post.date }}</div>
              <router-link :to="{ name: 'news-detail', params: { id: post.id } }">
                <h4 class="text-[15px] font-bold leading-[1.4] mb-2.5 text-text line-clamp-2 hover:text-accent transition-colors">{{ post.title }}</h4>
              </router-link>
              <p class="text-[13px] text-text-muted leading-[1.6] line-clamp-2 mb-3.5">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between pt-3 border-t border-border">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-surface2 flex items-center justify-center text-[12px] text-text-muted">👤</div>
                  <span class="text-[12px] text-text-muted font-medium">{{ post.author }}</span>
                </div>
                <button class="flex items-center gap-1.25 bg-transparent border-none text-[12px] cursor-pointer transition-colors" :style="{ color: post.liked ? 'var(--color-accent, #FF4D00)' : '' }" @click="likePost(post)">
                  <i class="ti ti-heart"></i> <span>{{ post.likes }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/api/axios.js'

const posts = ref([
  { id: 1, icon: '👟', tag: 'Phong Cách', tagClass: 'bg-accent text-white', date: '08 Tháng 5, 2026', title: 'Top 10 cách phối đồ với Sneaker trắng cực cool cho mùa hè 2026', excerpt: 'Sneaker trắng không bao giờ lỗi mốt. Cùng khám phá các cách mix-match giúp bạn tỏa sáng mỗi ngày với đôi giày trắng yêu thích.', author: 'Minh Anh', likes: 124, liked: false },
  { id: 2, icon: '🥿', tag: 'Review', tagClass: 'bg-accent text-white', date: '05 Tháng 5, 2026', title: 'Review Crocs Mega Crush 2026: Có đáng mua không? Trải nghiệm thực tế sau 3 tháng', excerpt: 'Crocs Mega Crush với đế cao 5cm đang làm mưa làm gió. Chúng mình đã dùng thử và đây là đánh giá trung thực nhất.', author: 'Hương Trà', likes: 89, liked: false },
  { id: 3, icon: '👟', tag: 'Xu Hướng', tagClass: 'bg-accent2-dim text-white', date: '02 Tháng 5, 2026', title: '5 đôi sneaker đang hot nhất 2026 mà mọi tín đồ streetwear phải có', excerpt: 'Từ Adidas Samba đến Nike Dunk Low — đây là những đôi sneaker đang được săn đón nhiều nhất trong năm nay.', author: 'Khánh', likes: 201, liked: false },
])

function getImageUrl(image) {
  if (!image) return '/images/news_featured.png'
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
    return image
  }
  if (image.startsWith('/images/')) {
    return image
  }
  const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'https://api.saigonshoes.io.vn/api').replace(/\/api$/, '')
  if (image.startsWith('images/') || image.startsWith('uploads/') || image.startsWith('storage/')) {
    return `${serverUrl}/${image}`
  }
  return `${serverUrl}/images/${image}`
}

async function fetchHomeBlogs() {
  try {
    const response = await axiosInstance.get('/blogs', { params: { limit: 3 } })
    if (response && (response.success || Array.isArray(response.data) || Array.isArray(response))) {
      const rawData = response.data?.data || response.data || response
      const backendBlogs = Array.isArray(rawData) ? rawData : []
      
      if (backendBlogs.length > 0) {
        posts.value = backendBlogs.slice(0, 3).map(blog => ({
          id: blog.id,
          icon: '👟',
          tag: blog.featuring || blog.is_featured ? 'Sự kiện' : 'Xu hướng',
          tagClass: (blog.featuring || blog.is_featured) ? 'bg-accent text-white' : 'bg-accent2-dim text-white',
          date: blog.created_at ? new Date(blog.created_at).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }) : 'Mới cập nhật',
          title: blog.name || blog.title,
          excerpt: blog.comment || blog.description || blog.excerpt || '',
          content: blog.content || '',
          author: blog.author || 'Admin',
          likes: blog.likes || 0,
          liked: false,
          image: blog.avatar || blog.image || ''
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching home blogs:', error)
  }
}

onMounted(() => {
  fetchHomeBlogs()
})

function likePost(post) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}
</script>
