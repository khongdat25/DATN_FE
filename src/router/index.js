import { createRouter, createWebHistory } from 'vue-router';

// Import Views (Tạm thời import các trang mẫu)
const routes = [
    // Home Routes
    {
        path: '/',
        component: () => import('../views/user/HomeView.vue'),
        name: 'home'
    },
    {
        path: '/products',
        component: () => import('../views/user/ProductsView.vue'),
        name: 'products'
    },
    {
        path: '/register',
        component: () => import('../views/user/RegisterView.vue'),
        name: 'register'
    },
    {
        path: '/login',
        component: () => import('../views/user/LoginView.vue'),
        name: 'login'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation Guard (Bảo vệ các trang cần đăng nhập)
router.beforeEach((to, from) => {
    const token = localStorage.getItem('access_token');

    if (to.meta.requiresAuth && !token) {
        return { name: 'home' }; // Hoặc chuyển về trang login
    }
});

export default router;
