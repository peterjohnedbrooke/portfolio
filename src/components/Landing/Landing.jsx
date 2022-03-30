import React from 'react'
import styles from "./Landing.module.scss"
import { Row, Col, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../Logo';
import SideNav from '../SideNav/SideNav';



export const Landing = () => {
  return (
    <>
    <div className={styles.landingContainerMain}>
            <SideNav></SideNav> 
    </div>
    </>
  )
}

export default Landing