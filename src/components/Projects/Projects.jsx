import React, { useState } from 'react'
import styles from "./Projects.module.scss"
import Card from "../Card/Card";
import {Outlet, Link} from "react-router-dom";
// import { Row, Col, Container, Card } from 'react-bootstrap';

export const Projects = (props) => {
  const linkPoke = <Link to="/pokeapi">explore</Link>;
  const [layout, setLayout] = useState(false)
  const handleLayout = () => {
    setLayout(true);
  }

  return (
    <>
      <div className={styles.container} >
        <div className={styles.projectsWrapper}>
          <Card title="Poke api" handleLayout={handleLayout} linkPoke={linkPoke} />
          <Card  title="Js Calculator" handleLayout={handleLayout}  />
          <Card title="Morse Translator" handleLayout={handleLayout} />
          <Card title="BrewDog api" handleLayout={handleLayout} />
          <Card title="KnowWaste" handleLayout={handleLayout} />
          <Card title="Project #1" handleLayout={handleLayout}  />
        </div>
        <Outlet/>
      </div>
    </>
  )
}

export default Projects;