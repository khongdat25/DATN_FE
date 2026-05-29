<template>
  <HomeLayout>
    <main class="flex items-center justify-center py-[80px] min-h-[calc(100vh-72px-350px)] relative overflow-hidden bg-surface2">
      <!-- Decorative Elements -->
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <div class="register-container z-10 w-full max-w-[480px] px-4">
        <router-link to="/" class="logo font-display text-[28px] tracking-[3px] text-center block mb-8 text-text">
          SAIGON<span class="text-accent font-bold">SHOES</span>
        </router-link>
        
        <div class="register-card bg-bg p-8 md:p-10 rounded-[24px] border border-border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div class="register-header text-center mb-8">
            <h1 class="font-display text-[24px] font-semibold text-text mb-2">Tạo tài khoản mới</h1>
            <p class="text-text-muted text-sm">Khám phá bộ sưu tập giày đa dạng tại SaigonShoes</p>
          </div>

          <form @submit.prevent="handleRegister" id="registerForm">
            <!-- Email Field -->
            <div class="form-group mb-5">
              <label for="email" class="block text-xs font-semibold text-text-muted mb-2 text-left">Email</label>
              <div class="input-wrapper relative flex items-center focus-within:text-accent">
                <i class="ti ti-mail absolute left-4 text-text-dim text-lg transition-colors duration-300"></i>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  placeholder="username@gmail.com" 
                  required
                  class="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-bg focus:shadow-[0_0_0_4px_rgba(255,77,0,0.08)]"
                >
              </div>
            </div>

            <!-- Phone Field -->
            <div class="form-group mb-5">
              <label for="phone" class="block text-xs font-semibold text-text-muted mb-2 text-left">Số điện thoại</label>
              <div class="input-wrapper relative flex items-center focus-within:text-accent">
                <i class="ti ti-phone absolute left-4 text-text-dim text-lg transition-colors duration-300"></i>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  placeholder="0123 456 789" 
                  required
                  class="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-bg focus:shadow-[0_0_0_4px_rgba(255,77,0,0.08)]"
                >
              </div>
            </div>

            <!-- Password Field -->
            <div class="form-group mb-5">
              <label for="password" class="block text-xs font-semibold text-text-muted mb-2 text-left">Mật khẩu</label>
              <div class="input-wrapper relative flex items-center focus-within:text-accent">
                <i class="ti ti-lock absolute left-4 text-text-dim text-lg transition-colors duration-300"></i>
                <input 
                  type="password" 
                  id="password" 
                  v-model="form.password"
                  placeholder="••••••••" 
                  required
                  minlength="6"
                  class="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-bg focus:shadow-[0_0_0_4px_rgba(255,77,0,0.08)]"
                >
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="terms flex items-start gap-2.5 mb-6 text-xs text-text-muted leading-relaxed text-left">
              <input 
                type="checkbox" 
                id="terms" 
                v-model="form.agreeTerms"
                required
                class="accent-accent w-4 h-4 mt-0.5 cursor-pointer shrink-0"
              >
              <label for="terms" class="cursor-pointer">
                Tôi đồng ý với <a href="#" class="text-accent font-medium hover:underline">Điều khoản dịch vụ</a> và <a href="#" class="text-accent font-medium hover:underline">Chính sách bảo mật</a>
              </label>
            </div>

            <!-- Register Button -->
            <button 
              type="submit" 
              class="btn-register w-full py-3.5 bg-accent hover:bg-accent-hover active:translate-y-0 text-white rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.2)] hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] transition-all duration-300 font-display font-semibold text-base flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center justify-center gap-2">
                <i class="ti ti-loader-2 animate-spin text-lg"></i>
                Đang xử lý...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                Đăng ký tài khoản <i class="ti ti-user-plus text-lg"></i>
              </span>
            </button>

            <!-- Login Link -->
            <p class="login-link text-center text-sm text-text-muted mt-8">
              Đã có tài khoản? 
              <router-link to="/login" class="text-accent font-semibold hover:underline ml-1">
                Đăng nhập ngay
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </main>
  </HomeLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import axiosInstance from '@/api/axios.js'
import Swal from 'sweetalert2'

const router = useRouter()

const form = ref({
  email: '',
  phone: '',
  password: '',
  agreeTerms: false
})

const loading = ref(false)

async function handleRegister() {
  if (!form.value.agreeTerms) {
    Swal.fire({
      icon: 'warning',
      title: 'Chưa đồng ý điều khoản',
      text: 'Vui lòng đọc và đồng ý với Điều khoản dịch vụ & Chính sách bảo mật.',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  loading.value = true
  try {
    // kết nối api
    const response = await axiosInstance.post('/register', {
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password
    })

    // axiosInstance returns response.data directly in the response interceptor
    if (response.success) {
      if (response.data && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }

      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công!',
        text: response.message || 'Tài khoản của bạn đã được tạo thành công.',
        confirmButtonText: 'Bắt đầu mua sắm 🛍️',
        confirmButtonColor: '#FF4D00'
      }).then(() => {
        window.location.href = '/'
      })
    }
  } catch (error) {
    console.error('Registration error:', error)
    // Error notification is handled automatically by axiosInstance interceptors,
    // but in case success is false in response without throwing error:
    if (error.response && error.response.data && error.response.data.message) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi đăng ký',
        text: error.response.data.message,
        confirmButtonColor: '#FF4D00'
      })
    }
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

.register-container {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo span {
  color: var(--color-accent, #FF4D00);
}

/* Tabler icon spinner spin animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
