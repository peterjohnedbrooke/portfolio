import React from 'react'
import styles from "./Calculator.module.scss"
import Card from '../Card/Card';

const Calculator = (props) => {
  const link = "https://peteredbrooke.github.io/calculator/";
  const title = "Js Calculator.";
  const paragraph = "This project was one of the first undertaken on my coding course, it involved a basic html, css and Javascript files to create a fully operational and basic calculator";

  return (
    <>
      <Card link={link} title={title} paragraph={paragraph}/>
    </>
  )
}

export default Calculator