// // /app/api/get_location_names.js

// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       console.log("API called: /api/get_location_names");

//       const response = await axios.get(
//         "http://127.0.0.1:5000/get-location-names"
//       );
//       const locations = response.data.locations;
//       res.status(200).json({ locations });
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//       res.status(500).json({ error: "Failed to fetch locations" });
//     }
//   } else {
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // const locations = ["abattoirs", "al wifaq", "amicales", "amsernate", "anza"]
