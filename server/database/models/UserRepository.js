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

  async delete(userId) {
    // Execute the SQL DELETE query to retrieve a specific data by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [userId]
    );

    return result;
  }
}

module.exports = UserRepository;
