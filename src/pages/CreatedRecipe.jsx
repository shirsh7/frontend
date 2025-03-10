import React, { useState, useEffect } from "react";

const CreatedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const userId = localStorage.getItem("userId"); // Assuming user ID is stored after login

  useEffect(() => {
    if (userId) {
      fetchUserRecipes();
    } else {
      console.error("User ID not found");
    }
  }, [userId]);

  const fetchUserRecipes = async () => {
    try {
      const response = await fetch(`https://backend-server-e651.onrender.com/recipes/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="created-recipes-container">
      <h2>Your Created Recipes</h2>
      {recipes.length > 0 ? (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't created any recipes yet.</p>
      )}
    </div>
  );
};

export default CreatedRecipes;
