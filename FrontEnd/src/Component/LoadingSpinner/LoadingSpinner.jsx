// LoadingSpinner.js
import React from "react";
import styles from "./LoadingSpinner.module.css"; // We will define the styles next

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
