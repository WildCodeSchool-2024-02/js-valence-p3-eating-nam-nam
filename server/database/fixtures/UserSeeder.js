const argon2 = require("argon2");
const AbstractSeeder = require("./AbstractSeeder");
const { hashingOptions } = require("../../app/services/authMiddleware");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }
  // The run method - Populate the 'user' table with fake data

  async run() {
    // Generate fake host data

    const fakeUsers = Array.from({ length: 20 }, (_, i) => ({
      username: this.faker.internet.userName(),
      // Generate a fake username using faker library
      email: this.faker.internet.email(),
      // Generate a fake email using faker library

      name: this.faker.person.firstName(), // Generate a fake username using faker library
      last_name: this.faker.person.lastName(), // Generate a fake username using faker library
      birthdate: this.faker.date.birthdate(), // Generate a fake username using faker library
      refName: `user_${i}`,
    }));
    const hashedPasswords = await Promise.all(
      fakeUsers.map((user) => argon2.hash(user.email, hashingOptions))
    );
    fakeUsers.forEach((user, index) => {
      const fakeUser = {
        ...user,
        hashed_password: hashedPasswords[index],
      };
      this.insert(fakeUser);
    });
  }
}
// Export the UserSeeder class
module.exports = UserSeeder;
