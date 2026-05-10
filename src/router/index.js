import { createRouter, createWebHistory } from 'vue-router';

// Import Views (Tạm thời import các trang mẫu)
const routes = [
    // User Routes
    {
        path: '/',
        component: () => import('../views/user/HomeView.vue'),
        name: 'home'
    },
    // Admin Routes
    {
        path: '/admin',
        component: () => import('../views/admin/Dashboard.vue'),
        name: 'admin.dashboard',
        meta: { requiresAuth: true, role: 'admin' }
    },
    {
        path: '/admin/products',
        component: () => import('../views/admin/ProductList.vue'),
        name: 'admin.products'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation Guard (Bảo vệ các trang cần đăng nhập)
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token');
    
    if (to.meta.requiresAuth && !token) {
        next({ name: 'home' }); // Hoặc chuyển về trang login
    } else {
        next();
    }
});

export default router;
