export default function handler(req, res) {
  const locations = ["Electronic City", "Rajaji Nagar"]; // Example locations
  res.status(200).json({ locations });
}
