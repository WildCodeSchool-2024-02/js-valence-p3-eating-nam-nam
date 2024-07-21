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
         (title, user_id, image, serving, nutritional_values, published) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          recette.title,
          recette.userId,
          recette.image,
          recette.serving,
          recette.nutritionalValues,
          recette.published,
        ]
      );
      const recetteId = recetteResult.insertId;

      // Insert steps
      const stepPromises = steps.map((step) =>
        transaction.query(`INSERT INTO step (recette_id, text) VALUES (?, ?)`, [
          recetteId,
          step.text,
        ])
      );
      await Promise.all(stepPromises);

      // Insert ingredients
      const ingredientPromises = ingredients.map((ingredient) =>
        transaction.query(
          `INSERT INTO ingredient_for_recette (recette_id, ingredient_id)
           VALUES (?, ?)`,
          [recetteId, ingredient.id]
        )
      );
      await Promise.all(ingredientPromises);
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
