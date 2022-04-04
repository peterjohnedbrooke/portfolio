import React from 'react'
import styles from "./Landing.module.scss"
import { Row, Col, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSass, faHtml5, faCss3, faReact, faJsSquare } from "@fortawesome/free-brands-svg-icons"



export const Landing = (props) => {

  window.onpopstate = () => {
    window.location.reload()
  }
  
  const sass = <FontAwesomeIcon icon={faSass} />
  const hyper = <FontAwesomeIcon icon={faHtml5} />
  const css = <FontAwesomeIcon icon={faCss3} />
  const react = <FontAwesomeIcon icon={faReact} />
  const javas = <FontAwesomeIcon icon={faJsSquare} />


  return (
    <>
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
    </>
  )
}

export default Landing