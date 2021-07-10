import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

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
