import React from 'react';
import ProfileAvatar from '../Components/ProfileAvatar';
import shareIcon from '../images/shareIcon.svg';

function MadeRecipes() {
  const renderList = (list) => (
    <ul>
      {
        list.map((recipe, index) => (
          <li key={ index }>
            <img
              alt="imagem da receita"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.category }
            </span>
            <span
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </span>
            <span
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }
            </span>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              { shareIcon }
            </button>
            <div>
              { recipe.tags.map((tagName, tagIndex) => (
                <span
                  key={ tagIndex }
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  { tagName }
                </span>
              )) }
            </div>
          </li>
        ))
      }
    </ul>
  );

  const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'));

  const showAllDoneRecipes = () => {
    const doneRecipes = getDoneRecipes();
    return renderList(doneRecipes);
  };

  const showDoneFoods = () => {
    const doneRecipes = getDoneRecipes();
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === 'comida');
    return renderList(filteredRecipes);
  };

  const showDoneDrinks = () => {
    const doneRecipes = getDoneRecipes();
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === 'bebida');
    return renderList(filteredRecipes);
  };

  const renderButtons = () => (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ showAllDoneRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ showDoneFoods }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ showDoneDrinks }
      >
        Drinks
      </button>
    </div>
  );

  return (
    <div>
      <h1 data-testid="page-title">Receitas Feitas</h1>
      <ProfileAvatar />
      { renderButtons() }
      { showAllDoneRecipes() }
    </div>
  );
}

export default MadeRecipes;
