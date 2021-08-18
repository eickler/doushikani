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
import { PersistentStorage } from "./PersistentStorage";

const defaultLevel = 18;
const defaultAmount = 10;

interface Props {
  storage: PersistentStorage;
  onFinish: () => void;
}

interface State {
  control: Control;
  verb: VerbDefinition;
  selection: Selection;
}

const reinitialize = (
  storage: PersistentStorage,
  level: number,
  amount: number
): State => {
  const flashcards = new Flashcards(storage);
  const control = new Control(flashcards, level, amount);
  return {
    control: control,
    verb: control.pick(),
    selection: Selection.NotSelected,
  };
};

const App = (props: Props) => {
  const [state, setState] = useState(() =>
    reinitialize(props.storage, defaultLevel, defaultAmount)
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
    setState(reinitialize(props.storage, config.level, config.verbsPerDay));
  };

  function showSelection() {
    return (
      <>
        <Container>
          <Choice currentSelection={state.selection} onSelect={onSelect} />
          <Button
            variant="contained"
            disabled={state.selection === Selection.NotSelected}
            onClick={onContinue}
            startIcon={<NavigateNextIcon />}
          >
            Continue
          </Button>
        </Container>
        {state.selection !== Selection.NotSelected && (
          <Answer verb={state.verb} />
        )}
      </>
    );
  }

  /*      <Setup
        defaultLevel={defaultLevel}
        defaultVerbsPerDay={defaultAmount}
        onConfigUpdate={onConfigUpdate}
      />
*/
  return (
    <>
      <Question verb={state.verb} />
      {state.verb !== DONE && showSelection()}
    </>
  );
};

export default App;
