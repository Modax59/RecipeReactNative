const RecipeSearch = (searchValue, data) => {
  return searchValue
    ? data.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(search.toLowerCase()) ||
          recipe.preparingTime.toString().includes(search.toLowerCase())
      )
    : data;
};

export default RecipeSearch;
