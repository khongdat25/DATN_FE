<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const route = useRoute()

// Map layout name to layout component based on path
const layoutComponent = computed(() => {
  if (route.path.startsWith('/admin')) {
    return AdminLayout
  }
  if (route.meta?.layout === 'none') {
    return null
  }
  return HomeLayout
})
</script>

<template>
  <component :is="layoutComponent" v-if="layoutComponent">
    <router-view v-slot="{ Component }">
      <keep-alive :include="['HomeView', 'ProductsView']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </component>
  <router-view v-else v-slot="{ Component }">
    <keep-alive :include="['HomeView', 'ProductsView']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
/* CSS toàn cục có thể để ở đây hoặc trong main.css */
body {
  background-color: #f8f9fa;
}
</style>
