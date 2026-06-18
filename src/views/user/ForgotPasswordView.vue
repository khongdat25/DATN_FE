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

          <!-- STEP 1: Enter Email -->
          <div v-if="!success" class="step-panel active" id="formPanel">
            <div class="text-center mb-8">
              <div class="w-14 h-14 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/10">
                <i class="ti ti-lock text-2xl text-accent"></i>
              </div>
              <h1 class="text-xl font-bold font-display text-text mb-2">Quên mật khẩu?</h1>
              <p class="text-sm text-text-muted leading-relaxed">Vui lòng nhập địa chỉ email của bạn. Chúng tôi sẽ gửi một liên kết khôi phục để đặt lại mật khẩu mới.</p>
            </div>

            <form @submit.prevent="submitEmail">
              <div class="mb-6 text-left">
                <label class="block text-xs font-semibold text-text uppercase tracking-wider mb-2">Địa chỉ Email</label>
                <div class="input-wrapper relative flex items-center w-full focus-within:text-accent">
                  <i class="absolute left-4 text-text-dim text-lg transition-colors ti ti-mail"></i>
                  <input 
                    type="email" 
                    id="emailInput" 
                    placeholder="username@gmail.com" 
                    v-model="email"
                    required
                    class="w-full py-3.5 pl-12 pr-4 bg-surface border border-border rounded-xl text-sm text-text outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/8 transition-all"
                  >
                </div>
                <p class="text-xs text-text-dim mt-2 flex items-center gap-1">
                  <i class="ti ti-info-circle"></i> Sử dụng email bạn đã dùng để đăng ký tài khoản.
                </p>
              </div>

              <button 
                type="submit" 
                class="w-full py-3.5 bg-accent text-white font-semibold rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.2)] transition-all hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loading"
              >
                <span v-if="loading" class="flex items-center justify-center gap-2">
                  <i class="ti ti-loader-2 animate-spin text-lg"></i>
                  Đang gửi...
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  Gửi liên kết khôi phục <i class="ti ti-mail-forward"></i>
                </span>
              </button>
            </form>

            <p class="text-center mt-6 text-sm text-text-muted">
              Quay lại trang <router-link to="/login" class="text-accent font-semibold hover:underline">Đăng nhập</router-link>
            </p>
          </div>

          <!-- STEP 2: Verification Successful / Check Email -->
          <div v-else class="step-panel active" id="successPanel">
            <div class="text-center py-4">
              <div class="success-ring w-14 h-14 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/10 relative">
                <div class="absolute inset-[-6px] rounded-full border border-accent/25 animate-ping"></div>
                <i class="ti ti-mail-opened text-2xl text-accent"></i>
              </div>
              <h1 class="text-xl font-bold font-display text-text mb-2">Kiểm tra hòm thư của bạn</h1>
              <p class="text-sm text-text-muted leading-relaxed mb-6">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến địa chỉ email:<br>
                <strong class="text-accent font-semibold">{{ email }}</strong>
              </p>
              
              <div class="flex items-start gap-2.5 bg-accent-light border border-accent/10 rounded-xl p-3.5 mb-8 text-left">
                <i class="ti ti-alert-circle text-accent text-lg shrink-0 mt-0.5 animate-pulse"></i>
                <p class="text-xs text-text-muted leading-relaxed">
                  <strong>Không nhận được email?</strong> Vui lòng kiểm tra trong hộp thư rác (Spam), thư quảng cáo, hoặc thử gửi lại.
                </p>
              </div>

              <div class="flex flex-col gap-3">
                <router-link to="/login" class="block w-full">
                  <button class="w-full py-3 bg-accent text-white font-semibold rounded-xl transition-all hover:bg-accent-hover active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-sm">
                    <i class="ti ti-arrow-left"></i> Quay lại Đăng nhập
                  </button>
                </router-link>
                <button class="text-xs text-text-dim hover:text-accent font-semibold transition-colors py-1 cursor-pointer" @click="success = false">
                  Gửi lại email yêu cầu
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </HomeLayout>
</template>

<script setup>
import { ref } from 'vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import axiosInstance from '@/api/axios.js'

defineOptions({ name: 'ForgotPasswordView' })

const email = ref('')
const loading = ref(false)
const success = ref(false)

async function submitEmail() {
  if (!email.value) return
  
  loading.value = true
  try {
    const response = await axiosInstance.post('/forgot-password', {
      email: email.value
    }, {
      timeout: 30000 // Tăng timeout lên 30s cho tác vụ gửi mail
    })
    
    if (response.success) {
      success.value = true
    }
  } catch (error) {
    console.error('Forgot password error:', error)
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

.step-panel {
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

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(1.3);
    opacity: 0;
  }
}
</style>
