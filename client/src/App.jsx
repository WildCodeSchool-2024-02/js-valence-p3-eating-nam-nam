import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <Outlet context={searchQuery} />
      <Footer/>

    </>
  );
}

export default App;
