<template>
  <!-- Chatbot Widget -->
  <div class="fixed bottom-[28px] right-[28px] z-300">
    <!-- Chat Window -->
    <div
      :class="['chat-window absolute bottom-[70px] right-0 w-[320px] bg-bg border border-border rounded-lg overflow-hidden scale-80 translate-y-5 origin-bottom-right opacity-0 pointer-events-none transition-all duration-[0.25s] ease-in-out shadow-[0_12px_40px_rgba(0,0,0,.15)]', { open: chatOpen }]"
    >
      <!-- Header -->
      <div class="bg-accent py-[14px] px-4 flex items-center gap-2.5">
        <div class="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-[18px] text-white">🤖</div>
        <div>
          <div class="text-[14px] font-medium text-white">SaigonShoes AI</div>
          <div class="text-[11px] text-white/90">● Đang hoạt động 24/7</div>
        </div>
        <button class="ml-auto bg-transparent border-none text-white/90 text-[20px] transition-colors hover:text-white" @click="toggleChat">
          <i class="ti ti-x"></i>
        </button>
      </div>
      <!-- Messages -->
      <div class="h-[220px] overflow-y-auto p-[14px] flex flex-col gap-2.5" ref="chatMsgsRef">
        <div v-for="(msg, idx) in messages" :key="idx"
          :class="['flex gap-2 items-end', msg.type === 'user' ? 'flex-row-reverse' : '']"
        >
          <div class="w-[26px] h-[26px] rounded-full bg-surface2 flex items-center justify-center text-[12px] shrink-0">
            {{ msg.type === 'ai' ? '🤖' : '👤' }}
          </div>
          <div :class="['max-w-[75%] py-[9px] px-3 rounded-xl text-[13px] leading-normal',
            msg.type === 'ai' ? 'bg-surface2 text-text rounded-bl-[4px]' : 'bg-accent text-white rounded-br-[4px]']">
            {{ msg.text }}
          </div>
        </div>
      </div>
      <!-- Quick Suggestions -->
      <div class="flex gap-1.5 flex-wrap px-[14px] pb-2.5">
        <button class="bg-surface2 border border-border text-text-muted text-[11px] py-[5px] px-2.5 rounded-[20px] transition-all cursor-pointer hover:border-accent hover:text-accent"
          @click="sendSugg('Tư vấn size giày Nike')">Size giày Nike</button>
        <button class="bg-surface2 border border-border text-text-muted text-[11px] py-[5px] px-2.5 rounded-[20px] transition-all cursor-pointer hover:border-accent hover:text-accent"
          @click="sendSugg('Crocs nào đang hot?')">Crocs hot nhất</button>
        <button class="bg-surface2 border border-border text-text-muted text-[11px] py-[5px] px-2.5 rounded-[20px] transition-all cursor-pointer hover:border-accent hover:text-accent"
          @click="sendSugg('Chính sách đổi trả')">Đổi trả</button>
      </div>
      <!-- Input -->
      <div class="flex gap-2 py-3 px-[14px] border-t border-border">
        <input
          v-model="chatInput"
          class="flex-1 bg-surface2 border border-border rounded-[20px] py-2 px-[14px] text-[13px] text-text outline-none font-body transition-colors focus:border-accent focus:bg-bg"
          type="text"
          placeholder="Nhắn tin..."
          @keydown.enter="sendChat"
        />
        <button class="w-9 h-9 rounded-full bg-accent border-none flex items-center justify-center text-[16px] text-white transition-colors hover:bg-accent-hover" @click="sendChat">
          <i class="ti ti-send"></i>
        </button>
      </div>
    </div>

    <!-- Toggle Button -->
    <button class="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center text-[24px] cursor-pointer shadow-[0_4px_20px_rgba(255,77,0,.3)] transition-all relative border-none hover:scale-[1.1]" @click="toggleChat">
      💬
      <span class="absolute top-0 right-0 w-3 h-3 bg-[#4CAF50] rounded-full border-2 border-bg"></span>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const chatOpen = ref(false)
const chatInput = ref('')
const chatMsgsRef = ref(null)
const replyIdx = ref(0)

const aiReplies = [
  'Bạn muốn tìm mẫu nào? Mình có đủ Nike, Adidas, Crocs nhé! 😊',
  'Size giày thường lấy theo số châu Âu. Bạn mang size bao nhiêu ở Việt Nam?',
  'Crocs đang có rất nhiều mẫu hot như Mega Crush, Echo, Classic. Bạn thích phong cách nào?',
  'Mình kiểm tra ngay cho bạn! Đơn hàng hiện đang ở trạng thái "Đang giao" 🚚',
  'SaigonShoes có chính sách đổi trả 30 ngày, miễn phí nếu lỗi từ nhà sản xuất nhé!',
  'Hiện tại đang có Flash Sale giảm đến 50% cho nhiều mẫu sneaker hot!'
]

const messages = ref([
  { type: 'ai', text: 'Xin chào! Mình là AI tư vấn của SaigonShoes. Bạn cần tư vấn gì hôm nay? 👟' },
  { type: 'ai', text: 'Mình có thể giúp bạn: chọn size, gợi ý sản phẩm, kiểm tra đơn hàng hoặc hỏi về chính sách đổi trả!' }
])

function toggleChat() {
  chatOpen.value = !chatOpen.value
}

function addMsg(text, type) {
  messages.value.push({ text, type })
  nextTick(() => {
    if (chatMsgsRef.value) chatMsgsRef.value.scrollTop = chatMsgsRef.value.scrollHeight
  })
}

function sendChat() {
  const txt = chatInput.value.trim()
  if (!txt) return
  addMsg(txt, 'user')
  chatInput.value = ''
  setTimeout(() => {
    addMsg(aiReplies[replyIdx.value % aiReplies.length], 'ai')
    replyIdx.value++
  }, 800)
}

function sendSugg(txt) {
  addMsg(txt, 'user')
  setTimeout(() => {
    addMsg(aiReplies[replyIdx.value % aiReplies.length], 'ai')
    replyIdx.value++
  }, 600)
}
</script>

<style scoped>
.chat-window.open {
  transform: scale(1) translateY(0) !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}
</style>
