<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="text-left">
        <div class="flex items-center gap-2">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Quản lý AI Assistant</h1>
          <span class="bg-linear-to-r from-orange-500 to-amber-500 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <i class="ti ti-sparkles"></i> Gemini AI
          </span>
        </div>
        <p class="text-sm text-slate-500 mt-1">Cấu hình prompt, theo dõi hiệu năng tư vấn size/style và quản lý lịch sử trò chuyện của AI Chatbot.</p>
      </div>

      <!-- Quick Action Status Indicator -->
      <div class="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-slate-100 shadow-2xs">
        <div class="flex items-center gap-2">
          <span :class="['w-3 h-3 rounded-full animate-pulse', settings.is_enabled ? 'bg-emerald-500' : 'bg-red-500']"></span>
          <span class="text-xs font-bold text-slate-700">Trạng thái AI:</span>
          <span :class="['text-xs font-extrabold uppercase tracking-wide', settings.is_enabled ? 'text-emerald-600' : 'text-red-500']">
            {{ settings.is_enabled ? 'Đang hoạt động' : 'Tạm dừng (Bảo trì)' }}
          </span>
        </div>
        <button 
          @click="toggleEnableAI" 
          :class="[
            'text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer shadow-2xs',
            settings.is_enabled ? 'bg-red-50 hover:bg-red-500 hover:text-white text-red-500 border-red-200' : 'bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600 border-emerald-200'
          ]"
        >
          {{ settings.is_enabled ? 'Tắt khẩn cấp' : 'Bật hoạt động' }}
        </button>
      </div>
    </div>


    <!-- Navigation Tabs -->
    <div class="flex border-t border-x border-slate-100 border-b border-b-slate-200 text-xs font-semibold overflow-x-auto whitespace-nowrap bg-white px-6 rounded-t-2xl shadow-2xs gap-2">
      <button 
        @click="activeTab = 'config'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2 flex items-center gap-2',
          activeTab === 'config' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        <i class="ti ti-adjustments text-base"></i> Cấu hình Prompt & Giọng văn
      </button>

      <button 
        @click="activeTab = 'suggestions'" 
        :class="[
          'py-4 px-4 transition-all cursor-pointer font-bold focus:outline-none border-b-2 flex items-center gap-2',
          activeTab === 'suggestions' ? 'text-accent border-accent' : 'text-slate-500 hover:text-slate-800 border-transparent'
        ]"
      >
        <i class="ti ti-click text-base"></i> Nút gợi ý nhanh (Quick Actions)
      </button>

    </div>

    <!-- TAB 1: CẤU HÌNH PROMPT & AI SETTINGS -->
    <div v-if="activeTab === 'config'" class="bg-white p-6 md:p-8 rounded-b-2xl border-b border-x border-slate-100 shadow-2xs space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left Side: Core Parameters -->
        <div class="space-y-4 lg:col-span-1">
          <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <i class="ti ti-robot text-accent"></i> Thông tin Trợ lý AI
          </h3>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Tên hiển thị Trợ lý:</label>
            <input 
              v-model="settings.assistant_name" 
              type="text" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-semibold"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Mô hình AI (Model):</label>
            <select 
              v-model="settings.ai_model" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-semibold"
            >
              <option value="Gemini 1.5 Flash">Google Gemini 1.5 Flash (Khuyên dùng - Nhanh & Rẻ)</option>
              <option value="Gemini 1.5 Pro">Google Gemini 1.5 Pro (Thông minh vượt trội)</option>
              <option value="GPT-4o-Mini">OpenAI GPT-4o-Mini</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Phong cách giao tiếp (Persona):</label>
            <select 
              v-model="settings.persona_style" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-semibold"
            >
              <option value="friendly">😊 Thân thiện, Năng động & Vui vẻ</option>
              <option value="professional">💼 Lịch sự, Chuyên nghiệp & Chuẩn mực</option>
              <option value="enthusiastic">🔥 Nhiệt tình, Tư vấn phong cách trẻ trung</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Mức độ sáng tạo (Temperature): {{ settings.temperature }}</label>
            <input 
              v-model.number="settings.temperature" 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.1"
              class="w-full accent-accent cursor-pointer"
            />
            <div class="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>Chính xác / Logic (0.1)</span>
              <span>Sáng tạo (1.0)</span>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-100 space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Hotline cửa hàng:</label>
              <input v-model="settings.hotline" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-800 font-semibold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Địa chỉ Shop:</label>
              <input v-model="settings.store_address" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-800 font-semibold" />
            </div>
          </div>
        </div>

        <!-- Right Side: Prompt Editors -->
        <div class="space-y-5 lg:col-span-2">
          <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <i class="ti ti-file-code text-accent"></i> System Prompt & Quy tắc Tư vấn
          </h3>

          <div>
            <label class="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Hướng dẫn Hệ thống (System Prompt):</span>
              <span class="text-[10px] text-slate-400 font-normal">Chỉ dẫn vai trò & nhiệm vụ chính cho AI</span>
            </label>
            <textarea 
              v-model="settings.system_prompt" 
              rows="6"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-mono leading-relaxed resize-y"
            ></textarea>
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Bảng quy đổi Size & Quy tắc tư vấn dáng chân:</span>
              <span class="text-[10px] text-accent font-semibold">Cực kỳ quan trọng cho tính năng đo size</span>
            </label>
            <textarea 
              v-model="settings.size_chart_guide" 
              rows="5"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-mono leading-relaxed resize-y"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Chính sách vận chuyển & Đổi trả:</label>
            <textarea 
              v-model="settings.shipping_policy" 
              rows="2"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 px-3.5 text-xs text-slate-800 outline-none focus:border-accent focus:bg-white transition-all font-medium"
            ></textarea>
          </div>
        </div>

      </div>

      <!-- Save Footer -->
      <div class="pt-6 border-t border-slate-100 flex justify-end gap-3">
        <button 
          @click="resetConfig"
          class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-bold transition-all cursor-pointer border-none"
        >
          Khôi phục mặc định
        </button>
        <button 
          @click="saveConfig"
          class="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-none shadow-md flex items-center gap-2"
        >
          <i class="ti ti-device-floppy"></i> Lưu Cấu Hình AI
        </button>
      </div>
    </div>


    <!-- TAB 3: NÚT GỢI Ý NHANH (QUICK SUGGESTIONS) -->
    <div v-if="activeTab === 'suggestions'" class="bg-white p-6 md:p-8 rounded-b-2xl border-b border-x border-slate-100 shadow-2xs space-y-6">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider">Danh sách nút câu hỏi gợi ý nhanh</h3>
          <p class="text-xs text-slate-400 mt-0.5">Các nút hiển thị trên thanh công cụ widget AI để khách hàng bấm hỏi ngay.</p>
        </div>
        <button 
          @click="addSuggestion"
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-none flex items-center gap-1.5"
        >
          <i class="ti ti-plus"></i> Thêm nút gợi ý
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="(item, idx) in suggestions" 
          :key="item.id"
          class="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-2xs"
        >
          <div class="flex-1 space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-slate-400">#{{ idx + 1 }}</span>
              <input 
                v-model="item.text" 
                type="text" 
                class="flex-1 bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-800 outline-none focus:border-accent"
                placeholder="Nhập nhãn nút (VD: 📐 Đo size chân)"
              />
            </div>
            <div class="flex items-center gap-3">
              <label class="inline-flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input v-model="item.active" type="checkbox" class="accent-accent" />
                <span class="font-medium">Hiển thị nút này</span>
              </label>
            </div>
          </div>
          <button 
            @click="removeSuggestion(idx)"
            class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border-none cursor-pointer"
            title="Xóa nút này"
          >
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex justify-end">
        <button 
          @click="saveSuggestionsList"
          class="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-none shadow-md flex items-center gap-2"
        >
          <i class="ti ti-device-floppy"></i> Cập nhật danh sách gợi ý
        </button>
      </div>
    </div>


    <!-- DIALOGUE MODAL FOR CHAT LOG DETAIL -->
    <div v-if="modalLogOpen" class="fixed inset-0 z-110 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-left">
        <!-- Header -->
        <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold">🤖</div>
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300">Chi tiết cuộc trò chuyện #{{ activeLog?.id }}</h3>
              <p class="text-xs font-bold text-white">{{ activeLog?.user_name }} ({{ activeLog?.user_phone || activeLog?.user_email }})</p>
            </div>
          </div>
          <button @click="modalLogOpen = false" class="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border-none cursor-pointer">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Chat history content -->
        <div class="p-6 overflow-y-auto space-y-4 bg-slate-50/50 flex-1">
          <div 
            v-for="(msg, i) in activeLog?.dialogue" 
            :key="i"
            :class="['flex gap-3 max-w-[88%]', msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto']"
          >
            <div class="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs shrink-0 font-bold">
              {{ msg.sender === 'user' ? '👤' : '🤖' }}
            </div>
            <div class="space-y-2">
              <div 
                :class="[
                  'py-2.5 px-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-2xs font-medium',
                  msg.sender === 'user' ? 'bg-accent text-white rounded-tr-none font-bold' : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                ]"
              >
                {{ msg.text }}
              </div>

              <!-- Recommended Cards inside modal -->
              <div v-if="msg.recommended_products && msg.recommended_products.length > 0" class="space-y-1.5 mt-2">
                <span class="text-[10px] font-bold text-slate-400 uppercase">🔥 Sản phẩm AI đã gợi ý:</span>
                <div class="grid grid-cols-1 gap-2">
                  <div 
                    v-for="p in msg.recommended_products" 
                    :key="p.id"
                    class="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-3 shadow-2xs"
                  >
                    <img :src="p.image" class="w-10 h-10 object-cover rounded-lg border border-slate-100" />
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-bold text-slate-800 truncate">{{ p.name }}</p>
                      <p class="text-xs font-extrabold text-accent">{{ formatPrice(p.price) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button @click="modalLogOpen = false" class="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all border-none cursor-pointer">
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { getAIStats, getAISettings, saveAISettings, getAIChatLogs, getQuickSuggestions, saveQuickSuggestions } from '@/api/aiAdmin.js'

const activeTab = ref('config')
const stats = ref({})
const settings = reactive({
  assistant_name: '',
  ai_model: '',
  temperature: 0.7,
  is_enabled: true,
  persona_style: 'friendly',
  store_address: '',
  hotline: '',
  shipping_policy: '',
  system_prompt: '',
  size_chart_guide: ''
})

// Logs state
const logs = ref([])
const logSearch = ref('')
const logTopicFilter = ref('all')
const modalLogOpen = ref(false)
const activeLog = ref(null)

// Suggestions state
const suggestions = ref([])

const filteredLogs = computed(() => {
  return logs.value.filter(l => {
    const matchesSearch = !logSearch.value || 
      l.user_name.toLowerCase().includes(logSearch.value.toLowerCase()) ||
      l.user_email.toLowerCase().includes(logSearch.value.toLowerCase()) ||
      l.topic.toLowerCase().includes(logSearch.value.toLowerCase())
    const matchesTopic = logTopicFilter.value === 'all' || l.topic === logTopicFilter.value
    return matchesSearch && matchesTopic
  })
})

function formatPrice(val) {
  if (!val) return '0đ'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
}

async function loadData() {
  try {
    const [st, set, lg, sg] = await Promise.all([
      getAIStats(),
      getAISettings(),
      getAIChatLogs(),
      getQuickSuggestions()
    ])
    if (st) stats.value = st
    if (set) Object.assign(settings, set)
    if (lg && lg.data) logs.value = lg.data
    if (sg) suggestions.value = sg
  } catch (err) {
    console.error('Error loading AI Admin data:', err)
  }
}

async function saveConfig() {
  Swal.fire({
    title: 'Đang lưu...',
    text: 'Hệ thống đang cập nhật cấu hình cho AI Assistant',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  })

  const res = await saveAISettings(settings)
  if (res && res.success) {
    Swal.fire({
      icon: 'success',
      title: 'Đã cập nhật!',
      text: 'Cấu hình AI Assistant đã được lưu thành công.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

function resetConfig() {
  Swal.fire({
    title: 'Khôi phục mặc định?',
    text: 'Các thông số System Prompt sẽ được trả về trạng thái mặc định.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý reset'
  }).then(async (result) => {
    if (result.isConfirmed) {
      loadData()
      Swal.fire('Đã khôi phục', 'Dữ liệu cấu hình đã về mặc định.', 'success')
    }
  })
}

function toggleEnableAI() {
  settings.is_enabled = !settings.is_enabled
  const statusStr = settings.is_enabled ? 'Bật' : 'Tắt khẩn cấp'
  Swal.fire({
    icon: settings.is_enabled ? 'success' : 'warning',
    title: `Đã ${statusStr} AI Assistant`,
    text: settings.is_enabled ? 'AI đã sẵn sàng tư vấn cho khách hàng.' : 'AI Chatbot đã tạm dừng hiển thị ở người dùng.',
    confirmButtonColor: '#FF4D00'
  })
}

function openLogDetail(log) {
  activeLog.value = log
  modalLogOpen.value = true
}

function addSuggestion() {
  suggestions.value.push({
    id: Date.now(),
    text: '👟 Nút gợi ý mới',
    action: 'prompt_custom',
    active: true
  })
}

function removeSuggestion(idx) {
  suggestions.value.splice(idx, 1)
}

async function saveSuggestionsList() {
  const res = await saveQuickSuggestions(suggestions.value)
  if (res && res.success) {
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Đã lưu danh sách nút gợi ý nhanh.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>
