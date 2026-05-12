import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// NOTE: Bootstrap đã được thay thế bởi Tailwind CSS (qua CDN trong index.html)
// Chỉ giữ lại CSS gốc nếu cần
// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
