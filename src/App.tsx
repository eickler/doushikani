import { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { verbs, VerbDefinition } from "./Verbs";
import { Question } from "./Question";
import { Choice, Selection } from "./Choice";
import { Answer } from "./Answer";
import { Configuration, Setup } from "./Setup";
import { flashcards } from './Flashcards';

interface State {
  verbsToPractice: VerbDefinition[];
  verb: VerbDefinition;
  selection: Selection;
}

const pickVerb = (verbs: VerbDefinition[]): VerbDefinition => {
  const rnd = Math.floor(Math.random() * verbs.length);
  return verbs[rnd];
};

const initialize = (level: number, amount: number): State => {
  const dueCards = flashcards.dueCards();
  const dueVerbs = verbs.filter(verb => dueCards.hasOwnProperty(verb.verb));

  for (const verb of verbs) {
    if (verb.level <= level && !flashcards.available(verb.verb)) {
      dueVerbs.push(verb);
      if (dueVerbs.length >= amount) {
        break;
      }
    }
  }
  // However, we didn't create flashcards for the new verbs ...

  return {
    verbsToPractice: dueVerbs,
    verb: pickVerb(dueVerbs),
    selection: Selection.NotSelected,
  };
};

const App = () => {
  const [state, setState] = useState(initialize(18, 10));

  const onSelect = (selection: Selection) => {
    setState({ ...state, selection: selection });
  };

  const onContinue = () => {
    setState({
      ...state,
      verb: pickVerb(state.verbsToPractice),
      selection: Selection.NotSelected,
    });
  };

  const onConfigUpdate = (config: Configuration) => {
    setState(initialize(config.level, config.verbsPerDay));
  };

  return (
    <>
      <Setup defaultLevel={18} defaultVerbsPerDay={10} onConfigUpdate={onConfigUpdate} />
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
