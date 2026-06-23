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
        path: '/forgot-password',
        component: () => import('../views/user/ForgotPasswordView.vue'),
        name: 'forgot-password'
    },
    {
        path: '/reset-password',
        component: () => import('../views/user/ResetPasswordView.vue'),
        name: 'reset-password'
    },
    {
        path: '/cart',
        component: () => import('../views/user/CartView.vue'),
        name: 'cart',
        meta: { requiresAuth: true }
    },
    {
        path: '/checkout',
        component: () => import('../views/user/CheckoutView.vue'),
        name: 'checkout',
        meta: { requiresAuth: true }
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
    },
    // Admin routes
    {
        path: '/admin',
        component: () => import('../views/admin/DashboardView.vue'),
        name: 'admin-dashboard',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/products',
        component: () => import('../views/admin/ProductsView.vue'),
        name: 'admin-products',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/categories',
        component: () => import('../views/admin/CategoriesView.vue'),
        name: 'admin-categories',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/banners',
        component: () => import('../views/admin/BannersView.vue'),
        name: 'admin-banners',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/orders',
        component: () => import('../views/admin/OrdersView.vue'),
        name: 'admin-orders',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/vouchers',
        component: () => import('../views/admin/VouchersView.vue'),
        name: 'admin-vouchers',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/flashsales',
        component: () => import('../views/admin/FlashSalesView.vue'),
        name: 'admin-flashsales',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/users',
        component: () => import('../views/admin/UsersView.vue'),
        name: 'admin-users',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/blogs',
        component: () => import('../views/admin/BlogsView.vue'),
        name: 'admin-blogs',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/reviews',
        component: () => import('../views/admin/ReviewsView.vue'),
        name: 'admin-reviews',
        meta: { requiresAuth: true, requiresAdmin: true }
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

// Navigation Guard (Bảo vệ các trang cần đăng nhập & phân quyền)
router.beforeEach((to, from) => {
    const token = localStorage.getItem('access_token');

    if (to.meta.requiresAdmin) {
        if (!token) {
            return { name: 'login' };
        }
        const userStr = localStorage.getItem('user');
        let isAdmin = false;
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                isAdmin = user && user.role === 'admin';
            } catch (e) {
                isAdmin = false;
            }
        }
        if (!isAdmin) {
            return { name: 'home' };
        }
        return true;
    }

    if (to.meta.requiresAuth && !token) {
        return { name: 'login' };
    }

    return true;
});

export default router;
