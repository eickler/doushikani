import { Button } from "@material-ui/core";

export enum Selection {
  NotSelected,
  Transitive,
  Intransitive,
}
interface Props {
  currentChoice: Selection;
  correctChoice: Selection;
  onSelected: (selection: Selection) => void;
}

export const Choice = (props: Props) => {
  const onSelected = (selection: Selection) => {
    const feedback = selection === props.correctChoice ? "/assets/success.mp3" : "/assets/fail.mp3";
    new Audio(process.env.PUBLIC_URL + feedback).play();
    props.onSelected(selection);
  }

  const style = (buttonType: Selection) => {
    if (props.currentChoice === buttonType) {
      return { backgroundColor: props.currentChoice === props.correctChoice ? "green" : "red" }
    }
    return {};
  }

  const button = (buttonType: Selection) => {
    return (
      <Button
        variant="contained"
        disabled={props.currentChoice !== Selection.NotSelected}
        style={style(buttonType)}
        onClick={() => onSelected(buttonType)}
      >
        {Selection[buttonType]}
      </Button>
    )
  };

  return (
    <>
      {button(Selection.Transitive)}
      {button(Selection.Intransitive)}
    </>
  );
};
