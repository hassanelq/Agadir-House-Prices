// app/utils/api.js

export const predictHomePrice = async (homeData) => {
  try {
    const response = await fetch("/api/predict-home-price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(homeData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error predicting home price:", error);
    throw error;
  }
};
