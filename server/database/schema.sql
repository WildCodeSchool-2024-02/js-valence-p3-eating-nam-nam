create table user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_admin BOOLEAN NOT NULL DEFAULT 0,
  password VARCHAR(255) NOT NULL
);

create table recettes (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  image VARCHAR(255) NOT NULL,
  ingredient VARCHAR(255) NOT NULL,
  serving INT NOT NULL,
  nutritional_values VARCHAR(255) NOT NULL,
  is_validate BOOLEAN NOT NULL DEFAULT 0,
  foreign key(user_id) references user(id)
);

CREATE TABLE ingrédients (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
);

CREATE TABLE steps (
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  recipe_id INT NOT NULL,
  text TEXT NOT NULL,
  FOREIGN KEY(recette_id) REFERENCES recettes(id)
);
