import React, { useState, useEffect } from "react";
import "./CreateRecipe.css";

const CreateRecipe = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [cookingTime, setCookingTime] = useState(0);
    const [recipes, setRecipes] = useState([]);

    const userId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage

    useEffect(() => {
        if (userId) {
            fetchUserRecipes();
        }
    }, [userId]);

    const fetchUserRecipes = async () => {
        if (!userId) {
            console.error("User ID not found. Please log in.");
            return;
        }
        try {
            const response = await fetch(`https://backend-server-e651.onrender.com/recipes/${userId}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const addIngredient = () => {
        if (newIngredient.trim() !== "") {
            setIngredients([...ingredients, newIngredient]);
            setNewIngredient("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("User ID not found. Please log in.");
            return;
        }

        const recipeData = { userId, name, description, ingredients, instructions, imageUrl, cookingTime };

        try {
            const response = await fetch("http://localhost:5000/create-recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            fetchUserRecipes();
            alert("Recipe created successfully!");

            setName("");
            setDescription("");
            setIngredients([]);
            setInstructions("");
            setImageUrl("");
            setCookingTime(0);
        } catch (error) {
            console.error("Error creating recipe:", error);
        }
    };

    return (
        <div className="create-recipe-container">
            <h2>Create Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Ingredients</label>
                <div className="ingredient-section">
                    <input type="text" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} placeholder="Enter ingredient" />
                    <button type="button" className="add-btn" onClick={addIngredient}>Add Ingredient</button>
                </div>
                <ul>{ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>

                <label>Instructions</label>
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />

                <label>Image URL</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                <label>Cooking Time (minutes)</label>
                <input type="number" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} min="0" />

                <button type="submit" className="submit-btn">Create Recipe</button>
            </form>

            <h2>Your Recipes</h2>
            <div className="recipe-list">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id} className="recipe-card">
                            <h3>{recipe.name}</h3>
                            <p><strong>Description:</strong> {recipe.description}</p>
                            <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
                            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} width="150" />}
                        </div>
                    ))
                ) : (
                    <p>No recipes created yet.</p>
                )}
            </div>
        </div>
    );
};

export default CreateRecipe;
