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

  async create(recetteData) {
    // requete 1 ajouter toutes les etapes dans la table step

    // requete 2 ajouter tous les ingredients dans la table ingredient

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} SET ?`,
      [recetteData]
    );

    return result;
  }
}

module.exports = RecetteRepository;
