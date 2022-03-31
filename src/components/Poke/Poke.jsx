import React from 'react'
import Card from '../Card/Card';
import styles from "./Poke.module.scss"


const Poke = (props) => {
  const link = " https://peteredbrooke.github.io/pokeapi/";
  const paragraph = "This light-weight interactive pokedex api was built in React Js calling on the restful pokeapi. The pokedex design was created in Adobe Photoshop"
  const title = "poke api"

  return (
    <>
    <Card link={link} paragraph={paragraph} title={title} />
    </>
  )
}

export default Poke