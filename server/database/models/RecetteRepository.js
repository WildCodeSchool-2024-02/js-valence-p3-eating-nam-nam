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
    return rows[0];
  }

  async delete(recetteId) {
    // Execute the SQL DELETE query to retrieve a specific data by its ID
    await this.database.query(`delete from ${this.table} where id = ?`, [
      recetteId,
    ]);
    await this.database.query(`DELETE FROM step WHERE recette_id = ?`, [
      recetteId,
    ]);
    // Supprimer la recette elle-même
    const [result] = await this.database.query(
      `DELETE FROM recette WHERE id = ?`,
      [recetteId]
    );
    return result;
  }

  async deleteByRecetteId(recetteId) {
    const [result] = await this.database.query(
      `DELETE FROM ingredient_for_recette WHERE recette_id = ?`,
      [recetteId]
    );
    return result;
  }

  async publish(recetteId) {
    const [result] = await this.database.query(
      `update ${this.table} set published = 1 where id = ?`,
      [recetteId]
    );
    return result;
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
      // Insert ingredients
      const ingredientPromises = ingredients.map((ingredient) =>
        // 1. Pour chaque ingrédient, vérifier s'il existe en bdd
        // et s'il n'existe pas, le créer
        transaction.query(
          `REPLACE INTO ingredient (name)
         VALUES (?)`,
          [ingredient]
        )
      );
      const resultIngredientPromises = await Promise.all(ingredientPromises);
      const ingredientIDs = resultIngredientPromises.map(
        ([entry]) => entry.insertId
      );
      // Insérer les données de jointure ingredientsRecette
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
