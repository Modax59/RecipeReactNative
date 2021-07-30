import client from "./client";

const endpoint = "/recipes";

const getRecipes = (pagination) =>
  client.get(endpoint + "?pagination=" + pagination);

const getMyRecipes = (id) => client.get(endpoint + "?user=" + id);

const getRecipe = (id) => client.get(endpoint + "/" + id);

const getRecipeBySearch = (name) => client.get(endpoint + "?name=" + name);

const addRecipe = ({ name, description, uriCategory, time }) =>
  client.post(endpoint, {
    name: name,
    Description: description,
    preparingTime: time,
    category: uriCategory,
  });

const addIngredient = (id, values) =>
  client.post("/recipe_ingredients/" + id + "/ingredients", values);

const addSteps = (id, values) =>
  client.post("/recipe_steps/" + id + "/steps", values);

const editRecipe = ({ name, description, uriCategory = null, time, id }) =>
  client.put(
    endpoint + "/" + id,
    uriCategory == null
      ? {
          name: name,
          Description: description,
          preparingTime: time,
        }
      : {
          name: name,
          Description: description,
          preparingTime: time,
          category: uriCategory,
        }
  );

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
  addIngredient,
  addSteps,
  getRecipes,
  editRecipe,
  getRecipe,
  addImageRecipe,
  addRecipe,
  getMyRecipes,
  getRecipeBySearch,
};
