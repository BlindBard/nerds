import React from "react";
import styles from "./styles.module.scss";

export default ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);
