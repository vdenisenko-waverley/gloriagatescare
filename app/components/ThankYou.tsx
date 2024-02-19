import Image from "next/image";
import StepLabel from "./StepLabel";
import styles from "./ThankYou.module.css";
import answersSentImg from '/public/answers-sent.png';

const ThankYou = () => {
  return (
    <div className={styles.wrapper}>
      <StepLabel primaryText="Thanks<br>for answering!<br>We Love to Care" />
      <Image className={styles.sentImg} src={answersSentImg} alt="" />
    </div>
  );
};

export default ThankYou;
