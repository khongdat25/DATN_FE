<template>
  <section class="py-[60px] max-md:py-10" id="reviews">
    <div class="max-w-[1200px] mx-auto px-5">
      <div class="flex justify-between items-end mb-9">
        <div>
          <h2 class="font-display text-[clamp(28px,4vw,40px)] tracking-[2px]">ĐÁNH GIÁ KHÁCH HÀNG</h2>
          <p class="text-[13px] text-text-muted mt-1 tracking-[0.5px]">Hơn 12.000 khách hàng đã tin tưởng StepUp</p>
        </div>
        <a href="#" class="text-[12px] text-accent tracking-[1.5px] uppercase flex items-center gap-[6px] transition-all whitespace-nowrap font-medium hover:gap-[10px]">Tất cả đánh giá <i class="ti ti-arrow-right"></i></a>
      </div>

      <!-- Rating Summary -->
      <div class="grid grid-cols-[200px_1fr] max-md:grid-cols-1 gap-9 items-center bg-bg border border-border rounded-xl p-7 mb-7">
        <div class="text-center border-r border-border pr-9 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-6">
          <div class="font-display text-[72px] text-gold leading-[1]">4.9</div>
          <div class="text-[24px] text-gold my-1.5">★★★★★</div>
          <div class="text-[12px] text-text-muted">Dựa trên 12.384 đánh giá</div>
        </div>
        <div class="flex-1">
          <div v-for="bar in ratingBars" :key="bar.star" class="flex items-center gap-3 mb-2 text-[12px]">
            <div class="flex items-center gap-[3px] text-text-muted min-w-[30px]">{{ bar.star }} <i class="ti ti-star text-gold text-[12px]"></i></div>
            <div class="flex-1 h-1.5 bg-surface2 rounded-[3px] overflow-hidden"><div class="h-full bg-gold rounded-[3px]" :style="{ width: bar.pct }"></div></div>
            <span class="text-text-muted min-w-[35px] text-right">{{ bar.pct }}</span>
          </div>
        </div>
      </div>

      <!-- Review Cards -->
      <div class="grid grid-cols-3 max-md:grid-cols-1 gap-4">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="bg-bg border border-border rounded-md p-[18px] transition-all hover:border-border-light hover:shadow-[0_8px_24px_rgba(0,0,0,.05)]"
        >
          <div class="flex items-center gap-2.5 mb-3">
            <div :class="['w-10 h-10 rounded-full bg-surface2 flex items-center justify-center text-base font-medium font-display tracking-[1px] shrink-0', review.avatarColor]">{{ review.initials }}</div>
            <div>
              <div class="text-[14px] font-medium text-text">{{ review.name }}</div>
              <div class="text-[11px] text-text-muted">{{ review.date }}</div>
            </div>
            <span class="inline-flex items-center gap-1 text-[10px] text-[#4CAF50] ml-auto"><i class="ti ti-circle-check"></i> Đã mua</span>
          </div>
          <div class="text-[14px] text-gold mb-2.5">★★★★★</div>
          <span class="inline-block text-[10px] bg-surface2 border border-border py-[3px] px-[9px] rounded-sm text-text-muted mb-2.5 tracking-[0.5px]">{{ review.product }}</span>
          <div class="flex gap-1.5 mb-2.5 flex-wrap">
            <div v-for="emoji in review.emojis" :key="emoji" class="w-[50px] h-[50px] rounded-sm bg-surface2 border border-border flex items-center justify-center text-[20px] cursor-pointer transition-colors hover:border-accent">{{ emoji }}</div>
          </div>
          <p class="text-[13px] text-text-muted leading-[1.6] line-clamp-3">{{ review.text }}</p>
          <div class="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <button class="flex items-center gap-[5px] text-[11px] bg-transparent border-none cursor-pointer transition-colors hover:text-accent" :style="{ color: review.liked ? '#FF4D00' : '#666' }" @click="likeReview(review)">
              <i class="ti ti-thumb-up"></i> Hữu ích ({{ review.helpful }})
            </button>
            <button class="flex items-center gap-[5px] text-[11px] text-text-muted bg-transparent border-none cursor-pointer transition-colors hover:text-accent">
              <i class="ti ti-message"></i> Trả lời
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const ratingBars = [
  { star: 5, pct: '82%' }, { star: 4, pct: '12%' }, { star: 3, pct: '4%' }, { star: 2, pct: '1%' }, { star: 1, pct: '1%' }
]

const reviews = reactive([
  { id: 1, name: 'Nguyễn Thảo', initials: 'NT', avatarColor: 'text-accent', date: '10 tháng 5, 2026', product: 'Nike Air Force 1 \'07', emojis: ['👟', '📦'], text: 'Giày đẹp lắm, đóng gói cẩn thận, giao hàng nhanh chỉ 1 ngày. Chất lượng y hệt hàng chính hãng mua ở store. Sẽ ủng hộ shop dài dài!', helpful: 23, liked: false },
  { id: 2, name: 'Minh Hoàng', initials: 'MH', avatarColor: 'text-accent2-dim', date: '8 tháng 5, 2026', product: 'Crocs Mega Crush Clog', emojis: ['🥿'], text: 'Crocs Mega Crush đế cao siêu ngầu, đi êm chân kinh khủng. Mình order size 41 vừa chuẩn. Màu đen hợp với mọi outfit. 10 điểm không có chỗ chê!', helpful: 18, liked: false },
  { id: 3, name: 'Lan Nhi', initials: 'LN', avatarColor: 'text-gold', date: '6 tháng 5, 2026', product: 'Adidas Samba OG', emojis: ['👟', '✨', '📸'], text: 'Adidas Samba đẹp mê hồn! Shop tư vấn nhiệt tình, cho mình xem ảnh thực tế trước khi mua. Giao hàng siêu nhanh, freeship luôn. Cảm ơn StepUp!', helpful: 35, liked: false },
])

function likeReview(review) {
  review.liked = !review.liked
  review.helpful += review.liked ? 1 : -1
}
</script>
