import { useState } from "react";
import Intro from "./Intro";
import Goodbye from "./Goodbye";
import { PersistentStorage } from "./PersistentStorage";
import Logo from "./Logo";
import ParticleRounds from "./ParticleRounds";
import Summary from "./Summary";
import VerbRounds from "./VerbRounds";
import { Control, VerbCard } from "./Control";
import { Flashcards } from "./Flashcards";
import GetReadyFor from "./GetReady";

const defaultLevel = 20;
const defaultAmount = 3;

enum Step {
  Splash,
  Intro,
  VerbSplash,
  VerbRound,
  ParticleSplash,
  ParticleRound,
  Summary,
  Goodbye,
}

interface State {
  step: Step;
  verbs: VerbCard[];
  control?: Control;
  verbsResult: boolean[];
  particlesResult: boolean[];
}

const storage = new PersistentStorage();
const flashcards = new Flashcards(storage);
const initState = (): State => {
  /*const control = new Control(flashcards, defaultLevel, defaultAmount);
  const verbs = control.getCards();
  return {
    step: Step.ParticleRound,
    verbs: verbs,
    control: control,
    verbsResult: [],
    particlesResult: [],
  };*/
  return {
    step: Step.Splash,
    verbs: [],
    verbsResult: [],
    particlesResult: [],
  };
};

const Main = () => {
  const [state, setState] = useState(initState);

  const next = (step: Step) => {
    setState({ ...state, step: step });
  };

  const gotoIntroOrVerbSplash = () => {
    next(storage.shouldSkipIntro() ? Step.VerbSplash : Step.Intro);
  };

  const gotoVerbSplash = (skip: boolean) => {
    if (skip) {
      storage.skipIntroNextTime();
    }
    next(Step.VerbSplash);
  };

  const gotoVerbRound = () => {
    const control = new Control(flashcards, defaultLevel, defaultAmount);
    const verbs = control.getCards();
    setState({
      ...state,
      step: Step.VerbRound,
      verbs: verbs,
      control: control,
    });
  };

  const gotoParticleSplash = (result: boolean[]) => {
    for (let i = 0; i < result.length; i++) {
      state.control?.result(state.verbs[i].verb.verb, result[i]);
    }
    setState({ ...state, step: Step.ParticleSplash, verbsResult: result });
  };

  const gotoParticleRound = () => {
    next(Step.ParticleRound);
  };

  const gotoSummary = (result: boolean[]) => {
    setState({ ...state, step: Step.Summary, particlesResult: result });
  };

  const gotoVerbSplashOrSummary = (repeat: boolean) => {
    next(repeat ? Step.VerbSplash : Step.Goodbye);
  };

  // prettier-ignore
  const flow = {
    [Step.Splash]: (<Logo onFinish={gotoIntroOrVerbSplash}/>),
    [Step.Intro]:  (<Intro onFinish={gotoVerbSplash}/>),
    [Step.VerbSplash]: (<GetReadyFor what="verbs" onFinish={gotoVerbRound}/>),
    [Step.VerbRound]: (<VerbRounds verbs={state.verbs} onFinish={gotoParticleSplash}/>),
    [Step.ParticleSplash]: (<GetReadyFor what="particles" onFinish={gotoParticleRound}/>),
    [Step.ParticleRound]: (<ParticleRounds verbs={state.verbs} onFinish={gotoSummary}/>),
    [Step.Summary]: (<Summary verbsResult={state.verbsResult} particlesResult={state.particlesResult} onFinish={gotoVerbSplashOrSummary}/>),
    [Step.Goodbye]: (<Goodbye/>),
  }

  return flow[state.step];
};

export default Main;
