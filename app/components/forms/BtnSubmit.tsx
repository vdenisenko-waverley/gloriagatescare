import { Button } from "antd";
import styles from "./BtnSubmit.module.css";
import { type ReactNode } from "react";

const BtnSubmit = ({
  opacity = 1,
  onClick,
  children,
}: {
  opacity: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) => {
  const disabled = opacity === 0;
  return (
    <Button
      className={styles.btnSubmit}
      style={{ opacity, pointerEvents: disabled ? "none" : "all" }}
      block
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default BtnSubmit;
