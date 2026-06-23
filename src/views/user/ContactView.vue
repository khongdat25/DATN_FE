<template>
  
    <!-- Breadcrumbs -->
    <div class="bg-surface2 py-4 border-b border-border">
      <div class="max-w-[1200px] mx-auto px-5 flex items-center gap-2 text-[12px] text-text-muted">
        <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
        <i class="ti ti-chevron-right text-[10px]"></i>
        <span class="text-text font-semibold">Liên hệ</span>
      </div>
    </div>

    <!-- Main Content -->
    <main class="py-16 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5">
        
        <!-- Header Title -->
        <div class="text-center mb-16">
          <span class="text-xs uppercase font-bold tracking-[3px] text-accent mb-2 block">Kết nối với chúng tôi</span>
          <h1 class="font-display text-[clamp(28px,4vw,40px)] font-extrabold text-text tracking-wider uppercase">LIÊN HỆ SAIGON<span class="text-accent">SHOES</span></h1>
          <p class="text-[14px] text-text-muted mt-2 max-w-[600px] mx-auto">Chúng tôi luôn sẵn sàng lắng nghe mọi ý kiến đóng góp, thắc mắc hoặc yêu cầu hỗ trợ từ bạn. Hãy kết nối với chúng tôi ngay hôm nay!</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <!-- Left: Contact Details & FAQ (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col gap-10">
            
            <!-- Quick Info Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Hotline card -->
              <div class="bg-white border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all group">
                <div class="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <i class="ti ti-phone-call"></i>
                </div>
                <h4 class="font-display font-bold text-sm text-text uppercase tracking-wide mb-1.5">Hotline hỗ trợ</h4>
                <p class="text-lg font-bold text-accent mb-0.5">1900 6789</p>
                <p class="text-xs text-text-muted">Hỗ trợ trực tuyến từ 9:00 - 22:00 hàng ngày</p>
              </div>

              <!-- Email Card -->
              <div class="bg-white border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all group">
                <div class="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <i class="ti ti-mail-opened"></i>
                </div>
                <h4 class="font-display font-bold text-sm text-text uppercase tracking-wide mb-1.5">Email liên hệ</h4>
                <p class="text-sm font-semibold text-text hover:text-accent transition-colors mb-0.5">contact@saigonshoes.com</p>
                <p class="text-xs text-text-muted">Phản hồi thư trong vòng 24 giờ làm việc</p>
              </div>
            </div>

            <!-- Showroom Addresses -->
            <div class="bg-white border border-border rounded-2xl p-7 shadow-sm">
              <h3 class="font-display font-bold text-base text-text uppercase tracking-widest pb-4 border-b border-border mb-6 flex items-center gap-2">
                <i class="ti ti-map-pin text-accent text-lg"></i> Hệ thống Showroom Sài Gòn
              </h3>
              <div class="flex flex-col gap-6">
                <div v-for="(showroom, idx) in showrooms" :key="idx" class="flex gap-4 items-start relative pl-4 border-l-2 border-accent/40">
                  <div class="flex-1 text-left">
                    <h4 class="font-bold text-[14px] text-text mb-1">{{ showroom.name }}</h4>
                    <p class="text-[13px] text-text-muted mb-1 flex items-center gap-1.5"><i class="ti ti-map-pin"></i> {{ showroom.address }}</p>
                    <p class="text-[13px] text-text-muted flex items-center gap-1.5"><i class="ti ti-phone"></i> {{ showroom.phone }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mini FAQ Accordion -->
            <div class="bg-white border border-border rounded-2xl p-7 shadow-sm">
              <h3 class="font-display font-bold text-base text-text uppercase tracking-widest pb-4 border-b border-border mb-6 flex items-center gap-2">
                <i class="ti ti-help-circle text-accent text-lg"></i> Câu hỏi thường gặp
              </h3>
              <div class="flex flex-col gap-4">
                <div 
                  v-for="(faq, idx) in faqs" 
                  :key="idx" 
                  class="border border-border rounded-xl overflow-hidden transition-all duration-200"
                  :class="{ 'border-accent/30 shadow-sm': activeFaq === idx }"
                >
                  <div 
                    @click="activeFaq = activeFaq === idx ? null : idx" 
                    class="flex items-center justify-between p-4 cursor-pointer hover:bg-surface2 transition-colors select-none"
                  >
                    <span class="text-[13px] font-semibold text-text text-left pr-4">{{ faq.question }}</span>
                    <i :class="['ti text-[12px] text-text-muted transition-transform duration-200', activeFaq === idx ? 'ti-chevron-up text-accent rotate-180' : 'ti-chevron-down']"></i>
                  </div>
                  <div v-show="activeFaq === idx" class="p-4 border-t border-border bg-surface2/40 text-[13px] text-text-muted leading-relaxed text-left">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right: Interactive Contact Form (5 Cols) -->
          <div class="lg:col-span-5 bg-white border border-border p-8 rounded-2xl shadow-sm sticky top-[95px]">
            <h3 class="font-display font-bold text-base text-text uppercase tracking-widest pb-4 border-b border-border mb-6 flex items-center gap-2 text-left">
              <i class="ti ti-message text-accent text-lg"></i> Gửi tin nhắn cho chúng tôi
            </h3>
            
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 text-left">
              <!-- Name input -->
              <div>
                <label class="block text-xs font-bold text-text uppercase tracking-wider mb-2">Họ và tên <span class="text-accent">*</span></label>
                <input 
                  type="text" 
                  v-model="form.name" 
                  required
                  placeholder="Nhập họ và tên..."
                  class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,77,0,0.06)] transition-all"
                >
              </div>

              <!-- Phone & Email Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-text uppercase tracking-wider mb-2">Số điện thoại <span class="text-accent">*</span></label>
                  <input 
                    type="tel" 
                    v-model="form.phone" 
                    required
                    placeholder="Số điện thoại..."
                    class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,77,0,0.06)] transition-all"
                  >
                </div>
                <div>
                  <label class="block text-xs font-bold text-text uppercase tracking-wider mb-2">Email <span class="text-accent">*</span></label>
                  <input 
                    type="email" 
                    v-model="form.email" 
                    required
                    placeholder="Email của bạn..."
                    class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,77,0,0.06)] transition-all"
                  >
                </div>
              </div>

              <!-- Subject input -->
              <div>
                <label class="block text-xs font-bold text-text uppercase tracking-wider mb-2">Tiêu đề liên hệ <span class="text-accent">*</span></label>
                <input 
                  type="text" 
                  v-model="form.subject" 
                  required
                  placeholder="Nhập tiêu đề (Hỗ trợ, Đặt sỉ, Bảo hành...)"
                  class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,77,0,0.06)] transition-all"
                >
              </div>

              <!-- Message input -->
              <div>
                <label class="block text-xs font-bold text-text uppercase tracking-wider mb-2">Nội dung tin nhắn <span class="text-accent">*</span></label>
                <textarea 
                  v-model="form.message" 
                  required
                  rows="4"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                  class="w-full bg-surface2 border border-border rounded-xl py-3 px-4 text-sm text-text outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,77,0,0.06)] transition-all resize-none"
                ></textarea>
              </div>

              <!-- Submit button -->
              <button 
                type="submit" 
                :disabled="submitting"
                class="w-full bg-accent text-white h-13 font-display font-bold text-xs tracking-[2px] uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-accent-hover transition-all active:scale-[0.98] shadow-[0_6px_16px_rgba(255,77,0,0.15)] hover:shadow-[0_10px_22px_rgba(255,77,0,0.25)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                <i v-if="submitting" class="ti ti-loader animate-spin text-lg"></i>
                <i v-else class="ti ti-brand-telegram text-lg"></i>
                {{ submitting ? 'Đang gửi thông tin...' : 'Gửi liên hệ ngay' }}
              </button>
            </form>

            <!-- Social channels -->
            <div class="mt-6 pt-6 border-t border-border flex items-center justify-center gap-4">
              <span class="text-xs text-text-muted font-semibold">Kết nối nhanh:</span>
              <a href="#" class="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center text-lg hover:bg-[#1877F2] hover:text-white transition-all active:scale-90" title="Facebook Messenger"><i class="ti ti-brand-messenger"></i></a>
              <a href="#" class="w-9 h-9 rounded-full bg-[#0068FF]/10 text-[#0068FF] flex items-center justify-center text-lg hover:bg-[#0068FF] hover:text-white transition-all active:scale-90 font-bold" title="Zalo hỗ trợ"><i class="ti ti-brand-whatsapp"></i></a>
            </div>
          </div>
        </div>

        <!-- Google Maps Section -->
        <div class="bg-white border border-border rounded-2xl overflow-hidden p-3 shadow-sm">
          <div class="h-[400px] rounded-xl overflow-hidden relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4602289852554!2d106.66524941533418!3d10.776019362148192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!1d3919.4602289852554!2d106.66524941533418!3d10.776019362148192!2m2!1d106.6652494!2d10.7760194!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1685600000000!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </main>
  
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import Swal from 'sweetalert2'

