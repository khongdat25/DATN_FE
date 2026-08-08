import axiosInstance from './axios.js';

export const getGHNProvinces = async () => {
  return await axiosInstance.get('/ghn/provinces');
};

export const getGHNDistricts = async (provinceId) => {
  return await axiosInstance.get('/ghn/districts', {
    params: { province_id: provinceId }
  });
};

export const getGHNWards = async (districtId) => {
  return await axiosInstance.get('/ghn/wards', {
    params: { district_id: districtId }
  });
};

export const calculateGHNShippingFee = async (toDistrictId, toWardCode, weight = 1000) => {
  return await axiosInstance.post('/ghn/calculate-fee', {
    to_district_id: toDistrictId,
    to_ward_code: toWardCode,
    weight
  });
};

export const pushOrderToGHN = async (orderId) => {
  return await axiosInstance.post(`/admin/orders/${orderId}/push-ghn`);
};

export const trackGHNOrder = async (orderCode) => {
  return await axiosInstance.get(`/ghn/tracking/${orderCode}`);
};
