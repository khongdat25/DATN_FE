<template>
  <!-- Chatbot Widget -->
  <div class="fixed bottom-[28px] right-[28px] z-300">
    <!-- Chat Window -->
    <div
      :class="[
        'chat-window absolute bottom-[70px] right-0 w-[360px] max-w-[90vw] bg-bg border border-border rounded-2xl overflow-hidden scale-90 translate-y-5 origin-bottom-right opacity-0 pointer-events-none transition-all duration-300 ease-out shadow-[0_16px_48px_rgba(0,0,0,.2)] flex flex-col',
        { open: chatOpen }
      ]"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-[#FF4D00] to-[#FF7700] py-3.5 px-4 flex items-center gap-3 shadow-sm shrink-0">
        <div class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl text-white shadow-inner">
          👟
        </div>
        <div>
          <div class="text-[15px] font-semibold text-white tracking-wide">SaigonShoes AI Stylist</div>
          <div class="text-[11px] text-white/90 flex items-center gap-1.5 font-medium">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Tư vấn Size & Style 24/7
          </div>
        </div>
        <button 
          class="ml-auto w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 text-[18px] transition-all border-none cursor-pointer" 
          @click="toggleChat"
          title="Đóng chat"
        >
          <i class="ti ti-x"></i>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="h-[340px] overflow-y-auto p-4 flex flex-col gap-3 bg-surface/50 font-body scrollbar-thin" ref="chatMsgsRef">
        <div 
          v-for="(msg, idx) in messages" 
          :key="idx"
          :class="['flex gap-2.5 items-end max-w-[92%]', msg.type === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto']"
        >
          <div class="w-7 h-7 rounded-full bg-surface2 border border-border flex items-center justify-center text-[13px] shrink-0 shadow-sm">
            {{ msg.type === 'ai' ? '🤖' : '👤' }}
          </div>
          <div class="flex flex-col gap-2 max-w-[85%]">
            <!-- AI Rich HTML Message -->
            <div 
              v-if="msg.type === 'ai'"
              class="py-2.5 px-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm bg-surface2 text-text rounded-bl-xs border border-border/50 space-y-1.5 chat-markdown-content"
              v-html="formatMarkdown(msg.text)"
            ></div>

            <!-- User Message -->
            <div 
              v-else
              class="py-2.5 px-3.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap shadow-sm bg-accent text-white rounded-br-xs font-medium"
            >
              {{ msg.text }}
            </div>

            <!-- Interactive Recommended Product Cards -->
            <div v-if="msg.products && msg.products.length > 0" class="flex flex-col gap-2 mt-1">
              <div class="text-[11px] font-semibold text-text-muted flex items-center gap-1">
                <span>🔥 Sản phẩm gợi ý:</span>
              </div>
              <div class="grid grid-cols-1 gap-2">
                <div 
                  v-for="prod in msg.products" 
                  :key="prod.id"
                  class="bg-bg border border-border rounded-xl p-2 flex items-center gap-2.5 shadow-sm hover:border-accent transition-all cursor-pointer group"
                  @click="goToProduct(prod.slug)"
                >
                  <img 
                    :src="prod.image || 'https://via.placeholder.com/80'" 
                    :alt="prod.name"
                    class="w-12 h-12 object-cover rounded-lg shrink-0 border border-border/50 group-hover:scale-105 transition-transform"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="text-[12px] font-semibold text-text truncate group-hover:text-accent transition-colors">
                      {{ prod.name }}
                    </div>
                    <div class="text-[12px] font-bold text-accent mt-0.5">
                      {{ formatPrice(prod.price) }}
                    </div>
                  </div>
                  <div class="flex items-center gap-1 text-[11px] font-medium text-accent bg-accent/10 px-2 py-1 rounded-lg shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                    <span>Xem ngay</span>
                    <i class="ti ti-arrow-right text-[10px]"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isLoading" class="flex gap-2.5 items-end mr-auto">
          <div class="w-7 h-7 rounded-full bg-surface2 border border-border flex items-center justify-center text-[13px] shrink-0">
            🤖
          </div>
          <div class="bg-surface2 border border-border/50 py-2.5 px-4 rounded-2xl rounded-bl-xs text-text-muted flex items-center gap-1.5 shadow-sm">
            <span class="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
            <span class="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></span>
            <span class="text-[11px] ml-1 font-medium text-text-muted">AI SaigonShoes đang suy nghĩ...</span>
          </div>
        </div>
      </div>

      <!-- Size Calculator Quick Widget (Collapsible) -->
      <div v-if="showSizeWidget" class="bg-surface2 border-t border-border p-3 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] font-bold text-text flex items-center gap-1">
            📏 Công cụ tính Size chân nhanh
          </span>
          <button @click="showSizeWidget = false" class="text-text-muted text-xs hover:text-accent">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label class="text-[10px] text-text-muted block mb-1">Chiều dài chân (cm):</label>
            <input 
              v-model="footLength" 
              type="number" 
              step="0.1" 
              placeholder="Ví dụ: 24.5"
              class="w-full bg-bg border border-border rounded-lg py-1 px-2 text-xs text-text outline-none focus:border-accent"
            />
          </div>
          <div>
            <label class="text-[10px] text-text-muted block mb-1">Dáng bàn chân:</label>
            <select 
              v-model="footShape"
              class="w-full bg-bg border border-border rounded-lg py-1 px-2 text-xs text-text outline-none focus:border-accent"
            >
              <option value="thon">Thon / Chuẩn</option>
              <option value="bè">Bè ngang / Mu dày</option>
            </select>
          </div>
        </div>
        <button 
          @click="submitSizeCalc"
          class="w-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer border-none shadow-xs"
        >
          Tính toán & Tư vấn Size ngay
        </button>
      </div>

      <!-- Quick Action Suggestions -->
      <div 
        class="flex gap-1.5 overflow-x-auto px-3.5 py-2 border-t border-border bg-bg/80 shrink-0 scrollbar-horizontal cursor-grab active:cursor-grabbing select-none"
        @wheel.prevent="onWheelScroll"
        @mousedown="onMouseDown"
        @mouseleave="onMouseLeave"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
      >
        <button 
          v-for="(sugg, sIdx) in suggestions"
          :key="sugg.id || sIdx"
          class="bg-surface2 border border-border text-text-muted hover:text-accent hover:border-accent text-[11px] py-1 px-2.5 rounded-full transition-all cursor-pointer hover:bg-surface shrink-0 whitespace-nowrap font-medium flex items-center gap-1 shadow-2xs"
          @click="handleSuggestionClick(sugg)"
        >
          {{ sugg.text }}
        </button>
      </div>

      <!-- Chat Input Field -->
      <div class="flex gap-2 p-3 border-t border-border bg-bg shrink-0">
        <input
          v-model="chatInput"
          class="flex-1 bg-surface2 border border-border rounded-xl py-2 px-3.5 text-[13px] text-text outline-none font-body transition-colors focus:border-accent focus:bg-bg placeholder:text-text-muted"
          type="text"
          placeholder="Hỏi AI về size chân, phối đồ..."
          :disabled="isLoading"
          @keydown.enter="sendChat"
        />
        <button 
          class="w-9 h-9 rounded-xl bg-accent border-none flex items-center justify-center text-[16px] text-white transition-all hover:bg-accent-hover disabled:opacity-50 cursor-pointer shadow-xs shrink-0" 
          :disabled="isLoading || !chatInput.trim()"
          @click="sendChat"
        >
          <i class="ti ti-send"></i>
        </button>
      </div>
    </div>

    <!-- Toggle Floating Button -->
    <button 
      class="w-14 h-14 bg-gradient-to-r from-[#FF4D00] to-[#FF7700] text-white rounded-full flex items-center justify-center text-[24px] cursor-pointer shadow-[0_6px_24px_rgba(255,77,0,.35)] transition-all relative border-none hover:scale-105 active:scale-95 group" 
      @click="toggleChat"
      title="SaigonShoes AI Assistant"
    >
      <span class="group-hover:rotate-12 transition-transform duration-300">👟</span>
      <span class="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-bg"></span>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { sendAIChatMessage, getPublicAISuggestions } from '@/api/aiChat.js'

