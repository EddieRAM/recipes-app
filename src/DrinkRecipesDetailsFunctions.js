function ifFavoriteFalse(favDrink, setFavorite) {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favDrink]));
  } else {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        ...JSON.parse(localStorage.getItem('favoriteRecipes')),
        favDrink,
      ]),
    );
  }
  setFavorite(true);
}
function handleFavorite(favorite, setFavorite, favoritesList, id) {
  if (favorite) {
    setFavorite(false);
    if (favoritesList.length > 1) {
      const list = favoritesList.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(list));
    }
    if (favoritesList.length === 1) {
      localStorage.removeItem('favoriteRecipes');
    }
  } else {
    ifFavoriteFalse();
  }
}
