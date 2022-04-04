import React from 'react'
import styles from "./Morse.module.scss"
import Card from '../Card/Card'

const Morse = () => {
  const link = "https://peterjohnedbrooke.github.io/morse/";
  const title = "morse translator"
  const paragraph= "This was an early project which involved translating english to morse code using Javascript" 
  return (
    <>
      <Card link={link} title={title} paragraph={paragraph}/>
    </>
  )
}

export default Morse