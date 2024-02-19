import StepLabel from "./StepLabel";
import styles from "./ContactForm.module.css";
import { Button, Flex } from "antd";
import { useState } from "react";
import InputText from "./forms/InputText";
import BtnSubmit from "./forms/BtnSubmit";

const ContactForm = ({
  label,
  onStepChange,
}: {
  label: string;
  onStepChange: (offset: 1 | -1, label: string, value: string) => void;
}) => {
  const [values, setValue] = useState<{ [key: string]: string }>({});

  const submitAllowed = () => {
    return values.fname && values.lname && values.phone && values.email
      ? true
      : false;
  };

  return (
    <div className="flexContent">
      <StepLabel
        primaryText="Please share your contact detail &#9999;&#65039;"
        secondaryText="Free text – string"
      />
      <div className={styles.form}>
        <Flex
          className={styles.flexWrapper}
          vertical
          gap={16}
          align="flex-start"
          justify="space-between"
        >
          <div className={styles.formField}>
            <InputText
              id="fname"
              label="First Name"
              value={values.fname}
              onInput={(e) =>
                setValue({ ...values, ...{ fname: e.currentTarget.value } })
              }
            />
          </div>
          <div className={styles.formField}>
            <InputText
              id="lname"
              label="Last Name"
              value={values.lname}
              onInput={(e) =>
                setValue({ ...values, ...{ lname: e.currentTarget.value } })
              }
            />
          </div>
          <div className={styles.formField}>
            <InputText
              id="phone"
              label="Phone"
              value={values.phone}
              onInput={(e) =>
                setValue({ ...values, ...{ phone: e.currentTarget.value } })
              }
            />
          </div>
          <div className={styles.formField}>
            <InputText
              id="email"
              label="Email"
              value={values.email}
              onInput={(e) =>
                setValue({ ...values, ...{ email: e.currentTarget.value } })
              }
            />
          </div>
          <BtnSubmit
            onClick={(e) =>
              onStepChange(
                1,
                label,
                `First Name: ${values.fname}, Last Name: ${values.lname}, Phone: ${values.phone}, Email: ${values.email}`
              )
            }
            opacity={submitAllowed() ? 1 : 0}
          >
            Complete
          </BtnSubmit>
        </Flex>
      </div>
    </div>
  );
};

export default ContactForm;
