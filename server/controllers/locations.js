import { pool } from "../config/database.js";

export const getAllLocations = async (_req, res) => {
   try {
      const results = await pool.query(
         "SELECT * FROM locations ORDER BY id ASC"
      );

      res.status(200).json(results.rows);
   } catch (error) {
      console.error("Unable to get locations:", error);
      res.status(500).json({ error: "Unable to get locations" });
   }
};

export const getLocationById = async (req, res) => {
   const { id } = req.params;
   const locationId = Number.parseInt(id, 10);

   if (!Number.isInteger(locationId) || locationId < 1) {
      return res.status(400).json({ error: "Invalid location ID" });
   }

   try {
      const results = await pool.query(
         "SELECT * FROM locations WHERE id = $1",
         [locationId]
      );

      if (results.rows.length === 0) {
         return res.status(404).json({ error: "Location not found" });
      }

      res.status(200).json(results.rows[0]);
   } catch (error) {
      console.error(`Unable to get location ${id}:`, error);
      res.status(500).json({ error: "Unable to get location" });
   }
};
