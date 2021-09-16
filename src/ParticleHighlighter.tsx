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
  onSelect: (guessed: string) => void;
}

const plaintextNode = (text: string): ReactElement => {
  return createElement("span", { children: text, key: text });
};

const highlightNode = (
  particle: string,
  highlight: Highlight,
  onSelect: (guessed: string) => void
): ReactElement => {
  switch (highlight) {
    case Highlight.Hide:
      return (
        <ButtonGroup data-id="hidden" key="hidden">
          <Button color="primary" disabled>
            ?
          </Button>
        </ButtonGroup>
      );
    case Highlight.Cursor:
      return (
        <ButtonGroup data-id="cursor" key="cursor">
          <Button color="primary" onClick={() => onSelect("は")}>
            は
          </Button>
          <Button color="primary" onClick={() => onSelect("が")}>
            が
          </Button>
          <Button color="primary" onClick={() => onSelect("を")}>
            を
          </Button>
          <Button color="primary" onClick={() => onSelect("に")}>
            に
          </Button>
        </ButtonGroup>
      );
    case Highlight.Correct:
      return (
        <ButtonGroup data-id="correct" key="green">
          <Button style={{ color: "green" }} disabled>
            {particle}
          </Button>
        </ButtonGroup>
      );
    case Highlight.Wrong:
      return (
        <ButtonGroup data-id="wrong" key="red">
          <Button style={{ color: "red" }} disabled>
            {particle}
          </Button>
        </ButtonGroup>
      );
  }
};

export const split = (
  text: string,
  particles: number[],
  highlights: Highlight[],
  onSelect: (guessed: string) => void
) => {
  let i = 0;
  const splits = [-1, ...particles, text.length];
  const elements = [];

  while (i < splits.length - 1) {
    const plaintext = text.substring(splits[i] + 1, splits[i + 1]);
    elements.push(plaintextNode(plaintext));

    if (i < splits.length - 2) {
      const particle = text.charAt(particles[i]);
      const highlight = i < highlights.length ? highlights[i] : Highlight.Hide;
      elements.push(highlightNode(particle, highlight, onSelect));
    }

    i++;
  }

  return elements;
};

export const ParticleHighlighter = (props: Props) => {
  return (
    <>{split(props.text, props.particles, props.highlight, props.onSelect)}</>
  );
};
