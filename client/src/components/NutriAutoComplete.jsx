import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function NutriAutoComplete({ name }) {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [nutritionDetails, setNutritionDetails] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length < 3) return; // Only fetch if input has at least 3 characters
      try {
        const response = await fetch(
          `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(inputValue)}&locale=fr_FR`,
          {
            method: "GET",
            headers: {
              "x-app-id": import.meta.env.VITE_NUTRITIONIX_APP_ID,
              "x-app-key": import.meta.env.VITE_NUTRITIONIX_APP_KEY,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const ingredients = data.common.map((ingredient) => ({
          label: ingredient.food_name,
          id: ingredient.tag_id,
        }));
        setSuggestions([...ingredients]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API Nutritionix",
          error
        );
      }
    };
    fetchData();
  }, [inputValue]);
  const fetchNutritionDetails = async (ingredient) => {
    try {
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          method: "POST",

          headers: {
            "x-app-id": import.meta.env.VITE_NUTRITIONIX_APP_ID,
            "x-app-key": import.meta.env.VITE_NUTRITIONIX_APP_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locale: "fr_FR",
            query: ingredient,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setNutritionDetails(data.foods[0]);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails nutritionnels de l'API Nutritionix",
        error
      );
    }
  };
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };
  const handleOptionSelect = (event, newValue) => {
    if (newValue) {
      fetchNutritionDetails(newValue.label);
    }
  };
  return (
    <div>
      <Autocomplete
        options={suggestions}
        getOptionLabel={(option) => option.label}
        onInputChange={handleInputChange}
        onChange={handleOptionSelect}
        renderInput={(params) => (
          /* eslint-disable react/jsx-props-no-spreading */
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              name,
            }}
            label="Rechercher un aliment"
          />
        )}
      />
      {nutritionDetails && (
        <div>
          <h3>Valeurs Nutritionnelles :</h3>
          <p>Calories: {nutritionDetails.nf_calories}</p>
          <p>Protéines: {nutritionDetails.nf_protein}g</p>
          <p>Graisses: {nutritionDetails.nf_total_fat}g</p>
          <p>Glucides: {nutritionDetails.nf_total_carbohydrate}g</p>
        </div>
      )}
    </div>
  );
}
