<template>
  <HomeLayout>
    <main class="flex-1 flex items-center justify-center py-12 px-5 relative min-h-[calc(100vh-72px-340px)] bg-surface2 overflow-hidden">
      <!-- Decorative Background Blobs -->
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <div class="w-full max-w-[440px] relative z-10 mx-auto">
        <div class="bg-bg p-8 md:p-10 rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-border relative overflow-hidden">
          <!-- Top Orange Accent Bar -->
          <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-[#ff8c5a]"></div>

          <!-- Panel: Enter New Password Form -->
          <div v-if="!success" class="panel active" id="pForm">
            <!-- Verified Email Banner -->
            <div class="flex items-start gap-2.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3.5 mb-6 text-left">
              <i class="ti ti-circle-check text-success text-xl shrink-0 mt-0.5"></i>
              <p class="text-[12.5px] text-[#166534] leading-relaxed">
                Liên kết xác minh hợp lệ. Tài khoản <strong id="tokenEmail" class="font-bold">{{ email }}</strong> đã được xác thực thành công.
              </p>
            </div>

            <div class="text-center mb-6">
              <div class="w-14 h-14 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/10">
                <i class="ti ti-lock-open text-2xl text-accent"></i>
              </div>
              <h1 class="text-xl font-bold font-display text-text mb-1">Đặt lại mật khẩu mới</h1>
              <p class="text-sm text-text-muted leading-relaxed">Vui lòng nhập mật khẩu mới và xác nhận để bảo mật tài khoản.</p>
            </div>

            <form @submit.prevent="submitReset">
              <!-- Password input -->
              <div class="mb-4 text-left">
                <label for="newPass" class="block text-xs font-semibold text-text uppercase tracking-wider mb-2">Mật khẩu mới</label>
                <div 
                  class="relative flex items-center w-full"
                  :class="{ 'shake': shakeNewPass }"
                >
                  <i class="absolute left-4 text-text-dim text-lg pointer-events-none ti ti-lock"></i>
                  <input 
                    :type="showNewPass ? 'text' : 'password'" 
                    id="newPass" 
                    placeholder="Mật khẩu từ 8 ký tự trở lên" 
                    v-model="newPass"
                    required
                    autocomplete="new-password" 
                    class="w-full py-3.5 pl-12 pr-12 bg-surface border border-border rounded-xl text-sm text-text outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/8 transition-all"
                  >
                  <button 
                    class="absolute right-4 text-text-dim hover:text-accent text-lg flex items-center justify-center p-1 transition-colors cursor-pointer" 
                    @click.prevent="showNewPass = !showNewPass" 
                    type="button"
                  >
                    <i :class="showNewPass ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
                  </button>
                </div>
                
                <!-- Strength indicator -->
                <div class="h-1 bg-border rounded-full overflow-hidden mt-3.5">
                  <div 
                    class="strength-fill h-full rounded transition-all duration-300" 
                    :class="strengthInfo.colorClass"
                    :style="{ width: strengthInfo.percent + '%' }"
                  ></div>
                </div>
                <div v-if="newPass && strengthInfo.label" class="flex items-center gap-1.5 min-h-[18px] text-[12px] mt-2">
                  <i :class="strengthInfo.iconClass"></i>
                  <span class="font-semibold" :class="strengthInfo.textClass">{{ strengthInfo.label }}</span>
                </div>
              </div>

              <!-- Confirm password input -->
              <div class="mb-6 text-left">
                <label for="confirmPass" class="block text-xs font-semibold text-text uppercase tracking-wider mb-2">Xác nhận mật khẩu</label>
                <div 
                  class="relative flex items-center w-full"
                  :class="{ 'shake': shakeConfirmPass }"
                >
                  <i class="absolute left-4 text-text-dim text-lg pointer-events-none ti ti-lock-check"></i>
                  <input 
                    :type="showConfirmPass ? 'text' : 'password'" 
                    id="confirmPass" 
                    placeholder="Nhập lại mật khẩu để khớp" 
                    v-model="confirmPass"
                    required
                    autocomplete="new-password" 
                    class="w-full py-3.5 pl-12 pr-12 bg-surface border rounded-xl text-sm text-text outline-none focus:bg-white focus:ring-4 transition-all"
                    :class="confirmInputClasses"
                  >
                  <button 
                    class="absolute right-4 text-text-dim hover:text-accent text-lg flex items-center justify-center p-1 transition-colors cursor-pointer" 
                    @click.prevent="showConfirmPass = !showConfirmPass" 
                    type="button"
                  >
                    <i :class="showConfirmPass ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
                  </button>
                </div>
                <div v-if="confirmPass" class="text-[12px] min-h-[18px] mt-2 flex items-center gap-1.5 transition-all">
                  <i :class="confirmStatus.iconClass"></i>
                  <span class="font-medium" :class="confirmStatus.textClass">{{ confirmStatus.label }}</span>
                </div>
              </div>

              <div class="flex items-start gap-2.5 bg-accent-light border border-accent/10 rounded-xl p-3.5 mb-6 text-left">
                <i class="ti ti-shield-check text-accent text-lg shrink-0 mt-0.5"></i>
                <p class="text-xs text-text-muted leading-relaxed">
                  Mật khẩu được mã hoá an toàn. Sau khi đổi, tất cả thiết bị khác đang đăng nhập sẽ bị <strong>đăng xuất</strong>.
                </p>
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 bg-accent text-white font-semibold rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.2)] transition-all hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loading"
              >
                <span v-if="loading" class="flex items-center justify-center gap-2">
                  <i class="ti ti-loader-2 animate-spin text-lg"></i>
                  Đang xử lý...
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  Xác nhận đặt lại mật khẩu <i class="ti ti-shield-lock"></i>
                </span>
              </button>
            </form>
          </div>

          <!-- Panel: Success -->
          <div v-else class="panel active" id="pSuccess">
            <div class="text-center py-4">
              <div class="success-ring w-14 h-14 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/10 relative">
                <i class="ti ti-circle-check text-3xl text-accent"></i>
              </div>
              <h2 class="text-xl font-bold font-display text-text mb-2">Đổi mật khẩu thành công!</h2>
              <p class="text-sm text-text-muted leading-relaxed mb-6">
                Tài khoản <strong id="successEmail" class="text-accent font-semibold">{{ email }}</strong> đã được cập nhật mật khẩu bảo mật mới.
              </p>
              
              <div class="inline-flex items-center gap-2 bg-[#fff8f5] border border-[#ffd6c5] rounded-xl px-4 py-2.5 mb-8">
                <i class="ti ti-logout text-accent text-base"></i>
                <span class="text-xs text-text-muted">Chuyển hướng về đăng nhập sau <strong class="text-accent">{{ countdown }}</strong> giây</span>
              </div>

              <router-link to="/login" class="block w-full">
                <button class="w-full py-3.5 bg-accent text-white font-semibold rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.2)] transition-all hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] active:scale-[0.98] flex items-center justify-center gap-2">
                  Đăng nhập ngay <i class="ti ti-login"></i>
                </button>
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </main>
  </HomeLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import axiosInstance from '@/api/axios.js'

