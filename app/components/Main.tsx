import { ReactNode } from "react";
import styles from "./Main.module.css";

const Main = ({ children }: { children: ReactNode }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
