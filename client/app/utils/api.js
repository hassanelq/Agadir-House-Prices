export const predictHomePrice = async (inputData) => {
  const response = await fetch(
    "https://agadir-house-prices.onrender.com/predict-home-price",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
