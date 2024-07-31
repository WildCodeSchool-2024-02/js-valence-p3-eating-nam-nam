import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { checkAuth } from "./api/api";

export function loader() {
  return checkAuth();
}

function App() {
  const isLoggedIn = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={isLoggedIn} />
      <Outlet context={searchQuery} />
      <Footer />
    </>
  );
}

export default App;
