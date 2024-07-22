export default function handler(req, res) {
  if (req.method === "POST") {
    const {
      area,
      rooms,
      bathrooms,
      bedrooms,
      location,
      type,
      jardin,
      cuisineEquipped,
      piscine,
      status,
      propriety,
    } = req.body;

    const estimatedPrice = 100000;

    res.status(200).json({ estimated_price: estimatedPrice });
  } else {
    res.status(405).end();
  }
}
