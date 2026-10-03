import "dotenv/config";
import { pool } from "./database.js";

const createTables = async (client) => {
   // Drop the child table first because it references locations.
   await client.query(`
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;
    `);

   await client.query(`
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(150) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(2) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            image TEXT NOT NULL
        );
    `);

   await client.query(`
        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(150) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image TEXT NOT NULL,
            location_id INTEGER NOT NULL
                REFERENCES locations(id)
                ON DELETE CASCADE

            -- TODO: Add any extra event field you want to display.
            -- Remember to add a comma after location_id's definition first.
        );
    `);
};

const seedLocations = async (client) => {
   const locations = [
      {
         name: "Pittsburgh Gaming Expo 2026",
         address: "209 Mall Plaza Blvd",
         city: "Monroeville",
         state: "PA",
         zip: "15146",
         image: "/assets/PAevent.jpg",
      },
      {
         name: "RetroGameCon 2026",
         address: "800 S State St",
         city: "Syracuse",
         state: "NY",
         zip: "13202",
         image: "/assets/retroevent.jpg",
      },
      {
         name: "Portland Retro Gaming Expo 2026",
         address: "777 NE Martin Luther King Jr Blvd",
         city: "Portland",
         state: "OR",
         zip: "97232",
         image: "/assets/portlandevent.png",
      },
      {
         name: "GameACon 2026",
         address: "72-840 CA-111",
         city: "Palm Desert",
         state: "CA",
         zip: "92260",
         image: "/assets/palmdesertevent.png",
      },
   ];

   for (const location of locations) {
      const { name, address, city, state, zip, image } = location;

      await client.query(
         `INSERT INTO locations (name, address, city, state, zip, image)
             VALUES ($1, $2, $3, $4, $5, $6)`,
         [name, address, city, state, zip, image]
      );
   }
};

const seedEvents = async (client) => {
   const events = [
      {
         title: "Classic Console Free Play",
         date: "2026-10-10",
         time: "10:00:00",
         image: "/assets/PAevent.jpg",
         locationId: 1,
      },
      {
         title: "Super Smash Bros. Tournament",
         date: "2026-10-10",
         time: "14:00:00",
         image: "/assets/PAevent.jpg",
         locationId: 1,
      },
      {
         title: "Meet the Indie Developers",
         date: "2026-10-11",
         time: "12:30:00",
         image: "/assets/PAevent.jpg",
         locationId: 1,
      },
      {
         title: "Retro Game Collecting 101",
         date: "2026-10-17",
         time: "11:00:00",
         image: "/assets/retroevent.jpg",
         locationId: 2,
      },
      {
         title: "Mario Kart Time Trials",
         date: "2026-10-17",
         time: "15:00:00",
         image: "/assets/retroevent.jpg",
         locationId: 2,
      },
      {
         title: "History of Handheld Gaming",
         date: "2026-10-18",
         time: "13:00:00",
         image: "/assets/retroevent.jpg",
         locationId: 2,
      },
      {
         title: "Retro Gaming Museum Tour",
         date: "2026-10-24",
         time: "10:30:00",
         image: "/assets/portlandevent.png",
         locationId: 3,
      },
      {
         title: "Tetris Championship",
         date: "2026-10-24",
         time: "16:00:00",
         image: "/assets/portlandevent.png",
         locationId: 3,
      },
      {
         title: "Pixel Art Workshop",
         date: "2026-10-25",
         time: "12:00:00",
         image: "/assets/portlandevent.png",
         locationId: 3,
      },
      {
         title: "Independent Games Showcase",
         date: "2026-11-07",
         time: "10:00:00",
         image: "/assets/palmdesertevent.png",
         locationId: 4,
      },
      {
         title: "Game Design Career Panel",
         date: "2026-11-07",
         time: "13:30:00",
         image: "/assets/palmdesertevent.png",
         locationId: 4,
      },
      {
         title: "Community Game Jam Awards",
         date: "2026-11-08",
         time: "17:00:00",
         image: "/assets/palmdesertevent.png",
         locationId: 4,
      },
   ];

   for (const event of events) {
      const { title, date, time, image, locationId } = event;

      await client.query(
         `INSERT INTO events (title, date, time, image, location_id)
             VALUES ($1, $2, $3, $4, $5)`,
         [title, date, time, image, locationId]
      );
   }
};

const resetDatabase = async () => {
   const client = await pool.connect();

   try {
      await client.query("BEGIN");
      await createTables(client);
      await seedLocations(client);
      await seedEvents(client);
      await client.query("COMMIT");

      console.log("Database reset successfully.");
   } catch (error) {
      await client.query("ROLLBACK");
      console.error("Database reset failed:", error);
      process.exitCode = 1;
   } finally {
      client.release();
      await pool.end();
   }
};

resetDatabase();
