import { useState } from "react";
import Intro from "./Intro";
import App from "./App";
import Goodbye from "./Goodbye";
import { PersistentStorage } from "./PersistentStorage";

enum Flow { Intro, Run, Goodbye }

const storage = new PersistentStorage();

const Main = () => {
  const [state, setState] = useState(storage.shouldSkipIntro() ? Flow.Run : Flow.Intro);

  const onFinishIntro = (skip: boolean) => {
    if (skip) {
      storage.skipIntroNextTime();
    }
    setState(Flow.Run);
  };

  const onFinishApp = () => {
    setState(Flow.Goodbye);
  };

  switch (state) {
    case Flow.Intro:
      return (<Intro onFinish={onFinishIntro}/>);
    case Flow.Run:
      return (<App storage={storage} onFinish={onFinishApp}/>);
    case Flow.Goodbye:
      return (<Goodbye/>);
  }
};

export default Main;
