<template>
  
    <div class="space-y-6">
      <!-- Page Header Title & Button -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl font-bold text-slate-900 tracking-wide">Quản lý Bài viết (Blog / Tin tức)</h1>
          <p class="text-xs text-slate-400 mt-0.5">Quản lý và xuất bản các tin tức xu hướng, hướng dẫn vệ sinh và các chiến dịch của SaigonShoes.</p>
        </div>
        <button @click="openAddModal" class="inline-flex items-center gap-2 bg-accent text-white px-5 py-3 rounded-xl text-sm font-semibold tracking-wide hover:bg-accent-hover transition-all active:scale-[0.98] shadow-lg shadow-accent/20 cursor-pointer w-fit text-left border-none">
          <i class="ti ti-plus text-lg"></i> Viết bài mới
        </button>
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <!-- Total Posts -->
        <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-slate-100 group-hover:text-accent/10 transition-colors duration-300">
            <i class="ti ti-news text-5xl"></i>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng số bài viết</p>
          <p class="text-2xl font-bold text-slate-800 mt-2">{{ statTotal }}</p>
          <p class="text-[10px] text-green-500 mt-1 flex items-center gap-1">
            <i class="ti ti-trending-up"></i> +2 bài viết tuần này
          </p>
        </div>

        <!-- Published Posts -->
        <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-slate-100 group-hover:text-green-500/10 transition-colors duration-300">
            <i class="ti ti-circle-check text-5xl"></i>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Đã xuất bản</p>
          <p class="text-2xl font-bold mt-2 text-green-600">{{ statPublished }}</p>
          <p class="text-[10px] text-slate-400 mt-1">Đang hiển thị trên Website</p>
        </div>

        <!-- Draft Posts -->
        <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-slate-100 group-hover:text-yellow-500/10 transition-colors duration-300">
            <i class="ti ti-file-pencil text-5xl"></i>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Bài viết nháp</p>
          <p class="text-2xl font-bold mt-2 text-yellow-600">{{ statDraft }}</p>
          <p class="text-[10px] text-slate-400 mt-1">Chờ biên tập viên phê duyệt</p>
        </div>

        <!-- Total Views -->
        <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-slate-100 group-hover:text-blue-500/10 transition-colors duration-300">
            <i class="ti ti-eye text-5xl"></i>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng lượt xem</p>
          <p class="text-2xl font-bold mt-2 text-blue-600">{{ statViews.toLocaleString() }}</p>
          <p class="text-[10px] text-green-500 mt-1 flex items-center gap-1">
            <i class="ti ti-trending-up"></i> +15% so với tháng trước
          </p>
        </div>
      </div>

      <!-- Toolbar & Filter Area -->
      <div class="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Search -->
        <div class="relative w-full md:w-80">
          <i class="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tìm kiếm bài viết..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-semibold"
          >
        </div>

        <!-- Category & Status Filters -->
        <div class="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          <select 
            v-model="selectedCat" 
            class="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-650 text-slate-700 outline-none cursor-pointer focus:border-accent transition-colors font-semibold"
          >
            <option value="all">Tất cả chuyên mục</option>
            <option value="Xu hướng">Xu hướng</option>
            <option value="Hướng dẫn">Hướng dẫn</option>
            <option value="Sự kiện">Sự kiện</option>
            <option value="Khuyến mãi">Khuyến mãi</option>
          </select>

          <select 
            v-model="selectedStatus" 
            class="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-650 text-slate-700 outline-none cursor-pointer focus:border-accent transition-colors font-semibold"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
          </select>
        </div>
      </div>

      <!-- Main Listing Table Card -->
      <div class="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                <th class="py-4 px-6">Bài viết</th>
                <th class="py-4 px-6">Chuyên mục</th>
                <th class="py-4 px-6">Lượt xem</th>
                <th class="py-4 px-6">Trạng thái</th>
                <th class="py-4 px-6">Ngày tạo</th>
                <th class="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              <tr 
                v-for="post in filteredPosts" 
                :key="post.id" 
                class="hover:bg-slate-50/75 transition-colors border-b border-slate-100 text-slate-600 font-medium"
              >
                <td class="py-4 px-6 font-semibold text-slate-800 max-w-70">
                  <div class="flex items-center gap-3">
                    <div class="h-12 w-16 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                      <img :src="getImageUrl(post.image)" alt="Thumb" class="h-full w-full object-cover">
                    </div>
                    <span class="truncate block hover:text-accent cursor-pointer transition-colors text-left" :title="post.title">{{ post.title }}</span>
                  </div>
                </td>
                <td class="py-4 px-6 text-left">
                  <span class="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-semibold uppercase tracking-wider">{{ post.category }}</span>
                </td>
                <td class="py-4 px-6 font-semibold text-left">{{ post.views.toLocaleString() }}</td>
                <td class="py-4 px-6 text-left">
                  <span 
                    v-if="post.status === 'published'" 
                    class="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 whitespace-nowrap"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>Đã công khai
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold bg-yellow-50 text-yellow-600 whitespace-nowrap"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>Bản nháp
                  </span>
                </td>
                <td class="py-4 px-6 text-slate-400 font-medium text-left">{{ post.date }}</td>
                <td class="py-4 px-6 text-right">
                  <div class="flex items-center gap-1 justify-end">
                    <button 
                      @click="openEditModal(post)"
                      class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                    >
                      Chỉnh sửa
                    </button>
                    <button @click="handleDelete(post.id)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-colors cursor-pointer border-none bg-transparent" title="Xóa">
                      <i class="ti ti-trash text-base"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="text-center py-16">
          <i class="ti ti-news text-5xl text-slate-200 block mb-3 animate-pulse"></i>
          <p class="text-sm font-semibold text-slate-800">Không tìm thấy bài viết nào</p>
          <p class="text-xs text-slate-400 mt-1">Vui lòng điều chỉnh điều kiện lọc hoặc từ khóa tìm kiếm.</p>
        </div>
      </div>
    </div>

    <!-- Slide-over / Modal for Writing or Editing post -->
    <div 
      v-if="modalOpen" 
      class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick"
    >
      <!-- Backdrop -->
      <div @click="closeModal" class="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      
      <!-- Modal content -->
      <div class="bg-white rounded-3xl w-full max-w-160 shadow-2xl border border-slate-100 z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <header class="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 class="font-display text-lg font-bold text-slate-900 tracking-wide">
            {{ isEditMode ? 'Chỉnh sửa bài viết 📝' : 'Viết bài mới 📝' }}
          </h3>
          <button @click="closeModal" class="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer">
            <i class="ti ti-x text-lg"></i>
          </button>
        </header>
        
        <form @submit.prevent="savePost" class="flex-1 overflow-y-auto p-6 space-y-4 text-left">
          <!-- Title input -->
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tiêu đề bài viết <span class="text-accent">*</span></label>
            <input 
              type="text" 
              v-model="formPost.title" 
              required 
              placeholder="Nhập tiêu đề hấp dẫn..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-semibold"
            >
          </div>

          <!-- Category & Status -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Chuyên mục <span class="text-accent">*</span></label>
              <select 
                v-model="formPost.category" 
                required 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-650 text-slate-700 outline-none cursor-pointer focus:border-accent focus:bg-white transition-all font-semibold"
              >
                <option value="Xu hướng">Xu hướng</option>
                <option value="Hướng dẫn">Hướng dẫn</option>
                <option value="Sự kiện">Sự kiện</option>
                <option value="Khuyến mãi">Khuyến mãi</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Trạng thái <span class="text-accent">*</span></label>
              <select 
                v-model="formPost.status" 
                required 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-650 text-slate-700 outline-none cursor-pointer focus:border-accent focus:bg-white transition-all font-semibold"
              >
                <option value="published">Đã xuất bản (Công khai)</option>
                <option value="draft">Bản nháp (Nội bộ)</option>
              </select>
            </div>
          </div>

          <!-- Thumbnail field -->
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Hình ảnh đại diện (URL hoặc tên ảnh local) <span class="text-accent">*</span></label>
            <input 
              type="text" 
              v-model="formPost.image" 
              required 
              placeholder="Nhập đường dẫn URL ảnh (ví dụ: https://i.postimg.cc/...) hoặc tên ảnh..."
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-semibold"
            >
          </div>

          <!-- Excerpt text -->
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tóm tắt ngắn <span class="text-accent">*</span></label>
            <textarea 
              v-model="formPost.excerpt" 
              required 
              rows="2" 
              placeholder="Tóm tắt ngắn gọn nội dung hiển thị ở danh sách bài viết..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all resize-none font-medium"
            ></textarea>
          </div>

          <!-- Detailed Rich Text Area -->
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Nội dung chi tiết bài viết <span class="text-accent">*</span></label>
            <textarea 
              v-model="formPost.content" 
              required 
              rows="6" 
              placeholder="Viết nội dung bài đăng của bạn ở đây. Hỗ trợ hiển thị dạng văn bản dài..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all resize-none font-medium"
            ></textarea>
          </div>

          <!-- Action Button in form -->
          <div class="flex justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
            <button 
              type="button" 
              @click="closeModal" 
              class="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-655 text-slate-600 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              class="px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover text-xs font-semibold transition-colors cursor-pointer border-none"
            >
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const searchQuery = ref('')
const selectedCat = ref('all')
const selectedStatus = ref('all')

