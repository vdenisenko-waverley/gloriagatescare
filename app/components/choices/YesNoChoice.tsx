"use client";

import { useRef, useState } from "react";
import { Button, Typography } from "antd";
import styles from "./YesNoChoice.module.css";
import StepLabel from "../StepLabel";

const YesNoPlainChoice = ({
  label,
  activeOption,
  onStepChange,
}: {
  label: string;
  activeOption: string;
  onStepChange: (offset: 1 | -1, label: string, value: string) => void;
}) => {
  return (
    <div className="flexContent">
      <StepLabel primaryText={label} />

      <div className={styles.buttons}>
        <Button
          className={`${styles.btn} ${
            activeOption === "No" ? styles.active : ""
          }`}
          type="text"
          onClick={() => onStepChange(1, label, "No")}
        >
          <span className={styles.textIcon}>&#128078;</span>
          <span className={styles.text}>No</span>
        </Button>
        <Button
          className={styles.btn}
          type="text"
          onClick={() => onStepChange(1, label, "Yes")}
        >
          <span className={styles.textIcon}>&#128077;</span>
          <span className={styles.text}>Yes</span>
        </Button>
      </div>
    </div>
  );
};

export default YesNoPlainChoice;
