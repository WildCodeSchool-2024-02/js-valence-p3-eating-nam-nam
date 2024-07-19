import { useState, useEffect } from "react";
import "./ajouterRecette.css";
import { Form } from "react-router-dom";

export async function action({ request }) {
  try {
    const data = Object.fromEntries(await request.formData());

    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/recettes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    { quantity: "", unit: "g", name: "" },
  ]);
  const [newIngredients, setNewIngredients] = useState([
    {
      name: "",
      quantity: "",
      unit: "g",
      calories: "",
      proteins: "",
      fats: "",
      carbs: "",
    },
  ]);
  const [steps, setSteps] = useState([{ step: "" }]);
  const [authorName, setAuthorName] = useState("");
  const [note, setNote] = useState("");

  const [photos, setPhotos] = useState([null, null, null, null]);
  const [nutritionalValues, setNutritionalValues] = useState({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  });

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleNewIngredientChange = (index, field, value) => {
    const updatedNewIngredients = [...newIngredients];
    updatedNewIngredients[index][field] = value;
    setNewIngredients(updatedNewIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { quantity: "", unit: "g", name: "" }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // const addNewCustomIngredient = () => {
  //   setNewIngredients([
  //     ...newIngredients,
  //     {
  //       name: "",
  //       quantity: "",
  //       unit: "g",
  //       calories: "",
  //       proteins: "",
  //       fats: "",
  //       carbs: "",
  //     },
  //   ]);
  // };

  const removeNewIngredient = (index) => {
    const updatedNewIngredients = newIngredients.filter((_, i) => i !== index);
    setNewIngredients(updatedNewIngredients);
  };

  const addStep = () => {
    setSteps([...steps, { step: "" }]);
  };

  const removeStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const handleStepChange = (index, value) => {
    const lines = value.split("\n");
    const newSteps = [...steps];
    newSteps[index].step =
      lines.length <= 3 ? value : lines.slice(0, 3).join("\n");
    setSteps(newSteps);
  };

  const handleNoteChange = (value) => {
    const lines = value.split("\n");
    setNote(lines.length <= 3 ? value : lines.slice(0, 3).join("\n"));
  };

  const handlePhotoChange = (e, index) => {
    const newPhotos = [...photos];
    newPhotos[index] = e.target.files[0];
    setPhotos(newPhotos);
  };

  useEffect(() => {
    const totalNutritionalValues = ingredients.reduce(
      (totals, ingredient) => {
        const { quantity, name, calories, proteins, fats, carbs } = ingredient;
        const ingredientData = nutritionData[name.toLowerCase()];

        if (ingredientData && quantity) {
          const quantityInGrams = parseFloat(quantity);
          totals.calories += (ingredientData.calories * quantityInGrams) / 100;
          totals.proteins += (ingredientData.proteins * quantityInGrams) / 100;
          totals.fats += (ingredientData.fats * quantityInGrams) / 100;
          totals.carbs += (ingredientData.carbs * quantityInGrams) / 100;
        } else if (quantity) {
          const quantityInGrams = parseFloat(quantity);
          totals.calories += (parseFloat(calories) * quantityInGrams) / 100;
          totals.proteins += (parseFloat(proteins) * quantityInGrams) / 100;
          totals.fats += (parseFloat(fats) * quantityInGrams) / 100;
          totals.carbs += (parseFloat(carbs) * quantityInGrams) / 100;
        }

        return totals;
      },
      { calories: 0, proteins: 0, fats: 0, carbs: 0 }
    );

    setNutritionalValues(totalNutritionalValues);
  }, [ingredients, newIngredients]);

  return (
    <Form method="POST">
      <div className="ajouterRecette">
        <h1>Ajouter une recette</h1>

        <h2>Je choisis un titre :</h2>
        <input
          name={`titre`}
          maxLength="30"
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Entrez le titre de votre recette (30 caractères maximum)"
          className="title-input"
        />

        <h2>Choisir les ingrédients</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient">
            <input
              name={`ingredient.quantity_${index}`}
              type="number"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              placeholder="Quantité"
            />
            <select
              value={ingredient.unit}
              onChange={(e) =>
                handleIngredientChange(index, "unit", e.target.value)
              }
            >
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="unité">unité</option>
            </select>
            <input
              name={`ingredient.name_${index}`}
              type="text"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              placeholder="Nom de l'ingrédient"
            />
            <button onClick={() => removeIngredient(index)}>Supprimer</button>
          </div>
        ))}
        <button onClick={addIngredient}>Ajouter un ingrédient</button>
        {/* 
      <h2>Ajouter un nouvel ingrédient (si non trouvé dans la liste)</h2>
      {newIngredients.map((ingredient, index) => (
        <div key={index} className="ingredient">
          <input
            name={`ingredient.quantity`}
            type="number"
            value={ingredient.quantity}
            onChange={(e) =>
              handleNewIngredientChange(index, "quantity", e.target.value)
            }
            placeholder="Quantité"
          />
          <select
            value={ingredient.unit}
            onChange={(e) =>
              handleNewIngredientChange(index, "unit", e.target.value)
            }
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="unité">unité</option>
          </select>
          <input
            name={`ingredient.name`}
            type="text"
            value={ingredient.name}
            onChange={(e) =>
              handleNewIngredientChange(index, "name", e.target.value)
            }
            placeholder="Nom de l'ingrédient"
          />
          <input
            name={`ingredients.calories`}
            type="number"
            value={ingredient.calories}
            onChange={(e) =>
              handleNewIngredientChange(index, "calories", e.target.value)
            }
            placeholder="Calories"
          />
          <input
            name={`ingredient.proteins`}
            type="number"
            value={ingredient.proteins}
            onChange={(e) =>
              handleNewIngredientChange(index, "proteins", e.target.value)
            }
            placeholder="Protéines (g)"
          />
          <input
            name={`ingredient.fats`}
            type="number"
            value={ingredient.fats}
            onChange={(e) =>
              handleNewIngredientChange(index, "fats", e.target.value)
            }
            placeholder="Graisses (g)"
          />
          <input
            name={`ingredient.carbs`}
            type="number"
            value={ingredient.carbs}
            onChange={(e) =>
              handleNewIngredientChange(index, "carbs", e.target.value)
            }
            placeholder="Glucides (g)"
          />
          <button onClick={() => removeNewIngredient(index)}>Supprimer</button>
        </div>
      ))}
      <button onClick={addNewCustomIngredient}>
        Ajouter un nouvel ingrédient
      </button> */}

        <h2>Étapes de préparation</h2>
        {steps.map((step, index) => (
          <div key={index} className="step">
            <textarea
              name={`step.step_${index}`}
              maxLength="310"
              value={step.step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Étape ${index + 1} : Rédigez des instructions courtes et claires, en procédant étape par étape (3 lignes maximum par étape soit 310 caractères)`}
            />
            <button onClick={() => removeStep(index)}>Supprimer</button>
          </div>
        ))}
        <button onClick={addStep}>Ajouter une étape de préparation</button>

        <h2>Temps de préparation</h2>
        <div className="time-input">
          <label htmlFor="appt-time">
            Veuillez choisir un temps de préparation en heures et minutes
            (format hh:mm)
          </label>
          <input name={`time`} type="time" id="appt" required />
        </div>

        <h2>Temps de cuisson</h2>
        <div className="time-input">
          <label htmlFor="appt-time">
            Veuillez choisir un temps de cuisson en heures et minutes (format
            hh:mm)
          </label>
          <input name={`cooktimeheure-minute`} type="time" id="appt" required />
        </div>

        <h2>Photos</h2>
        <div className="photos">
          {photos.map((photo, index) => (
            <div key={index} className="photo-container">
              <label
                htmlFor={`photo-${index}`}
                className="photo-label"
                style={{
                  backgroundImage: photo
                    ? `url(${URL.createObjectURL(photo)})`
                    : "none",
                }}
              >
                {!photo && <span>Ajouter photo</span>}
              </label>
              <input
                name={`photo_${index}`}
                id={`photo-${index}`}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handlePhotoChange(e, index)}
              />
            </div>
          ))}
        </div>

        <h2>Valeurs nutritionnelles</h2>
        <div className="valeurs-nutri">
          <p>Calories: {nutritionalValues.calories.toFixed(2)}</p>
          <p>Protéines: {nutritionalValues.proteins.toFixed(2)}g</p>
          <p>Graisses: {nutritionalValues.fats.toFixed(2)}g</p>
          <p>Glucides: {nutritionalValues.carbs.toFixed(2)}g</p>
        </div>

        <h2>Nom de l'auteur</h2>
        <input
          name={`authorname`}
          maxLength="30"
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Entrez votre nom (30 caractères maximum)"
          className="name-input"
        />

        <h2>Rédigez un commentaire sur votre recette</h2>
        <div className="commentaire-auteur">
          <textarea
            name={`NoteChange`}
            maxLength="310"
            value={note}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Écrivez un commentaire (3 lignes maximum soit 310 caractères)..."
          />
          <button onClick={() => console.log("Confirmé")}>Confirmer</button>
        </div>
      </div>
    </Form>
  );
}

export default AjouterRecette;
