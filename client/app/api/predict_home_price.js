export default function handler(req, res) {
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

    const estimatedPrice = 100000;

    res.status(200).json({ estimated_price: estimatedPrice });
  } else {
    res.status(405).end();
  }
}
