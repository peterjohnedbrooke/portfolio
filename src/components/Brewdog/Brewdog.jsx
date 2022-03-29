import React from 'react'
import styles from "./Brewdog.module.scss"
import SideNav from '../SideNav/SideNav'
import ExploreButton from '../ExploreButton/ExploreButton'
import Button from '../Button'
import Card from '../Card/Card'

const Brewdog = (props) => {
  const link = "https://peteredbrooke.github.io/brewdogAPI/";
  const title = "BrewDog Api"
  const paragraph = "This light-weight Brewdog Api calls on a restful api to retrieve beers info by text search or using the ABV% slider. Created in React Js using the brewdog API"


  return (
   <>
    <Card link={link} title={title} paragraph={paragraph}/>
   </>
  )
}

export default Brewdog