import styles from "./StepLabel.module.css";

const StepLabel = ({
  primaryText,
  secondaryText,
}: {
  primaryText?: string;
  secondaryText?: string;
}) => {
  return (
    <div className={styles.wrapper}>
      {primaryText && (
        <label
          className={styles.primaryText}
          dangerouslySetInnerHTML={{ __html: primaryText }}
        />
      )}
      {secondaryText && (
        <p
          className={styles.secondaryText}
          dangerouslySetInnerHTML={{ __html: secondaryText }}
        />
      )}
    </div>
  );
};

export default StepLabel;
