<script setup>
import { inject, ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'HomeView' })
import HomeLayout from '../../layouts/HomeLayout.vue'
import HeroSlider from '../../components/home/HeroSlider.vue'
import CategorySection from '../../components/home/CategorySection.vue'
import FlashSale from '../../components/home/FlashSale.vue'
import BestSellers from '../../components/home/BestSellers.vue'
import NewProducts from '../../components/home/NewProducts.vue'
import FeaturedProducts from '../../components/home/FeaturedProducts.vue'
import CollectionSection from '../../components/home/CollectionSection.vue'
import BlogSection from '../../components/home/BlogSection.vue'

const router = useRouter()
const addToCart = inject('addToCart', (p) => {})
const showToast = inject('showToast', (msg) => {})

const isLoggedIn = ref(false)

onActivated(() => {
  isLoggedIn.value = !!localStorage.getItem('access_token')
})

function handleAddToCart(product) {
  addToCart(product)
}

function handleWish(payload) {
  showToast(payload.wished ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích')
}

function handleSignup() {
  router.push('/register')
}
</script>

<template>
  <HomeLayout>
    <HeroSlider />
    <CategorySection />
    <hr class="border-none border-t border-border m-0">
    <FlashSale @add-to-cart="handleAddToCart" @toggle-wish="handleWish" />
    <hr class="border-none border-t border-border m-0">
    <BestSellers @add-to-cart="handleAddToCart" @toggle-wish="handleWish" />
    <hr class="border-none border-t border-border m-0">
    <NewProducts @add-to-cart="handleAddToCart" @toggle-wish="handleWish" />
    <hr class="border-none border-t border-border m-0">
    <FeaturedProducts @add-to-cart="handleAddToCart" />
    <hr class="border-none border-t border-border m-0">
    <CollectionSection />
    <hr class="border-none border-t border-border m-0">
    <BlogSection />
    <hr class="border-none border-t border-border m-0">
    <!-- CTA: Sign up -->
    <section v-if="!isLoggedIn" class="py-8">
      <div class="max-w-[1200px] mx-auto px-5">
        <div class="bg-[#111] rounded-xl p-10 max-md:py-8 max-md:px-5 text-center relative overflow-hidden before:content-[''] before:absolute before:w-[500px] before:h-[500px] before:rounded-full before:bg-[rgba(255,77,0,0.08)] before:top-[-140px] before:left-1/2 before:-translate-x-1/2 before:pointer-events-none">
          <h2 class="font-display text-[32px] text-white tracking-[2px] mb-2 font-bold uppercase">ĐĂNG KÝ TÀI KHOẢN</h2>
          <p class="text-[14px] text-white/60 mb-6">Trở thành thành viên SaigonShoes ngay để nhận thông báo Flash Sale, quà tặng và ưu đãi độc quyền mỗi tuần</p>
          <div class="flex justify-center">
            <button class="bg-accent text-white border-none py-[13px] px-9 font-display text-[16px] tracking-[2px] rounded-sm transition-colors hover:bg-accent-hover font-bold cursor-pointer" @click="handleSignup">ĐĂNG KÝ NGAY</button>
          </div>
        </div>
      </div>
    </section>
  </HomeLayout>
</template>


