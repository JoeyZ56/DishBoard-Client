import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  //state needed
  const [recipeDetail, setRecipeDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { id } = useParams;

  //useEffect for fetching
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5003/api/recipes/${id}`);

        if (!res.ok) {
          throw new Error("Error fetching recipe details");
        }

        const data = await res.json();
        setRecipeDetail(data);
        setLoading(false);
      } catch (error) {
        console.error("error fetching recipe details");
        setError(error);
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, []);

  return <div>recipeDetail</div>;
};

export default RecipeDetail;
