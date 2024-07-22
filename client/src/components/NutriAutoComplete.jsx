import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function NutriAutoComplete() {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length < 3) return; // Only fetch if input has at least 3 characters

      try {
        const response = await fetch(
          `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(inputValue)}&locale=fr_FR`,
          {
            method: "GET",
            local: "fr_FR",
            headers: {
              "x-app-id": "eef29970",
              "x-app-key": import.meta.env.VITE_API_KEY_PB,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const commonFoods = data.common.map((item) => ({
          label: item.food_name,
          id: item.tag_id,
        }));

        setSuggestions([...commonFoods]);
      } catch (error) {
        console.error("Error fetching data from Nutritionix API", error);
      }
    };
    fetchData();
  }, [inputValue]);

  return (
    <Autocomplete
      options={suggestions}
      getOptionLabel={(option) => option.label}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        /* eslint-disable react/jsx-props-no-spreading */
        <TextField {...params} label="rechercher un aliment" />
      )}
    />
  );
}
