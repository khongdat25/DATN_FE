<template>
  
    <!-- Page Header -->
    <div class="bg-white border-b border-border py-8">
      <div class="max-w-[1200px] mx-auto px-5">
        <h1 class="font-display text-3xl font-extrabold text-text tracking-wide">TÀI KHOẢN CỦA TÔI</h1>
        <div class="flex items-center gap-2 text-xs text-text-dim mt-2 font-semibold">
          <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
          <i class="ti ti-chevron-right text-[10px]"></i>
          <span class="text-text font-bold">Tài khoản</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="py-14 bg-[#f9f9f9] min-h-[600px]">
      <div class="max-w-[1200px] mx-auto px-5">
        <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

          <!-- ── Sidebar ── -->
          <aside class="bg-white border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-[100px]">
            <!-- User info -->
            <div class="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <div class="w-[60px] h-[60px] rounded-full bg-surface2 flex items-center justify-center text-2xl text-text-dim border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] shrink-0 overflow-hidden">
                <i class="ti ti-user"></i>
              </div>
              <div>
                <h3 class="font-display font-bold text-[16px] text-text leading-snug">{{ user.name || 'Khách hàng' }}</h3>
                <p class="text-[13px] text-text-dim">Thành viên Bạc</p>
              </div>
            </div>

            <!-- Navigation menu -->
            <nav class="flex flex-col gap-2">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold w-full text-left transition-colors cursor-pointer border-none',
                  activeTab === tab.id
                    ? 'bg-[rgba(255,77,0,0.05)] text-accent'
                    : 'text-text-muted hover:bg-surface2 hover:text-text'
                ]"
              >
                <i :class="['text-xl', tab.icon]"></i>
                {{ tab.label }}
              </button>

              <!-- Logout -->
              <button
                @click="handleLogout"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold w-full text-left text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-none mt-5"
              >
                <i class="ti ti-logout text-xl"></i> Đăng xuất
              </button>
            </nav>
          </aside>

          <!-- ── Content Area ── -->
          <div>

            <!-- ① Hồ sơ cá nhân -->
            <transition name="tab-fade" mode="out-in">
              <div v-if="activeTab === 'profile'" key="profile" class="bg-white border border-border rounded-2xl p-10 shadow-sm">
                <div class="mb-8 pb-5 border-b border-border">
                  <h2 class="font-display text-2xl font-bold text-text mb-1">Hồ sơ của tôi</h2>
                  <p class="text-sm text-text-dim">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>

                <form @submit.prevent="handleSaveProfile">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label class="block text-[13px] font-semibold text-text-muted mb-2">Họ và tên</label>
                      <input type="text" v-model="user.name" required
                        class="w-full py-3 px-4 border border-border rounded-[10px] bg-surface text-sm outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,77,0,0.05)] transition-all">
                    </div>
                    <div>
                      <label class="block text-[13px] font-semibold text-text-muted mb-2">Email</label>
                      <input type="email" v-model="user.email" disabled
                        class="w-full py-3 px-4 border border-border rounded-[10px] bg-surface2 text-sm text-text-muted outline-none cursor-not-allowed">
                    </div>
                    <div>
                      <label class="block text-[13px] font-semibold text-text-muted mb-2">Số điện thoại</label>
                      <input type="tel" v-model="user.phone" placeholder="0987 654 321"
                        class="w-full py-3 px-4 border border-border rounded-[10px] bg-surface text-sm outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,77,0,0.05)] transition-all">
                    </div>
                    <div>
                      <label class="block text-[13px] font-semibold text-text-muted mb-2">Giới tính</label>
                      <div class="flex gap-6 mt-3">
                        <label v-for="g in ['Nam','Nữ','Khác']" :key="g" class="flex items-center gap-2 text-sm font-medium cursor-pointer">
                          <input type="radio" name="gender" :value="g" v-model="user.gender" class="accent-accent w-4 h-4 cursor-pointer">
                          {{ g }}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="mb-6">
                    <label class="block text-[13px] font-semibold text-text-muted mb-2">Ngày sinh</label>
                    <input type="date" v-model="user.dob"
                      class="py-3 px-4 border border-border rounded-[10px] bg-surface text-sm outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,77,0,0.05)] transition-all">
                  </div>
                  <button type="submit"
                    class="bg-accent text-white font-display font-bold text-[15px] px-8 py-3 rounded-[10px] hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(255,77,0,0.2)] transition-all active:scale-95 cursor-pointer border-none">
                    Lưu thay đổi
                  </button>
                </form>
              </div>

              <!-- ② Đơn mua -->
              <div v-else-if="activeTab === 'orders'" key="orders" class="bg-white border border-border rounded-2xl p-10 shadow-sm min-h-[500px]">
                <div class="mb-8 pb-5 border-b border-border">
                  <h2 class="font-display text-2xl font-bold text-text mb-1">Đơn mua</h2>
                  <p class="text-sm text-text-dim">Theo dõi và quản lý lịch sử mua hàng của bạn</p>
                </div>

                <div v-if="orders.length > 0" class="flex flex-col gap-5">
                  <div v-for="order in orders" :key="order.orderId" class="border border-border rounded-2xl overflow-hidden">
                    <!-- Order header -->
                    <div class="flex flex-wrap justify-between items-center px-6 py-4 bg-surface2 text-sm gap-3">
                      <span class="font-semibold text-text">Mã đơn: <span class="text-accent font-bold">{{ order.orderId }}</span></span>
                      <span :class="['font-semibold flex items-center gap-1.5', getStatusColor(order.status)]">
                        <i :class="getStatusIcon(order.status)"></i>
                        {{ order.status }}
                      </span>
                    </div>
                    <!-- Order items -->
                    <div class="px-6 py-5 flex flex-col gap-4">
                      <div v-for="(item, idx) in order.items" :key="idx" class="flex items-center gap-4">
                        <div class="w-[70px] h-[70px] bg-surface2 rounded-[10px] p-2.5 shrink-0 flex items-center justify-center">
                          <img :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain">
                        </div>
                        <div>
                          <h4 class="text-[15px] font-semibold text-text mb-1">{{ item.name }}</h4>
                          <p class="text-xs text-text-dim">{{ item.variant || 'Mặc định' }}</p>
                          <p class="text-xs text-text-dim">x{{ item.qty }}</p>
                        </div>
                      </div>
                    </div>
                    <!-- Order footer -->
                    <div class="flex justify-end items-center gap-5 px-6 py-4 border-t border-border">
                      <span class="text-base font-bold text-text">
                        Thành tiền: <span class="text-accent text-lg">{{ formatPrice(order.total) }}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Empty orders -->
                <div v-else class="text-center py-20 border border-dashed border-border rounded-2xl bg-surface2/30">
                  <i class="ti ti-package text-[50px] text-text-dim block mb-3"></i>
                  <p class="text-text-muted text-sm font-semibold mb-5">Bạn chưa thực hiện bất kỳ đơn hàng nào</p>
                  <router-link to="/products"
                    class="inline-flex items-center gap-2 bg-text text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-accent transition-colors active:scale-95">
                    Khám phá cửa hàng <i class="ti ti-arrow-right"></i>
                  </router-link>
                </div>
              </div>

              <!-- ③ Thành viên & Ưu đãi -->
              <div v-else-if="activeTab === 'membership'" key="membership" class="bg-white border border-border rounded-2xl p-10 shadow-sm">
                <div class="mb-8 pb-5 border-b border-border">
                  <h2 class="font-display text-2xl font-bold text-text mb-1">Thành viên SaigonShoes</h2>
                  <p class="text-sm text-text-dim">Tích lũy điểm để nâng hạng và nhận ưu đãi độc quyền</p>
                </div>

                <!-- Rank Card -->
                <div class="relative rounded-2xl p-8 text-white overflow-hidden mb-8"
                  style="background: linear-gradient(135deg,#1a1a1a 0%,#333 100%);">
                  <!-- Glow blob -->
                  <div class="absolute -top-1/2 -right-1/5 w-[300px] h-[300px] bg-[rgba(255,77,0,0.1)] blur-[80px] rounded-full pointer-events-none"></div>

                  <div class="flex justify-between items-start relative z-10">
                    <div>
                      <span class="text-[12px] uppercase tracking-[2px] text-white/60">Hạng hiện tại</span>
                      <div class="font-display text-[28px] font-extrabold text-[#FFD700] mt-1">SILVER MEMBER</div>
                    </div>
                    <i class="ti ti-award text-[40px] text-[#C0C0C0]"></i>
                  </div>

                  <div class="flex justify-between items-end mt-10 relative z-10">
                    <div>
                      <div class="font-display text-[32px] font-extrabold leading-none">
                        1,250 <span class="text-sm font-medium text-white/60">điểm</span>
                      </div>
                      <div class="text-xs text-white/60 mt-1">Bạn cần thêm 750 điểm để lên hạng Vàng</div>
                    </div>
                  </div>
                  <div class="mt-3 relative z-10">
                    <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full w-[65%] bg-accent rounded-full transition-all duration-700"></div>
                    </div>
                  </div>
                </div>

                <!-- Benefits -->
                <h3 class="font-display text-lg font-bold text-text mb-5">Đặc quyền của bạn</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                  <div v-for="b in benefits" :key="b.title" class="flex flex-col gap-3 p-5 border border-border rounded-2xl">
                    <div class="w-10 h-10 bg-surface2 rounded-[10px] flex items-center justify-center text-xl text-accent">
                      <i :class="'ti ' + b.icon"></i>
                    </div>
                    <h4 class="text-sm font-bold text-text">{{ b.title }}</h4>
                    <p class="text-xs text-text-dim">{{ b.desc }}</p>
                  </div>
                </div>

                <!-- Rank table -->
                <h3 class="font-display text-lg font-bold text-text mb-5">Các cấp bậc thành viên</h3>
                <div class="overflow-x-auto">
                  <table class="w-full border-collapse">
                    <thead>
                      <tr>
                        <th class="text-left py-3 px-3 border-b-2 border-border text-[13px] text-text-dim font-semibold">Hạng</th>
                        <th class="text-left py-3 px-3 border-b-2 border-border text-[13px] text-text-dim font-semibold">Điều kiện (Điểm)</th>
                        <th class="text-left py-3 px-3 border-b-2 border-border text-[13px] text-text-dim font-semibold">Ưu đãi chính</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="rank in rankLevels" :key="rank.name" class="border-b border-border last:border-b-0">
                        <td class="py-4 px-3">
                          <span class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase" :style="rank.style">{{ rank.name }}</span>
                        </td>
                        <td class="py-4 px-3 text-sm text-text">{{ rank.points }}</td>
                        <td class="py-4 px-3 text-sm text-text">{{ rank.benefit }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- ④ Địa chỉ -->
              <div v-else-if="activeTab === 'address'" key="address" class="bg-white border border-border rounded-2xl p-10 shadow-sm">
                <div class="flex flex-wrap justify-between items-end mb-8 pb-5 border-b border-border gap-4">
                  <div>
                    <h2 class="font-display text-2xl font-bold text-text mb-1">Địa chỉ của tôi</h2>
                    <p class="text-sm text-text-dim">Quản lý địa chỉ nhận hàng của bạn</p>
                  </div>
                  <button
                    @click="showAddForm = !showAddForm"
                    class="flex items-center gap-2 bg-accent text-white font-display font-bold text-sm px-5 py-2.5 rounded-[10px] hover:bg-accent-hover transition-all cursor-pointer border-none shadow-[0_4px_12px_rgba(255,77,0,0.15)]">
                    <i class="ti ti-plus"></i> Thêm địa chỉ mới
                  </button>
                </div>

                <!-- Add address form -->
                <transition name="tab-fade">
                  <div v-if="showAddForm" class="mb-6 p-6 border border-dashed border-accent/40 rounded-2xl bg-[rgba(255,77,0,0.02)]">
                    <h3 class="font-display font-bold text-base text-text mb-4">Địa chỉ mới</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs font-semibold text-text-muted mb-1.5">Họ tên</label>
                        <input type="text" v-model="newAddress.name" placeholder="Nguyễn Văn A"
                          class="w-full py-3 px-4 border border-border rounded-xl bg-surface text-sm outline-none focus:border-accent transition-all">
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-text-muted mb-1.5">Số điện thoại</label>
                        <input type="tel" v-model="newAddress.phone" placeholder="0987 654 321"
                          class="w-full py-3 px-4 border border-border rounded-xl bg-surface text-sm outline-none focus:border-accent transition-all">
                      </div>
                      <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-muted mb-1.5">Địa chỉ chi tiết</label>
                        <input type="text" v-model="newAddress.address" placeholder="Số nhà, tên đường, phường, quận, thành phố..."
                          class="w-full py-3 px-4 border border-border rounded-xl bg-surface text-sm outline-none focus:border-accent transition-all">
                      </div>
                    </div>
                    <div class="flex gap-3 mt-4">
                      <button type="button" @click="addAddress"
                        class="bg-accent text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-accent-hover transition-colors cursor-pointer border-none">
                        Lưu địa chỉ
                      </button>
                      <button type="button" @click="showAddForm = false"
                        class="bg-surface2 text-text-muted font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#eee] transition-colors cursor-pointer border border-border">
                        Hủy
                      </button>
                    </div>
                  </div>
                </transition>

                <!-- Address list -->
                <div class="flex flex-col gap-4">
                  <div v-for="(addr, idx) in addresses" :key="idx"
                    class="flex flex-wrap justify-between items-start gap-4 p-6 border border-border rounded-2xl">
                    <div>
                      <h4 class="text-[15px] font-bold text-text flex items-center gap-2.5 mb-2">
                        {{ addr.name }}
                        <span v-if="addr.isDefault" class="text-[10px] bg-accent text-white px-2 py-px rounded uppercase font-bold">Mặc định</span>
                      </h4>
                      <div class="text-[13px] text-text-muted leading-relaxed">
                        {{ addr.phone }}<br>
                        {{ addr.address }}
                      </div>
                    </div>
                    <div class="flex gap-4 text-[13px] font-semibold">
                      <button @click="editAddress(idx)" class="text-accent hover:underline cursor-pointer bg-transparent border-none">Cập nhật</button>
                      <button @click="removeAddress(idx)" class="text-text-dim hover:text-red-500 cursor-pointer bg-transparent border-none transition-colors">Xóa</button>
                    </div>
                  </div>

                  <!-- Empty addresses -->
                  <div v-if="addresses.length === 0" class="text-center py-10 border-2 border-dashed border-border rounded-2xl text-text-dim">
                    <i class="ti ti-map-pin text-4xl block mb-2"></i>
                    <p class="text-sm">Chưa có địa chỉ nào. Hãy thêm địa chỉ nhận hàng!</p>
                  </div>
                </div>
              </div>

              <!-- ⑤ Đổi mật khẩu -->
              <div v-else-if="activeTab === 'password'" key="password" class="bg-white border border-border rounded-2xl p-10 shadow-sm">
                <div class="mb-8 pb-5 border-b border-border">
                  <h2 class="font-display text-2xl font-bold text-text mb-1">Đổi mật khẩu</h2>
                  <p class="text-sm text-text-dim">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
                </div>

                <form @submit.prevent="handleChangePassword" class="flex flex-col gap-6 max-w-[500px]">
                  <div>
                    <label class="block text-[13px] font-semibold text-text-muted mb-2">Mật khẩu hiện tại</label>
                    <input type="password" v-model="passwordForm.current" placeholder="••••••••" required
                      class="w-full py-3 px-4 border border-border rounded-[10px] bg-surface text-sm outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,77,0,0.05)] transition-all">
                  </div>
                  <div>
                    <label class="block text-[13px] font-semibold text-text-muted mb-2">Mật khẩu mới</label>
                    <input type="password" v-model="passwordForm.new" placeholder="••••••••" required
                      class="w-full py-3 px-4 border border-border rounded-[10px] bg-surface text-sm outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,77,0,0.05)] transition-all">
                  </div>
                  <div>
                    <label class="block text-[13px] font-semibold text-text-muted mb-2">Xác nhận mật khẩu mới</label>
                    <input type="password" v-model="passwordForm.confirm" placeholder="••••••••" required
                      class="w-full py-3 px-4 border border-border rounded-[10px] bg-surface text-sm outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,77,0,0.05)] transition-all">
                  </div>
                  <div>
                    <button type="submit"
                      class="bg-accent text-white font-display font-bold text-[15px] px-8 py-3 rounded-[10px] hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(255,77,0,0.2)] transition-all active:scale-95 cursor-pointer border-none">
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
            </transition>

          </div>
        </div>
      </div>
    </main>
  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const router = useRouter()

// ─── Tab state ────────────────────────────────────────────────────────────────
const activeTab = ref('profile')

const tabs = [
  { id: 'profile',    label: 'Hồ sơ của tôi',       icon: 'ti ti-user-circle' },
  { id: 'orders',     label: 'Đơn mua',               icon: 'ti ti-package' },
  { id: 'membership', label: 'Thành viên & Ưu đãi',   icon: 'ti ti-crown' },
  { id: 'address',    label: 'Địa chỉ',               icon: 'ti ti-map-pin' },
  { id: 'password',   label: 'Đổi mật khẩu',          icon: 'ti ti-lock' }
]

// ─── User data ────────────────────────────────────────────────────────────────
const user = reactive({
  name: 'Nguyễn Minh Anh',
  email: 'minhanh.nguyen@gmail.com',
  phone: '0987 654 321',
  gender: 'Nam',
  dob: '1998-05-12'
})

// ─── Password form ────────────────────────────────────────────────────────────
const passwordForm = reactive({ current: '', new: '', confirm: '' })

// ─── Orders ───────────────────────────────────────────────────────────────────
const orders = ref([])

// ─── Addresses ────────────────────────────────────────────────────────────────
const addresses = ref([
  {
    name: 'Nguyễn Minh Anh',
    phone: '(+84) 987 654 321',
    address: '123 Đường ABC, Phường X, Quận Y, Hà Nội',
    isDefault: true
  },
  {
    name: 'Nguyễn Minh Anh',
    phone: '(+84) 987 654 321',
    address: '456 Đường DEF, Phường Z, TP. Hồ Chí Minh',
    isDefault: false
  }
])

const showAddForm = ref(false)
const newAddress = reactive({ name: '', phone: '', address: '' })

// ─── Membership data ──────────────────────────────────────────────────────────
const benefits = [
  { icon: 'ti-truck-delivery', title: 'Free Ship',         desc: 'Miễn phí vận chuyển cho mọi đơn hàng từ 0đ' },
  { icon: 'ti-gift',           title: 'Quà sinh nhật',     desc: 'Voucher giảm giá 20% trong tháng sinh nhật' },
  { icon: 'ti-ticket',         title: 'Ưu đãi độc quyền', desc: 'Giảm thêm 5% cho tất cả sản phẩm mới' }
]

const rankLevels = [
  { name: 'Đồng',  points: '0 - 999',      benefit: 'Tích điểm 1% đơn hàng',                         style: { background: '#CD7F32', color: 'white' } },
  { name: 'Bạc',   points: '1,000 - 1,999', benefit: 'Free Ship, Tích điểm 2% đơn hàng',              style: { background: '#C0C0C0', color: '#333' } },
  { name: 'Vàng',  points: '2,000+',        benefit: 'Quà sinh nhật, Tích điểm 5% đơn hàng',          style: { background: '#FFD700', color: '#333' } }
]

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  loadUserData()
  loadOrdersData()
})

