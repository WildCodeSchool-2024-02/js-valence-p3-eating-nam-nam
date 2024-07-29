const AbstractRepository = require("./AbstractRepository");

class RecetteRepository extends AbstractRepository {
  constructor() {
    super({ table: "recette" });
  }

  async read(id) {
    const [[rows]] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows;
  }

  async create(recette, steps, ingredients) {
    const transaction = await this.database.getConnection();

    try {
      await transaction.beginTransaction();

      // Insert recette
      const [recetteResult] = await transaction.query(
        `INSERT INTO recette 
         (title, user_id, picture, serving, nutritional_values) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          recette.title,
          recette.userId,
          recette.picture,
          recette.serving,
          recette.nutritionalValues,
        ]
      );
      const recetteId = recetteResult.insertId;

      // Insert steps
      const stepPromises = steps.map((step) =>
        transaction.query(`INSERT INTO step (recette_id, text) VALUES (?, ?)`, [
          recetteId,
          step,
        ])
      );
      await Promise.all(stepPromises);

      const ingredientPromises = ingredients.map((ingredient) =>
        // 1. pour chaque ingredient verifier s'il existe en bdd
        // et s'il n'existe pas le creer
        transaction.query(
          `REPLACE INTO ingredient (name)
         VALUES (?)`,
          [ingredient]
        )
      );
      const resultIngredentPromises = await Promise.all(ingredientPromises);

      const ingredientIDs = resultIngredentPromises.map(
        ([entry]) => entry.insertId
      );

      // Inserer donnees de jointure ingredientsRecette
      const ingredientRecettePromises = ingredients.map((ingredient, index) =>
        transaction.query(
          `INSERT INTO ingredient_for_recette (recette_id, ingredient_id)
           VALUES (?, ?)`,
          [recetteId, ingredientIDs[index]]
        )
      );
      await Promise.all(ingredientRecettePromises);
      await transaction.commit();
      return recetteId;
    } catch (error) {
      await transaction.rollback();
      throw error;
    } finally {
      transaction.release();
    }
  }
}

module.exports = RecetteRepository;
