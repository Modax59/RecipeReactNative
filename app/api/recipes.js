import client from "./client";

const endpoint = "/recipes";

const getRecipes = () => client.get(endpoint);

const getMyRecipes = (id) => client.get(endpoint + "?user=" + id);

const addRecipe = ({ name, description, uriCategory, time }) =>
  client.post(endpoint, {
    name: name,
    Description: description,
    preparingTime: time,
    category: uriCategory,
  });

const addImageRecipe = (image, id, onUploadProgess) => {
  const data = new FormData();
  data.append("file", { name: "test.jpg", type: "image/jpg", uri: image });
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return client.post(endpoint + "/" + id + "/image", data, {
    headers,
    onUploadProgress: (progress) =>
      onUploadProgess(progress.loaded / progress.total),
  });
};

export default {
  getRecipes,
  addImageRecipe,
  addRecipe,
  getMyRecipes,
};
