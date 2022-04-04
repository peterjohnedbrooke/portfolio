import React from 'react'
import styles from "./Landing.module.scss"
import { Row, Col, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from "../Logo";
import {faSass, faHtml5, faCss3, faReact, faJsSquare } from "@fortawesome/free-brands-svg-icons"
import SideNav from '../SideNav/SideNav';



export const Landing = (props) => {
  const {clickLogo} = props;
  // window.onpopstate = () => {
  //   window.location.reload()
  // }
  
  const sass = <FontAwesomeIcon icon={faSass} />
  const hyper = <FontAwesomeIcon icon={faHtml5} />
  const css = <FontAwesomeIcon icon={faCss3} />
  const react = <FontAwesomeIcon icon={faReact} />
  const javas = <FontAwesomeIcon icon={faJsSquare} />


  return (
    <>
    <div className={clickLogo === true ? `${styles.logoMove}` : `${styles.logoStatic}`}>
          <h2 className={styles.introText}>pje.</h2>
          <h2 className={styles.introText2}>pje.</h2>
        </div>
    <div className={styles.landingWrapper}>
      <div className={styles.landingList}>
        {/* <h2>Created with..</h2> */}
        <span>{sass}</span>
        <span>{hyper}</span>
        <span>{css}</span>
        <span>{react}</span>
        <span>{javas}</span>
      </div>
      <div>
        {/* <h4>*under development</h4> */}
      </div>
    </div>
    <SideNav></SideNav>
    </>
  )
}

export default Landing