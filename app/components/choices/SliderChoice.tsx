"use client";

import { Button, Slider, Typography } from "antd";
import styles from "./SliderChoice.module.css";
import StepLabel from "../StepLabel";
import { useRef, useState } from "react";
const { Paragraph } = Typography;

const SliderChoice = ({
  label,
  min,
  max,
  onStepChange,
}: {
  label: string;
  min: number;
  max: number;
  onStepChange: (offset: 1 | -1, label: string, value: string) => void;
}) => {
  const [value, setValue] = useState(3);
  const sliderRef = useRef<any>(null);

  const onChange = (newValue: number) => {
    setValue(newValue);
  };

  const onChangeComplete = (value: number) => {
    onStepChange(1, label, value.toString());
  };

  return (
    <div className="flexContent">
      <div className={styles.top}>
        <StepLabel
          primaryText={label}
          secondaryText="Swipe to choose your answer"
        />
        <Paragraph className={styles.currentValue}>{value}</Paragraph>
        <Slider
          ref={sliderRef}
          className={styles.slider}
          range={false}
          min={min}
          max={max}
          value={value}
          tooltip={{ open: false }}
          onChange={onChange}
          onChangeComplete={onChangeComplete}
        />
      </div>
      <div className={styles.bottom}>
        <Button type="primary">Primary Button</Button>
      </div>
    </div>
  );
};

export default SliderChoice;