const showToast = inject('showToast', (msg) => {})

const submitting = ref(false)
const activeFaq = ref(0)

const showrooms = [
  { name: 'Showroom Quận 1 (Flagship Store)', address: '120 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh', phone: '028 3939 1234' },
  { name: 'Showroom Quận 10 (Sneaker Hub)', address: '450 Ba Tháng Hai, Phường 12, Quận 10, TP. Hồ Chí Minh', phone: '028 3868 5678' }
]

const faqs = [
  { question: 'Cửa hàng có hỗ trợ đổi size sản phẩm mua online không?', answer: 'SaigonShoes hỗ trợ đổi size miễn phí trong vòng 30 ngày kể từ ngày nhận hàng đối với tất cả đơn hàng online. Điều kiện sản phẩm phải còn mới, chưa qua sử dụng, còn nguyên hộp, nhãn mác và quà tặng kèm theo (nếu có).' },
  { question: 'Đặt hàng online thì bao lâu nhận được giày?', answer: 'Đối với khu vực nội thành TP.HCM, bạn sẽ nhận được hàng trong vòng 4 - 24 giờ. Đối với các tỉnh thành khác trên toàn quốc, thời gian giao hàng dao động từ 2 - 4 ngày làm việc tùy thuộc vào địa điểm cụ thể.' },
  { question: 'Giày tại SaigonShoes có được bảo hành không?', answer: 'Tất cả các sản phẩm giày thể thao, dép Crocs mua tại SaigonShoes đều được bảo hành chính hãng keo chỉ trong vòng 12 tháng tại bất kỳ chi nhánh nào thuộc hệ thống. Bạn chỉ cần mang giày kèm số điện thoại mua hàng để được hỗ trợ bảo hành.' },
  { question: 'Có những phương thức thanh toán nào khi mua online?', answer: 'Chúng tôi hỗ trợ đa dạng phương thức thanh toán: COD (Thanh toán khi nhận hàng), Chuyển khoản ngân hàng qua mã QR, Ví điện tử Momo/ZaloPay, hoặc quẹt thẻ tín dụng thông qua cổng thanh toán bảo mật.' }
]

const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: ''
})

function handleSubmit() {
  submitting.value = true
  
  // Mock sending latency
  setTimeout(() => {
    submitting.value = false
    
    // Clear form
    form.name = ''
    form.phone = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    
    // Show SweetAlert response
    Swal.fire({
      icon: 'success',
      title: 'Đã gửi liên hệ!',
      text: 'Thông tin của bạn đã được tiếp nhận. Đội ngũ SaigonShoes sẽ liên hệ lại với bạn trong vòng tối đa 2 giờ làm việc.',
      confirmButtonText: 'Đồng ý',
      confirmButtonColor: '#FF4D00',
      customClass: {
        popup: 'rounded-2xl border border-border shadow-2xl font-body'
      }
    })
  }, 1500)
}
</script>

<style scoped>
/* Custom animations if needed */
</style>
