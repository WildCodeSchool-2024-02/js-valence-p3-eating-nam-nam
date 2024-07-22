const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async getUsers() {
    try {
      const [result] = await this.database.query("SELECT * FROM user");
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async readWithPassword(email) {
    try {
      const [result] = await this.database.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );
      return result[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getUserById(id) {
    try {
      const [result] = await this.database.query(
        "SELECT * FROM user WHERE id = ?",
        [id]
      );
      return result[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = UserRepository;
