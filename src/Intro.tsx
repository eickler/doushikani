import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MobileStepper,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";

interface Props {
  onFinish: (skip: boolean) => void;
}

const Intro = (props: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skip, setSkip] = useState(false);

  const handleSkip = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkip(event.target.checked);
  };

  const steps = [
    <>
      <Typography variant="h4" gutterBottom>
        Welcome to doushikani, the little sister of Wanikani.
      </Typography>
      <Typography variant="body1" paragraph>
        doushikani helps you to learn the difference between transitive and
        intransitive verbs in Japanese. Knowing whether a verb is transitive or
        intransitive, you can choose the proper particles to form a correct
        Japanese sentence. It is therefore an essential part of learning
        Japanese.
      </Typography>
    </>,
    <>
      <Typography variant="h4" gutterBottom>
        What are transitive and intransitive verbs?
      </Typography>
      <Typography variant="body1" paragraph>
        To start with an example: 開けます (akemasu, to open something) is a
        transitive verb. It requires an object, the thing that is opened. The
        object is marked with the を particle. When someone opens a door, you
        say:
      </Typography>
      <Typography variant="body1" paragraph>
        <b>ドアを開けます。</b>
      </Typography>
      <Typography variant="body1" paragraph>
        開きます (akimasu, to open) is an intransitive verb. It requires a
        subject, the thing that opens. The subject is marked with the が
        particular. When a door opens, you say:
      </Typography>
      <Typography variant="body1" paragraph>
        <b>ドアが開きます。</b>
      </Typography>
    </>,
    <>
      <Typography variant="h4" gutterBottom>
        How can you learn the type of verb?
      </Typography>
      <Typography variant="body1" paragraph>
        Unfortunately, there are no real rules to distinguish transitive and
        intransitive verbs. You have to learn them by heart. And this is where
        an app like doushikani can help you.
      </Typography>
      <Typography variant="body1" paragraph>
        doushikani presents you with a verb and lets you guess its transitivity.
        Then it shows an example sentence using the verb and lets you guess the
        particles to be used in the sentence. This is repeated over and over
        again. The time between repetitions depends on how successful you are in
        chosing the correct forms. If you come back every day for just a few
        minutes, you will improve your sentence construction skills after a
        while.
      </Typography>
      <Typography variant="body1" paragraph>
        The source of the verbs and examples is Wanikani. You first learn the
        verb, it's reading and it's meaning in Wanikani. Then, you learn its use
        in a sentence in doushikani.
      </Typography>
    </>,
    <>
      <Typography variant="h4" gutterBottom>
        Are there really no rules?
      </Typography>
      <Typography variant="body1" paragraph>
        There are two "mostly true" rules:
      </Typography>
      <Typography variant="body1" component="ul" paragraph>
        <li>
          Nearly all verbs ending with "-aru" (-maru/-garu/...) are
          intransitive.
        </li>
        <li>
          Nearly all verbs ending with "-su", "-meru", "-beru", "-teru" and
          "-seru" are transitive.
        </li>
      </Typography>
      <Typography variant="body1" paragraph>
        Wanikani has more than 800 verbs in its dictionary. 229 verbs match the
        above endings. 10 of the 229 verbs do not follow the rules. So if you
        learn the two rules and the 10 exceptions, you can classify 229 verbs.
        Doushikani helps you with this shortcut.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.onFinish(skip)}
      >
        Let's get started!
      </Button>
      <p>
        <FormControlLabel
          control={<Checkbox onChange={handleSkip} name="skip" />}
          label="Don't show this again."
        />
      </p>
    </>,
  ];
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box flex={1} overflow="auto" style={{ margin: "20px" }}>
        {steps[activeStep]}
      </Box>
      <Box>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
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
