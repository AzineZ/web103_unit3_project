const getAllLocations = async () => {
   const response = await fetch("/api/locations");

   if (!response.ok) {
      throw new Error(`Unable to get locations: ${response.status}`);
   }

   return response.json();
};

const getLocationById = async (id) => {
   const response = await fetch(`/api/locations/${id}`);

   if (response.ok) {
      const data = await response.json();
      return data;
   }
   throw new Error(`Error: request for location by id failed`);
};

const getEventsByLocation = async (id) => {
   const response = await fetch(`/api/locations/${id}/events`);

   if (response.ok) {
      const data = await response.json();
      return data;
   }
   throw new Error(`Error: request for event by location id failed`);
};

export default {
   getAllLocations,
   getLocationById,
   getEventsByLocation,
};
