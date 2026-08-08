import { computed } from 'vue'

/**
 * Helper function to strip HTML tags and return clean text
 */
export function stripHtml(html = '') {
  if (!html) return ''
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

/**
 * Remove Vietnamese accents for flexible keyword matching
 */
export function removeAccents(str = '') {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
}

/**
 * Composable for Real-time SEO Analysis
 */
export function useSeoAnalyzer(params) {
  const {
    title,
    contentHtml,
    focusKeyword,
    metaTitle,
    metaDescription,
    slug,
    contentType // 'product' or 'blog'
  } = params

  const analysis = computed(() => {
    const rawContent = contentHtml?.value || ''
    const kw = (focusKeyword?.value || '').trim()
    const cleanTitle = (title?.value || '').trim()
    const cleanMetaTitle = (metaTitle?.value || cleanTitle).trim()
    const cleanMetaDesc = (metaDescription?.value || '').trim()
    const cleanSlug = (slug?.value || '').trim()
    const cleanText = stripHtml(rawContent).trim()

    // Normalized texts for comparison
    const kwNorm = removeAccents(kw)
    const titleNorm = removeAccents(cleanTitle)
    const metaTitleNorm = removeAccents(cleanMetaTitle)
    const metaDescNorm = removeAccents(cleanMetaDesc)
    const slugNorm = removeAccents(cleanSlug)
    const textNorm = removeAccents(cleanText)

    // 1. Calculate Word & Char Count
    const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : []
    const wordCount = words.length
    const charCount = cleanText.length

    // 2. Keyword Count & Density
    let kwCount = 0
    if (kwNorm && textNorm) {
      // Regex search for keyword occurrences
      const escapedKw = kwNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(escapedKw, 'gi')
      const matches = textNorm.match(regex)
      kwCount = matches ? matches.length : 0
    }
    const keywordDensity = wordCount > 0 && kwCount > 0 
      ? Number(((kwCount / wordCount) * 100).toFixed(2)) 
      : 0

    // 3. SEO Checklist Items
    const checks = []
    let passedCount = 0
    let totalChecks = 0

    const addCheck = (key, label, passed, statusMsg, importance = 'high') => {
      totalChecks++
      if (passed) passedCount++
      checks.push({
        key,
        label,
        passed,
        statusMsg,
        importance
      })
    }

    // Check 1: Focus Keyword Entered
    const hasKw = kw.length > 0
    addCheck(
      'has_kw',
      'Từ khóa chính (Focus Keyword)',
      hasKw,
      hasKw ? `Từ khóa: "${kw}"` : 'Chưa nhập từ khóa SEO chính',
      'high'
    )

    // Check 2: Keyword in Title
    const kwInTitle = hasKw && (titleNorm.includes(kwNorm) || metaTitleNorm.includes(kwNorm))
    addCheck(
      'kw_in_title',
      'Từ khóa trong Tiêu đề',
      kwInTitle,
      kwInTitle ? 'Từ khóa chính đã xuất hiện trong tiêu đề' : 'Từ khóa chính chưa có trong tiêu đề bài viết',
      'high'
    )

    // Check 3: Keyword in Meta Description
    const kwInMetaDesc = hasKw && metaDescNorm.includes(kwNorm)
    addCheck(
      'kw_in_meta_desc',
      'Từ khóa trong Thẻ mô tả (Meta Description)',
      kwInMetaDesc,
      kwInMetaDesc ? 'Từ khóa chính có trong Meta Description' : 'Nên chèn từ khóa chính vào thẻ mô tả Meta Description',
      'medium'
    )

    // Check 4: Keyword in First 100 Words
    const first100Words = words.slice(0, 100).join(' ')
    const first100Norm = removeAccents(first100Words)
    const kwInFirst100 = hasKw && first100Norm.includes(kwNorm)
    addCheck(
      'kw_in_first100',
      'Từ khóa ở 100 từ đầu tiên (Sapo)',
      kwInFirst100,
      kwInFirst100 ? 'Từ khóa có trong đoạn mở đầu bài viết' : 'Nên đưa từ khóa xuất hiện ở 100 từ đầu tiên của bài viết',
      'high'
    )

    // Check 5: Keyword in Headings (H2 / H3)
    let kwInHeadings = false
    if (hasKw && rawContent) {
      const headingMatches = rawContent.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi) || []
      const headingsText = headingMatches.map(h => removeAccents(stripHtml(h))).join(' ')
      kwInHeadings = headingsText.includes(kwNorm)
    }
    addCheck(
      'kw_in_headings',
      'Từ khóa trong các thẻ Heading (H2, H3)',
      kwInHeadings,
      kwInHeadings ? 'Đã chứa từ khóa trong tiêu đề con (H2/H3)' : 'Nên thêm thẻ H2 hoặc H3 chứa từ khóa chính',
      'medium'
    )

    // Check 6: Keyword Density (Ideal: 0.8% - 2.5%)
    const densityGood = hasKw && keywordDensity >= 0.8 && keywordDensity <= 2.5
    const densityWarning = hasKw && keywordDensity > 2.5
    addCheck(
      'kw_density',
      'Mật độ từ khóa (Keyword Density)',
      densityGood,
      hasKw 
        ? (densityGood 
            ? `Mật độ từ khóa đạt chuẩn (${keywordDensity}%)` 
            : (densityWarning ? `Mật độ quá cao (${keywordDensity}%), có thể bị coi là nhồi từ khóa` : `Mật độ từ khóa thấp (${keywordDensity}%), nên xuất hiện thêm`))
        : 'Cần có từ khóa chính để đo mật độ',
      'high'
    )

    // Check 7: Content Length
    const minWords = (contentType?.value || 'blog') === 'product' ? 200 : 500
    const lengthGood = wordCount >= minWords
    addCheck(
      'content_length',
      'Độ dài bài viết',
      lengthGood,
      lengthGood 
        ? `Độ dài bài viết tốt (${wordCount} từ)` 
        : `Bài viết khá ngắn (${wordCount} từ). Đề xuất tối thiểu ${minWords} từ`,
      'high'
    )

    // Check 8: Meta Description Length (Ideal: 120 - 160 chars)
    const metaDescLen = cleanMetaDesc.length
    const metaDescLenGood = metaDescLen >= 100 && metaDescLen <= 160
    addCheck(
      'meta_desc_length',
      'Độ dài thẻ Meta Description',
      metaDescLenGood,
      metaDescLenGood 
        ? `Độ dài thẻ mô tả chuẩn Google (${metaDescLen} ký tự)` 
        : `Thẻ mô tả hiện tại có ${metaDescLen} ký tự (Chuẩn Google: 120 - 160 ký tự)`,
      'low'
    )

    // Check 9: Image ALT Check
    let imagesCount = 0
    let imagesWithAlt = 0
    if (rawContent) {
      const imgTags = rawContent.match(/<img[^>]+>/gi) || []
      imagesCount = imgTags.length
      imagesWithAlt = imgTags.filter(img => /alt=["']([^"']+)["']/i.test(img)).length
    }
    const imgAltGood = imagesCount === 0 || imagesWithAlt === imagesCount
    addCheck(
      'img_alt',
      'Thẻ ALT của hình ảnh',
      imgAltGood,
      imagesCount === 0 
        ? 'Chưa có hình ảnh trong nội dung bài' 
        : (imgAltGood ? `Tất cả ${imagesCount} hình ảnh đều có thẻ ALT` : `Có ${imagesCount - imagesWithAlt}/${imagesCount} hình ảnh thiếu thẻ ALT`),
      'medium'
    )

    // 4. Calculate Final Score (0 - 100)
    const score = totalChecks > 0 ? Math.round((passedCount / totalChecks) * 100) : 0

    let scoreStatus = 'poor'
    let scoreColor = '#ef4444' // Red
    let scoreBadgeBg = 'bg-red-50 text-red-600 border-red-200'

    if (score >= 80) {
      scoreStatus = 'good'
      scoreColor = '#22c55e' // Green
      scoreBadgeBg = 'bg-emerald-50 text-emerald-600 border-emerald-200'
    } else if (score >= 50) {
      scoreStatus = 'ok'
      scoreColor = '#f59e0b' // Yellow
      scoreBadgeBg = 'bg-amber-50 text-amber-600 border-amber-200'
    }

    return {
      score,
      scoreStatus,
      scoreColor,
      scoreBadgeBg,
      wordCount,
      charCount,
      kwCount,
      keywordDensity,
      checks,
      passedCount,
      totalChecks
    }
  })

  return {
    analysis
  }
}
