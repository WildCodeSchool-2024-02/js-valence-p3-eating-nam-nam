import { useState } from "react";
import "../styles/ajouterRecette.css";
import { Form } from "react-router-dom";
import NutriAutoComplete from "../components/NutriAutoComplete";

export async function action({ request }) {
  try {
    const data = Object.fromEntries(await request.formData());
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/recettes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return { error: error.message };
  }
}

function IngredientField({ ingredient, onChange, onRemove, nutritionDetails }) {
  return (
    <div className="ingredient">
      <NutriAutoComplete nutritionDetails={nutritionDetails} />
      <input
        type="number"
        min="1"
        max="10000"
        value={ingredient.quantity}
        onChange={(e) => onChange(ingredient.id, "quantity", e.target.value)}
        placeholder="Quantité"
      />
      <select
        value={ingredient.unit}
        onChange={(e) => onChange(ingredient.id, "unit", e.target.value)}
      >
        <option value="g">g</option>
        <option value="ml">ml</option>
        <option value="unité">unité</option>
      </select>

      <button type="button" onClick={() => onRemove(ingredient.id)}>
        Supprimer
      </button>
    </div>
  );
}

function AjouterRecette() {
  const [titre, setTitre] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: Date.now(), quantity: "", unit: "g", name: "", nutrition: {} },
  ]);
  const [steps, setSteps] = useState([{ id: Date.now(), step: "" }]);
  const [photo, setPhoto] = useState(null);
  const [serving, setServing] = useState(1);
  const [nutritionInfo, setNutritionInfo] = useState(null);

  const handleIngredientChange = (id, field, value) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleNutritionDetails = (id, nutritionData) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, nutrition: nutritionData }
          : ingredient
      )
    );
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), quantity: "", unit: "g", name: "", nutrition: {} },
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const addStep = () => {
    setSteps([...steps, { id: Date.now(), step: "" }]);
  };

  const removeStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handlePhotoChange = (e) => {
    const [file] = e.target.files;
    setPhoto(() => file);
  };

  const calculateTotalNutrition = () => {
    const totalNutrition = ingredients.reduce(
      (acc, ingredient) => {
        if (ingredient.nutrition) {
          acc.calories +=
            (ingredient.nutrition.calories || 1) * (ingredient.quantity || 1);
          acc.protein +=
            (ingredient.nutrition.protein || 1) * (ingredient.quantity || 1);
          acc.fat +=
            (ingredient.nutrition.fat || 1) * (ingredient.quantity || 1);
          acc.carbs +=
            (ingredient.nutrition.carbohydrate || 1) *
            (ingredient.quantity || 1);
        }
        return acc;
      },
      { calories: 1, protein: 1, fat: 1, carbs: 1 }
    );
    return totalNutrition;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nutritionData = calculateTotalNutrition();
    setNutritionInfo(nutritionData);

    // Continue with the form submission
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <div className="ajouterRecette">
        <h1>Ajouter une recette</h1>

        <div className="title-input">
          <h2>Titre de la recette</h2>
          <input
            name="title"
            type="text"
            maxLength="30"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Entrez le titre de votre recette (1 ligne soit 30 caractères maximum)"
          />
        </div>

        <div className="serving-input">
          <h2>Nombre de portions</h2>
          <input
            name="serving"
            type="number"
            value={serving}
            min="1"
            max="10"
            onChange={(e) => {
              setServing(e.target.value);
            }}
            placeholder="Entrez le nombre de portions (2 chiffres)"
          />
        </div>

        <h2>Choisir les ingrédients</h2>
        {ingredients.map((ingredient) => (
          <IngredientField
            key={ingredient.id}
            ingredient={ingredient}
            onChange={handleIngredientChange}
            onRemove={removeIngredient}
            onNutritionDetails={(nutritionData) =>
              handleNutritionDetails(ingredient.id, nutritionData)
            }
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Ajouter un ingrédient
        </button>

        <h2>Étapes de préparation</h2>
        {steps.map((step) => (
          <div key={step.id} className="step">
            <textarea
              name={`steps[${step.id}]`}
              maxLength="310"
              value={step.step}
              onChange={(e) =>
                setSteps(
                  steps.map((s) =>
                    s.id === step.id ? { ...s, step: e.target.value } : s
                  )
                )
              }
              placeholder={`Étape ${steps.indexOf(step) + 1} : Rédigez des instructions courtes et claires, en procédant étape par étape (3 lignes par étape soit 310 caractères maximum)`}
            />
            <button type="button" onClick={() => removeStep(step.id)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={addStep}>
          Ajouter une étape de préparation
        </button>

        <h2>Photo</h2>
        <div className="photos">
          <div className="photo-container">
            <label
              htmlFor="photo"
              className="picture"
              style={{
                backgroundImage: photo
                  ? `url(${URL.createObjectURL(photo)})`
                  : "none",
              }}
            >
              {!photo && <span>Ajouter photo</span>}
            </label>
            <input
              name="picture"
              id="photo"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
          {nutritionInfo && (
            <div className="nutrition-info">
              <h3>Valeur nutritionnelle</h3>
              <p>Calories:{nutritionInfo.calories} kcal</p>
              <p>Protéines:{nutritionInfo.protein} g</p>
              <p>Glucides :{nutritionInfo.carbs} g</p>
              <p>Graisses:{nutritionInfo.fat} g</p>
            </div>
          )}
        </div>
        <button type="submit">Confirmer</button>
      </div>
    </Form>
  );
}

export default AjouterRecette;