const router = useRouter()
const chatOpen = ref(false)
const chatInput = ref('')
const isLoading = ref(false)
const chatMsgsRef = ref(null)

// Suggestions state & Drag-scroll handling
const suggestions = ref([])
const isMouseDown = ref(false)
const startX = ref(0)
const scrollLeftStart = ref(0)

// Size Widget state
const showSizeWidget = ref(false)
const footLength = ref('')
const footShape = ref('thon')

const messages = ref([
  { 
    type: 'ai', 
    text: 'Xin chào! Mình là SaigonShoes AI Stylist 👟✨' 
  },
  { 
    type: 'ai', 
    text: 'Mình có thể giúp bạn:\n• Tính toán & tư vấn Size giày chính xác theo cm chân 📐\n• Tư vấn phối đồ chuẩn phong cách Streetwear / Casual 🎨\n• Trợ giúp kiểm tra đơn hàng & sản phẩm mới 🔥' 
  }
])

async function loadSuggestions() {
  const res = await getPublicAISuggestions()
  if (res && res.data && res.data.length > 0) {
    suggestions.value = res.data
  } else if (Array.isArray(res) && res.length > 0) {
    suggestions.value = res
  } else {
    suggestions.value = [
      { text: '📐 Đo size chân', action: 'size_calc' },
      { text: '👟 Style Streetwear', action: 'prompt' },
      { text: '🔥 Giày Hot giảm giá', action: 'prompt' }
    ]
  }
}

function handleSuggestionClick(sugg) {
  const txt = typeof sugg === 'string' ? sugg : sugg.text
  if (txt.includes('Đo size chân') || sugg.action === 'size_calc') {
    showSizeWidget.value = !showSizeWidget.value
  } else {
    sendSugg(txt)
  }
}

