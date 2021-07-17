import { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { VerbDefinition } from "./Verbs";
import { Question } from "./Question";
import { Choice, Selection } from "./Choice";
import { Answer } from "./Answer";
import { Configuration, Setup } from "./Setup";
import { Control, DONE } from "./Control";
import { Flashcards } from "./Flashcards";

const defaultLevel = 18;
const defaultAmount = 10;

interface State {
  control: Control;
  verb: VerbDefinition;
  selection: Selection;
}

const reinitialize = (level: number, amount: number): State => {
  const flashcards = new Flashcards(window.localStorage);
  const control = new Control(flashcards, level, amount);
  return {
    control: control,
    verb: control.pick(),
    selection: Selection.NotSelected,
  };
};

const App = () => {
  const [state, setState] = useState(() =>
    reinitialize(defaultLevel, defaultAmount)
  );

  const onSelect = (selection: Selection) => {
    setState({ ...state, selection: selection });
    state.control.result(state.verb.verb, selection === Selection.Transitive);
  };

  const onContinue = () => {
    setState({
      ...state,
      verb: state.control.pick(),
      selection: Selection.NotSelected,
    });
  };

  const onConfigUpdate = (config: Configuration) => {
    setState(reinitialize(config.level, config.verbsPerDay));
  };

  function showSelection() {
    return (
      <>
        <Choice currentSelection={state.selection} onSelect={onSelect} />
        {state.selection !== Selection.NotSelected && (
          <a href={"https://www.wanikani.com/vocabulary/" + state.verb.verb} target="_blank" style={{textDecoration: "none"}}>
            <Answer verb={state.verb} />
          </a>
        )}
        <Container>
          <Button
            variant="contained"
            onClick={onContinue}
            startIcon={<NavigateNextIcon />}
          >
            Continue
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Setup
        defaultLevel={defaultLevel}
        defaultVerbsPerDay={defaultAmount}
        onConfigUpdate={onConfigUpdate}
      />
      <Question verb={state.verb} />
      {state.verb !== DONE && showSelection()}
    </>
  );
};

export default App;
