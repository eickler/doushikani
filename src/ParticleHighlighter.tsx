import { ButtonGroup, Button, Typography, Grid } from "@material-ui/core";
import { ReactElement } from "react";

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
  return (
    <Typography variant="h4" component="span" key={text}>
      {text}
    </Typography>
  );
};

const highlightNode = (
  i: number,
  particle: string,
  highlight: Highlight,
  onSelect: (guessed: string) => void
): ReactElement => {
  switch (highlight) {
    case Highlight.Hide:
      return (
        <ButtonGroup variant="contained" data-id="hidden" key={"hidden-" + i}>
          <Button color="primary" disabled>
            <Typography variant="h4" component="span">
              ?
            </Typography>
          </Button>
        </ButtonGroup>
      );
    case Highlight.Cursor:
      return (
        <ButtonGroup
          variant="contained"
          data-id="cursor"
          key={"cursor" + i}
          orientation="vertical"
        >
          <Button color="primary" onClick={() => onSelect("は")}>
            <Typography variant="h4" component="span">
              は
            </Typography>
          </Button>
          <Button color="primary" onClick={() => onSelect("が")}>
            <Typography variant="h4" component="span">
              が
            </Typography>
          </Button>
          <Button color="primary" onClick={() => onSelect("を")}>
            <Typography variant="h4" component="span">
              を
            </Typography>
          </Button>
          <Button color="primary" onClick={() => onSelect("に")}>
            <Typography variant="h4" component="span">
              に
            </Typography>
          </Button>
        </ButtonGroup>
      );
    case Highlight.Correct:
      return (
        <ButtonGroup data-id="correct" key={"green" + i}>
          <Button style={{ color: "green" }} disabled>
            <Typography variant="h4" component="span">
              {particle}
            </Typography>
          </Button>
        </ButtonGroup>
      );
    case Highlight.Wrong:
      return (
        <ButtonGroup data-id="wrong" key={"red" + i}>
          <Button style={{ color: "red" }} disabled>
            <Typography variant="h4" component="span">
              {particle}
            </Typography>
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
      elements.push(highlightNode(i, particle, highlight, onSelect));
    }

    i++;
  }

  return elements;
};

export const ParticleHighlighter = (props: Props) => {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {split(props.text, props.particles, props.highlight, props.onSelect)}
    </Grid>
  );
};
