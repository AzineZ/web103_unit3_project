import { pool } from "../config/database.js";

export const getAllEvents = async (_req, res) => {
   try {
      const results = await pool.query(
         "SELECT * FROM events ORDER BY date ASC, time ASC"
      );

      res.status(200).json(results.rows);
   } catch (error) {
      console.error("Unable to get events:", error);
      res.status(500).json({ error: "Unable to get events" });
   }
};

export const getEventById = async (req, res) => {
   const { id } = req.params;
   const eventId = Number.parseInt(id, 10);

   if (!Number.isInteger(eventId) || eventId < 1) {
      return res.status(400).json({ error: "Invalid event ID" });
   }

   try {
      const results = await pool.query(
         "SELECT * FROM events WHERE id = $1",
         [eventId]
      );

      if (results.rows.length === 0) {
         return res.status(404).json({ error: "Event not found" });
      }

      res.status(200).json(results.rows[0]);
   } catch (error) {
      console.error(`Unable to get event ${id}:`, error);
      res.status(500).json({ error: "Unable to get event" });
   }
};

export const getEventsByLocation = async (req, res) => {
   const { locationId } = req.params;
   const parsedLocationId = Number.parseInt(locationId, 10);

   if (!Number.isInteger(parsedLocationId) || parsedLocationId < 1) {
      return res.status(400).json({ error: "Invalid location ID" });
   }

   try {
      const results = await pool.query(
         `SELECT * FROM events
          WHERE location_id = $1
          ORDER BY date ASC, time ASC`,
         [parsedLocationId]
      );

      res.status(200).json(results.rows);
   } catch (error) {
      console.error(`Unable to get events for location ${locationId}:`, error);
      res.status(500).json({ error: "Unable to get location events" });
   }
};
