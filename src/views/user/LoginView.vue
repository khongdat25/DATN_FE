<template>
  <HomeLayout>
    <main class="flex items-center justify-center py-[80px] min-h-[calc(100vh-72px-350px)] relative overflow-hidden bg-surface2">
      <!-- Decorative Elements -->
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <div class="login-container z-10 w-full max-w-[480px] px-4">
        <!-- Login Card -->
        <div class="login-card bg-bg p-8 md:p-10 rounded-[24px] border border-border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div class="login-header text-center mb-8">
            <h1 class="font-display text-[24px] font-semibold text-text mb-2">Chào mừng trở lại</h1>
            <p class="text-text-muted text-sm">Vui lòng nhập thông tin để đăng nhập</p>
          </div>

          <form @submit.prevent="handleLogin" id="loginForm">
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
                  class="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-bg focus:shadow-[0_0_0_4px_rgba(255,77,0,0.08)]"
                >
              </div>
            </div>

            <!-- Form Options (Remember me & Forgot pass) -->
            <div class="form-options flex justify-between items-center mb-6 text-xs">
              <label class="remember-me flex items-center gap-2 cursor-pointer text-text-muted font-medium select-none">
                <input 
                  type="checkbox" 
                  v-model="form.remember"
                  class="accent-accent w-4 h-4 cursor-pointer"
                > 
                Ghi nhớ đăng nhập
              </label>
              <a href="#" class="forgot-pass text-accent font-semibold hover:underline" @click.prevent="handleForgotPassword">
                Quên mật khẩu?
              </a>
            </div>

            <!-- Login Button -->
            <button 
              type="submit" 
              class="btn-login w-full py-3.5 bg-accent hover:bg-accent-hover active:translate-y-0 text-white rounded-xl shadow-[0_4px_12px_rgba(255,77,0,0.2)] hover:shadow-[0_6px_20px_rgba(255,77,0,0.3)] transition-all duration-300 font-display font-semibold text-base flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center justify-center gap-2">
                <i class="ti ti-loader-2 animate-spin text-lg"></i>
                Đang xử lý...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                Đăng nhập <i class="ti ti-arrow-right text-lg"></i>
              </span>
            </button>

            <!-- Divider -->
            <div class="divider flex items-center text-center my-6 text-[10px] text-text-dim uppercase tracking-[1.5px] font-semibold before:content-[''] before:flex-1 before:border-b before:border-border before:mr-4 after:content-[''] after:flex-1 after:border-b after:border-border after:ml-4">
              Hoặc tiếp tục với
            </div>

            <!-- Social Login -->
            <div class="social-login flex flex-col items-center gap-3 mb-8">
              <div id="googleBtn" class="w-full flex justify-center min-h-[44px]"></div>
              <button type="button" @click="handleSocialLogin('Facebook')" class="social-btn flex items-center justify-center gap-2 w-full max-w-[300px] py-2.5 border border-border rounded-xl bg-bg text-sm font-semibold text-text cursor-pointer transition-all duration-200 hover:bg-surface2 hover:border-text-dim">
                <i class="ti ti-brand-facebook text-lg" style="color: #4267B2;"></i> Tiếp tục với Facebook
              </button>
            </div>

            <!-- Register Link -->
            <p class="register-link text-center text-sm text-text-muted">
              Bạn chưa có tài khoản? 
              <router-link to="/register" class="text-accent font-semibold hover:underline ml-1">
                Đăng ký ngay
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </main>
  </HomeLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import axiosInstance from '@/api/axios.js'
import Swal from 'sweetalert2'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)

async function handleLogin() {
  loading.value = true
  try {
    // kết nối ap
    const response = await axiosInstance.post('/login', {
      email: form.value.email,
      password: form.value.password
    })

    // axiosInstance returns response.data directly in the response interceptor
    if (response.success) {
      if (response.data && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        if (form.value.remember) {
          localStorage.setItem('remember_me', 'true')
        }
      }

      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công!',
        text: response.message || 'Chào mừng bạn đã quay trở lại SaigonShoes.',
        confirmButtonText: 'Bắt đầu mua sắm 🛍️',
        confirmButtonColor: '#FF4D00'
      }).then(() => {
        // reload trang để AppHeader cập nhật tức thì trạng thái đăng nhập
        window.location.href = '/'
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    const status = error.response ? error.response.status : null
    // Lỗi 422, 401, 403, 404, 500 đã được axios interceptor xử lý tự động
    // Chỉ hiện popup riêng cho các lỗi chưa được interceptor xử lý
    if (status && ![401, 403, 404, 422, 500].includes(status)) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
        confirmButtonColor: '#FF4D00'
      })
    }
  } finally {
    loading.value = false
  }
}

async function handleGoogleLoginSuccess(response) {
  loading.value = true
  try {
    const res = await axiosInstance.post('/login/google', {
      token: response.credential
    })

    if (res.success) {
      if (res.data && res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
      }

      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công!',
        text: res.message || 'Đăng nhập thành công bằng tài khoản Google.',
        confirmButtonText: 'Bắt đầu mua sắm 🛍️',
        confirmButtonColor: '#FF4D00'
      }).then(() => {
        window.location.href = '/'
      })
    }
  } catch (error) {
    console.error('Google login error:', error)
    const status = error.response ? error.response.status : null
    if (status && ![401, 403, 404, 422, 500].includes(status)) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập Google thất bại',
        text: error.response?.data?.message || 'Không thể đăng nhập bằng tài khoản Google. Vui lòng thử lại.',
        confirmButtonColor: '#FF4D00'
      })
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  /* global google */
  if (typeof google !== 'undefined') {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id.apps.googleusercontent.com";
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleLoginSuccess
    });
    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { 
        theme: "outline", 
        size: "large", 
        width: "300", 
        text: "signin_with", 
        shape: "rectangular"
      }
    );
  } else {
    console.error('Google SDK not loaded');
  }
})

function handleForgotPassword() {
  Swal.fire({
    icon: 'info',
    title: 'Quên mật khẩu',
    text: 'Tính năng khôi phục mật khẩu qua email đang được phát triển. Vui lòng liên hệ hỗ trợ viên.',
    confirmButtonColor: '#FF4D00'
  })
}

function handleSocialLogin(provider) {
  Swal.fire({
    icon: 'info',
    title: `Đăng nhập qua ${provider}`,
    text: `Tính năng đăng nhập bằng tài khoản ${provider} đang được tích hợp. Vui lòng sử dụng tài khoản email thông thường.`,
    confirmButtonColor: '#FF4D00'
  })
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

.login-container {
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
