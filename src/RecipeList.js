import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Recipe.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searching, setSearching] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.log('There was an error fetching the recipes!', error);
            });
    }, []);


    // Filter recipes based on whether the recipe title includes the search query.
    const filteredItem = recipes.filter(recipe => recipe.title.toLowerCase().includes(searching.toLowerCase()));

    // Function to update the search query as the user types
    const handleSearch =(event) =>{
        setSearching(event.target.value);// Update 'searching' state with the value from the input field
    }

    return (
        <div>
            <h1>Recipe List</h1>
            <div className="searching-recipe">
            <input type="text" placeholder="..search Recipe" value={searching} onChange={handleSearch} className="search-input"  />
            </div>


            <div className="recipe-list">
                {filteredItem.map(recipe => (
                    <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="recipe-link">
                        <div className="recipe">
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RecipeList;
