import client from "./client";

const endpoint = "/categories";

const getCategory = () => client.get(endpoint);

export default {
    getCategory
};
