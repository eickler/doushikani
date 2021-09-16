import { Container, Typography } from "@material-ui/core";
import { useState } from "react";
import { Choice, Selection } from "./Choice";
import { Question } from "./Question";
import { VerbCard } from "./Control";

interface Props {
  verb: VerbCard;
  onFinish: (pass: boolean) => void;
}

const VerbRound = (props: Props) => {
  const [selection, setSelection] = useState(Selection.NotSelected);
  const correctChoice = props.verb.verb.transitive
    ? Selection.Transitive
    : Selection.Intransitive;

  const onSelected = (selection: Selection) => {
    setSelection(selection);
    setTimeout(() => {
      setSelection(Selection.NotSelected);
      props.onFinish(selection === correctChoice);
    }, 3000);
  };

  return (
    <Container>
      <Question verb={props.verb.verb} />
      <Choice
        currentChoice={selection}
        correctChoice={correctChoice}
        onSelected={onSelected}
      />
      <Typography variant="h4">
        This verb is:{" "}
        {(selection !== Selection.NotSelected && Selection[correctChoice]) ||
          "..."}
      </Typography>
    </Container>
  );
};

export default VerbRound;
