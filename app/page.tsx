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
import Link from "next/link";
import { Layout, Typography } from "antd";
import { smiles } from "./constants/smiles";
import { services } from "./constants/services";
import { questions } from "./constants/questions";
const { Header, Content } = Layout;

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
          onClick={() => onStepChange(1, questions[step], "")}
          style={{ visibility: !isLastStep ? "visible" : "hidden" }}
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
              label={questions[0]}
              options={smiles}
              activeOption={data[questions[0]]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <SingleChoice
              label={questions[1]}
              options={smiles}
              activeOption={data[questions[1]]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <YesNoCardChoice
              label={questions[2]}
              activeOption={data[questions[2]]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <YesNoChoice
              label={questions[3]}
              activeOption={data[questions[3]]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <MultipleChoice
              label={questions[4]}
              options={services}
              activeOption={data[questions[4]]}
              onStepChange={onStepChange}
            />
          </div>
          <div>
            <ContactForm label={questions[5]} onStepChange={onStepChange} />
          </div>
          <div>
            <ThankYou />
          </div>
        </Carousel>
      </Content>
    </>
  );
}
