const AbstractRepository = require("./AbstractRepository");

class RecetteRepository extends AbstractRepository {
  constructor() {
    // Transmet le nom de la table "item" comme configuration
    super({ table: "recette" });
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific data by its ID
    const [[rows]] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async delete(recetteId) {
    // Execute the SQL DELETE query to retrieve a specific data by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [recetteId]
    );

    return result;
  }
}

module.exports = RecetteRepository;
