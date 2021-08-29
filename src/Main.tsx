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

enum Step { Splash, Intro, VerbSplash, VerbRound, ParticleSplash, ParticleRound, Summary, Goodbye };

interface State {
  step: Step;
  verbs: VerbCard[];
  control?: Control;
}

const storage = new PersistentStorage();
const flashcards = new Flashcards(storage);
const initState : State = { step: Step.Splash, verbs: []}; 

const Main = () => {
  const [state, setState] = useState(initState);

  const next = (step: Step) => {
    setState({ ...state, step: step });
  }

  const gotoIntroOrVerbSplash = () => {
    next(storage.shouldSkipIntro() ? Step.VerbSplash : Step.Intro);
  }

  const gotoVerbSplash = (skip: boolean) => {
    if (skip) {
      storage.skipIntroNextTime();
    }
    const control = new Control(flashcards, defaultLevel, defaultAmount);
    const verbs = control.getCards();
    setState({step: Step.VerbSplash, verbs: verbs, control: control});
  }

  const gotoVerbRound = () => {
    next(Step.VerbRound);
  };

  const gotoParticleSplash = (result: boolean[]) => {
    for (let i = 0; i < result.length; i++) {
      state.control?.result(state.verbs[i].verb.verb, result[i]);
    }
    next(Step.ParticleSplash);
  }

  const gotoParticleRound = () => {
    next(Step.ParticleRound);
  }

  const gotoSummary = () => {
    next(Step.Summary);
  }

  const gotoVerbSplashOrSummary = (repeat: boolean) => {
    next(repeat ? Step.VerbSplash : Step.Goodbye);
  }
  
  const flow = {
    [Step.Splash]: (<Logo onFinish={gotoIntroOrVerbSplash}/>),
    [Step.Intro]:  (<Intro onFinish={gotoVerbSplash}/>),
    [Step.VerbSplash]: (<GetReadyFor what="verbs" onFinish={gotoVerbRound}/>),
    [Step.VerbRound]: (<VerbRounds verbs={state.verbs} onFinish={gotoParticleSplash}/>),
    [Step.ParticleSplash]: (<GetReadyFor what="particles" onFinish={gotoParticleRound}/>),
    [Step.ParticleRound]: (<ParticleRounds verbs={state.verbs} onFinish={gotoSummary}/>),
    [Step.Summary]: (<Summary onFinish={gotoVerbSplashOrSummary}/>),
    [Step.Goodbye]: (<Goodbye/>),
  }

  return flow[state.step];
};

export default Main;
