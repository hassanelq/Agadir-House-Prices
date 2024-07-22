// /app/utils/api.js

// export const getLocationNames = async () => {
//   try {
//     console.log("Fetching location names...");

//     const response = await fetch("/api/get_location_names");
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("Fetched locations:", data.locations);
//     return data;
//   } catch (error) {
//     console.error("Error fetching location names:", error);
//     return { locations: [] };
//   }
// };

export const predictHomePrice = async (inputData) => {
  const response = await fetch("/api/predict_home_price", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
