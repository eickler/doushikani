import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

export interface Configuration {
  level: number;
}

interface Props {
  defaultLevel: number;
  onConfigUpdate: (config: Configuration) => void;
}

export const Setup = (props: Props) => {
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(props.defaultLevel);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = +event.target.value;
    if (level && level >= 1 && level <= 60) {
      setValue(level);
      props.onConfigUpdate({ level: level });
    }
  };

  const ignoreCR = (ev: React.KeyboardEvent) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
    }
  }

  return (
    <Container>
      <form autoComplete="off">
        <TextField
          label="Max. Wanikani level"
          variant="outlined"
          type="number"
          value={value}
          onChange={onChange}
          onKeyPress={ignoreCR}
        />
      </form>
    </Container>
  );
};
