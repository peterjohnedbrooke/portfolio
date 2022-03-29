import React from 'react'
import styles from "./KnowWaste.module.scss"
import SideNav from '../SideNav/SideNav'
import ExploreButton from '../ExploreButton/ExploreButton'
import Button from '../Button'

const KnowWaste = () => {
  return (
    <div className={styles.main}>
    <div className={styles.container}>
    <div className={styles.textBox}>
        <h2>know waste.</h2>
        <ExploreButton/>
      </div>
      <div>
        <p>This was my first real world project for the Bristol based start-up company KnowWaste. The goal was to reduce food waste in University canteens by creating an application designed to order meals for students before meal-time. The website uses React, Javascript and deals with firebase on the database side. </p>    
      </div>
      <div>
        <Button/>
      </div>
    </div>
    <div className={styles.sideNavBackground}>
      <SideNav></SideNav>
    </div>
    {/* <div className={styles.mainSecond}></div> */}
</div>
  )
}

export default KnowWaste