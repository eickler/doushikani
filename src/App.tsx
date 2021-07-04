import { useState } from "react";
import { verbs, VerbDefinition } from './Verbs';
import { Question } from "./Question";
import { Choice, Selection } from "./Choice";
import { Answer } from "./Answer";
import { Container, Button } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
      <Question verb={state.verb}/>
      <Choice currentSelection={state.selection} onSelect={onSelect}/>
      { state.selection !== Selection.NotSelected && 
        <Answer verb={state.verb}/>
      }
      <Container>
        <Button variant="contained" onClick={onContinue} startIcon={<NavigateNextIcon />}>Continue</Button>
      </Container>
    </>
  );
}

export default App;
