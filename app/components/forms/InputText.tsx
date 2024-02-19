import styles from "./InputText.module.css";
import { Input } from "antd";
import { type FormEventHandler, useState } from "react";

const InputText = ({
  id,
  value,
  label,
  onInput,
}: {
  id: string;
  value: string;
  label: string,
  onInput: FormEventHandler<HTMLInputElement>;
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`${styles.input} ${focus ? styles.focused : ""} ${
        value ? styles.hasValue : ""
      }`}
    >
      <Input
        id={id}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onInput={onInput}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default InputText;
