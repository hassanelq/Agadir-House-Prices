export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sqft, bhk, bathrooms, location } = req.body;
    // Call your Python API or implement the logic here to get the estimated price
    const estimated_price = 75; // Example estimated price
    res.status(200).json({ estimated_price });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