function loadUserData() {
  try {
    const data = JSON.parse(localStorage.getItem('user') || '{}')
    if (data.name)  user.name  = data.name
    if (data.email) user.email = data.email
    if (data.phone) user.phone = data.phone
    
    // Ánh xạ ngày sinh: hỗ trợ cả dob hoặc birthday
    const dobValue = data.birthday || data.dob
    if (dobValue) {
      user.dob = dobValue.split(' ')[0]
    }
    
    if (data.gender) user.gender = data.gender
  } catch {}
}

function loadOrdersData() {
  try {
    const data = JSON.parse(localStorage.getItem('saigon_orders') || 'null')
    if (data) { orders.value = data; return }
  } catch {}
  // Mock orders nếu chưa có
  orders.value = [
    {
      orderId: 'SGS-281938',
      date: '15/04/2026',
      items: [{ name: 'Nike Air Force 1 White', variant: 'Màu Trắng · Size 41', qty: 1, price: 1250000, image: '/images/nike-air-force-1.png' }],
      total: 1250000,
      shipping: '123 Đường ABC, Quận 1, TP.HCM',
      status: 'Đang giao hàng',
      paymentMethod: 'Thanh toán COD'
    },
    {
      orderId: 'SGS-192847',
      date: '02/03/2026',
      items: [{ name: 'Adidas Samba OG Black/White', variant: 'Màu Đen Trắng · Size 42', qty: 1, price: 2100000, image: '/images/adidas-samba-og1.png' }],
      total: 2100000,
      shipping: '456 Đường DEF, Quận 3, TP.HCM',
      status: 'Đã hoàn thành',
      paymentMethod: 'Chuyển khoản ngân hàng'
    }
  ]
}

