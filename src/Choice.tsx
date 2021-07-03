import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

export enum Selection { NotSelected, Transitive, Intransitive };
interface Props {
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
    <FormControl component="fieldset">
      <RadioGroup row onChange={handleChange}>
        <FormControlLabel value="transitive" control={<Radio />} label="Transitive" />
        <FormControlLabel value="intransitive" control={<Radio />} label="Intransitive" />
      </RadioGroup>
    </FormControl>  
  );
}
