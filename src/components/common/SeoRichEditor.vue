<template>
  <div class="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden text-left font-sans">
    <!-- Header with Tabs & SEO Score Badge -->
    <div class="bg-slate-50 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
      <!-- Tabs Navigation -->
      <div class="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl">
        <button
          type="button"
          @click="activeTab = 'editor'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1.5',
            activeTab === 'editor' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          <i class="ti ti-edit text-sm"></i>
          <span>Nội dung bài viết</span>
        </button>
        <button
          type="button"
          @click="activeTab = 'serp'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1.5',
            activeTab === 'serp' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          <i class="ti ti-brand-google text-sm"></i>
          <span>Google SERP Preview</span>
        </button>
        <button
          type="button"
          @click="activeTab = 'seo'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1.5',
            activeTab === 'seo' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          <i class="ti ti-chart-bar text-sm"></i>
          <span>Đánh giá SEO ({{ analysis.score }}/100)</span>
        </button>
      </div>

      <!-- Quick SEO Score Gauge -->
      <div class="flex items-center gap-3">
        <div class="text-right">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Điểm SEO</span>
          <span class="text-xs font-extrabold" :style="{ color: analysis.scoreColor }">
            {{ analysis.score }} / 100
          </span>
        </div>

        <div 
          class="px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 shadow-2xs"
          :class="analysis.scoreBadgeBg"
        >
          <span class="h-2 w-2 rounded-full animate-pulse" :style="{ backgroundColor: analysis.scoreColor }"></span>
          <span>{{ analysis.score >= 80 ? 'Chuẩn SEO' : (analysis.score >= 50 ? 'Cần cải thiện' : 'Chưa chuẩn SEO') }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="p-5 space-y-5">
      <!-- Focus Keyword & Quick Stats Input Bar -->
      <div class="bg-slate-50/80 border border-slate-200/80 p-4 rounded-xl space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex-1">
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <i class="ti ti-key text-accent"></i> Từ khóa SEO chính (Focus Keyword)
            </label>
            <input
              type="text"
              v-model="focusKeyword"
              placeholder="VD: giày sneaker nam, vệ sinh giày..."
              class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-800 font-semibold outline-none focus:border-accent transition-all"
            />
          </div>

          <!-- Quick Metrics Badges -->
          <div class="flex items-center gap-2 pt-1 sm:pt-4 flex-wrap">
            <div class="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-center min-w-[75px]">
              <span class="text-[10px] font-bold text-slate-400 uppercase block">Số từ</span>
              <span class="text-xs font-bold text-slate-700">{{ analysis.wordCount }} từ</span>
            </div>

            <div class="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-center min-w-[75px]">
              <span class="text-[10px] font-bold text-slate-400 uppercase block">Số ký tự</span>
              <span class="text-xs font-bold text-slate-700">{{ analysis.charCount }}</span>
            </div>

            <div class="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-center min-w-[85px]">
              <span class="text-[10px] font-bold text-slate-400 uppercase block">Mật độ từ khóa</span>
              <span 
                class="text-xs font-bold"
                :class="analysis.keywordDensity >= 0.8 && analysis.keywordDensity <= 2.5 ? 'text-emerald-600' : 'text-amber-600'"
              >
                {{ analysis.keywordDensity }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 1: Editor -->
      <div v-show="activeTab === 'editor'" class="space-y-3">
        <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Nội dung bài viết / Mô tả sản phẩm
        </label>

        <!-- CKEditor 5 Component Container -->
        <div class="ck-editor-wrapper rounded-xl border border-slate-200 overflow-hidden">
          <CkeditorComp
            v-if="CkeditorComp && editorBuild"
            :editor="editorBuild"
            v-model="contentModel"
            :config="editorConfig"
          />
          <!-- Fallback Rich Textarea if CKEditor is loading -->
          <div v-else class="space-y-2">
            <div class="bg-slate-100 p-2 rounded-t-xl flex items-center gap-2 border-b border-slate-200">
              <span class="text-xs font-bold text-slate-500">Đang tải CKEditor 5...</span>
            </div>
            <textarea
              v-model="contentModel"
              rows="12"
              class="w-full p-4 text-xs text-slate-800 outline-none resize-y border-none font-medium"
              placeholder="Nhập nội dung bài viết..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- TAB 2: Google SERP Preview & Meta Settings -->
      <div v-show="activeTab === 'serp'" class="space-y-5">
        <!-- Live Google Search Preview Card -->
        <div class="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div class="flex items-center gap-2">
              <i class="ti ti-brand-google text-lg text-blue-600"></i>
              <span class="text-xs font-bold text-slate-800">Xem trước hiển thị trên Google Search</span>
            </div>
            <div class="flex items-center gap-1 bg-white border border-slate-200 p-0.5 rounded-lg">
              <button 
                type="button" 
                @click="serpDevice = 'mobile'"
                :class="['px-2.5 py-1 text-[11px] font-bold rounded-md border-none cursor-pointer', serpDevice === 'mobile' ? 'bg-blue-50 text-blue-600' : 'text-slate-400']"
              >
                <i class="ti ti-device-mobile"></i> Di động
              </button>
              <button 
                type="button" 
                @click="serpDevice = 'desktop'"
                :class="['px-2.5 py-1 text-[11px] font-bold rounded-md border-none cursor-pointer', serpDevice === 'desktop' ? 'bg-blue-50 text-blue-600' : 'text-slate-400']"
              >
                <i class="ti ti-device-laptop"></i> Máy tính
              </button>
            </div>
          </div>

          <!-- Google Snippet Card -->
          <div :class="['bg-white p-4 rounded-xl border border-slate-200 shadow-2xs font-sans text-left space-y-1', serpDevice === 'mobile' ? 'max-w-sm' : 'w-full']">
            <!-- URL / Breadcrumb -->
            <div class="flex items-center gap-2 text-xs">
              <div class="h-4 w-4 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600">
                S
              </div>
              <div class="truncate">
                <span class="text-[12px] text-slate-700 font-normal">SaigonShoes</span>
                <span class="text-[11px] text-slate-400 mx-1">›</span>
                <span class="text-[11px] text-slate-500 truncate">https://saigonshoes.vn/{{ contentType === 'product' ? 'san-pham' : 'blog' }}/{{ slug || 'duong-dan-bai-viet' }}</span>
              </div>
            </div>

            <!-- Meta Title snippet -->
            <h4 class="text-blue-800 hover:underline text-base font-normal leading-snug cursor-pointer tracking-tight pt-0.5">
              {{ metaTitle || title || 'Tiêu đề hiển thị chuẩn SEO trên tìm kiếm Google' }}
            </h4>

            <!-- Meta Description snippet -->
            <p class="text-xs text-slate-600 leading-relaxed line-clamp-2 pt-0.5">
              {{ metaDescription || 'Vui lòng nhập thẻ mô tả Meta Description để hiển thị đoạn tóm tắt kết quả bài viết hấp dẫn trên kết quả tìm kiếm Google...' }}
            </p>
          </div>
        </div>

        <!-- Meta Title & Meta Description Inputs -->
        <div class="grid grid-cols-1 gap-4">
          <!-- Meta Title -->
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Thẻ tiêu đề SEO (Meta Title)</label>
              <span class="text-[11px] font-bold" :class="metaTitle.length >= 40 && metaTitle.length <= 60 ? 'text-emerald-600' : 'text-slate-400'">
                {{ metaTitle.length }} / 60 ký tự
              </span>
            </div>
            <input
              type="text"
              v-model="metaTitle"
              placeholder="Nhập tiêu đề SEO chuẩn (Nên từ 40 - 60 ký tự)..."
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-semibold outline-none focus:border-accent focus:bg-white transition-all"
            />
          </div>

          <!-- Meta Description -->
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Thẻ mô tả SEO (Meta Description)</label>
              <span class="text-[11px] font-bold" :class="metaDescription.length >= 120 && metaDescription.length <= 160 ? 'text-emerald-600' : 'text-slate-400'">
                {{ metaDescription.length }} / 160 ký tự
              </span>
            </div>
            <textarea
              v-model="metaDescription"
              rows="3"
              placeholder="Nhập tóm tắt mô tả SEO hiển thị trên Google (Nên chứa từ khóa chính và dài từ 120 - 160 ký tự)..."
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none focus:border-accent focus:bg-white transition-all resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- TAB 3: Full SEO Checklist & Diagnostic Recommendations -->
      <div v-show="activeTab === 'seo'" class="space-y-4">
        <!-- Score Overview Banner -->
        <div class="p-4 rounded-xl border flex items-center justify-between gap-4" :class="analysis.scoreBadgeBg">
          <div class="flex items-center gap-3">
            <div 
              class="h-12 w-12 rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-sm shrink-0"
              :style="{ backgroundColor: analysis.scoreColor }"
            >
              {{ analysis.score }}
            </div>
            <div>
              <h4 class="font-bold text-sm">
                {{ analysis.score >= 80 ? '🎉 Bài viết đạt chuẩn SEO tuyệt vời!' : (analysis.score >= 50 ? '⚠️ Bài viết cần tối ưu thêm một vài tiêu chí' : '❌ Bài viết chưa đạt chuẩn SEO tối thiểu') }}
              </h4>
              <p class="text-xs opacity-90 mt-0.5">
                Đã vượt qua {{ analysis.passedCount }}/{{ analysis.totalChecks }} tiêu chí tối ưu hóa tìm kiếm Google.
              </p>
            </div>
          </div>
        </div>

        <!-- Checklist List -->
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          <div 
            v-for="check in analysis.checks" 
            :key="check.key"
            class="p-3.5 flex items-start gap-3 hover:bg-slate-50/80 transition-colors"
          >
            <!-- Status Icon -->
            <div class="mt-0.5 shrink-0">
              <span v-if="check.passed" class="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              <span v-else-if="check.importance === 'high'" class="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                ✕
              </span>
              <span v-else class="h-5 w-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold">
                !
              </span>
            </div>

            <!-- Diagnostic Text -->
            <div class="flex-1 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800">{{ check.label }}</span>
                <span class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                  {{ check.importance === 'high' ? 'Quan trọng' : 'Khuyên dùng' }}
                </span>
              </div>
              <p class="mt-0.5 font-medium" :class="check.passed ? 'text-slate-600' : 'text-slate-700'">
                {{ check.statusMsg }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, shallowRef, computed } from 'vue'
import { useSeoAnalyzer } from '@/composables/useSeoAnalyzer.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  contentType: {
    type: String,
    default: 'blog' // 'blog' or 'product'
  },
  slug: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'update:focusKeyword', 'update:metaTitle', 'update:metaDescription'])

const contentModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const activeTab = ref('editor')
const serpDevice = ref('desktop')

// SEO Input States
const focusKeyword = ref('')
const metaTitle = ref('')
const metaDescription = ref('')

// Synchronize Title to Meta Title if Meta Title is empty
watch(() => props.title, (newTitle) => {
  if (!metaTitle.value && newTitle) {
    metaTitle.value = newTitle
  }
}, { immediate: true })

// SEO Analysis Composable
const { analysis } = useSeoAnalyzer({
  title: computed(() => props.title),
  contentHtml: computed(() => props.modelValue),
  focusKeyword: computed(() => focusKeyword.value),
  metaTitle: computed(() => metaTitle.value),
  metaDescription: computed(() => metaDescription.value),
  slug: computed(() => props.slug),
  contentType: computed(() => props.contentType)
})

import { Ckeditor as CkeditorComp } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const editorBuild = ClassicEditor.default || ClassicEditor

const editorConfig = ref({
  toolbar: [
    'heading', '|',
    'bold', 'italic', 'underline', 'link', '|',
    'bulletedList', 'numberedList', 'blockQuote', '|',
    'insertTable', 'undo', 'redo'
  ],
  heading: {
    options: [
      { model: 'paragraph', title: 'Đoạn văn (Paragraph)', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Tiêu đề 1 (H1)', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Tiêu đề 2 (H2)', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Tiêu đề 3 (H3)', class: 'ck-heading_heading3' }
    ]
  },
  placeholder: 'Nhập nội dung bài viết / mô tả sản phẩm chuẩn SEO tại đây...'
})
</script>

<style>
/* Custom CKEditor Styling Fixes & Tailwind Reset Override */
.ck-editor__editable_inline,
.ck-content {
  min-height: 280px;
  max-height: 550px;
  padding: 1.25rem !important;
  font-size: 0.875rem !important;
  color: #1e293b !important;
  background-color: #ffffff !important;
}

/* Heading H1, H2, H3, H4 Typography */
.ck-editor__editable_inline h1,
.ck-content h1 {
  font-size: 1.875rem !important; /* 30px */
  font-weight: 800 !important;
  line-height: 1.25 !important;
  margin-top: 1.25rem !important;
  margin-bottom: 0.75rem !important;
  color: #0f172a !important;
}

.ck-editor__editable_inline h2,
.ck-content h2 {
  font-size: 1.5rem !important; /* 24px */
  font-weight: 700 !important;
  line-height: 1.33 !important;
  margin-top: 1.125rem !important;
  margin-bottom: 0.625rem !important;
  color: #1e293b !important;
}

.ck-editor__editable_inline h3,
.ck-content h3 {
  font-size: 1.25rem !important; /* 20px */
  font-weight: 700 !important;
  line-height: 1.4 !important;
  margin-top: 1rem !important;
  margin-bottom: 0.5rem !important;
  color: #334155 !important;
}

.ck-editor__editable_inline h4,
.ck-content h4 {
  font-size: 1.125rem !important; /* 18px */
  font-weight: 600 !important;
  margin-top: 0.875rem !important;
  margin-bottom: 0.5rem !important;
  color: #475569 !important;
}

/* Paragraphs & Lists */
.ck-editor__editable_inline p,
.ck-content p {
  font-size: 0.875rem !important;
  line-height: 1.625 !important;
  margin-bottom: 0.75rem !important;
  color: #334155 !important;
}

.ck-editor__editable_inline ul,
.ck-content ul {
  list-style-type: disc !important;
  padding-left: 1.5rem !important;
  margin-bottom: 0.75rem !important;
}

.ck-editor__editable_inline ol,
.ck-content ol {
  list-style-type: decimal !important;
  padding-left: 1.5rem !important;
  margin-bottom: 0.75rem !important;
}

.ck-editor__editable_inline blockquote,
.ck-content blockquote {
  border-left: 4px solid #ff4d00 !important;
  padding-left: 1rem !important;
  margin: 1rem 0 !important;
  font-style: italic !important;
  color: #64748b !important;
  background-color: #fff7ed !important;
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  border-radius: 0 0.5rem 0.5rem 0 !important;
}

.ck-toolbar {
  border-top-left-radius: 0.75rem !important;
  border-top-right-radius: 0.75rem !important;
  background-color: #f8fafc !important;
  border-color: #e2e8f0 !important;
}

.ck-editor__main {
  border-bottom-left-radius: 0.75rem !important;
  border-bottom-right-radius: 0.75rem !important;
  overflow: hidden;
}
</style>
