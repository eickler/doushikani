import { ButtonGroup, Button } from "@material-ui/core";
import { ReactElement, createElement } from "react";

export enum Highlight {
  Hide,
  Cursor,
  Correct,
  Wrong,
}

interface Props {
  text: string;
  particles: number[];
  highlight: Highlight[];
}

const plaintextNode = (text: string): ReactElement => {
  return createElement("span", { children: text });
};

const highlightNode = (
  particle: string,
  highlight: Highlight
): ReactElement => {
  switch (highlight) {
    case Highlight.Hide:
      return (
        <ButtonGroup color="primary">
          <Button>?</Button>
        </ButtonGroup>
      );
    case Highlight.Cursor:
      return (
        <ButtonGroup color="primary">
          <Button>は</Button>
          <Button>が</Button>
          <Button>を</Button>
          <Button>に</Button>
        </ButtonGroup>
      );
    case Highlight.Correct:
      return (
        <ButtonGroup style={{color: "green"}}>
          <Button>{particle}</Button>
        </ButtonGroup>
      );
    case Highlight.Wrong:
      return (
        <ButtonGroup style={{color: "red"}}>
          <Button>{particle}</Button>
        </ButtonGroup>
      );
  }
};

export const split = (
  text: string,
  particles: number[],
  highlights: Highlight[]
) => {
  let i = 0;
  const splits = [-1, ...particles, text.length];
  const elements = [];

  while (i < splits.length - 1) {
    const plaintext = text.substring(splits[i] + 1, splits[i + 1]);
    elements.push(plaintextNode(plaintext));

    if (i < splits.length - 2) {
      const particle = text.charAt(particles[i]);
      elements.push(highlightNode(particle, highlights[i]));
    }

    i++;
  }

  return elements;
};

export const ParticleHighlighter = (props: Props) => {
  return <>{split(props.text, props.particles, props.highlight)}</>;
};
