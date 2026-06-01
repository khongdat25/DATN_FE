import { createRouter, createWebHistory } from 'vue-router';

// Import Views
const routes = [
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
        path: '/product-detail', // For mock-up and default navigation
        component: () => import('../views/user/ProductDetailView.vue'),
        name: 'product-detail-default'
    },
    {
        path: '/product/:id',
        component: () => import('../views/user/ProductDetailView.vue'),
        name: 'product-detail'
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
    },
    {
        path: '/cart',
        component: () => import('../views/user/CartView.vue'),
        name: 'cart'
    },
    {
        path: '/checkout',
        component: () => import('../views/user/CheckoutView.vue'),
        name: 'checkout'
    },
    {
        path: '/profile',
        component: () => import('../views/user/ProfileView.vue'),
        name: 'profile',
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        component: () => import('../views/user/AboutView.vue'),
        name: 'about'
    },
    {
        path: '/news',
        component: () => import('../views/user/NewsView.vue'),
        name: 'news'
    },
    {
        path: '/news-detail', // For mock-up
        component: () => import('../views/user/NewsDetailView.vue'),
        name: 'news-detail-default'
    },
    {
        path: '/news/:id',
        component: () => import('../views/user/NewsDetailView.vue'),
        name: 'news-detail'
    },
    {
        path: '/contact',
        component: () => import('../views/user/ContactView.vue'),
        name: 'contact'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Luôn cuộn lên đầu trang khi chuyển trang
        return { top: 0, behavior: 'smooth' };
    }
});

// Navigation Guard (Bảo vệ các trang cần đăng nhập)
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token');

    if (to.meta.requiresAuth && !token) {
        next({ name: 'login' }); // Chuyển về trang login thay vì home
    } else {
        next();
    }
});

export default router;
