<template>
  <div>
    <h1>Trang Sản phẩm</h1>
    <button @click="testConnection">Test kết nối Backend</button>
    <p v-if="testResult">{{ testResult }}</p>
  </div>
</template>

<script>
import axiosInstance from '@/api/axios.js'; // Đường dẫn import có thể thay đổi tùy project

export default {
  name: 'ProductsView',
  data() {
    return {
      testResult: null
    }
  },
  methods: {
    async testConnection() {
      try {
        this.testResult = "Đang kết nối...";
        // Gọi thử một API. Giả sử backend có endpoint /products hoặc chỉ là / (tuỳ theo backend của bạn)
        const response = await axiosInstance.get('/products'); 
        console.log("Kết quả từ BE:", response);
        this.testResult = "✅ Kết nối thành công! Mở tab Console (F12) để xem chi tiết dữ liệu.";
      } catch (error) {
        console.error("Lỗi kết nối:", error);
        this.testResult = "❌ Kết nối thất bại. Lỗi: " + error.message;
      }
    }
  }
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: var(--color-accent, #FF4D00);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
p {
  margin-top: 10px;
  font-weight: bold;
}
</style>
