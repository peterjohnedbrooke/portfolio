import React from 'react'
import styles from "./KnowWaste.module.scss"
import Card from '../Card/Card'

const KnowWaste = () => {
  const paragraph = "This was my first real world project for the Bristol based start-up company KnowWaste. The goal was to reduce food waste in University canteens by creating an application designed to order meals for students before meal-time. The website uses React, Javascript and deals with firebase on the database side. "
  const title = "know waste"

  return (
    <>
      <Card paragraph={paragraph} title={title} />
    </>
  )
}

export default KnowWaste