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

        // Xử lý lỗi kết nối hoặc quá thời gian phản hồi (timeout)
        if (!error.response) {
            // Không bật popup Swal toàn trang nếu là lỗi từ AI chat
            if (error.config && error.config.url && error.config.url.includes('/ai/chat')) {
                return Promise.reject(error);
            }
            Swal.fire({
                icon: 'error',
                title: 'Lỗi kết nối',
                text: 'Không thể kết nối tới máy chủ hoặc yêu cầu bị quá thời gian phản hồi (timeout). Vui lòng thử lại sau!',
                confirmButtonColor: '#FF4D00'
            });
            return Promise.reject(error);
        }

        if (status === 401) {
            // Nếu là API login, hiển thị thông báo lỗi đăng nhập từ server
            if (error.config && error.config.url && (error.config.url.endsWith('/login') || error.config.url.includes('/login/google'))) {
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng nhập thất bại',
                    text: error.response?.data?.message || 'Tài khoản hoặc thông tin xác thực không chính xác.',
                    confirmButtonColor: '#FF4D00'
                });
                return Promise.reject(error);
            }

            // Nếu đang đăng xuất hoặc request bị lỗi chính là logout, bỏ qua cảnh báo
            if (localStorage.getItem('is_logging_out') === 'true' || (error.config && error.config.url && error.config.url.endsWith('/logout'))) {
                return Promise.reject(error);
            }

            Swal.fire({
                icon: 'error',
                title: 'Phiên đăng nhập hết hạn',
                text: 'Vui lòng đăng nhập lại.',
            }).then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
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
            let firstError = errors ? Object.values(errors)[0][0] : 'Dữ liệu không hợp lệ';
            
            // Dịch các thông báo lỗi phổ biến từ Laravel sang tiếng Việt
            const translations = {
                'The email has already been taken.': 'Email này đã được sử dụng. Vui lòng dùng email khác.',
                'The email field is required.': 'Vui lòng nhập email.',
                'The email field must be a valid email address.': 'Email không đúng định dạng.',
                'The password field is required.': 'Vui lòng nhập mật khẩu.',
                'The password field must be at least 6 characters.': 'Mật khẩu phải có ít nhất 6 ký tự.',
                'The password field must be at least 8 characters.': 'Mật khẩu phải có ít nhất 8 ký tự.',
                'The phone has already been taken.': 'Số điện thoại này đã được sử dụng.',
                'The phone field is required.': 'Vui lòng nhập số điện thoại.',
                'The name field is required.': 'Vui lòng nhập họ tên.',
            };
            firstError = translations[firstError] || firstError;

            Swal.fire({
                icon: 'error',
                title: 'Lỗi xác thực',
                text: firstError,
                confirmButtonColor: '#FF4D00'
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
