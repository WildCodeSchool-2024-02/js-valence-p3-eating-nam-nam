const AbstractRepository = require("./AbstractRepository");

class StepRepository extends AbstractRepository {
  constructor() {
    // Transmet le nom de la table "steps" comme configuration
    super({ table: "steps" });
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific step by its ID
    const [[rows]] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows;
  }

  // Méthode pour effectuer un join avec la table "ingredients"
  async readWithIngredients(recipeId) {
    const query = `
      SELECT s.*, i.*
      FROM ${this.table} s
      JOIN ingredients i ON s.recipe_id = i.recette_id
      WHERE s.recipe_id = ?
    `;

    const [[rows]] = await this.database.query(query, [recipeId]);
    return rows;
  }
}

module.exports = StepRepository;
