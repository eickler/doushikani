import { Box, Button, MobileStepper, Typography } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";
import SwipeableViews from 'react-swipeable-views';

const steps = [
  <>
    <Typography variant="h4" gutterBottom>Welcome to Doushikani, the little sister of Wanikani.</Typography>
    <Typography variant="body1" paragraph>
      Doushikani helps you to learn the difference between transitive and
      intransitive verbs in Japanese. If you know whether a verb is transitive
      or intransitive, you can choose the proper particles to form a correct
      Japanese sentence. It is therefore an essential part of learning Japanese.
    </Typography>
  </>,
  <>
    <Typography variant="h4" gutterBottom>What are transitive and intransitive verbs?</Typography>
    <Typography variant="body1" paragraph>
      To start with an example: 開けます (akemasu, to open something) is a
      transitive verb. It requires an object, the thing that is opened. The
      object is marked with the を particle. When someone opens a door, you say:
    </Typography>
    <Typography variant="body1" paragraph><b>ドアを開けます。</b></Typography>
    <Typography variant="body1" paragraph>
      開きます (akimasu, to open) is an intransitive verb. It requires a
      subject, the thing that opens. The subject is marked with the が
      particular. When a door opens, you say:
      </Typography>
    <Typography variant="body1" paragraph><b>ドアが開きます。</b></Typography>
  </>,
  <>
    <Typography variant="h4" gutterBottom>How can you learn the type of verb?</Typography> 
    <Typography variant="body1" paragraph>
      Unfortunately, there are no real rules to distinguish transitive and
      intransitive verbs. You have to learn them by heart. And this is where an
      app like Doushikani can help you.
    </Typography>
    <Typography variant="body1" paragraph>
      Doushikani uses a similar repetition system as Wanikani. It presents you
      with verbs and lets you select the form. This is repeated over and over
      again. The time between repetitions depends on how successful you are in
      chosing the correct form. If you come back every day for just a few
      minutes, you will improve your sentence construction skills after a while.
    </Typography>
    <Typography variant="body1" paragraph>
      The source of the verbs is Wanikani. You first learn the verb, it's
      reading and it's meaning in Wanikani. Then, you learn its use in a
      sentence in Doushikani.
    </Typography>
  </>,
  <>
    <Typography variant="h4" gutterBottom>Are there really no rules?</Typography>
    <Typography variant="body1" paragraph>
      There are two "mostly true" rules:
      <ul>
        <li>
          Nearly all verbs ending with "-aru" (-maru/-garu/...) are
          intransitive.
        </li>
        <li>
          Nearly all verbs ending with "-su", "-meru", "-beru", "-teru" and
          "-seru" are transitive.
        </li>
      </ul>
    </Typography>
    <Typography variant="body1" paragraph>
      Wanikani has more than 800 verbs in its dictionary. 229 verbs match the
      above endings. 10 of the 229 verbs do not follow the rules. So if you
      learn the two rules and the 10 exceptions, you can classify 229 verbs.
      Doushikani helps you with this shortcut.
    </Typography>
    <Typography variant="body1" paragraph><b>Let's get started!</b></Typography>
  </>,
  <>
    Configuration for API key and number of words per day.<br></br>
    Don't show this again button.
  </>
];

interface Props {
  onFinish: () => void;
}

const Intro = (props: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box flex={1} overflow="auto" style={{margin: "20px"}}>
        <SwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {steps.map((step, index) => (
            <div key={index}>
              {step}
            </div>
          ))}
        </SwipeableViews>
      </Box>
      <Box>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRight /> 
          </Button>
          }
          backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
          }
        />
      </Box>
    </Box>
  );
};

export default Intro;
