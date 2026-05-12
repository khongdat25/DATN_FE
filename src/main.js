import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

// NOTE: Bootstrap đã được thay thế bởi Tailwind CSS v4
// Chỉ giữ lại CSS gốc nếu cần
// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