const modalOpen = ref(false)
const isEditMode = ref(false)

const posts = ref([
  {
    id: 1,
    title: 'Sự kiện ra mắt bộ sưu tập giới hạn "Future Walk" của SaigonShoes',
    category: 'Sự kiện',
    excerpt: 'Chiêm ngưỡng những siêu phẩm Sneaker mang phong cách tương lai với sự kết hợp đột phá giữa nghệ thuật thiết kế đương đại.',
    content: 'Chiêm ngưỡng những siêu phẩm Sneaker mang phong cách tương lai với sự kết hợp đột phá giữa nghệ thuật thiết kế đương đại. Trải nghiệm tuyệt vời cùng chất liệu siêu bền chắc và cảm giác thoải mái chưa từng có.',
    date: '15 Tháng 5, 2026',
    author: 'Admin',
    image: 'news_featured.png',
    views: 1240,
    status: 'published'
  },
  {
    id: 2,
    title: 'Cách vệ sinh giày Sneaker trắng luôn sáng bóng như mới tại nhà',
    category: 'Hướng dẫn',
    excerpt: 'Giày trắng bị bám bẩn luôn là nỗi phiền toái lớn của cộng đồng yêu giày. Khám phá 5 bước đơn giản cực dễ dàng.',
    content: 'Giày trắng bị bám bẩn luôn là nỗi phiền toái lớn của cộng đồng yêu giày. Khám phá 5 bước đơn giản cực dễ dàng bằng giấm, baking soda hoặc cồn y tế loại nhẹ giúp duy trì độ trắng sáng tự nhiên tốt nhất.',
    date: '12 Tháng 5, 2026',
    author: 'Admin',
    image: 'news_1.png',
    views: 954,
    status: 'published'
  },
  {
    id: 3,
    title: 'Gợi ý các outfit phối đồ với Sneaker cực chất năng động cho mùa hè',
    category: 'Xu hướng',
    excerpt: 'Mùa hè năng động chính là thời điểm hoàn hảo nhất để bạn trình diễn các outfit thời trang đầy màu sắc của mình.',
    content: 'Mùa hè năng động chính là thời điểm hoàn hảo nhất để bạn trình diễn các outfit thời trang đầy màu sắc của mình. Kết hợp giữa quần shorts, áo phông rộng và đôi Sneaker cổ thấp thời thượng.',
    date: '10 Tháng 5, 2026',
    author: 'Editor',
    image: 'news_2.png',
    views: 742,
    status: 'published'
  },
  {
    id: 4,
    title: 'Đại tiệc sinh nhật SaigonShoes tròn 5 tuổi - Bùng nổ giảm giá tới 50%',
    category: 'Khuyến mãi',
    excerpt: 'Mừng cột mốc sinh nhật đáng nhớ, SaigonShoes mang đến chương trình ưu đãi lớn nhất năm với hàng ngàn deal sốc.',
    content: 'Mừng cột mốc sinh nhật đáng nhớ, SaigonShoes mang đến chương trình ưu đãi lớn nhất năm với hàng ngàn deal sốc áp dụng cho toàn bộ các cửa hàng chi nhánh trên toàn quốc và Website đặt hàng online.',
    date: '08 Tháng 5, 2026',
    author: 'Admin',
    image: 'cat1.png',
    views: 2420,
    status: 'published'
  },
  {
    id: 5,
    title: 'Bản thảo: Top 5 xu hướng giày thể thao dự kiến lên ngôi cuối năm 2026',
    category: 'Xu hướng',
    excerpt: 'Khám phá sớm các công nghệ đột phá, chất liệu đế đệm siêu đàn hồi sẽ thống trị tủ đồ của các Sneakerheads.',
    content: 'Khám phá sớm các công nghệ đột phá, chất liệu đế đệm siêu đàn hồi sẽ thống trị tủ đồ của các Sneakerheads trong tương lai gần.',
    date: '30 Tháng 5, 2026',
    author: 'Editor',
    image: 'news_2.png',
    views: 0,
    status: 'draft'
  },
  {
    id: 6,
    title: 'Bản thảo: Hướng dẫn chi tiết cách đo size chân chuẩn để đặt giày từ xa',
    category: 'Hướng dẫn',
    excerpt: 'Tránh hoàn toàn tình trạng đặt sai size, chật gót hoặc kích mũi giày với cách đo bàn chân bằng thước chuẩn xác.',
    content: 'Tránh hoàn toàn tình trạng đặt sai size, chật gót hoặc kích mũi giày với cách đo bàn chân bằng thước chuẩn xác.',
    date: '28 Tháng 5, 2026',
    author: 'Admin',
    image: 'news_1.png',
    views: 0,
    status: 'draft'
  }
])

