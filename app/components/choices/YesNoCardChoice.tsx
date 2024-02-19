"use client";

import { useRef, useState } from "react";
import { Button } from "antd";
import styles from "./YesNoCardChoice.module.css";
import StepLabel from "../StepLabel";
import Image from "next/image";
import ArrowIcon from "../../icons/arrow-right.svg";

const YesNoChoice = ({
  label,
  activeOption,
  onStepChange,
}: {
  label: string;
  activeOption: string;
  onStepChange: (offset: 1 | -1, label: string, value: string) => void;
}) => {
  const [answer, setAnswer] = useState("");
  const overlayRef = useRef<any>(null);

  const animate = (key: string) => {
    const el = overlayRef.current;
    const onAnimationEnd = () => {
      el.style.display = "none";
      el.classList.remove(key);
      el.removeEventListener("animationend", onAnimationEnd);
    };

    el.style.display = "";
    el.classList.add(key);
    el.addEventListener("animationend", onAnimationEnd);
  };

  const onClickYes = (e: any) => {
    setAnswer("Yes");
    animate("animateYes");
    onStepChange(1, label, "Yes");
  };

  const onClickNo = (e: any) => {
    setAnswer("No");
    animate("animateNo");
    onStepChange(1, label, "No");
  };

  return (
    <div>
      <StepLabel secondaryText="You can swipe right or left to answer positive or negative respectively" />
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.top}>
            <p className={styles.text}>{label}</p>
          </div>
          <div className={styles.bottom}>
            <Button
              className={`${styles.btn} ${
                activeOption === "No" ? styles.active : ""
              }`}
              type="text"
              onClick={onClickNo}
            >
              <span className={styles.left}>
                <Image src={ArrowIcon} alt="" />
              </span>
              <span className={styles.right}>
                <span className={styles.textIcon}>&#128078;</span>
                <span className={styles.text}>No</span>
              </span>
            </Button>
            <Button
              className={`${styles.btn} ${
                activeOption === "No" ? styles.active : ""
              }`}
              type="text"
              onClick={onClickYes}
            >
              <span className={styles.right}>
                <span className={styles.textIcon}>&#128077;</span>
                <span className={styles.text}>Yes</span>
              </span>
              <span className={styles.left}>
                <Image className={styles.arrowRight} src={ArrowIcon} alt="" />
              </span>
            </Button>
          </div>
          <div
            className={styles.overlay}
            ref={overlayRef}
            style={{ display: "none" }}
          >
            {answer === "Yes" ? (
              <Button className={styles.btnHor} type="text">
                <span className={styles.textIcon}>&#128077;</span>
                <span className={styles.text}>Yes</span>
              </Button>
            ) : (
              <Button className={styles.btnHor} type="text">
                <span className={styles.textIcon}>&#128078;</span>
                <span className={styles.text}>No</span>
              </Button>
            )}
          </div>
        </div>
        <div className={styles.cardBehind1}></div>
        <div className={styles.cardBehind2}></div>
      </div>
    </div>
  );
};

export default YesNoChoice;
