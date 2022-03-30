import "./App.css";
import React from "react";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Projects from "./components/Projects/Projects";
import About from "./components/About/About";
import Poke from "./components/Poke/Poke";
import Calculator from "./components/Calculator/Calculator";
import Brewdog from "./components/Brewdog/Brewdog";
import KnowWaste from "./components/KnowWaste/KnowWaste";
import Morse from "./components/Morse/Morse";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/portfolio" element={<NavBar />}>
            <Route index element={<Landing />} />
            <Route path="portfolio/projects" element={<Projects />} />
            <Route path="portfolio/pokeapi" element={<Poke />} />
            <Route path="portfolio/calculator" element={<Calculator />} />
            <Route path="portfolio/brewdog" element={<Brewdog />} />
            <Route path="portfolio/morse" element={<Morse />} />
            <Route path="portfolio/knowwaste" element={<KnowWaste />} />
            <Route path="portfolio/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
