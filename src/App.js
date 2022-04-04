import "./App.css";
import { React, useState, useEffect } from "react";
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
import KnowWastePage from "./components/KnowWastePage";

const App = () => {
  // window add event listener, if projects component is visible then reset

  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Landing />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/pokeapi" element={<Poke />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/brewdog" element={<Brewdog />} />
            <Route path="/morse" element={<Morse />} />
            <Route path="/knowwaste" element={<KnowWaste />} />
            <Route path="/about" element={<About />} />
            <Route path="/knowwasteinfo" element={<KnowWastePage />} />
          </Route>
        </Routes>
      </>
    </>
  );
};

export default App;
