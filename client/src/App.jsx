import { useState } from "react";

import "./App.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <Outlet context={searchQuery} />
      <Footer />
    </>
  );
}

export default App;
