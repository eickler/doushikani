import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

export interface Configuration {
  level: number;
  verbsPerDay: number;
}

interface Props {
  defaultLevel: number;
  defaultVerbsPerDay: number;
  onConfigUpdate: (config: Configuration) => void;
}

const toDefaultConfiguration = (props: Props) => {
  return { level: props.defaultLevel, verbsPerDay: props.defaultVerbsPerDay }
}

export const Setup = (props: Props) => {
  const [config, setConfig] = React.useState<Configuration>(toDefaultConfiguration(props));

  const update = (newConfig: Configuration) => {
    setConfig(newConfig);
    props.onConfigUpdate(newConfig);
  }

  const onChangeLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = +event.target.value;
    if (level && level >= 1 && level <= 60) {
      update({ ...config, level: level });
    }
  };

  const onChangeVerbsPerDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const verbsPerDay = +event.target.value;
    if (verbsPerDay && verbsPerDay >= 0) {
      update({ ...config, verbsPerDay: verbsPerDay });
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
          value={config.level}
          onChange={onChangeLevel}
          onKeyPress={ignoreCR}
        />
        <TextField
          label="Min. verbs per day"
          variant="outlined"
          type="number"
          value={config.verbsPerDay}
          onChange={onChangeVerbsPerDay}
          onKeyPress={ignoreCR}
        />
      </form>
    </Container>
  );
};
