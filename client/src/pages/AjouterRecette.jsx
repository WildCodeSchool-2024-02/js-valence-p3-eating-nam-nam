import { useState } from "react";
import "../styles/ajouterRecette.css";
import { Form, useActionData } from "react-router-dom";
import NutriAutoComplete from "../components/NutriAutoComplete";

export async function action() {
  // ... (le code de cette fonction reste inchangé)
}
function IngredientField({
  ingredient: { id, quantity, unit: ingredientUnit },
  onChange,
  onRemove,
}) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const handleQuantityChange = ({ target: { value } }) => {
    setLocalQuantity(value);
    onChange(id, "quantity", value);
  };
  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    let newQuantity = localQuantity;
    if (ingredientUnit === "g" && newUnit === "kg") {
      newQuantity /= 1000;
    } else if (ingredientUnit === "kg" && newUnit === "g") {
      newQuantity *= 1000;
    }
    onChange(id, "unit", newUnit);
    onChange(id, "quantity", newQuantity);
  };
  return (
    <div className="ingredient-container">
      <NutriAutoComplete
        name={`ingredients[${id}][name]`}
        onChange={(field, value) => {
          if (field === "nutrition") {
            onChange(id, "nutrition", value);
          } else {
            onChange(id, field, value);
          }
        }}
      />
      <input
        type="number"
        min="0"
        value={localQuantity}
        onChange={handleQuantityChange}
        placeholder="Quantité"
      />
      <select value={ingredientUnit} onChange={handleUnitChange}>
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="unité">unité</option>
      </select>
      <button type="button" onClick={() => onRemove(id)}>
        Supprimer l'ingrédient
      </button>
    </div>
  );
}
function AjouterRecette() {
  const error = useActionData();
  const [photo, setPhoto] = useState(null);
  const [titre, setTitre] = useState("");
  const [ingredients, setIngredients] = useState([
    {
      id: Date.now(),
      quantity: 100,
      unit: "g",
      name: "",
      nutrition: { calories: 0, protein: 0, fat: 0, carbs: 0 },
    },
  ]);
  const [steps, setSteps] = useState([{ id: Date.now(), step: "" }]);
  const [serving, setServing] = useState(1);
  const [totalNutrition, setTotalNutrition] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
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
      {
        id: Date.now(),
        quantity: 100,
        unit: "g",
        name: "",
        nutrition: { calories: 0, protein: 0, fat: 0, carbs: 0 },
      },
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
    setPhoto(file);
  };
  const handleServingChange = ({ target: { value } }) => {
    const numValue = parseInt(value, 10);
    if (!Number.isNaN(numValue) && numValue >= 1 && numValue <= 10) {
      setServing(numValue);
    } else if (value === "") {
      setServing("");
    }
  };
  const calculateTotalNutrition = () => {
    const total = ingredients.reduce(
      (acc, ingredient) => {
        const quantity = parseFloat(ingredient.quantity) || 0;
        acc.calories +=
          (ingredient.nutrition?.calories || 0) * (quantity / 100);
        acc.protein += (ingredient.nutrition?.protein || 0) * (quantity / 100);
        acc.fat += (ingredient.nutrition?.fat || 0) * (quantity / 100);
        acc.carbs += (ingredient.nutrition?.carbs || 0) * (quantity / 100);
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );
    Object.keys(total).forEach((key) => {
      total[key] = Math.round(total[key] * 100) / 100;
    });
    setTotalNutrition(total);
  };
  const handleRecipeSubmit = (e) => {
    e.preventDefault();
    calculateTotalNutrition();
    setIsConfirmed(true);
  };
  const handleStepChange = (id, value) => {
    setSteps(
      steps.map((step) => (step.id === id ? { ...step, step: value } : step))
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
            placeholder="Entrez le titre de votre recette (30 caractères max)"
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
            onChange={handleServingChange}
            placeholder="Nombre de portions (1 à 10)"
          />
        </div>
        <h2>Choisir les ingrédients</h2>
        {ingredients.map((ingredient) => (
          <IngredientField
            key={ingredient.id}
            ingredient={ingredient}
            onChange={handleIngredientChange}
            onRemove={removeIngredient}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Ajouter un ingrédient
        </button>
        {/* /*<h2>Étapes de préparation</h2>
        {steps.map(({ id, step }) => (
          <div key={id} className="step">
            <textarea
              name={`steps[${id}][description]`}
              maxLength="310"
              value={step}
              placeholder={`Étape ${
                steps.indexOf(step) + 1
              } : Rédigez des instructions courtes et claires, en procédant étape par étape (3 lignes par étape soit 310 caractères maximum)`}
              onChange={(e) =>
                setSteps(
                  steps.map((s) =>
                    s.id === id ? { ...s, step: e.target.value } : s
                  )
                )
              }
            />
            <button type="button" onClick={()=>removeStep(step.id)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={addStep}>
          Ajouter une étape de préparation
        </button> */}
        <h2>Étapes de préparation</h2>{" "}
        {steps.map(({ id, step }, index) => (
          <div key={id} className="step">
            {" "}
            <div className="step-info">
              {" "}
              <textarea
                name={`steps[${id}]`}
                maxLength="310"
                value={step}
                onChange={(e) => handleStepChange(id, e.target.value)}
                placeholder={`Étape ${index + 1} : Rédigez des instructions courtes et claires, en procédant étape par étape (310 caractères maximum)`}
              />{" "}
              <div className="char-count">
                {" "}
                {310 - step.length} caractères restants{" "}
              </div>{" "}
            </div>{" "}
            <div className="step-button">
              {" "}
              <button type="button" onClick={() => removeStep(id)}>
                {" "}
                Supprimer l'étape{" "}
              </button>{" "}
            </div>{" "}
          </div>
        ))}{" "}
        <button type="button" onClick={addStep}>
          {" "}
          Ajouter une étape de préparation{" "}
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
          <button type="button" onClick={handleRecipeSubmit}>
            Confirmer la recette
          </button>
          {isConfirmed && (
            <div className="nutrition-info">
              <h3>Valeurs nutritionnelles totales</h3>
              <p>Calories : {totalNutrition.calories} kcal</p>
              <p>Protéines : {totalNutrition.protein} g</p>
              <p>Graisses : {totalNutrition.fat} g</p>
              <p>Glucides : {totalNutrition.carbs} g</p>
            </div>
          )}
          {error?.message && <p className="error">{error.message}</p>}
        </div>
      </div>
    </Form>
  );
}
export default AjouterRecette;
