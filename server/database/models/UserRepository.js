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

  async insert(user) {
    const { username, name, lastName, email, birthdate, hashedPassword } = user;
    const query =
      "INSERT INTO user (username, name, last_name, email, birthdate, hashed_password) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [username, name, lastName, email, birthdate, hashedPassword];

    const [result] = await this.database.query(query, values);
    return result;
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
