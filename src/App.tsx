import { useState } from "react";
import { Question, Selection } from "./Question";
import Header from "./Header";

import { verbs, VerbDefinition } from './Verbs';
import { Answer } from "./Answer";

interface State {
  verb: VerbDefinition;
  selection: Selection;
}

const pickVerb = () : State => {
  const rnd = Math.floor(Math.random() * verbs.length)
  return { verb: verbs[rnd], selection: Selection.NotSelected };
}

const App = () => {
  const [state, setState] = useState(pickVerb());

  const onSelect = (selection: Selection) => {
    setState({ verb: state.verb, selection: selection });
  }

  const onContinue = () => {
    setState(pickVerb());
  }

  return (
    <>
      <Header/>
      <Question verb={state.verb} onSelect={onSelect}/>
      { state.selection !== Selection.NotSelected && 
        <Answer verb={state.verb} onContinue={onContinue}/>
      }
    </>
  );
}

export default App;