const formPost = ref({
  id: '',
  title: '',
  category: 'Xu hướng',
  status: 'published',
  image: 'news_featured.png',
  excerpt: '',
  content: ''
})

// Statistics computed dynamically
const statTotal = computed(() => posts.value.length)
const statPublished = computed(() => posts.value.filter(p => p.status === 'published').length)
const statDraft = computed(() => posts.value.filter(p => p.status === 'draft').length)
const statViews = computed(() => posts.value.reduce((sum, p) => sum + p.views, 0))

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCat = selectedCat.value === 'all' || post.category === selectedCat.value
    const matchesStatus = selectedStatus.value === 'all' || post.status === selectedStatus.value

    return matchesSearch && matchesCat && matchesStatus
  })
})

function getImageUrl(image) {
  if (!image) return '/images/news_featured.png'
  if (image.startsWith('http') || image.startsWith('data:')) return image
  return `/images/${image}`
}

async function fetchBlogs() {
  try {
    const response = await axiosInstance.get('/admin/blogs')
    if (response && response.success && response.data) {
      const backendBlogs = response.data.data || []
      posts.value = backendBlogs.map(blog => ({
        id: blog.id,
        title: blog.name,
        category: blog.featuring ? 'Sự kiện' : 'Xu hướng',
        excerpt: blog.comment || '',
        content: blog.content || '',
        date: new Date(blog.created_at).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        author: 'Admin',
        image: blog.avatar || 'news_featured.png',
        views: blog.views || 0,
        status: 'published',
        featuring: blog.featuring ? true : false
      }))
    }
  } catch (error) {
    console.error('Error fetching blogs from API, using mockup:', error)
  }
}

