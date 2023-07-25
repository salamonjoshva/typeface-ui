import React from "react";
import styles from "./LoadingSpinner.module.css";
import { ReactComponent as LoadingSvg } from "../../assests/loadingSpinner.svg";

const LoadingSpinner = (props) => {
  return <LoadingSvg className={styles.loadingSpinner} />;
};

export default LoadingSpinner;
