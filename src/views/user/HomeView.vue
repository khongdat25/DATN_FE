<script setup>
import { inject } from 'vue'
import HomeLayout from '../../layouts/HomeLayout.vue'
import HeroSlider from '../../components/home/HeroSlider.vue'
import CategorySection from '../../components/home/CategorySection.vue'
import FlashSale from '../../components/home/FlashSale.vue'
import SaleProducts from '../../components/home/SaleProducts.vue'
import BestSellers from '../../components/home/BestSellers.vue'
import FeaturedProducts from '../../components/home/FeaturedProducts.vue'
import CollectionSection from '../../components/home/CollectionSection.vue'
import BlogSection from '../../components/home/BlogSection.vue'
import ReviewSection from '../../components/home/ReviewSection.vue'

const addToCart = inject('addToCart', (p) => {})
const showToast = inject('showToast', (msg) => {})

function handleAddToCart(product) {
  addToCart(product)
}

function handleWish(payload) {
  showToast(payload.wished ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

function handleSignup() {
  showToast('Chuyển hướng đến trang đăng ký... 🚀')
}
</script>
<template>
  <UserLayout>
    <HeroSlider />
    <CategorySection />
    <hr class="border-none border-t border-border m-0">
    <FlashSale @add-to-cart="handleAddToCart" @toggle-wish="handleWish" />
    <hr class="border-none border-t border-border m-0">
    <SaleProducts @add-to-cart="handleAddToCart" @toggle-wish="handleWish" />
    <hr class="border-none border-t border-border m-0">
    <BestSellers @add-to-cart="handleAddToCart" @toggle-wish="handleWish" />
    <hr class="border-none border-t border-border m-0">
    <FeaturedProducts @add-to-cart="handleAddToCart" />
    <hr class="border-none border-t border-border m-0">
    <CollectionSection />
    <hr class="border-none border-t border-border m-0">
    <BlogSection />
    <hr class="border-none border-t border-border m-0">
    <ReviewSection />
    <hr class="border-none border-t border-border m-0">
    <!-- CTA: Sign up -->
    <section class="py-[60px] max-md:py-10">
      <div class="max-w-[1200px] mx-auto px-5">
        <div class="bg-bg border border-border rounded-xl p-12 max-md:py-8 max-md:px-5 text-center relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] before:content-[''] before:absolute before:w-[400px] before:h-[400px] before:rounded-full before:bg-[rgba(255,77,0,.06)] before:-top-[100px] before:left-1/2 before:-translate-x-1/2 before:pointer-events-none">
          <h2 class="font-display text-[36px] text-text tracking-[2px] mb-2">ĐĂNG KÝ TÀI KHOẢN</h2>
          <p class="text-[14px] text-text-muted mb-6">Trở thành thành viên StepUp ngay để nhận thông báo Flash Sale, quà tặng và ưu đãi độc quyền mỗi tuần</p>
          <div class="flex justify-center">
            <button class="bg-accent text-white border-none py-[14px] px-9 font-display text-[18px] tracking-[2px] rounded-sm transition-colors hover:bg-accent-hover" @click="handleSignup">ĐĂNG KÝ NGAY</button>
          </div>
        </div>
      </div>
    </section>
  </UserLayout>
</template>

<script setup>
import { inject } from 'vue'
import UserLayout from '../../layouts/HomeLayout.vue'
import HeroSlider from '../../components/home/HeroSlider.vue'
import CategorySection from '../../components/home/CategorySection.vue'
import FlashSale from '../../components/home/FlashSale.vue'
import SaleProducts from '../../components/home/SaleProducts.vue'
import BestSellers from '../../components/home/BestSellers.vue'
import FeaturedProducts from '../../components/home/FeaturedProducts.vue'
import CollectionSection from '../../components/home/CollectionSection.vue'
import BlogSection from '../../components/home/BlogSection.vue'
import ReviewSection from '../../components/home/ReviewSection.vue'

