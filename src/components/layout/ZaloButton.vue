<template>
  <div class="zalo-floating-container fixed bottom-[30px] left-[28px] z-[999] flex items-center gap-3">
    <!-- Main Zalo Button -->
    <a
      :href="zaloUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="zalo-btn relative flex items-center justify-center w-14 h-14 bg-[#0068FF] rounded-full shadow-[0_4px_15px_rgba(0,104,255,0.4)] transition-all duration-300 hover:scale-110 group cursor-pointer"
      title="Chat tư vấn qua Zalo"
    >
      <!-- Pulse Rings -->
      <span class="pulse-ring absolute -inset-1 rounded-full bg-[#0068FF] opacity-40 animate-ping"></span>
      <span class="pulse-ring-outer absolute -inset-3 rounded-full border-2 border-[#0068FF] opacity-30 animate-pulse"></span>

      <!-- Zalo Official Logo -->
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
        alt="Zalo"
        class="w-8 h-8 relative z-10 object-contain filter drop-shadow-sm"
      />

      <!-- Tooltip Tag -->
      <span class="zalo-tooltip absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Tư vấn qua Zalo 24/7
        <span class="absolute -left-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></span>
      </span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  phoneNumber: {
    type: String,
    default: '0936715847' // SĐT Zalo mặc định, có thể thay đổi trong props hoặc .env
  }
})

const zaloUrl = computed(() => {
  const cleanPhone = props.phoneNumber.replace(/[^0-9]/g, '')
  return `https://zalo.me/${cleanPhone}`
})
</script>

<style scoped>
@keyframes custom-ping {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.pulse-ring {
  animation: custom-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