onMounted(() => {
  fetchBlogs()
})

function openAddModal() {
  isEditMode.value = false
  formPost.value = {
    id: '',
    title: '',
    category: 'Xu hướng',
    status: 'published',
    image: 'news_featured.png',
    excerpt: '',
    content: '',
    featuring: false
  }
  modalOpen.value = true
}

function openEditModal(post) {
  isEditMode.value = true
  formPost.value = { ...post }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function savePost() {
  const payload = {
    name: formPost.value.title,
    avatar: formPost.value.image,
    comment: formPost.value.excerpt,
    content: formPost.value.content,
    featuring: formPost.value.featuring || (formPost.value.category === 'Sự kiện')
  }

  if (isEditMode.value) {
    try {
      await axiosInstance.post(`/admin/blogs/${formPost.value.id}`, payload)
      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật bài viết!',
        text: 'Các thông tin chỉnh sửa đã được lưu thành công.',
        confirmButtonColor: '#FF4D00'
      })
      await fetchBlogs()
    } catch (e) {
      console.error('Backend API update failed:', e)
    }
  } else {
    try {
      await axiosInstance.post('/admin/blogs', payload)
      Swal.fire({
        icon: 'success',
        title: 'Đã thêm bài viết mới!',
        text: 'Bài viết mới đã được lưu thành công vào cơ sở dữ liệu.',
        confirmButtonColor: '#FF4D00'
      })
      await fetchBlogs()
    } catch (e) {
      console.error('Backend API create failed:', e)
    }
  }
  modalOpen.value = false
}

function handleDelete(id) {
  Swal.fire({
    title: 'Xác nhận xóa bài viết?',
    text: 'Hành động này sẽ gỡ hoàn toàn bài viết và không thể khôi phục lại!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy bỏ'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/admin/blogs/${id}`)
        Swal.fire({
          icon: 'success',
          title: 'Đã xóa bài viết!',
          text: 'Bài viết đã bị gỡ bỏ vĩnh viễn khỏi hệ thống.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchBlogs()
      } catch (e) {
        console.error('Backend API delete failed:', e)
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
