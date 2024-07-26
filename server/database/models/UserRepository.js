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

  async getUserById(id) {
    try {
      const [result] = await this.database.query(
        "SELECT * FROM user WHERE id = ?",
        [id]
      );
      return result.length > 0 ? result[0] : null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async insert(user) {
    const { username, email, birthdate, hashedPassword } = user;
    const query =
      "INSERT INTO user (username, email, birthdate, hashed_password) VALUES (?, ?, ?, ?)";
    const values = [username, email, birthdate, hashedPassword];

    const [result] = await this.database.query(query, values);
    return result;
  }
}

module.exports = UserRepository;
