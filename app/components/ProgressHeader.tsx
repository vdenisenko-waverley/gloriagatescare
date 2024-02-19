import { Typography, Flex, Button } from "antd";
const { Title } = Typography;
import styles from "./ProgressHeader.module.css";

const ProgressHeader = ({
  current,
  total,
  prevStep,
}: {
  current: number;
  total: number;
  prevStep: Function;
}) => {
  const currentFormatted = (current + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return (
    <Flex
      className={styles.wrapper}
      gap="middle"
      justify="center"
      align="center"
    >
      {current !== 0 && (
        <Button
          className={styles.btnPrev}
          type="link"
          onClick={() => prevStep()}
        >
          &lt; Previous
        </Button>
      )}
      <Title className={styles.title} level={2}>
        <span className={styles.current}>{currentFormatted}</span>
        <span className={styles.total}>/{total}</span>
      </Title>
    </Flex>
  );
};

export default ProgressHeader;
