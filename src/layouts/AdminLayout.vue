<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-100 w-64 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 transform md:translate-x-0 border-r border-slate-800',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="h-20 flex items-center justify-between px-6 border-b border-slate-800">
        <router-link to="/admin" class="flex items-center gap-2 select-none">
          <span class="font-display text-lg tracking-[2px] font-bold text-white">
            SAIGON<span class="text-accent font-extrabold">SHOES</span>
          </span>
          <span class="bg-accent/20 text-accent text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-accent/20">
            Admin
          </span>
        </router-link>
        <!-- Mobile close button -->
        <button @click="sidebarOpen = false" class="md:hidden text-slate-400 hover:text-white p-1 cursor-pointer">
          <i class="ti ti-x text-xl"></i>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div class="text-[10px] uppercase font-bold tracking-[2px] text-slate-500 px-3 mb-2">QUẢN TRỊ HỆ THỐNG</div>
        
        <template v-for="item in navItems" :key="item.name">
          <!-- Item with children (collapsible dropdown) -->
          <div v-if="item.children" class="space-y-1">
            <div 
              class="w-full flex items-center justify-between px-3.5 py-3 text-sm font-medium rounded-xl transition-all duration-200 group text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer select-none"
              :class="{ 
                'bg-slate-800/80 text-white font-semibold shadow-xs': isGroupChildActive(item)
              }"
              @click="toggleMenu(item.name)"
            >
              <div class="flex items-center gap-3">
                <i :class="['ti text-lg group-hover:scale-110 transition-transform', item.icon, isGroupChildActive(item) ? 'text-accent' : '']"></i>
                <span>{{ item.name }}</span>
              </div>
              <span class="p-1 hover:bg-slate-700/50 rounded-md transition-colors flex items-center justify-center">
                <i 
                  :class="[
                    'ti text-xs transition-transform duration-200', 
                    openMenus[item.name] ? 'ti-chevron-down rotate-180' : 'ti-chevron-down'
                  ]"
                ></i>
              </span>
            </div>
            
            <!-- Children sub-menu -->
            <div 
              v-show="openMenus[item.name]" 
              class="pl-9 pr-2 space-y-1 overflow-hidden transition-all duration-200"
            >
              <router-link 
                v-for="sub in item.children" 
                :key="sub.path" 
                :to="sub.path"
                class="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                :class="{ 'text-accent! bg-accent/10! font-bold': isSubItemActive(sub.path) }"
              >
                <span>•</span>
                <span>{{ sub.name }}</span>
              </router-link>
            </div>
          </div>

          <!-- Normal Item -->
          <router-link 
            v-else
            :to="item.path"
            class="flex items-center gap-3 px-3.5 py-3 text-sm font-medium rounded-xl transition-all duration-200 group text-slate-400 hover:bg-slate-800 hover:text-white"
            active-class="bg-accent! text-white! font-semibold shadow-lg shadow-accent/20"
          >
            <i :class="['ti text-lg group-hover:scale-110 transition-transform', item.icon]"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </template>
      </nav>

      <!-- User footer info -->
      <div class="p-4 border-t border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-sm">
            {{ adminInitial }}
          </div>
          <div class="min-w-0">
            <p class="text-xs font-bold truncate text-slate-200">{{ adminName }}</p>
            <p class="text-[10px] text-slate-400 truncate">Quản trị viên</p>
          </div>
        </div>
        <button 
          @click="handleLogout" 
          class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-all cursor-pointer" 
          title="Đăng xuất"
        >
          <i class="ti ti-logout text-lg"></i>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 md:pl-64 flex flex-col min-h-screen">
      <!-- Top Header -->
      <header class="h-20 bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-90 flex items-center justify-between px-6 md:px-8">
        <!-- Toggle button & Page Title -->
        <div class="flex items-center gap-4">
          <button 
            @click="sidebarOpen = !sidebarOpen" 
            class="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors cursor-pointer"
          >
            <i class="ti ti-menu-2 text-xl"></i>
          </button>
          
          <!-- Breadcrumbs -->
          <div class="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span class="hover:text-slate-600 cursor-pointer">Admin</span>
            <i class="ti ti-chevron-right text-[10px]"></i>
            <span class="text-slate-800 font-semibold uppercase tracking-wider text-[11px]">{{ currentPageName }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">

          <!-- Account Dropdown -->
          <div class="relative group">
            <button class="flex items-center gap-3 p-1.5 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer">
              <div class="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-sm">
                {{ adminInitial }}
              </div>
              <div class="hidden sm:block text-left leading-none">
                <span class="text-xs font-semibold text-slate-800 block truncate max-w-25">{{ adminName }}</span>
                <span class="text-[9px] uppercase tracking-wider font-bold text-accent block mt-0.5">Quản trị viên</span>
              </div>
              <i class="ti ti-chevron-down text-xs text-slate-400"></i>
            </button>
            
            <div class="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 w-44 bg-white border border-slate-100 rounded-xl shadow-xl py-1 z-100">
              <router-link to="/profile" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent transition-colors">Hồ sơ cá nhân</router-link>
              <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer font-semibold">Đăng xuất</button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Slot -->
      <main class="flex-1 p-6 md:p-8 bg-slate-50/50">
        <div class="max-w-350 mx-auto animate-fade-in text-left">
          <slot />
        </div>
      </main>
    </div>

    <!-- Backdrop for mobile sidebar -->
    <div 
      v-if="sidebarOpen" 
      @click="sidebarOpen = false" 
      class="fixed inset-0 bg-slate-900/40 z-90 md:hidden backdrop-blur-xs transition-opacity duration-300"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/api/axios.js'

const sidebarOpen = ref(false)
const adminName = ref('Admin')
const route = useRoute()

const openMenus = ref({
  'Sản phẩm': true,
  'Mã giảm giá': true
})

function toggleMenu(name) {
  openMenus.value[name] = !openMenus.value[name]
}

function isSubItemActive(subPath) {
  const currentFullPath = route.fullPath
  if (subPath === '/admin/vouchers?type=order') {
    return currentFullPath === '/admin/vouchers' || currentFullPath === '/admin/vouchers?type=order'
  }
  return currentFullPath === subPath
}

function isGroupChildActive(item) {
  return item.children && item.children.some(sub => isSubItemActive(sub.path))
}

watch(() => route.fullPath, (newPath) => {
  if (['/admin/products', '/admin/sizes', '/admin/colors', '/admin/brands'].some(p => newPath.includes(p))) {
    openMenus.value['Sản phẩm'] = true
  }
  if (newPath.includes('/admin/vouchers')) {
    openMenus.value['Mã giảm giá'] = true
  }
}, { immediate: true })

const navItems = [
  { name: 'Tổng quan', path: '/admin', icon: 'ti-layout-dashboard' },
  { 
    name: 'Sản phẩm', 
    icon: 'ti-shoe',
    children: [
      { name: 'Danh sách sản phẩm', path: '/admin/products' },
      { name: 'Quản lý Size', path: '/admin/sizes' },
      { name: 'Quản lý Màu sắc', path: '/admin/colors' },
      { name: 'Quản lý Thương hiệu', path: '/admin/brands' }
    ]
  },
  { name: 'Danh mục', path: '/admin/categories', icon: 'ti-category' },
  { name: 'Banner', path: '/admin/banners', icon: 'ti-photo' },
  { name: 'Đơn hàng', path: '/admin/orders', icon: 'ti-shopping-cart' },
  { 
    name: 'Mã giảm giá', 
    icon: 'ti-ticket',
    children: [
      { name: 'Mã giảm giá đơn hàng', path: '/admin/vouchers?type=order' },
      { name: 'Mã miễn phí vận chuyển', path: '/admin/vouchers?type=shipping' }
    ]
  },
  { name: 'Flash Sale', path: '/admin/flashsales', icon: 'ti-flame' },
  { name: 'Người dùng', path: '/admin/users', icon: 'ti-users' },
  { name: 'Bài viết (Blog)', path: '/admin/blogs', icon: 'ti-news' },
  { name: 'Đánh giá', path: '/admin/reviews', icon: 'ti-star' },
  { name: 'Liên hệ', path: '/admin/contacts', icon: 'ti-mail' },
]

const currentPageName = computed(() => {
  for (const item of navItems) {
    if (item.path === route.path) return item.name
    if (item.children) {
      const subItem = item.children.find(sub => sub.path === route.path)
      if (subItem) return subItem.name
    }
  }
  return 'Trang Quản Trị'
})

const adminInitial = computed(() => adminName.value ? adminName.value.substring(0, 2).toUpperCase() : 'AD')

function checkAdmin() {
  try {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      adminName.value = user.name || 'Quản trị viên'
    }
  } catch (e) {
    adminName.value = 'Quản trị viên'
  }
}

onMounted(() => {
  checkAdmin()
})

async function handleLogout() {
  localStorage.setItem('is_logging_out', 'true')
  try {
    await axiosInstance.post('/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    localStorage.removeItem('is_logging_out')
    window.location.href = '/'
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
