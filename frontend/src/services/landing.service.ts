

import api from "./api";

export const landingService = {

  getEvents: async () => {

    const response =
      await api.get(
        "/events"
      );

    return response.data;

  }

};