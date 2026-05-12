import axios from 'axios';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request Interceptor: Tự động thêm Token vào Header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Xử lý lỗi tập trung
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Phiên đăng nhập hết hạn',
                text: 'Vui lòng đăng nhập lại.',
            }).then(() => {
                localStorage.removeItem('access_token');
                window.location.href = '/login';
            });
        } else if (status === 403) {
            Swal.fire({
                icon: 'warning',
                title: 'Không có quyền truy cập',
                text: 'Bạn không có quyền thực hiện hành động này.',
            });
        } else if (status === 422) {
            const errors = error.response.data.errors;
            const firstError = errors ? Object.values(errors)[0][0] : 'Dữ liệu không hợp lệ';
            Swal.fire({
                icon: 'error',
                title: 'Lỗi xác thực',
                text: firstError,
            });
        } else if (status === 404) {
            Swal.fire({
                icon: 'info',
                title: 'Không tìm thấy',
                text: 'Tài nguyên bạn yêu cầu không tồn tại.',
            });
        } else if (status === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi hệ thống',
                text: 'Đã có lỗi xảy ra từ phía server. Vui lòng thử lại sau.',
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
