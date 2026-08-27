<template>
  <div class="min-h-screen bg-[#f9f9f9] pb-16">
    <!-- Breadcrumb & Header -->
    <div class="bg-white border-b border-slate-100 py-8">
      <div class="max-w-[1100px] mx-auto px-5">
        <h1 class="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">THÔNG BÁO CỦA TÔI</h1>
        <div class="flex items-center gap-2 text-xs text-slate-500 mt-2 font-semibold">
          <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
          <i class="ti ti-chevron-right text-[10px]"></i>
          <span class="text-slate-900 font-bold">Thông báo</span>
        </div>
      </div>
    </div>

    <!-- Container -->
    <div class="max-w-[1100px] mx-auto px-5 pt-8">
      <div class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        
        <!-- Filter Header Bar -->
        <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div class="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 md:pb-0">
            <button 
              v-for="tab in filterTabs" 
              :key="tab.key"
              @click="activeFilter = tab.key"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none',
                activeFilter === tab.key 
                  ? 'bg-accent text-white shadow-md shadow-accent/20 scale-[1.02]' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              ]"
            >
              {{ tab.label }}
              <span 
                v-if="getTabCount(tab.key) > 0"
                :class="[
                  'ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold',
                  activeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                ]"
              >
                {{ getTabCount(tab.key) }}
              </span>
            </button>
          </div>

          <button 
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover bg-orange-50/60 hover:bg-orange-100/80 px-4 py-2 rounded-xl border border-orange-100 transition-all cursor-pointer shrink-0"
          >
            <i class="ti ti-checks text-sm"></i> Đánh dấu tất cả đã đọc ({{ unreadCount }})
          </button>
        </div>

        <!-- Notification List -->
        <div class="divide-y divide-slate-100">
          <div 
            v-for="notif in filteredNotifs" 
            :key="notif.id"
            @click="handleNotifClick(notif)"
            :class="[
              'p-5 md:p-6 transition-all flex items-start gap-4 hover:bg-slate-50/80 cursor-pointer group relative',
              !notif.is_read ? 'bg-orange-50/20' : 'bg-white'
            ]"
          >
            <!-- Unread Indicator Dot -->
            <span v-if="!notif.is_read" class="w-2.5 h-2.5 bg-accent rounded-full absolute left-3 top-7 animate-pulse"></span>

            <!-- Icon -->
            <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-105 shadow-2xs', getNotifIconBg(notif.type), getNotifIconColor(notif.type)]">
              <i :class="getNotifIcon(notif.type)"></i>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0 pr-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 :class="['text-sm md:text-base font-bold transition-colors group-hover:text-accent', !notif.is_read ? 'text-slate-950 font-extrabold' : 'text-slate-800']">
                  {{ notif.title }}
                </h3>
                <span class="text-[11px] text-slate-400 font-semibold whitespace-nowrap">
                  {{ formatDate(notif.created_at) }}
                </span>
              </div>
              <p class="text-xs md:text-sm text-slate-600 leading-relaxed">
                {{ notif.body }}
              </p>
            </div>

            <!-- Action Arrow -->
            <div class="self-center text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all">
              <i class="ti ti-chevron-right text-lg"></i>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredNotifs.length === 0" class="py-16 px-6 text-center">
            <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-slate-400 shadow-inner">
              <i class="ti ti-bell-off"></i>
            </div>
            <h3 class="font-display text-lg font-bold text-slate-800 mb-1">Chưa có thông báo nào</h3>
            <p class="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              Bạn chưa có thông báo nào ở mục này. Các thông báo cập nhật về đơn hàng, ưu đãi mới sẽ xuất hiện tại đây!
            </p>
            <router-link 
              to="/products" 
              class="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-6 rounded-xl shadow-md transition-all no-underline"
            >
              <i class="ti ti-shopping-bag"></i> Khám phá sản phẩm ngay
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '@/api/axios.js'

const router = useRouter()
const activeFilter = ref('all')
const rawNotifications = ref([])

const filterTabs = [
  { key: 'all', label: 'Tất cả thông báo' },
  { key: 'order', label: '🚚 Đơn hàng' },
  { key: 'promo', label: '🎁 Ưu đãi & Voucher' },
  { key: 'system', label: '🔔 Hệ thống' },
]

onMounted(() => {
  fetchNotifications()
})

async function fetchNotifications() {
  const token = localStorage.getItem('access_token')
  if (!token) return
  try {
    const res = await axiosInstance.get('/notifications')
    if (res && res.success && Array.isArray(res.data)) {
      rawNotifications.value = res.data
    }
  } catch (e) {
    console.error('Failed to fetch notifications list:', e)
  }
}

const unreadCount = computed(() => {
  return rawNotifications.value.filter(n => !n.is_read).length
})

const filteredNotifs = computed(() => {
  if (activeFilter.value === 'all') return rawNotifications.value
  return rawNotifications.value.filter(n => {
    if (activeFilter.value === 'order') return n.type === 'order'
    if (activeFilter.value === 'promo') return n.type === 'voucher' || n.type === 'promo'
    if (activeFilter.value === 'system') return n.type === 'system'
    return true
  })
})

function getTabCount(key) {
  if (key === 'all') return rawNotifications.value.length
  return rawNotifications.value.filter(n => {
    if (key === 'order') return n.type === 'order'
    if (key === 'promo') return n.type === 'voucher' || n.type === 'promo'
    if (key === 'system') return n.type === 'system'
    return true
  }).length
}

function getNotifIcon(type) {
  if (type === 'order') return 'ti ti-truck-delivery'
  if (type === 'voucher' || type === 'promo') return 'ti ti-ticket'
  return 'ti ti-bell'
}

function getNotifIconBg(type) {
  if (type === 'order') return 'bg-blue-50 border border-blue-100'
  if (type === 'voucher' || type === 'promo') return 'bg-orange-50 border border-orange-100'
  return 'bg-slate-100 border border-slate-200'
}

function getNotifIconColor(type) {
  if (type === 'order') return 'text-blue-600'
  if (type === 'voucher' || type === 'promo') return 'text-accent'
  return 'text-slate-600'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + d.toLocaleDateString('vi-VN')
}

async function markAllAsRead() {
  try {
    await axiosInstance.post('/notifications/mark-all-read')
    rawNotifications.value.forEach(n => n.is_read = true)
  } catch (e) {
    console.error('Failed to mark all as read:', e)
  }
}

async function handleNotifClick(notif) {
  if (!notif.is_read) {
    try {
      await axiosInstance.post(`/notifications/${notif.id}/mark-read`)
      notif.is_read = true
    } catch (e) {
      console.error('Failed to mark read:', e)
    }
  }

  if (notif.link) {
    router.push(notif.link)
  } else if (notif.type === 'order') {
    router.push('/track-order')
  } else if (notif.type === 'voucher' || notif.type === 'promo') {
    router.push('/products')
  }
}
</script>
