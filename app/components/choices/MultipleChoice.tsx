"use client";

import { useState } from "react";
import { Flex, Button } from "antd";
import styles from "./MultipleChoice.module.css";
import StepLabel from "../StepLabel";
import BtnSubmit from "../forms/BtnSubmit";

const MultipleChoice = ({
  label,
  options,
  activeOption,
  onStepChange,
}: {
  label: string;
  options: Array<{ text: string; value: string; icon: string }>;
  activeOption: string;
  onStepChange: (offset: 1 | -1, label: string, value: string) => void;
}) => {
  const [values, setValues] = useState<string[]>(
    activeOption ? activeOption.split(",") : []
  );

  const toggle = (value: string) => {
    const index = values.indexOf(value);
    const newValues = values.slice();
    if (index !== -1) {
      newValues.splice(index, 1);
    } else {
      newValues.push(value);
    }
    setValues(newValues);
  };

  return (
    <div className="flexContent">
      <StepLabel primaryText={label} secondaryText="Multiple choice" />
      <Flex
        className={styles.optionsWrapper}
        vertical
        gap={16}
        align="flex-start"
        justify="space-between"
      >
        {options.map(({ text, value, icon }, i) => (
          <Button
            className={`${styles.btn} ${
              values.indexOf(value) !== -1 ? styles.active : ""
            }`}
            block
            key={`option_${i}`}
            onClick={(e) => toggle(value)}
          >
            <span
              className={styles.textIcon}
              dangerouslySetInnerHTML={{ __html: icon }}
            />
            <span className={styles.btnText}>{text}</span>
          </Button>
        ))}
        <BtnSubmit
          onClick={(e) => onStepChange(1, label, values.join(","))}
        >
          Submit
        </BtnSubmit>
      </Flex>
    </div>
  );
};

export default MultipleChoice;
