import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export default ({ className, onClick, children, disabled }) => (
  <button
    className={cn(styles.btn, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
