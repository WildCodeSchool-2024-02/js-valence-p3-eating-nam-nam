import { useState } from "react";
import "../styles/ajouterRecette.css";
import { Form, useActionData } from "react-router-dom";
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
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }
    return result;
  } catch (error) {
    return { message: error.message };
  }
}

function IngredientField({
  ingredient: { id, quantity, unit: ingredientUnit },
  onChange,
  onRemove,
  onNutritionDetails,
  nutritionDetails,
}) {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const updateNutritionalValues = (value, unit) => {
    let convertedValue = value;
    if (unit === "kg") {
      convertedValue *= 1000;
    }

    const calories =
      (convertedValue * (nutritionDetails.caloriesPerUnit || 0)) /
      (unit === "g" ? 1 : 1000);
    onChange(id, "calories", calories);
    onNutritionDetails(id, { calories });
  };

  const handleQuantityChange = ({ target: { value } }) => {
    setLocalQuantity(value);
    updateNutritionalValues(value, ingredientUnit);
  };

  const handleQuantityBlur = () => {
    if (localQuantity === "" || Number.isNaN(Number(localQuantity))) {
      setLocalQuantity(0);
    }
  };

  return (
    <div className="ingredient-container">
      <div className="ingredient-info">
        <NutriAutoComplete
          nutritionDetails={nutritionDetails}
          name={`ingredients[${id}][name]`}
        />
        <input
          type="number"
          min={ingredientUnit === "kg" ? 0.1 : 100}
          max={ingredientUnit === "kg" ? 5 : 5000}
          step={ingredientUnit === "kg" ? 0.1 : 1}
          value={localQuantity}
          onChange={handleQuantityChange}
          onBlur={handleQuantityBlur}
          placeholder="Quantité"
        />
        <select
          value={ingredientUnit}
          onChange={(e) => {
            const newUnit = e.target.value;
            let newQuantity = localQuantity;
            if (ingredientUnit === "g" && newUnit === "kg") {
              newQuantity /= 1000;
            } else if (ingredientUnit === "kg" && newUnit === "g") {
              newQuantity *= 1000;
            }
            onChange(id, "unit", newUnit);
            onChange(id, "quantity", newQuantity);
          }}
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="unité">unité</option>
        </select>
      </div>
      <div className="ingredient-button">
        <button type="button" onClick={() => onRemove(id)}>
          Supprimer l'ingrédient
        </button>
      </div>
    </div>
  );
}

function AjouterRecette() {
  const error = useActionData();
  const [photo, setPhoto] = useState(null); // Supprimez cette ligne si vous ne l'utilisez pas

  const [titre, setTitre] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: Date.now(), quantity: 100, unit: "g", name: "", nutrition: {} },
  ]);
  const [steps, setSteps] = useState([{ id: Date.now(), step: "" }]);

  const [serving, setServing] = useState(1);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const calculateTotalNutrition = () =>
    ingredients.reduce(
      (acc, ingredient) => {
        if (ingredient.nutrition) {
          acc.calories +=
            (ingredient.nutrition.calories || 0) * (ingredient.quantity || 1);
          acc.protein +=
            (ingredient.nutrition.protein || 0) * (ingredient.quantity || 1);
          acc.fat +=
            (ingredient.nutrition.fat || 0) * (ingredient.quantity || 1);
          acc.carbs +=
            (ingredient.nutrition.carbohydrate || 0) *
            (ingredient.quantity || 1);
        }
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );

  const handleRecipeSubmit = (e) => {
    e.preventDefault();
    const totalNutrition = calculateTotalNutrition();
    setNutritionInfo(totalNutrition);
    setIsConfirmed(true);
  };

  const handleIngredientChange = (id, field, value) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), quantity: 100, unit: "g", name: "", nutrition: {} },
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

  const handleServingChange = ({ target: { value } }) => {
    const numValue = parseInt(value, 10);
    setServing(Math.max(1, Math.min(10, numValue || 1)));
  };

  const handleStepChange = (id, value) => {
    setSteps(
      steps.map((step) =>
        step.id === id
          ? {
              ...step,
              step: value,
            }
          : step
      )
    );
  };

  return (
    <Form onSubmit={handleRecipeSubmit} method="POST">
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
            placeholder="Entrez le titre de votre recette (30 caractères maximum)"
          />
          <div className="char-count">
            {30 - titre.length} caractères restants
          </div>
        </div>

        <div className="serving-input">
          <h2>Nombre de portions</h2>
          <input
            name="serving"
            type="number"
            value={serving}
            min="1"
            max="10"
            onChange={handleServingChange}
            placeholder="Entrez le nombre de portions (1 à 10)"
          />
        </div>

        <h2>Choisir les ingrédients</h2>
        {ingredients.map((ingredient) => (
          <IngredientField
            key={ingredient.id}
            ingredient={ingredient}
            onChange={handleIngredientChange}
            onRemove={removeIngredient}
            nutritionDetails={ingredient.nutrition}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Ajouter un ingrédient
        </button>

        <h2>Étapes de préparation</h2>
        {steps.map((step) => (
          <div key={step.id} className="step-container">
            <input
              type="text"
              value={step.step}
              placeholder="Entrez une étape"
              onChange={(e) => handleStepChange(step.id, e.target.value)}
            />
            <button type="button" onClick={() => removeStep(step.id)}>
              Supprimer l'étape
            </button>
          </div>
        ))}
        <button type="button" onClick={addStep}>
          Ajouter une étape
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

          <button type="submit">Confirmer la recette</button>

          {nutritionInfo && isConfirmed && (
            <div className="nutrition-info">
              <h3>Valeurs nutritionnelles totales</h3>
              <p>Calories : {nutritionInfo.calories}</p>
              <p>Protéines : {nutritionInfo.protein}g</p>
              <p>Graisses : {nutritionInfo.fat}g</p>
              <p>Glucides : {nutritionInfo.carbs}g</p>
            </div>
          )}

          {error?.message && <p className="error">{error.message}</p>}
        </div>
      </div>
    </Form>
  );
}

export default AjouterRecette;
