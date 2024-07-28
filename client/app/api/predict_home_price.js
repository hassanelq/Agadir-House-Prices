export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      location,
      type,
      status,
      propriety,
      area,
      rooms,
      bedrooms,
      bathrooms,
      jardin,
      piscine,
      cuisineEquipped,
    } = req.body;

    // Prepare the data to send to the external API
    const inputData = {
      location,
      type,
      status,
      property_state: propriety,
      area,
      rooms,
      bedrooms,
      bathrooms,
      jardin: jardin ? 1 : 0,
      piscine: piscine ? 1 : 0,
      cuisine_equiped: cuisineEquipped ? 1 : 0,
    };

    try {
      const response = await fetch("https://app.elqadi.me/predict-home-price", {
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
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
