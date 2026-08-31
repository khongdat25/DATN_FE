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
              <div class="w-[60px] h-[60px] rounded-full bg-surface2 flex items-center justify-center text-2xl text-text-dim border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] shrink-0 overflow-hidden relative">
                <img v-if="user.avatar" :src="getImageUrl(user.avatar)" alt="Avatar" class="w-full h-full object-cover">
                <i v-else class="ti ti-user"></i>
              </div>
              <div>
                <h3 class="font-display font-bold text-[16px] text-text leading-snug">{{ user.name || 'Khách hàng' }}</h3>
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
                  <!-- Avatar Upload Section -->
                  <div class="mb-8 p-6 bg-surface2/40 border border-border rounded-2xl flex flex-col sm:flex-row items-center gap-6">
                    <!-- Avatar Preview Circle -->
                    <div class="relative group shrink-0">
                      <div class="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white overflow-hidden flex items-center justify-center text-4xl text-text-dim relative">
                        <img v-if="user.avatar" :src="getImageUrl(user.avatar)" alt="Avatar preview" class="w-full h-full object-cover">
                        <i v-else class="ti ti-user"></i>
                        <!-- Loading Overlay -->
                        <div v-if="isUploadingAvatar" class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-xs gap-1 backdrop-blur-xs">
                          <i class="ti ti-loader animate-spin text-xl"></i>
                          <span>Đang tải...</span>
                        </div>
                      </div>
                    </div>

                    <!-- Avatar Controls -->
                    <div class="flex-1 w-full space-y-3 text-left">
                      <div class="flex items-center justify-between flex-wrap gap-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-text-muted">Ảnh đại diện</label>
                        <!-- Mode Toggle Buttons -->
                        <div class="flex bg-surface border border-border rounded-xl p-1 gap-1">
                          <button
                            type="button"
                            @click="avatarMode = 'upload'"
                            :class="['px-3 py-1 text-xs font-bold rounded-lg transition-all border-none cursor-pointer', avatarMode === 'upload' ? 'bg-accent text-white shadow-xs' : 'text-text-muted hover:text-text']"
                          >
                            <i class="ti ti-upload mr-1"></i> Tải từ máy
                          </button>
                          <button
                            type="button"
                            @click="avatarMode = 'url'"
                            :class="['px-3 py-1 text-xs font-bold rounded-lg transition-all border-none cursor-pointer', avatarMode === 'url' ? 'bg-accent text-white shadow-xs' : 'text-text-muted hover:text-text']"
                          >
                            <i class="ti ti-link mr-1"></i> Link URL
                          </button>
                        </div>
                      </div>

                      <!-- Mode 1: File Upload -->
                      <div v-if="avatarMode === 'upload'" class="flex items-center gap-3 flex-wrap">
                        <input
                          type="file"
                          ref="fileInputRef"
                          accept="image/*"
                          class="hidden"
                          @change="handleAvatarFileUpload"
                        />
                        <button
                          type="button"
                          @click="$refs.fileInputRef.click()"
                          :disabled="isUploadingAvatar"
                          class="flex items-center gap-2 px-4 py-2.5 bg-white border border-border hover:border-accent hover:text-accent font-bold text-xs rounded-xl shadow-2xs transition-all cursor-pointer disabled:opacity-50"
                        >
                          <i class="ti ti-cloud-upload text-base"></i> Chọn ảnh từ máy tính
                        </button>
                        <button
                          v-if="user.avatar"
                          type="button"
                          @click="removeAvatar"
                          class="px-3 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer border-none bg-transparent"
                        >
                          Xóa ảnh
                        </button>
                        <span class="text-[11px] text-text-dim">PNG, JPG, WEBP tối đa 2MB</span>
                      </div>

                      <!-- Mode 2: Image URL input -->
                      <div v-else class="flex items-center gap-2">
                        <input
                          type="url"
                          v-model="avatarUrlInput"
                          placeholder="Dán đường dẫn URL ảnh (https://...)"
                          class="flex-1 py-2.5 px-3.5 border border-border rounded-xl bg-white text-xs outline-none focus:border-accent transition-all font-medium"
                        />
                        <button
                          type="button"
                          @click="applyAvatarUrl"
                          class="px-4 py-2.5 bg-accent text-white font-bold text-xs rounded-xl shadow-2xs hover:bg-accent-hover transition-all cursor-pointer border-none whitespace-nowrap"
                        >
                          Áp dụng
                        </button>
                        <button
                          v-if="user.avatar"
                          type="button"
                          @click="removeAvatar"
                          class="px-3 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer border-none bg-transparent"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
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
                      <div class="flex items-center gap-4">
                        <span class="font-semibold text-text">Mã đơn: <span class="text-accent font-bold">{{ order.orderId }}</span></span>
                        <span :class="['text-[11px] font-bold px-2 py-0.5 rounded-full uppercase', getPaymentStatusBadgeClass(order.paymentStatus)]">
                          {{ getPaymentStatusText(order.paymentStatus) }}
                        </span>
                      </div>
                      <span :class="['font-semibold flex items-center gap-1.5', getStatusColor(order.status)]">
                        <i :class="getStatusIcon(order.status)"></i>
                        {{ getStatusText(order.status) }}
                      </span>
                    </div>
                    <!-- Order items -->
                    <div class="px-6 py-5 flex flex-col gap-4">
                      <div v-for="(item, idx) in order.items" :key="idx" class="flex items-center justify-between gap-4 py-2 border-b border-slate-50 last:border-none">
                        <div class="flex items-center gap-4">
                          <div class="w-[70px] h-[70px] bg-surface2 rounded-[10px] p-2.5 shrink-0 flex items-center justify-center">
                            <img :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain" @error="$event.target.src = '/images/nike-air-force-1.png'">
                          </div>
                          <div>
                            <h4 class="text-[15px] font-semibold text-text mb-1">{{ item.name }}</h4>
                            <p class="text-xs text-text-dim">{{ item.variant || 'Mặc định' }}</p>
                            <p class="text-xs text-text-dim">x{{ item.qty }}</p>
                          </div>
                        </div>

                        <!-- Rating Action for Delivered & Paid orders -->
                        <div v-if="order.status === 'delivered' && order.paymentStatus === 'paid'" class="shrink-0">
                          <div v-if="item.rating" class="flex flex-col items-end gap-1">
                            <span class="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1">
                              <span>★ {{ item.rating.rating }}/5</span>
                              <span class="font-normal text-amber-600">· Đã đánh giá</span>
                            </span>
                            <button 
                              @click="viewRatingDetail(item)"
                              class="text-[11px] text-slate-500 hover:text-accent underline cursor-pointer bg-transparent border-none"
                            >
                              Xem nhận xét
                            </button>
                          </div>
                          <button 
                            v-else
                            @click="openRatingModal(order, item)"
                            class="px-4 py-2 bg-accent text-white hover:bg-accent-hover font-semibold text-xs rounded-xl shadow-2xs transition-all cursor-pointer border-none font-display"
                          >
                            Đánh giá sản phẩm
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- Order footer -->
                    <div class="flex justify-between items-center gap-4 px-6 py-4 border-t border-border flex-wrap">
                      <div class="flex gap-2">
                        <!-- Xem chi tiết -->
                        <button 
                          @click="viewOrderDetails(order)"
                          class="bg-white border border-border text-text hover:bg-surface2 font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
                        >
                          Xem chi tiết
                        </button>
                        <!-- Theo dõi vận đơn GHN Real-time -->
                        <button 
                          v-if="order.ghn_order_code || ['shipping', 'delivered'].includes(order.status)"
                          @click="openTrackModal(order)"
                          class="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5 font-display border-none"
                        >
                          <i class="ti ti-radar text-sm"></i>
                          <span>Theo dõi vận đơn Real-time</span>
                        </button>
                        <!-- Hủy đơn hàng -->
                        <!-- Hủy đơn hàng -->
                        <button 
                          v-if="['new', 'pending', 'processing', 'created'].includes(order.status)"
                          @click="openCancelModal(order)"
                          class="bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                        >
                          <i class="ti ti-x text-sm"></i>
                          <span>Hủy đơn hàng</span>
                        </button>
                        <!-- Đặt lại -->
                        <button 
                          v-if="['delivered', 'cancelled'].includes(order.status)"
                          @click="reorder(order)"
                          class="bg-accent border border-accent text-white hover:bg-accent-hover font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
                        >
                          Đặt lại 🛒
                        </button>
                      </div>
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
                      <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-muted mb-1.5">Loại địa chỉ</label>
                        <select v-model="newAddress.badge"
                          class="w-full py-3 px-4 border border-border rounded-xl bg-surface text-sm outline-none focus:border-accent transition-all">
                          <option value="Mặc định">Mặc định (Sử dụng thanh toán)</option>
                          <option value="Nhà riêng">Nhà riêng</option>
                          <option value="Văn phòng">Văn phòng</option>
                        </select>
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

    <!-- Avatar Cropper Modal (Kiểu Facebook) -->
    <div v-if="cropperModalOpen" class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick">
      <div @click="closeCropperModal" class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"></div>

      <div class="bg-white rounded-3xl border border-border shadow-2xl w-full max-w-md overflow-hidden z-10 text-left flex flex-col">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 class="font-display text-lg font-bold text-text">Căn chỉnh ảnh đại diện</h3>
            <p class="text-xs text-text-dim mt-0.5">Kéo rê để di chuyển và điều chỉnh kích thước ảnh</p>
          </div>
          <button type="button" @click="closeCropperModal" class="text-text-dim hover:text-text p-1.5 rounded-lg hover:bg-surface2 cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Canvas Cropper Area -->
        <div class="p-6 flex flex-col items-center bg-surface2/30 select-none">
          <!-- Circle Viewport Container -->
          <div 
            class="w-[260px] h-[260px] rounded-full border-4 border-accent shadow-xl overflow-hidden relative cursor-grab active:cursor-grabbing bg-slate-900 touch-none flex items-center justify-center"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
            @touchstart.passive="startDragTouch"
            @touchmove.prevent="onDragTouch"
            @touchend="stopDrag"
          >
            <canvas ref="cropCanvasRef" width="300" height="300" class="pointer-events-none w-full h-full"></canvas>
          </div>

          <!-- Controls: Zoom & Rotate -->
          <div class="w-full max-w-xs mt-6 space-y-4">
            <!-- Zoom Slider -->
            <div class="flex items-center gap-3">
              <i class="ti ti-zoom-out text-text-dim text-sm"></i>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                v-model.number="cropZoom"
                @input="renderCanvas"
                class="w-full accent-accent cursor-pointer"
              />
              <i class="ti ti-zoom-in text-text-dim text-sm"></i>
            </div>

            <!-- Rotate Button & Reset -->
            <div class="flex items-center justify-center gap-3">
              <button
                type="button"
                @click="rotateImage"
                class="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-border hover:border-accent text-xs font-semibold rounded-xl shadow-2xs cursor-pointer"
              >
                <i class="ti ti-rotate-clockwise text-sm"></i> Xoay 90°
              </button>
              <button
                type="button"
                @click="resetCrop"
                class="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-border hover:border-accent text-xs font-semibold rounded-xl shadow-2xs cursor-pointer"
              >
                <i class="ti ti-refresh text-sm"></i> Đặt lại
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-border flex items-center justify-end gap-3 bg-white">
          <button
            type="button"
            @click="closeCropperModal"
            class="px-5 py-2.5 bg-surface2 text-text-muted hover:bg-[#eee] text-xs font-bold rounded-xl transition-all cursor-pointer border-none"
          >
            Hủy
          </button>
          <button
            type="button"
            @click="confirmCropAndUpload"
            :disabled="isUploadingAvatar"
            class="flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer border-none disabled:opacity-50"
          >
            <i v-if="isUploadingAvatar" class="ti ti-loader animate-spin"></i>
            <span>{{ isUploadingAvatar ? 'Đang lưu...' : 'Cắt & Áp dụng' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Cancel Order & Refund Request Modal -->
    <div 
      v-if="cancelModalOpen && targetOrderToCancel" 
      class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick"
    >
      <!-- Modal Backdrop -->
      <div 
        @click="closeCancelModal" 
        class="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      <!-- Modal Container -->
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden z-10 transition-all scale-100 text-left">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/60">
          <div class="flex items-center gap-3">
            <div :class="['w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-2xs', targetOrderToCancel.paymentStatus === 'paid' ? 'bg-orange-100 text-accent' : 'bg-red-100 text-red-600']">
              <i :class="targetOrderToCancel.paymentStatus === 'paid' ? 'ti ti-receipt-refund' : 'ti ti-circle-x'"></i>
            </div>
            <div>
              <h3 class="font-display text-lg font-bold text-slate-950">
                {{ targetOrderToCancel.paymentStatus === 'paid' ? 'Hủy đơn hàng & Yêu cầu Hoàn tiền' : 'Xác nhận Hủy đơn hàng' }}
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">
                Mã đơn hàng: <strong class="text-slate-800 font-mono">{{ targetOrderToCancel.orderId }}</strong> · Tổng tiền: <strong class="text-accent">{{ formatPrice(targetOrderToCancel.total) }}</strong>
              </p>
            </div>
          </div>
          <button @click="closeCancelModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form @submit.prevent="submitCancelOrder" class="flex-1 overflow-y-auto p-6 space-y-5">
          <!-- Notification Badge for Paid Status -->
          <div 
            v-if="targetOrderToCancel.paymentStatus === 'paid'" 
            class="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl flex items-start gap-3 text-amber-900 text-xs"
          >
            <i class="ti ti-info-circle text-amber-600 text-base shrink-0 mt-0.5"></i>
            <div>
              <span class="font-bold block text-amber-950">Đơn hàng này đã được thanh toán online!</span>
              <span class="text-[11px] text-amber-800 mt-0.5 block leading-relaxed">
                Vui lòng cung cấp chính xác thông tin Tài Khoản Ngân Hàng. Bộ phận CSKH sẽ kiểm tra và thực hiện chuyển khoản hoàn tiền lại cho bạn trong 24h - 48h.
              </span>
            </div>
          </div>

          <!-- Section 1: Lý do hủy đơn -->
          <div class="space-y-3">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">LÝ DO HỦY ĐƠN HÀNG *</label>
            <select 
              v-model="cancelForm.reasonPreset" 
              required 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all cursor-pointer font-semibold text-slate-800"
            >
              <option v-for="r in cancelReasonPresets" :key="r" :value="r">{{ r }}</option>
            </select>

            <div>
              <textarea 
                v-model="cancelForm.reasonDetail" 
                rows="2" 
                placeholder="Nhập thêm chi tiết lý do hủy (không bắt buộc)..." 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-medium text-slate-800 resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Section 2: Thông tin tài khoản ngân hàng (Chỉ hiện khi ĐÃ THANH TOÁN) -->
          <div v-if="targetOrderToCancel.paymentStatus === 'paid'" class="space-y-4 pt-2 border-t border-slate-100">
            <div class="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <i class="ti ti-building-bank text-accent text-base"></i>
              <span>THÔNG TIN NGÂN HÀNG NHẬN TIỀN HOÀN *</span>
            </div>

            <!-- Tên ngân hàng -->
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">TÊN NGÂN HÀNG *</label>
              <select 
                v-model="cancelForm.bankName" 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all cursor-pointer font-semibold text-slate-800"
              >
                <option v-for="b in vietnameseBanks" :key="b" :value="b">{{ b }}</option>
              </select>
            </div>

            <!-- Nếu chọn Ngân hàng khác -->
            <div v-if="cancelForm.bankName === 'Ngân hàng khác (Tự nhập tên)'">
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NHẬP TÊN NGÂN HÀNG CỦA BẠN *</label>
              <input 
                type="text" 
                v-model="cancelForm.customBankName" 
                placeholder="Ví dụ: Shinhan Bank, Nam A Bank..." 
                required 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all font-semibold text-slate-800"
              >
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Số tài khoản -->
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">SỐ TÀI KHOẢN *</label>
                <input 
                  type="text" 
                  v-model="cancelForm.bankAccount" 
                  placeholder="Ví dụ: 1903456789012" 
                  required 
                  class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all font-mono font-bold text-slate-900 tracking-wider"
                >
              </div>

              <!-- Tên chủ tài khoản -->
              <div>
                <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">TÊN CHỦ TÀI KHOẢN *</label>
                <input 
                  type="text" 
                  v-model="cancelForm.bankHolder" 
                  @input="onBankHolderInput"
                  placeholder="Ví dụ: NGUYEN VAN A" 
                  required 
                  class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all uppercase font-bold text-slate-900 tracking-wider"
                >
              </div>
            </div>

            <!-- Ghi chú thêm -->
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">GHI CHÚ THÊM (NẾU CÓ)</label>
              <input 
                type="text" 
                v-model="cancelForm.notes" 
                placeholder="Ví dụ: Hoàn tiền kèm chi nhánh ngân hàng..." 
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all font-medium text-slate-800"
              >
            </div>
          </div>

          <!-- Footer buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button 
              type="button" 
              @click="closeCancelModal" 
              class="bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-md transition-all border-none cursor-pointer font-display flex items-center gap-2"
            >
              <i :class="targetOrderToCancel.paymentStatus === 'paid' ? 'ti ti-send' : 'ti ti-check'"></i>
              <span>{{ targetOrderToCancel.paymentStatus === 'paid' ? 'Xác nhận Hủy & Gửi Yêu Cầu Hoàn Tiền' : 'Xác nhận Hủy đơn hàng' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Product Rating Modal -->
    <div 
      v-if="ratingModalOpen && ratingItem" 
      class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick"
    >
      <div @click="closeRatingModal" class="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity"></div>
      
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden z-10 text-left flex flex-col">
        <!-- Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950">Đánh giá sản phẩm</h3>
            <p class="text-xs text-slate-500 mt-0.5">Chia sẻ trải nghiệm sử dụng của bạn</p>
          </div>
          <button @click="closeRatingModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Body -->
        <form @submit.prevent="submitRating" class="p-6 space-y-5">
          <!-- Item info -->
          <div class="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <div class="w-14 h-14 bg-white rounded-xl p-1.5 border border-slate-100 shrink-0 flex items-center justify-center">
              <img :src="ratingItem.image" :alt="ratingItem.name" class="max-w-full max-h-full object-contain">
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-xs text-slate-800 truncate">{{ ratingItem.name }}</h4>
              <p class="text-[11px] text-slate-500 mt-0.5">{{ ratingItem.variant }}</p>
            </div>
          </div>

          <!-- Star selector -->
          <div class="space-y-2 text-center">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">CHẤT LƯỢNG SẢN PHẨM</label>
            <div class="flex items-center justify-center gap-2 py-2">
              <button 
                v-for="star in 5" 
                :key="star"
                type="button"
                @click="selectedStars = star"
                class="text-2xl transition-all cursor-pointer border-none bg-transparent p-1 focus:outline-none hover:scale-125"
                :class="star <= selectedStars ? 'text-amber-400' : 'text-slate-200'"
              >
                ★
              </button>
            </div>
            <p class="text-xs font-bold text-accent">
              {{ starLabels[selectedStars] || '' }}
            </p>
          </div>

          <!-- Comment input -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">NHẬN XÉT CỦA BẠN</label>
            <textarea 
              v-model="ratingComment"
              rows="3"
              placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm này (chất liệu, kích cỡ, độ hoàn thiện...)"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-400 font-medium text-slate-800 resize-none"
            ></textarea>
          </div>

          <!-- Photo Upload Section -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">HÌNH ẢNH THỰC TẾ (TỐI ĐA 5 ĐỌC)</label>
              <span class="text-[11px] text-slate-400 font-semibold">{{ ratingPhotos.length }}/5 ảnh</span>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <!-- Upload Thumbnail Button -->
              <label v-if="ratingPhotos.length < 5" class="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 hover:border-accent flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-50 hover:bg-orange-50/50 text-slate-400 hover:text-accent shrink-0">
                <i class="ti ti-camera text-xl"></i>
                <span class="text-[9px] font-bold mt-0.5">Thêm ảnh</span>
                <input type="file" multiple accept="image/*" class="hidden" @change="handleRatingPhotoUpload" />
              </label>

              <!-- Image Previews -->
              <div v-for="(photo, pIdx) in ratingPhotoPreviews" :key="pIdx" class="w-16 h-16 rounded-2xl border border-slate-200 overflow-hidden relative group shrink-0 shadow-2xs">
                <img :src="photo" alt="Preview" class="w-full h-full object-cover">
                <button type="button" @click="removeRatingPhoto(pIdx)" class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center text-xs border-none cursor-pointer hover:bg-red-600">
                  <i class="ti ti-x"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Footer buttons -->
          <div class="pt-3 flex items-center justify-end gap-3">
            <button 
              type="button" 
              @click="closeRatingModal"
              class="bg-white border border-slate-200 text-slate-600 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              :disabled="isSubmittingRating"
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-md transition-all border-none cursor-pointer font-display disabled:opacity-50"
            >
              {{ isSubmittingRating ? 'Đang gửi...' : 'Gửi đánh giá' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Track Order Real-time Modal -->
    <TrackOrderModal 
      :is-open="trackModalOpen" 
      :order-code="selectedOrderCode" 
      @close="trackModalOpen = false" 
    />
</template>

<script setup>
import TrackOrderModal from '@/components/common/TrackOrderModal.vue'
import { ref, reactive, onMounted, inject, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const router = useRouter()
const route = useRoute()
const cartCount = inject('cartCount', ref(0))

// ─── Trạng thái Tab ─────────────────────────────────────────────────────────────
const activeTab = ref('profile')

const tabs = [
  { id: 'profile',       label: 'Hồ sơ của tôi',       icon: 'ti ti-user-circle' },
  { id: 'orders',        label: 'Đơn mua',               icon: 'ti ti-package' },
  { id: 'notifications', label: 'Thông báo của tôi',    icon: 'ti ti-bell' },
  { id: 'address',       label: 'Địa chỉ',               icon: 'ti ti-map-pin' },
  { id: 'password',      label: 'Đổi mật khẩu',          icon: 'ti ti-lock' }
]

watch(activeTab, (newTab) => {
  if (newTab === 'notifications') {
    router.push('/notifications')
  }
})

// ─── Track Order Modal State ──────────────────────────────────────────────────
const trackModalOpen = ref(false)
const selectedOrderCode = ref('')

function openTrackModal(order) {
  selectedOrderCode.value = order.ghn_order_code || ('#SGS-' + order.id)
  trackModalOpen.value = true
}
const ratingModalOpen = ref(false)
const ratingOrder = ref(null)
const ratingItem = ref(null)
const selectedStars = ref(5)
const ratingComment = ref('')
const ratingPhotos = ref([])
const ratingPhotoPreviews = ref([])
const isSubmittingRating = ref(false)

const starLabels = {
  1: 'Tệ',
  2: 'Chưa tốt',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Tuyệt vời'
}

function openRatingModal(order, item) {
  ratingOrder.value = order
  ratingItem.value = item
  selectedStars.value = 5
  ratingComment.value = ''
  ratingPhotos.value = []
  ratingPhotoPreviews.value = []
  ratingModalOpen.value = true
}

function closeRatingModal() {
  ratingModalOpen.value = false
}

function handleRatingPhotoUpload(e) {
  const files = Array.from(e.target.files || [])
  if (!files.length) return
  files.slice(0, 5 - ratingPhotos.value.length).forEach(file => {
    if (file.type.startsWith('image/')) {
      ratingPhotos.value.push(file)
      const reader = new FileReader()
      reader.onload = (evt) => {
        ratingPhotoPreviews.value.push(evt.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
}

function removeRatingPhoto(idx) {
  ratingPhotos.value.splice(idx, 1)
  ratingPhotoPreviews.value.splice(idx, 1)
}

function viewRatingDetail(item) {
  if (!item.rating) return
  const imgs = item.rating.image_urls || item.rating.images || []
  let imgsHtml = ''
  if (imgs.length > 0) {
    imgsHtml = `<div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">` +
      imgs.map(src => `<img src="${src}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;" />`).join('') +
      `</div>`
  }
  Swal.fire({
    title: 'Đánh giá của bạn',
    html: `
      <div style="text-align: left; font-size: 13px; color: #334155; line-height: 1.6;">
        <div style="font-weight: 700; color: #f59e0b; font-size: 16px; margin-bottom: 8px;">★ ${item.rating.rating}/5 sao</div>
        <div style="background: #f8fafc; padding: 12px; border-radius: 12px; border: 1px solid #f1f5f9;">
          ${item.rating.comment ? item.rating.comment : '<em>Không có nhận xét văn bản.</em>'}
          ${imgsHtml}
        </div>
      </div>
    `,
    confirmButtonColor: '#FF4D00',
    confirmButtonText: 'Đóng'
  })
}

async function submitRating() {
  if (!ratingItem.value) return
  isSubmittingRating.value = true
  try {
    const formData = new FormData()
    formData.append('order_item_id', ratingItem.value.orderItemId)
    formData.append('rating', selectedStars.value)
    formData.append('comment', ratingComment.value || '')
    ratingPhotos.value.forEach(file => {
      formData.append('images[]', file)
    })

    const response = await axiosInstance.post('/ratings', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    if (response && response.success) {
      ratingItem.value.rating = {
        rating: selectedStars.value,
        comment: ratingComment.value,
        images: response.data?.image_urls || response.data?.images || ratingPhotoPreviews.value
      }
      Swal.fire({
        icon: 'success',
        title: 'Gửi đánh giá thành công!',
        text: 'Cảm ơn bạn đã chia sẻ ý kiến và hình ảnh thực tế.',
        confirmButtonColor: '#FF4D00'
      })
      closeRatingModal()
    }
  } catch (error) {
    const msg = error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá.'
    Swal.fire({
      icon: 'error',
      title: 'Không thể gửi đánh giá',
      text: msg,
      confirmButtonColor: '#FF4D00'
    })
  } finally {
    isSubmittingRating.value = false
  }
}

// ─── Dữ liệu người dùng ─────────────────────────────────────────────────────────
const user = reactive({
  name: 'Nguyễn Minh Anh',
  email: 'minhanh.nguyen@gmail.com',
  phone: '0987 654 321',
  gender: 'Nam',
  dob: '1998-05-12',
  avatar: ''
})

const avatarMode = ref('upload')
const avatarUrlInput = ref('')
const isUploadingAvatar = ref(false)
const fileInputRef = ref(null)

// ─── Password form ────────────────────────────────────────────────────────────
const passwordForm = reactive({ current: '', new: '', confirm: '' })

// ─── Orders ───────────────────────────────────────────────────────────────────
const orders = ref([])

// ─── Addresses ────────────────────────────────────────────────────────────────
const addresses = ref([])

const showAddForm = ref(false)
const newAddress = reactive({ name: '', phone: '', address: '', badge: 'Nhà riêng' })

async function loadAddresses() {
  try {
    const response = await axiosInstance.get('/addresses')
    if (response.success && response.data) {
      addresses.value = response.data.map(item => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        address: item.address,
        badge: item.badge,
        isDefault: !!item.is_default
      }))
    }
  } catch (error) {
    console.error('Failed to load addresses:', error)
  }
}

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
onMounted(async () => {
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
  const isSuccess = route.query.payment_success === '1' || route.query.status === 'success' || route.query.status === 'PAID'
  const successOrderId = route.query.order_id || route.query.orderCode
  if (isSuccess && successOrderId) {
    try {
      await axiosInstance.post(`/user/orders/${successOrderId}/confirm-payment`)
    } catch (e) {
      console.error('Confirm payment error:', e)
    }
  }
  loadUserData()
  await loadOrdersData()
  loadAddresses()
})

async function loadUserData() {
  try {
    const data = JSON.parse(localStorage.getItem('user') || '{}')
    if (data.name)   user.name   = data.name
    if (data.email)  user.email  = data.email
    if (data.phone)  user.phone  = data.phone
    if (data.avatar) {
      user.avatar = data.avatar
      avatarUrlInput.value = data.avatar
    }
    const dobValue = data.birthday || data.dob
    if (dobValue) {
      user.dob = dobValue.split(' ')[0]
    }
    if (data.gender) user.gender = data.gender

    // Gọi API /user từ server để đồng bộ thông tin mới nhất (kể cả khi vừa load lại trang hoặc chuyển route)
    const res = await axiosInstance.get('/user')
    const apiUser = res?.user || res?.data || res
    if (apiUser && apiUser.email) {
      if (apiUser.name)   user.name   = apiUser.name
      if (apiUser.email)  user.email  = apiUser.email
      if (apiUser.phone)  user.phone  = apiUser.phone
      if (apiUser.avatar !== undefined) {
        user.avatar = apiUser.avatar || ''
        avatarUrlInput.value = apiUser.avatar || ''
      }
      const apiDob = apiUser.birthday || apiUser.dob
      if (apiDob) user.dob = apiDob.split(' ')[0]
      if (apiUser.gender) user.gender = apiUser.gender

      const merged = { ...data, ...apiUser }
      localStorage.setItem('user', JSON.stringify(merged))
      window.dispatchEvent(new Event('user-profile-updated'))
    }
  } catch (e) {
    console.error('Error fetching user profile from server:', e)
  }
}

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/nike-air-force-1.png'
  
  const filename = String(imagePath).split('/').pop()
  const legacyMap = {
    'NIKE-AF1-WH.webp': '/images/nike-air-force-1.png',
    'NIKE-AF1-WH.png': '/images/nike-air-force-1.png',
    'NIKE-AJ1-BK.png': '/images/nike-black1.png',
    'NIKE-AJ1-BK.webp': '/images/nike-black1.png',
    'NIKE-DUNK-GR.webp': '/images/nike-university1.png',
    'NIKE-DUNK-GR.png': '/images/nike-university1.png',
    'ADIDAS-SAM-BK.webp': '/images/adidas-samba-og1.png',
    'ADIDAS-SAM-WH.webp': '/images/adidas_samba1.webp'
  }
  if (legacyMap[filename]) {
    return legacyMap[filename]
  }

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

async function loadOrdersData() {
  try {
    const response = await axiosInstance.get('/user/orders')
    if (response && response.success) {
      orders.value = response.data.map(order => {
        // Map items
        const items = (order.items || []).map(item => {
          const v = item.variant || {}
          const p = v.product || {}
          
          let img = '/images/placeholder.png'
          if (v.image) {
            img = getImageUrl(v.image)
          } else if (p.images && p.images.length > 0) {
            const firstImg = p.images[0]
            const imgPath = typeof firstImg === 'string' ? firstImg : (firstImg?.image || '')
            img = getImageUrl(imgPath)
          }

          return {
            orderItemId: item.id,
            name: p.name || 'Sản phẩm',
            variant: (v.color?.name || v.size?.name)
              ? `Màu ${v.color?.name || ''} · Size ${v.size?.name || ''}`
              : 'Mặc định',
            qty: item.quantity || 1,
            price: item.price || 0,
            image: img,
            variantId: v.id,
            productId: p.id,
            rating: item.rating || null
          }
        })

        return {
          id: order.id,
          orderId: 'SGS-' + order.id,
          date: order.created_at ? new Date(order.created_at).toLocaleDateString('vi-VN') : '',
          items: items,
          total: order.total_amount || 0,
          shipping: order.address || '',
          status: order.status || 'new',
          paymentStatus: order.payment_status || 'unpaid',
          paymentMethod: order.payment_method_id === 1 ? 'COD' : (order.payment_method_id === 2 ? 'Chuyển khoản' : 'VNPAY'),
          note: order.note || '',
          phone: order.phone || '',
          name: order.name || '',
          paymentMethodId: order.payment_method_id,
          ghn_order_code: order.ghn_order_code || null
        }
      })
    }
  } catch (error) {
    console.error('Failed to load user orders:', error)
  }
}

function viewOrderDetails(order) {
  const itemsHtml = order.items.map(item => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px;">
      <div style="display: flex; align-items: center; gap: 12px; text-align: left;">
        <div style="width: 48px; height: 48px; background: #f8fafc; display: flex; align-items: center; justify-content: center; border-radius: 8px; padding: 4px; flex-shrink: 0; border: 1px solid #e2e8f0;">
          <img src="${item.image}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        <div>
          <div style="font-weight: 700; color: #1e293b; line-height: 1.3;">${item.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${item.variant}</div>
        </div>
      </div>
      <div style="text-align: right; flex-shrink: 0; padding-left: 10px;">
        <div style="font-weight: 800; color: #FF4D00;">${formatPrice(item.price)}</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">x${item.qty}</div>
      </div>
    </div>
  `).join('')

  let historyHtml = ''
  if (order.histories && order.histories.length > 0) {
    historyHtml = order.histories.map((h, i) => `
      <div style="display: flex; gap: 12px; position: relative; padding-bottom: ${i === order.histories.length - 1 ? '0' : '14px'}; border-left: 2px solid ${i === 0 ? '#FF4D00' : '#cbd5e1'}; margin-left: 6px; padding-left: 14px;">
        <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; border-radius: 9999px; background: ${i === 0 ? '#FF4D00' : '#94a3b8'};"></div>
        <div>
          <div style="font-size: 12px; font-weight: 700; color: #0f172a;">${h.note || 'Cập nhật trạng thái'}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">⏱️ ${new Date(h.created_at).toLocaleString('vi-VN')}</div>
        </div>
      </div>
    `).join('')
  } else {
    historyHtml = `
      <div style="display: flex; gap: 12px; position: relative; margin-left: 6px; padding-left: 14px; border-left: 2px solid #FF4D00;">
        <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; border-radius: 9999px; background: #FF4D00;"></div>
        <div>
          <div style="font-size: 12px; font-weight: 700; color: #0f172a;">Khởi tạo đơn hàng</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">⏱️ ${order.date}</div>
        </div>
      </div>
    `
  }

  Swal.fire({
    title: `<div style="font-family: inherit; font-weight: 800; font-size: 18px; text-align: left; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; color: #0f172a;">Chi tiết đơn hàng ${order.orderId}</div>`,
    html: `
      <div style="font-family: inherit; text-align: left; padding: 8px 0; max-height: 70vh; overflow-y: auto;">
        <!-- Status & Date -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-size: 12px; font-weight: 700; color: #475569; background: #f8fafc; padding: 12px; border-radius: 12px; border: 1px solid #f1f5f9;">
          <span>Ngày đặt: ${order.date}</span>
          <span style="color: #FF4D00; background: rgba(255,77,0,0.06); padding: 4px 10px; border-radius: 9999px;">${getStatusText(order.status).toUpperCase()}</span>
        </div>

        <!-- Shipping details -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Thông tin nhận hàng</div>
          <div style="background: #f8fafc; padding: 14px; border-radius: 14px; border: 1px solid #f1f5f9; font-size: 13px; color: #334155; line-height: 1.5;">
            <div><strong style="color: #0f172a;">Người nhận:</strong> ${order.name}</div>
            <div style="margin-top: 4px;"><strong style="color: #0f172a;">Số điện thoại:</strong> ${order.phone}</div>
            <div style="margin-top: 4px;"><strong style="color: #0f172a;">Địa chỉ:</strong> ${order.shipping}</div>
            ${order.note ? `<div style="margin-top: 4px; padding-top: 6px; border-top: 1px dashed #e2e8f0;"><strong style="color: #0f172a;">Ghi chú:</strong> ${order.note}</div>` : ''}
          </div>
        </div>

        <!-- Order Timeline -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Hành trình & Lịch sử đơn hàng</div>
          <div style="background: #f8fafc; padding: 14px; border-radius: 14px; border: 1px solid #f1f5f9;">
            ${historyHtml}
          </div>
        </div>

        <!-- Payment details -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Hình thức thanh toán</div>
          <div style="background: #f8fafc; padding: 14px; border-radius: 14px; border: 1px solid #f1f5f9; font-size: 13px; color: #334155; display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 20px; color: #FF4D00;"><i class="ti ${order.paymentMethod === 'COD' ? 'ti-cash' : 'ti-building-bank'}"></i></div>
            <div>
              <div style="font-weight: 700; color: #0f172a;">${order.paymentMethod}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Trạng thái: ${getPaymentStatusText(order.paymentStatus)}</div>
            </div>
          </div>
        </div>

        <!-- Products -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Sản phẩm đã mua</div>
          <div style="border: 1px solid #f1f5f9; border-radius: 14px; padding: 0 14px; background: #ffffff;">
            ${itemsHtml}
          </div>
        </div>

        <!-- Price summary -->
        <div style="background: #f8fafc; padding: 14px; border-radius: 14px; border: 1px solid #f1f5f9; font-size: 13px; color: #475569;">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; color: #0f172a; border-top: 1px dashed #e2e8f0; padding-top: 8px; margin-top: 4px;">
            <span>Tổng số tiền:</span>
            <span style="color: #FF4D00; font-size: 16px; font-weight: 800;">${formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    `,
    width: '520px',
    confirmButtonColor: '#FF4D00',
    confirmButtonText: 'Đóng',
    showCloseButton: true,
  })
}

async function reorder(order) {
  Swal.fire({
    title: 'Đặt lại đơn hàng?',
    text: 'Tất cả sản phẩm trong đơn hàng này sẽ được thêm lại vào giỏ hàng của bạn.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý đặt lại!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: 'Đang xử lý...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })
      try {
        const promises = order.items.map(item => {
          return axiosInstance.post('/cart', {
            variant_id: item.variantId,
            quantity: item.qty
          })
        })
        
        await Promise.all(promises)
        
        // Cập nhật số lượng giỏ hàng trên Header
        cartCount.value += order.items.reduce((acc, i) => acc + i.qty, 0)
        
        Swal.close()
        Swal.fire({
          icon: 'success',
          title: 'Đã thêm vào giỏ hàng! 🛒',
          text: 'Các sản phẩm đã được thêm lại vào giỏ hàng thành công.',
          confirmButtonColor: '#FF4D00',
          confirmButtonText: 'Đi đến Giỏ hàng'
        }).then(() => {
          router.push({ name: 'cart' })
        })
      } catch (error) {
        Swal.close()
        console.error('Failed to reorder items:', error)
        Swal.fire({
          icon: 'error',
          title: 'Thất bại',
          text: error.response?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng.',
          confirmButtonColor: '#FF4D00'
        })
      }
    }
  })
}

// ─── Cancel Order & Refund Request State ─────────────────────────────────────
const cancelModalOpen = ref(false)
const targetOrderToCancel = ref(null)

const cancelForm = ref({
  reasonPreset: 'Thay đổi ý định mua hàng',
  reasonDetail: '',
  bankName: 'Vietcombank - Ngân hàng TMCP Ngoại Thương Việt Nam',
  customBankName: '',
  bankAccount: '',
  bankHolder: '',
  notes: ''
})

const vietnameseBanks = [
  'Vietcombank - Ngân hàng TMCP Ngoại Thương Việt Nam',
  'MB Bank - Ngân hàng TMCP Quân Đội',
  'Techcombank - Ngân hàng TMCP Kỹ Thương',
  'BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
  'VietinBank - Ngân hàng TMCP Công Thương',
  'Agribank - Ngân hàng Nông nghiệp và Phát triển Nông thôn',
  'VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng',
  'ACB - Ngân hàng TMCP Á Châu',
  'TPBank - Ngân hàng TMCP Tiên Phong',
  'Sacombank - Ngân hàng TMCP Sài Gòn Thương Tín',
  'MSB - Ngân hàng TMCP Hàng Hải Việt Nam',
  'VIB - Ngân hàng TMCP Quốc Tế Việt Nam',
  'SHB - Ngân hàng TMCP Sài Gòn - Hà Nội',
  'HD Bank - Ngân hàng TMCP Phát triển TP.HCM',
  'LienVietPostBank (LPBank) - Ngân hàng Lộc Phát Việt Nam',
  'OCB - Ngân hàng TMCP Phương Đông',
  'SeABank - Ngân hàng TMCP Đông Nam Á',
  'Ngân hàng khác (Tự nhập tên)'
]

const cancelReasonPresets = [
  'Thay đổi ý định mua hàng',
  'Muốn đổi sang sản phẩm khác (màu/size/mẫu)',
  'Thời gian giao hàng quá lâu',
  'Tìm thấy nơi bán giá tốt hơn',
  'Lỡ đặt nhầm / trùng đơn hàng',
  'Muốn thay đổi thông tin giao hàng / người nhận',
  'Lý do khác (Nhập chi tiết bên dưới)'
]

function openCancelModal(order) {
  targetOrderToCancel.value = order
  cancelForm.value = {
    reasonPreset: 'Thay đổi ý định mua hàng',
    reasonDetail: '',
    bankName: 'Vietcombank - Ngân hàng TMCP Ngoại Thương Việt Nam',
    customBankName: '',
    bankAccount: '',
    bankHolder: '',
    notes: ''
  }
  cancelModalOpen.value = true
}

function closeCancelModal() {
  cancelModalOpen.value = false
  targetOrderToCancel.value = null
}

function removeAccents(str) {
  if (!str) return ''
  return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
}

function onBankHolderInput() {
  if (cancelForm.value.bankHolder) {
    cancelForm.value.bankHolder = removeAccents(cancelForm.value.bankHolder).toUpperCase()
  }
}

async function submitCancelOrder() {
  if (!targetOrderToCancel.value) return

  const isPaid = targetOrderToCancel.value.paymentStatus === 'paid'

  let finalBankName = cancelForm.value.bankName
  if (finalBankName === 'Ngân hàng khác (Tự nhập tên)') {
    finalBankName = cancelForm.value.customBankName.trim()
  }

  if (isPaid) {
    if (!finalBankName) {
      Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Vui lòng chọn hoặc nhập Tên ngân hàng nhận hoàn tiền!', confirmButtonColor: '#FF4D00' })
      return
    }
    if (!cancelForm.value.bankAccount.trim()) {
      Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Vui lòng nhập Số tài khoản ngân hàng!', confirmButtonColor: '#FF4D00' })
      return
    }
    if (!cancelForm.value.bankHolder.trim()) {
      Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Vui lòng nhập Tên chủ tài khoản ngân hàng!', confirmButtonColor: '#FF4D00' })
      return
    }
  }

  let fullReason = cancelForm.value.reasonPreset
  if (cancelForm.value.reasonDetail.trim()) {
    fullReason += `: ${cancelForm.value.reasonDetail.trim()}`
  }

  const payload = {
    reason: fullReason,
    // Chỉ khôi phục giỏ hàng khi đơn chưa thanh toán
    // Đơn đã thanh toán thì không restore vì khách đang chờ hoàn tiền
    restore_cart: !isPaid
  }

  if (isPaid) {
    payload.bank_name = finalBankName
    payload.bank_account_number = cancelForm.value.bankAccount.trim()
    payload.bank_account_name = cancelForm.value.bankHolder.trim().toUpperCase()
    if (cancelForm.value.notes.trim()) {
      payload.refund_notes = cancelForm.value.notes.trim()
    }
  }

  Swal.fire({ title: 'Đang xử lý hủy đơn...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

  try {
    const response = await axiosInstance.post(`/user/orders/${targetOrderToCancel.value.id}/cancel`, payload)
    Swal.close()
    cancelModalOpen.value = false

    if (response && response.success) {
      const msg = isPaid
        ? `Đơn hàng ${targetOrderToCancel.value.orderId} đã hủy và gửi yêu cầu hoàn tiền thành công!\nHệ thống sẽ kiểm tra và hoàn tiền về tài khoản ngân hàng của bạn.`
        : `Đơn hàng ${targetOrderToCancel.value.orderId} đã được hủy thành công.`

      Swal.fire({
        icon: 'success',
        title: isPaid ? 'Đã gửi yêu cầu hoàn tiền! 💸' : 'Hủy đơn thành công!',
        text: msg,
        confirmButtonText: 'Quay lại Giỏ hàng 🛒',
        confirmButtonColor: '#FF4D00'
      }).then(() => {
        router.push({ name: 'cart' })
      })
      await loadOrdersData()
    }
  } catch (error) {
    Swal.close()
    console.error('Failed to cancel order:', error)
    Swal.fire({
      icon: 'error',
      title: 'Hủy đơn thất bại',
      text: error.response?.data?.message || 'Không thể xử lý yêu cầu hủy đơn.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

// ─── Status helpers ───────────────────────────────────────────────────────────
function getStatusText(status) {
  switch (status) {
    case 'new': return 'Đang chờ duyệt'
    case 'pending': return 'Chờ xác nhận'
    case 'shipping': return 'Đang giao hàng'
    case 'delivered': return 'Đã hoàn thành'
    case 'cancelled': return 'Đã hủy'
    default: return status
  }
}

function getStatusColor(status) {
  if (status === 'delivered') return 'text-green-600'
  if (status === 'shipping') return 'text-blue-500'
  if (['new', 'pending'].includes(status)) return 'text-yellow-600'
  return 'text-red-500'
}

function getStatusIcon(status) {
  if (status === 'delivered') return 'ti ti-circle-check'
  if (status === 'shipping') return 'ti ti-truck-delivery'
  if (['new', 'pending'].includes(status)) return 'ti ti-clock'
  return 'ti ti-x'
}

function getPaymentStatusText(status) {
  const s = String(status).toLowerCase()
  if (s === 'paid' || s === 'completed' || s === '1' || s === 'thành công' || s === 'đã thanh toán') return 'Đã thanh toán'
  return 'Chưa thanh toán'
}

function getPaymentStatusBadgeClass(status) {
  const s = String(status).toLowerCase()
  if (s === 'paid' || s === 'completed' || s === '1' || s === 'thành công' || s === 'đã thanh toán') return 'bg-[#e6f4ea] text-[#137333] border border-[#ceead6]'
  return 'bg-surface2 text-text-muted border border-border'
}

// ─── Address helpers ──────────────────────────────────────────────────────────
async function addAddress() {
  if (!newAddress.name || !newAddress.phone || !newAddress.address) {
    Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Vui lòng điền đầy đủ thông tin địa chỉ.', confirmButtonColor: '#FF4D00' })
    return
  }
  
  Swal.fire({ title: 'Đang xử lý...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })
  
  try {
    const response = await axiosInstance.post('/addresses', {
      name: newAddress.name,
      phone: newAddress.phone,
      address: newAddress.address,
      badge: newAddress.badge,
      is_default: newAddress.badge === 'Mặc định'
    })
    
    Swal.close()
    
    if (response.success) {
      Object.assign(newAddress, { name: '', phone: '', address: '', badge: 'Nhà riêng' })
      showAddForm.value = false
      await loadAddresses()
      Swal.fire({ icon: 'success', title: 'Đã thêm địa chỉ!', timer: 1500, showConfirmButton: false })
    }
  } catch (error) {
    Swal.close()
    console.error('Failed to add address:', error)
    Swal.fire({ icon: 'error', title: 'Lỗi', text: error.response?.data?.message || 'Không thể thêm địa chỉ.', confirmButtonColor: '#FF4D00' })
  }
}

async function editAddress(idx) {
  const addr = addresses.value[idx]
  const { value: formValues } = await Swal.fire({
    title: 'Cập nhật địa chỉ',
    html:
      `<div style="text-align: left; display: flex; flex-direction: column; gap: 12px;">` +
      `  <div>` +
      `    <label style="font-size: 13px; font-weight: 600; color: #666; display: block; margin-bottom: 4px;">Họ tên</label>` +
      `    <input id="swal-input-name" class="swal2-input" style="margin: 0; width: 100%; box-sizing: border-box;" value="${addr.name}">` +
      `  </div>` +
      `  <div>` +
      `    <label style="font-size: 13px; font-weight: 600; color: #666; display: block; margin-bottom: 4px;">Số điện thoại</label>` +
      `    <input id="swal-input-phone" class="swal2-input" style="margin: 0; width: 100%; box-sizing: border-box;" value="${addr.phone}">` +
      `  </div>` +
      `  <div>` +
      `    <label style="font-size: 13px; font-weight: 600; color: #666; display: block; margin-bottom: 4px;">Địa chỉ chi tiết</label>` +
      `    <input id="swal-input-address" class="swal2-input" style="margin: 0; width: 100%; box-sizing: border-box;" value="${addr.address}">` +
      `  </div>` +
      `  <div>` +
      `    <label style="font-size: 13px; font-weight: 600; color: #666; display: block; margin-bottom: 4px;">Loại địa chỉ</label>` +
      `    <select id="swal-input-badge" class="swal2-input" style="margin: 0; width: 100%; box-sizing: border-box; height: 48px; padding: 0 10px;">` +
      `      <option value="Mặc định" ${addr.badge === 'Mặc định' ? 'selected' : ''}>Mặc định</option>` +
      `      <option value="Nhà riêng" ${addr.badge === 'Nhà riêng' ? 'selected' : ''}>Nhà riêng</option>` +
      `      <option value="Văn phòng" ${addr.badge === 'Văn phòng' ? 'selected' : ''}>Văn phòng</option>` +
      `    </select>` +
      `  </div>` +
      `</div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#FF4D00',
    preConfirm: () => {
      const name = document.getElementById('swal-input-name').value.trim()
      const phone = document.getElementById('swal-input-phone').value.trim()
      const address = document.getElementById('swal-input-address').value.trim()
      const badge = document.getElementById('swal-input-badge').value
      if (!name || !phone || !address) {
        Swal.showValidationMessage('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ.')
        return false
      }
      return { name, phone, address, badge }
    }
  })

  if (formValues) {
    Swal.fire({ title: 'Đang cập nhật...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })
    try {
      const response = await axiosInstance.put(`/addresses/${addr.id}`, {
        name: formValues.name,
        phone: formValues.phone,
        address: formValues.address,
        badge: formValues.badge,
        is_default: formValues.badge === 'Mặc định'
      })
      Swal.close()
      if (response.success) {
        await loadAddresses()
        Swal.fire({ icon: 'success', title: 'Cập nhật địa chỉ thành công!', timer: 1500, showConfirmButton: false })
      }
    } catch (error) {
      Swal.close()
      console.error('Failed to update address:', error)
      Swal.fire({ icon: 'error', title: 'Lỗi', text: error.response?.data?.message || 'Không thể cập nhật địa chỉ.', confirmButtonColor: '#FF4D00' })
    }
  }
}

function removeAddress(idx) {
  const addr = addresses.value[idx]
  Swal.fire({
    title: 'Xóa địa chỉ?',
    text: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#aaa'
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: 'Đang xóa...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })
      try {
        const response = await axiosInstance.delete(`/addresses/${addr.id}`)
        Swal.close()
        if (response.success) {
          await loadAddresses()
          Swal.fire({ icon: 'success', title: 'Đã xóa địa chỉ!', timer: 1500, showConfirmButton: false })
        }
      } catch (error) {
        Swal.close()
        console.error('Failed to delete address:', error)
        Swal.fire({ icon: 'error', title: 'Lỗi', text: error.response?.data?.message || 'Không thể xóa địa chỉ.', confirmButtonColor: '#FF4D00' })
      }
    }
  })
}

// ─── Avatar & Cropper handlers ───────────────────────────────────────────────
const cropperModalOpen = ref(false)
const cropCanvasRef = ref(null)
const cropImageObj = ref(null)
const cropZoom = ref(1)
const cropRotation = ref(0)
const cropPan = reactive({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })

function openCropperWithFile(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      cropImageObj.value = img
      cropZoom.value = 1
      cropRotation.value = 0
      cropPan.x = 0
      cropPan.y = 0
      cropperModalOpen.value = true
      nextTick(() => {
        renderCanvas()
      })
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

function renderCanvas() {
  const canvas = cropCanvasRef.value
  if (!canvas || !cropImageObj.value) return
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)
  ctx.save()

  ctx.translate(width / 2 + cropPan.x, height / 2 + cropPan.y)
  ctx.rotate((cropRotation.value * Math.PI) / 180)
  ctx.scale(cropZoom.value, cropZoom.value)

  const img = cropImageObj.value
  const scale = Math.max(width / img.width, height / img.height)
  const drawW = img.width * scale
  const drawH = img.height * scale

  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH)
  ctx.restore()
}

function rotateImage() {
  cropRotation.value = (cropRotation.value + 90) % 360
  renderCanvas()
}

function resetCrop() {
  cropZoom.value = 1
  cropRotation.value = 0
  cropPan.x = 0
  cropPan.y = 0
  renderCanvas()
}

function startDrag(e) {
  isDragging.value = true
  dragStart.x = e.clientX - cropPan.x
  dragStart.y = e.clientY - cropPan.y
}

function onDrag(e) {
  if (!isDragging.value) return
  cropPan.x = e.clientX - dragStart.x
  cropPan.y = e.clientY - dragStart.y
  renderCanvas()
}

function startDragTouch(e) {
  if (e.touches.length === 1) {
    isDragging.value = true
    dragStart.x = e.touches[0].clientX - cropPan.x
    dragStart.y = e.touches[0].clientY - cropPan.y
  }
}

function onDragTouch(e) {
  if (!isDragging.value || e.touches.length !== 1) return
  cropPan.x = e.touches[0].clientX - dragStart.x
  cropPan.y = e.touches[0].clientY - dragStart.y
  renderCanvas()
}

function stopDrag() {
  isDragging.value = false
}

function closeCropperModal() {
  cropperModalOpen.value = false
  cropImageObj.value = null
}

async function confirmCropAndUpload() {
  const canvas = cropCanvasRef.value
  if (!canvas) return

  isUploadingAvatar.value = true

  canvas.toBlob(async (blob) => {
    if (!blob) {
      isUploadingAvatar.value = false
      return
    }

    const formData = new FormData()
    formData.append('image', blob, 'avatar_cropped.jpg')

    try {
      const res = await axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const newAvatar = res?.filename || res?.url
      if (newAvatar) {
        user.avatar = newAvatar
        avatarUrlInput.value = newAvatar
        closeCropperModal()
        await saveAvatarToBackend(newAvatar)
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          title: 'Căn chỉnh & lưu ảnh đại diện thành công!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    } catch (err) {
      console.error('Avatar upload failed:', err)
      Swal.fire({ icon: 'error', title: 'Tải ảnh thất bại', text: err.response?.data?.message || 'Không thể tải ảnh lên.', confirmButtonColor: '#FF4D00' })
    } finally {
      isUploadingAvatar.value = false
    }
  }, 'image/jpeg', 0.92)
}

async function saveAvatarToBackend(newAvatar) {
  try {
    const response = await axiosInstance.put('/user/profile', {
      name: user.name,
      phone: user.phone,
      birthday: user.dob,
      gender: user.gender,
      avatar: newAvatar
    })
    const updatedUser = response?.data?.user || response?.user || response
    if (updatedUser) {
      const cached = JSON.parse(localStorage.getItem('user') || '{}')
      const merged = { ...cached, ...updatedUser, avatar: newAvatar }
      localStorage.setItem('user', JSON.stringify(merged))
      window.dispatchEvent(new Event('user-profile-updated'))
    }
  } catch (err) {
    console.error('Lỗi khi tự động lưu avatar lên server:', err)
  }
}

function handleAvatarFileUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    Swal.fire({ icon: 'error', title: 'Lỗi định dạng', text: 'Vui lòng chọn file hình ảnh (PNG, JPG, WEBP,...).', confirmButtonColor: '#FF4D00' })
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    Swal.fire({ icon: 'error', title: 'File quá lớn', text: 'Kích thước ảnh không được vượt quá 5MB.', confirmButtonColor: '#FF4D00' })
    return
  }

  openCropperWithFile(file)
  if (e.target) e.target.value = ''
}

async function applyAvatarUrl() {
  if (avatarUrlInput.value.trim()) {
    user.avatar = avatarUrlInput.value.trim()
    await saveAvatarToBackend(user.avatar)
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Đã áp dụng & lưu URL ảnh đại diện!',
      showConfirmButton: false,
      timer: 2000
    })
  }
}

async function removeAvatar() {
  user.avatar = ''
  avatarUrlInput.value = ''
  await saveAvatarToBackend('')
}

// ─── Form handlers ────────────────────────────────────────────────────────────
async function handleSaveProfile() {
  try {
    const response = await axiosInstance.put('/user/profile', {
      name: user.name,
      phone: user.phone,
      birthday: user.dob,
      gender: user.gender,
      avatar: user.avatar
    })

    const updatedUser = response?.data?.user || response?.user || response
    if (updatedUser) {
      const cached = JSON.parse(localStorage.getItem('user') || '{}')
      const merged = { ...cached, ...updatedUser }
      localStorage.setItem('user', JSON.stringify(merged))
      window.dispatchEvent(new Event('user-profile-updated'))
      
      Swal.fire({ 
        icon: 'success', 
        title: 'Cập nhật thành công!', 
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
  Swal.fire({ icon: 'success', title: 'Đổi mật khẩu thành công!', text: 'Mật khẩu của bạn đã được thay đổi an toàn.', confirmButtonColor: '#FF4D00' })
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
