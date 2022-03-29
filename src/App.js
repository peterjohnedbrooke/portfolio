import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import SideNav from "./components/SideNav/SideNav";
import Projects from "./components/Projects/Projects";
import About from "./components/About/About";
import Poke from "./components/Poke/Poke";
import Calculator from "./components/Calculator/Calculator";
import Brewdog from "./components/Brewdog/Brewdog";
import KnowWaste from "./components/KnowWaste/KnowWaste";
import Morse from "./components/Morse/Morse";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Landing />} />
            <Route path="projects" element={<Projects />} />
            <Route path="pokeapi" element={<Poke />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="brewdog" element={<Brewdog />} />
            <Route path="morse" element={<Morse />} />
            <Route path="knowwaste" element={<KnowWaste />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
