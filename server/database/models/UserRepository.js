const database = require("../client");

class UserRepository {
  constructor() {
    this.database = database;
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

module.exports = new UserRepository();
