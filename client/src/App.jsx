import "./App.css";
import RecettesFavorites from "./components/RecettesFavorites";
import ConsulterRecettesGenerales from "./components/ConsulterRecettesGenerales";

function App() {
  return (
    <>
      <RecettesFavorites />
      <h1>Cabillaud</h1>
      <p>101 résultats</p>
      <ConsulterRecettesGenerales />
    </>
  );
}

export default App;
