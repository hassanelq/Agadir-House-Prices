// api/predict_home_price.js
import { fetchAPI } from "../utils/api";

export const predictHomePrice = async (data) => {
  const response = await fetchAPI("/predict-home-price", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
};