// ─── Status helpers ───────────────────────────────────────────────────────────
function getStatusColor(status) {
  if (status === 'Đã hoàn thành') return 'text-green-600'
  if (status === 'Đang giao hàng') return 'text-blue-500'
  if (status === 'Chờ xác nhận')  return 'text-yellow-600'
  return 'text-red-500'
}

function getStatusIcon(status) {
  if (status === 'Đã hoàn thành') return 'ti ti-circle-check'
  if (status === 'Đang giao hàng') return 'ti ti-truck-delivery'
  if (status === 'Chờ xác nhận')  return 'ti ti-clock'
  return 'ti ti-x'
}

// ─── Address helpers ──────────────────────────────────────────────────────────
function addAddress() {
  if (!newAddress.name || !newAddress.phone || !newAddress.address) {
    Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Vui lòng điền đầy đủ thông tin địa chỉ.', confirmButtonColor: '#FF4D00' })
    return
  }
  addresses.value.push({ ...newAddress, isDefault: false })
  Object.assign(newAddress, { name: '', phone: '', address: '' })
  showAddForm.value = false
  Swal.fire({ icon: 'success', title: 'Đã thêm địa chỉ!', timer: 1500, showConfirmButton: false })
}

function editAddress(idx) {
  Swal.fire({ icon: 'info', title: 'Tính năng đang phát triển', text: 'Chức năng chỉnh sửa địa chỉ sẽ sớm được cập nhật.', confirmButtonColor: '#FF4D00' })
}

