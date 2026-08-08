import axiosInstance from './axios.js';

export const sendAIChatMessage = async (message, history = []) => {
  return await axiosInstance.post('/ai/chat', {
    message,
    history
  }, {
    timeout: 30000 // 30s timeout for AI response
  });
};
