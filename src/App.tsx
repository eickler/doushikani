import { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { VerbDefinition } from "./Verbs";
import { Question } from "./Question";
import { Choice, Selection } from "./Choice";
import { Answer } from "./Answer";
import { Configuration, Setup } from "./Setup";
import { Control } from "./Control";

const defaultLevel = 18;
const defaultAmount = 10;

interface State {
  control: Control;
  verb: VerbDefinition;
  selection: Selection;
}

const initialize = (level: number, amount: number): State => {
  const control = new Control(level, amount);
  return {
    control: control,
    verb: control.pick(),
    selection: Selection.NotSelected,
  };
};

const App = () => {
  const [state, setState] = useState(initialize(defaultLevel, defaultAmount));

  const onSelect = (selection: Selection) => {
    setState({ ...state, selection: selection });
    // check the state here ...
  };

  const onContinue = () => {
    setState({
      ...state,
      verb: state.control.pick(),
      selection: Selection.NotSelected,
    });
  };

  const onConfigUpdate = (config: Configuration) => {
    setState(initialize(config.level, config.verbsPerDay));
  };

  return (
    <>
      <Setup
        defaultLevel={defaultLevel}
        defaultVerbsPerDay={defaultAmount}
        onConfigUpdate={onConfigUpdate}
      />
      <Question verb={state.verb} />
      <Choice currentSelection={state.selection} onSelect={onSelect} />
      {state.selection !== Selection.NotSelected && (
        <Answer verb={state.verb} />
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
};

export default App;