function removeAddress(idx) {
  Swal.fire({
    title: 'Xóa địa chỉ?',
    text: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#aaa'
  }).then(result => {
    if (result.isConfirmed) addresses.value.splice(idx, 1)
  })
}

// ─── Form handlers ────────────────────────────────────────────────────────────
async function handleSaveProfile() {
  try {
    const response = await axiosInstance.put('/user/profile', {
      name: user.name,
      phone: user.phone,
      birthday: user.dob,
      gender: user.gender
    })

    if (response.success) {
      // Cập nhật lại thông tin user mới vào localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      Swal.fire({ 
        icon: 'success', 
        title: 'Cập nhật thành công! 💾', 
        text: 'Thông tin cá nhân của bạn đã được lưu trên hệ thống.', 
        confirmButtonColor: '#FF4D00' 
      })
    }
  } catch (error) {
    console.error('Save profile error:', error)
  }
}

function handleChangePassword() {
  if (!passwordForm.current) {
    Swal.fire({ icon: 'warning', title: 'Nhập mật khẩu hiện tại', confirmButtonColor: '#FF4D00' }); return
  }
  if (passwordForm.new.length < 6) {
    Swal.fire({ icon: 'error', title: 'Mật khẩu quá ngắn', text: 'Mật khẩu mới phải có ít nhất 6 ký tự.', confirmButtonColor: '#FF4D00' }); return
  }
  if (passwordForm.new !== passwordForm.confirm) {
    Swal.fire({ icon: 'error', title: 'Mật khẩu không khớp', text: 'Xác nhận mật khẩu mới không trùng khớp.', confirmButtonColor: '#FF4D00' }); return
  }
  Swal.fire({ icon: 'success', title: 'Đổi mật khẩu thành công! 🔑', text: 'Mật khẩu của bạn đã được thay đổi an toàn.', confirmButtonColor: '#FF4D00' })
    .then(() => { passwordForm.current = ''; passwordForm.new = ''; passwordForm.confirm = '' })
}

async function handleLogout() {
  Swal.fire({
    title: 'Đăng xuất?',
    text: 'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#aaa'
  }).then(async (result) => {
    if (result.isConfirmed) {
      localStorage.setItem('is_logging_out', 'true')
      try {
        await axiosInstance.post('/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        localStorage.removeItem('is_logging_out')
        window.location.href = '/login'
      }
    }
  })
}

function formatPrice(val) {
  return Number(val || 0).toLocaleString('vi-VN') + '₫'
}
</script>

<style scoped>
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.tab-fade-enter-from,
.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
