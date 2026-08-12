import axiosInstance from './axios.js';

export const sendAIChatMessage = async (message, history = []) => {
  return await axiosInstance.post('/ai/chat', {
    message,
    history
  }, {
    timeout: 120000 // Tăng timeout lên 120s (2 phút) cho AI suy nghĩ và tư vấn chi tiết
  });
};
