import "../styles/Login.css";
import { Link, redirect, Form, useNavigation } from "react-router-dom";
import login from "../api";

export async function action({ request }) {
  const formData = await request.formData();
  await login(formData);
  return redirect("/");
}

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="login_page">
      <div className="login_title">
        <h1>Se connecter</h1>
        <h2>Bienvenue sur notre site</h2>
        <Form method="post" className="login_form">
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
          <br />
          <div className="log_button">
            <button
              type="submit"
              className="link_button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Connexion ..." : "Se connecter"}
            </button>
          </div>
        </Form>
        <br />
        <br />
        <p style={{ color: "black" }}>Ou</p>
        <br />
        <br />
        <Link to="/inscription">
          <div className="inscription_button">
            <button type="button">S'inscrire</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