defineOptions({ name: 'ResetPasswordView' })

const route = useRoute()
const router = useRouter()

const email = ref('user@example.com')
const token = ref('')
const newPass = ref('')
const confirmPass = ref('')
const showNewPass = ref(false)
const showConfirmPass = ref(false)

const loading = ref(false)
const success = ref(false)
const countdown = ref(5)
let timerInterval = null

const shakeNewPass = ref(false)
const shakeConfirmPass = ref(false)

onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email
  }
  if (route.query.token) {
    token.value = route.query.token
  }
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

// Calculate password strength
const score = computed(() => {
  const v = newPass.value
  if (!v) return 0
  let s = 0;
  if (v.length >= 8) s++;
  if (v.length >= 12) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return Math.min(s, 5);
})

const strengthInfo = computed(() => {
  const s = score.value
  const levels = [
    { label: '', colorClass: 'bg-transparent', textClass: '', iconClass: '', percent: 0 },
    { label: 'Rất yếu', colorClass: 'bg-red-500', textClass: 'text-red-500', iconClass: 'ti ti-alert-triangle text-red-500', percent: 20 },
    { label: 'Yếu', colorClass: 'bg-orange-500', textClass: 'text-orange-500', iconClass: 'ti ti-alert-triangle text-orange-500', percent: 40 },
    { label: 'Trung bình', colorClass: 'bg-yellow-500', textClass: 'text-yellow-500', iconClass: 'ti ti-alert-triangle text-yellow-500', percent: 60 },
    { label: 'Mạnh', colorClass: 'bg-green-500', textClass: 'text-green-500', iconClass: 'ti ti-shield-check text-green-500', percent: 80 },
    { label: 'Rất mạnh', colorClass: 'bg-emerald-600', textClass: 'text-emerald-600', iconClass: 'ti ti-shield-check text-emerald-600', percent: 100 },
  ]
  return levels[s]
})

// Password matching state
const isMatch = computed(() => {
  return confirmPass.value === newPass.value
})

const confirmStatus = computed(() => {
  if (!confirmPass.value) return { label: '', textClass: '', iconClass: '' }
  if (isMatch.value) {
    return {
      label: 'Mật khẩu trùng khớp',
      textClass: 'text-success',
      iconClass: 'ti ti-circle-check text-success text-sm'
    }
  } else {
    return {
      label: 'Mật khẩu chưa trùng khớp',
      textClass: 'text-accent',
      iconClass: 'ti ti-alert-circle text-accent text-sm'
    }
  }
})

const confirmInputClasses = computed(() => {
  if (!confirmPass.value) {
    return 'border-border focus:border-accent focus:ring-accent/8'
  }
  if (isMatch.value) {
    return 'border-success focus:border-success focus:ring-success/8'
  } else {
    return 'border-accent focus:border-accent focus:ring-accent/8'
  }
})

async function submitReset() {
  if (!newPass.value || score.value < 2) {
    shakeNewPass.value = true
    setTimeout(() => shakeNewPass.value = false, 400)
    return
  }
  if (!isMatch.value) {
    shakeConfirmPass.value = true
    setTimeout(() => shakeConfirmPass.value = false, 400)
    return
  }

  loading.value = true
  try {
    const response = await axiosInstance.post('/reset-password', {
      token: token.value,
      email: email.value,
      password: newPass.value,
      password_confirmation: confirmPass.value
    })
    
    if (response.success) {
      success.value = true
      
      // Đếm ngược chuyển trang
      timerInterval = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timerInterval)
          router.push('/login')
        }
      }, 1000)
    }
  } catch (error) {
    console.error('Reset password error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.blob {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 77, 0, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  z-index: 1;
  filter: blur(40px);
}

.blob-1 {
  top: -100px;
  right: -100px;
}

.blob-2 {
  bottom: -100px;
  left: -100px;
}

.panel {
  animation: fadeSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.success-ring::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid rgba(255, 77, 0, 0.15);
  animation: ping 1.5s ease-out infinite;
}

@keyframes ping {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.4); opacity: 0; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

.shake {
  animation: shake 0.4s ease;
}
</style>
