const getAllEvents = async () => {
   const response = await fetch("/api/events");

   if (response.ok) {
      const data = await response.json();
      return data;
   }
   throw new Error("Error: request for all events failed");
};

const getEventById = async (id) => {
   const response = await fetch(`/api/events/${id}`);

   if (response.ok) {
      const data = await response.json();
      return data;
   }
   throw new Error(`Error: request event by id failed`);
};

export default {
   getAllEvents,
   getEventById,
};
