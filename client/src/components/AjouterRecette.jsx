import { useState } from "react";
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

function IngredientField({ ingredient, onChange, onRemove }) {
  return (
    <div className="ingredient">
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
      <input
        name={`ingredients[${ingredient.id}][name]`}
        type="text"
        value={ingredient.name}
        onChange={(e) => onChange(ingredient.id, "name", e.target.value)}
        placeholder="Nom de l'ingrédient"
      />
      <button type="button" onClick={() => onRemove(ingredient.id)}>
        Supprimer
      </button>
    </div>
  );
}

function AjouterRecette() {
  const [titre, setTitre] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: Date.now(), quantity: "", unit: "g", name: "" },
  ]);
  const [steps, setSteps] = useState([{ id: Date.now(), step: "" }]);
  const [photo, setPhoto] = useState(null);
  const [serving, setServing] = useState(1);

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

  const handlePhotoChange = (e) => {
    const [file] = e.target.files;
    setPhoto(() => file);
  };

  return (
    <Form method="POST">
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
              placeholder={`Étape ${
                steps.indexOf(step) + 1
              } : Rédigez des instructions courtes et claires, en procédant étape par étape (3 lignes par étape soit 310 caractères maximum)`}
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
        </div>
        <button type="submit">Confirmer</button>
      </div>
    </Form>
  );
}

export default AjouterRecette;
