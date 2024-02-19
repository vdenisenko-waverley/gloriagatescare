"use client";

import { Flex, Button } from "antd";
import styles from "./SingleChoice.module.css";
import StepLabel from "../StepLabel";
import Image, { type StaticImageData } from "next/image";

const SingleChoice = ({
  label,
  options,
  activeOption,
  onStepChange,
}: {
  label: string;
  options: Array<{ text: string; value: string; icon: StaticImageData }>;
  activeOption: string;
  onStepChange: (offset: 1 | -1, label: string, value: string) => void;
}) => {
  return (
    <div className="flexContent">
      <StepLabel
        primaryText={label}
        secondaryText="Swipe to choose your answer"
      />
      <Flex
        className={styles.optionsWrapper}
        gap="small"
        align="flex-start"
        justify="space-between"
      >
        {options.map(({ text, value, icon }, i) => (
          <Button
            className={`${styles.btn} ${
              value === activeOption ? styles.active : ""
            }`}
            type="text"
            shape="round"
            key={`option_${i}`}
            onClick={() => onStepChange(1, label, value)}
          >
            <span className={styles.btnIndex}>{i + 1}</span>
            <span className={styles.circle}>
              <Image className={styles.icon} src={icon} alt="" />
            </span>
            <span className={styles.btnText}>{text}</span>
          </Button>
        ))}
      </Flex>
    </div>
  );
};

export default SingleChoice;
