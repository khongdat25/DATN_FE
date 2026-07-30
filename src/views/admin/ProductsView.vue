<template>
  
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-left">
          <h1 class="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Danh sách Sản phẩm</h1>
          <p class="text-sm text-slate-500 mt-1">Quản lý kho sản phẩm, thiết lập giá bán và kiểm soát biến thể kích cỡ chi tiết.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2.5">
          <input type="file" ref="excelFileInput" @change="onExcelFileSelected" class="hidden" accept=".xlsx, .xls, .csv">
          
          <button 
            @click="downloadExcelTemplate" 
            class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center gap-2 border-none cursor-pointer"
            title="Tải file Excel mẫu chuẩn"
          >
            <i class="ti ti-download text-base text-slate-500"></i> Tải file mẫu Excel
          </button>

          <button 
            @click="triggerExcelFileInput" 
            class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center gap-2 border-none cursor-pointer"
            title="Nhập danh sách sản phẩm hàng loạt từ file Excel"
          >
            <i class="ti ti-file-spreadsheet text-base"></i> Import từ Excel
          </button>

          <button @click="openAddModal" class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-none cursor-pointer">
            <i class="ti ti-plus text-base"></i> Thêm sản phẩm mới
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search -->
        <div class="relative w-full md:w-80 text-slate-400 focus-within:text-accent">
          <i class="ti ti-search absolute left-3.5 top-1/2 -translate-y-1/2 text-base"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tìm tên sản phẩm, mã..." 
            class="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none w-full focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all duration-300 placeholder:text-slate-400 text-slate-800"
          >
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <select v-model="filterCategory" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2.5 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="all">Tất cả danh mục</option>
            <option v-for="cat in categoriesList" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
          </select>

          <select v-model="filterBrand" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2.5 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="all">Tất cả thương hiệu</option>
            <option v-for="br in brandsList" :key="br.id" :value="br.name">{{ br.name }}</option>
          </select>

          <select v-model="filterStatus" class="bg-slate-50 border border-slate-200 text-slate-650 text-xs rounded-xl py-2.5 px-3 focus:outline-none cursor-pointer font-semibold text-slate-700">
            <option value="all">Mọi trạng thái</option>
            <option value="active">Đang bán (Active)</option>
            <option value="out_of_stock">Hết hàng (Out of stock)</option>
          </select>
        </div>
      </div>

      <!-- Product Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="py-4 px-6 w-10"></th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ẢNH / TÊN</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">THƯƠNG HIỆU</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">DANH MỤC</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHO BIẾN THỂ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">KHOẢNG GIÁ VÉ</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">NỔI BẬT</th>
                <th class="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRẠNG THÁI</th>
                <th class="py-4 px-6 w-24"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <template v-for="product in filteredProducts" :key="product.id">
                <!-- Main Product Row -->
                <tr 
                  @click="toggleRow(product.id)" 
                  class="hover:bg-slate-50/30 transition-all cursor-pointer font-medium"
                >
                  <td class="py-4 px-6 text-center text-slate-400">
                    <i 
                      :class="[
                        'ti ti-chevron-right text-base transition-transform duration-200 block',
                        expandedRows.includes(product.id) ? 'rotate-90' : ''
                      ]"
                    ></i>
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                        <img :src="product.image" alt="Pro" class="max-w-full max-h-full object-contain">
                      </div>
                      <div class="text-left">
                        <span class="block text-xs font-bold text-slate-900 hover:text-accent">{{ product.name }}</span>
                        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">SKU: {{ product.sku }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 text-xs text-slate-700 text-left">{{ product.brand }}</td>
                  <td class="py-4 px-6 text-xs text-slate-700 text-left">{{ product.category }}</td>
                  <td class="py-4 px-6 text-xs text-left">
                    <span class="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {{ product.variants.length }} Biến thể (Tổng {{ getTotalStock(product) }} đôi)
                    </span>
                  </td>
                  <td class="py-4 px-6 text-xs font-bold text-slate-900 text-left">
                    {{ getPriceRange(product) }}
                  </td>
                  <td class="py-4 px-6 text-left" @click.stop>
                    <button 
                      @click="toggleFeatured(product)"
                      :class="[
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all border-none shadow-2xs',
                        product.is_featured 
                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60' 
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      ]"
                      :title="product.is_featured ? 'Bỏ nổi bật' : 'Đánh dấu nổi bật'"
                    >
                      <i :class="['ti text-xs', product.is_featured ? 'ti-star-filled text-amber-500 animate-bounce-short' : 'ti-star']"></i>
                      {{ product.is_featured ? 'Nổi bật' : 'Thường' }}
                    </button>
                  </td>
                  <td class="py-4 px-6 text-left">
                    <span 
                      v-if="getTotalStock(product) > 0"
                      class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                    >
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Đang bán
                    </span>
                    <span 
                      v-else
                      class="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                    >
                      <span class="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Hết hàng
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right" @click.stop>
                    <div class="flex items-center gap-2 justify-end">
                      <button 
                        @click="openEditModal(product)" 
                        class="whitespace-nowrap px-3 py-1.5 bg-orange-50 hover:bg-accent hover:text-white text-accent rounded-lg border border-orange-100 transition-all text-[11px] font-bold cursor-pointer shadow-2xs"
                      >
                        Chỉnh sửa
                      </button>
                      <button 
                        @click="deleteProduct(product.id)" 
                        class="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center border-none transition-all cursor-pointer"
                      >
                        <i class="ti ti-trash text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- Expanded Variants Row -->
                <tr v-if="expandedRows.includes(product.id)" class="bg-slate-50/60 transition-all">
                  <td colspan="9" class="p-6 border-b border-slate-100">
                    <div class="pl-10 space-y-3">
                      <div class="text-[10px] font-bold tracking-[1.5px] text-slate-400 uppercase flex items-center gap-1.5 text-left">
                        <i class="ti ti-list-details"></i> Chi tiết các biến thể kích thước (Variants details)
                      </div>
                      <div class="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs max-w-3xl">
                        <table class="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr class="bg-slate-100/80 text-slate-550 font-bold border-b border-slate-100 text-slate-500">
                              <th class="p-3">SIZE / KÍCH CỠ</th>
                              <th class="p-3">MÀU SẮC</th>
                              <th class="p-3">TỒN KHO</th>
                              <th class="p-3">GIÁ BÁN GỐC</th>
                              <th class="p-3 text-accent font-bold"><i class="ti ti-flame animate-pulse"></i> GIÁ FLASH SALE (20%)</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100 font-medium">
                            <tr v-for="(v, index) in product.variants" :key="index">
                              <td class="p-3 font-semibold text-slate-800">Size {{ v.size }}</td>
                              <td class="p-3 text-slate-500">{{ v.color }}</td>
                              <td class="p-3 font-bold">
                                <span v-if="v.stock > 0" class="text-slate-800">{{ v.stock }} đôi</span>
                                <span v-else class="text-red-500 font-bold">0 đôi (Đã hết)</span>
                              </td>
                              <td class="p-3 text-slate-400 line-through">{{ formatCurrency(v.price) }}</td>
                              <td class="p-3 text-accent font-bold">{{ formatCurrency(v.price * 0.8) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>

              <tr v-if="filteredProducts.length === 0">
                <td colspan="9" class="text-center py-12 text-slate-400 text-sm">
                  Không tìm thấy sản phẩm nào phù hợp bộ lọc.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Pagination -->
        <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">Hiển thị 1 - {{ filteredProducts.length }} của {{ filteredProducts.length }} sản phẩm</span>
          <div class="flex items-center gap-1.5">
            <button class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" disabled>
              <i class="ti ti-chevron-left text-sm"></i>
            </button>
            <button class="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center text-xs font-bold border-none cursor-pointer">1</button>
            <button class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" disabled>
              <i class="ti ti-chevron-right text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div 
      v-if="modalOpen" 
      class="fixed inset-0 z-500 flex items-center justify-center p-4 animate-fade-in-quick"
    >
      <!-- Modal Backdrop -->
      <div 
        @click="closeModal" 
        class="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      <!-- Modal Content Container -->
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden z-10 transition-all scale-100 text-left">
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="font-display text-lg font-bold text-slate-950">{{ isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}</h3>
            <p class="text-xs text-slate-400 mt-0.5">Nhập các thông tin cơ bản và thiết lập các biến thể kích cỡ.</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer border-none bg-transparent">
            <i class="ti ti-x text-lg"></i>
          </button>
        </div>

        <!-- Modal Scrollable Body -->
        <form @submit.prevent="saveProduct" class="flex-1 overflow-y-auto p-6 space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tên sản phẩm *</label>
            <input 
              type="text" 
              v-model="formProduct.name" 
              placeholder="Ví dụ: StepUp Air Force 1" 
              required 
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all placeholder:text-slate-400 text-slate-800 font-semibold"
            >
          </div>

          <!-- SKU (Only in edit mode, read-only) -->
          <div v-if="isEditMode">
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mã sản phẩm (SKU)</label>
            <input 
              type="text" 
              v-model="formProduct.sku" 
              readonly
              class="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-xs outline-none uppercase font-mono text-slate-500 font-bold"
            >
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mô tả sản phẩm</label>
            <textarea 
              v-model="formProduct.description" 
              placeholder="Nhập mô tả chi tiết sản phẩm..." 
              rows="3"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all placeholder:text-slate-400 text-slate-800 font-semibold resize-none"
            ></textarea>
          </div>

          <!-- Product Images Upload -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ảnh sản phẩm (Images)</label>
            <div class="flex flex-wrap gap-3 mb-3">
              <!-- Uploaded Previews -->
              <div 
                v-for="(img, idx) in formProduct.images" 
                :key="idx" 
                class="relative w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl p-1.5 flex items-center justify-center group"
              >
                <img :src="getImageUrl(img)" class="max-w-full max-h-full object-contain">
                <button 
                  type="button" 
                  @click="removeFormImage(idx)"
                  class="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border-none cursor-pointer"
                >
                  <i class="ti ti-x text-[10px]"></i>
                </button>
              </div>
              
              <!-- File Input Trigger -->
              <label 
                v-if="!isUploading"
                class="w-20 h-20 border-2 border-dashed border-slate-200 hover:border-accent rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors bg-slate-50/50 hover:bg-white"
              >
                <i class="ti ti-camera text-slate-400 text-lg"></i>
                <span class="text-[9px] text-slate-400 font-bold">Thêm ảnh</span>
                <input type="file" @change="onImageUpload" multiple class="hidden" accept="image/*">
              </label>
              
              <!-- Uploading Spinner -->
              <div 
                v-else 
                class="w-20 h-20 border border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50"
              >
                <i class="ti ti-loader animate-spin text-accent text-lg"></i>
                <span class="text-[9px] text-slate-400 font-bold mt-1">Đang tải...</span>
              </div>
            </div>
          </div>

          <!-- Category & Brand -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Danh mục *</label>
              <select 
                v-model="formProduct.category_id" 
                required 
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all cursor-pointer text-slate-700 font-semibold"
              >
                <option value="">Chọn danh mục</option>
                <option v-for="cat in categoriesList" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Thương hiệu *</label>
              <select 
                v-model="formProduct.brand_id" 
                required 
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,77,0,0.08)] transition-all cursor-pointer text-slate-700 font-semibold"
              >
                <option value="">Chọn thương hiệu</option>
                <option v-for="br in brandsList" :key="br.id" :value="br.id">{{ br.name }}</option>
              </select>
            </div>
          </div>

          <!-- Featured Checkbox -->
          <div class="flex items-center gap-2 p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl">
            <input 
              type="checkbox" 
              id="is_featured_checkbox"
              v-model="formProduct.is_featured" 
              class="w-4 h-4 text-accent border-slate-300 rounded focus:ring-accent cursor-pointer"
            >
            <label for="is_featured_checkbox" class="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5 select-none">
              <i class="ti ti-star-filled text-amber-500"></i> Đặt làm sản phẩm nổi bật (Hiển thị ở trang chủ FE)
            </label>
          </div>

          <div class="h-px bg-slate-100"></div>

          <!-- Variants Configuration Section -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider"><i class="ti ti-list-numbers"></i> Cấu hình các biến thể (Variants) *</label>
              <button 
                type="button" 
                @click="openAddVariantModal" 
                class="bg-orange-50 hover:bg-accent hover:text-white text-accent text-xs font-bold py-1.5 px-3 rounded-xl border border-orange-100 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <i class="ti ti-plus text-xs font-bold"></i> Thêm biến thể mới
              </button>
            </div>
            
            <!-- Variants Table / List -->
            <div class="border border-slate-100 rounded-2xl overflow-hidden shadow-2xs bg-white">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100/70 text-slate-500 font-bold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                    <th class="p-3">SIZE</th>
                    <th class="p-3">MÀU SẮC</th>
                    <th class="p-3">TỒN KHO</th>
                    <th class="p-3">GIÁ BÁN</th>
                    <th class="p-3 text-right">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  <tr v-for="(v, index) in formProduct.variants" :key="index" class="hover:bg-slate-50/50">
                    <td class="p-3 font-bold text-slate-800">
                      Size {{ getVariantSizeNameById(v.size_id) }}
                    </td>
                    <td class="p-3 text-slate-600">
                      {{ getVariantColorNameById(v.color_id) }}
                    </td>
                    <td class="p-3 font-semibold">
                      <span :class="v.stock > 0 ? 'text-slate-800' : 'text-red-500 font-bold'">{{ v.stock }} đôi</span>
                    </td>
                    <td class="p-3 font-bold text-slate-900">
                      {{ formatCurrency(v.price) }}
                    </td>
                    <td class="p-3 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button 
                          type="button" 
                          @click="openEditVariantModal(index)"
                          class="w-7 h-7 bg-orange-50 text-accent hover:bg-accent hover:text-white rounded-lg flex items-center justify-center border border-orange-100 transition-colors cursor-pointer shadow-2xs"
                          title="Chỉnh sửa biến thể"
                        >
                          <i class="ti ti-pencil text-xs"></i>
                        </button>
                        <button 
                          type="button" 
                          @click="removeVariantRow(index)" 
                          :disabled="formProduct.variants.length <= 1"
                          class="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer border-none disabled:opacity-40"
                          title="Xóa biến thể"
                        >
                          <i class="ti ti-trash text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!formProduct.variants || formProduct.variants.length === 0">
                    <td colspan="5" class="p-4 text-center text-slate-400">
                      Chưa có biến thể nào. Bấm "+ Thêm biến thể mới" để tạo.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Footer buttons -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button 
              type="button" 
              @click="closeModal" 
              class="bg-white border border-slate-200 hover:border-slate-300 text-slate-650 text-xs font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer text-slate-600"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md transition-all border-none cursor-pointer"
            >
              Lưu sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add/Edit Variant Sub-Modal (Popup) -->
    <div 
      v-if="variantModalOpen" 
      class="fixed inset-0 z-[600] flex items-center justify-center p-4 animate-fade-in-quick"
    >
      <!-- Sub-modal Backdrop -->
      <div 
        @click="closeVariantModal" 
        class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      <!-- Sub-modal Container -->
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-sm p-6 z-10 text-left space-y-4 relative animate-fade-in-quick">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-orange-50 text-accent flex items-center justify-center font-bold">
              <i class="ti ti-adjustments-horizontal text-base"></i>
            </div>
            <div>
              <h3 class="font-display text-sm font-bold text-slate-900">
                {{ isVariantEditMode ? 'Chỉnh sửa biến thể' : 'Thêm biến thể mới' }}
              </h3>
              <p class="text-[10px] text-slate-400">Điền kích cỡ, màu sắc và số lượng kho.</p>
            </div>
          </div>
          <button @click="closeVariantModal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 border-none bg-transparent cursor-pointer">
            <i class="ti ti-x text-base"></i>
          </button>
        </div>

        <!-- Body Form -->
        <form @submit.prevent="saveVariantFromModal" class="space-y-4">
          <!-- Size selection -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">KÍCH CỠ (SIZE) *</label>
            <select 
              v-model="formVariant.size_id" 
              required 
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-800 font-semibold cursor-pointer"
            >
              <option value="">Chọn Size</option>
              <option v-for="sz in sizesList" :key="sz.id" :value="sz.id">Size {{ sz.name }}</option>
            </select>
          </div>

          <!-- Color selection -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">MÀU SẮC *</label>
            <select 
              v-model="formVariant.color_id" 
              required 
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-800 font-semibold cursor-pointer"
            >
              <option value="">Chọn Màu</option>
              <option v-for="cl in colorsList" :key="cl.id" :value="cl.id">{{ cl.name }}</option>
            </select>
          </div>

          <!-- Stock & Price -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">TỒN KHO *</label>
              <input 
                type="number" 
                v-model="formVariant.stock" 
                placeholder="10" 
                min="0"
                required 
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-800 font-semibold"
              >
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">GIÁ BÁN (VND) *</label>
              <input 
                type="number" 
                v-model="formVariant.price" 
                placeholder="1000000" 
                min="0"
                required 
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-accent transition-all text-slate-800 font-semibold"
              >
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button 
              type="button" 
              @click="closeVariantModal" 
              class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl transition-all border-none cursor-pointer"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shadow-md transition-all border-none cursor-pointer"
            >
              {{ isVariantEditMode ? 'Lưu cập nhật' : 'Xác nhận thêm' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Excel Import Preview Modal -->
    <div 
      v-if="excelModalOpen" 
      class="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-6 animate-fade-in-quick"
    >
      <div 
        @click="closeExcelModal" 
        class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
      ></div>
      
      <div class="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden z-10 text-left">
        <!-- Header -->
        <div class="px-7 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-emerald-50/30">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/25 shrink-0">
              <i class="ti ti-file-spreadsheet"></i>
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h3 class="font-display text-lg font-extrabold text-slate-900 tracking-tight">Xem trước danh sách sản phẩm</h3>
                <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">File Excel / CSV</span>
              </div>
              <p class="text-xs text-slate-500 font-medium mt-0.5">Kiểm tra thông tin chi tiết từng dòng dữ liệu trước khi thêm hàng loạt vào hệ thống.</p>
            </div>
          </div>
          <button @click="closeExcelModal" class="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-all border-none bg-transparent cursor-pointer">
            <i class="ti ti-x text-xl"></i>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto p-7 space-y-6 bg-slate-50/40">
          <!-- Summary KPI Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Card 1 -->
            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-base shrink-0">
                <i class="ti ti-file-text"></i>
              </div>
              <div>
                <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">TỔNG SỐ DÒNG DỮ LIỆU</div>
                <div class="text-xl font-extrabold text-slate-900 font-display mt-0.5">{{ parsedExcelProducts.length }} <span class="text-xs font-semibold text-slate-500">sản phẩm</span></div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200/60 shadow-2xs flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
                <i class="ti ti-circle-check"></i>
              </div>
              <div>
                <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-700">HỢP LỆ ĐỂ NHẬP KHO</div>
                <div class="text-xl font-extrabold text-emerald-800 font-display mt-0.5">{{ validExcelCount }} <span class="text-xs font-semibold text-emerald-600">sản phẩm</span></div>
              </div>
            </div>

            <!-- Card 3 -->
            <div :class="['p-4 rounded-2xl border shadow-2xs flex items-center gap-3.5', invalidExcelCount > 0 ? 'bg-rose-50/80 border-rose-200/60' : 'bg-slate-50/80 border-slate-200/60']">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 shadow-sm', invalidExcelCount > 0 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500']">
                <i :class="['ti', invalidExcelCount > 0 ? 'ti-alert-triangle' : 'ti-circle-check']"></i>
              </div>
              <div>
                <div :class="['text-[11px] font-bold uppercase tracking-wider', invalidExcelCount > 0 ? 'text-rose-700' : 'text-slate-500']">CẢNH BÁO / LỖI DÒNG</div>
                <div :class="['text-xl font-extrabold font-display mt-0.5', invalidExcelCount > 0 ? 'text-rose-800' : 'text-slate-700']">{{ invalidExcelCount }} <span class="text-xs font-semibold">dòng</span></div>
              </div>
            </div>
          </div>

          <!-- Preview Table -->
          <div class="border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs bg-white">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100/90 text-slate-500 font-extrabold border-b border-slate-200/80 text-[10px] uppercase tracking-wider">
                    <th class="p-3.5 w-12 text-center">STT</th>
                    <th class="p-3.5 min-w-[200px]">TÊN SẢN PHẨM & MÔ TẢ</th>
                    <th class="p-3.5">DANH MỤC</th>
                    <th class="p-3.5">THƯƠNG HIỆU</th>
                    <th class="p-3.5 min-w-[280px]">CẤU HÌNH BIẾN THỂ (SIZE • MÀU • KHO • GIÁ)</th>
                    <th class="p-3.5 text-center">NỔI BẬT</th>
                    <th class="p-3.5 text-center">TRẠNG THÁI</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  <tr 
                    v-for="(p, index) in parsedExcelProducts" 
                    :key="index"
                    :class="[p.isValid ? 'hover:bg-slate-50/80 transition-colors' : 'bg-rose-50/40 hover:bg-rose-50/70 transition-colors']"
                  >
                    <!-- STT -->
                    <td class="p-3.5 text-center">
                      <div class="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 font-extrabold text-xs flex items-center justify-center mx-auto">
                        {{ index + 1 }}
                      </div>
                    </td>

                    <!-- Tên SP -->
                    <td class="p-3.5">
                      <div class="font-bold text-slate-900 text-xs">{{ p.name }}</div>
                      <p v-if="p.description" class="text-[11px] text-slate-400 font-normal truncate max-w-xs mt-0.5">{{ p.description }}</p>
                    </td>

                    <!-- Danh mục -->
                    <td class="p-3.5">
                      <span class="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200/80 px-2.5 py-1 rounded-lg font-bold text-[11px]">
                        <i class="ti ti-category text-slate-400"></i> {{ p.category_name }}
                      </span>
                    </td>

                    <!-- Thương hiệu -->
                    <td class="p-3.5">
                      <span class="inline-flex items-center gap-1 bg-indigo-50/80 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-lg font-extrabold text-[11px]">
                        <i class="ti ti-tag text-indigo-400"></i> {{ p.brand_name }}
                      </span>
                    </td>

                    <!-- Biến thể Cards -->
                    <td class="p-3.5">
                      <div class="space-y-1.5">
                        <div 
                          v-for="(v, vIdx) in p.variants" 
                          :key="vIdx" 
                          class="p-2 bg-slate-50/90 border border-slate-200/60 rounded-xl flex items-center justify-between text-[11px] gap-2 hover:bg-white transition-all shadow-3xs"
                        >
                          <div class="flex items-center gap-1.5">
                            <span class="bg-slate-900 text-white px-2 py-0.5 rounded-md text-[10px] font-extrabold">Size {{ v.size_name }}</span>
                            <span class="bg-slate-200/70 text-slate-700 font-semibold px-2 py-0.5 rounded-md text-[10px]">{{ v.color_name }}</span>
                          </div>
                          <div class="flex items-center gap-3">
                            <span class="text-slate-500 font-semibold text-[10px]"><strong class="text-slate-800 font-extrabold">{{ v.stock }}</strong> đôi</span>
                            <span class="font-extrabold text-accent text-xs">{{ formatCurrency(v.price) }}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Nổi bật -->
                    <td class="p-3.5 text-center">
                      <span v-if="p.is_featured" class="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200/80 px-2 py-1 rounded-lg font-extrabold text-[10px]">
                        <i class="ti ti-star-filled text-amber-500 text-xs"></i> Có
                      </span>
                      <span v-else class="text-slate-300 text-xs font-semibold">-</span>
                    </td>

                    <!-- Trạng thái -->
                    <td class="p-3.5 text-center">
                      <span v-if="p.isValid" class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-extrabold px-3 py-1.2 rounded-full whitespace-nowrap shadow-3xs">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Hợp lệ
                      </span>
                      <span v-else class="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200/80 text-[10px] font-extrabold px-3 py-1.2 rounded-full whitespace-nowrap shadow-3xs" :title="p.errorMsg">
                        <i class="ti ti-alert-triangle text-xs"></i> {{ p.errorMsg || 'Lỗi dữ liệu' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-7 py-4 border-t border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <button 
            type="button" 
            @click="triggerExcelFileInput" 
            class="text-xs text-slate-600 hover:text-accent font-bold flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all border-none"
          >
            <i class="ti ti-file-upload text-sm"></i> Chọn file Excel khác
          </button>
          <div class="flex items-center gap-3">
            <button 
              type="button" 
              @click="closeExcelModal" 
              class="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-3xs"
            >
              Hủy bỏ
            </button>
            <button 
              type="button" 
              @click="submitExcelImport"
              :disabled="validExcelCount === 0 || isImportingExcel"
              class="px-7 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-emerald-600/25 transition-all border-none cursor-pointer disabled:opacity-40 flex items-center gap-2"
            >
              <i v-if="isImportingExcel" class="ti ti-loader animate-spin text-base"></i>
              <i v-else class="ti ti-check text-base"></i>
              {{ isImportingExcel ? 'Đang nhập kho...' : `Xác nhận nhập ${validExcelCount} sản phẩm` }}
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axiosInstance from '@/api/axios.js'

const searchQuery = ref('')
const filterCategory = ref('all')
const filterBrand = ref('all')
const filterStatus = ref('all')

const expandedRows = ref([])
const modalOpen = ref(false)
const isEditMode = ref(false)
const editingProductId = ref(null)

const products = ref([])
const categoriesList = ref([])
const brandsList = ref([])

const colorsList = ref([])
const sizesList = ref([])

function sortSizes(list) {
  if (!Array.isArray(list)) return []
  return [...list].sort((a, b) => {
    const na = parseFloat(a.name)
    const nb = parseFloat(b.name)
    if (!isNaN(na) && !isNaN(nb)) return na - nb
    return String(a.name).localeCompare(String(b.name), undefined, { numeric: true })
  })
}

function sortVariants(variants) {
  if (!Array.isArray(variants)) return []
  return [...variants].sort((a, b) => {
    const sizeA = String(a.size?.name || a.size || a.size_id || '')
    const sizeB = String(b.size?.name || b.size || b.size_id || '')

    const na = parseFloat(sizeA.replace(/[^0-9.]/g, ''))
    const nb = parseFloat(sizeB.replace(/[^0-9.]/g, ''))

    if (!isNaN(na) && !isNaN(nb) && na !== nb) {
      return na - nb
    }
    const sizeCompare = sizeA.localeCompare(sizeB, undefined, { numeric: true })
    if (sizeCompare !== 0) return sizeCompare

    const colorA = String(a.color?.name || a.color || a.color_id || '')
    const colorB = String(b.color?.name || b.color || b.color_id || '')
    return colorA.localeCompare(colorB, undefined, { numeric: true })
  })
}

async function loadSizesAndColors() {
  try {
    const [sizeRes, colorRes] = await Promise.all([
      axiosInstance.get('/size'),
      axiosInstance.get('/color')
    ])

    if (sizeRes && sizeRes.success && Array.isArray(sizeRes.data)) {
      const activeSizes = sizeRes.data
        .filter(s => String(s.status) === '1' || s.status === 'active' || s.status === true)
        .map(s => ({ id: s.id, name: String(s.name) }))

      if (activeSizes.length > 0) {
        sizesList.value = sortSizes(activeSizes)
      }
    }

    if (colorRes && colorRes.success && Array.isArray(colorRes.data)) {
      const activeColors = colorRes.data
        .filter(c => String(c.status) === '1' || c.status === 'active' || c.status === true)
        .map(c => ({ id: c.id, name: String(c.name) }))

      if (activeColors.length > 0) {
        colorsList.value = activeColors
      }
    }
  } catch (error) {
    console.error('Error fetching sizes and colors from API:', error)
  }

  // Fallback if API returned empty or failed
  if (!sizesList.value || sizesList.value.length === 0) {
    const localSizes = localStorage.getItem('admin_sizes')
    if (localSizes) {
      try {
        sizesList.value = sortSizes(JSON.parse(localSizes).filter(s => s.status === 'active'))
      } catch (e) {}
    }
    if (!sizesList.value || sizesList.value.length === 0) {
      sizesList.value = sortSizes([
        { id: 39, name: '39' },
        { id: 40, name: '40' },
        { id: 41, name: '41' },
        { id: 42, name: '42' },
        { id: 43, name: '43' }
      ])
    }
  }

  if (!colorsList.value || colorsList.value.length === 0) {
    const localColors = localStorage.getItem('admin_colors')
    if (localColors) {
      try {
        colorsList.value = JSON.parse(localColors).filter(c => c.status === 'active')
      } catch (e) {}
    }
    if (!colorsList.value || colorsList.value.length === 0) {
      colorsList.value = [
        { id: 1, name: 'Trắng' },
        { id: 2, name: 'Đen' },
        { id: 3, name: 'Xám' },
        { id: 4, name: 'Xanh dương' }
      ]
    }
  }
}

const formProduct = ref({
  name: '',
  category_id: '',
  brand_id: '',
  description: '',
  images: [],
  is_featured: false,
  variants: [
    { size_id: 40, color_id: 1, stock: 10, price: 1000000 }
  ]
})

const isUploading = ref(false)

function getImageUrl(imagePath) {
  if (!imagePath) return '/images/p1.png'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath
  }
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  const serverUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (imagePath.startsWith('images/')) {
    return `${serverUrl}/${imagePath}`
  }
  return `${serverUrl}/images/${imagePath}`
}

async function fetchProducts() {
  try {
    const response = await axiosInstance.get('/adminproduct')
    if (response && response.success) {
      products.value = response.data.map(p => {
        let img = '/images/p1.png'
        if (p.images && p.images.length > 0) {
          const firstImg = p.images[0];
          img = getImageUrl(typeof firstImg === 'string' ? firstImg : (firstImg?.image || ''));
        } else if (p.variants && p.variants.length > 0 && p.variants[0].image) {
          img = getImageUrl(p.variants[0].image)
        }
        
        const mappedVariants = (p.variants || []).map(v => ({
          id: v.id,
          size: v.size ? v.size.name : v.size_id,
          size_id: v.size_id,
          color: v.color ? v.color.name : v.color_id,
          color_id: v.color_id,
          stock: v.stock || 0,
          price: v.price || 0,
          sku: v.sku || ''
        }))

        return {
          id: p.id,
          name: p.name,
          sku: p.variants && p.variants.length > 0 ? p.variants[0].sku : 'N/A',
          brand: p.brand ? p.brand.name : 'N/A',
          brand_id: p.brand_id,
          category: p.category ? p.category.name : 'N/A',
          category_id: p.category_id,
          description: p.description || '',
          is_featured: !!p.is_featured,
          image: img,
          images: p.images || [],
          variants: sortVariants(mappedVariants)
        }
      })
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

async function loadFilterOptions() {
  try {
    const [catRes, brandRes] = await Promise.all([
      axiosInstance.get('/getcategories'),
      axiosInstance.get('/getbrands')
    ])
    if (catRes && catRes.success) {
      categoriesList.value = catRes.data
    }
    if (brandRes && brandRes.success) {
      brandsList.value = brandRes.data
    }
  } catch (error) {
    console.error('Error loading filter options:', error)
  }
}

onMounted(() => {
  fetchProducts()
  loadFilterOptions()
  loadSizesAndColors()
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = filterCategory.value === 'all' || p.category === filterCategory.value
    const matchesBrand = filterBrand.value === 'all' || p.brand === filterBrand.value
    
    const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0)
    let matchesStatus = true
    if (filterStatus.value === 'active') {
      matchesStatus = totalStock > 0
    } else if (filterStatus.value === 'out_of_stock') {
      matchesStatus = totalStock === 0
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus
  })
})

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

function toggleRow(id) {
  const index = expandedRows.value.indexOf(id)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(id)
  }
}

function getTotalStock(product) {
  return product.variants.reduce((sum, v) => sum + v.stock, 0)
}

function getPriceRange(product) {
  if (!product.variants || product.variants.length === 0) return '0đ'
  const prices = product.variants.map(v => v.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  if (min === max) return formatCurrency(min)
  return `${formatCurrency(min)} - ${formatCurrency(max)}`
}

// Variant Sub-Modal States & Methods
const variantModalOpen = ref(false)
const isVariantEditMode = ref(false)
const editingVariantIndex = ref(null)

const formVariant = ref({
  id: null,
  size_id: '',
  color_id: '',
  stock: 10,
  price: 1000000
})

function getVariantSizeNameById(sizeId) {
  const sz = sizesList.value.find(s => Number(s.id) === Number(sizeId))
  return sz ? sz.name : sizeId
}

function getVariantColorNameById(colorId) {
  const cl = colorsList.value.find(c => Number(c.id) === Number(colorId))
  return cl ? cl.name : colorId
}

function openAddVariantModal() {
  isVariantEditMode.value = false
  editingVariantIndex.value = null
  const defaultSizeId = sizesList.value[0]?.id || ''
  const defaultColorId = colorsList.value[0]?.id || ''
  const defaultPrice = formProduct.value.variants[0]?.price || 1000000

  formVariant.value = {
    id: null,
    size_id: defaultSizeId,
    color_id: defaultColorId,
    stock: 10,
    price: defaultPrice
  }
  variantModalOpen.value = true
}

function openEditVariantModal(index) {
  isVariantEditMode.value = true
  editingVariantIndex.value = index
  const target = formProduct.value.variants[index]
  formVariant.value = {
    id: target.id || null,
    size_id: target.size_id,
    color_id: target.color_id,
    stock: target.stock,
    price: target.price
  }
  variantModalOpen.value = true
}

function closeVariantModal() {
  variantModalOpen.value = false
}

function saveVariantFromModal() {
  if (!formVariant.value.size_id || !formVariant.value.color_id) {
    Swal.fire({
      icon: 'warning',
      title: 'Thiếu thông tin',
      text: 'Vui lòng chọn đầy đủ Kích cỡ và Màu sắc!',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  const isDuplicate = formProduct.value.variants.some((v, idx) => {
    if (isVariantEditMode.value && idx === editingVariantIndex.value) return false
    return Number(v.size_id) === Number(formVariant.value.size_id) && Number(v.color_id) === Number(formVariant.value.color_id)
  })

  if (isDuplicate) {
    const sizeName = getVariantSizeNameById(formVariant.value.size_id)
    const colorName = getVariantColorNameById(formVariant.value.color_id)
    Swal.fire({
      icon: 'error',
      title: 'Biến thể đã tồn tại',
      text: `Biến thể với Size ${sizeName} và Màu ${colorName} đã có trong danh sách!`,
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  const variantObj = {
    id: formVariant.value.id || null,
    size_id: Number(formVariant.value.size_id),
    size: getVariantSizeNameById(formVariant.value.size_id),
    color_id: Number(formVariant.value.color_id),
    color: getVariantColorNameById(formVariant.value.color_id),
    stock: Number(formVariant.value.stock),
    price: Number(formVariant.value.price)
  }

  if (isVariantEditMode.value && editingVariantIndex.value !== null) {
    formProduct.value.variants[editingVariantIndex.value] = variantObj
  } else {
    formProduct.value.variants.push(variantObj)
  }

  formProduct.value.variants = sortVariants(formProduct.value.variants)
  variantModalOpen.value = false
}

function removeVariantRow(index) {
  if (formProduct.value.variants.length <= 1) return;

  const variant = formProduct.value.variants[index];
  const isExisting = !!variant.id;

  Swal.fire({
    title: isExisting ? 'Xác nhận xóa biến thể?' : 'Xóa dòng biến thể?',
    text: isExisting
      ? 'Biến thể này đã tồn tại trên hệ thống. Khi lưu sản phẩm, biến thể sẽ bị xóa vĩnh viễn khỏi cơ sở dữ liệu!'
      : 'Bạn có chắc chắn muốn loại bỏ dòng biến thể này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý!',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      formProduct.value.variants.splice(index, 1);
    }
  });
}

async function openAddModal() {
  await loadSizesAndColors()
  isEditMode.value = false
  editingProductId.value = null
  const defaultSizeId = sizesList.value[0]?.id || 39
  const defaultColorId = colorsList.value[0]?.id || 1

  formProduct.value = {
    name: '',
    category_id: '',
    brand_id: '',
    description: '',
    images: [],
    is_featured: false,
    variants: [
      { size_id: defaultSizeId, color_id: defaultColorId, stock: 10, price: 1000000 }
    ]
  }
  modalOpen.value = true
}

async function openEditModal(product) {
  await loadSizesAndColors()
  isEditMode.value = true
  editingProductId.value = product.id
  formProduct.value = JSON.parse(JSON.stringify(product)) // Deep clone
  formProduct.value.is_featured = !!product.is_featured
  if (!formProduct.value.images) {
    formProduct.value.images = []
  }
  if (formProduct.value.variants) {
    formProduct.value.variants = sortVariants(formProduct.value.variants)
  }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

async function onImageUpload(event) {
  const files = event.target.files
  if (!files || files.length === 0) return
  
  isUploading.value = true
  try {
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      formData.append('image', files[i])
      
      const response = await axiosInstance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response && response.success) {
        if (!formProduct.value.images) {
          formProduct.value.images = []
        }
        formProduct.value.images.push(response.filename)
      }
    }
    Swal.fire({
      icon: 'success',
      title: 'Tải ảnh thành công!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })
  } catch (err) {
    console.error('Failed to upload image:', err)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi tải ảnh',
      text: 'Có lỗi xảy ra khi tải ảnh lên server.',
      confirmButtonColor: '#FF4D00'
    })
  } finally {
    isUploading.value = false
  }
}

function removeFormImage(index) {
  if (formProduct.value.images) {
    formProduct.value.images.splice(index, 1)
  }
}

async function saveProduct() {
  // Kiểm tra trùng lặp size và color trong danh sách biến thể
  const seen = new Set();
  for (const v of formProduct.value.variants) {
    if (!v.size_id || !v.color_id) continue;
    const key = `${v.size_id}-${v.color_id}`;
    if (seen.has(key)) {
      const sizeObj = sizesList.value.find(s => Number(s.id) === Number(v.size_id));
      const colorObj = colorsList.value.find(c => Number(c.id) === Number(v.color_id));
      const sizeName = sizeObj ? sizeObj.name : v.size_id;
      const colorName = colorObj ? colorObj.name : v.color_id;

      Swal.fire({
        icon: 'error',
        title: 'Trùng lặp biến thể!',
        text: `Biến thể với Size ${sizeName} và Màu ${colorName} đã tồn tại trong danh sách. Vui lòng loại bỏ hoặc điều chỉnh lại!`,
        confirmButtonColor: '#FF4D00'
      });
      return;
    }
    seen.add(key);
  }

  try {
    const payload = {
      name: formProduct.value.name,
      category_id: formProduct.value.category_id,
      brand_id: formProduct.value.brand_id,
      description: formProduct.value.description || '',
      images: formProduct.value.images || [],
      is_featured: formProduct.value.is_featured ? 1 : 0,
      variants: formProduct.value.variants.map(v => ({
        id: v.id || null,
        size_id: v.size_id,
        color_id: v.color_id,
        stock: v.stock,
        price: v.price
      }))
    }

    if (isEditMode.value) {
      const response = await axiosInstance.post(`/product_edit/${editingProductId.value}`, payload)
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Đã cập nhật sản phẩm!',
          text: 'Thông tin chỉnh sửa đã được cập nhật thành công.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchProducts()
        modalOpen.value = false
      }
    } else {
      const response = await axiosInstance.post('/product_add', payload)
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Đã thêm sản phẩm!',
          text: 'Sản phẩm mới đã được lưu thành công vào kho.',
          confirmButtonColor: '#FF4D00'
        })
        await fetchProducts()
        modalOpen.value = false
      }
    }
  } catch (error) {
    console.error('Error saving product:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lưu thất bại!',
      text: error.response?.data?.message || 'Đã xảy ra lỗi khi lưu sản phẩm.',
      confirmButtonColor: '#FF4D00'
    })
  }
}

async function toggleFeatured(product) {
  const oldStatus = product.is_featured
  product.is_featured = !oldStatus
  try {
    const response = await axiosInstance.patch(`/product/toggle-featured/${product.id}`)
    if (response && response.success) {
      Swal.fire({
        icon: 'success',
        title: response.is_featured ? 'Đã đánh dấu sản phẩm Nổi bật!' : 'Đã bỏ trạng thái Nổi bật!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      product.is_featured = oldStatus
    }
  } catch (error) {
    product.is_featured = oldStatus
    console.error('Error toggling featured product:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi cập nhật',
      text: 'Không thể cập nhật trạng thái nổi bật của sản phẩm!',
      confirmButtonColor: '#FF4D00'
    })
  }
}

async function deleteProduct(id) {
  Swal.fire({
    title: 'Xác nhận xóa sản phẩm?',
    text: 'Hành động này sẽ xóa vĩnh viễn sản phẩm khỏi kho hàng!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF4D00',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Đồng ý xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/product/${id}`)
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Đã xóa!',
            text: 'Sản phẩm đã bị loại bỏ khỏi danh sách.',
            confirmButtonColor: '#FF4D00'
          })
          await fetchProducts()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        Swal.fire({
          icon: 'error',
          title: 'Xóa thất bại!',
          text: error.response?.data?.message || 'Không thể xóa sản phẩm này.',
          confirmButtonColor: '#FF4D00'
        })
      }
    }
  })
}

// ─── Excel Import & Template Methods ─────────────────────────────────────────────
const excelFileInput = ref(null)
const excelModalOpen = ref(false)
const parsedExcelProducts = ref([])
const isImportingExcel = ref(false)

const validExcelCount = computed(() => parsedExcelProducts.value.filter(p => p.isValid).length)
const invalidExcelCount = computed(() => parsedExcelProducts.value.filter(p => !p.isValid).length)

function downloadExcelTemplate() {
  const headers = [
    'Tên sản phẩm *',
    'Danh mục *',
    'Thương hiệu *',
    'Mô tả',
    'Kích cỡ (Size) *',
    'Màu sắc *',
    'Tồn kho *',
    'Giá bán (VND) *',
    'Sản phẩm nổi bật (1/0)'
  ]

  const sampleRows = [
    [
      'StepUp Air Jordan 1 Low Panda',
      categoriesList.value[0]?.name || 'Giày Sneaker',
      brandsList.value[0]?.name || 'Nike',
      'Đôi giày phong cách đường phố phối màu trắng đen cổ điển',
      '40, 41, 42',
      'Trắng',
      '15',
      '2500000',
      '1'
    ],
    [
      'StepUp Superstar Core Black',
      categoriesList.value[0]?.name || 'Giày Sneaker',
      brandsList.value[1]?.name || 'Adidas',
      'Giày mũi sò adidas kinh điển êm ái',
      '39, 40',
      'Đen',
      '20',
      '1800000',
      '0'
    ],
    [
      'StepUp Classic Crocs Clog',
      categoriesList.value[1]?.name || 'Dép Crocs',
      brandsList.value[2]?.name || 'Puma',
      'Dép nhựa dẻo nhẹ thoáng mát đi mưa thoải mái',
      '39, 40, 41',
      'Xám',
      '30',
      '850000',
      '0'
    ]
  ]

  const csvContent = '\uFEFF' + [
    headers.join(','),
    ...sampleRows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'mau_nhap_san_pham_saigonshoes.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function triggerExcelFileInput() {
  if (excelFileInput.value) {
    excelFileInput.value.click()
  }
}

function closeExcelModal() {
  excelModalOpen.value = false
  parsedExcelProducts.value = []
}

async function loadXLSXLibrary() {
  if (window.XLSX) return window.XLSX
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
    script.onload = () => resolve(window.XLSX)
    script.onerror = () => resolve(null)
    document.body.appendChild(script)
  })
}

async function onExcelFileSelected(event) {
  const file = event.target.files?.[0]
  if (!file) return

  try {
    let rows = []
    
    let XLSXModule = window.XLSX
    if (!XLSXModule && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      XLSXModule = await loadXLSXLibrary()
    }

    if (XLSXModule && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      const buffer = await file.arrayBuffer()
      const workbook = XLSXModule.read(buffer, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      rows = XLSXModule.utils.sheet_to_json(worksheet, { header: 1 })
    } else {
      const text = await file.text()
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '')
      rows = lines.map(line => {
        const result = []
        let current = ''
        let inQuotes = false
        for (let i = 0; i < line.length; i++) {
          const char = line[i]
          if (char === '"') {
            inQuotes = !inQuotes
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim().replace(/^"|"$/g, ''))
            current = ''
          } else {
            current += char
          }
        }
        result.push(current.trim().replace(/^"|"$/g, ''))
        return result
      })
    }

    if (rows.length < 2) {
      Swal.fire({
        icon: 'warning',
        title: 'File rỗng',
        text: 'File Excel / CSV không có dữ liệu sản phẩm!',
        confirmButtonColor: '#FF4D00'
      })
      return
    }

    parseExcelRowsToProducts(rows)
    excelModalOpen.value = true

  } catch (err) {
    console.error('Error reading Excel file:', err)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi đọc file',
      text: 'Không thể đọc nội dung file Excel. Vui lòng kiểm tra định dạng tập tin!',
      confirmButtonColor: '#FF4D00'
    })
  } finally {
    event.target.value = ''
  }
}

function parseExcelRowsToProducts(rows) {
  const products = []

  // Skip header row
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row || row.length === 0 || !row[0]) continue

    const name = String(row[0] || '').trim()
    const catInput = String(row[1] || '').trim()
    const brandInput = String(row[2] || '').trim()
    const description = String(row[3] || '').trim()
    const sizeInput = String(row[4] || '').trim()
    const colorInput = String(row[5] || '').trim()
    const stockInput = Number(row[6] || 10)
    const priceInput = Number(row[7] || 1000000)
    const featuredInput = String(row[8] || '0').trim()

    let isValid = true
    let errorMsg = ''

    // Match Category
    let category = categoriesList.value.find(c => String(c.id) === catInput || c.name.toLowerCase() === catInput.toLowerCase())
    if (!category && categoriesList.value.length > 0) {
      category = categoriesList.value[0]
    }
    if (!category) {
      isValid = false
      errorMsg = 'Không tìm thấy danh mục'
    }

    // Match Brand
    let brand = brandsList.value.find(b => String(b.id) === brandInput || b.name.toLowerCase() === brandInput.toLowerCase())
    if (!brand && brandsList.value.length > 0) {
      brand = brandsList.value[0]
    }
    if (!brand) {
      isValid = false
      errorMsg = 'Không tìm thấy thương hiệu'
    }

    // Parse Sizes
    const sizes = sizeInput ? sizeInput.split(/[,;|]/).map(s => s.trim()).filter(Boolean) : ['40']
    // Parse Colors
    const colors = colorInput ? colorInput.split(/[,;|]/).map(c => c.trim()).filter(Boolean) : ['Trắng']

    const variants = []
    for (const sName of sizes) {
      let sz = sizesList.value.find(s => String(s.name) === String(sName) || String(s.id) === String(sName))
      const sizeId = sz ? sz.id : (sizesList.value[0]?.id || 39)
      const sizeDisplayName = sz ? sz.name : sName

      for (const cName of colors) {
        let cl = colorsList.value.find(c => c.name.toLowerCase() === cName.toLowerCase() || String(c.id) === String(cName))
        const colorId = cl ? cl.id : (colorsList.value[0]?.id || 1)
        const colorDisplayName = cl ? cl.name : cName

        variants.push({
          size_id: sizeId,
          size_name: sizeDisplayName,
          color_id: colorId,
          color_name: colorDisplayName,
          stock: stockInput,
          price: priceInput
        })
      }
    }

    if (!name) {
      isValid = false
      errorMsg = 'Tên sản phẩm trống'
    }

    products.push({
      name,
      category_id: category ? category.id : 1,
      category_name: category ? category.name : catInput,
      brand_id: brand ? brand.id : 1,
      brand_name: brand ? brand.name : brandInput,
      description,
      is_featured: featuredInput === '1' || featuredInput.toLowerCase() === 'true',
      variants,
      isValid,
      errorMsg
    })
  }

  parsedExcelProducts.value = products
}

async function submitExcelImport() {
  const validProducts = parsedExcelProducts.value.filter(p => p.isValid)
  if (validProducts.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Không có dữ liệu',
      text: 'Không có sản phẩm hợp lệ nào để nhập kho!',
      confirmButtonColor: '#FF4D00'
    })
    return
  }

  isImportingExcel.value = true

  try {
    const payload = {
      products: validProducts.map(p => ({
        name: p.name,
        category_id: p.category_id,
        brand_id: p.brand_id,
        description: p.description,
        is_featured: p.is_featured ? 1 : 0,
        images: [],
        variants: p.variants.map(v => ({
          size_id: v.size_id,
          color_id: v.color_id,
          stock: v.stock,
          price: v.price
        }))
      }))
    }

    const response = await axiosInstance.post('/product_import_excel', payload)

    if (response && response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Nhập file Excel thành công!',
        text: response.message || `Đã thêm ${validProducts.length} sản phẩm mới vào hệ thống.`,
        confirmButtonColor: '#FF4D00'
      })
      await fetchProducts()
      closeExcelModal()
    }
  } catch (error) {
    console.error('Error submitting Excel import:', error)
    Swal.fire({
      icon: 'error',
      title: 'Nhập file thất bại!',
      text: error.response?.data?.message || 'Có lỗi xảy ra khi lưu sản phẩm vào cơ sở dữ liệu.',
      confirmButtonColor: '#FF4D00'
    })
  } finally {
    isImportingExcel.value = false
  }
}
</script>

<style scoped>
.animate-fade-in-quick {
  animation: fadeInQuick 0.2s ease-out;
}

@keyframes fadeInQuick {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
