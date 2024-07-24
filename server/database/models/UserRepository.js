const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async getUserById(id) {
    try {
      const [result] = await this.database.query(
        "SELECT * FROM user WHERE id = ?",
        [id]
      );
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = UserRepository;
