import { redirect, Form, useNavigation } from "react-router-dom";
import { register } from "../api/api";
import "../styles/Inscription.css";

export async function action({ request }) {
  const formData = await request.formData();
  await register(formData);
  return redirect("/");
}

function Inscription() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      event.preventDefault();
      alert("Les mots de passe ne correspondent pas !");
    }
  };

  return (
    <div className="inscription_page">
      <div className="inscription_title">
        <div className="inscription">S'inscrire</div>
        <div className="rejoindre">Rejoignez la communauté Eating Nam Nam</div>
        <div className="info_inscription">
          <Form method="post" onSubmit={handleSubmit}>
            <div className="inscription_form">
              <input
                type="text"
                name="username"
                placeholder="Entrez votre pseudo"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Entrez votre prénom"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Entrez votre nom"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Entrez votre adresse mail"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                required
              />
              <input type="date" name="birthdate" required />
            </div>

            <div className="inscription_button">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Inscription ..." : "S'inscrire"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Inscription;
