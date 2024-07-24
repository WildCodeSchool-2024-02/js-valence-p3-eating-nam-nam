import { useState, useEffect } from "react";
import "./ajouterRecette.css";
import { Form } from "react-router-dom";

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

const nutritionData = {
  farine: { calories: 364, proteins: 10, fats: 1, carbs: 76 },
  sucre: { calories: 387, proteins: 0, fats: 0, carbs: 100 },
  beurre: { calories: 717, proteins: 0.85, fats: 81, carbs: 0.06 },
  carotte: { calories: 41, proteins: 0.9, fats: 0.2, carbs: 10 },
};

function AjouterRecette() {
  const [titre, setTitre] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: Date.now(), quantity: "", unit: "g", name: "" },
  ]);
  const [steps, setSteps] = useState([{ id: Date.now(), step: "" }]);
  const [authorName, setAuthorName] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState(null);
  const [nutritionalValues, setNutritionalValues] = useState({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  });

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
      { id: Date.now(), quantity: "", unit: "g", name: "" },
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

  const handleStepChange = (id, value) => {
    const lines = value.split("\n");
    setSteps(
      steps.map((step) =>
        step.id === id
          ? {
              ...step,
              step: lines.length <= 3 ? value : lines.slice(0, 3).join("\n"),
            }
          : step
      )
    );
  };

  const handleNoteChange = (value) => {
    const lines = value.split("\n");
    setNote(lines.length <= 3 ? value : lines.slice(0, 3).join("\n"));
  };

  const handlePhotoChange = (e) => {
    const [file] = e.target.files;
    setPhoto((prevPhoto) => file);
  };

  useEffect(() => {
    const totalNutritionalValues = ingredients.reduce(
      (totals, ingredient) => {
        const { quantity, name, calories, proteins, fats, carbs } = ingredient;
        const ingredientData = nutritionData[name.toLowerCase()];
        const newTotals = { ...totals };
        if (ingredientData && quantity) {
          const quantityInGrams = parseFloat(quantity);
          newTotals.calories +=
            (ingredientData.calories * quantityInGrams) / 100;
          newTotals.proteins +=
            (ingredientData.proteins * quantityInGrams) / 100;
          newTotals.fats += (ingredientData.fats * quantityInGrams) / 100;
          newTotals.carbs += (ingredientData.carbs * quantityInGrams) / 100;
        } else if (quantity) {
          const quantityInGrams = parseFloat(quantity);
          newTotals.calories += (parseFloat(calories) * quantityInGrams) / 100;
          newTotals.proteins += (parseFloat(proteins) * quantityInGrams) / 100;
          newTotals.fats += (parseFloat(fats) * quantityInGrams) / 100;
          newTotals.carbs += (parseFloat(carbs) * quantityInGrams) / 100;
        }
        return newTotals;
      },
      { calories: 0, proteins: 0, fats: 0, carbs: 0 }
    );
    setNutritionalValues(totalNutritionalValues);
  }, [ingredients]);

  const handleConfirmation = () => {
    // Logique de confirmation ici
  };

  return (
    <Form method="POST">
      <div className="ajouterRecette">
        <h1>Ajouter une recette</h1>

        <h2>Je choisis un titre :</h2>
        <input
          name="title"
          maxLength="30"
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Entrez le titre de votre recette (30 caractères maximum)"
          className="title-input"
        />

        <h2>Choisir les ingrédients</h2>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="ingredient">
            <input
              name={`ingredients[${ingredient.id}]`}
              type="number"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(
                  ingredient.id,
                  "quantity",
                  e.target.value
                )
              }
              placeholder="Quantité"
            />
            <select
              name={`ingredients[${ingredient.id}]`}
              value={ingredient.unit}
              onChange={(e) =>
                handleIngredientChange(ingredient.id, "unit", e.target.value)
              }
            >
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="unité">unité</option>
            </select>
            <input
              name={`ingredients[${ingredient.id}]`}
              type="text"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(ingredient.id, "name", e.target.value)
              }
              placeholder="Nom de l'ingrédient"
            />
            <button
              type="button"
              onClick={() => removeIngredient(ingredient.id)}
            >
              Supprimer
            </button>
          </div>
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
              onChange={(e) => handleStepChange(step.id, e.target.value)}
              placeholder={`Étape ${steps.indexOf(step) + 1} : Rédigez des instructions courtes et claires, en procédant étape par étape (3 lignes maximum par étape soit 310 caractères)`}
            />
            <button type="button" onClick={() => removeStep(step.id)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={addStep}>
          Ajouter une étape de préparation
        </button>

        <h2>Temps de préparation</h2>
        <div className="time-input">
          <label htmlFor="prep-time">
            Veuillez choisir un temps de préparation en heures et minutes
            (format hh:mm)
          </label>
        </div>

        <h2>Temps de cuisson</h2>
        <div className="time-input">
          <label htmlFor="cook-time">
            Veuillez choisir un temps de cuisson en heures et minutes (format
            hh:mm)
          </label>
        </div>

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
        </div>

        <h2>Valeurs nutritionnelles</h2>
        <input
          type="hidden"
          name="nutritional_values"
          value="Données non disponible"
        />
        <div className="valeurs-nutri">
          <p>Calories: {nutritionalValues.calories.toFixed(2)}</p>
          <p>Protéines: {nutritionalValues.proteins.toFixed(2)}g</p>
          <p>Graisses: {nutritionalValues.fats.toFixed(2)}g</p>
          <p>Glucides: {nutritionalValues.carbs.toFixed(2)}g</p>
        </div>

        <h2>Nom de l'auteur</h2>
        <input
          name="username"
          maxLength="30"
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Entrez votre nom (30 caractères maximum)"
          className="name-input"
        />

        <h2>Rédigez un commentaire sur votre recette</h2>
        <div className="commentaire-auteur">
          <button type="submit">Confirmer</button>
        </div>
      </div>
    </Form>
  );
}

export default AjouterRecette;
