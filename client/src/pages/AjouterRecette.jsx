import { useState } from "react";
import "../styles/ajouterRecette.css";
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

function IngredientField({
  ingredient: { id, quantity, unit, name },
  onChange,
  onRemove,
}) {
  const handleQuantityChange = (e) => {
    const { value } = e.target;
    onChange(id, "quantity", value);
  };

  const handleQuantityBlur = () => {
    let value = quantity;

    if (value === "" || Number.isNaN(Number(value))) {
      value = unit === "kg" ? 0.1 : 100;
    } else {
      value = parseFloat(value);
      if (unit === "kg") {
        value = Math.max(0.1, Math.min(5, value));
      } else {
        value = Math.max(100, Math.min(5000, value));
      }
    }

    onChange(id, "quantity", value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value.slice(0, 30); // Limiter à 30 caractères
    onChange(id, "name", value);
  };

  return (
    <div className="ingredient">
      <input
        type="number"
        min={unit === "kg" ? 0.1 : 100}
        max={unit === "kg" ? 5 : 5000}
        step={unit === "kg" ? 0.1 : 1}
        value={quantity}
        onChange={handleQuantityChange}
        onBlur={handleQuantityBlur}
        placeholder="Entrez la quantité (de 100 à 5000gr)"
      />
      <select
        value={unit}
        onChange={(e) => {
          const newUnit = e.target.value;
          let newQuantity = quantity;

          if (unit === "g" && newUnit === "kg") {
            newQuantity /= 1000;
          } else if (unit === "kg" && newUnit === "g") {
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
      <input
        name={`ingredients[${id}][name]`}
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Nom de l'ingrédient"
        maxLength="30"
      />
      <div className="char-count">{30 - name.length} caractères restants</div>
      <button type="button" onClick={() => onRemove(id)}>
        Supprimer
      </button>
    </div>
  );
}

function AjouterRecette() {
  const [titre, setTitre] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: Date.now(), quantity: 100, unit: "g", name: "" },
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

  const handleStepChange = (id, value) => {
    setSteps(
      steps.map((step) => (step.id === id ? { ...step, step: value } : step))
    );
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), quantity: 100, unit: "g", name: "" },
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
    if (value === "") {
      setServing(value);
    } else {
      const numValue = parseInt(value, 10); // Ajout du paramètre radix
      setServing(Math.max(1, Math.min(10, numValue)));
    }
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
            onBlur={() => {
              if (serving === "" || Number.isNaN(Number(serving))) {
                setServing(1);
              }
            }}
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
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Ajouter un ingrédient
        </button>

        <h2>Étapes de préparation</h2>
        {steps.map(({ id, step }) => (
          <div key={id} className="step">
            <textarea
              name={`steps[${id}]`}
              maxLength="310"
              value={step}
              onChange={(e) => handleStepChange(id, e.target.value)}
              placeholder={`Étape ${
                steps.indexOf(step) + 1
              } : Rédigez des instructions courtes et claires, en procédant étape par étape (310 caractères maximum)`}
            />
            <div className="char-count">
              {310 - step.length} caractères restants
            </div>
            <button type="button" onClick={() => removeStep(id)}>
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
