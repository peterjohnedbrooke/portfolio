import React from 'react'
import styles from "./Morse.module.scss"
import Card from '../Card/Card'

const Morse = () => {
  const link = "https://peteredbrooke.github.io/morse-translator/";
  const title = "morse translator"
  const paragraph= "This was an early poject which involved translating engligh to more code using Javascript" 
  return (
    <>
      <Card link={link} title={title} paragraph={paragraph}/>
    </>
  )
}

export default Morse