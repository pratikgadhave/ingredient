import React,{useEffect,useState} from "react";
import Recipe from './Recipe';
import './App.css';

const App=()=>{

const APP_ID='c52deb35';
const APP_KEY='ea3ed8e5489c7dd24af79fe1eb203790';

const [recipes, setRecipes]=useState([]);
const [search, setSearch]=useState('');
const [query, setQuery]=useState('');

useEffect(()=>{
  getRecipes();
},[query])

const getRecipes=async()=>{
  const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data=await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
};

const updateSearch=e=>{
  setSearch(e.target.value);
  
};
const getSearch=e=>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
};
  return(
    <div className="main-container">
      <h1 id="main-header">Ingredient App</h1>
      <form onSubmit={getSearch} className="search-form">
      
        <input className="search-bar"  type="text" value={search} onChange={updateSearch} placeholder="Try searching paneer"/>
        <button  className="search-button" type="submit"  >Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe key={recipe.recipe.totalWeight} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
      
      <footer className="footer">Made with 💓 by princepratikk</footer>
    </div>
  );
};

export default App;
