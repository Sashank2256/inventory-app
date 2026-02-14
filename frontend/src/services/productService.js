import api from "./api";

export const getProducts = async (params) => {
  const res = await api.get("/products", { params });
  return res.data;
};

export const getAnalytics = async () => {
  const res = await api.get("/products/analytics/summary");
  return res.data;
};