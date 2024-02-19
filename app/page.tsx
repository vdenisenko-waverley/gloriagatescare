"use client";

import { useEffect, useRef, useState } from "react";
import { Progress, Carousel, Button } from "antd";
import styles from "./page.module.css";
import SingleChoice from "./components/choices/SingleChoice";
import ThankYou from "./components/ThankYou";
import ProgressHeader from "./components/ProgressHeader";
import { submitAnswers } from "./actions";
import YesNoCardChoice from "./components/choices/YesNoCardChoice";
import YesNoChoice from "./components/choices/YesNoChoice";
import MultipleChoice from "./components/choices/MultipleChoice";
import ContactForm from "./components/ContactForm";
import Image from "next/image";
import BurgerIcon from "./icons/burger.svg";
import SiteLogo from "./icons/site-logo.svg";
import NegativeIcon from "./icons/negative.png";
import ModeratelyNeutral from "./icons/moderately-neutral.png";
import Neutral from "./icons/neutral.png";
import ModeratelyHappy from "./icons/moderately-happy.png";
import Happy from "./icons/happy.png";
import Link from "next/link";
import { Layout } from "antd";
const { Header, Content } = Layout;

const SMILES = [
  { text: "negative", icon: NegativeIcon, value: "negative" },
  {
    text: "moderately neutral",
    icon: ModeratelyNeutral,
    value: "moderately neutral",
  },
  { text: "neutral", icon: Neutral, value: "neutral" },
  {
    text: "moderately happy",
    icon: ModeratelyHappy,
    value: "moderately happy",
  },
  { text: "happy", icon: Happy, value: "happy" },
];

const SERVICES = [
  {
    text: "Insurance medicine",
    icon: "&#128657;",
    value: "Insurance medicine",
  },
  { text: "Checkups", icon: "&#129728;", value: "Checkups" },
  { text: "Diagnosis", icon: "&#129298;", value: "Diagnosis" },
  { text: "Wellness", icon: "👩‍", value: "Wellness" },
];

export default function Home() {
  const [init, setInit] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState(0);
  const carouselRef = useRef<any>(null);
  const totalSteps = 7;
  const isLastStep = step === totalSteps - 1;

  useEffect(() => {
    const slideEl = carouselRef.current.innerSlider.list.querySelector(
      `[data-index="${step}"]`
    );
    const contentEl = slideEl && slideEl.querySelector(".flexContent");
    if (contentEl) {
      const lastElement = Array.from(
        contentEl.children as HTMLDivElement[]
      ).pop();
      if (lastElement) {
        const rect = lastElement.getBoundingClientRect();
        const slideRect = slideEl.getBoundingClientRect();
        if (rect.bottom < document.body.clientHeight) {
          const h = document.body.clientHeight - slideRect.top;
          slideEl.style.height = `${h}px`;
        } else {
          const h =
            rect.bottom -
            slideRect.top +
            parseInt(getComputedStyle(contentEl).paddingBottom);
          slideEl.style.height = `${h}px`;
        }
      }
    }
  }, [step, init]);

  const onStepChange = (offset: 1 | -1, label: string, value: string) => {
    const newData = { ...data, [label]: value };
    const newStep = step + offset;
    const isLast = newStep === totalSteps - 1;
    setData(newData);

    setTimeout(() => {
      setStep(newStep);
      carouselRef.current.goTo(newStep);
    }, 300);

    if (isLast) {
      submitAnswers(newData);
    }
  };

  const onSlideChange = (step: number) => {
    setStep(step);
  };

  const prevStep = () => {
    setStep((curStep) => curStep - 1);
    carouselRef.current.goTo(step - 1);
  };

  const getStepLabel = (index: number) => {
    switch (index) {
      case 0:
        return "How are you doing today?";
      case 1:
        return "How happy are you with your current doctor?*";
      case 2:
        return "Do you take part in the Medicaid programme?*";
      case 3:
        return "Would you like to change your doctor?";
      case 4:
        return "What services are you interested in?";
      case 5:
        return "Contacts";
    }
    return "";
  };

  // console.log("data", data);

  return (
    <>
      <Header className={styles.header}>
        <Image className={styles.burger} src={BurgerIcon} alt="" />
        <Link
          className={styles.siteLogoLink}
          href="https://gloriagatescare.com/"
        >
          <Image src={SiteLogo} alt="" />
        </Link>
        <Button
          className={styles.btnSkip}
          onClick={() => onStepChange(1, getStepLabel(step), "")}
          style={{ visibility: step !== totalSteps - 1 ? "visible" : "hidden" }}
        >
          Skip
        </Button>
      </Header>
      <Content className={styles.main}>
        {!isLastStep && (
          <>
            <ProgressHeader
              current={step}
              total={totalSteps}
              prevStep={prevStep}
            />
            <Progress
              className={styles.progress}
              percent={((step + 1) * 100) / totalSteps}
              showInfo={false}
              strokeColor="#ffffff"
              trailColor="#503883"
            />
          </>
        )}
        <Carousel
          className={styles.slider}
          ref={carouselRef}
          afterChange={onSlideChange}
          dots={false}
          swipe={false}
          infinite={false}
          adaptiveHeight={true}
          slidesToShow={1}
          centerPadding="0"
          onInit={() => setInit(true)}
          style={{ opacity: init ? "1" : "0" }}
        >
          <div>
            <SingleChoice
              label="How are you doing today?"
              options={SMILES}
              activeOption={data["how_are_you"]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <SingleChoice
              label="How happy are you with your current doctor?*"
              options={SMILES}
              activeOption={data["how_happy_with_doctor"]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <YesNoCardChoice
              label="Do you take part in the Medicaid programme?*"
              activeOption={data["medicaide_programme"]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <YesNoChoice
              label="Would you like to change your doctor?"
              activeOption={data["change_doctor"]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <MultipleChoice
              label="What services are you interested in?"
              options={SERVICES}
              activeOption={data["services_interested"]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <ContactForm label="Contacts" onStepChange={onStepChange} />
          </div>
          <div>
            <ThankYou />
          </div>
        </Carousel>
      </Content>
    </>
  );
}
