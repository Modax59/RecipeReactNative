import client from "./client";

const endpoint = "/ingredients";

const getIngredients = () => client.get(endpoint);

export default {
  getIngredients,
};
