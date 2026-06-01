<template>
  <HomeLayout>
    <!-- About Hero Section -->
    <section class="relative bg-surface2 py-20 overflow-hidden">
      <!-- Background Blobs -->
      <div class="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-[80px] -top-20 -right-20 pointer-events-none"></div>
      <div class="absolute w-[300px] h-[300px] rounded-full bg-accent2/5 blur-[60px] -bottom-10 -left-10 pointer-events-none"></div>

      <div class="max-w-[800px] mx-auto px-5 text-center relative z-10">
        <div class="flex justify-center gap-2 text-xs text-text-dim mb-6 font-semibold uppercase tracking-wider">
          <router-link to="/" class="hover:text-accent transition-colors">Trang chủ</router-link>
          <span>/</span>
          <span class="text-text">Giới thiệu</span>
        </div>
        
        <h1 class="font-display text-[clamp(36px,5vw,60px)] font-extrabold leading-tight text-text tracking-wide mb-6">
          NÂNG TẦM <span class="text-accent">BƯỚC CHÂN</span><br>VƯƠN TỚI TƯƠNG LAI
        </h1>
        
        <p class="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-medium">
          SaigonShoes không chỉ là một cửa hàng giày dép, chúng tôi là người đồng hành cùng bạn trên mọi nẻo đường, mang lại sự tự tin, phong cách và sự êm ái tuyệt đối.
        </p>
      </div>
    </section>

    <!-- Brand Story Section -->
    <section class="py-20 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <!-- Story Content Left -->
          <div class="text-left space-y-6">
            <span class="text-xs uppercase font-bold tracking-[2px] text-accent block">Câu chuyện thương hiệu</span>
            <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-text leading-tight">SaigonShoes & Khát Vọng Dẫn Đầu</h2>
            <p class="text-sm sm:text-base text-text-muted leading-relaxed">
              Được thành lập từ năm 2020 tại trung tâm TP. Hồ Chí Minh nhộn nhịp, SaigonShoes bắt đầu từ niềm đam mê mãnh liệt với văn hóa giày Sneaker và phong cách Streetwear đương đại. Chúng tôi mong muốn tạo nên một điểm đến uy tín, chuyên cung cấp các dòng giày sneaker, dép Crocs và sandal chính hãng với chất lượng dịch vụ chuẩn quốc tế.
            </p>
            <p class="text-sm sm:text-base text-text-muted leading-relaxed">
              Mỗi sản phẩm tại SaigonShoes đều được tuyển chọn kỹ lưỡng, đảm bảo tính thẩm mỹ, độ bền bỉ và độ êm ái cao nhất cho đôi chân của người Việt. Hành trình của chúng tôi là không ngừng cải tiến và cập nhật xu hướng thế giới, giúp bạn tự tin "bước đi" và khẳng định phong cách cá nhân độc bản.
            </p>
          </div>

          <!-- Story Image Right -->
          <div class="relative flex justify-center">
            <div class="w-full max-w-md aspect-square bg-surface2 border border-border rounded-3xl p-8 flex items-center justify-center shadow-lg relative overflow-hidden group">
              <!-- Grid accent lines border -->
              <div class="absolute inset-0 border border-accent/20 rounded-3xl pointer-events-none scale-95 group-hover:scale-100 transition-transform duration-500"></div>
              <i class="ti ti-brand-nike text-[120px] text-text-dim/20 absolute -right-10 -bottom-10 rotate-12"></i>
              
              <div class="text-center z-10 flex flex-col items-center">
                <div class="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-white text-3xl shadow-lg mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                  <i class="ti ti-shoe"></i>
                </div>
                <h4 class="font-display font-bold text-xl text-text mb-2">SaigonShoes Store</h4>
                <p class="text-xs text-text-muted uppercase font-bold tracking-widest text-accent">Est. 2020</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Core Values Section -->
    <section class="py-20 bg-surface2">
      <div class="max-w-[1200px] mx-auto px-5">
        
        <div class="text-center mb-12 max-w-xl mx-auto space-y-4">
          <h2 class="font-display text-3xl font-extrabold text-text tracking-wide uppercase">Giá Trị Cốt Lõi</h2>
          <p class="text-xs sm:text-sm text-text-muted font-medium">Những tiêu chuẩn vàng giúp SaigonShoes được hàng ngàn khách hàng tin yêu lựa chọn.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(val, idx) in values" 
            :key="idx" 
            class="bg-white p-8 rounded-2xl border border-border flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:border-accent group"
          >
            <div class="w-14 h-14 bg-surface2 rounded-2xl flex items-center justify-center text-accent text-2xl mb-6 shadow-sm group-hover:bg-accent group-hover:text-white transition-colors duration-300">
              <i :class="val.icon"></i>
            </div>
            <h3 class="font-bold text-text text-lg mb-3 leading-tight">{{ val.title }}</h3>
            <p class="text-xs sm:text-sm text-text-muted leading-relaxed font-semibold">{{ val.desc }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- Stat Counter Section -->
    <section class="py-16 bg-[#111111] text-white">
      <div class="max-w-[1200px] mx-auto px-5">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          <div v-for="(stat, idx) in stats" :key="idx" class="pt-6 md:pt-0 first:pt-0">
            <h2 class="font-display text-4xl sm:text-5xl font-extrabold text-accent mb-2 tracking-wide font-black">{{ stat.number }}</h2>
            <p class="text-[10px] tracking-[2px] uppercase font-bold text-white/50">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Members Section -->
    <section class="py-20 bg-bg">
      <div class="max-w-[1200px] mx-auto px-5">
        
        <div class="text-center mb-12 max-w-xl mx-auto space-y-4">
          <h2 class="font-display text-3xl font-extrabold text-text tracking-wide uppercase">Đội Ngũ Sáng Lập</h2>
          <p class="text-xs sm:text-sm text-text-muted font-medium">Những con người nhiệt huyết đứng sau sự phát triển vượt bậc của thương hiệu SaigonShoes.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(member, idx) in team" :key="idx" class="group flex flex-col items-center text-center">
            <div class="w-full aspect-square rounded-2xl bg-surface2 border border-border overflow-hidden mb-4 relative shadow-sm">
              <div class="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center text-accent text-3xl">
                <i class="ti ti-brand-linkedin"></i>
              </div>
              <div class="w-full h-full flex items-center justify-center text-6xl text-text-dim/30 font-black font-display uppercase select-none transition-transform duration-500 group-hover:scale-105">
                {{ member.name.charAt(0) }}
              </div>
            </div>
            <h3 class="font-bold text-text text-base leading-tight">{{ member.name }}</h3>
            <p class="text-xs font-semibold text-accent mt-1 uppercase tracking-wider">{{ member.role }}</p>
          </div>
        </div>

      </div>
    </section>
  </HomeLayout>
</template>

<script setup>
import HomeLayout from '@/layouts/HomeLayout.vue'

const values = [
  {
    icon: 'ti ti-shield-check',
    title: 'Cam kết Chính Hãng',
    desc: 'Cam kết 100% sản phẩm là hàng chính hãng từ các thương hiệu hàng đầu thế giới như Nike, Adidas, Crocs, Puma...'
  },
  {
    icon: 'ti ti-truck-delivery',
    title: 'Giao hàng Siêu Tốc',
    desc: 'Hỗ trợ giao hàng hỏa tốc trong nội thành chỉ từ 2 giờ và giao hàng miễn phí toàn quốc cho hóa đơn từ 500K.'
  },
  {
    icon: 'ti ti-refresh',
    title: 'Đổi trả linh hoạt',
    desc: 'Chính sách đổi trả cực kỳ dễ dàng trong vòng 30 ngày kể từ ngày nhận hàng với bất kỳ lý do không vừa size.'
  }
]

const stats = [
  { number: '100K+', label: 'Khách hàng tin dùng' },
  { number: '20+', label: 'Thương hiệu lớn' },
  { number: '5+', label: 'Chi nhánh TP.HCM' },
  { number: '99%', label: 'Đánh giá tích cực' }
]

const team = [
  { name: 'Nguyễn Minh Quân', role: 'Founder & CEO' },
  { name: 'Trần Hoàng Nam', role: 'Co-Founder & CTO' },
  { name: 'Lê Thùy Dương', role: 'Head of Marketing' },
  { name: 'Phạm Bảo Khánh', role: 'Lead Designer' }
]
</script>

<style scoped>
</style>
