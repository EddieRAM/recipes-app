import React, { useState, useEffect } from 'react';
import ProfileAvatar from '../Components/ProfileAvatar';
import shareIcon from '../images/shareIcon.svg';

export default function MadeRecipes() {
  const [isCopied, setIsCopied] = useState(false);
  let disapearMsg;
  const copiedMsg = 'Link copiado!';

  const copyShareLink = (id) => {
    const TWO_SECONDS = 1500;
    setIsCopied(true);
    navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
    disapearMsg = setTimeout(() => setIsCopied(false), TWO_SECONDS);
  };

  useEffect(() => clearTimeout(disapearMsg));

  const foodCard = (recipe, index) => {
    const tagName1 = recipe.tags[0];
    const tagName2 = recipe.tags[1];
    return (
      <li key={ index }>
        <img
          alt="imagem da receita"
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
        <span
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </span>
        <span
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category}` }
        </span>
        <span
          data-testid={ `${index}-horizontal-done-date` }
        >
          { recipe.doneDate }
        </span>
        <span data-testid={ `${index}-${tagName1}-horizontal-tag` }>{tagName1}</span>
        <span data-testid={ `${index}-${tagName2}-horizontal-tag` }>{tagName2}</span>
        <button type="button" onClick={ () => copyShareLink(recipe.id) }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="botao de compartilhar"
          />
        </button>
        <span>{ isCopied ? copiedMsg : ''}</span>
      </li>
    );
  };

  const drinkCard = (recipe, index) => (
    <li key={ index }>
      <img
        alt="imagem da receita"
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <span
        data-testid={ `${index}-horizontal-name` }
      >
        { recipe.name }
      </span>
      <span
        data-testid={ `${index}-horizontal-top-text` }
      >
        { recipe.alcoholicOrNot }
      </span>
      <span
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </span>
      <button type="button" onClick={ () => copyShareLink(recipe.id) }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="botao de compartilhar"
        />
      </button>
      <span>{ isCopied ? copiedMsg : ''}</span>
    </li>
  );

  const recipeCard = (recipe, index) => {
    if (recipe.type === 'comida') return foodCard(recipe, index);
    if (recipe.type === 'bebida') return drinkCard(recipe, index);
    return (
      <li key={ index }>
        <img
          alt="imagem da receita"
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
        <span
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </span>
        <span
          data-testid={ `${index}-horizontal-top-text` }
        >
          { recipe.category }
        </span>
        <span
          data-testid={ `${index}-horizontal-done-date` }
        >
          { recipe.doneDate }
        </span>
        <div>
          {
            recipe.tags.map((tagName, tagIndex) => (
              <span
                key={ tagIndex }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                { tagName }
              </span>
            ))
          }
        </div>
        <button type="button" onClick={ () => copyShareLink(recipe.id) }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="botao de compartilhar"
          />
        </button>
        <span>{ isCopied ? copiedMsg : ''}</span>
      </li>
    );
  };

  const renderList = (list) => (
    <ul>
      {
        list.map((recipe, index) => (recipeCard(recipe, index)))
      }
    </ul>
  );

  const getDoneRecipes = () => (JSON.parse(localStorage.getItem('doneRecipes')));

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
