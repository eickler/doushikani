import {
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

export enum Selection {
  NotSelected,
  Transitive,
  Intransitive,
}
interface Props {
  currentSelection: Selection;
  onSelect: (selection: Selection) => void;
}

export const Choice = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<any>) => {
    if (event.target.value === "transitive") {
      props.onSelect(Selection.Transitive);
    } else if (event.target.value === "intransitive") {
      props.onSelect(Selection.Intransitive);
    } else {
      props.onSelect(Selection.NotSelected);
    }
  };

  return (
    <Container>
      <FormControl component="fieldset">
        <RadioGroup row onChange={handleChange}>
          <FormControlLabel
            value="transitive"
            label="Transitive"
            checked={props.currentSelection === Selection.Transitive}
            control={<Radio />}
          />
          <FormControlLabel
            value="intransitive"
            label="Intransitive"
            checked={props.currentSelection === Selection.Intransitive}
            control={<Radio />}
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
};
