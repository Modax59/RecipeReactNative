const RecipeSearch = (searchValue, data) => {
  return searchValue
    ? data.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          recipe.preparingTime.toString().includes(searchValue.toLowerCase())
      )
    : data;
};

export default RecipeSearch;
