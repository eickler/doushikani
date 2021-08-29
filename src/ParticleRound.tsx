import { Container } from "@material-ui/core";
import { useState } from "react";
import { Highlight, ParticleHighlighter } from "./ParticleHighlighter";
import { VerbDefinition, Example } from "./Verbs";
import { VerbCard } from "./Control";

interface Props {
  verb: VerbCard;
  onFinish: (pass: boolean) => void;
}

interface State {
  example: Example;
  cursor: number;
  highlight: Highlight[];
}

const initState = (verb: VerbDefinition): State => {
  const example =
    verb.examples[Math.floor(Math.random() * verb.examples.length)];
  const result = { example: example, cursor: 0, highlight: [Highlight.Cursor] };
  for (let i = 1; i < example.indexes.length; i++) {
    result.highlight.push(Highlight.Hide);
  }
  return result;
};

const ParticleRound = (props: Props) => {
  const [state, setState] = useState(initState(props.verb.verb));

  const onSelect = (guessed: string) => {
    const newState = {
      example: state.example,
      cursor: state.cursor + 1,
      highlight: [...state.highlight],
    };

    const correct = state.example.ja.charAt(state.example.indexes[state.cursor]);
    newState.highlight[state.cursor] =
      guessed === correct ? Highlight.Correct : Highlight.Wrong;

    if (newState.cursor >= newState.highlight.length) {
      const passed = newState.highlight.every((h) => h === Highlight.Correct);
      props.onFinish(passed);
    } else {
      newState.highlight[newState.cursor] = Highlight.Cursor;
    }
    setState(newState);
  };

  return (
    <Container>
      <ParticleHighlighter
        onSelect={onSelect}
        text={state.example.ja}
        particles={state.example.indexes}
        highlight={state.highlight}
      />
    </Container>
  );
};

export default ParticleRound;
