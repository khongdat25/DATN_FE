import axiosInstance from './axios'

/**
 * Lấy danh sách banner hero slider
 * GET /api/banner
 * Response: { success, data: [{ id, name, image }] }
 */
export const getBanners = () => axiosInstance.get('/banner')

/**
 * Lấy danh mục nổi bật
 * GET /api/categories
 * Response: { success, data: [{ name, img, products_count }] }
 */
export const getCategories = () => axiosInstance.get('/categories')

/**
 * Lấy danh sách Flash Sale đang diễn ra
 * GET /api/flashsales
 * Response: { success, data: [{ id, ..., items: [{ product, ... }] }] }
 */
export const getFlashSales = () => axiosInstance.get('/flashsales')

/**
 * Lấy top sản phẩm bán chạy
 * GET /api/bestsellings
 * Response: { success, data: [{ id, name, slug, sold, category, variants }] }
 */
export const getBestSellings = () => axiosInstance.get('/bestsellings')

/**
 * Lấy sản phẩm nổi bật (featured brand)
 * GET /api/hotproducts
 * Response: { success, data: [{ id, name, slug, sold, brand, category, variants }] }
 */
export const getHotProducts = () => axiosInstance.get('/hotproducts')
