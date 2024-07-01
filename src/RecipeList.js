import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Recipe.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.log('There was an error fetching the recipes!', error);
            });
    }, []);

    return (
        <div>
            <h1>Recipe List</h1>

            <div className="recipe-list">
                {recipes.map(recipe => (
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
