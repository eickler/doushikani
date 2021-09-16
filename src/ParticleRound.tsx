import { useState } from "react";
import { Container } from "@material-ui/core";
import { Highlight, ParticleHighlighter } from "./ParticleHighlighter";
import { Example } from "./Verbs";

interface Props {
  example: Example;
  onFinish: (pass: boolean) => void;
}
interface State {
  cursor: number;
  highlights: Highlight[];
}

const initState: State = { cursor: 0, highlights: [Highlight.Cursor] };

const ParticleRound = ({ example, onFinish }: Props) => {
  const [state, setState] = useState(initState);

  const moveCursor = (highlights: Highlight[]) => {
    highlights.push(Highlight.Cursor);
    setState({
      cursor: state.cursor + 1,
      highlights: highlights,
    });
  };

  const resetAndNotify = (highlights: Highlight[]) => {
    setState(initState);
    const passed = highlights.every((h) => h === Highlight.Correct);
    onFinish(passed);
  };

  const onSelect = (guessed: string) => {
    const highlights = [...state.highlights];

    const correct = example.ja.charAt(example.indexes[state.cursor]);
    highlights[state.cursor] =
      guessed === correct ? Highlight.Correct : Highlight.Wrong;

    if (state.cursor < example.indexes.length - 1) {
      moveCursor(highlights);
    } else {
      resetAndNotify(highlights);
    }
  };

  return (
    <Container>
      <ParticleHighlighter
        onSelect={onSelect}
        text={example.ja}
        particles={example.indexes}
        highlight={state.highlights}
      />
    </Container>
  );
};

export default ParticleRound;
