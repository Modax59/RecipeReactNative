import client from "./client";

const endpoint = "/units";

const getUnits = () => client.get(endpoint);

export default {
  getUnits,
};
