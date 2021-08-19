import { useState } from "react";
import Intro from "./Intro";
import Goodbye from "./Goodbye";
import { PersistentStorage } from "./PersistentStorage";
import Splash from "./Splash";
import ParticleRound from "./ParticleRound";
import Summary from "./Summary";
import VerbRound from "./VerbRound";

enum Step { Splash, Intro, VerbRound, ParticleRound, Summary, Goodbye }

const storage = new PersistentStorage();

const Main = () => {
  const [state, setState] = useState(Step.Splash);

  const onFinishSplash = () => {
    setState(storage.shouldSkipIntro() ? Step.VerbRound : Step.Intro);
  }

  const onFinishIntro = (skip: boolean) => {
    if (skip) {
      storage.skipIntroNextTime();
    }
    setState(Step.VerbRound);
  };

  const onFinishVerbRound = () => {
    setState(Step.ParticleRound);
  }

  const onFinishParticleRound = () => {
    setState(Step.Summary);
  }

  const onFinishSummary = (repeat: boolean) => {
    setState(repeat ? Step.VerbRound : Step.Goodbye);
  }
  
  const flow = {
    [Step.Splash]: (<Splash onFinish={onFinishSplash}/>),
    [Step.Intro]:  (<Intro onFinish={onFinishIntro}/>),
    [Step.VerbRound]: (<VerbRound onFinish={onFinishVerbRound}/>),
    [Step.ParticleRound]: (<ParticleRound onFinish={onFinishParticleRound}/>),
    [Step.Summary]: (<Summary onFinish={onFinishSummary}/>),
    [Step.Goodbye]: (<Goodbye/>),
  }

  return flow[state];
};

export default Main;
