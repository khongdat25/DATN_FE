import axiosInstance from './axios.js';

export const getAIStats = async () => {
  try {
    const res = await axiosInstance.get('/admin/ai/stats');
    if (res && res.success) return res.data;
  } catch (e) {
    console.error('Error fetching AI stats:', e);
  }
  return {
    total_conversations: 0,
    total_messages: 0,
    recommended_products_clicked: 0,
    positive_feedback_rate: 0,
    token_usage_this_month: 0,
    estimated_cost_usd: '0.0000$',
    active_status: true,
    category_breakdown: []
  };
};

export const getAISettings = async () => {
  try {
    const res = await axiosInstance.get('/admin/ai/settings');
    if (res && res.success) return res.data;
  } catch (e) {
    console.error('Error fetching AI settings:', e);
  }
  return null;
};

export const saveAISettings = async (settingsData) => {
  try {
    const res = await axiosInstance.post('/admin/ai/settings', settingsData);
    if (res && res.success) return res;
  } catch (e) {
    console.error('Error saving AI settings:', e);
  }
  return { success: false, message: 'Không thể lưu cấu hình AI.' };
};

export const getAIChatLogs = async (params = {}) => {
  try {
    const res = await axiosInstance.get('/admin/ai/logs', { params });
    if (res && res.success) return res.data;
  } catch (e) {
    console.error('Error fetching AI chat logs:', e);
  }
  return {
    data: [],
    total: 0,
    current_page: 1,
    last_page: 1
  };
};

export const getQuickSuggestions = async () => {
  try {
    const res = await axiosInstance.get('/admin/ai/suggestions');
    if (res && res.success) return res.data;
  } catch (e) {
    console.error('Error fetching AI quick suggestions:', e);
  }
  return [];
};

export const saveQuickSuggestions = async (suggestionsList) => {
  try {
    const res = await axiosInstance.post('/admin/ai/suggestions', { suggestions: suggestionsList });
    if (res && res.success) return res;
  } catch (e) {
    console.error('Error saving AI suggestions:', e);
  }
  return { success: false, message: 'Không thể cập nhật danh sách gợi ý.' };
};
