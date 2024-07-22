export async function getLocationNames() {
  const res = await fetch("/api/get_location_names");
  const data = await res.json();
  return data;
}

export async function predictHomePrice({ sqft, bhk, bathrooms, location }) {
  const res = await fetch("/api/predict_home_price", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sqft, bhk, bathrooms, location }),
  });
  const data = await res.json();
  return data;
}
