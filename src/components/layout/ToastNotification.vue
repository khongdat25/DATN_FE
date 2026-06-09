<template>
  <!-- Toast Notification -->
  <div
    id="toast"
    :class="['fixed bottom-[30px] right-[30px] z-9999 bg-bg border border-border-light border-l-[3px] border-l-accent py-[14px] px-5 rounded-md text-sm flex items-center gap-[10px] translate-y-[100px] opacity-0 transition-all duration-300 pointer-events-none max-w-[320px] shadow-[0_10px_30px_rgba(0,0,0,0.1)]', { show: visible }]"
  >
    <i class="ti ti-check text-accent text-lg"></i>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('Đã thực hiện!')
let timer = null

function show(msg) {
  message.value = msg
  visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { visible.value = false }, 3000)
}

defineExpose({ show })
</script>

<style scoped>
#toast.show {
  transform: translateY(0) !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}
</style>
