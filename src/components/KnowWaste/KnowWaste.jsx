import React from 'react'
import styles from "./KnowWaste.module.scss"
import Card from '../Card/Card'
import { Link, Outlet } from 'react-router-dom'
import SideNav from '../SideNav/SideNav'

const KnowWaste = () => {
  const paragraph = "This was my first real world project for the Bristol based start-up company KnowWaste. The goal was to reduce food waste in University canteens by creating an application designed to order meals for students before meal-time. The website uses React, Javascript and deals with firebase on the database side. "
  const title = "know waste"
  const metalink = <Link to="./knowwasteinfo">explore</Link>
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
        <div className={styles.textBox}>
            <h2>Know waste</h2>
            <button className={styles.exploreButton}>
              <Link to="/knowwasteinfo">explore</Link>
            </button>
          </div>
          <div>
            <p>This was my first real world project for the Bristol based start-up company KnowWaste. The goal was to reduce food waste in University canteens by creating an application designed to order meals for students before meal-time. The website uses React, Javascript and deals with firebase on the database side. </p> 
          </div>
        </div>
        
    </div>
    <div className={styles.sideNavBackgroundActive}>
      <SideNav></SideNav>
    </div>
    <Outlet/>
    </>
  )
}

export default KnowWaste