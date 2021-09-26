import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import Login from './Pages/Login';
import MealRecipeDetails from './Pages/MealRecipeDetails';
import DrinkRecipeDetails from './Pages/DrinkRecipeDetails';
import Drinks from './Pages/Drinks';
import Foods from './Pages/Foods';
import Explore from './Pages/Explore';
import ExploreFood from './Pages/ExploreFood';
import ExploreDrinks from './Pages/ExploreDrinks';
import Profile from './Pages/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import MadeRecipes from './Pages/MadeRecipes';
import ExploreFoodsByIngredients from './Pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from './Pages/ExploreDrinksByIngredients';
import ExploreFoodsByArea from './Pages/ExploreFoodsByArea';
import './Styles/RecipeDetails.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route
        exact
        path="/comidas/:id"
        component={ (props) => <MealRecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/bebidas/:id"
        component={ (props) => <DrinkRecipeDetails { ...props } /> }
      />
      <Route path="/comidas/:id/in-progress" />
      <Route path="/bebidas/:id/in-progress" />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByArea } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ MadeRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
