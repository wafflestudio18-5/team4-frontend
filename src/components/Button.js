import React from "react";
import styles from "./Button.module.scss";

const Button = ({title}) => {
  return (
    <button className={styles.button}>
      <p className={styles.buttonTitle}>{title}</p>
    </button>
  );
};

export default Button;