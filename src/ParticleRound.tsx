import { Container, Typography } from "@material-ui/core";
import { useState } from "react";
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

  const waitResetAndNotify = (highlights: Highlight[]) => {
    setState({ ...state, highlights: highlights });
    setTimeout(() => resetAndNotify(highlights), 3000);
  };

  const onSelect = (guessed: string) => {
    const highlights = [...state.highlights];

    const correct = example.ja.charAt(example.indexes[state.cursor]);
    highlights[state.cursor] =
      guessed === correct ? Highlight.Correct : Highlight.Wrong;

    if (state.cursor < example.indexes.length - 1) {
      moveCursor(highlights);
    } else {
      waitResetAndNotify(highlights);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">
        <ParticleHighlighter
          onSelect={onSelect}
          text={example.ja}
          particles={example.indexes}
          highlight={state.highlights}
        />
        {state.highlights[state.cursor] != Highlight.Cursor && example.en}
      </Typography>
    </Container>
  );
};

export default ParticleRound;