// Mouse wheel & Mouse drag scroll handlers
function onWheelScroll(e) {
  if (e.deltaY !== 0) {
    e.currentTarget.scrollLeft += e.deltaY;
  }
}

function onMouseDown(e) {
  isMouseDown.value = true
  startX.value = e.pageX - e.currentTarget.offsetLeft
  scrollLeftStart.value = e.currentTarget.scrollLeft
}

function onMouseLeave() {
  isMouseDown.value = false
}

function onMouseUp() {
  isMouseDown.value = false
}

function onMouseMove(e) {
  if (!isMouseDown.value) return
  e.preventDefault()
  const x = e.pageX - e.currentTarget.offsetLeft
  const walk = (x - startX.value) * 1.5
  e.currentTarget.scrollLeft = scrollLeftStart.value - walk
}

function toggleChat() {
  chatOpen.value = !chatOpen.value
}

function scrollToBottom() {
  nextTick(() => {
    if (chatMsgsRef.value) {
      chatMsgsRef.value.scrollTop = chatMsgsRef.value.scrollHeight
    }
  })
}

function formatPrice(val) {
  if (!val) return '0đ'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
}

function formatMarkdown(text) {
  if (!text) return ''

  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Headers (### or ## or #)
  html = html.replace(/^###?\s+(.+)$/gm, '<div class="font-bold text-accent text-[13px] mt-2 mb-1 flex items-center gap-1"><span>✨</span> <span>$1</span></div>')

  // Bold text (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 bg-orange-50/80 px-1 py-0.2 rounded text-orange-950">$1</strong>')

  // Italic (*text*)
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>')

  // Inline code (`code`)
  html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 text-orange-600 px-1.5 py-0.5 rounded font-mono text-[11px] border border-slate-200">$1</code>')

  // Size badges (Size 39, Size 40, Size 41, Size 42, Size 43, etc.)
  html = html.replace(/(Size\s+\d{2}(?:\.\d)?)/gi, '<span class="inline-flex items-center gap-1 bg-orange-100 text-orange-800 font-extrabold px-1.5 py-0.5 rounded-md text-[11px] border border-orange-200 shadow-2xs my-0.5">👟 $1</span>')

  // Bullet points (* item or - item or • item)
  html = html.replace(/^[\*\-•]\s+(.+)$/gm, '<div class="flex items-start gap-1.5 my-1"><span class="text-orange-500 font-bold shrink-0">✦</span><span>$1</span></div>')

  // Numbered lists (1. item)
  html = html.replace(/^(\d+)\.\s+(.+)$/gm, '<div class="flex items-start gap-1.5 my-1"><span class="w-4 h-4 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">$1</span><span>$2</span></div>')

  // Line breaks (\n)
  html = html.replace(/\n/g, '<br/>')

  // Clean up double <br/> after block elements
  html = html.replace(/<\/div><br\/>/g, '</div>')

  return html
}

function goToProduct(slug) {
  if (slug) {
    router.push({ name: 'product-detail', params: { id: slug } })
  }
}

async function sendChat() {
  const txt = chatInput.value.trim()
  if (!txt || isLoading.value) return

  // Push user message
  messages.value.push({ type: 'user', text: txt })
  chatInput.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const res = await sendAIChatMessage(txt)
    if (res && res.reply) {
      messages.value.push({ 
        type: 'ai', 
        text: res.reply,
        products: res.recommended_products || []
      })
    } else {
      messages.value.push({ 
        type: 'ai', 
        text: 'Cảm ơn bạn! SaigonShoes luôn sẵn sàng tư vấn mẫu giày tốt nhất cho bạn.' 
      })
    }
  } catch (err) {
    console.error('AI Chatbot Error:', err)
    messages.value.push({ 
      type: 'ai', 
      text: 'Hệ thống đang bận một chút, bạn thử lại sau vài giây nhé! 😊' 
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

function sendSugg(txt) {
  chatInput.value = txt
  sendChat()
}

function submitSizeCalc() {
  if (!footLength.value) return
  const shapeText = footShape.value === 'bè' ? 'bè ngang/dày' : 'thon/chuẩn'
  const prompt = `Chân tôi dài ${footLength.value}cm, dáng bàn chân ${shapeText}. SaigonShoes tư vấn giúp tôi mang size bao nhiêu nhé!`
  showSizeWidget.value = false
  chatInput.value = prompt
  sendChat()
}

onMounted(() => {
  loadSuggestions()
})
</script>

<style scoped>
.chat-window.open {
  transform: scale(1) translateY(0) !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}

/* Custom scrollbar for chat */
.scrollbar-thin::-webkit-scrollbar {
  width: 5px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}

/* Custom horizontal scrollbar for quick actions */
.scrollbar-horizontal::-webkit-scrollbar {
  height: 4px;
}
.scrollbar-horizontal::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}
.scrollbar-horizontal::-webkit-scrollbar-thumb {
  background: rgba(255, 77, 0, 0.3);
  border-radius: 10px;
}
.scrollbar-horizontal::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 77, 0, 0.6);
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
