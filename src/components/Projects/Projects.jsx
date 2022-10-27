import React, { useState } from 'react'
import styles from "./Projects.module.scss"
import Card from "../Card/Card";
import { Outlet, Link } from "react-router-dom";
import SideNav from '../SideNav/SideNav';
import Logo from '../Logo';
// import { Row, Col, Container, Card } from 'react-bootstrap';

export const Projects = (props) => {
  const linkPoke = <Link to="/pokeapi">explore</Link>;
  const [layout, setLayout] = useState(false)
  const handleLayout = () => {
    setLayout(true);
  }

  return (
    <>
      <Logo></Logo>
      <div className={styles.wrapper} >
        <div className={styles.projectsContainer}>
          <ul>
            <li>
              erbium records.
              <Link to="/erbium">View</Link>
            </li>
            <li>
              cut above.
              <Link to="/cutabove">View</Link>
            </li>
            <li>
              poke api.
              <Link to="/pokeapi">View</Link>
            </li>
            <li>
              brewdog api.
              <Link to="/brewdog">View</Link>
            </li>
            <li>
              calculator.
              <Link to="/calculator">View</Link>
            </li>
          </ul>
        </div>
        {/* <div className={styles.sideNavBackground}>
          <SideNav ></SideNav>
        </div> */}
      </div>
      <div className={styles.sideNavBackgroundActive}>
        <SideNav></SideNav>
      </div>
      <Outlet />
    </>
  )
}

export default Projects;

// change the navbar when in mobile mode to handleClick in different way
// make flippable cards for the projects page, one side with title, the other side with view button
// change design of morse translator
// add in moving div with images of whats been used
// add back arrow to pages 